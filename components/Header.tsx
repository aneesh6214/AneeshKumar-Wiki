"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteContent } from "@/content/site";
import type { WikiBannerPayload } from "@/lib/wiki-banner/types";
import LanguageSelector from "./LanguageSelector";
import { useMobileSidebar } from "./MobileSidebarProvider";
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

function MobileSidebarToggle() {
  const { isSidebarOpen, toggleSidebar } = useMobileSidebar();
  const Icon = isSidebarOpen ? X : Menu;

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className="inline-flex h-9 w-9 items-center justify-center border border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50 active:scale-[0.97] sm:hidden"
      aria-label={isSidebarOpen ? "Close navigation" : "Open navigation"}
      aria-expanded={isSidebarOpen}
      aria-controls="site-sidebar"
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-gray-200 bg-white text-[#202122]">
      <div className="grid h-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3 sm:grid-cols-[minmax(0,1fr)_minmax(16rem,34rem)_minmax(0,1fr)] md:gap-5 md:px-4">
        <div className="flex min-w-0 items-center">
          <MobileSidebarToggle />
          <ArticleOfDaySummary />
        </div>
        <div className="flex min-w-0 justify-center sm:block">
          <SearchNavigation
            className="flex justify-center sm:w-full sm:max-w-md"
            buttonClassName="flex h-9 w-9 items-center justify-center border border-gray-300 bg-white text-sm text-gray-600 hover:border-gray-400 hover:bg-gray-50 active:scale-[0.97] sm:w-full sm:justify-start sm:gap-2 sm:px-3 sm:text-left sm:active:scale-100"
            labelClassName="hidden truncate sm:block"
            shortcutClassName="hidden sm:ml-auto sm:inline-flex sm:shrink-0"
          />
        </div>
        <div className="flex justify-end">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
