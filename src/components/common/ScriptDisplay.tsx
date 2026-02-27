'use client';

import { useFurigana } from '@/contexts/FuriganaContext';
import type { Lesson } from '@/data/lessons';

interface ScriptDisplayProps {
  lesson: Lesson;
  /** 表示サイズ: 'lg' はStep2/4/5用、'base' はシャドーイング用 */
  size?: 'base' | 'lg';
  className?: string;
}

/**
 * rubyタグからrt要素を除去して漢字のみにする
 */
function stripRubyAnnotations(html: string): string {
  return html.replace(/<rt>[^<]*<\/rt>/g, '');
}

/**
 * レベル別スクリプト表示コンポーネント
 *
 * | レベル | showFurigana=true              | showFurigana=false           |
 * |--------|-------------------------------|------------------------------|
 * | N5/N4  | ひらがな + 漢字補足            | ひらがなのみ（漢字補足を非表示）|
 * | N3     | rubyタグ（ふりがな付き）        | 漢字のみ（rtを除去）          |
 * | N2     | 漢字のみ（変更なし）            | 漢字のみ（変更なし）          |
 */
export function ScriptDisplay({ lesson, size = 'lg', className = '' }: ScriptDisplayProps) {
  const { showFurigana } = useFurigana();
  const level = lesson.level;
  const textSize = size === 'lg' ? 'text-lg' : 'text-xl';

  // N5/N4: ひらがなメイン + 漢字補足（showFurigana=falseなら漢字補足を非表示）
  if (level === 'N5' || level === 'N4') {
    return (
      <div className={className}>
        <p className={`${textSize} text-gray-900 leading-relaxed`}>
          {lesson.script.japanese}
        </p>
        {showFurigana && lesson.script.japaneseKanji !== lesson.script.japanese && (
          <p className="text-sm text-gray-500 mt-2">
            （{lesson.script.japaneseKanji}）
          </p>
        )}
      </div>
    );
  }

  // N3: rubyタグ付きHTML表示（showFurigana=falseならrtを除去して漢字のみ）
  if (level === 'N3' && lesson.script.japaneseWithRuby) {
    const html = showFurigana
      ? lesson.script.japaneseWithRuby
      : stripRubyAnnotations(lesson.script.japaneseWithRuby);

    return (
      <div className={className}>
        <p
          className={`${textSize} text-gray-900 ${showFurigana ? 'leading-loose ruby-text' : 'leading-relaxed'}`}
          dangerouslySetInnerHTML={{ __html: html }}
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
