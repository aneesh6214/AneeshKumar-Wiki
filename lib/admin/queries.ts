// lib/admin/queries.ts
// All queries the admin dashboard needs. Every function takes a TimeWindow
// and scopes to { start, end }. `is_bot = true` rows are excluded from
// every aggregate. Engagement metrics come from client_events only;
// pageview metrics come from server_hits only — the two paths are never
// JOINed. Any query that can legitimately return "no data" returns null
// or an empty array, and the UI renders an empty state.

import { getSupabase } from "@/lib/supabase/server";
import type { TimeWindow } from "@/lib/admin/window";

const SESSION_GAP_MS = 30 * 60 * 1000;

// ---------- Summary ----------

export interface AdminSummary {
  windowDays: number | null;
  totalPageviews: number;
  uniqueVisitors: number;
  sessions: number;
  avgSessionSeconds: number;
  bounceRate: number | null;
  returningVisitorRate: number | null;
  topCountry: string | null;
  topCountryShare: number | null;
  topPage: string | null;
  topPageTitle: string | null;
  topPageShare: number | null;
  desktopShare: number;
  peakDate: string | null;
  peakViews: number | null;
  peakReferrer: string | null;
  launched: string;
  lastRefresh: string;
}

export async function getSummary(window: TimeWindow): Promise<AdminSummary> {
  const sb = getSupabase();
  const { data, error } = await sb.rpc("admin_summary", {
    p_start: window.start ? window.start.toISOString() : null,
    p_end: window.end.toISOString(),
    p_gap_seconds: SESSION_GAP_MS / 1000,
  });
  if (error) throw error;
  const row = data?.[0] ?? null;

  return {
    windowDays: window.days,
    totalPageviews: row?.total_pageviews ?? 0,
    uniqueVisitors: row?.unique_visitors ?? 0,
    sessions: row?.sessions ?? 0,
    avgSessionSeconds: row?.avg_session_seconds ?? 0,
    bounceRate: row?.bounce_rate ?? null,
    returningVisitorRate: row?.returning_visitor_rate ?? null,
    topCountry: row?.top_country ?? null,
    topCountryShare: row?.top_country_share ?? null,
    topPage: row?.top_page ?? null,
    topPageTitle: row?.top_page ? prettyTitle(row.top_page) : null,
    topPageShare: row?.top_page_share ?? null,
    desktopShare: row?.desktop_share ?? 0,
    peakDate: row?.peak_date ?? null,
    peakViews: row?.peak_views ?? null,
    peakReferrer: row?.peak_referrer ?? null,
    launched: "January 2024",
    lastRefresh: new Date().toISOString(),
  };
}

function prettyTitle(path: string): string {
  if (path === "/") return "Home";
  return path
    .split("/")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " "))
    .join(": ");
}

// ---------- Daily pageviews ----------

export interface DailyPoint {
  date: string;
  views: number;
  visitors: number;
}

export async function getDailyPageviews(window: TimeWindow): Promise<DailyPoint[]> {
  const sb = getSupabase();
  const { data, error } = await sb.rpc("admin_daily_pageviews", {
    p_start: window.start ? window.start.toISOString() : null,
    p_end: window.end.toISOString(),
  });
  if (error) throw error;
  return (data ?? []).map((r: { day: string; views: number; visitors: number }) => ({
    date: new Date(r.day).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    views: r.views,
    visitors: r.visitors,
  }));
}

// ---------- Top pages ----------

export interface TopPage {
  path: string;
  title: string;
  views: number;
  avgScroll: number;
  avgTimeSec: number;
}

export async function getTopPages(window: TimeWindow, limit = 10): Promise<TopPage[]> {
  const sb = getSupabase();
  const { data, error } = await sb.rpc("admin_top_pages", {
    p_start: window.start ? window.start.toISOString() : null,
    p_end: window.end.toISOString(),
    p_limit: limit,
  });
  if (error) throw error;
  return (data ?? []).map(
    (r: {
      path: string;
      views: number;
      avg_scroll: number | null;
      avg_time_seconds: number | null;
    }) => ({
      path: r.path,
      title: prettyTitle(r.path),
      views: r.views,
      avgScroll: Math.round(r.avg_scroll ?? 0),
      avgTimeSec: Math.round(r.avg_time_seconds ?? 0),
    })
  );
}

