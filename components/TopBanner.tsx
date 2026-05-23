"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Info } from "lucide-react";
import { siteContent } from "@/content/site";
import type { WikiBannerPayload } from "@/lib/wiki-banner/types";

const MARQUEE_PIXELS_PER_SECOND = 34;
const MIN_MARQUEE_DURATION_SECONDS = 42;

const bannerItems = Array.from(
  { length: siteContent.banner.repeatCount },
  (_, index) => index,
);

function BannerTrack({ banner }: { banner: WikiBannerPayload }) {
  return (
    <div className="flex shrink-0 items-center">
      {bannerItems.map((item) => (
        <span key={item} className="flex items-center whitespace-nowrap">
          <span>{banner.extract}</span>
          <span className="px-3 text-gray-500">
            {siteContent.banner.separator}
          </span>
        </span>
      ))}
    </div>
  );
}

function ArticleInfoPopup() {
  return (
    <div className="group flex h-full shrink-0 items-center px-3">
      <button
        type="button"
        className="grid h-5 w-5 place-items-center text-gray-500 hover:text-gray-700"
        aria-label="About article of the day"
        aria-describedby="article-of-day-info"
      >
        <Info className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <div
        id="article-of-day-info"
        className="invisible fixed left-2 top-10 z-[60] w-72 border border-[#a2a9b1] bg-white text-[#202122] opacity-0 shadow-[0_8px_18px_rgba(0,0,0,0.12)] transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
        role="tooltip"
      >
        <div className="border-b border-[#eaecf0] bg-[#f8f9fa] px-3 py-1.5 text-xs font-medium text-gray-600">
          Article of the Day
        </div>
        <div className="px-4 py-3 text-sm leading-5 text-gray-600">
          Every day an article is randomly selected from a list hand-curated by
          Aneesh Kumar. He typically selects articles he finds interesting.
        </div>
      </div>
    </div>
  );
}

export default function TopBanner() {
  const [banner, setBanner] = useState<WikiBannerPayload | null>(null);
  const [marqueeDuration, setMarqueeDuration] = useState(
    MIN_MARQUEE_DURATION_SECONDS,
  );
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    async function loadBanner() {
      try {
        const response = await fetch("/api/wiki-banner", { cache: "no-store" });
        if (!response.ok) return;

        const nextBanner = (await response.json()) as WikiBannerPayload;
        if (mounted && nextBanner.extract && nextBanner.title) {
          setBanner(nextBanner);
        }
      } catch (error) {
        console.error("Failed to load wiki banner:", error);
      }
    }

    loadBanner();
    return () => {
      mounted = false;
    };
  }, []);

  const isExternal = banner?.url.startsWith("http") ?? false;

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee || !banner) return;

    function updateDuration() {
      const track = marquee?.firstElementChild;
      if (!(track instanceof HTMLElement)) return;

      const trackWidth = track.getBoundingClientRect().width;
      if (trackWidth <= 0) return;

      setMarqueeDuration(
        Math.max(
          MIN_MARQUEE_DURATION_SECONDS,
          trackWidth / MARQUEE_PIXELS_PER_SECOND,
        ),
      );
    }

    updateDuration();

    const resizeObserver = new ResizeObserver(updateDuration);
    resizeObserver.observe(marquee);
    if (marquee.firstElementChild) {
      resizeObserver.observe(marquee.firstElementChild);
    }
    window.addEventListener("resize", updateDuration);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDuration);
    };
  }, [banner]);

  return (
    <div
      className="kumarpedia-banner fixed inset-x-0 top-0 z-50 flex h-8 overflow-hidden border-b border-[#a2a9b1] bg-[#f8f9fa] font-serif text-[13px] leading-8 text-[#202122]"
      aria-label={
        banner
          ? `${banner.sourceLabel} banner article: ${banner.title}`
          : "Loading banner article"
      }
    >
      {banner && (
        <>
          <ArticleInfoPopup />
          <a
            href={banner.url}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="shrink-0 pr-3 text-blue-700 hover:underline"
            title={banner.title}
          >
            {banner.title}
          </a>
          <span className="sr-only">{banner.extract}</span>
          <div className="min-w-0 flex-1 overflow-hidden" aria-hidden="true">
            <div
              ref={marqueeRef}
              className="kumarpedia-marquee flex w-max"
              style={
                {
                  "--kumarpedia-marquee-duration": `${marqueeDuration}s`,
                } as CSSProperties
              }
            >
              <BannerTrack banner={banner} />
              <BannerTrack banner={banner} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
