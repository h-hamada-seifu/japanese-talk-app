#!/usr/bin/env python3
"""
N4/N3/N2レッスン音声生成スクリプト
Gemini TTS（Zephyr音声）を使用

使い方:
  pip install google-genai pydub
  python scripts/generate-audio-n4-n2.py

注意: ffmpeg が必要です（pydubのポーズ挿入用）
  brew install ffmpeg
"""

import os
import io
import struct
import time
from pathlib import Path
from dotenv import load_dotenv

# .envファイルから環境変数を読み込み
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)

from google import genai

# レッスンデータ（レベル別パラメータ付き）
LESSONS = [
    # ============================================
    # N4（ひらがなでTTSに渡す）
    # ============================================
    {
        "id": "lesson-011",
        "level": "N4",
        "text": "もしもし、あしたの ごご さんじに えきまえで あいませんか。いっしょに かいものに いきたいんですが。じかんが あったら、れんらく ください。",
        "speed_instruction": "丁寧にゆっくり話してください。",
    },
    {
        "id": "lesson-012",
        "level": "N4",
        "text": "すみません、ゆうびんきょくは どこですか。まっすぐ いって、ふたつめの しんごうを みぎに まがると、ひだりがわに あります。",
        "speed_instruction": "丁寧にゆっくり話してください。",
    },
    {
        "id": "lesson-013",
        "level": "N4",
        "text": "きのうから あたまが いたくて、ねつも あります。くすりを のみましたが、まだ よくなりません。せんせい、どうしたら いいですか。",
        "speed_instruction": "丁寧にゆっくり話してください。",
    },
    {
        "id": "lesson-014",
        "level": "N4",
        "text": "がっこうが おわってから、まいにち ごごろくじまで はたらくことが できます。にほんごは まだ じょうずでは ありませんが、がんばります。どうぞ よろしく おねがいします。",
        "speed_instruction": "丁寧にゆっくり話してください。",
    },
    {
        "id": "lesson-015",
        "level": "N4",
        "text": "つぎは しんじゅくえきです。おのりかえの おきゃくさまは こちらで おおりください。でぐちは みぎがわです。おわすれものに ごちゅうい ください。",
        "speed_instruction": "丁寧にゆっくり話してください。",
    },
    # ============================================
    # N3（漢字表記でTTSに渡す）
    # ============================================
    {
        "id": "lesson-016",
        "level": "N3",
        "text": "来月京都に旅行に行く予定です。京都にはお寺や神社がたくさんあって、特に秋は紅葉がきれいだそうです。友達に勧められて、決めました。2泊3日の予定で、旅館に泊まるつもりです。楽しみにしています。",
        "speed_instruction": "やや自然な速度で話してください。",
    },
    {
        "id": "lesson-017",
        "level": "N3",
        "text": "先生、少し相談があるんですが。実は最近授業の内容が難しくなってきて、ついていけなくなっています。特に漢字の読み方が分かりません。何かいい方法はありませんか。勉強の仕方を教えていただけませんか。",
        "speed_instruction": "やや自然な速度で話してください。",
    },
    {
        "id": "lesson-018",
        "level": "N3",
        "text": "店長、来週の金曜日は学校の行事があるので、お休みをいただきたいんですが。代わりに土曜日に入ることができます。シフトを変えていただけると助かります。ご迷惑をおかけしますが、よろしくお願いします。",
        "speed_instruction": "やや自然な速度で話してください。",
    },
    {
        "id": "lesson-019",
        "level": "N3",
        "text": "日本には四季があります。春は桜が咲いて、お花見をします。夏は暑くて、花火大会が人気です。秋は紅葉が美しく、山に行く人が多いです。冬は雪が降って、温泉に入るのが気持ちいいです。どの季節が一番好きですか。",
        "speed_instruction": "やや自然な速度で話してください。",
    },
    {
        "id": "lesson-020",
        "level": "N3",
        "text": "お元気ですか。日本に来てからもう半年になりました。最初は言葉が通じなくて大変でしたが、今は少しずつ日本語が分かるようになってきました。来年、国に帰ったら、会いに行きますね。体に気をつけてください。では、また。",
        "speed_instruction": "やや自然な速度で話してください。",
    },
    # ============================================
    # N2（漢字表記でTTSに渡す）
    # ============================================
    {
        "id": "lesson-021",
        "level": "N2",
        "text": "最近、環境問題に関するニュースをよく耳にします。特に地球温暖化の影響で、異常気象が増えていると言われています。私たちにできることは限られていますが、毎日の生活の中で、省エネルギーやリサイクルを意識することが大切です。未来のために、一人一人が行動する必要があるのではないでしょうか。",
        "speed_instruction": "自然な会話速度で話してください。",
    },
    {
        "id": "lesson-022",
        "level": "N2",
        "text": "就職活動は本当に大変でした。何十社も応募して、面接も何度も受けました。最初は自信がなくて、緊張してうまく話せませんでした。しかし、先輩にアドバイスをもらったり、自分の強みを再確認したりするうちに、少しずつ自信がついてきました。最終的に、自分に合った会社に内定をもらうことができました。諦めずに続けることが大事だと思います。",
        "speed_instruction": "自然な会話速度で話してください。",
    },
    {
        "id": "lesson-023",
        "level": "N2",
        "text": "テクノロジーの発達によって、私たちの生活は大きく変わりました。スマートフォンの普及で、いつでもどこでも情報を得られるようになりました。一方で、SNSの使いすぎが問題になっている面もあります。便利さを享受しながらも、テクノロジーとの付き合い方を考えていく必要があると思います。大事なのは、道具に使われるのではなく、自分で使いこなすことではないでしょうか。",
        "speed_instruction": "自然な会話速度で話してください。",
    },
    {
        "id": "lesson-024",
        "level": "N2",
        "text": "日本に留学して2年が経ちました。振り返ってみると、苦労も多かったですが、それ以上に得たものが大きかったと感じています。日本語の能力はもちろん、異文化を理解する力や、困った時に自分で解決する力も身につきました。国では体験できなかったことをたくさん経験し、人生観が大きく変わりました。この経験を活かして、将来は日本と母国の架け橋になりたいと思っています。",
        "speed_instruction": "自然な会話速度で話してください。",
    },
    {
        "id": "lesson-025",
        "level": "N2",
        "text": "日本では「働き方改革」が進められています。以前は長い時間働くことが美徳とされる風潮がありましたが、最近ではワークライフバランスの重要性が認識されるようになってきました。リモートワークやフレックスタイムの導入により、働き方の選択肢が広がっています。しかし、制度があっても、実際に利用しやすい環境が整っているかどうかが課題です。誰もが自分らしく働ける社会の実現に向けて、さらなる取り組みが必要です。",
        "speed_instruction": "自然な会話速度で話してください。",
    },
]


