"use client";
import { useState, useEffect, useRef } from "react";
import SongCard from "./components/SongCard";
import UpdateSongModal from "./components/UpdateSongModal";
import Player from "./components/Player";
import RemoveSongModal from "./components/RemoveSongModal";
import { useRouter } from "next/navigation";

interface Song {
  id: number;
  duration: number;
  artist: string;
  title: string;
  path: string;
}

const API = process.env.NEXT_PUBLIC_API_URL;

export default function SongList() {
  const router = useRouter();
  const [testingSong, setTestingSong] = useState<Song | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalSong, setModalSong] = useState<Song | null>(null); // <-- modal state
  const [modalRemoveSong, setModalRemoveSong] = useState<Song | null>(null); // <-- modal state
  const abortRef = useRef<AbortController | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Optional: hide toast automatically after 3 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const fetchSongs = async () => {
    try {
      const res = await fetch(`${API}/songs/admin/list`, {
        credentials: "include",
      });

      if (res.status === 401) {
        router.push("/admin/login"); // client-side redirect
      }

      const data: Song[] = await res.json();
      data.sort((a, b) => a.artist.localeCompare(b.artist));
      setSongs(data);
    } catch (err) {
      console.error("Failed to fetch songs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [router]);

  const handlePlay = async (desiredSong: Song) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      console.log("Fetching..");

      const res = await fetch(`${API}/songs/admin/${desiredSong.id}`, {
        signal: controller.signal,
        credentials: "include",
      });

      if (res.status === 401) {
        router.push("/admin/login"); // client-side redirect
      }
      const ans = await res.json();

      // ⏸ ensure this is still the latest request
      if (abortRef.current?.signal.aborted) return;

      // Don't use currentSong here, it's stale
      console.log(`Fetched song: ${ans.song.id}`);

      // ✅ set new song safely
      setTestingSong(ans.song);

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

  const handleUpdate = (updatedSong: Song) => {
    setSongs(songs.map((s) => (s.id === updatedSong.id ? updatedSong : s)));
    setModalSong(null); // close modal after update
  };

  const handleDelete = async (songToDelete: Song) => {
    if (!songToDelete?.id) return; // safety check

    try {
      const res = await fetch(`${API}/songs/admin/${songToDelete.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.status === 401) {
        router.push("/admin/login"); // client-side redirect
      }

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to delete song:", errorText);
        setToast({ message: "Error deleting song!", type: "error" });
        return;
      }

      setModalRemoveSong(null);

      // Optionally parse response if your API returns something
      // const data = await res.json();

      setToast({
        message: `Deleted "${songToDelete.title}" successfully!`,
        type: "success",
      });
      fetchSongs();
      // Optionally update local state here, e.g., remove from a songs array
    } catch (err) {
      console.error("Error while deleting song:", err);
      setToast({
        message: "Network error while deleting song.",
        type: "error",
      });
    }
  };

  if (loading)
    return (
      <p className="text-[var(--color-primary)] text-center mt-10 animate-pulse">
        Loading songs...
      </p>
    );

  return (
    <div className="space-y-4 p-6 bg-[var(--color-dark)] min-h-screen">
      {toast && (
        <div
          className={`fixed left-1/2 bottom-5 transform -translate-x-1/2
    px-4 py-2 rounded-lg text-white font-semibold shadow-lg text-center
    transition-all duration-300 ease-in-out
    ${toast.type === "success" ? "bg-[var(--color-bg)]" : "bg-red-500"}
    ${
      toast
        ? "w-[calc(100%-6rem)] opacity-100"
        : "w-0 m-0 opacity-0 overflow-hidden"
    } 
  `}
        >
          {toast?.message}
        </div>
      )}
      <h1 className="text-2xl font-bold text-[var(--color-bg)] mb-6">
        🎶 Song List
      </h1>

      {songs.map((song) => (
        <SongCard
          key={song.id}
          song={song}
          onPlay={handlePlay}
          onModify={(song) => setModalSong(song)} // <-- card signals parent
          onDelete={(song) => setModalRemoveSong(song)}
        />
      ))}

      {modalSong && (
        <UpdateSongModal
          song={modalSong}
          onClose={() => setModalSong(null)}
          onUpdate={handleUpdate}
        />
      )}

      {modalRemoveSong && (
        <RemoveSongModal
          song={modalRemoveSong}
          onClose={() => setModalRemoveSong(null)}
          onConfirm={handleDelete}
        />
      )}

      {testingSong && <Player key={testingSong.id} song={testingSong} />}
    </div>
  );
}
