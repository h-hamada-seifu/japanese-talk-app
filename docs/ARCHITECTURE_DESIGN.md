# 日本語発音練習アプリ 本番運用設計書

## 1. システム概要

### 1.1 目的
日本語学習者向けのリスニング・発音練習Webアプリケーションを本番運用するための設計書。

### 1.2 主要機能
- **生徒向け**: レッスン表示、発音練習、AI解析フィードバック
- **先生向け**: ダッシュボード、生徒の学習進捗確認、成績管理

---

## 2. システム構成図

```
┌─────────────────────────────────────────────────────────────────────┐
│                           クライアント                               │
│                    (ブラウザ / PWA対応予定)                          │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     japanese-talking (Next.js)                       │
│                         Vercel にデプロイ                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │
│  │   生徒用画面     │  │  先生用Dashboard │  │   API Routes    │     │
│  │  /lessons       │  │  /dashboard      │  │  /api/*         │     │
│  │  /practice      │  │  /dashboard/*    │  │                 │     │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘     │
└─────────────────────────────────────────────────────────────────────┘
          │                       │                      │
          ▼                       ▼                      ▼
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│   auth-server    │   │   Supabase       │   │  api-key-server  │
│   (FastAPI)      │   │   (PostgreSQL)   │   │  (プロキシ)       │
│                  │   │                  │   │                  │
│ - Google OAuth   │   │ - 生徒マスタ     │   │ - Gemini API     │
│ - JWT発行        │   │ - 成績テーブル   │   │ - APIキー管理    │
│ - ロール判定     │   │ - 学習履歴       │   │ - レート制限     │
│   (teacher/      │   │ - クラスマスタ   │   │                  │
│    student)      │   │                  │   │                  │
└──────────────────┘   └──────────────────┘   └──────────────────┘
          │                                            │
          ▼                                            ▼
┌──────────────────┐                        ┌──────────────────┐
│  Google Workspace│                        │   Gemini API     │
│  - ユーザー認証  │                        │   (Google AI)    │
│  - グループ管理  │                        │                  │
└──────────────────┘                        └──────────────────┘
```

---

## 3. 認証・認可フロー

### 3.1 認証フロー

```
1. ユーザーがアプリにアクセス
2. 未認証の場合、auth-server の /login/{project_id} へリダイレクト
3. Google OAuth で認証
4. auth-server がロール判定（teacher/student）
5. JWT トークン発行（role claim 含む）
6. アプリにリダイレクト、JWT をセッション/Cookie に保存
7. ロールに応じた画面を表示
```

### 3.2 ロール別アクセス制御

| ロール | アクセス可能ページ | 機能 |
|--------|-------------------|------|
| student | `/`, `/lessons`, `/practice/*`, `/settings` | レッスン学習、発音練習、設定変更 |
| teacher | 上記 + `/dashboard/*` | 生徒一覧、成績確認、統計表示 |

### 3.3 ロール判定ルール（auth-server設定例）

```json
{
  "role_rules": [
    {
      "priority": 1,
      "condition": "group_membership",
      "value": "teachers@school.jp",
      "role": "teacher"
    },
    {
      "priority": 2,
      "condition": "email_pattern",
      "value": "^\\d{8}@school\\.jp$",
      "role": "student"
    },
    {
      "priority": 99,
      "condition": "default",
      "role": "student"
    }
  ]
}
```

---

## 4. データベース設計（Supabase）

### 4.1 ER図

```
┌─────────────────┐       ┌─────────────────┐
│    students     │       │     classes     │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │──┐    │ id (PK)         │
│ email (UNIQUE)  │  │    │ name            │
│ name            │  │    │ teacher_email   │
│ class_id (FK)   │──┼───▶│ created_at      │
│ created_at      │  │    └─────────────────┘
│ updated_at      │  │
└─────────────────┘  │
         │           │
         ▼           │
┌─────────────────┐  │    ┌─────────────────┐
│ learning_results│  │    │    teachers     │
├─────────────────┤  │    ├─────────────────┤
│ id (PK)         │  │    │ id (PK)         │
│ student_id (FK) │──┘    │ email (UNIQUE)  │
│ lesson_id       │       │ name            │
│ transcription   │       │ created_at      │
│ feedback (JSON) │       └─────────────────┘
│ self_evaluation │
│ practice_count  │
│ practiced_at    │
│ created_at      │
└─────────────────┘
```

