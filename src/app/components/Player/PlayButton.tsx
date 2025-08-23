interface PlayButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

const PlayButton = ({ isPlaying, onClick }: PlayButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-100 h-100 bg-center bg-cover p-4 rounded-full text-black font-bold"
      style={{
        backgroundImage: `url(/Logo.jpg)`,
      }}
    >
      {isPlaying ? "⏸️" : "▶️"}
    </button>
  );
};

export default PlayButton;
