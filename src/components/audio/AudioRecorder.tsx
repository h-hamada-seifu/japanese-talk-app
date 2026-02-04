'use client';

import { useEffect } from 'react';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';

interface AudioRecorderProps {
  onRecordingComplete?: (blob: Blob, url: string, duration: number) => void;
  maxDuration?: number;
}

export function AudioRecorder({
  onRecordingComplete,
  maxDuration = 60,
}: AudioRecorderProps) {
  const {
    recordingState,
    audioURL,
    audioBlob,
    duration,
    error,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    clearRecording,
  } = useAudioRecorder();

  // 時間フォーマット
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 最大録音時間に達したら自動停止
  useEffect(() => {
    if (recordingState === 'recording' && duration >= maxDuration) {
      stopRecording();
    }
  }, [recordingState, duration, maxDuration, stopRecording]);

  // 録音完了時のコールバック
  const handleStopAndSubmit = () => {
    stopRecording();
  };

  // 録音完了後にコールバックを呼ぶ
  useEffect(() => {
    if (recordingState === 'stopped' && audioBlob && audioURL && onRecordingComplete) {
      onRecordingComplete(audioBlob, audioURL, duration);
    }
  }, [recordingState, audioBlob, audioURL, duration, onRecordingComplete]);

  // 状態メッセージ
  const getStatusMessage = () => {
    switch (recordingState) {
      case 'recording':
        return '録音中...';
      case 'paused':
        return '一時停止中';
      case 'stopped':
        return '録音完了';
      default:
        return 'マイクボタンを押して録音開始';
    }
  };

  return (
    <div className="w-full bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      {/* エラー表示 */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* 録音状態表示 */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center mb-2">
          {recordingState === 'recording' && (
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2" />
          )}
          <p className="text-gray-700 font-medium">{getStatusMessage()}</p>
        </div>
        <p className="text-4xl font-bold text-gray-900 font-mono">
          {formatDuration(duration)}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          最大 {formatDuration(maxDuration)}
        </p>
      </div>

      {/* プログレスバー */}
      {(recordingState === 'recording' || recordingState === 'paused') && (
        <div className="mb-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 transition-all"
              style={{ width: `${(duration / maxDuration) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* コントロールボタン */}
      <div className="flex justify-center gap-3">
        {recordingState === 'idle' && (
          <button
            onClick={startRecording}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-medium rounded-full transition-colors shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                clipRule="evenodd"
              />
            </svg>
            録音開始
          </button>
        )}

        {recordingState === 'recording' && (
          <>
            <button
              onClick={pauseRecording}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white font-medium rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              一時停止
            </button>
            <button
              onClick={handleStopAndSubmit}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                  clipRule="evenodd"
                />
              </svg>
              完了
            </button>
          </>
        )}

        {recordingState === 'paused' && (
          <>
            <button
              onClick={resumeRecording}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-medium rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              再開
            </button>
            <button
              onClick={handleStopAndSubmit}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                  clipRule="evenodd"
                />
              </svg>
              完了
            </button>
          </>
        )}

        {recordingState === 'stopped' && audioURL && (
          <button
            onClick={clearRecording}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white font-medium rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            やり直す
          </button>
        )}
      </div>

      {/* 録音プレビュー */}
      {recordingState === 'stopped' && audioURL && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">録音プレビュー</p>
          <audio src={audioURL} controls className="w-full" preload="metadata" />
        </div>
      )}
    </div>
  );
}
