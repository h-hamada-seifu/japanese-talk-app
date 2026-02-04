# Japanese Talking - プロジェクト固有ルール

> 日本語リスニング・発音練習アプリ（超初級者向け）

---

## 1. プロジェクト概要

### 目的
日本語超初級者（N5以下）向けに、スマートフォンで隙間時間（15〜20分）にできるリスニング・発音練習アプリを提供する。

### 対象ユーザー
- 日本語超初級者（N5以下）
- リスニングがままならず、授業についていけないレベル
- 日本に来たばかりの留学生

### 設計方針
| 方針 | 理由 |
|------|------|
| **採点しない** | できないことが数値化されるとモチベーションが下がる |
| **アドバイス型** | 「伝わった」を前提に、改善点を具体的に伝える |
| **短時間で完結** | 1回15〜20分、隙間時間に取り組める |
| **母語サポート** | 超初級者には母語での説明が効果的 |

---

## 2. 技術スタック

### フロントエンド
| 技術 | バージョン | 用途 |
|------|-----------|------|
| Next.js | 14.x (App Router) | フレームワーク |
| React | 18.x | UIライブラリ |
| TypeScript | 5.x | 型安全 |
| TailwindCSS | 3.x | スタイリング |

### バックエンド/API
| 技術 | 用途 |
|------|------|
| Next.js API Routes | バックエンドエンドポイント |
| **Gemini API** | 音声認識 + AIアドバイス生成 |

### データ管理（Phase 1）
| 項目 | 方式 |
|------|------|
| レッスンデータ | `src/data/lessons.ts`（静的） |
| 音声ファイル | `public/audio/*.mp3`（静的） |
| 学習進捗 | localStorage |

---

## 3. ディレクトリ構造

```
japanese-talking/
├── CLAUDE.md                    # このファイル（プロジェクトルール）
├── DESIGN.md                    # 詳細設計書
├── google-credentials.json      # ※.gitignoreに追加必須
├── public/
│   └── audio/
│       └── lesson-*.mp3         # 音声ファイル（10個）
├── scripts/
│   └── generate-audio-now.py    # 音声生成スクリプト
└── src/
    ├── app/
    │   ├── page.tsx             # ホーム画面
    │   ├── layout.tsx           # ルートレイアウト
    │   ├── globals.css          # グローバルスタイル
    │   ├── lessons/
    │   │   └── page.tsx         # レッスン一覧
    │   ├── practice/
    │   │   └── [lessonId]/
    │   │       └── page.tsx     # 練習画面（5ステップ）
    │   ├── settings/
    │   │   └── page.tsx         # 設定画面
    │   └── api/
    │       └── analyze-speech/
    │           └── route.ts     # 音声解析API（Gemini）
    ├── components/
    │   ├── layout/
    │   │   └── Header.tsx
    │   ├── practice/
    │   │   ├── StepIndicator.tsx
    │   │   ├── Step1Listen.tsx
    │   │   ├── Step2Understand.tsx
    │   │   ├── Step3Relisten.tsx
    │   │   ├── Step4Speak.tsx
    │   │   └── Step5Record.tsx
    │   ├── audio/
    │   │   ├── AudioPlayer.tsx
    │   │   ├── AudioRecorder.tsx
    │   │   └── AudioCompare.tsx
    │   └── feedback/
    │       ├── SelfEvaluation.tsx
    │       └── AIFeedback.tsx
    ├── hooks/
    │   ├── useAudioPlayer.ts
    │   ├── useAudioRecorder.ts
    │   └── useLessonProgress.ts
    ├── lib/
    │   └── gemini.ts            # Gemini API クライアント
    ├── data/
    │   └── lessons.ts           # レッスンデータ
    └── types/
        ├── lesson.ts
        └── progress.ts
```

---

## 4. コーディング規約（プロジェクト固有）

### 4.1 コンポーネント命名
- ページコンポーネント: `page.tsx`（Next.js App Router規約）
- UIコンポーネント: PascalCase（例: `AudioPlayer.tsx`）
- フック: camelCase + `use`プレフィックス（例: `useAudioRecorder.ts`）

