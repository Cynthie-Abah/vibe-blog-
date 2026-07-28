/**
 * Estimate reading time for a given string of text.
 * Average adult reading speed is roughly 200-250 words per minute.
 */
export function calculateReadingTime(text: string, wordsPerMinute = 230): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
