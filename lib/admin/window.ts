// lib/admin/window.ts
// Parses a ?window= param into concrete timestamps used by all admin queries.
// "all" returns { start: null, end: now } meaning "no lower bound".

export type WindowValue = "24h" | "7d" | "30d" | "90d" | "1y" | "all";

export interface TimeWindow {
  value: WindowValue;
  label: string;
  days: number | null; // null for "all"
  start: Date | null;  // null for "all"
  end: Date;
}

const LABELS: Record<WindowValue, string> = {
  "24h": "Last 24 hours",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  "1y": "Last year",
  "all": "All time",
};

const DAYS: Record<WindowValue, number | null> = {
  "24h": 1,
  "7d": 7,
  "30d": 30,
  "90d": 90,
  "1y": 365,
  "all": null,
};

export function parseWindow(raw: string | undefined): TimeWindow {
  const v = (raw && raw in LABELS ? raw : "30d") as WindowValue;
  const end = new Date();
  const days = DAYS[v];
  const start = days === null ? null : new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
  return { value: v, label: LABELS[v], days, start, end };
}
