import { Terminal } from "lucide-react";
import { colors } from "../theme/colors";

interface ConsoleOutputProps {
  output: string[];
}

export function ConsoleOutput({ output }: ConsoleOutputProps) {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <Terminal className="h-4 w-4" style={{ color: colors.blue }} />
        <h3 className="font-medium" style={{ color: colors.fg1 }}>
          Output
        </h3>
      </div>
      <div
        className="font-mono text-sm p-3 rounded-lg overflow-y-auto max-h-32"
        style={{
          backgroundColor: colors.bg1,
          color: colors.fg2,
        }}
      >
        {output.length === 0 ? (
          <span style={{ color: colors.fg4 }}>No output</span>
        ) : (
          output.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {line}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
