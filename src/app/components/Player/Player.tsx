"use client";
import { useState } from "react";
import PlayButton from "./PlayButton";
import ProgressBar from "./ProgressBar";
import SongInfo from "./SongInfo";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const mockSong = {
    title: "Mock Song",
    artist: "DJ Latino",
    duration: 180, // seconds
  };

  return (
    <div className="w-full max-w-md p-6 rounded-xl text-white flex flex-col gap-4">
      <div className="flex justify-center">
        <PlayButton
          isPlaying={isPlaying}
          onClick={() => setIsPlaying(!isPlaying)}
        />
      </div>
      <SongInfo title={mockSong.title} artist={mockSong.artist} />
      <ProgressBar progress={progress} />
    </div>
  );
};

export default Player;
