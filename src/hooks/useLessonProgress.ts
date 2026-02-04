'use client';

import { useState, useEffect, useCallback } from 'react';
import type { LessonProgress, PracticeStep } from '@/types';

const STORAGE_KEY = 'japanese-talking-progress';

/**
 * レッスン進捗を管理するカスタムフック
 * localStorageに進捗を保存・取得する
 */
export function useLessonProgress() {
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // 初期化時にlocalStorageから読み込み
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, LessonProgress>;
        setProgress(parsed);
      }
    } catch (error) {
      console.error('Failed to load progress from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // localStorageに保存
  const saveToStorage = useCallback((data: Record<string, LessonProgress>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save progress to localStorage:', error);
    }
  }, []);

  // 特定レッスンの進捗を取得
  const getProgress = useCallback(
    (lessonId: string): LessonProgress | null => {
      return progress[lessonId] || null;
    },
    [progress]
  );

  // レッスンを開始（または再開）
  const startLesson = useCallback(
    (lessonId: string) => {
      setProgress((prev) => {
        const existing = prev[lessonId];
        const now = new Date().toISOString();

        const updated = {
          ...prev,
          [lessonId]: existing
            ? {
                ...existing,
                lastPracticedAt: now,
              }
            : {
                lessonId,
                completedSteps: [] as PracticeStep[],
                practiceCount: 0,
                lastPracticedAt: now,
                isCompleted: false,
              },
        };

        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  // ステップを完了としてマーク
  const completeStep = useCallback(
    (lessonId: string, step: PracticeStep) => {
      setProgress((prev) => {
        const existing = prev[lessonId];
        if (!existing) return prev;

        const completedSteps = existing.completedSteps.includes(step)
          ? existing.completedSteps
          : [...existing.completedSteps, step].sort((a, b) => a - b);

        const updated = {
          ...prev,
          [lessonId]: {
            ...existing,
            completedSteps,
            lastPracticedAt: new Date().toISOString(),
          },
        };

        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  // レッスンを完了としてマーク
  const completeLesson = useCallback(
    (lessonId: string) => {
      setProgress((prev) => {
        const existing = prev[lessonId];
        if (!existing) return prev;

        const updated = {
          ...prev,
          [lessonId]: {
            ...existing,
            completedSteps: [1, 2, 3, 4, 5] as PracticeStep[],
            practiceCount: existing.practiceCount + 1,
            lastPracticedAt: new Date().toISOString(),
            isCompleted: true,
          },
        };

        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  // 進捗をリセット
  const resetProgress = useCallback(
    (lessonId?: string) => {
      if (lessonId) {
        // 特定のレッスンのみリセット
        setProgress((prev) => {
          const { [lessonId]: _, ...rest } = prev;
          saveToStorage(rest);
          return rest;
        });
      } else {
        // 全進捗をリセット
        setProgress({});
        localStorage.removeItem(STORAGE_KEY);
      }
    },
    [saveToStorage]
  );

  // 完了済みレッスン数を取得
  const getCompletedCount = useCallback(() => {
    return Object.values(progress).filter((p) => p.isCompleted).length;
  }, [progress]);

  // 全レッスンの進捗一覧を取得
  const getAllProgress = useCallback(() => {
    return Object.values(progress);
  }, [progress]);

  return {
    progress,
    isLoaded,
    getProgress,
    startLesson,
    completeStep,
    completeLesson,
    resetProgress,
    getCompletedCount,
    getAllProgress,
  };
}
