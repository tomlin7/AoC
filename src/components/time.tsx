import { Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { colors } from "../theme/colors";
import { formatTimeRemaining, getNextPuzzleInfo } from "../utils/time";

interface TimeRemainingProps {
  onNextPuzzleClick: (year: number, day: number) => void;
}

export function TimeRemaining({ onNextPuzzleClick }: TimeRemainingProps) {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const nextPuzzle = getNextPuzzleInfo();
      setTimeRemaining(formatTimeRemaining(nextPuzzle.date));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    const nextPuzzle = getNextPuzzleInfo();
    onNextPuzzleClick(nextPuzzle.year, nextPuzzle.day);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors hover:bg-opacity-80"
        style={{ backgroundColor: colors.bg1 }}
      >
        <Timer className="h-4 w-4" style={{ color: colors.yellow }} />
        <span className="text-sm font-medium" style={{ color: colors.fg1 }}>
          {timeRemaining}
        </span>
      </button>
    </div>
  );
}
