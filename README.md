# Advent of Code

![advent-of-code](https://github.com/user-attachments/assets/9e4272e5-2964-4499-ae74-37a9a6c2d293) [![cross-platform-download](https://github.com/user-attachments/assets/e2d74fb8-c6e0-40e9-980d-f1a4aa87fbb2)](https://github.com/tomlin7/AoC/releases/tag/v0.1.0)

Home repo for my solutions and an editor and bench tool for supercharging Advent of Code!

![app](.github/image.png)

Also includes a notification daemon for daily AoC challenge notifications during Dec 1-25!

![notifier](https://github.com/user-attachments/assets/5f74d9b9-4b13-438e-812e-e717df6e802d)

## Getting Started

1. [Open the app](https://aoc24.vercel.app/)
2. You will notice it fails to fetch data or generate benchmarks for your code. You will have to run the backend yourself.
3. Get a [Gemini API key](https://ai.google.dev/gemini-api/docs/api-key). Set it as an environment variable: `set API_KEY=YOUR_KEY` or `export API_KEY=YOUR_KEY`
4. You will need bun/npm:
  ```bash
  bun i
  bun run dev
  ```

That's it! Now just [refresh the app](https://aoc24.vercel.app/).
