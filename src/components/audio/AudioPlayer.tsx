'use client';

import { useAudioPlayer, PlaybackSpeed } from '@/hooks/useAudioPlayer';

interface AudioPlayerProps {
  audioUrl: string;
  showSpeedControl?: boolean;
  showPlayCount?: boolean;
  onPlayCountChange?: (count: number) => void;
  size?: 'normal' | 'large';
}

export function AudioPlayer({
  audioUrl,
  showSpeedControl = true,
  showPlayCount = false,
  onPlayCountChange,
  size = 'normal',
}: AudioPlayerProps) {
  const {
    isPlaying,
    currentTime,
    duration,
    playCount,
    playbackSpeed,
    error,
    play,
    pause,
    seek,
    setSpeed,
  } = useAudioPlayer(audioUrl);

  // 再生回数変更時のコールバック
  if (onPlayCountChange && playCount > 0) {
    onPlayCountChange(playCount);
  }

  // 時間フォーマット
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // プログレスバーのクリック処理
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seek(percent * duration);
  };

  const speedOptions: PlaybackSpeed[] = [0.75, 1, 1.25];

  const buttonSize = size === 'large' ? 'w-16 h-16' : 'w-12 h-12';
  const iconSize = size === 'large' ? 'w-8 h-8' : 'w-6 h-6';

  return (
    <div className="w-full bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      {/* エラー表示 */}
      {error && (
        <div className="mb-3 p-2 bg-red-50 text-red-600 text-sm rounded">
          {error}
        </div>
      )}

      {/* メインコントロール */}
      <div className="flex items-center gap-4">
        {/* 再生/停止ボタン */}
        <button
          onClick={isPlaying ? pause : play}
          className={`${buttonSize} flex items-center justify-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-full transition-colors shadow-md`}
          aria-label={isPlaying ? '一時停止（いちじていし）' : '再生（さいせい）'}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={iconSize}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={iconSize}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* プログレス */}
        <div className="flex-1">
          {/* プログレスバー */}
          <div
            className="h-2 bg-gray-200 rounded-full cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{
                width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
              }}
            />
          </div>

          {/* 時間表示 */}
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* サブコントロール */}
      {(showSpeedControl || showPlayCount) && (
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          {/* 再生速度 */}
          {showSpeedControl && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">速度（そくど）:</span>
              <div className="flex gap-1">
                {speedOptions.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setSpeed(speed)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      playbackSpeed === speed
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 再生回数 */}
          {showPlayCount && (
            <div className="text-xs text-gray-500">
              再生回数（さいせいかいすう）: <span className="font-medium">{playCount}</span>回（かい）
            </div>
          )}
        </div>
      )}
    </div>
  );
}
