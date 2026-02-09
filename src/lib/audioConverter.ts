/**
 * Web Audio API を使用した音声フォーマット変換ユーティリティ
 * ブラウザの MediaRecorder が出力する音声（webm/mp4 等）を
 * SpeechSuper API が受け付ける wav フォーマットに変換する
 */

/** SpeechSuper 推奨設定 */
const TARGET_SAMPLE_RATE = 16000;
const TARGET_CHANNELS = 1;
const BITS_PER_SAMPLE = 16;

/** ノーマライゼーションのターゲットピーク値（-3dB ≈ 0.707） */
const NORMALIZE_TARGET_PEAK = 0.7;

/** ノーマライゼーションの最小ピーク閾値（これ以下は無音とみなす） */
const NORMALIZE_MIN_THRESHOLD = 0.001;

/**
 * 音声 Blob を wav フォーマットに変換する（正規化付き）
 *
 * @param blob - MediaRecorder が出力した音声 Blob（webm/mp4 等）
 * @returns wav フォーマットの Blob（16kHz/モノラル/16bit PCM、正規化済み）
 * @throws 変換に失敗した場合
 */
export async function convertToWav(blob: Blob): Promise<Blob> {
  // 1. Blob → ArrayBuffer
  const arrayBuffer = await blob.arrayBuffer();

  // 2. AudioContext でデコード → PCM データ（AudioBuffer）
  //    iOS では AudioContext が suspend 状態の場合があるため resume() を呼ぶ
  const audioContext = new AudioContext();
  try {
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // 3. モノラルにミックスダウン + 16kHz にリサンプリング
    const monoData = mixdownToMono(audioBuffer);
    const resampledData = resample(monoData, audioBuffer.sampleRate, TARGET_SAMPLE_RATE);

    // 4. ノーマライゼーション（マイク入力が小さい場合でも適正音量に増幅）
    const normalizedData = normalize(resampledData, NORMALIZE_TARGET_PEAK);

    // 5. Float32 → Int16 PCM に変換
    const pcmData = float32ToInt16(normalizedData);

    // 6. WAV ヘッダーを構築して結合
    const wavBuffer = createWavFile(pcmData, TARGET_SAMPLE_RATE, TARGET_CHANNELS, BITS_PER_SAMPLE);

    return new Blob([wavBuffer], { type: 'audio/wav' });
  } finally {
    await audioContext.close();
  }
}

/**
 * 録音 Blob を正規化した wav に変換する（プレビュー再生用）
 * convertToWav と同じ処理だが、サンプルレートは元のまま保持して音質を維持する
 *
 * @param blob - MediaRecorder が出力した音声 Blob
 * @returns 正規化済み wav Blob（元のサンプルレート/モノラル/16bit PCM）
 */
export async function normalizeForPlayback(blob: Blob): Promise<Blob> {
  const arrayBuffer = await blob.arrayBuffer();
  const audioContext = new AudioContext();
  try {
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const monoData = mixdownToMono(audioBuffer);

    // サンプルレートはそのまま（音質維持）、音量のみ正規化
    const normalizedData = normalize(monoData, NORMALIZE_TARGET_PEAK);
    const pcmData = float32ToInt16(normalizedData);
    const wavBuffer = createWavFile(pcmData, audioBuffer.sampleRate, TARGET_CHANNELS, BITS_PER_SAMPLE);

    return new Blob([wavBuffer], { type: 'audio/wav' });
  } finally {
    await audioContext.close();
  }
}

/**
 * AudioBuffer をモノラルに変換する
 * ステレオの場合は左右チャンネルの平均値を取る
 */
function mixdownToMono(audioBuffer: AudioBuffer): Float32Array {
  if (audioBuffer.numberOfChannels === 1) {
    // getChannelData は参照を返すため、変更しないようコピーする
    return new Float32Array(audioBuffer.getChannelData(0));
  }

  const length = audioBuffer.length;
  const mono = new Float32Array(length);
  const channels = audioBuffer.numberOfChannels;

  for (let i = 0; i < length; i++) {
    let sum = 0;
    for (let ch = 0; ch < channels; ch++) {
      sum += audioBuffer.getChannelData(ch)[i];
    }
    mono[i] = sum / channels;
  }

  return mono;
}

