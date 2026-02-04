# プロジェクト AI ガイド（スライド動画生成システム）

> このファイルは、**スライド動画生成システム専用の AI 向けルール集**です。
> 共通ルール（`~/.claude/AI_COMMON_RULES.md`）に加えて、このプロジェクト固有の前提・例外・開発規約を定義します。

---

## 1. プロジェクト概要

- **プロジェクト名**: 社会科・総合科目 スライド動画生成システム
- **概要**:
  - Markdown形式のシナリオからPowerPointスライドと動画を自動生成
  - DALL-E 3による「いらすとや」風イラスト生成
  - Claude APIによるスライド構造化
  - Narakeet APIによる多言語動画生成
  - Google Cloud TTSによるローカル動画生成
- **想定ユーザー**:
  - 教育コンテンツ作成者
  - i-seifu.jp/i-seifu.ac.jp ドメインの教職員

---

## 2. 技術スタック（このプロジェクト専用）

### 2.1 フレームワーク・言語
- **Python**: 3.9以上
- **Streamlit**: 1.31.0以上（Web UI）
- **python-pptx**: PowerPoint生成
- **extra-streamlit-components**: Cookie管理

### 2.2 外部API
- **Anthropic Claude API**: テキスト処理（claude-3-sonnet）
- **OpenAI DALL-E 3**: 画像生成
- **Narakeet API**: 動画生成
- **Google Cloud Text-to-Speech**: 音声生成
- **Gemini API**: 代替TTS

### 2.3 認証・セキュリティ
- **Google OAuth 2.0**: ユーザー認証
- **JWT (HS256)**: トークン管理
- **Cookie認証**: 30日間のログイン維持

> AI への指示：
> 「このプロジェクトでは Python 3.9+ と Streamlit を使用します。
> 新しい機能追加時は既存のアーキテクチャパターンに従ってください。」

---

## 3. ディレクトリ構成ルール

```text
sogo-slide-local-video/
├── app/                    # メインアプリケーション
│   ├── streamlit_app.py    # Streamlit エントリポイント
│   ├── orchestrator.py     # スライド生成オーケストレータ
│   ├── build_slides.py     # Claude API連携
│   ├── image_generator.py  # DALL-E 3連携
│   ├── auth.py             # 認証処理
│   ├── cookie_manager.py   # Cookie管理
│   ├── jwt_utils.py        # JWT処理
│   ├── sessions/           # セッションデータ
│   ├── slides/             # 生成スライド
│   └── output/             # 出力ファイル
├── .streamlit/             # Streamlit設定
├── .claude/                # プロジェクト固有AIルール
├── packaging/              # Windows用パッケージング
├── dev_scripts/            # 開発用スクリプト
└── test/                   # テストファイル
```

### ディレクトリに関するルール

- `app/`: すべてのアプリケーションコードを配置
- `sessions/`: ユーザーセッションごとのデータを保存（YYYYMMDD_HHMMSS形式）
- `slides/`: 生成されたスライドファイル（images/, audio/サブディレクトリ含む）
- `.env`: APIキー設定（絶対にコミットしない）
- `.streamlit/secrets.toml`: 本番環境用設定

> AI への指示例：
> 「新しいモジュールはapp/以下に配置し、セッションデータはsessions/以下に保存してください。」

---

## 4. コーディング規約（このプロジェクト専用）

### 4.1 Python コーディングスタイル

```python
# ✅ 良い例：型ヒント付き関数
from typing import Dict, List, Optional

def generate_slide(
    content: str,
    layout: str = "default",
    options: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    スライドを生成する

    Args:
        content: スライドの内容
        layout: レイアウトタイプ
        options: 追加オプション

    Returns:
        生成されたスライド情報
    """
    # 実装
```

### 4.2 Streamlit特有のパターン

```python
# ✅ 良い例：フラグメントデコレータの使用
import streamlit as st

@st.fragment
def cookie_operation():
    """Cookie操作時の再実行を防ぐ"""
    cookie_manager = stx.CookieManager()
    # Cookie処理
```

### 4.3 API呼び出しとリトライ

