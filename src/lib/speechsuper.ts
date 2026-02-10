import { createHash, randomUUID } from 'node:crypto';
import type { SpeechSuperResult, WordScore, PhonemeScore } from '@/types';

/**
 * 日本語文評価用の coreType と API URL
 * 公式ドキュメント: https://docs.speechsuper.com/#/./Languages/Japanese/sent.eval.jp
 */
const CORE_TYPE = 'sent.eval.jp';
const API_URL = `https://api.speechsuper.com/${CORE_TYPE}`;

/**
 * SHA1ハッシュを生成する
 */
function sha1(data: string): string {
  return createHash('sha1').update(data).digest('hex');
}

/**
 * SpeechSuper APIのレスポンスをパースする
 * 公式レスポンス構造に基づくパーサー
 */
function parseResponse(data: Record<string, unknown>): SpeechSuperResult {
  // レスポンスの生JSONをログ出力（構造確認用、開発環境のみ）
  if (process.env.NODE_ENV === 'development') {
    console.log('[SpeechSuper] 生レスポンス:', JSON.stringify(data, null, 2));
  }

  try {
    const result = data.result as Record<string, unknown>;
    if (!result) {
      throw new Error('result フィールドが見つかりません');
    }

    // スコアを取得（公式レスポンス構造に対応）
    // 日本語 sent.eval.jp のレスポンスフィールド名:
    //   overall, pronunciation, fluency, integrity(=完全性), tone, rhythm, speed
    const overall = Number(result.overall ?? 0);
    const pronunciation = Number(result.pronunciation ?? 0);
    const fluency = Number(result.fluency ?? 0);
    const completeness = Number(result.integrity ?? 0);
    const tone = Number(result.tone ?? 0);
    const rhythm = Number(result.rhythm ?? 0);
    const speed = Number(result.speed ?? 0);

    // 単語レベルの詳細をパース
    const rawWords = (result.words ?? []) as Record<string, unknown>[];
    const words: WordScore[] = Array.isArray(rawWords)
      ? rawWords.map((w: Record<string, unknown>) => {
          // 単語スコアは scores.pronunciation / scores.overall
          const wordScores = (w.scores ?? {}) as Record<string, unknown>;
          const wordScore = Number(wordScores.overall ?? wordScores.pronunciation ?? 0);

          // 音素の詳細
          const rawPhonemes = (w.phonemes ?? []) as Record<string, unknown>[];
          const phonemes: PhonemeScore[] = Array.isArray(rawPhonemes)
            ? rawPhonemes.map((p: Record<string, unknown>) => ({
                phoneme: String(p.phoneme ?? ''),
                score: Number(p.pronunciation ?? 0),
              }))
            : [];

          return {
            word: String(w.word ?? ''),
            score: wordScore,
            phonemes,
          };
        })
      : [];

    // 単語分割結果のサマリログ（誤分割の調査用）
    if (process.env.NODE_ENV === 'development') {
      console.log('[SpeechSuper] 単語分割結果:',
        words.map(w => `「${w.word}」(スコア:${w.score}) [音素数:${w.phonemes.length}]`)
      );
      console.log('[SpeechSuper] 音素詳細:',
        words.map(w => ({
          word: w.word,
          phonemes: w.phonemes.map(p => `${p.phoneme}(${p.score})`).join(' '),
        }))
      );
    }

    return {
      scores: {
        overall,
        pronunciation,
        fluency,
        completeness,
        tone,
        rhythm,
        speed,
      },
      words,
    };
  } catch (error) {
    console.error('[SpeechSuper] レスポンスパースエラー:', error);
    return {
      scores: {
        overall: 0,
        pronunciation: 0,
        fluency: 0,
        completeness: 0,
        tone: 0,
        rhythm: 0,
        speed: 0,
      },
      words: [],
    };
  }
}

/**
 * SpeechSuper APIで発音を評価する
 */
export async function evaluateSpeech(
  audioBuffer: Buffer,
  refText: string
): Promise<{ result: SpeechSuperResult; transcription: string }> {
  const appKey = process.env.SPEECHSUPER_APP_KEY;
  const secretKey = process.env.SPEECHSUPER_SECRET_KEY;

  if (!appKey || !secretKey) {
    throw new Error('SpeechSuper APIキーが設定されていません');
  }

  const timestamp = Date.now().toString();
  const userId = 'japanese-talk-user';
  const tokenId = randomUUID();

  // 署名生成
  const connectSig = sha1(appKey + timestamp + secretKey);
  const startSig = sha1(appKey + timestamp + userId + secretKey);

  // リクエストパラメータ
  const params = {
    connect: {
      cmd: 'connect',
      param: {
        sdk: {
          version: 16777472,
          source: 9,
          protocol: 2,
        },
        app: {
          applicationId: appKey,
          sig: connectSig,
          timestamp,
        },
      },
    },
    start: {
      cmd: 'start',
      param: {
        app: {
          applicationId: appKey,
          sig: startSig,
          userId,
          timestamp,
        },
        audio: {
          audioType: 'wav',
          sampleRate: 16000,
          channel: 1,
          sampleBytes: 2,
        },
        request: {
          coreType: CORE_TYPE,
          refText,
          tokenId,
        },
      },
    },
  };

  // FormData構築
  const formData = new FormData();
  formData.append('text', JSON.stringify(params));
  formData.append('audio', new Blob([new Uint8Array(audioBuffer)]), 'audio.wav');

  // API呼び出し（25秒タイムアウト: Vercel maxDuration=30 に対しマージン5秒確保）
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  try {
    console.log('[SpeechSuper] API呼び出し開始:', {
      refText,
      refTextLength: refText.length,
      refTextBytes: Buffer.byteLength(refText, 'utf-8'),
      audioSize: audioBuffer.length,
      coreType: CORE_TYPE,
    });

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Request-Index': '0',
      },
      body: formData,
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`SpeechSuper API エラー (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    // エラーチェック（公式仕様: エラー時は errId + error フィールド）
    if (data.errId || data.error) {
      const errorDetail = data.error || `エラーコード: ${data.errId}`;
      throw new Error(`SpeechSuper API エラー: ${errorDetail}`);
    }

    // result フィールドが存在するか確認
    if (!data.result) {
      throw new Error('SpeechSuper API エラー: レスポンスに result がありません');
    }

    const result = parseResponse(data);

    // SpeechSuperは参照テキストに対する評価のため、refText をそのまま返す
    const transcription = String(data.refText ?? refText);

    return { result, transcription };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('SpeechSuper API がタイムアウトしました（25秒）');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
