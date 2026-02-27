'use client';

import { useState } from 'react';
import { AudioPlayer } from '@/components/audio';
import { ScriptDisplay } from '@/components/common/ScriptDisplay';
import { useFurigana } from '@/contexts/FuriganaContext';
import type { Lesson, Language, Level } from '@/types';

interface Step2UnderstandProps {
  lesson: Lesson;
  userLanguage: Language;
  onComplete: () => void;
  onBack: () => void;
}

/** N3/N2では母国語翻訳を非表示にする */
function shouldShowTranslation(level: Level): boolean {
  return level === 'N5' || level === 'N4';
}

export function Step2Understand({
  lesson,
  userLanguage,
  onComplete,
  onBack,
}: Step2UnderstandProps) {
  const [showTranslation, setShowTranslation] = useState(false);
  const { f } = useFurigana();

  // 翻訳テキストを取得
  const getTranslation = () => {
    if (userLanguage === 'ja') return null;
    return lesson.translations[userLanguage];
  };

  const translation = getTranslation();

  // 発音ヒントを取得（空配列の場合もjaにフォールバック）
  const getPronunciationTips = () => {
    const tips = lesson.pronunciationTips[userLanguage];
    return tips && tips.length > 0 ? tips : lesson.pronunciationTips.ja;
  };

  return (
    <div className="space-y-6">
      {/* 説明 */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {f('意味（いみ）を確認（かくにん）しましょう')}
        </h2>
        <p className="text-gray-600 text-sm">
          {f('スクリプトと翻訳（ほんやく）を見（み）て、内容（ないよう）を理解（りかい）してください。')}
        </p>
      </div>

      {/* スクリプト */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 mb-2">📝 {f('日本語（にほんご）スクリプト')}</h3>
        <ScriptDisplay lesson={lesson} size="lg" />
      </div>

      {/* 翻訳（日本語以外かつN5/N4の場合） */}
      {translation && shouldShowTranslation(lesson.level) && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="w-full flex items-center justify-between text-sm font-medium text-gray-700"
          >
            <span>🌏 {f('翻訳（ほんやく）')}{showTranslation ? f('を隠（かく）す') : f('を見（み）る')}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform ${showTranslation ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {showTranslation && (
            <p className="mt-3 text-gray-700">{translation}</p>
          )}
        </div>
      )}

      {/* キーワード */}
      {lesson.keywords.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-3">📚 {f('キーワード（重要（じゅうよう）な言葉（ことば））')}</h3>
          <div className="space-y-2">
            {lesson.keywords.map((keyword, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-2 bg-gray-50 rounded"
              >
                <span className="font-bold text-gray-900">{keyword.word}</span>
                <span className="text-gray-500">({keyword.reading})</span>
                {userLanguage !== 'ja' && shouldShowTranslation(lesson.level) && (
                  <span className="text-gray-600 ml-auto">
                    {keyword.meaning[userLanguage]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 発音ポイント */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-medium text-yellow-900 mb-2 text-sm">
          💡 {f('発音（はつおん）ポイント')}
        </h3>
        <ul className="text-yellow-800 text-sm space-y-1">
          {getPronunciationTips().map((tip, index) => (
            <li key={index}>• {tip}</li>
          ))}
        </ul>
      </div>

      {/* スクリプトを見ながら聞く */}
      <div>
        <p className="text-sm text-gray-600 mb-2 text-center">
          {f('スクリプトを見（み）ながら聞（き）いてみましょう')}
        </p>
        <AudioPlayer audioUrl={lesson.audioUrl} showSpeedControl={true} />
      </div>

      {/* ナビゲーションボタン */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
        >
          {f('← 戻（もど）る')}
        </button>
        <button
          onClick={onComplete}
          className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md"
        >
          {f('次（つぎ）へ →')}
        </button>
      </div>
    </div>
  );
}
