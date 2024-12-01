export function extractContent(html: string): string {
  try {
    const puzzleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
    if (!puzzleMatch) {
      throw new Error('Cant find content');
    }
    return puzzleMatch[1]
      .replace(/<pre><code>/g, '<pre class="bg-zinc-900 p-4 rounded-md border border-zinc-700">')
      .replace(/<\/code><\/pre>/g, '</pre>')
      .replace(/<code>/g, '<code class="text-yellow-400">')
      .replace(/<em>/g, '<em class="text-yellow-100">')
      .replace(/<em class="star"/g, '<em class="star text-yellow-400 hover:text-yellow-600 font-semibold"')
      .replace(/<a /g, '<a class="text-yellow-400 hover:text-yellow-300" ');
  } catch (error) {
    console.error('Error parsing:', error);
    return 'Error parsing content';
  }
}