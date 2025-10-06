"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function DeleteBumperPage() {
  const router = useRouter();

  const [bumperId, setBumperId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmStep, setConfirmStep] = useState(false);

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

  const handleDelete = async () => {
    if (!bumperId) {
      setMessage("⚠️ Please enter a Bumper ID.");
      return;
    }

    if (!confirmStep) {
      setMessage(
        "❓ Are you sure you want to delete this bumper? Click again to confirm."
      );
      setConfirmStep(true);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API}/bumpers/admin/${bumperId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.status === 401) {
        router.push("/admin/login"); // client-side redirect
      }

      if (res.ok) {
        setMessage("✅ Bumper deleted successfully!");
        setBumperId("");
      } else {
        const data = await res.json();
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
        backgroundColor: "var(--color-dark)",
        padding: "2rem",
      }}
      className="text-[var(--color-dark)]"
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
          Delete Bumper
        </h2>

        <input
          type="text"
          placeholder="Enter Bumper ID"
          value={bumperId}
          onChange={(e) => setBumperId(e.target.value)}
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
            : "Delete Bumper"}
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
