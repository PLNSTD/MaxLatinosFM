"use client";
import Image from "next/image";

interface PlayButtonProps {
  isPlaying: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const PlayButton = ({ isPlaying, onClick, disabled }: PlayButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative flex items-center justify-center
        rounded-full shadow-2xl transition-all duration-300
        bg-center bg-cover
        disabled:opacity-50 disabled:cursor-not-allowed`}
      style={{
        backgroundImage: `url(/Logo.jpg)`,
        width: "min(60vw, 400px)",
        height: "min(60vw, 400px)",
        maxWidth: "400px",
        maxHeight: "400px",
        minWidth: "180px",
        minHeight: "180px",
      }}
    >
      {/* subtle dark overlay for contrast */}
      <div className="absolute inset-0 rounded-full bg-black/20" />

      {/* soft glowing disc behind icon when playing */}
      {isPlaying && !disabled && (
        <div className="absolute z-0 w-[64%] h-[64%] rounded-full bg-[var(--color-bg)]/20 blur-[18px]" />
      )}

      {/* expanding ring (uses Tailwind built-in animate-ping) */}
      {isPlaying && !disabled && (
        <span className="absolute z-10 inset-0 flex items-center justify-center pointer-events-none">
          <span className="absolute block w-[86%] h-[86%] rounded-full border-4 border-[var(--color-dark)]/80 opacity-100 animate-ping" />
        </span>
      )}

      {/* Animated ring when playing */}
      {isPlaying && !disabled && (
        <span className="absolute inset-0 rounded-full border-4 border-[var(--color-bg)] opacity-70 animate-ring" />
      )}

      {/* Loading spinner when disabled */}
      {disabled && (
        <span className="absolute w-[25%] h-[25%] border-4 border-[var(--color-dark)] border-t-transparent rounded-full animate-spin" />
      )}

      {/* Play/Pause icon */}
      {!disabled && (
        <Image
          src={isPlaying ? "/icons/Pause/pause.svg" : "/icons/Play/play.svg"}
          alt={isPlaying ? "Pause" : "Play"}
          width={100}
          height={100}
          className="relative w-[25%] sm:w-[20%] md:w-[18%] h-auto transition-transform duration-300 opacity-60 hover:opacity-100 hover:scale-150"
        />
      )}
    </button>
  );
};

export default PlayButton;
