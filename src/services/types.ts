export interface FetchError {
    message: string;
    status?: number;
}

export interface PuzzleData {
    content: string;
    error?: FetchError;
}