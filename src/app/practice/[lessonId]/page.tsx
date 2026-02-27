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
import { useFurigana } from '@/contexts/FuriganaContext';
import { levelColors } from '@/lib/levelColors';
import type { PracticeStep, Lesson, Level } from '@/types';

/** レベルに応じたふりがなのデフォルト値を算出 */
function getDefaultFurigana(level: Level): boolean {
  return level === 'N5' || level === 'N4';
}

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
  const { showFurigana, setShowFurigana, f } = useFurigana();
  const userLanguage = settings.userLanguage;

  // レッスンデータを取得
  useEffect(() => {
    const lessonData = getLessonById(lessonId);
    if (lessonData) {
      setLesson(lessonData);
      // レベルに応じたデフォルト値を設定
      setShowFurigana(getDefaultFurigana(lessonData.level));
      // レッスン開始を記録
      startLesson(lessonId);
    } else {
      setError('レッスンが見（み）つかりませんでした');
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
          <p className="text-gray-600">{f('読（よ）み込（こ）み中（ちゅう）...')}</p>
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
            {error || f('レッスンが見（み）つかりませんでした')}
          </p>
          <button
            onClick={() => router.push('/lessons')}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {f('レッスン一覧（いちらん）に戻（もど）る')}
          </button>
        </div>
      </div>
    );
  }

  // ふりがなトグルを表示するステップ（Step2, Step4, Step5）
  const showFuriganaToggle = currentStep === 2 || currentStep === 4 || currentStep === 5;

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
          {f('レッスン一覧（いちらん）')}
        </button>
        <h1 className="text-xl font-bold text-gray-900">{lesson.title}</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className={`px-2 py-1 text-xs font-medium rounded ${levelColors[lesson.level].badge}`}>
            {lesson.level}
          </span>
          {lesson.category && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded">
              {lesson.category}
            </span>
          )}
          <span className="text-xs text-gray-500">{f('約（やく）')}{lesson.duration}{f('秒（びょう）')}</span>
        </div>
      </div>

      {/* ステップインジケーター */}
      <div className="mb-8">
        <StepIndicator currentStep={currentStep} onStepClick={goToStep} />
      </div>

      {/* ふりがなトグル（Step2/4/5で表示、N2は元々漢字のみなので非表示） */}
      {showFuriganaToggle && lesson.level !== 'N2' && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowFurigana(!showFurigana)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              showFurigana
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="text-base">{showFurigana ? 'あ' : '漢'}</span>
            <span>ふりがな {showFurigana ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      )}

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
            autoPlayCount={settings.autoPlayCount}
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
            practiceMode={settings.practiceMode}
            evaluationTool={settings.evaluationTool}
            onComplete={handleComplete}
            onBack={goToPrevStep}
          />
        )}
      </div>
    </div>
  );
}
