"use client"; //
import Navbar from "@/app/main/Navbar";
import Player from "@/app/main/components/Player";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)]">
      <Navbar />
      <Player />
    </main>
  );
}
