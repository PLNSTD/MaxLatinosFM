"use client";
import { useRouter } from "next/navigation";
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

const API = process.env.NEXT_PUBLIC_API_URL;

export default function UpdateSongModal({
  song,
  onClose,
  onUpdate,
}: UpdateSongModalProps) {
  const router = useRouter();
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
      const res = await fetch(`${API}/songs/admin/${song.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (res.status === 401) {
        router.push("/admin/login"); // client-side redirect
      }

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
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative bg-[var(--color-dark)] text-white w-full max-w-md rounded-2xl shadow-2xl border border-[var(--color-bg)]/30 
        p-6 sm:p-8 transform scale-100 animate-fadeIn transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[var(--color-primary)]">
          🎵 Update Song
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg p-3 bg-[#1e1e1e] border border-gray-700 focus:border-[var(--color-third)] focus:ring-2 focus:ring-[var(--color-third)] outline-none transition text-[var(--color-primary)] placeholder-gray-500"
            placeholder="Title"
          />
          <input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            className="w-full rounded-lg p-3 bg-[#1e1e1e] border border-gray-700 focus:border-[var(--color-third)] focus:ring-2 focus:ring-[var(--color-third)] outline-none transition text-[var(--color-primary)] placeholder-gray-500"
            placeholder="Artist"
          />
          <input
            type="text"
            name="path"
            value={formData.path}
            disabled
            className="w-full rounded-lg p-3 bg-[#1e1e1e]/70 border border-gray-700 text-gray-400 cursor-not-allowed"
            placeholder="Storage Path"
          />
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-[var(--color-secondary)] text-white font-semibold hover:opacity-90 hover:scale-105 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-[var(--color-bg)] text-white font-semibold hover:bg-[var(--color-third)] hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
