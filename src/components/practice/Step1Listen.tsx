'use client';

import { AudioPlayer } from '@/components/audio';
import type { Lesson } from '@/types';

interface Step1ListenProps {
  lesson: Lesson;
  onComplete: () => void;
}

export function Step1Listen({ lesson, onComplete }: Step1ListenProps) {
  return (
    <div className="space-y-6">
      {/* 説明 */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          まず、聞（き）いてみましょう
        </h2>
        <p className="text-gray-600 text-sm">
          スクリプトを見（み）ないで、音声（おんせい）を1回（かい）聞（き）いてください。
          <br />
          何（なに）が聞（き）き取（と）れたか、確認（かくにん）してみましょう。
        </p>
      </div>

      {/* 音声プレーヤー */}
      <AudioPlayer
        audioUrl={lesson.audioUrl}
        showSpeedControl={false}
        showPlayCount={true}
        size="large"
      />

      {/* ヒント */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2 text-sm">💡 ヒント</h3>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• 全部（ぜんぶ）わからなくても大丈夫（だいじょうぶ）です</li>
          <li>• 聞（き）き取（と）れた単語（たんご）だけでもOK</li>
          <li>• 何回（なんかい）聞（き）いても大丈夫（だいじょうぶ）です</li>
        </ul>
      </div>

      {/* 次へボタン */}
      <button
        onClick={onComplete}
        className="w-full py-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md"
      >
        次（つぎ）へ：スクリプトを見（み）る →
      </button>
    </div>
  );
}
