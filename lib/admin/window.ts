// Parses a ?window= param into concrete timestamps used by all admin queries.
// "all" returns { start: null, end: now } meaning "no lower bound".

import { adminContent } from "@/content/admin";

export type WindowValue = "24h" | "7d" | "30d" | "90d" | "1y" | "all";

export interface TimeWindow {
  value: WindowValue;
  label: string;
  days: number | null; // null for "all"
  start: Date | null;  // null for "all"
  end: Date;
}

const WINDOW_VALUES = new Set<string>(
  adminContent.sidebar.windows.map((window) => window.value),
);

const LABELS = Object.fromEntries(
  adminContent.sidebar.windows.map((window) => [window.value, window.label]),
) as Record<WindowValue, string>;

const DAYS = Object.fromEntries(
  adminContent.sidebar.windows.map((window) => [window.value, window.days]),
) as Record<WindowValue, number | null>;

function isWindowValue(value: string | undefined): value is WindowValue {
  return Boolean(value && WINDOW_VALUES.has(value));
}

export function parseWindow(raw: string | undefined): TimeWindow {
  const v = isWindowValue(raw) ? raw : "30d";
  const end = new Date();
  const days = DAYS[v];
  const start = days === null ? null : new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
  return { value: v, label: LABELS[v], days, start, end };
}
