"use client";
import { useState, useRef, useEffect } from "react";
import PlayButton from "./PlayButton";
import ProgressBar from "./ProgressBar";
import SongInfo from "./SongInfo";
import { get } from "http";

const API = "http://localhost:3001/songs/now";
//const API = "https://maxlatinosfm-backend.onrender.com/songs/now";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(100);
  const [currentSong, setSong] = useState<
    | {
        id: number;
        title: string;
        artist?: string;
        duration: number;
      }
    | undefined
  >(undefined);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [startTime, setStartTime] = useState<number>();
  const [delay, setDelay] = useState<number>();
  const [loadNext, setLoadNext] = useState(true);
  const abortRef = useRef<AbortController | null>(null);

  const fetchSong = async () => {
    if (abortRef.current) abortRef.current.abort(); // cancel previous fetch
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      console.log("Fetching..");
      // Fetch metadata
      const res = await fetch(`${API}`, { signal: controller.signal });
      const ans = await res.json();

      setSong(ans.song);

      if (ans.elapsed >= ans.song.duration) {
        console.log("fetchSong Calling itself..");
        // Wait a short delay before retrying
        setTimeout(fetchSong, 1000); // 1 second
        return;
      }

      setAudioUrl(ans.song.path);
      setDelay(ans.elapsed);
      setStartTime(Date.now());
      audioRef.current!.load();
      console.log("Song Loaded!");
    } catch (err) {
      console.error("Error fetching song:", err);
    }
  };

  // Fetch song info + stream
  useEffect(() => {
    console.log("UseEffect Calling fetch..");
    fetchSong();
    audioRef.current!.load();
    audioRef.current!.play().catch((err) => console.log("Play failed:", err));
  }, [loadNext]);

  const getElapsed = () => {
    if (!startTime) return 0;
    return (Date.now() - startTime) / 1000 + delay!;
  };

  // Sync audio currentTime when metadata loads
  const handleLoadedMetadata = () => {
    if (audioRef.current && startTime) {
      audioRef.current.currentTime = getElapsed();
    }
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(
      (audioRef.current.currentTime / audioRef.current.duration) * 100
    );
    if (progress == 100) {
      setLoadNext(true);
      audioRef.current.pause();
    }
  };

  const handleEnded = async () => {
    fetchSong();
    setLoadNext((c) => !c);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      audioRef.current.currentTime = getElapsed();
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-full max-w-md p-6 rounded-xl text-white flex flex-col gap-4">
      <div className="flex justify-center">
        <PlayButton isPlaying={isPlaying} onClick={togglePlay} />
      </div>
      <SongInfo
        title={currentSong?.title ?? "Loading..."}
        artist={currentSong?.artist ?? ""}
      />
      <ProgressBar progress={progress} />

      {/* 🔊 Hidden audio element for playback */}

      <audio
        key={currentSong ? currentSong.id : undefined}
        ref={audioRef}
        src={audioUrl}
        autoPlay
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </div>
  );
};

export default Player;
