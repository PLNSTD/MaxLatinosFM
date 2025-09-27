"use client";
import { useState, useRef, useEffect } from "react";
import PlayButton from "./PlayButton";
import ProgressBar from "./ProgressBar";
import SongInfo from "./SongInfo";

const API = "http://localhost:3001/songs/1";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSong, setSong] = useState<{
    title: string;
    artist: string;
    duration: number;
  } | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch song info + stream
  useEffect(() => {
    console.log("useEffect running");
    const fetchSong = async () => {
      try {
        console.log("FETCHING");
        // Fetch metadata
        const res = await fetch(`${API}`);
        const songDetails = await res.json();
        setSong(songDetails);

        // Fetch audio as blob
        const audioRes = await fetch(songDetails.path);
        const blob = await audioRes.blob();

        // Convert blob to URL
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        audioRef.current = new Audio(url);
        audioRef.current.addEventListener("timeupdate", () => {
          setProgress(
            (audioRef.current!.currentTime / audioRef.current!.duration) * 100
          );
        });
        console.log("DONE");
      } catch (err) {
        console.error("Error fetching song:", err);
      }
    };

    fetchSong();
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
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
    </div>
  );
};

export default Player;
