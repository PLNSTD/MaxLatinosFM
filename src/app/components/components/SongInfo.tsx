interface SongInfoProps {
  title: string;
  artist: string;
}

const SongInfo = ({ title, artist }: SongInfoProps) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-300">{artist}</p>
    </div>
  );
};

export default SongInfo;