### 4.2 テーブル定義

#### students（生徒マスタ）

| カラム | 型 | 制約 | 説明 |
|--------|-----|------|------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | 主キー |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Google Workspaceメール |
| name | VARCHAR(100) | NOT NULL | 表示名 |
| class_id | UUID | FK → classes.id | 所属クラス |
| created_at | TIMESTAMP | DEFAULT NOW() | 作成日時 |
| updated_at | TIMESTAMP | DEFAULT NOW() | 更新日時 |

#### teachers（先生マスタ）

| カラム | 型 | 制約 | 説明 |
|--------|-----|------|------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | 主キー |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Google Workspaceメール |
| name | VARCHAR(100) | NOT NULL | 表示名 |
| created_at | TIMESTAMP | DEFAULT NOW() | 作成日時 |

#### classes（クラスマスタ）

| カラム | 型 | 制約 | 説明 |
|--------|-----|------|------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | 主キー |
| name | VARCHAR(100) | NOT NULL | クラス名（例: "N5-A", "N4-B"） |
| teacher_email | VARCHAR(255) | NOT NULL | 担当教師のメール |
| created_at | TIMESTAMP | DEFAULT NOW() | 作成日時 |

#### learning_results（学習結果/成績）

| カラム | 型 | 制約 | 説明 |
|--------|-----|------|------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | 主キー |
| student_id | UUID | FK → students.id, NOT NULL | 生徒ID |
| lesson_id | VARCHAR(50) | NOT NULL | レッスンID（例: "lesson-001"） |
| transcription | TEXT | | AIが聞き取った文字起こし |
| feedback | JSONB | | AIフィードバック（JSON形式） |
| self_evaluation | VARCHAR(20) | | 自己評価（same/close/difficult/unknown） |
| practice_count | INTEGER | DEFAULT 1 | 練習回数（同日同レッスン） |
| practiced_at | DATE | NOT NULL | 練習日 |
| created_at | TIMESTAMP | DEFAULT NOW() | 作成日時 |

**インデックス:**
```sql
CREATE INDEX idx_learning_results_student_date ON learning_results(student_id, practiced_at);
CREATE INDEX idx_learning_results_lesson ON learning_results(lesson_id);
```

### 4.3 feedback カラムの JSON 構造

```json
{
  "message": "伝わりましたよ！",
  "goodPoints": ["良かった点1", "良かった点2"],
  "improvementTip": "改善ヒント",
  "encouragement": "励ましの言葉"
}
```

---

## 5. API設計

### 5.1 認証関連（auth-server経由）

| エンドポイント | メソッド | 説明 |
|---------------|---------|------|
| `/login/{project_id}` | GET | ログイン開始 |
| `/api/verify` | GET | トークン検証 |
| `/api/refresh` | POST | トークンリフレッシュ |
| `/logout` | GET | ログアウト |

### 5.2 学習関連（japanese-talking）

| エンドポイント | メソッド | 認証 | 説明 |
|---------------|---------|------|------|
| `/api/analyze-speech` | POST | student/teacher | 音声解析（プロキシ経由） |
| `/api/results` | POST | student | 学習結果保存 |
| `/api/results/me` | GET | student | 自分の学習履歴取得 |

### 5.3 ダッシュボード関連（japanese-talking）

| エンドポイント | メソッド | 認証 | 説明 |
|---------------|---------|------|------|
| `/api/dashboard/students` | GET | teacher | 生徒一覧取得 |
| `/api/dashboard/students/{id}` | GET | teacher | 生徒詳細・成績取得 |
| `/api/dashboard/classes` | GET | teacher | クラス一覧取得 |
| `/api/dashboard/statistics` | GET | teacher | 統計情報取得 |

---

## 6. 画面設計

### 6.1 生徒向け画面（既存 + 拡張）