```python
# ✅ 良い例：指数バックオフ付きリトライ
def retry_with_backoff(func, max_retries=3):
    for attempt in range(max_retries):
        try:
            return func()
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            wait_time = 2 ** attempt
            time.sleep(wait_time)
```

---

## 5. ビルド・リンタエラー解消ルール

### 5.1 実装完了時の必須チェック

実装完了後、以下のコマンドを実行してエラーがないことを確認：

```bash
# Flake8によるリントチェック
flake8 app/ --max-line-length=120 --extend-ignore=E203,W503

# Python構文チェック
python -m py_compile app/*.py

# インポートチェック
python -c "import app.streamlit_app"

# 型チェック（オプション）
mypy app/ --ignore-missing-imports
```

### 5.2 実装後の自動コードレビュー（重要）

**新規追加ルール**:

実装完了後、**必ず以下の手順でコードレビューを実施すること**：

1. **リンタエラーを完全に解消**
   ```bash
   flake8 app/services/ --max-line-length=120 --extend-ignore=E203,W503
   ```
   - すべてのエラーと警告を修正
   - エラーが残っている場合は実装完了とみなさない

2. **ビルドエラーチェック**
   ```bash
   python -m py_compile app/services/*.py
   ```
   - 構文エラーがないことを確認

3. **セルフコードレビューの実施**
   - セクション12のレビュー観点に基づいて自己チェック
   - 特に以下を重点的に確認：
     - [ ] セキュリティ（APIキー、認証、入力検証）
     - [ ] エラーハンドリング（例外処理、ログ出力）
     - [ ] パフォーマンス（N+1問題、不要なループ）
     - [ ] コード品質（命名規則、DRY原則、型ヒント）

4. **レビュー結果の報告**
   - 問題なし → 実装完了を報告
   - 問題あり → 修正内容を説明してから再レビュー

**実装完了後のレビューフロー**:
```
┌─────────────────┐
│  実装完了       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Flake8実行      │ ← エラーがあれば修正
│ (リンタ)        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ ビルドチェック  │ ← エラーがあれば修正
│ (py_compile)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ セルフレビュー  │ ← セクション12の観点
│ (コード品質)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ レビュー結果    │
│ 報告            │
└─────────────────┘
```

**重要**: リンタエラーが残っている状態でのコードレビューは禁止
- まずエラーを解消してから、品質レビューに進む
- エラー解消とコードレビューを同時に行わない（混乱を避けるため）

> AI への指示：
> 「新しいモジュールやクラスの実装完了後は、以下の順序で必ずチェックしてください：
> 1. flake8でリンタエラーを完全に解消
> 2. python -m py_compileでビルドエラーを確認
> 3. セクション12のレビュー観点に基づいてセルフレビュー実施
> 4. すべて問題なければ実装完了を報告
>
> エラーが残っている場合は、実装完了とみなさず、修正してから報告してください。」

### 5.3 よくあるエラーと対処法

| エラー種別 | 例 | 対処法 |
|-----------|-----|--------|
| F401 | `imported but unused` | 不要なimportを削除 |
| E501 | `line too long` | 120文字以内に収める |
| W291 | `trailing whitespace` | 行末の空白を削除 |
| E302 | `expected 2 blank lines` | クラス/関数間を2行空ける |
| F841 | `assigned but never used` | 未使用変数を削除 |

### 5.4 プロジェクト固有の除外設定

```python
# .flake8 設定
[flake8]
max-line-length = 120
extend-ignore =
    E203,  # whitespace before ':'
    W503,  # line break before binary operator
    E402   # module import not at top (Streamlit用)
exclude =
    .git,
    __pycache__,
    sessions/,
    output/,
    packaging/
```

> AI への指示：
> 「実装完了時は必ずflake8を実行し、すべてのエラーと警告を解消してください。
> エラーが残っている場合は、修正方法も含めて報告してください。」

---

## 6. エラーハンドリング・ロギング

### 6.1 API エラーハンドリング

```python
# ✅ 良い例：詳細なエラーメッセージ
try:
    response = generate_image(prompt)
except openai.RateLimitError:
    st.error("⚠️ DALL-E APIの利用制限に達しました。しばらく待ってから再試行してください。")
    logger.error(f"Rate limit exceeded: {e}")
except Exception as e:
    st.error(f"画像生成中にエラーが発生しました: {str(e)}")
    logger.exception("Unexpected error in image generation")
```

