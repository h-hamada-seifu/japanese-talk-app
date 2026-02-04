#!/usr/bin/env python3
"""
音声ファイル生成スクリプト（即時実行用）
"""

import os
from pathlib import Path

# 認証情報を設定
credentials_path = Path(__file__).parent.parent / "google-credentials.json"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(credentials_path)

from google.cloud import texttospeech

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

def main():
    print("=" * 50)
    print("Google Cloud Text-to-Speech で音声生成")
    print("=" * 50)
    print(f"認証ファイル: {credentials_path}")
    print()

    client = texttospeech.TextToSpeechClient()

    # 出力ディレクトリ
    output_dir = Path(__file__).parent.parent / "public" / "audio"
    output_dir.mkdir(parents=True, exist_ok=True)

    # 音声設定（日本語女性、ゆっくり）
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

    success_count = 0
    for lesson in LESSONS:
        filename = output_dir / f"{lesson['id']}.mp3"

        # SSMLでゆっくり話すように指定
        ssml_text = f'<speak><prosody rate="slow">{lesson["text"]}</prosody></speak>'

        synthesis_input = texttospeech.SynthesisInput(ssml=ssml_text)

        print(f"生成中: {lesson['id']}")
        print(f"  テキスト: {lesson['text']}")

        try:
            response = client.synthesize_speech(
                input=synthesis_input, voice=voice, audio_config=audio_config
            )

            with open(filename, "wb") as out:
                out.write(response.audio_content)

            # ファイルサイズを確認
            file_size = filename.stat().st_size / 1024
            print(f"  完了: {filename.name} ({file_size:.1f} KB)")
            success_count += 1
        except Exception as e:
            print(f"  エラー: {e}")

        print()

    print("=" * 50)
    print(f"生成完了: {success_count}/{len(LESSONS)} ファイル")
    print(f"出力先: {output_dir}")
    print("=" * 50)


if __name__ == "__main__":
    main()
