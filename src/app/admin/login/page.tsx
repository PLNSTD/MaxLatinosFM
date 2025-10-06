"use client";
import { useContext } from "react";
import { LoadingContext } from "../layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"error" | "success">("success");
  const { setLoading } = useContext(LoadingContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (res.ok) {
      setPopupType("success");
      setPopupMessage("Login successful!");
      setLoading(false);
      setTimeout(() => router.push("/admin"), 1000);
    } else {
      setPopupType("error");
      setPopupMessage("Invalid credentials. Please try again.");
    }
  };

  // Auto-hide popup after 3 seconds
  useEffect(() => {
    if (!popupMessage) return;
    const timer = setTimeout(() => setPopupMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [popupMessage]);

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-80 relative"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>

        {/* Floating popup */}
        {popupMessage && (
          <div
            className={`absolute top-[-60px] left-1/2 -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white ${
              popupType === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {popupMessage}
          </div>
        )}
      </form>
    </div>
  );
}
