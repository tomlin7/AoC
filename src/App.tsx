import { CandyCane, Code2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Description } from "./components/Description";
import { MonacoEditor } from "./components/Editor";
import { Button } from "./components/ui/button";
import { YearDaySelector } from "./components/YearDay";
import { fetchPuzzle } from "./services/adventOfCode";
import type { FetchError } from "./services/types";
import { colors } from "./theme/colors";

function App() {
  const [year, setYear] = useState(2024);
  const [day, setDay] = useState(1);
  const [puzzleContent, setPuzzleContent] = useState("");
  const [error, setError] = useState<FetchError | undefined>();
  const [code, setCode] = useState(
    `// code\nfunction solve(input) {\n  // foo\n}\n`
  );

  useEffect(() => {
    const loadPuzzle = async () => {
      const { content, error } = await fetchPuzzle(year, day);
      setPuzzleContent(content);
      setError(error);
    };
    loadPuzzle();
  }, [year, day]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg0 }}>
      <header
        style={{ backgroundColor: colors.bg0_h, borderColor: colors.bg1 }}
        className="border-b"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6" style={{ color: colors.yellow }} />
              <h1
                className="text-xl font-semibold"
                style={{ color: colors.fg0 }}
              >
                tomlin7/AoC
              </h1>
            </div>
            <YearDaySelector
              year={year}
              day={day}
              onYearChange={setYear}
              onDayChange={setDay}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 flex" style={{ height: "calc(100vh - 4rem)" }}>
        {/* Description */}
        <div
          className="w-1/2 border-r"
          style={{ backgroundColor: colors.bg0, borderColor: colors.bg1 }}
        >
          <div
            className="h-12 flex items-center px-4 border-b"
            style={{ backgroundColor: colors.bg0_h, borderColor: colors.bg1 }}
          >
            <div className="flex items-center gap-2">
              <CandyCane className="h-5 w-5" style={{ color: colors.fg4 }} />
              <h2 className="font-medium" style={{ color: colors.fg1 }}>
                Description
              </h2>
            </div>
          </div>
          <Description puzzleContent={puzzleContent} error={error} />
        </div>

        {/* Editor */}
        <div
          className="w-1/2 flex flex-col"
          style={{ backgroundColor: colors.bg0 }}
        >
          <div
            className="h-12 flex items-center justify-between px-4 border-b"
            style={{ backgroundColor: colors.bg0_h, borderColor: colors.bg1 }}
          >
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5" style={{ color: colors.fg4 }} />
              <h2 className="font-medium" style={{ color: colors.fg1 }}>
                Solution
              </h2>
            </div>

            <Button
              onClick={() => {
                /* implement run */
              }}
            >
              Run
            </Button>
          </div>
          <div className="flex-1">
            <MonacoEditor
              code={code}
              onChange={(value) => setCode(value || "")}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
