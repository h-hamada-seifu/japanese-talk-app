'use client';

import { useRouter } from 'next/navigation';
import { useUserSettings, useLessonProgress } from '@/hooks';
import { useFurigana } from '@/contexts/FuriganaContext';

export default function SettingsPage() {
  const router = useRouter();
  const {
    settings,
    isLoaded: isSettingsLoaded,
    setPlaybackSpeed,
    setAutoPlayCount,
    setPracticeMode,
    resetSettings,
  } = useUserSettings();
  const {
    isLoaded: isProgressLoaded,
    getCompletedCount,
    getAllProgress,
    resetProgress,
  } = useLessonProgress();

  const isLoaded = isSettingsLoaded && isProgressLoaded;
  const { f } = useFurigana();

  // 進捗リセット確認
  const handleResetProgress = () => {
    if (
      window.confirm(
        'すべての学習進捗（がくしゅうしんちょく）をリセットしますか？\nこの操作（そうさ）は取（と）り消（け）せません。'
      )
    ) {
      resetProgress();
    }
  };

  // 設定リセット確認
  const handleResetSettings = () => {
    if (
      window.confirm(
        'すべての設定（せってい）を初期値（しょきち）に戻（もど）しますか？\nこの操作（そうさ）は取（と）り消（け）せません。'
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
          <p className="text-gray-600">{f('読（よ）み込（こ）み中（ちゅう）...')}</p>
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
          {f('戻（もど）る')}
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{f('設定（せってい）')}</h1>
      </div>

      {/* 学習統計 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{f('学習統計（がくしゅうとうけい）')}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 mb-1">{f('完了（かんりょう）したレッスン')}</p>
            <p className="text-2xl font-bold text-blue-700">{completedCount}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600 mb-1">{f('総（そう）練習回数（れんしゅうかいすう）')}</p>
            <p className="text-2xl font-bold text-green-700">
              {totalPracticeCount}
            </p>
          </div>
        </div>
      </section>

      {/* 練習モード */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{f('練習（れんしゅう）モード')}</h2>
        <div className="space-y-3">
          <button
            onClick={() => setPracticeMode('advice')}
            className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
              settings.practiceMode === 'advice'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  settings.practiceMode === 'advice'
                    ? 'border-blue-500'
                    : 'border-gray-300'
                }`}
              >
                {settings.practiceMode === 'advice' && (
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                )}
              </span>
              <div>
                <p className="font-medium text-gray-900">アドバイスモード</p>
                <p className="text-xs text-gray-500 mt-1">
                  {f('採点（さいてん）なし・やさしいアドバイスのみ')}
                </p>
              </div>
            </div>
          </button>
          <button
            onClick={() => setPracticeMode('evaluation')}
            className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
              settings.practiceMode === 'evaluation'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  settings.practiceMode === 'evaluation'
                    ? 'border-green-500'
                    : 'border-gray-300'
                }`}
              >
                {settings.practiceMode === 'evaluation' && (
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                )}
              </span>
              <div>
                <p className="font-medium text-gray-900">{f('評価（ひょうか）モード')}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {f('スコア表示（ひょうじ）あり・詳（くわ）しい発音（はつおん）チェック')}
                </p>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* 再生設定 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{f('再生（さいせい）設定（せってい）')}</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          {/* 再生速度 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {f('デフォルト再生速度（さいせいそくど）')}
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
              {f('ステップ3の再生回数（さいせいかいすう）')}
            </label>
            <p className="text-xs text-gray-500 mb-2">
              {f('「もう一度（いちど）聴（き）く」ステップで何回（なんかい）再生（さいせい）するかを設定（せってい）します')}
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
                {settings.autoPlayCount}{f('回（かい）')}
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
          {f('データ管理（かんり）')}
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{f('学習進捗（がくしゅうしんちょく）をリセット')}</p>
              <p className="text-xs text-gray-500">
                {f('完了（かんりょう）したレッスンや練習回数（れんしゅうかいすう）がリセットされます')}
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
              <p className="font-medium text-gray-900">{f('設定（せってい）を初期化（しょきか）')}</p>
              <p className="text-xs text-gray-500">
                {f('再生設定（さいせいせってい）が初期値（しょきち）に戻（もど）ります')}
              </p>
            </div>
            <button
              onClick={handleResetSettings}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              {f('初期化（しょきか）')}
            </button>
          </div>
        </div>
      </section>

      {/* アプリ情報 */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {f('アプリ情報（じょうほう）')}
        </h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            {f('日本語（にほんご）発音（はつおん）練習（れんしゅう）アプリ（MVP版（ばん））')}
          </p>
          <p className="text-xs text-gray-500 mt-1">Version 1.0.0</p>
        </div>
      </section>
    </div>
  );
}
