"use client";

import { useEffect, useState } from "react";

interface Bumper {
  id: number;
  title: string;
}

// const API = "http://localhost:3001/bumpers/list";
const API = "https://maxlatinosfm-backend.onrender.com/bumpers/list";

export default function BumperList() {
  const [bumpers, setBumpers] = useState<Bumper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBumpers = async () => {
      try {
        const res = await fetch(`${API}`);
        const data: Bumper[] = await res.json();
        data.sort((a, b) => a.title.localeCompare(b.title));
        setBumpers(data);
      } catch (err) {
        console.error("Failed to fetch bumpers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBumpers();
  }, []);

  if (loading)
    return (
      <p className="text-[var(--color-primary)] text-center mt-10 animate-pulse">
        Loading bumpers...
      </p>
    );

  return (
    <div className="p-6 bg-[var(--color-dark)] min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-6 text-center">
        🎵 Bumper List
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bumpers.map((bumper) => (
          <div
            key={bumper.id}
            className="bg-[var(--color-bg)] rounded-2xl shadow-lg p-4 cursor-pointer
                       hover:bg-[var(--color-third)] hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <p className="text-sm text-black mb-2">ID: {bumper.id}</p>
            <p className="font-semibold text-[var(--color-primary)] text-lg">
              {bumper.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
