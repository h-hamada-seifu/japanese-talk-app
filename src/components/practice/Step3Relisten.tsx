'use client';

import { useState } from 'react';
import { AudioPlayer } from '@/components/audio';
import type { Lesson } from '@/types';

interface Step3RelistenProps {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
}

const TARGET_PLAY_COUNT = 3;

export function Step3Relisten({ lesson, onComplete, onBack }: Step3RelistenProps) {
  const [playCount, setPlayCount] = useState(0);

  const handlePlayCountChange = (count: number) => {
    setPlayCount(count);
  };

  const isEnoughPlays = playCount >= TARGET_PLAY_COUNT;

  return (
    <div className="space-y-6">
      {/* 説明 */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          意味を思い出しながら聞きましょう
        </h2>
        <p className="text-gray-600 text-sm">
          スクリプトを見ないで、{TARGET_PLAY_COUNT}回聞いてみてください。
          <br />
          意味がわかりながら聞けることを確認しましょう。
        </p>
      </div>

      {/* 再生回数表示 */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
          <span className="text-blue-600 font-medium">
            再生回数: {playCount} / {TARGET_PLAY_COUNT}
          </span>
          {isEnoughPlays && (
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
      <AudioPlayer
        audioUrl={lesson.audioUrl}
        showSpeedControl={true}
        showPlayCount={false}
        onPlayCountChange={handlePlayCountChange}
        size="large"
      />

      {/* ヒント */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-medium text-green-900 mb-2 text-sm">💡 ポイント</h3>
        <ul className="text-green-800 text-sm space-y-1">
          <li>• 頭の中で意味をイメージしながら聞く</li>
          <li>• 単語のつながりに注意して聞く</li>
          <li>• わからない部分があれば前のステップに戻ってOK</li>
        </ul>
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
            isEnoughPlays
              ? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500'
          }`}
        >
          次へ：声に出す →
        </button>
      </div>

      {/* 補足メッセージ */}
      {!isEnoughPlays && (
        <p className="text-center text-sm text-gray-500">
          あと{TARGET_PLAY_COUNT - playCount}回聞くと次に進めます
        </p>
      )}
    </div>
  );
}
