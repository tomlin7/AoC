import cors from "cors";
import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3001;

app.use(cors());

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

app.listen(PORT, () => {
  console.log(`Proxy server on port ${PORT}`);
});
