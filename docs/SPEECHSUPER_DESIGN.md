# SpeechSuper 統合 設計書

> 発音評価モードの追加による、SpeechSuper API 統合の詳細設計

---

## 1. 概要

### 1.1 目的

既存の「アドバイスモード」（Gemini APIによる採点なしフィードバック）に加えて、「評価モード」（SpeechSuperによるスコア表示＋詳細フィードバック）を選択できるようにする。

### 1.2 モード比較

| 項目 | アドバイスモード（既存） | 評価モード（新規） |
|------|------------------------|-------------------|
| 使用API | Gemini API | SpeechSuper API |
| スコア表示 | なし | あり（総合・発音・流暢さ等） |
| フィードバック | やさしいアドバイス文 | スコア＋レーダーチャート＋詳細 |
| 自己評価ステップ | あり | **なし**（スコアが自動算出されるため省略） |
| 対象ユーザー | 超初級者（モチベーション重視） | 評価形式で練習したい学習者 |

### 1.3 決定事項

- モード切替: **設定画面** で行う
- チャート: **recharts** ライブラリを使用
- 評価モードでは自己評価ステップを **省略** する

---

## 2. 環境変数

### `.env.local` に追加する設定

```env
# SpeechSuper API（発音評価モード用）
SPEECHSUPER_APP_KEY=your_app_key
SPEECHSUPER_SECRET_KEY=your_secret_key
```

### 環境変数一覧

| 変数名 | 用途 | 必須 |
|--------|------|------|
| `GEMINI_API_KEY` | Gemini API（アドバイスモード） | アドバイスモード使用時 |
| `SPEECHSUPER_APP_KEY` | SpeechSuper アプリケーションキー | 評価モード使用時 |
| `SPEECHSUPER_SECRET_KEY` | SpeechSuper シークレットキー | 評価モード使用時 |

---

## 3. 新規追加・変更ファイル一覧

### 3.1 新規ファイル

| ファイル | 用途 |
|---------|------|
| `src/lib/speechsuper.ts` | SpeechSuper APIクライアント |
| `src/lib/audioConverter.ts` | Web Audio API による音声フォーマット変換（→ wav） |
| `src/app/api/evaluate-speech/route.ts` | 評価モード用APIエンドポイント |
| `src/components/feedback/ScoreRadarChart.tsx` | レーダーチャートコンポーネント |
| `src/components/feedback/ScoreBarChart.tsx` | 棒グラフコンポーネント |
| `src/components/feedback/SpeechSuperFeedback.tsx` | 評価モードのフィードバック表示全体 |
| `src/components/feedback/index.ts` | feedbackコンポーネント群のエクスポート |

### 3.2 変更ファイル

| ファイル | 変更内容 |
|---------|---------|
| `src/types/index.ts` | SpeechSuper関連の型定義を追加 |
| `src/hooks/useAudioRecorder.ts` | MIMEタイプのフォールバック改善（iOS対応） |
| `src/hooks/useUserSettings.ts` | `practiceMode` 設定を追加 |
| `src/app/settings/page.tsx` | モード切替UIを追加 |
| `src/components/practice/Step5Record.tsx` | モードに応じた分岐処理 + 録音停止時のwav変換 |
| `src/app/practice/[lessonId]/page.tsx` | `practiceMode` を Step5Record に渡す |
| `.env.example` | SpeechSuper環境変数を追加（済） |
| `package.json` | recharts を追加 |

---

## 4. 型定義

### 4.1 新規追加（`src/types/index.ts`）

```typescript
// 練習モード
export type PracticeMode = 'advice' | 'evaluation';

// SpeechSuper 評価スコア
export interface SpeechSuperScore {
  overall: number;        // 総合スコア（0-100）
  pronunciation: number;  // 発音スコア
  fluency: number;        // 流暢さスコア
  completeness: number;   // 完全性スコア
  tone: number;           // トーン/アクセントスコア
  rhythm: number;         // リズムスコア
  speed: number;          // 話す速度（WPM）
}

// SpeechSuper 単語レベル詳細
export interface WordScore {
  word: string;           // 単語テキスト
  score: number;          // 単語スコア（0-100）
  phonemes: PhonemeScore[];
}

// SpeechSuper 音素レベル詳細
export interface PhonemeScore {
  phoneme: string;        // 音素（IPA表記）
  score: number;          // 音素スコア（0-100）
}

// SpeechSuper 評価結果
export interface SpeechSuperResult {
  scores: SpeechSuperScore;
  words: WordScore[];
}

// 評価モードのフィードバック（スコア＋表示用データ）
export interface EvaluationFeedback {
  result: SpeechSuperResult;
  transcription: string;   // SpeechSuperの認識結果テキスト
}
```

