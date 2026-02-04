# 音声ファイル生成ガイド

このディレクトリには、レッスン用の音声ファイル（MP3）を配置します。

## 必要なファイル一覧

| ファイル名 | レッスン | テキスト |
|-----------|---------|---------|
| lesson-001.mp3 | 朝の挨拶 | おはようございます。きょうも いいてんきですね。 |
| lesson-002.mp3 | 自己紹介 | はじめまして。わたしは リンです。ベトナムから きました。どうぞ よろしく おねがいします。 |
| lesson-003.mp3 | お礼を言う | きのう、たすけてくれて ありがとうございました。ほんとうに たすかりました。 |
| lesson-004.mp3 | 週末の予定 | こんしゅうまつは ともだちと えいがを みに いきます。たのしみです。 |
| lesson-005.mp3 | 昨日の出来事 | きのう、ともだちと えいがを みました。とても おもしろかったです。 |
| lesson-006.mp3 | 趣味について | わたしの しゅみは おんがくを きくことです。にほんの うたが すきです。 |
| lesson-007.mp3 | コンビニで | すみません、この おにぎりを ください。あと、おちゃも おねがいします。 |
| lesson-008.mp3 | 値段を聞く | すみません、これは いくらですか。 |
| lesson-009.mp3 | レストランで注文 | すみません、ラーメンを ひとつと、ぎょうざを おねがいします。 |
| lesson-010.mp3 | 食事の感想 | このラーメン、とても おいしいですね。スープが さいこうです。 |

## 音声ファイル生成方法

### 方法1: VOICEVOX（無料・高品質・推奨）

1. [VOICEVOX](https://voicevox.hiroshiba.jp/) をダウンロード・インストール
2. アプリを起動
3. 上記テキストを入力
4. キャラクター選択（推奨: 四国めたん、ずんだもん など）
5. 話速を調整（0.9〜1.0推奨）
6. 「音声書き出し」でMP3/WAV出力

**設定推奨値:**
- 話速: 0.9（ゆっくり）
- 音量: 1.0
- イントネーション: 1.0

### 方法2: Google Cloud Text-to-Speech API

```python
from google.cloud import texttospeech

client = texttospeech.TextToSpeechClient()

texts = {
    "lesson-001": "おはようございます。今日もいい天気ですね。",
    "lesson-002": "初めまして。私はリンです。ベトナムから来ました。どうぞよろしくお願いします。",
    # ... 他のテキスト
}

for filename, text in texts.items():
    synthesis_input = texttospeech.SynthesisInput(text=text)

    voice = texttospeech.VoiceSelectionParams(
        language_code="ja-JP",
        name="ja-JP-Neural2-B",  # 女性の自然な声
        ssml_gender=texttospeech.SsmlVoiceGender.FEMALE
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
        speaking_rate=0.9  # ゆっくり
    )

    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )

    with open(f"{filename}.mp3", "wb") as out:
        out.write(response.audio_content)
```

### 方法3: Amazon Polly

```python
import boto3

polly = boto3.client('polly', region_name='ap-northeast-1')

texts = {
    "lesson-001": "おはようございます。今日もいい天気ですね。",
    # ... 他のテキスト
}

for filename, text in texts.items():
    response = polly.synthesize_speech(
        Text=text,
        OutputFormat='mp3',
        VoiceId='Mizuki',  # 日本語女性
        Engine='neural'
    )

    with open(f"{filename}.mp3", 'wb') as file:
        file.write(response['AudioStream'].read())
```

### 方法4: 教員による録音

1. スマートフォンの録音アプリを使用
2. 静かな環境で録音
3. ゆっくり、はっきり発音
4. MP3形式で保存（128kbps以上推奨）

## 音声ファイルの仕様

| 項目 | 推奨値 |
|------|--------|
| 形式 | MP3 |
| ビットレート | 128kbps以上 |
| サンプルレート | 44.1kHz |
| チャンネル | モノラル or ステレオ |
| 話速 | ゆっくり（通常の0.8〜0.9倍） |

## 注意事項

- 超初級者向けなので、**ゆっくり・はっきり**発音すること
- 文と文の間に適度な間（0.5〜1秒）を入れる
- 背景ノイズは可能な限り除去する
