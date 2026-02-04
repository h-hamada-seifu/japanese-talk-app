'use client';

import { useState } from 'react';
import { AudioPlayer } from '@/components/audio';
import type { Lesson } from '@/types';

interface Step4SpeakProps {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
}

type PracticeMode = 'overlapping' | 'repeating';

const TARGET_PRACTICE_COUNT = 3;

export function Step4Speak({ lesson, onComplete, onBack }: Step4SpeakProps) {
  const [mode, setMode] = useState<PracticeMode>('overlapping');
  const [practiceCount, setPracticeCount] = useState(0);

  const handlePractice = () => {
    setPracticeCount((prev) => prev + 1);
  };

  const isEnoughPractice = practiceCount >= TARGET_PRACTICE_COUNT;

  return (
    <div className="space-y-6">
      {/* 説明 */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          声に出してみましょう
        </h2>
        <p className="text-gray-600 text-sm">
          お手本を聞きながら、一緒に声に出して練習しましょう。
        </p>
      </div>

      {/* モード選択 */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('overlapping')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-colors ${
            mode === 'overlapping'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="block font-bold">オーバーラッピング</span>
          <span className="block text-xs mt-1 opacity-80">
            音声と同時に読む
          </span>
        </button>
        <button
          onClick={() => setMode('repeating')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-colors ${
            mode === 'repeating'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="block font-bold">リピーティング</span>
          <span className="block text-xs mt-1 opacity-80">
            一文ずつ真似する
          </span>
        </button>
      </div>

      {/* スクリプト表示 */}
      <div className="bg-white border-2 border-blue-200 rounded-lg p-4 shadow-sm">
        <p className="text-xl text-gray-900 leading-relaxed text-center">
          {lesson.script.japanese}
        </p>
      </div>

      {/* 練習回数表示 */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
          <span className="text-green-600 font-medium">
            練習回数: {practiceCount} / {TARGET_PRACTICE_COUNT}
          </span>
          {isEnoughPractice && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>

      {/* 音声プレーヤー */}
      <AudioPlayer audioUrl={lesson.audioUrl} showSpeedControl={true} />

      {/* 練習完了ボタン */}
      <button
        onClick={handlePractice}
        className="w-full py-3 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold rounded-lg transition-colors"
      >
        {mode === 'overlapping' ? '一緒に読めた！' : '真似できた！'} ✓
      </button>

      {/* モード別のヒント */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-medium text-yellow-900 mb-2 text-sm">
          💡 {mode === 'overlapping' ? 'オーバーラッピング' : 'リピーティング'}のコツ
        </h3>
        {mode === 'overlapping' ? (
          <ul className="text-yellow-800 text-sm space-y-1">
            <li>• 音声を再生しながら、同時にスクリプトを読む</li>
            <li>• お手本のスピード・リズムに合わせる</li>
            <li>• 最初は難しくても、繰り返すとできるようになります</li>
          </ul>
        ) : (
          <ul className="text-yellow-800 text-sm space-y-1">
            <li>• 音声を少し聞いて、一時停止</li>
            <li>• 聞いた部分を真似して言う</li>
            <li>• 自分のペースでゆっくり練習できます</li>
          </ul>
        )}
      </div>

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
          className={`flex-1 py-3 font-bold rounded-lg transition-colors shadow-md ${
            isEnoughPractice
              ? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500'
          }`}
        >
          次へ：録音 →
        </button>
      </div>

      {/* 補足メッセージ */}
      {!isEnoughPractice && (
        <p className="text-center text-sm text-gray-500">
          あと{TARGET_PRACTICE_COUNT - practiceCount}回練習すると次に進めます
        </p>
      )}
    </div>
  );
}