### 6.2 ユーザー向けメッセージ

- 技術的詳細は表示しない
- 対処法を含める
- 日本語で分かりやすく

```python
# ✅ 良い例
st.error("認証エラー: ログインし直してください。")

# ❌ 悪い例
st.error(f"JWT decode failed: {jwt.ExpiredSignatureError}")
```

### 6.3 プロジェクト固有のログ設定

#### ログ出力の設定

```python
import logging
from datetime import datetime

# ログ設定の初期化
def setup_logging():
    log_format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"

    # 本番環境
    if os.getenv("ENVIRONMENT") == "production":
        logging.basicConfig(
            level=logging.INFO,
            format=log_format,
            handlers=[
                logging.FileHandler(f"logs/{datetime.now().strftime('%Y%m%d')}.log"),
                logging.StreamHandler()
            ]
        )
    # 開発環境
    else:
        logging.basicConfig(
            level=logging.DEBUG,
            format=log_format
        )

    return logging.getLogger(__name__)
```

#### 必須のログポイント（このプロジェクト）

| 処理 | ログレベル | 記録内容 |
|------|----------|----------|
| Google OAuth認証 | INFO | ユーザーID、メールアドレス（マスク済み） |
| JWT生成/検証 | INFO | 成功/失敗、有効期限 |
| Claude API呼び出し | INFO | プロンプト長、レスポンス長、処理時間 |
| DALL-E 3画像生成 | INFO | プロンプト、生成枚数、コスト |
| Narakeet動画生成 | INFO | スライド枚数、動画長、言語設定 |
| セッション操作 | DEBUG | セッションID、操作種別 |
| ファイル操作 | INFO | ファイルパス、サイズ、操作種別 |
| エラー発生 | ERROR | 完全なスタックトレース |

#### API呼び出しのログ例

```python
# ✅ 良い例：API呼び出しログ
start_time = time.time()
logger.info(f"Calling Claude API: prompt_length={len(prompt)}")
try:
    response = call_claude_api(prompt)
    elapsed = time.time() - start_time
    logger.info(f"Claude API success: response_length={len(response)}, elapsed={elapsed:.2f}s")
except Exception as e:
    elapsed = time.time() - start_time
    logger.error(f"Claude API failed: elapsed={elapsed:.2f}s, error={str(e)}", exc_info=True)
    raise

# コスト計算のログ
cost = calculate_dalle_cost(num_images)
logger.info(f"DALL-E 3 usage: images={num_images}, cost=${cost:.4f}")
st.session_state.total_cost += cost
```

#### デバッグログの管理

```python
# 🔧 デバッグ時のみ（コミット前に削除）
logger.debug(f"[DEBUG] Session state: {st.session_state}")  # TODO: Remove before commit
print(f"[DEBUG] Processing slide {i}: {slide_data}")  # TODO: Remove before commit

# デバッグ用の詳細ログ（エラー調査時）
if os.getenv("DEBUG_MODE") == "true":
    logger.debug(f"Full API request: {json.dumps(request_data, indent=2)}")
    logger.debug(f"Full API response: {json.dumps(response_data, indent=2)}")
```

---

## 7. セキュリティ・認証ルール

### 7.1 APIキー管理

```python
# ✅ 良い例：環境変数から取得
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in environment")

# ❌ 悪い例：ハードコーディング
api_key = "sk-xxxxxxxxxxxx"  # 絶対にやらない
```

### 7.2 認証チェック

```python
# ✅ 良い例：すべてのページで認証確認
def check_authentication():
    if "authenticated" not in st.session_state:
        st.session_state.authenticated = False

    if not st.session_state.authenticated:
        # Cookie/JWT確認
        saved_token = load_auth_token()
        if saved_token and verify_jwt_token(saved_token):
            st.session_state.authenticated = True
        else:
            # Google OAuth認証画面へ
            show_login_page()
            st.stop()
```

---

## 8. テスト方針

### 8.1 単体テスト