### 4.2 変更（`UserSettings` に追加）

```typescript
export interface UserSettings {
  userLanguage: Language;
  playbackSpeed: number;
  autoPlayCount: number;
  practiceMode: PracticeMode;  // 追加
}
```

---

## 5. API設計

### 5.1 SpeechSuper APIクライアント（`src/lib/speechsuper.ts`）

#### 認証署名の生成

```
connectSig = SHA1(appKey + timestamp + secretKey)
startSig   = SHA1(appKey + timestamp + userId + secretKey)
```

#### APIリクエスト

```
POST https://api.speechsuper.com/sent.eval.promax
Content-Type: multipart/form-data
Header: Request-Index: "0"

FormData:
  - text: JSON（認証情報 + 音声設定 + refText）
  - audio: 音声バイナリ
```

#### coreType の選択

| coreType | 用途 | 採用 |
|----------|------|------|
| `word.eval.promax` | 単語評価 | - |
| `sent.eval.promax` | 文評価 | **採用** |
| `para.eval.promax` | 段落評価 | - |

レッスンの内容が文レベルのため `sent.eval.promax` を使用する。

#### リクエストパラメータ構造

```json
{
  "connect": {
    "cmd": "connect",
    "param": {
      "sdk": {
        "version": 16777472,
        "source": 9,
        "protocol": 2
      },
      "app": {
        "applicationId": "<appKey>",
        "sig": "<SHA1(appKey + timestamp + secretKey)>",
        "timestamp": "<timestamp>"
      }
    }
  },
  "start": {
    "cmd": "start",
    "param": {
      "app": {
        "applicationId": "<appKey>",
        "sig": "<SHA1(appKey + timestamp + userId + secretKey)>",
        "userId": "<userId>",
        "timestamp": "<timestamp>"
      },
      "audio": {
        "audioType": "wav",
        "sampleRate": 16000,
        "channel": 1,
        "sampleBytes": 2
      },
      "request": {
        "coreType": "sent.eval.promax",
        "refText": "<お手本テキスト>",
        "tokenId": "<UUID>"
      }
    }
  }
}
```

#### レスポンス（想定構造）

```json
{
  "status": "success",
  "result": {
    "overall": 82,
    "pronunciation": 78,
    "fluency": 85,
    "completeness": 100,
    "tone": 75,
    "rhythm": 80,
    "speed": 120,
    "words": [
      {
        "word": "おはよう",
        "score": 85,
        "phonemes": [
          { "phoneme": "o", "score": 90 },
          { "phoneme": "h", "score": 85 },
          { "phoneme": "a", "score": 80 },
          { "phoneme": "j", "score": 88 },
          { "phoneme": "o:", "score": 82 }
        ]
      }
    ]
  }
}
```

### 5.2 新規APIエンドポイント（`POST /api/evaluate-speech`）

#### リクエスト（FormData）

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `audio` | Blob | 必須 | 録音データ（クライアント側で wav に変換済み） |
| `originalText` | string | 必須 | お手本テキスト（ひらがな/漢字） |
| `userLanguage` | Language | 任意 | ユーザーの母語（デフォルト: 'ja'） |

※ 評価モードでは `selfEvaluation` フィールドは不要
※ 音声はクライアント側で wav（16kHz/モノラル/16bit）に変換されて送信される

#### レスポンス

```json
{
  "result": {
    "scores": {
      "overall": 82,
      "pronunciation": 78,
      "fluency": 85,
      "completeness": 100,
      "tone": 75,
      "rhythm": 80,
      "speed": 120
    },
    "words": [
      {
        "word": "おはよう",
        "score": 85,
        "phonemes": [
          { "phoneme": "o", "score": 90 }
        ]
      }
    ]
  },
  "transcription": "おはようございます"
}
```

#### エラーレスポンス

