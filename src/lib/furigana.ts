/**
 * ふりがなユーティリティ
 * 全角括弧内のひらがなを除去してふりがなを非表示にする
 */

/**
 * テキストからふりがな（全角括弧内のひらがな）を除去する
 * 例: "聞（き）く" → "聞く"
 */
export function removeFurigana(text: string): string {
  return text.replace(/（[ぁ-ん]+）/g, '');
}
