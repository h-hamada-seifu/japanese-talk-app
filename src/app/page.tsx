'use client';

import Link from 'next/link';
import { useUserSettings } from '@/hooks';
import type { Language } from '@/types';

const languages: { value: Language; label: string; flag: string }[] = [
  { value: 'ja', label: '日本語（にほんご）', flag: '🇯🇵' },
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { value: 'zh', label: '中文', flag: '🇨🇳' },
  { value: 'my', label: 'မြန်မာ', flag: '🇲🇲' },
  { value: 'ne', label: 'नेपाली', flag: '🇳🇵' },
];

export default function Home() {
  const { settings, setUserLanguage, isLoaded } = useUserSettings();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserLanguage(e.target.value as Language);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* アイコン */}
        <div className="text-6xl mb-6">🎧</div>

        {/* タイトル */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          日本語（にほんご）リスニング・発音（はつおん）練習（れんしゅう）
        </h1>

        {/* 説明 */}
        <p className="text-gray-600 mb-6">
          スマートフォンで隙間時間（すきまじかん）に
          <br />
          日本語（にほんご）の聞（き）く力（ちから）・話（はな）す力（ちから）を伸（の）ばそう
        </p>

        {/* 言語選択 */}
        <div className="mb-8 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            あなたの母語（ぼご）を選（えら）んでください
          </label>
          <select
            value={isLoaded ? settings.userLanguage : 'ja'}
            onChange={handleLanguageChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.flag} {lang.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-2">
            翻訳（ほんやく）や発音（はつおん）ヒント、AIアドバイスに使用（しよう）されます
          </p>
        </div>

        {/* メインボタン */}
        <Link
          href="/lessons"
          className="inline-block w-full py-4 px-6 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold rounded-lg text-lg transition-colors shadow-lg"
        >
          練習（れんしゅう）をはじめる
        </Link>

        {/* 特徴リスト */}
        <div className="mt-10 grid grid-cols-3 gap-4 text-center">
          <div className="p-3">
            <div className="text-3xl mb-2">⏱️</div>
            <p className="text-xs text-gray-600">1回（かい）15〜20分（ふん）</p>
          </div>
          <div className="p-3">
            <div className="text-3xl mb-2">📱</div>
            <p className="text-xs text-gray-600">スマホで簡単（かんたん）</p>
          </div>
          <div className="p-3">
            <div className="text-3xl mb-2">🤖</div>
            <p className="text-xs text-gray-600">AIがアドバイス</p>
          </div>
        </div>

        {/* 学習フロー説明 */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow-sm text-left">
          <h2 className="font-bold text-gray-900 mb-3 text-sm">5ステップで学（まな）ぶ</h2>
          <ol className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              音声（おんせい）を聞（き）く
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              スクリプトで意味（いみ）を確認（かくにん）
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
              もう一度（いちど）聞（き）く
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
              声（こえ）に出（だ）して練習（れんしゅう）
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">5</span>
              録音（ろくおん）してAIアドバイス
            </li>
          </ol>
        </div>

        {/* 設定リンク */}
        <Link
          href="/settings"
          className="mt-6 inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          設定（せってい）
        </Link>
      </div>
    </div>
  );
}
