import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, AlertCircle, Volume2, VolumeX, Pause } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const checkVideo = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentType = response.headers.get('Content-Type');
        
        if (contentType && contentType.startsWith('video/')) {
          setVideoUrl(url);
        } else {
          throw new Error('Not a video content type');
        }
      } catch {
        setVideoUrl(url);
      } finally {
        setIsLoading(false);
      }
    };
    checkVideo();
  }, [url]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.preventDefault();
    setError(true);
    setIsPlaying(false);
    console.error('Video playback error:', url);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleWaiting = () => {
    setIsBuffering(true);
  };

  const handlePlaying = () => {
    setIsPlaying(true);
    setIsBuffering(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!videoRef.current || error) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {
        setError(true);
      });
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || duration <= 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * duration;
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const changeVolume = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(1, percent));
    videoRef.current.volume = newVolume;
    videoRef.current.muted = newVolume === 0;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const restartVideo = () => {
    setError(false);
    setIsPlaying(false);
    setCurrentTime(0);
    
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
  };

  if (error) {
    return (
      <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden">
        <img 
          src={poster || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'} 
          alt="Video cover"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <p className="text-white text-center px-4 text-lg">视频无法播放</p>
          <p className="text-gray-400 text-sm mt-2 px-4 text-center">
            您的浏览器不支持此视频格式
          </p>
          <p className="text-gray-500 text-xs mt-2">
            支持格式: MP4 (H.264), WebM, OGG
          </p>
          <button
            onClick={restartVideo}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            重试
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
        <img 
          src={poster || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'} 
          alt="Loading..."
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <img 
        src={poster || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'} 
        alt="Video poster"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      />

      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        preload="metadata"
        onError={handleError}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        onPause={handlePause}
        onClick={togglePlay}
        playsInline
        crossOrigin="anonymous"
        disablePictureInPicture
        controlsList="nodownload"
        style={{ display: isPlaying ? 'block' : 'none' }}
        poster={poster}
      >
        <source src={videoUrl || url} type='video/mp4; codecs="avc1.4D401E, mp4a.40.2"' />
        <source src={videoUrl || url} type='video/mp4; codecs="hev1.1.6.L93.0, mp4a.40.2"' />
        <source src={videoUrl || url} type='video/mp4; codecs="hvc1.1.6.L93.B0, mp4a.40.2"' />
        <source src={videoUrl || url} type='video/webm; codecs="vp09.00.10.08, opus"' />
        <source src={videoUrl || url} type='video/webm; codecs="vp8, vorbis"' />
        <source src={videoUrl || url} type='video/ogg; codecs="theora, vorbis"' />
        <source src={videoUrl || url} type="video/mp4" />
        <source src={videoUrl || url} type="video/webm" />
        <source src={videoUrl || url} type="video/ogg" />
      </video>

      {!isPlaying && !isBuffering && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors shadow-lg">
            <Play className="w-10 h-10 text-white ml-1" fill="white" />
          </div>
        </div>
      )}

      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {(showControls || isPlaying) && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
          <div 
            className="relative h-2 bg-white/30 rounded-full cursor-pointer mb-2"
            onClick={handleSeek}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"
              style={{ left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`, transform: 'translate(-50%, -50%)' }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-1" fill="currentColor" />
                )}
              </button>
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <div 
                className="relative w-16 h-2 bg-white/30 rounded-full cursor-pointer"
                onClick={(e) => { e.stopPropagation(); changeVolume(e); }}
              >
                <div 
                  className="absolute top-0 left-0 h-full bg-white rounded-full"
                  style={{ width: `${volume * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;