"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteSongPage() {
  const router = useRouter();

  const [songId, setSongId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmStep, setConfirmStep] = useState(false);

  const handleDelete = async () => {
    if (!songId) {
      setMessage("⚠️ Please enter a Song ID.");
      return;
    }

    if (!confirmStep) {
      setMessage(
        "❓ Are you sure you want to delete this song? Click again to confirm."
      );
      setConfirmStep(true);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`http://localhost:3001/songs/${songId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Song deleted successfully!");
        setSongId("");
      } else {
        setMessage("❌ Deletion failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Deletion failed: Server error");
    }

    setLoading(false);
    setConfirmStep(false); // reset step
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
          Delete Song
        </h2>

        <input
          type="text"
          placeholder="Enter Song ID"
          value={songId}
          onChange={(e) => setSongId(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "0.5rem",
            borderRadius: "6px",
            border: `1px solid var(--color-third)`,
          }}
        />

        <button
          onClick={handleDelete}
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: confirmStep ? "red" : "var(--color-secondary)",
            color: "var(--color-primary)",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading
            ? "Deleting..."
            : confirmStep
            ? "Click again to confirm delete"
            : "Delete Song"}
        </button>

        {message && (
          <p
            style={{
              textAlign: "center",
              marginTop: "1rem",
              color: confirmStep ? "red" : "var(--color-third)",
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
