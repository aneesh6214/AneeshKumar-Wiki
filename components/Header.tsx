"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteContent } from "@/content/site";
import type { WikiBannerPayload } from "@/lib/wiki-banner/types";
import LanguageSelector from "./LanguageSelector";
import SearchNavigation from "./SearchNavigation";

function ArticleOfDaySummary() {
  const [banner, setBanner] = useState<WikiBannerPayload | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadBanner() {
      try {
        const response = await fetch("/api/wiki-banner", { cache: "no-store" });
        if (!response.ok) return;

        const nextBanner = (await response.json()) as WikiBannerPayload;
        if (mounted && nextBanner.title && !nextBanner.fallback) {
          setBanner(nextBanner);
        }
      } catch (error) {
        console.error("Failed to load article of the day:", error);
      }
    }

    loadBanner();
    return () => {
      mounted = false;
    };
  }, []);

  const isExternal = banner?.url.startsWith("http") ?? false;
  const decorativeImage = siteContent.articleOfDay.decorativeImage;

  return (
    <div className="hidden min-w-0 items-center gap-2 sm:flex">
      <Link
        href="/"
        className="mr-1 block h-8 w-8 shrink-0 border border-gray-300 hover:border-gray-400"
        aria-label="Home"
      >
        <Image
          src={decorativeImage.src}
          alt=""
          width={decorativeImage.width}
          height={decorativeImage.height}
          className="h-full w-full object-cover grayscale"
        />
      </Link>
      <div className="flex h-8 min-w-0 flex-col justify-center gap-0.5">
        <div className="flex min-w-0 items-center gap-1">
          <span className="shrink-0 font-serif text-base leading-[18px] text-[#202122]">
            {siteContent.articleOfDay.label}:
          </span>
          {banner && (
            <a
              href={banner.url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="min-w-0 truncate text-base leading-[18px] text-blue-700 hover:underline"
              title={banner.title}
            >
              {banner.title}
            </a>
          )}
        </div>
        <div className="flex items-center gap-1 text-[11px] italic leading-[11px] text-gray-500">
          <span>{siteContent.articleOfDay.selectionLabel}</span>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-gray-200 bg-white text-[#202122]">
      <div className="grid h-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 sm:grid-cols-[minmax(0,1fr)_minmax(16rem,34rem)_minmax(0,1fr)] md:gap-5 md:px-4">
        <ArticleOfDaySummary />
        <div className="min-w-0 sm:flex sm:justify-center">
          <SearchNavigation
            className="w-full sm:max-w-md"
            buttonClassName="flex h-9 w-full items-center gap-2 border border-gray-300 bg-white px-3 text-left text-sm text-gray-600 hover:border-gray-400 hover:bg-gray-50"
          />
        </div>
        <div className="flex justify-end">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
