'use client';

import { useState, useCallback, useEffect } from 'react';
import { AudioPlayer } from '@/components/audio';
import { AudioRecorder } from '@/components/audio';
import { SpeechSuperFeedback } from '@/components/feedback';
import { convertToWav, normalizeForPlayback } from '@/lib/audioConverter';
import type { Lesson, SelfEvaluation, AIFeedback, Language, PracticeMode, SpeechSuperResult } from '@/types';

interface Step5RecordProps {
  lesson: Lesson;
  userLanguage: Language;
  practiceMode: PracticeMode;
  onComplete: () => void;
  onBack: () => void;
}

export function Step5Record({ lesson, userLanguage, practiceMode, onComplete, onBack }: Step5RecordProps) {
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [normalizedBlob, setNormalizedBlob] = useState<Blob | null>(null);
  const [wavBlob, setWavBlob] = useState<Blob | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [selfEvaluation, setSelfEvaluation] = useState<SelfEvaluation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);
  const [evaluationResult, setEvaluationResult] = useState<SpeechSuperResult | null>(null);
  const [evaluationTranscription, setEvaluationTranscription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isEvaluationMode = practiceMode === 'evaluation';

  // 正規化済みBlobのURLを生成（アドバイスモードの聞き比べ用）
  const [normalizedUrl, setNormalizedUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!normalizedBlob) {
      setNormalizedUrl(null);
      return;
    }
    const url = URL.createObjectURL(normalizedBlob);
    setNormalizedUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [normalizedBlob]);

  // 録音完了時: 両モード共通で正規化済みBlobを生成
  // 評価モードではさらに wav 変換も実行
  // 低スペック端末（iPod touch等）でタイムアウトした場合は正規化をスキップ
  const handleRecordingComplete = useCallback((blob: Blob, url: string) => {
    setRecordingBlob(blob);
    setRecordingUrl(url);
    setError(null);
    setIsConverting(true);

    // タイムアウト付きPromiseラッパー
    const withTimeout = <T,>(promise: Promise<T>, ms: number): Promise<T> =>
      Promise.race([
        promise,
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('変換タイムアウト')), ms)
        ),
      ]);

    // 正規化済み wav（プレビュー・聞き比べ再生用、元のサンプルレート維持）
    const normalizePromise = withTimeout(normalizeForPlayback(blob), 10000)
      .then((normalized) => {
        setNormalizedBlob(normalized);
      })
      .catch((err) => {
        console.error('音声正規化スキップ:', err.message);
        // 正規化失敗時は元のBlobをそのまま使用（再生は可能）
      });

    if (isEvaluationMode) {
      // 評価用 wav（16kHz、SpeechSuper送信用）も並行で生成
      const convertPromise = withTimeout(convertToWav(blob), 15000)
        .then((wav) => {
          setWavBlob(wav);
        })
        .catch((err) => {
          console.error('wav変換エラー:', err.message);
          // wav変換失敗時は元のBlobで代替（SpeechSuperが受け付ける可能性あり）
          setWavBlob(blob);
        });

      Promise.all([normalizePromise, convertPromise])
        .finally(() => {
          setIsConverting(false);
        });
    } else {
      normalizePromise
        .finally(() => {
          setIsConverting(false);
        });
    }
  }, [isEvaluationMode]);

  // 自己評価選択
  const handleSelfEvaluation = (evaluation: SelfEvaluation) => {
    setSelfEvaluation(evaluation);
  };

  // AI解析を実行（アドバイスモード）
  const handleAdviceAnalyze = async () => {
    if (!recordingBlob || !selfEvaluation) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      const ext = recordingBlob.type.includes('mp4') ? 'mp4' : 'webm';
      formData.append('audio', recordingBlob, `recording.${ext}`);
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

      if (!result.feedback) {
        throw new Error('AIからの応答が不正です');
      }

      setTranscription(result.transcription);
      setFeedback(result.feedback);
    } catch (err) {
      console.error('解析エラー:', err);
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 発音評価を実行（評価モード）
  const handleEvaluationAnalyze = async () => {
    if (!wavBlob) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('audio', wavBlob, 'recording.wav');
      formData.append('originalText', lesson.script.japanese);
      formData.append('userLanguage', userLanguage);

      const response = await fetch('/api/evaluate-speech', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '発音評価に失敗しました');
      }

      const data = await response.json();

      if (!data.result) {
        throw new Error('評価結果が不正です');
      }

      setEvaluationResult(data.result);
      setEvaluationTranscription(data.transcription);
    } catch (err) {
      console.error('評価エラー:', err);
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // モードに応じた解析ハンドラー
  const handleAnalyze = isEvaluationMode ? handleEvaluationAnalyze : handleAdviceAnalyze;

  // やり直し
  const handleRetry = () => {
    setRecordingBlob(null);
    setRecordingUrl(null);
    setNormalizedBlob(null);
    setWavBlob(null);
    setIsConverting(false);
    setSelfEvaluation(null);
    setTranscription(null);
    setFeedback(null);
    setEvaluationResult(null);
    setEvaluationTranscription(null);
    setError(null);
  };

  // フィードバックが表示されているかどうか
  const hasFeedback = isEvaluationMode ? evaluationResult !== null : feedback !== null;

  const evaluationOptions: { value: SelfEvaluation; label: string }[] = [
    { value: 'same', label: 'お手本（てほん）と同（おな）じように言（い）えた' },
    { value: 'close', label: 'だいたい言（い）えたけど、少（すこ）し違（ちが）った' },
    { value: 'difficult', label: '難（むずか）しかった' },
    { value: 'unknown', label: 'わからない' },
  ];

  return (
    <div className="space-y-6">
      {/* 説明 */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {isEvaluationMode
            ? '録音（ろくおん）して発音（はつおん）を評価（ひょうか）しましょう'
            : '録音（ろくおん）してAIに聞（き）いてもらいましょう'}
        </h2>
        <p className="text-gray-600 text-sm">
          {isEvaluationMode
            ? 'お手本（てほん）を見（み）ながら録音（ろくおん）して、発音（はつおん）のスコアを確認（かくにん）しましょう。'
            : 'お手本（てほん）を見（み）ながら録音（ろくおん）して、AIからアドバイスをもらいましょう。'}
        </p>
      </div>

      {/* お手本スクリプト */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">📝 お手本（てほん）</h3>
        <p className="text-lg text-blue-900">{lesson.script.japanese}</p>
      </div>

      {/* 録音コンポーネント */}
      {!hasFeedback && (
        <AudioRecorder
          onRecordingComplete={handleRecordingComplete}
          maxDuration={30}
          normalizedBlob={normalizedBlob}
        />
      )}

      {/* 自己評価 + 解析ボタン（アドバイスモード） */}
      {!isEvaluationMode && recordingUrl && !feedback && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-3">
            自分（じぶん）の発音（はつおん）、どうでしたか？
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
                  AIが解析中（かいせきちゅう）...
                </span>
              ) : (
                'AIにアドバイスをもらう'
              )}
            </button>
          )}
        </div>
      )}

      {/* 評価ボタン（評価モード：録音完了後に表示、wav変換完了まで無効化） */}
      {isEvaluationMode && recordingUrl && !evaluationResult && (
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || isConverting || !wavBlob}
          className="w-full py-3 bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:bg-gray-300 text-white font-bold rounded-lg transition-colors"
        >
          {isConverting ? (
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
              音声（おんせい）を準備中（じゅんびちゅう）...
            </span>
          ) : isAnalyzing ? (
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
              評価中（ひょうかちゅう）...
            </span>
          ) : (
            '発音（はつおん）を評価（ひょうか）する'
          )}
        </button>
      )}

      {/* エラー表示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-2 text-red-600 underline text-sm"
          >
            やり直（なお）す
          </button>
        </div>
      )}

      {/* 評価モード フィードバック表示 */}
      {isEvaluationMode && evaluationResult && (
        <SpeechSuperFeedback
          result={evaluationResult}
          transcription={evaluationTranscription || ''}
          lesson={lesson}
          recordingBlob={normalizedBlob || recordingBlob}
          onRetry={handleRetry}
        />
      )}

      {/* アドバイスモード フィードバック表示 */}
      {!isEvaluationMode && feedback && (
        <div className="space-y-4">
          {/* AIが聞き取った結果 */}
          {transcription && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                🤖 AIが聞（き）き取（と）った結果（けっか）
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
              <h3 className="font-medium text-blue-900 mb-2">👍 良（よ）かったところ</h3>
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
                💡 もっと良（よ）くなるヒント
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
            <h3 className="font-medium text-gray-900 mb-3">🎧 聞（き）き比（くら）べ</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">お手本（てほん）</p>
                <AudioPlayer audioUrl={lesson.audioUrl} showSpeedControl={false} />
              </div>
              {(normalizedUrl || recordingUrl) && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">あなたの録音（ろくおん）</p>
                  <audio src={normalizedUrl || recordingUrl!} controls className="w-full" />
                </div>
              )}
            </div>
          </div>

          {/* やり直しボタン */}
          <button
            onClick={handleRetry}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
          >
            もう一度（いちど）録音（ろくおん）する
          </button>
        </div>
      )}

      {/* ナビゲーションボタン */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
        >
          ← 戻（もど）る
        </button>
        <button
          onClick={onComplete}
          className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md"
        >
          練習完了（れんしゅうかんりょう） ✓
        </button>
      </div>
    </div>
  );
}
