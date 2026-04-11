// middleware.ts
// Runs on every qualifying request at the edge. Responsibilities:
//   1. Skip non-page requests (assets, API, RSC prefetch)
//   2. Ensure a signed vid cookie exists
//   3. Parse UA / referrer / geo, detect bots
//   4. Write a server_hits row after the response is flushed via waitUntil
//   5. Gate /admin/* behind the admin_session cookie
//
// The write path NEVER blocks the response — collection is zero-latency.

import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import { isbot } from "isbot";
import { getSupabase } from "@/lib/supabase/server";
import { parseUA } from "@/lib/analytics/parse-ua";
import { bucketReferrer } from "@/lib/analytics/referrer";
import {
  ADMIN_COOKIE,
  VID_COOKIE,
  verifyAdminSession,
  verifyVid,
  signVid,
  newVid,
} from "@/lib/auth/session";

export const config = {
  // Run on everything that isn't an asset or API route. We still skip more
  // aggressively inside the handler (RSC prefetches, /api, /_next).
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};

function isPrefetch(req: NextRequest): boolean {
  // RSC prefetch requests carry these headers; they are not real pageviews.
  return (
    req.headers.get("next-router-prefetch") === "1" ||
    req.headers.get("purpose") === "prefetch" ||
    req.headers.get("x-purpose") === "prefetch" ||
    req.headers.get("rsc") === "1"
  );
}

function isTrackablePath(pathname: string): boolean {
  if (pathname.startsWith("/api/")) return false;
  if (pathname.startsWith("/_next/")) return false;
  if (pathname.startsWith("/admin")) return false; // admin views shouldn't self-pollute
  return true;
}

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  // ---------- /admin gate ----------
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = req.cookies.get(ADMIN_COOKIE)?.value;
    const ok = await verifyAdminSession(sessionCookie);
    if (!ok) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  // ---------- vid cookie ----------
  const existingVidToken = req.cookies.get(VID_COOKIE)?.value;
  let vid = await verifyVid(existingVidToken);
  let mintedVidToken: string | null = null;
  if (!vid) {
    vid = newVid();
    mintedVidToken = await signVid(vid);
  }

  const res = NextResponse.next();
  if (mintedVidToken) {
    res.cookies.set({
      name: VID_COOKIE,
      value: mintedVidToken,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1y
    });
  }

  // ---------- skip non-trackable ----------
  if (!isTrackablePath(pathname) || isPrefetch(req)) {
    return res;
  }

  // ---------- compute row ----------
  const uaString = req.headers.get("user-agent") ?? "";
  const { device, browser, os } = parseUA(uaString);
  const bot = isbot(uaString);

  const selfHost = req.nextUrl.hostname;
  const { source, bucket } = bucketReferrer(req.headers.get("referer"), selfHost);

  const geo = (req as unknown as { geo?: { country?: string; region?: string; city?: string } }).geo ?? {};

  const row = {
    visitor_id: vid,
    path: pathname,
    device,
    browser,
    os,
    is_bot: bot,
    country: geo.country ?? null,
    region: geo.region ?? null,
    city: geo.city ?? null,
    referrer_raw: req.headers.get("referer"),
    referrer_source: source,
    referrer_bucket: bucket,
  };

  // ---------- fire-and-forget write ----------
  event.waitUntil(
    (async () => {
      try {
        const sb = getSupabase();
        await sb.from("server_hits").insert(row);
      } catch (err) {
        console.error("[analytics] server_hits insert failed", err);
      }
    })()
  );

  return res;
}