```json
{
  "error": "SpeechSuper APIの呼び出しに失敗しました: <詳細>"
}
```

---

## 6. UI設計

### 6.1 設定画面の変更

設定画面に「練習モード」セクションを追加する。

```
┌─────────────────────────────┐
│ 練習（れんしゅう）モード      │
│                              │
│  ┌──────────────────────┐   │
│  │ ○ アドバイスモード    │   │
│  │   採点なし・やさしい  │   │
│  │   アドバイスのみ      │   │
│  └──────────────────────┘   │
│  ┌──────────────────────┐   │
│  │ ● 評価モード          │   │
│  │   スコア表示あり・     │   │
│  │   詳しい発音チェック   │   │
│  └──────────────────────┘   │
│                              │
└─────────────────────────────┘
```

### 6.2 Step5 の分岐

#### アドバイスモード（既存のまま）

```
録音 → 自己評価 → AI解析ボタン → Geminiアドバイス表示
```

#### 評価モード（新規）

```
録音 → AI解析ボタン → スコア＋チャート表示
                      （自己評価ステップを省略）
```

### 6.3 評価モードのフィードバック画面

```
┌─────────────────────────────────┐
│    🎯 総合スコア                │
│                                  │
│         ┌───┐                   │
│         │82 │ /100              │
│         └───┘                   │
│    （円形 or 大きな数字表示）    │
│                                  │
├─────────────────────────────────┤
│    📊 詳細スコア（レーダーチャート）│
│                                  │
│         発音                     │
│          78                      │
│    リズム ╱╲ 流暢さ             │
│     80  ╱  ╲  85               │
│        ╱    ╲                   │
│   トーン──────完全性            │
│     75         100               │
│                                  │
├─────────────────────────────────┤
│    📊 項目別スコア（棒グラフ）    │
│                                  │
│    発音        ████████░░ 78    │
│    流暢さ      █████████░ 85    │
│    完全性      ██████████ 100   │
│    トーン      ████████░░ 75    │
│    リズム      ████████░░ 80    │
│                                  │
├─────────────────────────────────┤
│    📝 単語別スコア               │
│                                  │
│    おはよう: 85点                │
│      o(90) ha(85) yo(80) u(82)  │
│    ございます: 79点              │
│      go(82) za(75) i(80) ...    │
│                                  │
│    ※色分け: 80以上=緑,          │
│      60-79=黄, 60未満=赤        │
│                                  │
├─────────────────────────────────┤
│    🎧 聞き比べ                   │
│    お手本: [▶ 再生]             │
│    あなた: [▶ 再生]             │
│                                  │
├─────────────────────────────────┤
│    [もう一度録音する]            │
│                                  │
│    [← 戻る]  [練習完了 ✓]      │
└─────────────────────────────────┘
```

### 6.4 スコアの色分けルール

| スコア範囲 | 色 | Tailwind クラス | 意味 |
|-----------|-----|----------------|------|
| 80〜100 | 緑 | `text-green-600` / `bg-green-500` | 良い |
| 60〜79 | 黄 | `text-yellow-600` / `bg-yellow-500` | もう少し |
| 0〜59 | 赤 | `text-red-600` / `bg-red-500` | 頑張ろう |

### 6.5 スコア表示のラベル（日本語初級者向け）

| 英語キー | 日本語表示 |
|---------|-----------|
| overall | 総合（そうごう） |
| pronunciation | 発音（はつおん） |
| fluency | なめらかさ |
| completeness | 完全（かんぜん）さ |
| tone | アクセント |
| rhythm | リズム |
| speed | はやさ |

---

## 7. コンポーネント設計

### 7.1 `ScoreRadarChart.tsx`

```typescript
interface ScoreRadarChartProps {
  scores: SpeechSuperScore;
}
```

- recharts の `RadarChart` を使用
- 5項目（発音・流暢さ・完全性・トーン・リズム）をレーダー表示
- speed は数値の性質が異なるため除外
- 0-100のスケール

### 7.2 `ScoreBarChart.tsx`

```typescript
interface ScoreBarChartProps {
  scores: SpeechSuperScore;
}
```

- recharts の `BarChart` を使用
- 横向き棒グラフ
- 各項目のスコアとラベルを表示
- 色分けルール適用

### 7.3 `SpeechSuperFeedback.tsx`

