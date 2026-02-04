'use client';

import { useRouter } from 'next/navigation';
import { useUserSettings, useLessonProgress } from '@/hooks';
import type { Language } from '@/types';

const languages: { value: Language; label: string; native: string }[] = [
  { value: 'ja', label: '日本語', native: '日本語' },
  { value: 'en', label: '英語', native: 'English' },
  { value: 'vi', label: 'ベトナム語', native: 'Tiếng Việt' },
  { value: 'zh', label: '中国語', native: '中文' },
];

export default function SettingsPage() {
  const router = useRouter();
  const {
    settings,
    isLoaded: isSettingsLoaded,
    setUserLanguage,
    setPlaybackSpeed,
    setAutoPlayCount,
    resetSettings,
  } = useUserSettings();
  const {
    isLoaded: isProgressLoaded,
    getCompletedCount,
    getAllProgress,
    resetProgress,
  } = useLessonProgress();

  const isLoaded = isSettingsLoaded && isProgressLoaded;

  // 進捗リセット確認
  const handleResetProgress = () => {
    if (
      window.confirm(
        'すべての学習進捗をリセットしますか？\nこの操作は取り消せません。'
      )
    ) {
      resetProgress();
    }
  };

  // 設定リセット確認
  const handleResetSettings = () => {
    if (
      window.confirm(
        'すべての設定を初期値に戻しますか？\nこの操作は取り消せません。'
      )
    ) {
      resetSettings();
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  const completedCount = getCompletedCount();
  const totalPracticeCount = getAllProgress().reduce(
    (sum, p) => sum + p.practiceCount,
    0
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* ヘッダー */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-2 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          戻る
        </button>
        <h1 className="text-2xl font-bold text-gray-900">設定</h1>
      </div>

      {/* 学習統計 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">学習統計</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 mb-1">完了したレッスン</p>
            <p className="text-2xl font-bold text-blue-700">{completedCount}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600 mb-1">総練習回数</p>
            <p className="text-2xl font-bold text-green-700">
              {totalPracticeCount}
            </p>
          </div>
        </div>
      </section>

      {/* 言語設定 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">言語設定</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            翻訳・説明の言語
          </label>
          <p className="text-xs text-gray-500 mb-3">
            レッスンの翻訳や発音ヒントをどの言語で表示するかを選択します
          </p>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => setUserLanguage(lang.value)}
                className={`p-3 rounded-lg border-2 transition-colors text-left ${
                  settings.userLanguage === lang.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-medium text-gray-900">{lang.native}</p>
                <p className="text-xs text-gray-500">{lang.label}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 再生設定 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">再生設定</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          {/* 再生速度 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              デフォルト再生速度
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.25"
                value={settings.playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="w-16 text-center font-medium text-gray-700">
                {settings.playbackSpeed}x
              </span>
            </div>
          </div>

          {/* 自動再生回数 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ステップ3の再生回数
            </label>
            <p className="text-xs text-gray-500 mb-2">
              「もう一度聴く」ステップで何回再生するかを設定します
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAutoPlayCount(settings.autoPlayCount - 1)}
                disabled={settings.autoPlayCount <= 1}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-12 text-center text-lg font-medium">
                {settings.autoPlayCount}回
              </span>
              <button
                onClick={() => setAutoPlayCount(settings.autoPlayCount + 1)}
                disabled={settings.autoPlayCount >= 10}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* データ管理 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          データ管理
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">学習進捗をリセット</p>
              <p className="text-xs text-gray-500">
                完了したレッスンや練習回数がリセットされます
              </p>
            </div>
            <button
              onClick={handleResetProgress}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              リセット
            </button>
          </div>
          <div className="border-t border-gray-100" />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">設定を初期化</p>
              <p className="text-xs text-gray-500">
                言語・再生設定が初期値に戻ります
              </p>
            </div>
            <button
              onClick={handleResetSettings}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              初期化
            </button>
          </div>
        </div>
      </section>

      {/* アプリ情報 */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          アプリ情報
        </h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            日本語発音練習アプリ（MVP版）
          </p>
          <p className="text-xs text-gray-500 mt-1">Version 1.0.0</p>
        </div>
      </section>
    </div>
  );
}
