import { NextRequest, NextResponse } from 'next/server';
import { analyzeAndFeedback } from '@/lib/gemini';
import type { SelfEvaluation, Language } from '@/types';

/**
 * POST /api/analyze-speech
 * 音声ファイルを解析し、文字起こしとAIフィードバックを返す
 */
export async function POST(request: NextRequest) {
  try {
    // FormDataの取得
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File | null;
    const originalText = formData.get('originalText') as string | null;
    const selfEvaluation = formData.get('selfEvaluation') as SelfEvaluation | null;
    const userLanguage = (formData.get('userLanguage') as Language) || 'ja';

    // バリデーション
    if (!audioFile) {
      return NextResponse.json(
        { error: '音声ファイルが必要です' },
        { status: 400 }
      );
    }

    if (!originalText) {
      return NextResponse.json(
        { error: 'お手本テキストが必要です' },
        { status: 400 }
      );
    }

    if (!selfEvaluation) {
      return NextResponse.json(
        { error: '自己評価が必要です' },
        { status: 400 }
      );
    }

    // 有効な自己評価値かチェック
    const validEvaluations: SelfEvaluation[] = ['same', 'close', 'difficult', 'unknown'];
    if (!validEvaluations.includes(selfEvaluation)) {
      return NextResponse.json(
        { error: '無効な自己評価値です' },
        { status: 400 }
      );
    }

    // 音声ファイルをBufferに変換
    const arrayBuffer = await audioFile.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);

    // ファイルサイズチェック（10MB以下）
    if (audioBuffer.length > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: '音声ファイルは10MB以下にしてください' },
        { status: 400 }
      );
    }

    // Gemini APIで解析
    const result = await analyzeAndFeedback(
      audioBuffer,
      originalText,
      selfEvaluation,
      userLanguage
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Speech analysis error:', error);

    // エラーメッセージを適切に処理
    const errorMessage =
      error instanceof Error ? error.message : '不明なエラーが発生しました';

    return NextResponse.json(
      { error: `音声解析に失敗しました: ${errorMessage}` },
      { status: 500 }
    );
  }
}
