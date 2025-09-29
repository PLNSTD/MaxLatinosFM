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
        // Sort by title
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
    return <p className="text-[var(--color-primary)]">Loading bumpers...</p>;

  return (
    <div className="p-4 bg-[var(--color-bg)] min-h-screen">
      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
        Bumper List
      </h1>
      <ul className="space-y-2">
        {bumpers.map((bumper) => (
          <li
            key={bumper.id}
            className="p-3 rounded-md shadow-md bg-[var(--color-secondary)] hover:bg-[var(--color-third)] transition-colors duration-300"
          >
            <span className="font-semibold text-[var(--color-primary)]">
              ID:
            </span>{" "}
            {bumper.id} &nbsp;|&nbsp;
            <span className="font-semibold text-[var(--color-primary)]">
              Title:
            </span>{" "}
            {bumper.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