| 画面 | パス | 説明 |
|------|------|------|
| ホーム | `/` | 言語選択、練習開始 |
| レッスン一覧 | `/lessons` | カテゴリ別レッスン表示 |
| 練習画面 | `/practice/[lessonId]` | 5ステップ学習 |
| 設定 | `/settings` | 再生設定、進捗リセット |
| 学習履歴 | `/history` | **新規**: 自分の学習履歴表示 |

### 6.2 先生向けダッシュボード（新規）

| 画面 | パス | 説明 |
|------|------|------|
| ダッシュボードホーム | `/dashboard` | 概要統計、最近の活動 |
| 生徒一覧 | `/dashboard/students` | クラス別生徒リスト |
| 生徒詳細 | `/dashboard/students/[id]` | 個別生徒の成績・履歴 |
| クラス管理 | `/dashboard/classes` | クラス作成・編集 |
| 統計・レポート | `/dashboard/reports` | 全体統計、CSV出力 |

### 6.3 ダッシュボード表示項目

#### 概要統計
- 総生徒数
- 本日のアクティブ生徒数
- 今週の総練習回数
- レッスン別完了率

#### 生徒詳細
- 基本情報（名前、クラス、最終学習日）
- レッスン別進捗（完了/未完了）
- 学習履歴一覧（日付、レッスン、自己評価、AIフィードバック）
- 学習頻度グラフ

---

## 7. プロキシサーバー統合（api-key-server）

### 7.1 目的
- クライアントからAPIキーを隠蔽
- APIリクエストの一元管理
- レート制限・使用量監視

### 7.2 構成

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ japanese-talking│     │  api-key-server │     │   Gemini API    │
│   (Next.js)     │────▶│   (プロキシ)     │────▶│   (Google AI)   │
│                 │     │                 │     │                 │
│ PROXY_URL       │     │ GEMINI_API_KEY  │     │                 │
│ HMAC_SECRET     │     │ HMAC_SECRET     │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 7.3 環境変数設定

#### japanese-talking 側（.env）
```env
# プロキシサーバーURL
PROXY_URL=https://api-key-server.example.com

# HMAC署名用シークレット（api-key-serverと共有）
HMAC_SECRET=your-shared-secret-key

# プロジェクト識別子
PROJECT_ID=japanese-talking
```

#### api-key-server 側
```env
# Gemini APIキー
GEMINI_API_KEY=your-gemini-api-key

# HMAC署名用シークレット（japanese-talkingと共有）
HMAC_SECRET=your-shared-secret-key

# 許可するプロジェクト
ALLOWED_PROJECTS=japanese-talking,other-project
```

### 7.4 リクエストフロー

```
1. japanese-talking: 音声データを受信
2. japanese-talking: HMACで署名を生成
3. japanese-talking: プロキシへリクエスト送信
   POST /api/proxy
   Headers:
     X-Project-ID: japanese-talking
     X-Signature: HMAC署名
     X-Timestamp: タイムスタンプ
   Body: { target: "gemini", payload: {...} }
4. api-key-server: 署名検証
5. api-key-server: Gemini APIへ中継
6. api-key-server: レスポンスを返却
7. japanese-talking: 結果をクライアントへ返却
```

### 7.5 実装変更箇所

| ファイル | 変更内容 |
|---------|---------|
| `src/lib/gemini.ts` | 直接API呼び出し → プロキシ経由に変更 |
| `src/lib/proxy-client.ts` | **新規**: プロキシクライアント実装 |
| `src/app/api/analyze-speech/route.ts` | プロキシクライアント使用に変更 |
| `.env.example` | プロキシ関連環境変数追加 |

### 7.6 エラーハンドリング

| エラー | 対応 |
|--------|------|
| プロキシ接続失敗 | リトライ（最大3回、指数バックオフ） |
| 署名検証失敗 | 401エラー、ログ記録 |
| Gemini APIエラー | エラーメッセージをクライアントへ伝播 |
| レート制限 | 429エラー、リトライ後時間をクライアントへ通知 |

---

## 8. セキュリティ考慮事項

