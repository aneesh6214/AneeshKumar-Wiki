// app/api/admin/login/route.ts
// Native HTML form target. On success sets the admin_session cookie and
// 303-redirects to /admin (or ?next=). On failure redirects back to the
// login page with ?error=1 so the page can show the error banner.
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { ADMIN_COOKIE, signAdminSession } from "@/lib/auth/session";

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  const longLived = form.get("keep_me_logged_in") === "on";
  const next = String(form.get("next") ?? "/admin");

  if (!constantTimeEqual(password, env.ADMIN_PASSWORD)) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url, 303);
  }

  const token = await signAdminSession({ longLived });
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = next.startsWith("/admin") ? next : "/admin";
  redirectUrl.search = "";

  const res = NextResponse.redirect(redirectUrl, 303);
  res.cookies.set({
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: longLived ? 60 * 60 * 24 * 30 : 60 * 60,
  });
  return res;
}