// ---------- Referrers ----------

export interface TopReferrer {
  source: string;
  bucket: "search" | "direct" | "social" | "other";
  visits: number;
  share: number;
}

export async function getTopReferrers(window: TimeWindow, limit = 10): Promise<TopReferrer[]> {
  const sb = getSupabase();
  const { data, error } = await sb.rpc("admin_top_referrers", {
    p_start: window.start ? window.start.toISOString() : null,
    p_end: window.end.toISOString(),
    p_limit: limit,
  });
  if (error) throw error;
  return (data ?? []).map((r: { source: string; bucket: string; visits: number; share: number }) => ({
    source: r.source,
    bucket: r.bucket as TopReferrer["bucket"],
    visits: r.visits,
    share: Number(r.share ?? 0),
  }));
}

// ---------- Countries ----------

export interface CountryRow {
  country: string;
  visits: number;
  share: number;
}

export async function getTopCountries(window: TimeWindow, limit = 10): Promise<CountryRow[]> {
  const sb = getSupabase();
  const { data, error } = await sb.rpc("admin_top_countries", {
    p_start: window.start ? window.start.toISOString() : null,
    p_end: window.end.toISOString(),
    p_limit: limit,
  });
  if (error) throw error;
  return (data ?? []).map((r: { country: string; visits: number; share: number }) => ({
    country: r.country,
    visits: r.visits,
    share: Number(r.share ?? 0),
  }));
}

// ---------- Categories (device/browser/os) ----------

export interface SlicePoint {
  name: string;
  value: number;
}

async function getCategoryShare(window: TimeWindow, column: "device" | "browser" | "os"): Promise<SlicePoint[]> {
  const sb = getSupabase();
  const { data, error } = await sb.rpc("admin_category_share", {
    p_start: window.start ? window.start.toISOString() : null,
    p_end: window.end.toISOString(),
    p_column: column,
  });
  if (error) throw error;
  return (data ?? []).map((r: { name: string; value: number }) => ({
    name: r.name,
    value: Number(r.value ?? 0),
  }));
}

export const getDevices = (w: TimeWindow) => getCategoryShare(w, "device");
export const getBrowsers = (w: TimeWindow) => getCategoryShare(w, "browser");
export const getOperatingSystems = (w: TimeWindow) => getCategoryShare(w, "os");

// ---------- Searches ----------

export interface SearchRow { query: string; count: number; }

export async function getTopSearches(window: TimeWindow, limit = 10): Promise<SearchRow[]> {
  const sb = getSupabase();
  const { data, error } = await sb.rpc("admin_top_searches", {
    p_start: window.start ? window.start.toISOString() : null,
    p_end: window.end.toISOString(),
    p_limit: limit,
  });
  if (error) throw error;
  return (data ?? []) as SearchRow[];
}

// ---------- Outbound ----------

export interface OutboundRow { url: string; clicks: number; }

export async function getTopOutbound(window: TimeWindow, limit = 10): Promise<OutboundRow[]> {
  const sb = getSupabase();
  const { data, error } = await sb.rpc("admin_top_outbound", {
    p_start: window.start ? window.start.toISOString() : null,
    p_end: window.end.toISOString(),
    p_limit: limit,
  });
  if (error) throw error;
  return (data ?? []) as OutboundRow[];
}

// ---------- Scroll depth for top 3 pages ----------

export interface ScrollPoint {
  bucket: string;
  [k: string]: string | number;
}

export interface ScrollDepthData {
  points: ScrollPoint[];
  pageLabels: { p1?: string; p2?: string; p3?: string };
}

