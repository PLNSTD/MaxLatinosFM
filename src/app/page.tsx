"use client"; //
import Navbar from "@/app/components/Navbar";
import Player from "@/app/components/HomePage/Player";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)]">
      <Navbar />
      <Player />
    </main>
  );
}
