"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [duration, setDuration] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file || !title || !artist || !duration) {
      setMessage("Please fill all fields and select a file.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("song", file);
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("duration", duration);

    try {
      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Upload successful!");
        setTitle("");
        setArtist("");
        setDuration("");
        setFile(null);
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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--color-bg)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--color-primary)",
          padding: "2rem",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          style={{
            marginBottom: "1rem",
            backgroundColor: "transparent",
            border: "none",
            color: "var(--color-secondary)",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ← Exit
        </button>

        <h2
          style={{
            textAlign: "center",
            color: "var(--color-secondary)",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Upload Song
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "0.5rem",
            borderRadius: "6px",
            border: `1px solid var(--color-third)`,
          }}
        />

        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "0.5rem",
            borderRadius: "6px",
            border: `1px solid var(--color-third)`,
          }}
        />

        <input
          type="text"
          placeholder="Duration (e.g. 3:45)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "0.5rem",
            borderRadius: "6px",
            border: `1px solid var(--color-third)`,
          }}
        />

        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={{
            width: "100%",
            marginBottom: "1rem",
          }}
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "var(--color-secondary)",
            color: "var(--color-primary)",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {message && (
          <p
            style={{
              textAlign: "center",
              marginTop: "1rem",
              color: "var(--color-third)",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