```typescript
interface SpeechSuperFeedbackProps {
  result: SpeechSuperResult;
  transcription: string;
  lesson: Lesson;
  recordingUrl: string | null;
  onRetry: () => void;
}
```

- 総合スコア（大きく中央表示）
- レーダーチャート
- 棒グラフ
- 単語別スコア一覧
- 聞き比べセクション

### 7.4 `Step5Record.tsx` の変更

```typescript
// 既存propsにpracticeModeを追加
interface Step5RecordProps {
  lesson: Lesson;
  userLanguage: Language;
  practiceMode: PracticeMode;  // 追加
  onComplete: () => void;
  onBack: () => void;
}
```

- `practiceMode === 'evaluation'` の場合:
  - 自己評価セクションを非表示
  - 解析ボタンのラベルを「発音を評価する」に変更
  - `/api/evaluate-speech` エンドポイントを呼び出す
  - `SpeechSuperFeedback` コンポーネントでフィードバックを表示
- `practiceMode === 'advice'` の場合:
  - 既存の動作のまま

---

## 8. 処理フロー

### 8.1 評価モードのシーケンス

```
ユーザー          フロントエンド              APIルート              SpeechSuper API
  │                   │                        │                       │
  │  録音開始         │                        │                       │
  │────────────>│                        │                       │
  │                   │                        │                       │
  │  録音停止         │                        │                       │
  │────────────>│  webm/mp4 Blob 受取    │                       │
  │                   │  ↓                     │                       │
  │                   │  バックグラウンドで     │                       │
  │                   │  wav 変換開始           │                       │
  │                   │  (0.1〜0.5秒で完了)    │                       │
  │                   │  ↓                     │                       │
  │                   │  wav Blob 準備完了      │                       │
  │                   │                        │                       │
  │ 「評価する」押下  │                        │                       │
  │────────────>│                        │                       │
  │                   │  POST /api/evaluate-speech                     │
  │                   │  (wav audio + text)    │                       │
  │                   │───────────────>│                       │
  │                   │                        │  SHA1署名生成         │
  │                   │                        │  FormData構築         │
  │                   │                        │  POST sent.eval.promax│
  │                   │                        │──────────────>│
  │                   │                        │                       │
  │                   │                        │  スコア＋詳細結果      │
  │                   │                        │<──────────────│
  │                   │                        │                       │
  │                   │  EvaluationFeedback    │                       │
  │                   │<───────────────│                       │
  │                   │                        │                       │
  │ スコア＋チャート表示                       │                       │
  │<────────────│                        │                       │
```

### 8.2 音声フォーマットの変換

#### 8.2.1 課題

ブラウザの `MediaRecorder` が出力するフォーマットはデバイスにより異なる。

| デバイス / ブラウザ | MediaRecorder 出力 |
|---|---|
| PC Chrome / Edge | `audio/webm;codecs=opus` |
| PC Firefox | `audio/webm;codecs=opus` |
| Android Chrome | `audio/webm;codecs=opus` |
| iPhone (iOS 18.4+) | `audio/webm;codecs=opus` |
| iPhone (iOS 14.3〜18.3) | `audio/mp4` (AAC) |

SpeechSuper API が受け付けるフォーマット: **wav, mp3, opus, ogg, amr**

→ **webm も mp4 も SpeechSuper の対応リストに含まれていない。**

また、Gemini API（アドバイスモード）は `inlineData` に Base64 + mimeType で送信しており、マルチモーダルモデルが自動判定するためフォーマット変換は不要。SpeechSuper は `audioType` パラメータで申告した形式に基づいてデコードするため、**実際のフォーマットと一致させる必要がある。**

#### 8.2.2 変換方式: クライアント側で wav に統一（案A）

**Web Audio API** を使用し、録音停止時にバックグラウンドで wav に変換する。

```
録音停止 → MediaRecorder が Blob を出力（webm or mp4、デバイス依存）
              ↓ 即座にバックグラウンド変換開始
         AudioContext.decodeAudioData() で PCM データに変換
              ↓
         WAV ヘッダーを付与して wav Blob を生成
              ↓（変換時間: 0.1〜0.5秒、ユーザーは気づかない）
         wav Blob が準備済みの状態で待機
              ↓
ユーザーが「評価する」ボタンを押す
              ↓
         wav を API に送信（変換待ち時間ゼロ）
```

