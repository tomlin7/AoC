import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import express from "express";
import fetch from "node-fetch";
import vm from "vm";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const prompt =
  "Analyze this code and provide the time and space complexity. Only respond with a raw JSON object containing timeComplexity and spaceComplexity fields. Don't use markdown codeblocks syntax, give raw json text only. Here's the code:";

app.get("/", (req, res) => {
  res.send("Happy Advent of Code!");
});

// execution
app.post("/api/execute", async (req, res) => {
  const { code } = req.body;
  let runtime = null;

  const output = [];

  try {
    const context = { console: { log: (msg) => output.push(msg) } };
    vm.createContext(context);

    const startTime = Date.now();
    vm.runInContext(code, context);
    runtime = (Date.now() - startTime) / 1000;

    res.json({ output, runtime });
  } catch (error) {
    console.error("Execution error:", error);
    output.push(`Runtime Error: ${error.message}`);
    res.json({
      output,
      runtime: null,
      error: error.message,
    });
  }
});

// fetching
app.get("/api/puzzle/:year/:day", async (req, res) => {
  const { year, day } = req.params;

  try {
    const response = await fetch(
      `https://adventofcode.com/${year}/day/${day}`,
      {
        headers: {
          "User-Agent": "github.com/aoc-uhmm-person (billy@example.com)",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! ${response.status}`);
    }

    const text = await response.text();
    res.send(text);
  } catch (error) {
    console.error("Proxy error ", error);
    res.status(500).json({ error: error.message });
  }
});

// analysis
app.post("/api/analyze", async (req, res) => {
  const { code } = req.body;

  try {
    const result = await model.generateContent([prompt, code]);

    // if (!result.success) {
    //   throw new Error("Failed to analyze code" + response.body);
    // }

    const data = await result.response.text();
    const analysis = JSON.parse(data);

    res.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({
      timeComplexity: "Analysis failed",
      spaceComplexity: "Analysis failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server on port ${PORT}`);
});
