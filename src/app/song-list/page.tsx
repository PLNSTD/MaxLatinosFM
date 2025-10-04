"use client";
import { useState, useEffect } from "react";
import SongCard from "./SongCard";
import UpdateSongModal from "./UpdateSongModal";

interface Song {
  id: number;
  duration: number;
  artist: string;
  title: string;
}

const API = "https://maxlatinosfm-backend.onrender.com/songs/";

export default function SongList() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalSong, setModalSong] = useState<Song | null>(null); // <-- modal state

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(`${API}list`);
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

  const handleUpdate = (updatedSong: Song) => {
    setSongs(songs.map(s => (s.id === updatedSong.id ? updatedSong : s)));
    setModalSong(null); // close modal after update
  };

  if (loading)
    return <p className="text-[var(--color-primary)]">Loading songs...</p>;

  return (
    <div className="space-y-4 p-6 bg-[var(--color-dark)] min-h-screen">
      <h1 className="text-2xl font-bold text-[var(--color-bg)] mb-6">🎶 Song List</h1>

      {songs.map(song => (
        <SongCard
          key={song.id}
          song={song}
          onModify={(song) => setModalSong(song)} // <-- card signals parent
          onUpdate={handleUpdate}
        />
      ))}

      {modalSong && (
        <UpdateSongModal
          song={modalSong}
          onClose={() => setModalSong(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