**この方式を採用した理由:**

| 検討した方式 | 採否 | 理由 |
|---|---|---|
| **案A: 録音停止時にクライアント変換** | **採用** | UX最良（変換時間をユーザーに感じさせない）、全デバイス対応、Vercel対応 |
| 案B: ボタン押下後にクライアント変換 | 不採用 | 案Aとほぼ同等だが、変換時間（0.1〜0.5秒）がボタン押下後の待ち時間に加算される |
| 案C: サーバー側で ffmpeg 変換 | 不採用 | Vercel Serverless Function の 50MB サイズ制限により ffmpeg バイナリをデプロイできない |

**Web Audio API の原理:**
ブラウザが `MediaRecorder` でエンコードに使ったコーデックは、同じブラウザ内にデコーダーも存在する。そのため「自分で録音したものは自分で `decodeAudioData()` できる」ことが保証されており、入口のフォーマット（webm/mp4）に関係なく、出口は常に wav に統一される。

#### 8.2.3 変換ユーティリティ: `src/lib/audioConverter.ts`（新規）

```typescript
/**
 * 音声 Blob を wav フォーマットに変換する
 * Web Audio API の AudioContext.decodeAudioData() を使用
 *
 * @param blob - MediaRecorder が出力した音声 Blob（webm/mp4 等）
 * @returns wav フォーマットの Blob
 */
export async function convertToWav(blob: Blob): Promise<Blob> {
  // 1. Blob → ArrayBuffer
  // 2. AudioContext.decodeAudioData() → AudioBuffer（PCMデータ）
  // 3. AudioBuffer → インターリーブされた Float32 → Int16 PCM
  // 4. WAV ヘッダー（44バイト）を構築して結合
  // 5. wav Blob を返却
}
```

- SpeechSuper 推奨設定: 16bit / 16kHz / モノラル
- `AudioContext` の出力サンプルレートはブラウザ依存（通常 44100Hz or 48000Hz）のため、16kHz にダウンサンプリングする
- ステレオ録音の場合はモノラルにミックスダウンする
- iOS では `AudioContext` が suspend 状態の場合があるため `resume()` を呼ぶ

#### 8.2.4 デバイス別の処理フロー

| デバイス | 録音出力 | decodeAudioData | 変換後 | SpeechSuper audioType |
|---|---|---|---|---|
| PC Chrome / Edge | webm/opus | 対応 | **wav** | `"wav"` |
| PC Firefox | webm/opus | 対応 | **wav** | `"wav"` |
| Android Chrome | webm/opus | 対応 | **wav** | `"wav"` |
| iPhone (iOS 18.4+) | webm/opus | 対応 | **wav** | `"wav"` |
| iPhone (iOS 14.3〜18.3) | mp4/aac | 対応 | **wav** | `"wav"` |

→ **全デバイスで `audioType: "wav"` 固定**で SpeechSuper に送信可能。

#### 8.2.5 既存の iOS 録音問題の修正

現在の `useAudioRecorder.ts` には iOS 18.3 以前で録音が失敗する問題がある。

**現在のコード（問題あり）:**
```typescript
const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
  ? 'audio/webm;codecs=opus'
  : 'audio/webm';  // ← iOS 18.3以前ではこれも非対応でエラー
```

**修正後:**
```typescript
function getSupportedMimeType(): string {
  const types = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/ogg;codecs=opus',
  ];
  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return '';  // ブラウザのデフォルトに任せる
}
```

この修正により:
- PC / Android: `audio/webm;codecs=opus` が選択される（従来通り）
- iPhone (iOS 18.4+): `audio/webm;codecs=opus` が選択される
- iPhone (iOS 14.3〜18.3): `audio/mp4` が選択される
- いずれの場合も、録音後の wav 変換で統一フォーマットになる

#### 8.2.6 wav 変換の影響範囲

| 項目 | 変換前（webm） | 変換後（wav 16kHz/mono） |
|---|---|---|
| 30秒音声のファイルサイズ | 約50〜150KB | 約960KB |
| API送信時間（モバイル回線） | 約0.1〜0.3秒 | 約0.5〜1.5秒 |
| 変換にかかる時間 | — | 0.1〜0.5秒（録音停止時にバックグラウンド実行） |