/**
 * 音声データを正規化する（ピーク値をターゲットに合わせて増幅）
 * マイク入力が小さい場合でも、適正な音量に自動調整する
 */
function normalize(data: Float32Array, targetPeak: number): Float32Array {
  // ピーク値を測定
  let maxAbs = 0;
  for (let i = 0; i < data.length; i++) {
    const abs = Math.abs(data[i]);
    if (abs > maxAbs) maxAbs = abs;
  }

  // 無音（ノイズのみ）の場合はそのまま返す
  if (maxAbs < NORMALIZE_MIN_THRESHOLD) {
    return data;
  }

  // 既にターゲット以上の音量がある場合はそのまま返す
  if (maxAbs >= targetPeak) {
    return data;
  }

  // ゲインを計算して適用
  const gain = targetPeak / maxAbs;
  const result = new Float32Array(data.length);
  for (let i = 0; i < data.length; i++) {
    result[i] = Math.max(-1, Math.min(1, data[i] * gain));
  }

  return result;
}

/**
 * サンプルレートを変換する（線形補間）
 */
function resample(
  data: Float32Array,
  fromSampleRate: number,
  toSampleRate: number
): Float32Array {
  if (fromSampleRate === toSampleRate) {
    return data;
  }

  const ratio = fromSampleRate / toSampleRate;
  const newLength = Math.round(data.length / ratio);
  const result = new Float32Array(newLength);

  for (let i = 0; i < newLength; i++) {
    const srcIndex = i * ratio;
    const srcIndexFloor = Math.floor(srcIndex);
    const srcIndexCeil = Math.min(srcIndexFloor + 1, data.length - 1);
    const fraction = srcIndex - srcIndexFloor;

    // 線形補間
    result[i] = data[srcIndexFloor] * (1 - fraction) + data[srcIndexCeil] * fraction;
  }

  return result;
}

/**
 * Float32 PCM データを Int16 PCM に変換する
 */
function float32ToInt16(float32Array: Float32Array): Int16Array {
  const int16Array = new Int16Array(float32Array.length);

  for (let i = 0; i < float32Array.length; i++) {
    // -1.0〜1.0 の範囲にクランプしてから Int16 に変換
    const sample = Math.max(-1, Math.min(1, float32Array[i]));
    int16Array[i] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
  }

  return int16Array;
}

/**
 * WAV ファイル（ヘッダー + PCM データ）を構築する
 * RIFF/WAVE フォーマット（44バイトヘッダー）
 */
function createWavFile(
  pcmData: Int16Array,
  sampleRate: number,
  channels: number,
  bitsPerSample: number
): ArrayBuffer {
  const dataSize = pcmData.length * (bitsPerSample / 8);
  const headerSize = 44;
  const buffer = new ArrayBuffer(headerSize + dataSize);
  const view = new DataView(buffer);

  // RIFF チャンク
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);           // ファイルサイズ - 8
  writeString(view, 8, 'WAVE');

  // fmt サブチャンク
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);                      // fmt チャンクサイズ
  view.setUint16(20, 1, true);                       // PCM フォーマット
  view.setUint16(22, channels, true);                // チャンネル数
  view.setUint32(24, sampleRate, true);              // サンプルレート
  view.setUint32(28, sampleRate * channels * (bitsPerSample / 8), true); // バイトレート
  view.setUint16(32, channels * (bitsPerSample / 8), true);             // ブロックアライン
  view.setUint16(34, bitsPerSample, true);           // ビット深度

  // data サブチャンク
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);                // データサイズ

  // PCM データを書き込み
  const pcmBytes = new Uint8Array(buffer, headerSize);
  pcmBytes.set(new Uint8Array(pcmData.buffer));

  return buffer;
}

/**
 * DataView に ASCII 文字列を書き込む
 */
function writeString(view: DataView, offset: number, str: string): void {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}
