'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

export type PlaybackSpeed = 0.75 | 1 | 1.25;

export interface UseAudioPlayerReturn {
  isPlaying: boolean;
  isPaused: boolean;
  currentTime: number;
  duration: number;
  playCount: number;
  playbackSpeed: PlaybackSpeed;
  error: string | null;
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (time: number) => void;
  setSpeed: (speed: PlaybackSpeed) => void;
  reset: () => void;
}

export function useAudioPlayer(audioUrl: string): UseAudioPlayerReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef(false);

  // オーディオ要素の初期化
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    // イベントリスナー
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setError(null);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentTime(0);
      audio.currentTime = 0;
      if (hasStartedRef.current) {
        setPlayCount((prev) => prev + 1);
        hasStartedRef.current = false;
      }
    };

    const handleError = () => {
      setError('音声ファイルの読み込みに失敗しました');
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsPaused(false);
      if (!hasStartedRef.current) {
        hasStartedRef.current = true;
      }
    };

    const handlePause = () => {
      setIsPlaying(false);
      setIsPaused(true);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // クリーンアップ
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      audio.src = '';
    };
  }, [audioUrl]);

  // 再生速度の変更を反映
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        setError(`再生エラー: ${err.message}`);
      });
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
      setIsPaused(false);
      hasStartedRef.current = false;
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        Math.min(time, audioRef.current.duration || 0)
      );
    }
  }, []);

  const setSpeed = useCallback((speed: PlaybackSpeed) => {
    setPlaybackSpeed(speed);
  }, []);

  const reset = useCallback(() => {
    stop();
    setPlayCount(0);
  }, [stop]);

  return {
    isPlaying,
    isPaused,
    currentTime,
    duration,
    playCount,
    playbackSpeed,
    error,
    play,
    pause,
    stop,
    seek,
    setSpeed,
    reset,
  };
}
