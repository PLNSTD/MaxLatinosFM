"use client";
import DeleteIcon from "@/../public/icons/Delete/delete2.svg";
import Image from "next/image";

interface Song {
  id: number;
  duration: number;
  artist: string;
  title: string;
  path: string;
}

interface SongCardProps {
  song: Song;
  onPlay: (song: Song) => void;
  onModify: (song: Song) => void;
  onUpdate?: (updatedSong: Song) => void;
  onDelete: (song: Song) => void;
}

export default function SongCard({
  song,
  onModify,
  onPlay,
  onDelete,
}: SongCardProps) {
  const durationToFormat = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="p-4 md:p-5 rounded-2xl shadow-md bg-[var(--color-dark)] text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 transition hover:shadow-lg hover:scale-[1.02]">
      {/* Song Info */}
      <div className="flex flex-col">
        <p className="text-base md:text-lg font-semibold">ID: {song.id}</p>
        <p className="text-base md:text-lg font-semibold">{song.title}</p>
        <p className="text-sm text-gray-300">{song.artist}</p>
        <p className="text-xs text-gray-400">
          {durationToFormat(song.duration)}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-0">
        {/* Play Button */}
        {/* <button
          className="px-4 md:px-5 py-2 rounded-xl font-medium bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 cursor-pointer"
          onClick={() => onPlay(song)}
        >
          ▶ Play
        </button> */}
        <Image
          src="/icons/Play/play.svg"
          alt="play audio"
          width={20}
          height={20}
          style={{ width: "20px", height: "auto" }}
          className="cursor-pointer hover:opacity-80 transition hover:scale-150 bg-[var(--color-bg)] rounded-lg"
          onClick={() => onPlay(song)}
        />

        {/* Modify Button */}
        {/* <button
          onClick={() => onModify(song)}
          className="px-4 md:px-5 py-2 rounded-xl font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 cursor-pointer"
        >
          ✏ Modify
        </button> */}
        <Image
          src="/icons/Modify/modify.svg"
          alt="play audio"
          width={20}
          height={20}
          style={{ width: "20px", height: "auto" }}
          className="cursor-pointer hover:opacity-80 transition hover:scale-150 bg-[var(--color-third)] rounded-lg"
          onClick={() => onModify(song)}
        />

        {/* Delete Button */}
        {/* <button className="px-4 md:px-5 py-2 rounded-xl font-medium bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 cursor-pointer">
          🗑 Delete
        </button> */}
        <Image
          src="/icons/Delete/delete.svg"
          alt="play audio"
          width={20}
          height={20}
          style={{ width: "20px", height: "auto" }}
          className="cursor-pointer hover:opacity-80 transition hover:scale-150 bg-red-500 rounded-lg"
          onClick={() => onDelete(song)}
        />
      </div>
    </div>
  );
}