### 8.1 認証・認可
- [x] Google OAuth による認証（auth-server）
- [x] JWT によるセッション管理
- [x] ロールベースアクセス制御（RBAC）
- [ ] APIエンドポイントのロール検証ミドルウェア

### 8.2 データ保護
- [ ] Supabase Row Level Security (RLS) の設定
  - 生徒は自分のデータのみアクセス可能
  - 先生は担当クラスの生徒データのみアクセス可能
- [ ] センシティブデータの暗号化（必要に応じて）

### 8.3 API保護
- [x] プロキシサーバーによるAPIキー隠蔽
- [ ] レート制限の実装
- [ ] CORS設定の厳格化

---

## 9. 追加考慮事項

### 9.1 パフォーマンス

| 課題 | 対策 |
|------|------|
| ダッシュボードの大量データ表示 | ページネーション、無限スクロール |
| 統計クエリの負荷 | 集計テーブル（daily_statistics）の作成 |
| Supabase無料枠の制限 | クエリ最適化、キャッシュ活用 |

### 9.2 追加テーブル提案

#### daily_statistics（日次統計集計）

| カラム | 型 | 説明 |
|--------|-----|------|
| id | UUID | 主キー |
| date | DATE | 集計日 |
| class_id | UUID | クラスID（NULL=全体） |
| active_students | INTEGER | アクティブ生徒数 |
| total_practices | INTEGER | 総練習回数 |
| lessons_completed | JSONB | レッスン別完了数 |

#### notifications（通知/お知らせ）

| カラム | 型 | 説明 |
|--------|-----|------|
| id | UUID | 主キー |
| target_role | VARCHAR | 対象ロール（all/student/teacher） |
| title | VARCHAR | タイトル |
| content | TEXT | 内容 |
| published_at | TIMESTAMP | 公開日時 |

### 9.3 将来の拡張性

| 機能 | 優先度 | 説明 |
|------|--------|------|
| PWA対応 | 高 | オフライン学習、プッシュ通知 |
| 音声お手本の動的生成 | 中 | TTS APIでレッスン追加を容易に |
| 保護者向けポータル | 低 | 学習状況の共有 |
| 多言語UI | 中 | UIの多言語化（現在は日本語のみ） |
| バッジ/実績システム | 低 | モチベーション向上 |

### 9.4 運用考慮事項

| 項目 | 内容 |
|------|------|
| バックアップ | Supabase自動バックアップ + 週次手動エクスポート |
| 監視 | Vercel Analytics、Supabase Dashboard |
| エラー追跡 | Sentry等の導入検討 |
| ログ | auth-serverの監査ログ、Vercel Function Logs |

---

## 10. 実装優先順位

### Phase 1: プロキシ統合【最優先】（推定工数: 1-2日）
1. api-key-server の設定・デプロイ確認
2. japanese-talking の analyze-speech API をプロキシ経由に変更
3. 環境変数の設定（PROXY_URL, HMAC_SECRET等）
4. エラーハンドリング・リトライ処理の実装

### Phase 2: 認証統合（推定工数: 3-5日）
1. auth-server のプロジェクト設定追加
2. Next.jsに認証ミドルウェア追加
3. ロール別ルーティング実装
4. ログイン/ログアウトUIの実装

### Phase 3: データベース構築（推定工数: 2-3日）
1. Supabaseプロジェクト作成
2. テーブル作成・RLS設定
3. 学習結果保存API実装
4. 初回ログイン時の生徒/先生レコード自動作成

### Phase 4: ダッシュボード実装（推定工数: 5-7日）
1. 先生用レイアウト作成
2. 生徒一覧・詳細画面
3. 統計・グラフ表示
4. CSV/Excel出力機能

### Phase 5: 最適化・テスト（推定工数: 2-3日）
1. パフォーマンス最適化
2. E2Eテスト
3. セキュリティ監査

---

## 11. 改訂履歴

| 日付 | バージョン | 内容 |
|------|-----------|------|
| 2026-02-04 | 1.0 | 初版作成 |
| 2026-02-04 | 1.1 | プロキシサーバー統合セクション追加、実装優先順位変更（プロキシ最優先） |
