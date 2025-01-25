import { BASE_URL } from "./constants";

interface ExecutionResult {
  output: string[];
  runtime: number | null;
  error?: string;
}

export async function executeCode(code: string): Promise<ExecutionResult> {
  try {
    const response = await fetch(`${BASE_URL}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error("Execution failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error executing code:", error);
    return {
      output: [
        "Execution failed: " +
          (error instanceof Error ? error.message : "Unknown error"),
      ],
      runtime: null,
      error: "Execution failed",
    };
  }
}
