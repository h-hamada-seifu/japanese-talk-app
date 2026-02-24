#!/usr/bin/env python3
"""
音声ファイル生成スクリプト（Gemini 2.5 Pro Preview TTS版）

必要な環境変数（.env または .env.local に設定）:
  GEMINI_API_KEY       - Gemini API キー
  GEMINI_TTS_MODEL     - TTSモデル（デフォルト: gemini-2.5-pro-preview-tts）
  GEMINI_TTS_VOICE     - ボイス名（デフォルト: Zephyr）

利用可能なボイス:
  Zephyr, Puck, Charon, Kore, Fenrir, Leda, Orus, Aoede,
  Callirrhoe, Autonoe, Enceladus, Iapetus, Umbriel, Algieba,
  Despina, Erinome, Algenib, Rasalgethi, Laomedeia, Achernar,
  Alnilam, Schedar, Gacrux, Pulcherrima, Achird, Zubenelgenubi,
  Vindemiatrix, Sadachbia, Sadaltager, Sulafat

使用方法:
  pip install google-genai python-dotenv
  python scripts/generate-audio-now.py
"""

import os
import struct
import sys
import time
import wave
from pathlib import Path

from dotenv import load_dotenv
from google import genai
from google.genai import types

# .env / .env.local を読み込み（.env.local が優先）
project_root = Path(__file__).parent.parent
load_dotenv(project_root / ".env.local")
load_dotenv(project_root / ".env")

# --- Gemini TTS 設定 ---
API_KEY = os.getenv("GEMINI_API_KEY")
TTS_MODEL = os.getenv("GEMINI_TTS_MODEL", "gemini-2.5-flash-preview-tts")
TTS_VOICE = os.getenv("GEMINI_TTS_VOICE", "Zephyr")

if not API_KEY:
    print("エラー: GEMINI_API_KEY が設定されていません。")
    print(".env に以下を追加してください:")
    print("  GEMINI_API_KEY=your_api_key_here")
    sys.exit(1)

# --- ElevenLabs 設定（コメントアウト）---
# ELLEVENLABS_API_KEY = os.getenv("ELLEVENLABS_API_KEY")
# ELLEVENLABS_VOICE_ID = os.getenv("ELLEVENLABS_VOICE_ID", "bqpOyYNUu11tjjvRUbKn")  # Yamato
# ELLEVENLABS_MODEL_ID = os.getenv("ELLEVENLABS_MODEL_ID", "eleven_multilingual_v2")

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


def save_wav(filename: Path, pcm_data: bytes, channels: int = 1,
             rate: int = 24000, sample_width: int = 2):
    """PCMデータをWAVファイルとして保存する"""
    with wave.open(str(filename), "wb") as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(sample_width)
        wf.setframerate(rate)
        wf.writeframes(pcm_data)


def generate_audio_gemini(client: genai.Client, text: str, output_path: Path) -> bool:
    """Gemini 2.5 Pro Preview TTS で音声を生成する"""
    # シャドーイング教材向けのプロンプト
    prompt = (
        f"以下の日本語テキストを、日本語学習者のお手本として、"
        f"ゆっくり、はっきり、丁寧に読み上げてください。\n\n{text}"
    )

    response = client.models.generate_content(
        model=TTS_MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_modalities=["AUDIO"],
            speech_config=types.SpeechConfig(
                voice_config=types.VoiceConfig(
                    prebuilt_voice_config=types.PrebuiltVoiceConfig(
                        voice_name=TTS_VOICE,
                    )
                )
            ),
        ),
    )

    data = response.candidates[0].content.parts[0].inline_data.data
    save_wav(output_path, data)
    return True


# --- ElevenLabs 版（コメントアウト）---
# def generate_audio_elevenlabs(text: str, output_path: Path) -> bool:
#     """ElevenLabs APIで音声を生成する"""
#     import requests
#     url = f"https://api.elevenlabs.io/v1/text-to-speech/{ELLEVENLABS_VOICE_ID}"
#     headers = {
#         "Accept": "audio/mpeg",
#         "Content-Type": "application/json",
#         "xi-api-key": ELLEVENLABS_API_KEY,
#     }
#     data = {
#         "text": text,
#         "model_id": ELLEVENLABS_MODEL_ID,
#         "voice_settings": {
#             "stability": 0.8,
#             "similarity_boost": 0.75,
#             "style": 0.0,
#             "use_speaker_boost": True,
#         },
#     }
#     response = requests.post(url, json=data, headers=headers)
#     if response.status_code == 200:
#         with open(output_path, "wb") as f:
#             f.write(response.content)
#         return True
#     else:
#         print(f"  APIエラー ({response.status_code}): {response.text}")
#         return False


def main():
    print("=" * 50)
    print("Gemini 2.5 Pro Preview TTS で音声生成")
    print("=" * 50)
    print(f"モデル : {TTS_MODEL}")
    print(f"ボイス : {TTS_VOICE}")
    print()

    client = genai.Client(api_key=API_KEY)

    # 出力ディレクトリ
    output_dir = Path(__file__).parent.parent / "public" / "audio"
    output_dir.mkdir(parents=True, exist_ok=True)

    success_count = 0
    for i, lesson in enumerate(LESSONS):
        # Gemini TTS は WAV（PCM）で出力される
        filename = output_dir / f"{lesson['id']}.wav"

        # 既に生成済みの場合はスキップ
        if filename.exists() and filename.stat().st_size > 0:
            file_size = filename.stat().st_size / 1024
            print(f"スキップ: {lesson['id']} (既存 {file_size:.1f} KB)")
            success_count += 1
            print()
            continue

        print(f"生成中: {lesson['id']}")
        print(f"  テキスト: {lesson['text']}")

        # レート制限（429）時のリトライ（最大3回）
        max_retries = 3
        for attempt in range(max_retries):
            try:
                if generate_audio_gemini(client, lesson["text"], filename):
                    file_size = filename.stat().st_size / 1024
                    print(f"  完了: {filename.name} ({file_size:.1f} KB)")
                    success_count += 1
                    break
            except Exception as e:
                error_msg = str(e)
                if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg:
                    wait_time = 65  # 1分+αで待機
                    print(f"  レート制限: {wait_time}秒待機中... (リトライ {attempt + 1}/{max_retries})")
                    time.sleep(wait_time)
                else:
                    print(f"  エラー: {e}")
                    break

        # リクエスト間隔を確保
        if i < len(LESSONS) - 1:
            time.sleep(3)

        print()

    print("=" * 50)
    print(f"生成完了: {success_count}/{len(LESSONS)} ファイル")
    print(f"出力先: {output_dir}")
    print("=" * 50)

    if success_count > 0:
        print()
        print("注意: Gemini TTS はWAV形式で出力されます。")
        print("アプリで使用するには、lessons.ts の audioUrl を")
        print("'.mp3' から '.wav' に変更するか、")
        print("ffmpeg で MP3 に変換してください:")
        print("  ffmpeg -i lesson-001.wav -codec:a libmp3lame -qscale:a 2 lesson-001.mp3")


if __name__ == "__main__":
    main()
