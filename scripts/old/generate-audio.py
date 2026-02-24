#!/usr/bin/env python3
"""
音声ファイル生成スクリプト
Google Cloud Text-to-Speech APIを使用してレッスン用音声を生成します。

使用方法:
1. Google Cloud プロジェクトを作成
2. Text-to-Speech API を有効化
3. サービスアカウントキーを取得し、環境変数に設定:
   export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json"
4. 必要なパッケージをインストール:
   pip install google-cloud-texttospeech
5. スクリプトを実行:
   python generate-audio.py
"""

import os
from pathlib import Path

# レッスンデータ
LESSONS = [
    {
        "id": "lesson-001",
        "text": "おはようございます。今日もいい天気ですね。",
    },
    {
        "id": "lesson-002",
        "text": "初めまして。私はリンです。ベトナムから来ました。どうぞよろしくお願いします。",
    },
    {
        "id": "lesson-003",
        "text": "昨日、助けてくれてありがとうございました。本当に助かりました。",
    },
    {
        "id": "lesson-004",
        "text": "今週末は友達と映画を見に行きます。楽しみです。",
    },
    {
        "id": "lesson-005",
        "text": "昨日、友達と映画を見ました。とても面白かったです。",
    },
    {
        "id": "lesson-006",
        "text": "私の趣味は音楽を聴くことです。日本の歌が好きです。",
    },
    {
        "id": "lesson-007",
        "text": "すみません、このおにぎりをください。あと、お茶もお願いします。",
    },
    {
        "id": "lesson-008",
        "text": "すみません、これはいくらですか。",
    },
    {
        "id": "lesson-009",
        "text": "すみません、ラーメンを一つと、餃子をお願いします。",
    },
    {
        "id": "lesson-010",
        "text": "このラーメン、とても美味しいですね。スープが最高です。",
    },
]

def generate_with_google_tts():
    """Google Cloud Text-to-Speech APIで音声生成"""
    try:
        from google.cloud import texttospeech
    except ImportError:
        print("エラー: google-cloud-texttospeech がインストールされていません")
        print("インストール: pip install google-cloud-texttospeech")
        return

    client = texttospeech.TextToSpeechClient()

    # 出力ディレクトリ
    output_dir = Path(__file__).parent.parent / "public" / "audio"
    output_dir.mkdir(parents=True, exist_ok=True)

    # 音声設定
    voice = texttospeech.VoiceSelectionParams(
        language_code="ja-JP",
        name="ja-JP-Neural2-B",  # 女性の自然な声
        ssml_gender=texttospeech.SsmlVoiceGender.FEMALE,
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
        speaking_rate=0.85,  # ゆっくり（超初級者向け）
        pitch=0.0,
    )

    for lesson in LESSONS:
        filename = output_dir / f"{lesson['id']}.mp3"

        # SSMLでポーズを追加（文の間に少し間を入れる）
        ssml_text = f'<speak><prosody rate="slow">{lesson["text"]}</prosody></speak>'

        synthesis_input = texttospeech.SynthesisInput(ssml=ssml_text)

        print(f"生成中: {lesson['id']} - {lesson['text'][:20]}...")

        response = client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )

        with open(filename, "wb") as out:
            out.write(response.audio_content)

        print(f"  完了: {filename}")

    print(f"\n全{len(LESSONS)}ファイルの生成が完了しました！")


def generate_with_voicevox():
    """VOICEVOX APIで音声生成（ローカルでVOICEVOXを起動している場合）"""
    import requests
    import json

    VOICEVOX_URL = "http://localhost:50021"
    SPEAKER_ID = 2  # ずんだもん（ノーマル）

    # 出力ディレクトリ
    output_dir = Path(__file__).parent.parent / "public" / "audio"
    output_dir.mkdir(parents=True, exist_ok=True)

    for lesson in LESSONS:
        filename = output_dir / f"{lesson['id']}.mp3"
        wav_filename = output_dir / f"{lesson['id']}.wav"

        print(f"生成中: {lesson['id']} - {lesson['text'][:20]}...")

        # 音声合成クエリ作成
        query_response = requests.post(
            f"{VOICEVOX_URL}/audio_query",
            params={"text": lesson["text"], "speaker": SPEAKER_ID},
        )
        query = query_response.json()

        # 話速を調整（ゆっくり）
        query["speedScale"] = 0.85

        # 音声合成
        synthesis_response = requests.post(
            f"{VOICEVOX_URL}/synthesis",
            params={"speaker": SPEAKER_ID},
            data=json.dumps(query),
            headers={"Content-Type": "application/json"},
        )

        # WAVファイルとして保存
        with open(wav_filename, "wb") as f:
            f.write(synthesis_response.content)

        print(f"  完了: {wav_filename}")
        print(f"  ※MP3への変換は ffmpeg を使用してください:")
        print(f"    ffmpeg -i {wav_filename} -codec:a libmp3lame -qscale:a 2 {filename}")

    print(f"\n全{len(LESSONS)}ファイルの生成が完了しました！")


def main():
    print("=" * 50)
    print("レッスン音声ファイル生成スクリプト")
    print("=" * 50)
    print()
    print("使用するサービスを選択してください:")
    print("1. Google Cloud Text-to-Speech API")
    print("2. VOICEVOX（ローカル）")
    print()

    choice = input("選択 (1 or 2): ").strip()

    if choice == "1":
        generate_with_google_tts()
    elif choice == "2":
        generate_with_voicevox()
    else:
        print("無効な選択です")


if __name__ == "__main__":
    main()
