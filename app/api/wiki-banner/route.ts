import { NextResponse } from "next/server";
import { siteContent } from "@/content/site";
import { getDailyWikiBanner } from "@/lib/wiki-banner/queries";
import type { WikiBannerPayload } from "@/lib/wiki-banner/types";

export const dynamic = "force-dynamic";

function fallbackBanner(): WikiBannerPayload {
  return {
    title: siteContent.articleOfDay.fallbackTitle,
    extract: siteContent.articleOfDay.fallbackExtract,
    url: "/",
    sourceLabel: siteContent.source.name,
    fallback: true,
  };
}

export async function GET() {
  try {
    const banner = await getDailyWikiBanner();
    return NextResponse.json(banner ?? fallbackBanner(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Wiki banner error:", error);
    return NextResponse.json(fallbackBanner(), {
      headers: { "Cache-Control": "no-store" },
    });
  }
}