```bash
# pytest実行
pytest app/test/ -v --cov=app --cov-report=html

# 特定のテストのみ
pytest app/test/test_build_slides.py::test_schema_validation
```

### 8.2 重要なテスト項目

- スライド生成のスキーマ検証
- JWT トークンの生成/検証
- Cookie の保存/読み込み
- API リトライメカニズム
- 画像トリミング・サイズ最適化

---

## 9. AI への依頼テンプレート（このプロジェクト専用）

このプロジェクトで AI にコードを書いてもらうときの依頼例：

```text
あなたは Python/Streamlit を使用したスライド動画生成システムの
開発アシスタントです。

共通ルール（~/.claude/AI_COMMON_RULES.md）に加えて、
次のプロジェクト固有ルールを守ってください：
- Streamlit のセッション状態管理パターンに従う
- API呼び出しには必ず指数バックオフ付きリトライを実装
- 認証が必要なページでは check_authentication() を呼ぶ
- エラー時はユーザー向けの日本語メッセージを表示
- 実装完了後は flake8 でエラーチェック

【依頼内容】
新しい動画エクスポート機能を追加してください。
- app/video_exporter.py を作成
- FFmpegを使用してスライドと音声を結合
- プログレスバーをStreamlitで表示
- エラーハンドリングを適切に実装

コード提示後、flake8チェック結果も含めて報告してください。
```

---

## 10. プロジェクト固有の注意事項

### 10.1 Streamlit の制約
- グローバル変数の使用は避ける（`st.session_state`を使用）
- ファイルアップロードは`st.file_uploader`のみ使用
- 再実行時の状態保持に注意

### 10.2 API利用制限
- DALL-E 3: 1分あたり5リクエストまで
- Claude API: 負荷による一時的エラーあり
- Narakeet: 月間制限あり

### 10.3 ファイルサイズ制限
- PowerPoint: 50MB以下を推奨
- 画像: 1枚あたり5MB以下
- 動画: 500MB以下

---

## 11. デバッグ・トラブルシューティング

### 11.1 よくある問題と解決策

| 問題 | 原因 | 解決策 |
|------|------|--------|
| Cookie が保存されない | Streamlit の再実行 | `@st.fragment` デコレータを使用 |
| JWT 検証エラー | 秘密鍵の不一致 | `.env` の `jwt_secret_key` を確認 |
| 画像生成失敗 | API制限 | リトライまたは待機 |
| セッション消失 | タイムアウト | Cookie/JWT で永続化 |

### 11.2 デバッグログの出力

```python
import logging

# デバッグモード設定
if os.getenv("DEBUG_MODE") == "true":
    logging.basicConfig(level=logging.DEBUG)
    logger = logging.getLogger(__name__)
    logger.debug(f"Session state: {st.session_state}")
```

---

## 12. プロジェクト固有のコードレビュー観点

### 12.1 自動コードレビューの実施タイミング

**必ずレビューを実施すべきタイミング:**
1. **実装完了後（最重要）**:
   - 新機能実装・バグ修正が完了した直後
   - **リンタエラーとビルドエラーを解消してから**レビュー実施
   - レビュー前に `flake8` と `python -m py_compile` を実行必須
2. **コミット前**: git commitの前
3. **プルリクエスト前**: ブランチをマージする前
4. **リファクタリング後**: 大規模な変更を行った後
5. **依存関係更新後**: ライブラリやフレームワークの更新時

**重要な注意事項**:
- リンタエラーが残っている状態でのコードレビューは禁止
- まずエラーを解消してから、品質レビューに進む
- エラー解消とコードレビューを同時に行わない（混乱を避けるため）

### 12.2 スライド動画生成システム特有のチェック

#### API利用関連
- [ ] APIキーがハードコーディングされていないか（OpenAI, Anthropic, Narakeet, Google）
- [ ] APIのレート制限対策（リトライ、待機処理）が実装されているか
- [ ] API呼び出し前後でのエラーハンドリング
- [ ] APIレスポンスのタイムアウト設定（特に画像・動画生成）
- [ ] APIコストを考慮した実装（不要な呼び出しの削減）

