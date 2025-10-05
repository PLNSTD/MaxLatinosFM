"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Song {
  id: number;
  duration: number;
  artist: string;
  title: string;
  path: string;
}

interface PlayerProps {
  song: Song | null; // accept null when nothing is selected
}

export default function Player({ song }: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // percentage (0-100)
  const [currentTime, setCurrentTime] = useState(0);

  // Play/Pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Track progress while playing
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (!audio.duration) return;
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  // Seek when user clicks progress bar
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const percent = Number(e.target.value);
    const newTime = (percent / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(percent);
  };

  // Format time mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  if (!song) return null; // render nothing if no song selected

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[var(--color-dark)] text-[var(--color-bg)] p-4 shadow-lg flex flex-col gap-2 border-t-2 border-[var(--color-bg)]">
      {/* Song Info */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold">{song.title}</p>
          <p className="text-sm text-gray-400">{song.artist}</p>
        </div>

        {/* Play/Pause button */}
        <Image
          src={isPlaying ? "/icons/Pause/pause.svg" : "/icons/Play/play.svg"}
          alt="play audio"
          width={20}
          height={20}
          style={{ width: "30px", height: "auto" }}
          className="cursor-pointer hover:opacity-80 transition hover:scale-150 bg-[var(--color-bg)] rounded-lg"
          onClick={togglePlay}
        />
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-2">
        <span className="text-xs">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={handleSeek}
          className="w-full"
        />
        <span className="text-xs">
          {song.duration ? formatTime(song.duration) : "0:00"}
        </span>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src={song.path} preload="metadata" autoPlay />
    </div>
  );
}
