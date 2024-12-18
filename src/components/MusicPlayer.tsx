import { useEffect, useRef, useState } from 'react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 70;
      audioRef.current.volume = volume;
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        });
      }
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  return (
    <div className="fixed -bottom-24 right-15 bg-purple-900/50 backdrop-blur-sm p-3 rounded-xl flex items-center gap-3 text-yellow-200 z-50 hover:scale-110 hover:translate-y-[-16px] transition-all duration-200">
      <button
        onClick={togglePlay}
        className="w-10 h-10 flex items-center justify-center bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
      >
        {isPlaying ? (
          <span className="text-2xl">⏸</span>
        ) : (
          <span className="text-2xl">▶️</span>
        )}
      </button>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleVolume(Math.max(0, volume - 0.1))}
          className="w-8 h-8 flex items-center justify-center bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
        >
          🔉
        </button>
        <button
          onClick={() => handleVolume(Math.min(1, volume + 0.1))}
          className="w-8 h-8 flex items-center justify-center bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
        >
          🔊
        </button>
      </div>
      
      <audio
        ref={audioRef}
        src="music/Tara Putra - Dubland Coastline.mp3"
        loop
        className="hidden"
      />
    </div>
  );
}
