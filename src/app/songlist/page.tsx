"use client";

import { useEffect, useState } from "react";

interface Song {
  id: number;
  artist: string;
  title: string;
}

// const API = "http://localhost:3001/songs/list";
const API = "https://maxlatinosfm-backend.onrender.com/songs/list";

export default function SongList() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(`${API}`); // your API endpoint
        const data: Song[] = await res.json();
        // Sort by artist name
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

  if (loading)
    return <p className="text-[var(--color-primary)]">Loading songs...</p>;

  return (
    <div className="p-4 bg-[var(--color-bg)] min-h-screen">
      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
        Song List
      </h1>
      <ul className="space-y-2">
        {songs.map((song) => (
          <li
            key={song.id}
            className="p-3 rounded-md shadow-md bg-[var(--color-secondary)] hover:bg-[var(--color-third)] transition-colors duration-300"
          >
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
          </li>
        ))}
      </ul>
    </div>
  );
}
