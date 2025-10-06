"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

//const API = "http://localhost:3001/songs/upload";
const API = "https://maxlatinosfm-backend.onrender.com/songs/upload";

export default function UploadPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [duration, setDuration] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => fileInputRef.current?.click();

  const handleUpload = async () => {
    if (!file || !title || !artist) {
      setMessage("Please fill all fields and select a file.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("song", file);
    formData.append("title", title);
    formData.append("artist", artist);

    try {
      const res = await fetch(`${API}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Upload successful!");
        setTitle("");
        setArtist("");
        setFile(null);
        fileInputRef.current!.value = "";
      } else {
        setMessage("❌ Upload failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed: Server error");
    }

    setLoading(false);
  };

  return (
    <div className="text-[var(--color-dark)] min-h-screen flex items-center justify-center bg-[var(--color-dark)] p-4">
      <div className="bg-[var(--color-primary)] p-6 rounded-xl w-full max-w-md shadow-lg">
        {/* Back Button */}
        <button
          onClick={() => router.push("/admin")}
          className="text-[var(--color-secondary)] text-lg mb-4 hover:opacity-80 transition"
        >
          ← Exit
        </button>

        <h2 className="text-center text-[var(--color-secondary)] font-bold text-xl mb-6">
          Upload Song
        </h2>

        {/* Inputs */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-3 rounded-md border border-[var(--color-third)]"
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="w-full p-2 mb-3 rounded-md border border-[var(--color-third)]"
        />

        {/* File Upload */}
        <div className="flex items-center gap-2 mb-4">
          <Image
            src="/icons/Upload/upload_icon.svg"
            alt="Upload Audio"
            width={20}
            height={20}
            style={{ width: "20px", height: "auto" }}
            className="cursor-pointer hover:opacity-80 transition hover:scale-150"
            onClick={handleClick}
          />
          <input
            type="file"
            accept=".mp3,.wav,.m4a,.aac,.ogg,audio/mpeg,audio/wav,audio/x-wav,audio/aac,audio/mp4,audio/ogg,audio/*"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="flex-1"
          />
        </div>
        {file && (
          <p className="text-sm text-[var(--color-third)] truncate mb-4">
            Selected: {file.name}
          </p>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full p-3 bg-[var(--color-secondary)] text-[var(--color-primary)] font-bold rounded-md hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {/* Message */}
        {message && (
          <p className="text-center text-[var(--color-third)] font-bold mt-4 break-words">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
