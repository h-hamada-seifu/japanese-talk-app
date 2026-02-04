'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getLessonById } from '@/data/lessons';
import {
  StepIndicator,
  Step1Listen,
  Step2Understand,
  Step3Relisten,
  Step4Speak,
  Step5Record,
} from '@/components/practice';
import { useLessonProgress, useUserSettings } from '@/hooks';
import type { PracticeStep, Lesson } from '@/types';

export default function PracticePage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentStep, setCurrentStep] = useState<PracticeStep>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 進捗管理とユーザー設定を取得
  const { startLesson, completeStep, completeLesson } = useLessonProgress();
  const { settings } = useUserSettings();
  const userLanguage = settings.userLanguage;

  // レッスンデータを取得
  useEffect(() => {
    const lessonData = getLessonById(lessonId);
    if (lessonData) {
      setLesson(lessonData);
      // レッスン開始を記録
      startLesson(lessonId);
    } else {
      setError('レッスンが見つかりませんでした');
    }
    setLoading(false);
  }, [lessonId, startLesson]);

  // ステップを進める
  const goToNextStep = () => {
    // 現在のステップを完了としてマーク
    completeStep(lessonId, currentStep);
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as PracticeStep);
    }
  };

  // ステップを戻す
  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as PracticeStep);
    }
  };

  // 特定のステップに移動
  const goToStep = (step: PracticeStep) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  // 練習完了
  const handleComplete = () => {
    // 最終ステップを完了としてマーク
    completeStep(lessonId, 5);
    // レッスン全体を完了としてマーク
    completeLesson(lessonId);
    router.push('/lessons');
  };

  // ローディング
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  // エラー
  if (error || !lesson) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">😢</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">エラー</h1>
          <p className="text-gray-600 mb-6">
            {error || 'レッスンが見つかりませんでした'}
          </p>
          <button
            onClick={() => router.push('/lessons')}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            レッスン一覧に戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* レッスン情報 */}
      <div className="mb-6">
        <button
          onClick={() => router.push('/lessons')}
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
          レッスン一覧
        </button>
        <h1 className="text-xl font-bold text-gray-900">{lesson.title}</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">
            {lesson.category}
          </span>
          <span className="text-xs text-gray-500">{lesson.level}</span>
          <span className="text-xs text-gray-500">約{lesson.duration}秒</span>
        </div>
      </div>

      {/* ステップインジケーター */}
      <div className="mb-8">
        <StepIndicator currentStep={currentStep} onStepClick={goToStep} />
      </div>

      {/* ステップコンテンツ */}
      <div>
        {currentStep === 1 && (
          <Step1Listen lesson={lesson} onComplete={goToNextStep} />
        )}
        {currentStep === 2 && (
          <Step2Understand
            lesson={lesson}
            userLanguage={userLanguage}
            onComplete={goToNextStep}
            onBack={goToPrevStep}
          />
        )}
        {currentStep === 3 && (
          <Step3Relisten
            lesson={lesson}
            onComplete={goToNextStep}
            onBack={goToPrevStep}
          />
        )}
        {currentStep === 4 && (
          <Step4Speak
            lesson={lesson}
            onComplete={goToNextStep}
            onBack={goToPrevStep}
          />
        )}
        {currentStep === 5 && (
          <Step5Record
            lesson={lesson}
            userLanguage={userLanguage}
            onComplete={handleComplete}
            onBack={goToPrevStep}
          />
        )}
      </div>
    </div>
  );
}
