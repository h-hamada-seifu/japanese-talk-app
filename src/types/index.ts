/**
 * 共通型定義
 */

// 対応言語
export type Language = 'ja' | 'en' | 'vi' | 'zh' | 'my' | 'ne';

// 練習モード
export type PracticeMode = 'advice' | 'evaluation';

// 評価ツール
export type EvaluationTool = 'speechsuper' | 'azure';

// レッスンレベル
export type Level = 'N5' | 'N4';

// レッスンカテゴリー
export type Category = '挨拶（あいさつ）' | '日常（にちじょう）' | '買い物（かいもの）' | '食事（しょくじ）' | '交通（こうつう）';

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

// SpeechSuper 音素スコア
export interface PhonemeScore {
  phoneme: string;
  score: number;
}

// SpeechSuper 単語スコア
export interface WordScore {
  word: string;
  score: number;
  phonemes: PhonemeScore[];
}

// SpeechSuper スコア
export interface SpeechSuperScore {
  overall: number;
  pronunciation: number;
  fluency: number;
  completeness: number;
  tone: number;
  rhythm: number;
  speed: number;
}

// SpeechSuper 評価結果
export interface SpeechSuperResult {
  scores: SpeechSuperScore;
  words: WordScore[];
}

// Azure 単語スコア
export interface AzureWordScore {
  word: string;
  accuracyScore: number;
  errorType: 'None' | 'Mispronunciation' | 'Omission' | 'Insertion';
}

// Azure 評価結果
export interface AzureResult {
  recognizedText: string;
  pronunciationScore: number;
  accuracyScore: number;
  fluencyScore: number;
  completenessScore: number;
  words: AzureWordScore[];
}

// 評価モードのフィードバック（SpeechSuper）
export interface EvaluationFeedback {
  result: SpeechSuperResult;
  transcription: string;
}

// ユーザー設定
export interface UserSettings {
  userLanguage: Language;
  playbackSpeed: number;
  autoPlayCount: number;
  practiceMode: PracticeMode;
  evaluationTool: EvaluationTool;
}

// ユーザー進捗全体
export interface UserProgress {
  lessons: Record<string, LessonProgress>;
  settings: UserSettings;
  lastPracticedAt?: string;
}
