'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AudioPlayer } from '@/components/audio';
import { lessons } from '@/data/lessons';
import { useUserSettings } from '@/hooks';
type ShadowingMode = 'overlapping' | 'repeating';

const TARGET_PRACTICE_COUNT = 3;

export default function ShadowingPage() {
  const router = useRouter();
  const { settings } = useUserSettings();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<ShadowingMode>('overlapping');
  const [practiceCount, setPracticeCount] = useState(0);
  const [showJapanese, setShowJapanese] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);

  const lesson = lessons[currentIndex];
  const isLastLesson = currentIndex === lessons.length - 1;
  const isEnoughPractice = practiceCount >= TARGET_PRACTICE_COUNT;

  const handlePractice = useCallback(() => {
    setPracticeCount((prev) => prev + 1);
  }, []);

  const handleNext = useCallback(() => {
    if (isLastLesson) {
      router.push('/');
    } else {
      setCurrentIndex((prev) => prev + 1);
      setPracticeCount(0);
    }
  }, [isLastLesson, router]);

  // 母語翻訳を取得
  const userLang = settings.userLanguage;
  const translation = userLang !== 'ja' ? lesson.translations[userLang] : null;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gray-50">
      <div className="max-w-lg mx-auto p-4 space-y-5">
        {/* ヘッダー：レッスン番号とタイトル */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-2">
            {currentIndex + 1} / {lessons.length}
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            {lesson.title}
          </h1>
        </div>

        {/* 表示切替トグル */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setShowJapanese((prev) => !prev)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              showJapanese
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            日本語（にほんご）{showJapanese ? ' ON' : ' OFF'}
          </button>
          {settings.userLanguage !== 'ja' && (
            <button
              onClick={() => setShowTranslation((prev) => !prev)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                showTranslation
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              母語（ぼご）{showTranslation ? ' ON' : ' OFF'}
            </button>
          )}
        </div>

        {/* スクリプト表示エリア */}
        <div className="bg-white border-2 border-blue-200 rounded-lg p-5 shadow-sm min-h-[80px] flex flex-col items-center justify-center gap-3">
          {showJapanese && (
            <p className="text-xl text-gray-900 leading-relaxed text-center">
              {lesson.script.japanese}
            </p>
          )}
          {showTranslation && translation && (
            <p className="text-base text-gray-500 leading-relaxed text-center">
              {translation}
            </p>
          )}
          {!showJapanese && !(showTranslation && translation) && (
            <p className="text-gray-400 text-sm">
              テキストは非表示（ひひょうじ）です
            </p>
          )}
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
              音声（おんせい）と同時（どうじ）に読（よ）む
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
              一文（いちぶん）ずつ真似（まね）する
            </span>
          </button>
        </div>

        {/* 音声プレーヤー */}
        <AudioPlayer audioUrl={lesson.audioUrl} showSpeedControl={true} />

        {/* 練習回数表示 */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
            <span className="text-green-600 font-medium">
              練習回数（れんしゅうかいすう）: {practiceCount} / {TARGET_PRACTICE_COUNT}
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

        {/* 練習完了ボタン */}
        {!isEnoughPractice && (
          <button
            onClick={handlePractice}
            className="w-full py-3 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold rounded-lg transition-colors"
          >
            {mode === 'overlapping' ? '一緒（いっしょ）に読（よ）めた！' : '真似（まね）できた！'}
          </button>
        )}

        {/* 次へ / 終了ボタン */}
        {isEnoughPractice && (
          <button
            onClick={handleNext}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md"
          >
            {isLastLesson
              ? '終了（しゅうりょう）'
              : '次（つぎ）へ →'}
          </button>
        )}

        {/* 補足メッセージ */}
        {!isEnoughPractice && (
          <p className="text-center text-sm text-gray-500">
            あと{TARGET_PRACTICE_COUNT - practiceCount}回（かい）練習（れんしゅう）すると次（つぎ）に進（すす）めます
          </p>
        )}
      </div>
    </div>
  );
}
