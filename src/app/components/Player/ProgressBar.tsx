interface ProgressBarProps {
  progress: number; // 0 - 100
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full h-2 bg-gray-600 rounded-full">
      <div
        className="h-2 bg-green-500 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