export async function getScrollDepth(window: TimeWindow): Promise<ScrollDepthData> {
  const sb = getSupabase();
  const { data, error } = await sb.rpc("admin_scroll_depth_top_pages", {
    p_start: window.start ? window.start.toISOString() : null,
    p_end: window.end.toISOString(),
  });
  if (error) throw error;
  const rows = (data ?? []) as {
    bucket: string; page_key: string; page_path: string; page_rank: number; percent: number | null;
  }[];

  const labels: ScrollDepthData["pageLabels"] = {};
  const byBucket = new Map<string, ScrollPoint>();
  for (const r of rows) {
    labels[r.page_key as "p1" | "p2" | "p3"] = r.page_path;
    let point = byBucket.get(r.bucket);
    if (!point) {
      point = { bucket: r.bucket };
      byBucket.set(r.bucket, point);
    }
    point[r.page_key] = Number(r.percent ?? 0);
  }
  const order = ["25%", "50%", "75%", "100%"];
  const points = order
    .map((b) => byBucket.get(b))
    .filter((p): p is ScrollPoint => p !== undefined);

  return { points, pageLabels: labels };
}

// ---------- Performance ----------

export interface PerfPoint { date: string; ttfb: number | null; lcp: number | null; }

export async function getPerformance(window: TimeWindow): Promise<PerfPoint[]> {
  const sb = getSupabase();
  const { data, error } = await sb.rpc("admin_performance", {
    p_start: window.start ? window.start.toISOString() : null,
    p_end: window.end.toISOString(),
  });
  if (error) throw error;
  return (data ?? []).map((r: { day: string; ttfb: string | null; lcp: string | null }) => ({
    date: new Date(r.day).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    ttfb: r.ttfb === null ? null : Math.round(Number(r.ttfb)),
    lcp:  r.lcp  === null ? null : Math.round(Number(r.lcp)),
  }));
}

// ---------- JS errors ----------

export interface JsErrorRow { time: string; path: string; message: string; }

export async function getJsErrors(window: TimeWindow, limit = 50): Promise<JsErrorRow[]> {
  const sb = getSupabase();
  const { data, error } = await sb.rpc("admin_js_errors", {
    p_start: window.start ? window.start.toISOString() : null,
    p_end: window.end.toISOString(),
    p_limit: limit,
  });
  if (error) throw error;
  return (data ?? []).map((r: { at: string; path: string; message: string }) => ({
    time: new Date(r.at).toLocaleString("en-US", {
      month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false,
    }),
    path: r.path,
    message: r.message ?? "",
  }));
}

// ---------- Live visitors ----------

export interface LiveVisitor {
  vidShort: string;
  country: string | null;
  path: string;
  device: string | null;
  since: string;
}

export async function getLiveVisitors(): Promise<LiveVisitor[]> {
  const sb = getSupabase();
  const { data, error } = await sb.rpc("admin_live_visitors");
  if (error) throw error;
  return (data ?? []).map((r: { visitor_id: string; country: string | null; path: string; device: string | null; since_seconds: number }) => ({
    vidShort: r.visitor_id.slice(0, 4) + "..." + r.visitor_id.slice(-3),
    country: r.country,
    path: r.path,
    device: r.device,
    since: formatMmSs(r.since_seconds),
  }));
}

function formatMmSs(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ---------- Raw events ----------

export interface RawEvent {
  at: string;
  source: string;
  vidShort: string;
  path: string | null;
  extras: Record<string, unknown>;
}

export async function getRawEvents(limit = 100): Promise<RawEvent[]> {
  const sb = getSupabase();
  const { data, error } = await sb.rpc("admin_raw_events", { p_limit: limit });
  if (error) throw error;
  return (data ?? []).map((r: { at: string; source: string; visitor_id: string; path: string | null; extras: Record<string, unknown> }) => ({
    at: new Date(r.at).toLocaleTimeString("en-US", { hour12: false }),
    source: r.source,
    vidShort: r.visitor_id.slice(0, 4) + "..." + r.visitor_id.slice(-3),
    path: r.path,
    extras: r.extras ?? {},
  }));
}
