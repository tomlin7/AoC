import { Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { colors } from "../theme/colors";
import { formatTimeRemaining, getNextPuzzleTime } from "../utils/time";

export function TimeRemaining() {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const nextPuzzle = getNextPuzzleTime();
      setTimeRemaining(formatTimeRemaining(nextPuzzle));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center">
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-md"
        style={{ backgroundColor: colors.bg1 }}
      >
        <Timer className="h-4 w-4" style={{ color: colors.yellow }} />
        <span className="text-sm font-medium" style={{ color: colors.fg1 }}>
          {timeRemaining}
        </span>
      </div>
    </div>
  );
}
