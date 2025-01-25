import { BASE_URL, HEADERS } from "./constants";
import { extractContent } from "./parser";
import type { FetchError, PuzzleData } from "./types";

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout = 5000
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export async function fetchPuzzle(
  year: number,
  day: number
): Promise<PuzzleData> {
  try {
    const response = await fetchWithTimeout(
      `${BASE_URL}/puzzle/${year}/${day}`,
      {
        headers: HEADERS,
        credentials: "omit",
      }
    );

    if (!response.ok) {
      const error: FetchError = {
        message: "Failed to fetch puzzle",
        status: response.status,
      };

      if (response.status === 404) {
        error.message = "Puzzle not available yet, wait!";
      }
      // else if (response.status === 403) {
      //   error.message = 'Invalid session cookie';
      // }

      return {
        content: error.message,
        error,
      };
    }

    const text = await response.text();
    return {
      content: extractContent(text),
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      content: `Error loading: ${errorMessage}`,
      error: { message: errorMessage },
    };
  }
}
