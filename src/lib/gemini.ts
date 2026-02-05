import { GoogleGenerativeAI } from '@google/generative-ai';
import type { SelfEvaluation, Language, AIFeedback } from '@/types';

// Gemini APIクライアントの初期化
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * 音声データを文字起こしする
 */
export async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  // 音声データをBase64エンコード
  const base64Audio = audioBuffer.toString('base64');

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: 'audio/webm',
        data: base64Audio,
      },
    },
    {
      text: `この音声を日本語で文字起こししてください。
日本語の発音を聞き取って、ひらがなまたは漢字かな混じりでテキストに変換してください。
句読点は入れずに、聞き取った内容をそのまま出力してください。
音声が聞き取れない場合は「（聞き取れませんでした）」と出力してください。`,
    },
  ]);

  const response = result.response;
  return response.text().trim();
}

/**
 * AIアドバイスを生成する
 */
export async function generateFeedback(
  originalText: string,
  transcribedText: string,
  selfEvaluation: SelfEvaluation,
  userLanguage: Language
): Promise<AIFeedback> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const selfEvaluationMap: Record<SelfEvaluation, string> = {
    same: 'お手本と同じように言えた',
    close: 'だいたい言えたけど、少し違った',
    difficult: '難しかった',
    unknown: 'わからない',
  };

  const languageMap: Record<Language, string> = {
    ja: '',
    en: '英語',
    vi: 'ベトナム語',
    zh: '中国語',
    my: 'ミャンマー語（ビルマ語）',
    ne: 'ネパール語',
  };

  const languageNote =
    userLanguage !== 'ja'
      ? `ユーザーの母語は${languageMap[userLanguage]}です。必要に応じてその言語での補足を入れてください。`
      : '';

  const prompt = `あなたは日本語学習をサポートする優しい先生です。
学生の発音をお手本と比較して、アドバイスしてください。

【重要なルール】
- 最初に「伝わった」ことを必ず認める（これが最も重要）
- 良かった点を1〜2個見つける
- 改善点は1個だけ、具体的に伝える
- 点数やスコアは絶対につけない
- 励ましの言葉で終わる
- やさしい日本語で書く（N5レベルの語彙）
${languageNote}

【入力情報】
お手本テキスト: ${originalText}
学生の発音（音声認識結果）: ${transcribedText}
学生の自己評価: ${selfEvaluationMap[selfEvaluation]}

【出力形式】
必ず以下のJSON形式で出力してください。他の形式は不可です。
{
  "message": "伝わりましたよ！" などの短いメッセージ,
  "goodPoints": ["良かった点1", "良かった点2"],
  "improvementTip": "もっと良くなるための具体的なヒント1つ",
  "encouragement": "励ましの言葉"
}`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  // JSONを抽出（マークダウンコードブロック内の場合も対応）
  let jsonStr = text;
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1];
  }

  // JSONの開始と終了を見つける
  const jsonStart = jsonStr.indexOf('{');
  const jsonEnd = jsonStr.lastIndexOf('}');
  if (jsonStart !== -1 && jsonEnd !== -1) {
    jsonStr = jsonStr.slice(jsonStart, jsonEnd + 1);
  }

  try {
    const feedback = JSON.parse(jsonStr) as AIFeedback;

    // バリデーション
    if (!feedback.message) {
      feedback.message = '伝（つた）わりましたよ！';
    }
    if (!Array.isArray(feedback.goodPoints)) {
      feedback.goodPoints = [];
    }
    if (!feedback.improvementTip) {
      feedback.improvementTip = '';
    }
    if (!feedback.encouragement) {
      feedback.encouragement = 'この調子（ちょうし）で頑張（がんば）りましょう！';
    }

    return feedback;
  } catch {
    // JSONパースに失敗した場合のデフォルト
    return {
      message: '伝（つた）わりましたよ！',
      goodPoints: ['頑張（がんば）って発音（はつおん）しましたね'],
      improvementTip: 'もう少（すこ）しゆっくり話（はな）してみてください',
      encouragement: 'この調子（ちょうし）で練習（れんしゅう）を続（つづ）けましょう！',
    };
  }
}

/**
 * 音声解析と フィードバック生成を一括で行う
 */
export async function analyzeAndFeedback(
  audioBuffer: Buffer,
  originalText: string,
  selfEvaluation: SelfEvaluation,
  userLanguage: Language
): Promise<{ transcription: string; feedback: AIFeedback }> {
  // 1. 音声を文字起こし
  const transcription = await transcribeAudio(audioBuffer);

  // 2. フィードバックを生成
  const feedback = await generateFeedback(
    originalText,
    transcription,
    selfEvaluation,
    userLanguage
  );

  return { transcription, feedback };
}
