import { fetchWithTimeout } from '../utils/fetch';

interface AnalysisResponse {
  timeComplexity: string;
  spaceComplexity: string;
}

export async function analyzeCode(code: string): Promise<AnalysisResponse> {
  try {
    const response = await fetchWithTimeout('http://localhost:3001/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Analysis failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing code:', error);
    return {
      timeComplexity: 'Analysis failed',
      spaceComplexity: 'Analysis failed',
    };
  }
}