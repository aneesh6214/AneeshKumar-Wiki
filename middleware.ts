// Edge middleware: writes a server_hits row after the response is flushed
// via waitUntil so collection is zero-latency, and gates /admin/* behind the
// admin_session cookie. Skips RSC prefetches, /api, and /_next.

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
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};

function isPrefetch(req: NextRequest): boolean {
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
  // Admin views shouldn't self-pollute the analytics they display.
  if (pathname.startsWith("/admin")) return false;
  return true;
}

function decodeHeader(value: string | null): string | null {
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function readGeo(req: NextRequest): {
  country: string | null;
  region: string | null;
  city: string | null;
} {
  return {
    country: req.headers.get("x-vercel-ip-country"),
    region: req.headers.get("x-vercel-ip-country-region"),
    city: decodeHeader(req.headers.get("x-vercel-ip-city")),
  };
}

const VID_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

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
      maxAge: VID_COOKIE_MAX_AGE_SECONDS,
    });
  }

  if (!isTrackablePath(pathname) || isPrefetch(req)) {
    return res;
  }

  const uaString = req.headers.get("user-agent") ?? "";
  const { device, browser, os } = parseUA(uaString);
  const bot = isbot(uaString);

  const selfHost = req.nextUrl.hostname;
  const { source, bucket } = bucketReferrer(req.headers.get("referer"), selfHost);

  const { country, region, city } = readGeo(req);

  const row = {
    visitor_id: vid,
    path: pathname,
    device,
    browser,
    os,
    is_bot: bot,
    country,
    region,
    city,
    referrer_raw: req.headers.get("referer"),
    referrer_source: source,
    referrer_bucket: bucket,
  };

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
