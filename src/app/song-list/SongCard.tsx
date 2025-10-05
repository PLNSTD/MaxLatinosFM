"use client";
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
  onDelete: (song: Song) => void;
}

export default function SongCard({
  song,
  onPlay,
  onModify,
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
    <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 p-5 rounded-2xl bg-[var(--color-dark)] shadow-md transition-all hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]">
      {/* Song Info */}
      <div className="flex flex-col gap-1 text-white">
        <p className="text-sm text-gray-400 font-medium">#{song.id}</p>
        <p className="text-lg sm:text-xl font-semibold leading-tight group-hover:text-[var(--color-accent)] transition-colors">
          {song.title}
        </p>
        <p className="text-sm text-gray-300">{song.artist}</p>
        <p className="text-xs text-gray-500">
          {durationToFormat(song.duration)}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-auto">
        {/* Play */}
        <button
          onClick={() => onPlay(song)}
          className="p-2 rounded-xl bg-[var(--color-bg)] transition transform hover:scale-110 active:scale-95"
        >
          <Image
            src="/icons/Play/play.svg"
            alt="Play"
            width={22}
            height={22}
            className="w-[22px] h-auto"
          />
        </button>

        {/* Modify */}
        <button
          onClick={() => onModify(song)}
          className="p-2 rounded-xl bg-[var(--color-third)] transition transform hover:scale-110 active:scale-95"
        >
          <Image
            src="/icons/Modify/modify.svg"
            alt="Modify"
            width={22}
            height={22}
            className="w-[22px] h-auto"
          />
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(song)}
          className="p-2 rounded-xl bg-red-500 transition transform hover:scale-110 active:scale-95"
        >
          <Image
            src="/icons/Delete/delete.svg"
            alt="Delete"
            width={22}
            height={22}
            className="w-[22px] h-auto"
          />
        </button>
      </div>
    </div>
  );
}
