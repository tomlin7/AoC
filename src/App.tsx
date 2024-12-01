import { CandyCane, Code2, TreePine } from "lucide-react";
import { useEffect, useState } from "react";
import { Description } from "./components/Description";
import { MonacoEditor } from "./components/Editor";
import { PerformancePanel } from "./components/performance";
import { YearDaySelector } from "./components/YearDay";
import { fetchPuzzle } from "./services/adventOfCode";
import { analyzeCode } from "./services/performanceAnalysis";
import type { FetchError } from "./services/types";
import { colors } from "./theme/colors";
import { ConsoleCapture } from "./utils/console";

const consoleCapture = new ConsoleCapture();

function App() {
  const [year, setYear] = useState(2024);
  const [day, setDay] = useState(1);
  const [puzzleContent, setPuzzleContent] = useState("");
  const [error, setError] = useState<FetchError | undefined>();
  const [code, setCode] = useState(
    `// code\nfunction solve(input) {\n  // foo\n}\n`
  );

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

  const [performance, setPerformance] = useState({
    timeComplexity: "",
    spaceComplexity: "",
    runtime: null as number | null,
    isAnalyzing: false,
  });

  useEffect(() => {
    const loadPuzzle = async () => {
      const { content, error } = await fetchPuzzle(year, day);
      setPuzzleContent(content);
      setError(error);
    };
    loadPuzzle();
  }, [year, day]);

  const handleCodeChange = async (value: string | undefined) => {
    setCode(value || "");
  };

  const handleRunCode = async () => {
    setIsPanelOpen(true);
    setPerformance((prev) => ({ ...prev, isAnalyzing: true }));

    try {
      const analysis = await analyzeCode(code || "");
      setPerformance((prev) => ({
        ...prev,
        timeComplexity: analysis.timeComplexity,
        spaceComplexity: analysis.spaceComplexity,
        isAnalyzing: false,
      }));
    } catch (error) {
      setPerformance((prev) => ({
        ...prev,
        timeComplexity: "Analysis failed",
        spaceComplexity: "Analysis failed",
        isAnalyzing: false,
      }));
    }

    consoleCapture.clear();
    consoleCapture.start();

    // calculate runtime
    const startTime = new Date().getTime();
    try {
      eval(code);
      const endTime = new Date().getTime();
      setPerformance((prev) => ({
        ...prev,
        runtime: (endTime - startTime) / 1000,
      }));
    } catch (error) {
      console.error("Error running code:", error);
      setPerformance((prev) => ({
        ...prev,
        runtime: null,
      }));
    } finally {
      consoleCapture.stop();
      setConsoleOutput(consoleCapture.getOutput());
    }
  };

  return (
    <div
      className="h-screen flex flex-col bg-gray-100"
      style={{ backgroundColor: colors.bg0 }}
    >
      <header
        style={{ backgroundColor: colors.bg0_h, borderColor: colors.bg1 }}
        className="border-b flex-none"
      >
        <div className="max-w-full px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TreePine className="h-6 w-6" style={{ color: colors.yellow }} />
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

      <main className="flex-1 flex min-h-0">
        {/* Description */}
        <div
          className="w-1/2 flex flex-col border-r"
          style={{ backgroundColor: colors.bg0, borderColor: colors.bg1 }}
        >
          <div
            className="flex-none h-12 flex items-center px-4 border-b"
            style={{ borderColor: colors.bg1, backgroundColor: colors.bg0_h }}
          >
            <div className="flex items-center gap-2">
              <CandyCane className="h-5 w-5" style={{ color: colors.fg4 }} />
              <h2 className="font-medium" style={{ color: colors.fg1 }}>
                Description
              </h2>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Description puzzleContent={puzzleContent} error={error} />
          </div>
        </div>

        {/* Editor */}
        <div
          className="w-1/2 flex flex-col"
          style={{ backgroundColor: colors.bg0 }}
        >
          <div
            className="flex-none h-12 flex items-center justify-between px-4 border-b"
            style={{ borderColor: colors.bg1, backgroundColor: colors.bg0_h }}
          >
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5" style={{ color: colors.fg4 }} />
              <h2 className="font-medium" style={{ color: colors.fg1 }}>
                Code
              </h2>
            </div>

            <button
              className="px-4 py-1.5 rounded-md transition-colors"
              style={{
                backgroundColor: colors.blue,
                color: colors.bg0,
              }}
              onClick={handleRunCode}
            >
              Run & Analyze
            </button>
          </div>
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="flex-1 overflow-hidden">
              <MonacoEditor code={code} onChange={handleCodeChange} />
            </div>
            <div className="flex-none">
              <PerformancePanel
                isOpen={isPanelOpen}
                onToggle={() => setIsPanelOpen(!isPanelOpen)}
                performance={performance}
                consoleOutput={consoleOutput}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
