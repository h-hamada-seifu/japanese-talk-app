'use client';

import { useState, useEffect, useCallback } from 'react';
import type { UserSettings, Language } from '@/types';

const STORAGE_KEY = 'japanese-talking-settings';

const DEFAULT_SETTINGS: UserSettings = {
  userLanguage: 'ja',
  playbackSpeed: 1.0,
  autoPlayCount: 3,
};

/**
 * ユーザー設定を管理するカスタムフック
 * localStorageに設定を保存・取得する
 */
export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // 初期化時にlocalStorageから読み込み
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UserSettings;
        // デフォルト値とマージ（新しい設定項目が追加された場合の対応）
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch (error) {
      console.error('Failed to load settings from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // localStorageに保存
  const saveToStorage = useCallback((data: UserSettings) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save settings to localStorage:', error);
    }
  }, []);

  // 言語設定を更新
  const setUserLanguage = useCallback(
    (language: Language) => {
      setSettings((prev) => {
        const updated = { ...prev, userLanguage: language };
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  // 再生速度を更新
  const setPlaybackSpeed = useCallback(
    (speed: number) => {
      const validSpeed = Math.max(0.5, Math.min(2.0, speed));
      setSettings((prev) => {
        const updated = { ...prev, playbackSpeed: validSpeed };
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  // 自動再生回数を更新
  const setAutoPlayCount = useCallback(
    (count: number) => {
      const validCount = Math.max(1, Math.min(10, Math.floor(count)));
      setSettings((prev) => {
        const updated = { ...prev, autoPlayCount: validCount };
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  // 全設定を更新
  const updateSettings = useCallback(
    (newSettings: Partial<UserSettings>) => {
      setSettings((prev) => {
        const updated = { ...prev, ...newSettings };
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  // 設定をリセット
  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    settings,
    isLoaded,
    setUserLanguage,
    setPlaybackSpeed,
    setAutoPlayCount,
    updateSettings,
    resetSettings,
  };
}
