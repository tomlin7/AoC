const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
const express = require("express");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const PROMPT =
  "Analyze this code and provide the time and space complexity. Only respond with a raw JSON object containing timeComplexity and spaceComplexity fields. Don't use markdown codeblocks syntax, give raw json text only. Here's the code:";

app.get("/", (req, res) => res.send("Hello!"));

// fetching
app.get("/puzzle/:year/:day", async (req, res) => {
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
app.post("/analyze", async (req, res) => {
  const { code } = req.body;

  try {
    const result = await model.generateContent([PROMPT, code]);

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

module.exports = app;
