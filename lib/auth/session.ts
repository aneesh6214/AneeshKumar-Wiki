// lib/auth/session.ts
// Two signed cookies:
//   - admin_session : 1h (or 30d) JWT proving the admin logged in
//   - vid           : 1y signed visitor identifier
//
// Both use jose so they work in the Edge runtime.

import { SignJWT, jwtVerify } from "jose";
import { env } from "@/lib/env";

const ADMIN_SECRET = new TextEncoder().encode(env.ADMIN_SESSION_SECRET);
const VID_SECRET = new TextEncoder().encode(env.VID_COOKIE_SECRET);

export const ADMIN_COOKIE = "admin_session";
export const VID_COOKIE = "vid";

export async function signAdminSession(opts: { longLived: boolean }): Promise<string> {
  const ttlSeconds = opts.longLived ? 60 * 60 * 24 * 30 : 60 * 60; // 30d or 1h
  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + ttlSeconds)
    .sign(ADMIN_SECRET);
}

export async function verifyAdminSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, ADMIN_SECRET);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function signVid(vid: string): Promise<string> {
  return await new SignJWT({ vid })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365)
    .sign(VID_SECRET);
}

export async function verifyVid(token: string | undefined): Promise<string | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, VID_SECRET);
    return typeof payload.vid === "string" ? payload.vid : null;
  } catch {
    return null;
  }
}

// Uses crypto.getRandomValues so it works on Edge (no Node `crypto` import).
export function newVid(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
