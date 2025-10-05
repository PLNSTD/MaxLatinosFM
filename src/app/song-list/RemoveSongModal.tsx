"use client";
import { useEffect, useRef, useState } from "react";

interface Song {
  id: number;
  duration: number;
  artist: string;
  title: string;
  path: string;
}

interface RemoveSongModalProps {
  song: Song;
  onClose: () => void;
  onConfirm: (deletedSong: Song) => void;
}

// const API = "http://localhost:3001/songs/";
const API = "https://maxlatinosfm-backend.onrender.com/songs/";

export default function RemoveSongModal({
  song,
  onClose,
  onConfirm,
}: RemoveSongModalProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // NOT USED CURRENTLY, IM USING PARENT'S
  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}${song.id}`, { method: "DELETE" });

      if (res.ok) {
        onConfirm(song);
        onClose();
      } else {
        alert("❌ Failed to delete song");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--color-dark)] text-[var(--color-primary)] p-6 rounded-2xl shadow-xl w-[90%] sm:w-96 transform transition-all duration-300 scale-105 pointer-events-auto"
      >
        <h2 className="text-xl font-bold mb-4 text-[var(--color-secondary)]">
          Confirm Song Deletion
        </h2>

        <p className="text-sm text-gray-300 mb-5">
          Are you sure you want to permanently delete this song? This action
          cannot be undone.
        </p>

        <div className="bg-[var(--color-bg)] p-4 rounded-lg mb-6 text-sm text-[var(--color-primary)] shadow-inner">
          <p>
            <span className="font-semibold text-[var(--color-third)]">
              Title:
            </span>{" "}
            {song.title}
          </p>
          <p>
            <span className="font-semibold text-[var(--color-third)]">
              Artist:
            </span>{" "}
            {song.artist}
          </p>
          <p className="text-xs opacity-70 mt-1 truncate">{song.path}</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-gray-600 hover:underline hover:shadow-2xl text-white transition"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-[var(--color-secondary)] hover:underline font-semibold transition text-white"
            onClick={() => onConfirm(song)}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
