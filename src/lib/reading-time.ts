/** Rough reading time in minutes (~200 wpm), minimum 1. */
export function readingTimeMinutes(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
