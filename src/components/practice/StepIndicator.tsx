'use client';

import type { PracticeStep } from '@/types';

interface StepIndicatorProps {
  currentStep: PracticeStep;
  onStepClick?: (step: PracticeStep) => void;
}

const STEPS: { step: PracticeStep; label: string; shortLabel: string }[] = [
  { step: 1, label: '聞く', shortLabel: '聞' },
  { step: 2, label: '理解', shortLabel: '理' },
  { step: 3, label: '再聴', shortLabel: '再' },
  { step: 4, label: '発音', shortLabel: '発' },
  { step: 5, label: '録音', shortLabel: '録' },
];

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* ステップインジケーター */}
      <div className="flex items-center justify-between">
        {STEPS.map(({ step, label, shortLabel }, index) => (
          <div key={step} className="flex items-center flex-1">
            {/* ステップ円 */}
            <button
              onClick={() => onStepClick?.(step)}
              disabled={!onStepClick || step > currentStep}
              className={`
                relative flex items-center justify-center
                w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold text-sm
                transition-all
                ${
                  step === currentStep
                    ? 'bg-blue-500 text-white shadow-md scale-110'
                    : step < currentStep
                      ? 'bg-green-500 text-white cursor-pointer hover:bg-green-600'
                      : 'bg-gray-200 text-gray-500'
                }
              `}
            >
              {step < currentStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span className="sm:hidden">{shortLabel}</span>
              )}
              <span className="hidden sm:inline">{step}</span>
            </button>

            {/* 接続線 */}
            {index < STEPS.length - 1 && (
              <div
                className={`flex-1 h-1 mx-1 sm:mx-2 rounded ${
                  step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* ラベル（PC表示） */}
      <div className="hidden sm:flex justify-between mt-2">
        {STEPS.map(({ step, label }) => (
          <div
            key={step}
            className={`flex-1 text-center text-xs ${
              step === currentStep
                ? 'text-blue-600 font-bold'
                : step < currentStep
                  ? 'text-green-600'
                  : 'text-gray-400'
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* 現在のステップ名（モバイル表示） */}
      <div className="sm:hidden text-center mt-3">
        <span className="text-sm font-medium text-blue-600">
          Step {currentStep}: {STEPS[currentStep - 1].label}
        </span>
      </div>
    </div>
  );
}
