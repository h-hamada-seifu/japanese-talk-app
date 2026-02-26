'use client';

import type { Lesson } from '@/data/lessons';

interface ScriptDisplayProps {
  lesson: Lesson;
  /** 表示サイズ: 'lg' はStep2/4/5用、'base' はシャドーイング用 */
  size?: 'base' | 'lg';
  className?: string;
}

/**
 * レベル別スクリプト表示コンポーネント
 *
 * | レベル | メイン表示                     | 補足表示               |
 * |--------|-------------------------------|----------------------|
 * | N5/N4  | script.japanese（全ひらがな）   | script.japaneseKanji |
 * | N3     | script.japaneseWithRuby（ruby） | なし                 |
 * | N2     | script.japaneseKanji（漢字のみ）| なし                 |
 */
export function ScriptDisplay({ lesson, size = 'lg', className = '' }: ScriptDisplayProps) {
  const level = lesson.level;
  const textSize = size === 'lg' ? 'text-lg' : 'text-xl';

  // N5/N4: ひらがなメイン + 漢字補足
  if (level === 'N5' || level === 'N4') {
    return (
      <div className={className}>
        <p className={`${textSize} text-gray-900 leading-relaxed`}>
          {lesson.script.japanese}
        </p>
        {lesson.script.japaneseKanji !== lesson.script.japanese && (
          <p className="text-sm text-gray-500 mt-2">
            （{lesson.script.japaneseKanji}）
          </p>
        )}
      </div>
    );
  }

  // N3: rubyタグ付きHTML表示
  if (level === 'N3' && lesson.script.japaneseWithRuby) {
    return (
      <div className={className}>
        <p
          className={`${textSize} text-gray-900 leading-loose ruby-text`}
          dangerouslySetInnerHTML={{ __html: lesson.script.japaneseWithRuby }}
        />
      </div>
    );
  }

  // N2: 漢字のみ表示（フォールバック含む）
  return (
    <div className={className}>
      <p className={`${textSize} text-gray-900 leading-relaxed`}>
        {lesson.script.japaneseKanji}
      </p>
    </div>
  );
}
