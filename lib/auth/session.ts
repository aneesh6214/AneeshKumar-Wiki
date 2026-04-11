// admin_session and vid cookies. Both use jose so they work on the Edge runtime.

import { SignJWT, jwtVerify } from "jose";
import { env } from "@/lib/env";

const ADMIN_SECRET = new TextEncoder().encode(env.ADMIN_SESSION_SECRET);
const VID_SECRET = new TextEncoder().encode(env.VID_COOKIE_SECRET);

export const ADMIN_TTL_SHORT = 60 * 60;
export const ADMIN_TTL_LONG = 60 * 60 * 24 * 30;
const VID_TTL = 60 * 60 * 24 * 365;
const VID_BYTES = 16;

export const ADMIN_COOKIE = "admin_session";
export const VID_COOKIE = "vid";

export async function signAdminSession(opts: { longLived: boolean }): Promise<string> {
  const ttlSeconds = opts.longLived ? ADMIN_TTL_LONG : ADMIN_TTL_SHORT;
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
    .setExpirationTime(Math.floor(Date.now() / 1000) + VID_TTL)
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

// crypto.getRandomValues works on Edge (no Node `crypto` import).
export function newVid(): string {
  const bytes = new Uint8Array(VID_BYTES);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