→ ファイルサイズは増加するが、16kHz/モノラルにダウンサンプリングすることで非圧縮 wav としては最小限に抑えられる。録音停止〜ボタン押下の間に変換が完了するため、ユーザー体感の待ち時間への影響はない。

---

## 9. 実装順序

### Phase 1: 基盤（型定義 + バックエンド）（実装済み）
1. `src/types/index.ts` に型定義を追加
2. `src/lib/speechsuper.ts` を作成（APIクライアント）
3. `src/app/api/evaluate-speech/route.ts` を作成

### Phase 2: 設定画面（実装済み）
4. `src/hooks/useUserSettings.ts` に `practiceMode` を追加
5. `src/app/settings/page.tsx` にモード切替UIを追加

### Phase 3: チャートコンポーネント（実装済み）
6. `recharts` をインストール
7. `src/components/feedback/ScoreRadarChart.tsx` を作成
8. `src/components/feedback/ScoreBarChart.tsx` を作成
9. `src/components/feedback/SpeechSuperFeedback.tsx` を作成
10. `src/components/feedback/index.ts` を作成

### Phase 4: Step5 統合（実装済み）
11. `src/components/practice/Step5Record.tsx` を改修
12. 練習画面 (`src/app/practice/[lessonId]/page.tsx`) から `practiceMode` を渡す

### Phase 5: 音声フォーマット変換 + iOS 対応（未実装）
13. `src/lib/audioConverter.ts` を新規作成（Web Audio API による wav 変換）
    - `convertToWav(blob: Blob): Promise<Blob>` を実装
    - 16kHz / モノラル / 16bit にダウンサンプリング
    - WAV ヘッダーの構築
14. `src/hooks/useAudioRecorder.ts` の MIMEタイプ選択を改善（iOS 対応）
    - `audio/mp4` へのフォールバックを追加
    - ブラウザのデフォルトへの最終フォールバック
15. `src/components/practice/Step5Record.tsx` に録音停止時のバックグラウンド wav 変換を統合
    - `handleRecordingComplete` 内で `convertToWav()` を呼び出し
    - 変換完了した wav Blob を状態に保持
    - 評価モードでは wav Blob を API に送信

### Phase 6: テスト・調整
16. ビルド確認（`npm run build`）
17. PC ブラウザでの動作テスト（録音 → wav変換 → SpeechSuper API → スコア表示）
18. SpeechSuper APIレスポンス構造の実地確認（サーバーログで生JSONを確認）
19. レスポンシブ対応の確認（モバイル 375px / タブレット 768px）
20. （可能であれば）iPhone 実機テスト

---

## 10. エラーハンドリング

| エラー種別 | ユーザー向けメッセージ | 対処 |
|-----------|----------------------|------|
| APIキー未設定 | 「評価（ひょうか）モードは現在（げんざい）使（つか）えません」 | 設定画面でモード選択を無効化 |
| SpeechSuper API接続エラー | 「接続（せつぞく）エラーが発生（はっせい）しました。もう一度（いちど）お試（ため）しください」 | リトライボタン表示 |
| 音声認識失敗 | 「音声（おんせい）が聞（き）き取（と）れませんでした。もう一度（いちど）録音（ろくおん）してください」 | 再録音ボタン表示 |
| レート制限 | 「しばらく待（ま）ってからもう一度（いちど）お試（ため）しください」 | 30秒待機を推奨 |
| wav変換失敗 | 「音声（おんせい）の変換（へんかん）に失敗（しっぱい）しました。もう一度（いちど）録音（ろくおん）してください」 | 再録音ボタン表示。`decodeAudioData` が失敗した場合に発生（破損した音声データ等） |
| MediaRecorder非対応 | 「このブラウザでは録音（ろくおん）できません。Chrome（クローム）をお使（つか）いください」 | 対応ブラウザへの誘導。iOS 14.2以前で発生 |

---

## 11. 今後の拡張可能性

- SpeechSuperのスコアデータをGemini APIに渡し、スコアに基づいた具体的なアドバイスを生成する「ハイブリッドモード」
- 学習履歴にスコアを保存し、時系列での成長を可視化
- 単語評価（`word.eval.promax`）を使った単語レベルの個別練習機能
