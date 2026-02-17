import { NextRequest, NextResponse } from 'next/server';
import { evaluateSpeech } from '@/lib/speechsuper';
import { evaluateSpeechAzure } from '@/lib/azure-speech';
import type { EvaluationTool } from '@/types';

// Vercel Serverless Function 設定
export const runtime = 'nodejs';
export const maxDuration = 30;

/**
 * POST /api/evaluate-speech
 * 音声ファイルを評価ツール（SpeechSuper or Azure）で評価し、スコアと認識結果を返す
 */
export async function POST(request: NextRequest) {
  try {
    // FormDataの取得
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File | null;
    const originalText = formData.get('originalText') as string | null;
    const rawTool = formData.get('evaluationTool') as string | null;
    const evaluationTool: EvaluationTool = rawTool === 'azure' ? 'azure' : 'speechsuper';

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

    // 音声ファイルをBufferに変換
    const arrayBuffer = await audioFile.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);

    // リクエスト内容のログ
    console.log('[evaluate-speech] 受信:', {
      evaluationTool,
      originalText,
      originalTextLength: originalText.length,
      audioSize: audioBuffer.length,
      audioType: audioFile.type,
      audioName: audioFile.name,
    });

    // ファイルサイズチェック（10MB以下）
    if (audioBuffer.length > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: '音声ファイルは10MB以下にしてください' },
        { status: 400 }
      );
    }

    // Azure Speech で評価
    if (evaluationTool === 'azure') {
      const speechKey = process.env.AZURE_SPEECH_KEY;
      const speechRegion = process.env.AZURE_SPEECH_REGION;

      if (!speechKey || !speechRegion) {
        return NextResponse.json(
          { error: 'Azure Speech APIが設定されていません。AZURE_SPEECH_KEY と AZURE_SPEECH_REGION を確認してください。' },
          { status: 503 }
        );
      }

      const { result: azureResult, transcription } = await evaluateSpeechAzure(
        audioBuffer,
        originalText,
        speechKey,
        speechRegion
      );

      return NextResponse.json(
        { tool: 'azure', azureResult, transcription },
        { status: 200 }
      );
    }

    // SpeechSuper で評価（デフォルト）
    if (!process.env.SPEECHSUPER_APP_KEY || !process.env.SPEECHSUPER_SECRET_KEY) {
      return NextResponse.json(
        { error: '評価モードは現在使えません。SpeechSuper APIキーが設定されていません。' },
        { status: 503 }
      );
    }

    const { result, transcription } = await evaluateSpeech(audioBuffer, originalText);

    return NextResponse.json(
      { tool: 'speechsuper', result, transcription },
      { status: 200 }
    );
  } catch (error) {
    console.error('Speech evaluation error:', error);

    const errorMessage =
      error instanceof Error ? error.message : '不明なエラーが発生しました';

    return NextResponse.json(
      { error: `発音評価に失敗しました: ${errorMessage}` },
      { status: 500 }
    );
  }
}
