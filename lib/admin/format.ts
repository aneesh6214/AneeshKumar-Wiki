// lib/admin/format.ts
// Presentation helpers for admin metrics.

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function formatPercent(n: number, digits = 1): string {
  return (n * 100).toFixed(digits) + "%";
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.max(0, Math.floor(seconds - m * 60));
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}
