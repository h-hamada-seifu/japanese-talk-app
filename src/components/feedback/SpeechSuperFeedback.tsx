'use client';

import { useState, useEffect } from 'react';
import { ScoreRadarChart } from './ScoreRadarChart';
import { ScoreBarChart } from './ScoreBarChart';
import { AudioPlayer } from '@/components/audio';
import type { SpeechSuperResult, Lesson } from '@/types';

interface SpeechSuperFeedbackProps {
  result: SpeechSuperResult;
  transcription: string;
  lesson: Lesson;
  recordingBlob: Blob | null;
  onRetry: () => void;
}

/**
 * スコアに応じた背景色クラスを返す
 */
function getScoreBgClass(score: number): string {
  if (score >= 80) return 'bg-green-50 border-green-200';
  if (score >= 60) return 'bg-yellow-50 border-yellow-200';
  return 'bg-red-50 border-red-200';
}

/**
 * スコアに応じたテキスト色クラスを返す
 */
function getScoreTextClass(score: number): string {
  if (score >= 80) return 'text-green-700';
  if (score >= 60) return 'text-yellow-700';
  return 'text-red-700';
}

/**
 * スコアに応じたバッジ色クラスを返す
 */
function getScoreBadgeClass(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-800';
  if (score >= 60) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

export function SpeechSuperFeedback({
  result,
  transcription,
  lesson,
  recordingBlob,
  onRetry,
}: SpeechSuperFeedbackProps) {
  const { scores, words } = result;

  // Blob から再生用URLを生成し、アンマウント時にクリーンアップ
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!recordingBlob) {
      setRecordingUrl(null);
      return;
    }
    const url = URL.createObjectURL(recordingBlob);
    setRecordingUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [recordingBlob]);

  return (
    <div className="space-y-4">
      {/* 総合スコア */}
      <div className={`border rounded-lg p-6 text-center ${getScoreBgClass(scores.overall)}`}>
        <p className="text-sm text-gray-600 mb-1">総合（そうごう）スコア</p>
        <p className={`text-5xl font-bold ${getScoreTextClass(scores.overall)}`}>
          {scores.overall}
        </p>
        <p className="text-sm text-gray-500 mt-1">/ 100</p>
      </div>

      {/* AIが聞き取った結果 */}
      {transcription && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            認識（にんしき）結果（けっか）
          </h3>
          <p className="text-gray-900">{transcription}</p>
        </div>
      )}

      {/* レーダーチャート */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-2">
          詳細（しょうさい）スコア
        </h3>
        <ScoreRadarChart scores={scores} />
      </div>

      {/* 棒グラフ */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-2">
          項目別（こうもくべつ）スコア
        </h3>
        <ScoreBarChart scores={scores} />
      </div>

      {/* 単語別スコア */}
      {words.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-3">
            単語別（たんごべつ）スコア
          </h3>
          <div className="space-y-3">
            {words.map((word, index) => (
              <div key={index} className="border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">{word.word}</span>
                  <span className={`px-2 py-0.5 rounded text-sm font-medium ${getScoreBadgeClass(word.score)}`}>
                    {word.score}
                  </span>
                </div>
                {word.phonemes.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {word.phonemes.map((phoneme, pIndex) => (
                      <span
                        key={pIndex}
                        className={`text-xs px-1.5 py-0.5 rounded ${getScoreBadgeClass(phoneme.score)}`}
                      >
                        {phoneme.phoneme}({phoneme.score})
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 聞き比べ */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">聞（き）き比（くら）べ</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600 mb-1">お手本（てほん）</p>
            <AudioPlayer audioUrl={lesson.audioUrl} showSpeedControl={false} />
          </div>
          {recordingUrl && (
            <div>
              <p className="text-sm text-gray-600 mb-1">あなたの録音（ろくおん）</p>
              <audio
                src={recordingUrl}
                controls
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* やり直しボタン */}
      <button
        onClick={onRetry}
        className="w-full py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
      >
        もう一度（いちど）録音（ろくおん）する
      </button>
    </div>
  );
}
