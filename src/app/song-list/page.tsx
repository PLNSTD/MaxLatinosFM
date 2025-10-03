"use client";

import { useEffect, useState } from "react";

interface Song {
  id: number;
  artist: string;
  title: string;
}

// const API = "http://localhost:3001/songs/";
const API = "https://maxlatinosfm-backend.onrender.com/songs/";

export default function SongList() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(`${API}/list`);
        const data: Song[] = await res.json();
        data.sort((a, b) => a.artist.localeCompare(b.artist));
        setSongs(data);
      } catch (err) {
        console.error("Failed to fetch songs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  const setSong = async (id: number) => {
    try {
      const res = await fetch(`${API}${id}`);
    } catch (err) {
      console.error("Failed to set songs:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <p className="text-[var(--color-primary)]">Loading songs...</p>;

  return (
    <div className="p-4 bg-[var(--color-bg)] min-h-screen relative">
      {/* Fixed song count */}
      <div className="absolute top-4 right-4 text-[var(--color-primary)] px-3 py-1 rounded-full text-sm font-semibold">
        {songs.length} songs
      </div>

      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
        Song List
      </h1>

      <ul className="space-y-2">
        {songs.map((song) => (
          <li
            key={song.id}
            className="p-3 rounded-md shadow-md bg-[var(--color-dark)] hover:bg-[var(--color-third)] transition-colors duration-300 flex justify-between items-center"
          >
            <div>
              <span className="font-semibold text-[var(--color-primary)]">
                ID:
              </span>{" "}
              {song.id} &nbsp;|&nbsp;
              <span className="font-semibold text-[var(--color-primary)]">
                Artist:
              </span>{" "}
              {song.artist} &nbsp;|&nbsp;
              <span className="font-semibold text-[var(--color-primary)]">
                Title:
              </span>{" "}
              {song.title}
            </div>

            <button
              className="ml-4 px-3 py-1 bg-[var(--color-primary)] text-[var(--color-bg)] rounded-full hover:bg-[var(--color-secondary)] transition-colors duration-200 cursor-pointer"
              onClick={() => setSong(song.id)}
            >
              ▶️ Play
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