### 4.2 スタイリング
- **TailwindCSS**を使用（CSS-in-JSやCSS Modulesは使わない）
- レスポンシブ: モバイルファースト（`sm:`, `md:`, `lg:`）
- カラー: Tailwindのデフォルトパレットを使用

### 4.3 状態管理
- **useState/useReducer**で十分（Redux/Zustandは不要）
- サーバー状態: 必要になればReact Query検討
- 永続化: localStorage（Phase 1）

### 4.4 API設計
```typescript
// POST /api/analyze-speech
// Request（FormData）
{
  audio: Blob;                // webm/mp3
  originalText: string;       // お手本テキスト
  selfEvaluation: 'same' | 'close' | 'difficult' | 'unknown';
  userLanguage: 'ja' | 'en' | 'vi' | 'zh';
}

// Response
{
  transcription: string;
  feedback: {
    message: string;
    goodPoints: string[];
    improvementTip: string;
    encouragement: string;
  }
}
```

---

## 5. 5ステップ学習フロー

```
Step 1: 聞く（1〜2分）
  └→ 音声を1回聞く、メモ（任意）

Step 2: 理解（3〜5分）
  └→ スクリプト・翻訳確認、単語チェック

Step 3: 再聴（2〜3分）
  └→ スクリプトなしで2〜3回聞く

Step 4: 発音（4〜6分）
  └→ オーバーラッピング/リピーティング

Step 5: 録音＋AI（3〜5分）
  └→ 録音 → AI認識結果 → 自己評価 → アドバイス
```

---

## 6. Gemini API プロンプト

```
あなたは日本語学習をサポートする優しい先生です。
学生の発音をお手本と比較して、アドバイスしてください。

ルール：
- 最初に「伝わった」ことを認める（重要）
- 良かった点を1〜2個見つける
- 改善点は1個だけ、具体的に伝える
- 点数やスコアは絶対につけない
- 励ましの言葉で終わる
- やさしい日本語で書く（N5レベル）
- ユーザーの母語が{userLanguage}なので、必要に応じて補足を入れる

入力情報：
- お手本テキスト: {originalText}
- 学生の発音（音声認識結果）: {transcription}
- 学生の自己評価: {selfEvaluation}

出力フォーマット（JSON）:
{
  "message": "伝わりました！",
  "goodPoints": ["良かった点1", "良かった点2"],
  "improvementTip": "改善ヒント1個",
  "encouragement": "励ましの言葉"
}
```

---

## 7. 対応言語

| 言語 | コード | UI | 翻訳 | 発音ヒント |
|------|--------|----|----|----------|
| 日本語 | ja | ○ | - | ○ |
| 英語 | en | ○ | ○ | ○ |
| ベトナム語 | vi | △ | ○ | ○ |
| 中国語 | zh | △ | ○ | ○ |

---

## 8. 環境変数

```env
# .env.local
GEMINI_API_KEY=your_gemini_api_key
```

> **注意**: `google-credentials.json` は `.gitignore` に追加すること

---

## 9. 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番起動
npm run start

# 音声ファイル生成（Python）
python scripts/generate-audio-now.py
```

---

## 10. Phase 1 スコープ（MVP）

### 含める
- [x] 5ステップ学習フロー
- [x] 10レッスン（音声＋例文）
- [x] 音声再生機能
- [x] 音声録音機能
- [x] Gemini API連携（音声認識＋アドバイス）
- [x] 4言語翻訳・ヒント
- [x] レスポンシブUI（スマホ優先）
- [ ] localStorage進捗保存

### 含めない（Phase 2以降）
- ユーザー認証
- DB保存
- 学習履歴ダッシュボード
- 教員管理画面

---

## 11. 参照ドキュメント

| ファイル | 内容 |
|---------|------|
| `DESIGN.md` | 詳細設計書（画面設計、API設計など） |
| `listening-pronunciation-learning-method.md` | 元の学習法仕様 |
| `src/data/lessons.ts` | レッスンデータ定義 |
| `public/audio/README.md` | 音声ファイル生成ガイド |

---

## 12. 共通ルールとの関係

- グローバル `~/.claude/CLAUDE.md` のルールを継承
- 本プロジェクト固有のルール（技術スタック、API設計など）を優先
- コミットメッセージ、PRテンプレートは共通ルールに従う
