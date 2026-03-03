/**
 * Web Audio API を使用した音声フォーマット変換ユーティリティ
 * ブラウザの MediaRecorder が出力する音声（webm/mp4 等）を
 * Azure Speech / SpeechSuper API が受け付ける wav フォーマットに変換する
 */

/** Azure Speech / SpeechSuper 推奨設定 */
const TARGET_SAMPLE_RATE = 16000;
const TARGET_CHANNELS = 1;
const BITS_PER_SAMPLE = 16;

/** ノーマライゼーションのターゲットピーク値（-3dB ≈ 0.707） */
const NORMALIZE_TARGET_PEAK = 0.7;

/** ノーマライゼーションの最小ピーク閾値（これ以下は無音とみなす） */
const NORMALIZE_MIN_THRESHOLD = 0.001;

/** convertBoth の戻り値 */
export interface ConvertBothResult {
  /** プレビュー再生用 wav Blob（元のサンプルレート/モノラル/正規化済み） */
  playbackBlob: Blob;
  /** API送信用 wav Blob（16kHz/モノラル/正規化済み） */
  apiBlob: Blob;
}

/**
 * 録音 Blob をデコード1回で、プレビュー用 wav と API送信用 wav の両方を生成する
 * - デコード（重い処理）を1回に集約して高速化
 * - リサンプリングに OfflineAudioContext を使用（ネイティブ処理で高速）
 *
 * @param blob - MediaRecorder が出力した音声 Blob（webm/mp4 等）
 * @returns プレビュー用と API送信用の wav Blob
 */
export async function convertBoth(blob: Blob): Promise<ConvertBothResult> {
  const arrayBuffer = await blob.arrayBuffer();

  // デコードは1回だけ（iOS では suspend 状態の場合があるため resume() を呼ぶ）
  const audioContext = new AudioContext();
  try {
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const monoData = mixdownToMono(audioBuffer);
    const originalSampleRate = audioBuffer.sampleRate;

    // プレビュー用: サンプルレートそのまま、音量のみ正規化
    const playbackNormalized = normalize(monoData, NORMALIZE_TARGET_PEAK);
    const playbackPcm = float32ToInt16(playbackNormalized);
    const playbackWav = createWavFile(playbackPcm, originalSampleRate, TARGET_CHANNELS, BITS_PER_SAMPLE);
    const playbackBlob = new Blob([playbackWav], { type: 'audio/wav' });

    // API送信用: OfflineAudioContext でネイティブリサンプリング（16kHz）
    const resampledData = await resampleWithOfflineContext(monoData, originalSampleRate, TARGET_SAMPLE_RATE);
    const apiNormalized = normalize(resampledData, NORMALIZE_TARGET_PEAK);
    const apiPcm = float32ToInt16(apiNormalized);
    const apiWav = createWavFile(apiPcm, TARGET_SAMPLE_RATE, TARGET_CHANNELS, BITS_PER_SAMPLE);
    const apiBlob = new Blob([apiWav], { type: 'audio/wav' });

    return { playbackBlob, apiBlob };
  } finally {
    await audioContext.close();
  }
}

/**
 * 音声 Blob を wav フォーマットに変換する（正規化付き）
 * 単独で API送信用 wav のみが必要な場合に使用（アドバイスモード等）
 *
 * @param blob - MediaRecorder が出力した音声 Blob（webm/mp4 等）
 * @returns wav フォーマットの Blob（16kHz/モノラル/16bit PCM、正規化済み）
 */
export async function convertToWav(blob: Blob): Promise<Blob> {
  const arrayBuffer = await blob.arrayBuffer();
  const audioContext = new AudioContext();
  try {
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const monoData = mixdownToMono(audioBuffer);

    // OfflineAudioContext でネイティブリサンプリング
    const resampledData = await resampleWithOfflineContext(monoData, audioBuffer.sampleRate, TARGET_SAMPLE_RATE);
    const normalizedData = normalize(resampledData, NORMALIZE_TARGET_PEAK);
    const pcmData = float32ToInt16(normalizedData);
    const wavBuffer = createWavFile(pcmData, TARGET_SAMPLE_RATE, TARGET_CHANNELS, BITS_PER_SAMPLE);

    return new Blob([wavBuffer], { type: 'audio/wav' });
  } finally {
    await audioContext.close();
  }
}

/**
 * 録音 Blob を正規化した wav に変換する（プレビュー再生用）
 * サンプルレートは元のまま保持して音質を維持する
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
 * OfflineAudioContext を使用したネイティブリサンプリング
 * JSループによる線形補間よりも大幅に高速（ブラウザのネイティブコードで処理）
 */
async function resampleWithOfflineContext(
  data: Float32Array,
  fromSampleRate: number,
  toSampleRate: number
): Promise<Float32Array> {
  if (fromSampleRate === toSampleRate) {
    return data;
  }

  const newLength = Math.round(data.length * toSampleRate / fromSampleRate);
  const offlineCtx = new OfflineAudioContext(1, newLength, toSampleRate);
  const buffer = offlineCtx.createBuffer(1, data.length, fromSampleRate);
  buffer.getChannelData(0).set(data);

  const source = offlineCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(offlineCtx.destination);
  source.start(0);

  const rendered = await offlineCtx.startRendering();
  return new Float32Array(rendered.getChannelData(0));
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
