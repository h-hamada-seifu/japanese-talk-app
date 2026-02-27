'use client';

import { useState } from 'react';
import Link from 'next/link';
import { lessons, getCategories, getLessonsByCategory, getLessonsByLevel, getLevels } from '@/data/lessons';
import { useLessonProgress } from '@/hooks';
import { useFurigana } from '@/contexts/FuriganaContext';
import { levelColors } from '@/lib/levelColors';
import type { Category, Level } from '@/types';

export default function LessonsPage() {
  const availableLevels = getLevels();
  const categories = getCategories();
  const [selectedLevel, setSelectedLevel] = useState<Level>('N5');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>(
    'all'
  );
  const { getProgress, getCompletedCount, isLoaded } = useLessonProgress();
  const { f } = useFurigana();

  // レベルでフィルタ → さらにカテゴリでフィルタ（N5のみカテゴリあり）
  const levelLessons = getLessonsByLevel(selectedLevel);
  const filteredLessons =
    selectedCategory === 'all' || selectedLevel !== 'N5'
      ? levelLessons
      : levelLessons.filter((l) => l.category === selectedCategory);

  const completedCount = getCompletedCount();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* ページヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{f('レッスン一覧（いちらん）')}</h1>
        <Link
          href="/settings"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label={f('設定（せってい）')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        </Link>
      </div>

      {/* 進捗サマリー */}
      {isLoaded && completedCount > 0 && (
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">{f('完了（かんりょう）したレッスン')}</p>
              <p className="text-xl font-bold text-gray-900">
                {completedCount} / {lessons.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* レベルタブ */}
      <div className="mb-4 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {availableLevels.map((level) => {
            const count = getLessonsByLevel(level).length;
            return (
              <button
                key={level}
                onClick={() => {
                  setSelectedLevel(level);
                  setSelectedCategory('all');
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedLevel === level
                    ? levelColors[level].active
                    : levelColors[level].inactive
                }`}
              >
                {level} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* カテゴリーフィルター（N5のみ表示） */}
      {selectedLevel === 'N5' && (
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              すべて ({levelLessons.length})
            </button>
            {categories.map((category) => {
              const count = levelLessons.filter((l) => l.category === category).length;
              if (count === 0) return null;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* レッスンリスト */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredLessons.map((lesson) => {
          const progress = getProgress(lesson.id);
          const isCompleted = progress?.isCompleted;
          const practiceCount = progress?.practiceCount || 0;

          return (
            <Link
              key={lesson.id}
              href={`/practice/${lesson.id}`}
              className={`block bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-all active:scale-[0.98] ${
                isCompleted
                  ? 'border-green-300 hover:border-green-400'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {/* ヘッダー */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${levelColors[lesson.level].badge}`}>
                    {lesson.level}
                  </span>
                  {lesson.category && (
                    <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded">
                      {lesson.category}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {isCompleted && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {f('完了（かんりょう）')}
                    </span>
                  )}
                </div>
              </div>

              {/* タイトル */}
              <h2 className="font-bold text-gray-900 mb-2">{lesson.title}</h2>

              {/* スクリプト（一部） */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {lesson.script.japanese}
              </p>

              {/* フッター */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span>{f('約（やく）')}{lesson.duration}{f('秒（びょう）')}</span>
                  {practiceCount > 0 && (
                    <span className="px-2 py-0.5 bg-gray-100 rounded">
                      {practiceCount}{f('回（かい）練習（れんしゅう）')}
                    </span>
                  )}
                </div>
                <span
                  className={`flex items-center gap-1 font-medium ${
                    isCompleted ? 'text-green-500' : 'text-blue-500'
                  }`}
                >
                  {isCompleted ? f('もう一度（いちど）') : f('練習（れんしゅう）する')}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* レッスンが0件の場合 */}
      {filteredLessons.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>このカテゴリーにはレッスンがありません</p>
        </div>
      )}
    </div>
  );
}
