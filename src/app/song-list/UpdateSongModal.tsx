"use client";
import { useEffect, useRef, useState } from "react";

interface Song {
  id: number;
  duration: number;
  artist: string;
  title: string;
  path: string;
}

interface UpdateSongModalProps {
  song: Song;
  onClose: () => void;
  onUpdate: (updatedSong: Song) => void;
}

// const API = "http://localhost:3001/songs/";
const API = "https://maxlatinosfm-backend.onrender.com/songs/";

export default function UpdateSongModal({
  song,
  onClose,
  onUpdate,
}: UpdateSongModalProps) {
  const [formData, setFormData] = useState<Song>({ ...song });
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.artist || !formData.path) {
      alert("❌ Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}${song.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updatedSong = await res.json();
        onUpdate(updatedSong);
        onClose();
      } else {
        alert("❌ Failed to update song");
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
        className="bg-[var(--color-dark)] text-white p-6 rounded-2xl shadow-xl w-96 transform transition-all duration-300 scale-105 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-[var(--color-bg)]">
          Update Song
        </h2>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border border-gray-600 bg-[var(--color-dark)] p-2 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-bg)] transition"
          placeholder="Title"
        />
        <input
          type="text"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          className="border border-gray-600 bg-[var(--color-dark)] p-2 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-bg)] transition"
          placeholder="Artist"
        />
        <input
          type="string"
          name="path"
          value={formData.path}
          onChange={handleChange}
          className="border border-gray-600 bg-[var(--color-dark)] p-2 w-full mb-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-bg)] transition disabled:bg-gray-500 disabled:opacity-20 disabled:text-gray-400 disabled:cursor-not-allowed"
          placeholder="Storage Path"
          min={0}
          disabled
        />

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-[var(--color-secondary)] rounded-lg hover:bg-red-600 transition"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[var(--color-bg)] rounded-lg hover:bg-emerald-700 transition"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
