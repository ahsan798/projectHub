/**
 * Format an ISO date string into a readable date: "Dec 10, 2024"
 */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso));
}

/**
 * Return a relative time string: "2 hours ago", "in 3 days", etc.
 */
export function timeAgo(iso: string): string {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const diff = (new Date(iso).getTime() - Date.now()) / 1000;

  const thresholds: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, 'second'],
    [3600, 'minute'],
    [86400, 'hour'],
    [2592000, 'day'],
    [31536000, 'month'],
    [Infinity, 'year'],
  ];

  let prev = 1;
  for (const [threshold, unit] of thresholds) {
    if (Math.abs(diff) < threshold) {
      return rtf.format(Math.round(diff / prev), unit);
    }
    prev = threshold;
  }
  return formatDate(iso);
}

/**
 * Returns true if the ISO date is in the past.
 */
export function isOverdue(iso: string): boolean {
  return new Date(iso) < new Date();
}

/**
 * Returns how many days until the due date (negative if overdue).
 */
export function daysUntil(iso: string): number {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
