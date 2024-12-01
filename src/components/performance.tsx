import { Box, ChevronDown, ChevronUp, Clock, Cpu, Zap } from "lucide-react";
import { cn } from "../lib/utils";

import { LucideIcon } from "lucide-react";
import { colors } from "../theme/colors";

interface PerformanceMetricProps {
  icon: LucideIcon;
  title: string;
  value: string | number | null;
  isLoading?: boolean;
}

interface PerformanceHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function PerformanceHeader({
  isOpen,
  onToggle,
}: PerformanceHeaderProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full px-4 py-2 flex items-center justify-between transition-colors"
      style={{
        backgroundColor: colors.bg1,
        borderColor: colors.bg2,
      }}
    >
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4" style={{ color: colors.yellow }} />
        <span className="font-medium" style={{ color: colors.fg1 }}>
          Stats
        </span>
      </div>
      {isOpen ? (
        <ChevronDown className="h-4 w-4" style={{ color: colors.fg4 }} />
      ) : (
        <ChevronUp className="h-4 w-4" style={{ color: colors.fg4 }} />
      )}
    </button>
  );
}

function PerformanceMetric({
  icon: Icon,
  title,
  value,
  isLoading,
}: PerformanceMetricProps) {
  const displayValue = isLoading
    ? "Analyzing..."
    : value === null
    ? "Not run yet"
    : typeof value === "number"
    ? `${value.toFixed(3)}s`
    : value;

  return (
    <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bg1 }}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4" style={{ color: colors.blue }} />
        <h3 className="font-medium" style={{ color: colors.fg1 }}>
          {title}
        </h3>
      </div>
      <p className="text-lg font-mono" style={{ color: colors.fg2 }}>
        {displayValue}
      </p>
    </div>
  );
}

import { ConsoleOutput } from "./output";

interface PerformanceData {
  timeComplexity: string;
  spaceComplexity: string;
  runtime: number | null;
  isAnalyzing: boolean;
}

interface PerformancePanelProps {
  isOpen: boolean;
  onToggle: () => void;
  performance: PerformanceData;
  consoleOutput: string[];
}

export function PerformancePanel({
  isOpen,
  onToggle,
  performance,
  consoleOutput,
}: PerformancePanelProps) {
  return (
    <div
      className="border-t"
      style={{
        backgroundColor: colors.bg0,
        borderColor: colors.bg2,
      }}
    >
      <PerformanceHeader isOpen={isOpen} onToggle={onToggle} />

      <div
        className={cn(
          "px-4 py-3 space-y-4 transition-all duration-200",
          isOpen ? "block" : "hidden"
        )}
        style={{ backgroundColor: colors.bg0 }}
      >
        <div className="grid grid-cols-3 gap-4">
          <PerformanceMetric
            icon={Box}
            title="Space Complexity"
            value={performance.spaceComplexity}
            isLoading={performance.isAnalyzing}
          />
          <PerformanceMetric
            icon={Cpu}
            title="Time Complexity"
            value={performance.timeComplexity}
            isLoading={performance.isAnalyzing}
          />
          <PerformanceMetric
            icon={Clock}
            title="Runtime"
            value={performance.runtime}
          />
        </div>
        <ConsoleOutput output={consoleOutput} />
      </div>
    </div>
  );
}
