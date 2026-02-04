/**
 * 共通型定義
 */

// 対応言語
export type Language = 'ja' | 'en' | 'vi' | 'zh';

// レッスンレベル
export type Level = 'N5' | 'N4';

// レッスンカテゴリー
export type Category = '挨拶' | '日常' | '買い物' | '食事' | '交通';

// 自己評価
export type SelfEvaluation = 'same' | 'close' | 'difficult' | 'unknown';

// 学習ステップ
export type PracticeStep = 1 | 2 | 3 | 4 | 5;

// レッスンデータ型（lessons.tsから再エクスポート）
export type { Lesson } from '@/data/lessons';

// AIフィードバック
export interface AIFeedback {
  message: string;
  goodPoints: string[];
  improvementTip: string;
  encouragement: string;
}

// 音声解析結果
export interface SpeechAnalysisResult {
  transcription: string;
  feedback: AIFeedback;
}

// レッスン進捗
export interface LessonProgress {
  lessonId: string;
  completedSteps: PracticeStep[];
  practiceCount: number;
  lastPracticedAt: string;
  isCompleted: boolean;
}

// ユーザー設定
export interface UserSettings {
  userLanguage: Language;
  playbackSpeed: number;
  autoPlayCount: number;
}

// ユーザー進捗全体
export interface UserProgress {
  lessons: Record<string, LessonProgress>;
  settings: UserSettings;
  lastPracticedAt?: string;
}
