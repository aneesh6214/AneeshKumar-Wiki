// app/api/beacon/route.ts
// Accepts payloads from navigator.sendBeacon and writes to client_events.
// Keeps payload validation loose on purpose: we drop rows that don't match
// our schema but never throw, so broken clients don't throw 500s.

import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/server";
import { verifyVid, VID_COOKIE } from "@/lib/auth/session";

const ALLOWED_TYPES = new Set([
  "engagement",
  "outbound",
  "search",
  "error",
  "vitals",
]);

interface BeaconBody {
  type?: string;
  path?: string;
  payload?: Record<string, unknown>;
}

export async function POST(req: NextRequest) {
  let body: BeaconBody;
  try {
    body = (await req.json()) as BeaconBody;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const type = String(body.type ?? "");
  if (!ALLOWED_TYPES.has(type)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const vid = await verifyVid(req.cookies.get(VID_COOKIE)?.value);
  if (!vid) {
    // Beacons from visitors who somehow have no vid are dropped silently.
    return NextResponse.json({ ok: true });
  }

  const row = {
    visitor_id: vid,
    event_type: type,
    path: typeof body.path === "string" ? body.path : null,
    payload: body.payload ?? {},
  };

  try {
    const sb = getSupabase();
    await sb.from("client_events").insert(row);
  } catch (err) {
    console.error("[analytics] client_events insert failed", err);
  }
  return NextResponse.json({ ok: true });
}
