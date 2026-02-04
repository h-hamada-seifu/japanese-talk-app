'use client';

import { useState } from 'react';
import { AudioPlayer } from '@/components/audio';
import { AudioRecorder } from '@/components/audio';
import type { Lesson, SelfEvaluation, AIFeedback, Language } from '@/types';

interface Step5RecordProps {
  lesson: Lesson;
  userLanguage: Language;
  onComplete: () => void;
  onBack: () => void;
}

export function Step5Record({ lesson, userLanguage, onComplete, onBack }: Step5RecordProps) {
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [selfEvaluation, setSelfEvaluation] = useState<SelfEvaluation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 録音完了時
  const handleRecordingComplete = (blob: Blob, url: string) => {
    setRecordingBlob(blob);
    setRecordingUrl(url);
    setError(null);
  };

  // 自己評価選択
  const handleSelfEvaluation = (evaluation: SelfEvaluation) => {
    setSelfEvaluation(evaluation);
  };

  // AI解析を実行
  const handleAnalyze = async () => {
    if (!recordingBlob || !selfEvaluation) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('audio', recordingBlob, 'recording.webm');
      formData.append('originalText', lesson.script.japanesePlain);
      formData.append('selfEvaluation', selfEvaluation);
      formData.append('userLanguage', userLanguage);

      const response = await fetch('/api/analyze-speech', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'AI解析に失敗しました');
      }

      const result = await response.json();
      setTranscription(result.transcription);
      setFeedback(result.feedback);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // やり直し
  const handleRetry = () => {
    setRecordingBlob(null);
    setRecordingUrl(null);
    setSelfEvaluation(null);
    setTranscription(null);
    setFeedback(null);
    setError(null);
  };

  const evaluationOptions: { value: SelfEvaluation; label: string }[] = [
    { value: 'same', label: 'お手本と同じように言えた' },
    { value: 'close', label: 'だいたい言えたけど、少し違った' },
    { value: 'difficult', label: '難しかった' },
    { value: 'unknown', label: 'わからない' },
  ];

  return (
    <div className="space-y-6">
      {/* 説明 */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          録音してAIに聞いてもらいましょう
        </h2>
        <p className="text-gray-600 text-sm">
          お手本を見ながら録音して、AIからアドバイスをもらいましょう。
        </p>
      </div>

      {/* お手本スクリプト */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">📝 お手本</h3>
        <p className="text-lg text-blue-900">{lesson.script.japanese}</p>
      </div>

      {/* 録音コンポーネント */}
      {!feedback && (
        <AudioRecorder
          onRecordingComplete={handleRecordingComplete}
          maxDuration={30}
        />
      )}

      {/* 自己評価（録音完了後、フィードバック前） */}
      {recordingUrl && !feedback && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-3">
            自分の発音、どうでしたか？
          </h3>
          <div className="space-y-2">
            {evaluationOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelfEvaluation(option.value)}
                className={`w-full p-3 text-left rounded-lg border transition-colors ${
                  selfEvaluation === option.value
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`w-4 h-4 rounded-full border-2 ${
                      selfEvaluation === option.value
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selfEvaluation === option.value && (
                      <span className="block w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </span>
                  {option.label}
                </span>
              </button>
            ))}
          </div>

          {/* AI解析ボタン */}
          {selfEvaluation && (
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full mt-4 py-3 bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:bg-gray-300 text-white font-bold rounded-lg transition-colors"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  AIが解析中...
                </span>
              ) : (
                'AIにアドバイスをもらう'
              )}
            </button>
          )}
        </div>
      )}

      {/* エラー表示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-2 text-red-600 underline text-sm"
          >
            やり直す
          </button>
        </div>
      )}

      {/* AI フィードバック表示 */}
      {feedback && (
        <div className="space-y-4">
          {/* AIが聞き取った結果 */}
          {transcription && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                🤖 AIが聞き取った結果
              </h3>
              <p className="text-gray-900">{transcription}</p>
            </div>
          )}

          {/* メインメッセージ */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-xl font-bold text-green-800">{feedback.message}</p>
          </div>

          {/* 良かった点 */}
          {feedback.goodPoints.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">👍 良かったところ</h3>
              <ul className="text-blue-800 space-y-1">
                {feedback.goodPoints.map((point, index) => (
                  <li key={index}>• {point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 改善ヒント */}
          {feedback.improvementTip && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900 mb-2">
                💡 もっと良くなるヒント
              </h3>
              <p className="text-yellow-800">{feedback.improvementTip}</p>
            </div>
          )}

          {/* 励まし */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <p className="text-purple-800">{feedback.encouragement}</p>
          </div>

          {/* 聞き比べ */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-3">🎧 聞き比べ</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">お手本</p>
                <AudioPlayer audioUrl={lesson.audioUrl} showSpeedControl={false} />
              </div>
              {recordingUrl && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">あなたの録音</p>
                  <audio src={recordingUrl} controls className="w-full" />
                </div>
              )}
            </div>
          </div>

          {/* やり直しボタン */}
          <button
            onClick={handleRetry}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
          >
            もう一度録音する
          </button>
        </div>
      )}

      {/* ナビゲーションボタン */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
        >
          ← 戻る
        </button>
        <button
          onClick={onComplete}
          className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md"
        >
          練習完了 ✓
        </button>
      </div>
    </div>
  );
}
