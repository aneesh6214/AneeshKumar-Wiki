import { NextRequest, NextResponse } from "next/server";
import { getLiveVisitors } from "@/lib/admin/queries";
import { verifyAdminSession, ADMIN_COOKIE } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const ok = await verifyAdminSession(req.cookies.get(ADMIN_COOKIE)?.value);
  if (!ok) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const visitors = await getLiveVisitors();
  return NextResponse.json({ visitors });
}
