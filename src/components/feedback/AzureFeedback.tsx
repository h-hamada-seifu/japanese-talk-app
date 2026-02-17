'use client';

import { useState, useEffect } from 'react';
import { AudioPlayer } from '@/components/audio';
import type { AzureResult, Lesson } from '@/types';

interface AzureFeedbackProps {
  result: AzureResult;
  transcription: string;
  lesson: Lesson;
  recordingBlob: Blob | null;
  onRetry: () => void;
}

/** スコアに応じた背景色クラスを返す */
function getScoreBgClass(score: number): string {
  if (score >= 80) return 'bg-green-50 border-green-200';
  if (score >= 60) return 'bg-yellow-50 border-yellow-200';
  return 'bg-red-50 border-red-200';
}

/** スコアに応じたテキスト色クラスを返す */
function getScoreTextClass(score: number): string {
  if (score >= 80) return 'text-green-700';
  if (score >= 60) return 'text-yellow-700';
  return 'text-red-700';
}

/** ErrorTypeに応じた色クラスを返す */
function getErrorTypeClass(errorType: string): string {
  switch (errorType) {
    case 'None':
      return 'text-green-600 bg-green-50';
    case 'Mispronunciation':
      return 'text-yellow-700 bg-yellow-50';
    case 'Omission':
      return 'text-red-600 bg-red-50';
    case 'Insertion':
      return 'text-orange-600 bg-orange-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

/** ErrorTypeの日本語ラベル */
function getErrorTypeLabel(errorType: string): string {
  switch (errorType) {
    case 'None':
      return '正確（せいかく）';
    case 'Mispronunciation':
      return '発音（はつおん）ミス';
    case 'Omission':
      return '省略（しょうりゃく）';
    case 'Insertion':
      return '余分（よぶん）';
    default:
      return errorType;
  }
}

/** 単語別フィードバック（エラーのみハイライト + 正確は折りたたみ） */
function WordFeedback({ words }: { words: AzureResult['words'] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const correctWords = words.filter((w) => w.errorType === 'None');
  const errorWords = words.filter((w) => w.errorType !== 'None');
  const correctCount = correctWords.length;
  const totalCount = words.length;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      {/* サマリー */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">
          {correctCount === totalCount ? '🎉' : '📊'}
        </span>
        <p className="font-medium text-gray-900">
          <span className={correctCount === totalCount ? 'text-green-700' : 'text-blue-700'}>
            {correctCount}/{totalCount}
          </span>
          {' '}正確（せいかく）に言（い）えました
        </p>
      </div>

      {/* エラーがある単語 */}
      {errorWords.length > 0 && (
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-2">
            注意（ちゅうい）が必要（ひつよう）な単語（たんご）:
          </p>
          <div className="space-y-2">
            {errorWords.map((w, i) => (
              <div
                key={i}
                className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
                  w.errorType === 'Omission'
                    ? 'border-red-200 bg-red-50'
                    : w.errorType === 'Insertion'
                      ? 'border-orange-200 bg-orange-50'
                      : 'border-yellow-200 bg-yellow-50'
                }`}
              >
                <span className="font-medium text-gray-900">{w.word}</span>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${getScoreTextClass(w.accuracyScore)}`}>
                    {Math.round(w.accuracyScore)}
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${getErrorTypeClass(w.errorType)}`}
                  >
                    {getErrorTypeLabel(w.errorType)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 全単語展開トグル */}
      {correctWords.length > 0 && (
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            すべての単語（たんご）を見（み）る（{totalCount}個（こ））
          </button>
          {isExpanded && (
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="px-3 py-2 font-medium text-gray-600">単語（たんご）</th>
                    <th className="px-3 py-2 font-medium text-gray-600">スコア</th>
                    <th className="px-3 py-2 font-medium text-gray-600">結果（けっか）</th>
                  </tr>
                </thead>
                <tbody>
                  {words.map((w, i) => (
                    <tr
                      key={i}
                      className={`border-b border-gray-100 ${w.errorType !== 'None' ? 'bg-yellow-50' : ''}`}
                    >
                      <td className="px-3 py-2 font-medium">{w.word}</td>
                      <td className={`px-3 py-2 font-bold ${getScoreTextClass(w.accuracyScore)}`}>
                        {Math.round(w.accuracyScore)}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${getErrorTypeClass(w.errorType)}`}
                        >
                          {getErrorTypeLabel(w.errorType)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function AzureFeedback({
  result,
  transcription,
  lesson,
  recordingBlob,
  onRetry,
}: AzureFeedbackProps) {
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

  const scoreCards = [
    { label: '正確性（せいかくせい）', score: result.accuracyScore },
    { label: '流暢性（りゅうちょうせい）', score: result.fluencyScore },
    { label: '完全性（かんぜんせい）', score: result.completenessScore },
  ];

  return (
    <div className="space-y-4">
      {/* 総合発音スコア */}
      <div className={`border rounded-lg p-6 text-center ${getScoreBgClass(result.pronunciationScore)}`}>
        <p className="text-sm text-gray-600 mb-1">総合（そうごう）発音（はつおん）スコア</p>
        <p className={`text-5xl font-bold ${getScoreTextClass(result.pronunciationScore)}`}>
          {Math.round(result.pronunciationScore)}
        </p>
        <p className="text-sm text-gray-500 mt-1">/ 100</p>
      </div>

      {/* 認識結果テキスト */}
      {transcription && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            認識（にんしき）結果（けっか）
          </h3>
          <p className="text-gray-900">{transcription}</p>
        </div>
      )}

      {/* 3スコアカード */}
      <div className="grid grid-cols-3 gap-3">
        {scoreCards.map(({ label, score }) => (
          <div
            key={label}
            className="rounded-lg border border-gray-200 p-3 text-center"
          >
            <p className="mb-1 text-xs text-gray-500">{label}</p>
            <p className={`text-2xl font-bold ${getScoreTextClass(score)}`}>
              {Math.round(score)}
            </p>
          </div>
        ))}
      </div>

      {/* 単語別フィードバック */}
      {result.words.length > 0 && (
        <WordFeedback words={result.words} />
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
