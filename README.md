# 日本語リスニング・発音練習アプリ

スマートフォンで隙間時間に日本語の聞く力・話す力を伸ばすための学習アプリです。

## 特徴

- **5ステップ学習フロー**: 効果的な学習メソッドに基づいた段階的な練習
- **AIフィードバック**: Gemini APIによる音声認識とアドバイス生成
- **モバイルファースト**: スマートフォンでの利用に最適化
- **多言語対応**: 日本語/英語/ベトナム語/中国語の翻訳・解説

## 学習フロー

1. **聞く** - お手本の音声を聞く（スクリプトなし）
2. **理解** - スクリプトと翻訳で意味を確認
3. **再聴** - もう一度聞く（3回）
4. **発音** - 声に出して練習（オーバーラッピング/リピーティング）
5. **録音** - 自分の声を録音してAIからアドバイスをもらう

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **AI**: Google Gemini API
- **音声**: Web Audio API / MediaRecorder API

## セットアップ

### 1. リポジトリをクローン

```bash
git clone https://github.com/h-hamada-seifu/japanese-talk-app.git
cd japanese-talk-app
```

### 2. 依存関係をインストール

```bash
npm install
```

### 3. 環境変数を設定

`.env.local` ファイルを作成し、Gemini APIキーを設定:

```
GEMINI_API_KEY=your_api_key_here
```

APIキーは [Google AI Studio](https://aistudio.google.com/) または [Google Cloud Console](https://console.cloud.google.com/) で取得できます。

### 4. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 にアクセス

## スクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | プロダクションビルド |
| `npm run start` | プロダクションサーバー起動 |
| `npm run lint` | ESLint実行 |

## ディレクトリ構成

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # APIルート
│   ├── lessons/           # レッスン一覧ページ
│   ├── practice/          # 練習ページ
│   └── settings/          # 設定ページ
├── components/            # Reactコンポーネント
│   ├── audio/            # 音声関連
│   ├── layout/           # レイアウト
│   └── practice/         # 練習ステップ
├── data/                  # レッスンデータ
├── hooks/                 # カスタムフック
├── lib/                   # ユーティリティ
└── types/                 # 型定義
```

## ライセンス

MIT
