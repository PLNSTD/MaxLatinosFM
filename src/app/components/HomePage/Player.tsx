"use client";
import { useState, useRef, useEffect } from "react";
import PlayButton from "./PlayButton";
import ProgressBar from "./ProgressBar";
import SongInfo from "./SongInfo";

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
        path: string;
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
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      console.log("Fetching..");

      const res = await fetch(API, { signal: controller.signal });
      const ans = await res.json();

      // ⏸ ensure this is still the latest request
      if (abortRef.current?.signal.aborted) return;

      // Don't use currentSong here, it's stale
      console.log(`Fetched song: ${ans.song.id}`);

      if (!res.ok || currentSong?.id === ans.song.id) {
        console.log("Song already finished, retrying...");

        setTimeout(fetchSong, 1000);
        return;
      }

      // ✅ set new song safely
      setSong(ans.song);
      setAudioUrl(ans.song.path);
      setDelay(ans.elapsed);
      setStartTime(Date.now());

      if (audioRef.current) {
        audioRef.current.load();
      }
      console.log("Song Loaded!");
    } catch (error: unknown) {
      const err = error as Error;
      if (err.name === "AbortError") {
        console.log("Fetch aborted (expected)");
      } else {
        console.error("Error fetching song:", err);
      }
    }
  };

  // Fetch song info + stream
  useEffect(() => {
    console.log("UseEffect Calling fetch..");
    fetchSong();
    audioRef.current!.load();
    audioRef.current!.play().catch((err) => console.log("Play failed:", err));
  }, []);

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
        <PlayButton
          isPlaying={isPlaying}
          onClick={togglePlay}
          disabled={currentSong !== undefined ? false : true}
        />
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