def generate_audio_gemini(text: str, speed_instruction: str, output_path: Path):
    """Gemini TTS（Zephyr音声）で音声を生成"""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY が .env に設定されていません")

    client = genai.Client(api_key=api_key)

    prompt = f"""あなたは日本語の先生です。以下のテキストを読み上げてください。
{speed_instruction}
句読点では適切な間を取ってください。

テキスト:
{text}"""

    response = client.models.generate_content(
        model="gemini-2.5-flash-preview-tts",
        contents=prompt,
        config=genai.types.GenerateContentConfig(
            response_modalities=["AUDIO"],
            speech_config=genai.types.SpeechConfig(
                voice_config=genai.types.VoiceConfig(
                    prebuilt_voice_config=genai.types.PrebuiltVoiceConfig(
                        voice_name="Zephyr",
                    )
                )
            ),
        ),
    )

    # 音声データを取得
    audio_data = response.candidates[0].content.parts[0].inline_data.data

    # WAVファイルとして保存（PCM 24000Hz 16bit mono）
    sample_rate = 24000
    num_channels = 1
    bits_per_sample = 16
    byte_rate = sample_rate * num_channels * bits_per_sample // 8
    block_align = num_channels * bits_per_sample // 8
    data_size = len(audio_data)

    with open(output_path, "wb") as f:
        # WAVヘッダー
        f.write(b"RIFF")
        f.write(struct.pack("<I", 36 + data_size))
        f.write(b"WAVE")
        f.write(b"fmt ")
        f.write(struct.pack("<I", 16))  # chunk size
        f.write(struct.pack("<H", 1))  # PCM format
        f.write(struct.pack("<H", num_channels))
        f.write(struct.pack("<I", sample_rate))
        f.write(struct.pack("<I", byte_rate))
        f.write(struct.pack("<H", block_align))
        f.write(struct.pack("<H", bits_per_sample))
        f.write(b"data")
        f.write(struct.pack("<I", data_size))
        f.write(audio_data)

    return output_path


def main():
    print("=" * 50)
    print("Gemini TTS（Zephyr）で N4/N3/N2 音声生成")
    print("=" * 50)

    output_dir = Path(__file__).parent.parent / "public" / "audio"
    output_dir.mkdir(parents=True, exist_ok=True)

    success_count = 0
    for lesson in LESSONS:
        output_path = output_dir / f"{lesson['id']}.wav"
        print(f"\n生成中: {lesson['id']} ({lesson['level']})")
        print(f"  テキスト: {lesson['text'][:60]}...")

        try:
            generate_audio_gemini(
                lesson["text"],
                lesson["speed_instruction"],
                output_path,
            )
            file_size = output_path.stat().st_size / 1024
            print(f"  完了: {output_path.name} ({file_size:.1f} KB)")
            success_count += 1

            # レート制限対策
            time.sleep(2)

        except Exception as e:
            print(f"  エラー: {e}")

    print("\n" + "=" * 50)
    print(f"生成完了: {success_count}/{len(LESSONS)} ファイル")
    print(f"出力先: {output_dir}")
    print("=" * 50)


if __name__ == "__main__":
    main()
