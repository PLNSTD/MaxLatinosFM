interface PlayButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

const PlayButton = ({ isPlaying, onClick }: PlayButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 hover:bg-green-600 p-4 rounded-full text-black font-bold"
    >
      {isPlaying ? "⏸️" : "▶️"}
    </button>
  );
};

export default PlayButton;
