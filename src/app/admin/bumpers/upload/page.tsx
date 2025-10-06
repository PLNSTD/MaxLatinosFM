"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function UploadBumperPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Client-side auth check
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${API}/auth/login/check`, {
          method: "GET",
          credentials: "include", // include cookies if API uses sessions
        });
        if (!res.ok) {
          router.push("/admin/login");
        } else {
          setLoading(false);
        }
      } catch (err) {
        router.push("/admin/login");
      }
    }
    checkAuth();
  }, [router]);

  const handleClick = () => fileInputRef.current?.click();

  const handleUpload = async () => {
    if (!file || !title) {
      setMessage("Please fill all fields and select a file.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("bumper", file);
    formData.append("title", title);

    try {
      const res = await fetch(`${API}/bumpers/admin/upload`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (res.status === 401) {
        router.push("/admin/login"); // client-side redirect
      }
      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Bumper upload successful!");
        setTitle("");
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
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-dark)] p-4 text-[var(--color-dark)]">
      <div className="bg-[var(--color-primary)] p-6 rounded-xl w-full max-w-md shadow-lg">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="text-[var(--color-secondary)] text-lg mb-4 hover:opacity-80 transition"
        >
          ← Exit
        </button>

        <h2 className="text-center text-[var(--color-secondary)] font-bold text-xl mb-6">
          Upload Bumper
        </h2>

        {/* Inputs */}
        <input
          type="text"
          placeholder="Bumper Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
            accept="audio/*"
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
          {loading ? "Uploading..." : "Upload Bumper"}
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
