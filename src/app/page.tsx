"use client"; //
import Navbar from "@/app/components/Navbar";
import Player from "@/app/components/Player/Player";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg">
      <Navbar />
      <Player />
    </main>
  );
}
