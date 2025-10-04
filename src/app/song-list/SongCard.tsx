"use client";

interface Song {
  id: number;
  duration: number;
  artist: string;
  title: string;
}

interface SongCardProps {
  song: Song;
  onModify: (song: Song) => void;
  onUpdate?: (updatedSong: Song) => void;
}

export default function SongCard({ song, onModify }: SongCardProps) {
  return (
    <div className="p-4 md:p-5 rounded-2xl shadow-md bg-[var(--color-dark)] text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 transition hover:shadow-lg hover:scale-[1.02]">
      
      {/* Song Info */}
      <div className="flex flex-col">
        <p className="text-base md:text-lg font-semibold">ID: {song.id}</p>
        <p className="text-base md:text-lg font-semibold">{song.title}</p>
        <p className="text-sm text-gray-300">{song.artist}</p>
        <p className="text-xs text-gray-400">{song.duration}</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-0">
        {/* Play Button */}
        <button
          className="px-4 md:px-5 py-2 rounded-xl font-medium bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 cursor-pointer"
        >
          ▶ Play
        </button>

        {/* Modify Button */}
        <button
          onClick={() => onModify(song)}
          className="px-4 md:px-5 py-2 rounded-xl font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 cursor-pointer"
        >
          ✏ Modify
        </button>

        {/* Delete Button */}
        <button
          className="px-4 md:px-5 py-2 rounded-xl font-medium bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 cursor-pointer"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}
