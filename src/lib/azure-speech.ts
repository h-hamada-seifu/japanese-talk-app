/**
 * Azure Speech REST API 発音評価クライアント
 * shadowing_app/web/src/lib/azure-speech.ts からの移植
 */

import type { AzureResult, AzureWordScore } from '@/types';

/** Azure REST API レスポンス型（内部用） */
interface AzureRecognitionResponse {
  RecognitionStatus?: string;
  DisplayText?: string;
  NBest?: AzureNBestItem[];
}

interface AzureNBestItem {
  PronunciationAssessment?: {
    AccuracyScore?: number;
    FluencyScore?: number;
    CompletenessScore?: number;
    PronScore?: number;
  };
  AccuracyScore?: number;
  FluencyScore?: number;
  CompletenessScore?: number;
  PronScore?: number;
  Words?: AzureWordItem[];
}

interface AzureWordItem {
  Word: string;
  AccuracyScore?: number;
  ErrorType?: string;
  PronunciationAssessment?: {
    AccuracyScore?: number;
    ErrorType?: string;
  };
}

/** REST APIエンドポイントURLを組み立てる */
function getEndpointUrl(region: string): string {
  return `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1`;
}

/** Pronunciation-Assessmentヘッダー値を生成（Base64エンコードされたJSON） */
function buildPronunciationHeader(text: string): string {
  const config = {
    ReferenceText: text,
    GradingSystem: 'HundredMark',
    Granularity: 'Phoneme',
    Dimension: 'Comprehensive',
    EnableMiscue: 'True',
  };
  const configJson = JSON.stringify(config);
  return Buffer.from(configJson, 'utf-8').toString('base64');
}

/** Azure REST APIレスポンスをパース */
function parseResponse(
  detail: AzureRecognitionResponse
): AzureResult | { error: string } {
  const status = detail.RecognitionStatus ?? '';

  if (status !== 'Success') {
    return { error: `認識失敗: ${status}` };
  }

  const nbest = detail.NBest ?? [];
  if (nbest.length === 0) {
    return { error: '認識結果なし' };
  }

  const best = nbest[0];

  // 全体スコア: フラットまたはネスト両方に対応
  const pron = best.PronunciationAssessment ?? {};
  const accuracyScore = pron.AccuracyScore ?? best.AccuracyScore ?? 0;
  const fluencyScore = pron.FluencyScore ?? best.FluencyScore ?? 0;
  const completenessScore = pron.CompletenessScore ?? best.CompletenessScore ?? 0;
  const pronunciationScore = pron.PronScore ?? best.PronScore ?? 0;

  // Words配列を正規化
  const words: AzureWordScore[] = (best.Words ?? []).map((w: AzureWordItem) => {
    const wordPron = w.PronunciationAssessment ?? {};
    return {
      word: w.Word,
      accuracyScore: wordPron.AccuracyScore ?? w.AccuracyScore ?? 0,
      errorType: (wordPron.ErrorType ?? w.ErrorType ?? 'None') as AzureWordScore['errorType'],
    };
  });

  return {
    recognizedText: detail.DisplayText ?? '',
    pronunciationScore,
    accuracyScore,
    fluencyScore,
    completenessScore,
    words,
  };
}

/**
 * Azure Speech APIで発音を評価する
 * @param audioBuffer 音声データ（wav形式）
 * @param refText お手本テキスト
 * @param speechKey Azure Speech APIキー
 * @param speechRegion Azure Speechリージョン
 */
export async function evaluateSpeechAzure(
  audioBuffer: Buffer,
  refText: string,
  speechKey: string,
  speechRegion: string
): Promise<{ result: AzureResult; transcription: string }> {
  const url = getEndpointUrl(speechRegion);
  const params = new URLSearchParams({
    language: 'ja-JP',
    format: 'detailed',
  });

  // 25秒タイムアウト（Vercel maxDuration=30 に対しマージン5秒確保）
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  try {
    console.log('[Azure Speech] API呼び出し開始:', {
      refText,
      refTextLength: refText.length,
      audioSize: audioBuffer.length,
      region: speechRegion,
    });

    const response = await fetch(`${url}?${params}`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': speechKey,
        'Pronunciation-Assessment': buildPronunciationHeader(refText),
        'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
        Accept: 'application/json',
      },
      body: new Uint8Array(audioBuffer),
      signal: controller.signal,
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('認証エラー(401): Azure APIキーまたはリージョンを確認してください');
      }
      if (response.status === 403) {
        throw new Error('アクセス拒否(403): Azure APIキーが無効です');
      }
      if (response.status === 429) {
        throw new Error('レート制限(429): しばらく待ってから再試行してください');
      }
      const body = await response.text();
      throw new Error(`Azure Speech API エラー (${response.status}): ${body.slice(0, 200)}`);
    }

    let detail: AzureRecognitionResponse;
    try {
      detail = await response.json();
    } catch {
      throw new Error('Azure Speech API: レスポンスのJSONパース失敗');
    }

    const parsed = parseResponse(detail);

    if ('error' in parsed) {
      throw new Error(`Azure Speech API: ${parsed.error}`);
    }

    const transcription = parsed.recognizedText;

    console.log('[Azure Speech] 評価完了:', {
      pronunciationScore: parsed.pronunciationScore,
      accuracyScore: parsed.accuracyScore,
      fluencyScore: parsed.fluencyScore,
      completenessScore: parsed.completenessScore,
      wordCount: parsed.words.length,
    });

    return { result: parsed, transcription };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Azure Speech API がタイムアウトしました（25秒）');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
