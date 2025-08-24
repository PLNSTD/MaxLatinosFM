interface PlayButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

const PlayButton = ({ isPlaying, onClick }: PlayButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex w-[200px] h-[200px] md:w-[400px] md:h-[400px] sm:w-[300px] sm:h-[300px] items-center justify-center bg-center bg-cover p-4 rounded-full shadow-2xl text-black font-bold"
      style={{
        backgroundImage: `url(/Logo.jpg)`,
      }}
    >
      <div
        className="w-20 h-20 bg-center bg-cover cursor-pointer 
        transition-transform 
        hover:scale-150 duration-200 ease-in
        shadow-2xl
        opacity-50
        hover:opacity-100"
        style={{
          backgroundImage: `url(${
            isPlaying ? "/icons/Pause/pause-96.png)" : "/icons/Play/play-96.png"
          }`,
        }}
      />
    </button>
  );
};

export default PlayButton;
