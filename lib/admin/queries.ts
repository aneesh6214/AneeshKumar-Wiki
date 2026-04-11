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