#### Streamlit特有のセキュリティ
- [ ] st.secrets からの機密情報取得が適切か
- [ ] セッション状態の管理が適切か（st.session_state）
- [ ] ファイルアップロード時のバリデーション
- [ ] Cookie認証トークンの安全な管理
- [ ] @st.cache_dataの適切な使用（機密情報を含まない）

#### メディア処理
- [ ] 画像サイズの検証（DALL-E 3: 1024x1024, 1792x1024等）
- [ ] PowerPointテンプレートの正しい適用
- [ ] 動画生成時のメモリ管理（大きなファイルの処理）
- [ ] 一時ファイルの適切な削除
- [ ] ファイルパスのOSごとの処理（Windows/Linux対応）

### 12.3 Streamlit UI/UX チェック

#### ユーザー体験
- [ ] プログレスバーやスピナーの適切な使用
- [ ] エラー時のユーザーフレンドリーなメッセージ表示
- [ ] st.error, st.warning, st.infoの適切な使い分け
- [ ] 長時間処理時のタイムアウト対策
- [ ] セッションクリア機能の実装

#### パフォーマンス
- [ ] 不要な再レンダリングの防止
- [ ] st.cache_dataによるキャッシュ戦略
- [ ] 大きなデータのセッション状態保存を避ける
- [ ] API呼び出しの並列化・非同期処理

### 12.4 教育コンテンツ生成の品質

#### コンテンツ検証
- [ ] 生成されたスライドの構造が適切か（タイトル、セクション分け）
- [ ] 「いらすとや」風画像プロンプトの適切性
- [ ] 音声生成パラメータの設定（速度、ピッチ、言語）
- [ ] Markdownパースエラーの処理
- [ ] 学年レベルに応じた内容調整

#### 多言語対応
- [ ] 言語コードの正しい処理（ja-JP, en-US等）
- [ ] RTL言語（アラビア語等）への対応考慮
- [ ] 文字エンコーディングの適切な処理

### 12.5 レビュー実施例（スライド動画生成用）

```bash
# 新しいAPI統合時
"services/api_handler.pyの新しいAPI呼び出し処理をレビューして。
特にレート制限とエラーハンドリングを確認"

# Streamlit画面追加時
"pages/new_feature.pyのStreamlit実装をレビューして。
セッション管理とキャッシュ戦略を重点的に"

# 画像・動画生成処理
"services/media_generator.pyの動画生成処理をレビューして。
メモリ管理と一時ファイルの処理を確認"
```

### 12.6 主要モジュール別チェックリスト

#### main.py（エントリーポイント）
- [ ] 認証フローの実装
- [ ] セッション初期化
- [ ] ナビゲーション管理

#### services/scenario_processor.py
- [ ] Markdownパース処理
- [ ] スライド構造の生成
- [ ] エラー時のフォールバック

#### services/image_generator.py
- [ ] DALL-E 3 APIの適切な利用
- [ ] プロンプト生成の品質
- [ ] 画像キャッシュ管理

#### services/video_generator.py
- [ ] Narakeet/Google TTS統合
- [ ] 音声同期の精度
- [ ] 出力ファイルの管理

> AI への指示：
> 「スライド動画生成システムのコードをレビューする際は、
> Streamlit特有の制約、API利用コスト、教育コンテンツの品質に
> 特に注意を払ってください。」

---

## 13. このファイルの運用ルール

- 新機能追加時は該当セクションを更新
- API変更時は技術スタックを更新
- エラーパターンが見つかったら「よくある問題」に追記
- レビュー観点追加時：セクション12を更新
- 月次でドキュメントの整合性を確認

---

### 更新履歴

- 2024-12-10: 初版作成（Cookie認証、JWT実装後）
- 2024-12-10: ビルド・リンタエラー解消ルールを追加
- 2024-12-15: プロジェクト固有のコードレビュー観点を追加（セクション12）
- 2024-12-16: 実装後の自動コードレビュールールを追加
  - セクション5.2: 実装完了後のレビューフロー（リンタ→ビルド→セルフレビュー）
  - セクション12.1: 自動コードレビューの実施タイミング明確化
  - リンタエラー解消後にコードレビューを実施する方針を明記