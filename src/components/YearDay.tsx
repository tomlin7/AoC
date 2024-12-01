import React from "react";
import { colors } from "../theme/colors";

interface YearDaySelectorProps {
  year: number;
  day: number;
  onYearChange: (year: number) => void;
  onDayChange: (day: number) => void;
}

export function YearDaySelector({
  year,
  day,
  onYearChange,
  onDayChange,
}: YearDaySelectorProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);
  const days = Array.from({ length: 25 }, (_, i) => i + 1);

  const selectStyles = {
    backgroundColor: colors.bg1,
    borderColor: colors.bg2,
    color: colors.fg1,
    "--tw-ring-color": colors.yellow,
    "--tw-ring-offset-color": colors.bg0,
  } as React.CSSProperties;

  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-2">
        <label
          htmlFor="year"
          className="text-sm font-medium"
          style={{ color: colors.fg2 }}
        >
          Year
        </label>
        <select
          id="year"
          value={year}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className="rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={selectStyles}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label
          htmlFor="day"
          className="text-sm font-medium"
          style={{ color: colors.fg2 }}
        >
          Day
        </label>
        <select
          id="day"
          value={day}
          onChange={(e) => onDayChange(Number(e.target.value))}
          className="rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={selectStyles}
        >
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
