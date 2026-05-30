"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type {
  MediaDeck,
  MediaShowcaseContent,
  MediaVideo,
} from "@/content/media";

interface MediaCatalogueBrowserProps {
  showcase: MediaShowcaseContent;
}

interface ActiveSlide {
  deckIndex: number;
  slideIndex: number;
}

interface SectionHeaderProps {
  countLabel?: string;
  title: string;
}

interface DeckMetaProps {
  deck: MediaDeck;
}

interface SlideButtonProps {
  deck: MediaDeck;
  deckIndex: number;
  isCompact?: boolean;
  onOpen: (deckIndex: number, slideIndex: number) => void;
  slide: string;
  slideIndex: number;
}

interface LeadSlideButtonProps {
  deck: MediaDeck;
  deckIndex: number;
  onOpen: (deckIndex: number, slideIndex: number) => void;
}

interface CatalogueSlideStripProps {
  deck: MediaDeck;
  deckIndex: number;
  onOpen: (deckIndex: number, slideIndex: number) => void;
}

interface VideoThumbnailLinkProps {
  className?: string;
  priority?: boolean;
  video: MediaVideo;
  width?: number;
}

interface VideoListProps {
  videos: MediaVideo[];
}

interface VideoChronologyItem {
  episodeIndex: number;
  video: MediaVideo;
}

interface SlideModalProps {
  activeSlide: ActiveSlide | null;
  decks: MediaDeck[];
  onClose: () => void;
  onMove: (delta: number) => void;
}

const CATALOGUE_STRIP_LIMIT = 5;

function SectionHeader({ countLabel, title }: SectionHeaderProps) {
  return (
    <div className="border-b border-gray-300 pb-2">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="min-w-0 font-serif text-xl font-medium leading-tight text-black">
          {title}
        </h2>
        {countLabel && (
          <span className="text-xs italic text-gray-600">{countLabel}</span>
        )}
      </div>
    </div>
  );
}

function DeckMeta({ deck }: DeckMetaProps) {
  return (
    <div className="ml-auto text-right text-xs italic leading-relaxed text-gray-600">
      <span>{deck.slides.length} slides</span>
    </div>
  );
}

function SlideButton({
  deck,
  deckIndex,
  isCompact = false,
  onOpen,
  slide,
  slideIndex,
}: SlideButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(deckIndex, slideIndex)}
      className={`group block w-full border border-gray-300 bg-gray-50 text-left text-xs text-gray-600 hover:border-gray-500 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#3366cc] ${
        isCompact ? "p-1" : "p-1.5"
      }`}
      aria-label={`Open ${deck.title} slide ${slideIndex + 1}`}
    >
      <span className="relative block aspect-video">
        <Image
          src={slide}
          alt={`${deck.title} slide ${slideIndex + 1}`}
          width={360}
          height={203}
          className="h-full w-full bg-white object-cover"
        />
        <span className="absolute bottom-1 right-1 border border-gray-400 bg-white/95 px-1.5 py-0.5 text-[10px] leading-none text-gray-700 shadow-sm">
          {slideIndex + 1}
        </span>
      </span>
    </button>
  );
}

function LeadSlideButton({ deck, deckIndex, onOpen }: LeadSlideButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(deckIndex, 0)}
      className="group block w-full border border-gray-300 bg-gray-50 p-1.5 text-left text-xs text-gray-600 hover:border-gray-500 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#3366cc]"
      aria-label={`Open ${deck.title} slide 1`}
    >
      <span className="relative block aspect-video">
        <Image
          src={deck.slides[0]}
          alt={`${deck.title} slide 1`}
          width={560}
          height={315}
          className="h-full w-full bg-white object-cover"
        />
        <span className="absolute bottom-1.5 right-1.5 border border-gray-400 bg-white/95 px-2 py-0.5 text-[11px] leading-none text-gray-700 shadow-sm">
          1
        </span>
      </span>
    </button>
  );
}

function catalogueSlideIndexes(deck: MediaDeck): number[] {
  const indexes = deck.slides.map((_, index) => index).slice(1);

  if (indexes.length <= CATALOGUE_STRIP_LIMIT) {
    return indexes;
  }

  return [
    ...indexes.slice(0, CATALOGUE_STRIP_LIMIT - 1),
    deck.slides.length - 1,
  ];
}

function CatalogueSlideStrip({
  deck,
  deckIndex,
  onOpen,
}: CatalogueSlideStripProps) {
  const slideIndexes = catalogueSlideIndexes(deck);

  if (slideIndexes.length === 0) return null;

  return (
    <div
      className="grid justify-start gap-2"
      style={{
        gridTemplateColumns: `repeat(${slideIndexes.length}, minmax(0, 7.25rem))`,
      }}
    >
      {slideIndexes.map((slideIndex) => (
        <SlideButton
          key={deck.slides[slideIndex]}
          deck={deck}
          deckIndex={deckIndex}
          isCompact
          onOpen={onOpen}
          slide={deck.slides[slideIndex]}
          slideIndex={slideIndex}
        />
      ))}
    </div>
  );
}

function episodeLabel(index: number): string {
  return `Episode ${index + 1}`;
}

function VideoThumbnailLink({
  className = "",
  priority = false,
  video,
  width = 480,
}: VideoThumbnailLinkProps) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block self-start border border-gray-300 bg-gray-50 p-1 hover:border-gray-500 hover:bg-white hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#3366cc] ${className}`}
    >
      <Image
        src={video.thumbnail}
        alt={`${video.title} thumbnail`}
        width={width}
        height={Math.round((width * 9) / 16)}
        className="aspect-video w-full bg-white object-cover"
        priority={priority}
      />
      <span className="mt-1 flex items-center justify-center gap-1 text-xs text-blue-700 group-hover:underline">
        Watch on YT
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </a>
  );
}

function VideoChronology({ videos }: VideoListProps) {
  const chronologyItems: VideoChronologyItem[] = videos
    .map((video, episodeIndex) => ({ episodeIndex, video }))
    .reverse();

  return (
    <div>
      {chronologyItems.map(({ episodeIndex, video }, index) => (
        <article
          key={video.id}
          className="grid gap-y-3 sm:grid-cols-[1rem_11rem_minmax(0,1fr)] sm:gap-x-3 sm:gap-y-0"
        >
          <div className="relative hidden justify-center sm:flex">
            {index < chronologyItems.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute bottom-[-0.3125rem] top-[0.3125rem] w-px bg-gray-300"
              />
            )}
            <span
              aria-hidden="true"
              className="z-10 block h-2.5 w-2.5 rounded-full border border-gray-400 bg-white"
            />
          </div>
          <VideoThumbnailLink video={video} width={352} />
          <div className="min-w-0 pb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <h3 className="font-serif text-base font-medium leading-snug text-black">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:underline"
                >
                  {video.title}
                </a>
              </h3>
              <span className="text-xs italic text-gray-600">
                {episodeLabel(episodeIndex)}
              </span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-800">
              {video.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

function SlideModal({ activeSlide, decks, onClose, onMove }: SlideModalProps) {
  const deck = activeSlide ? decks[activeSlide.deckIndex] : null;
  const slide = deck ? deck.slides[activeSlide?.slideIndex ?? 0] : null;

  useEffect(() => {
    if (!activeSlide) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onMove(-1);
      if (event.key === "ArrowRight") onMove(1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeSlide, onClose, onMove]);

  if (!activeSlide || !deck || !slide) return null;

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 p-3"
      role="dialog"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <div className="w-full max-w-6xl border border-gray-500 bg-white shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-gray-300 bg-gray-100 px-3 py-2">
          <div className="min-w-0">
            <h2 className="truncate font-serif text-lg font-medium text-black">
              {deck.title}
            </h2>
            <p className="text-xs italic text-gray-600">
              Slide {activeSlide.slideIndex + 1} of {deck.slides.length}
            </p>
          </div>
          <div className="flex flex-none items-center gap-1">
            <button
              type="button"
              onClick={() => onMove(-1)}
              className="inline-flex h-8 w-8 items-center justify-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:scale-[0.97]"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onMove(1)}
              className="inline-flex h-8 w-8 items-center justify-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:scale-[0.97]"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:scale-[0.97]"
              aria-label="Close slide preview"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="bg-gray-200 p-3">
          <Image
            src={slide}
            alt={`${deck.title} slide ${activeSlide.slideIndex + 1}`}
            width={1280}
            height={720}
            className="aspect-video w-full border border-gray-300 bg-white object-contain"
            priority
          />
        </div>
        <div className="border-t border-gray-300 px-3 py-2 text-sm leading-relaxed text-gray-700">
          {deck.description}
        </div>
      </div>
    </div>
  );
}

export default function MediaCatalogueBrowser({
  showcase,
}: MediaCatalogueBrowserProps) {
  const [activeSlide, setActiveSlide] = useState<ActiveSlide | null>(null);
  const { decks, videos } = showcase;

  const openSlide = useCallback((deckIndex: number, slideIndex: number) => {
    setActiveSlide({ deckIndex, slideIndex });
  }, []);

  const closeSlide = useCallback(() => {
    setActiveSlide(null);
  }, []);

  const moveSlide = useCallback(
    (delta: number) => {
      setActiveSlide((current) => {
        if (!current) return current;

        const deck = decks[current.deckIndex];
        if (!deck) return current;

        const nextSlideIndex =
          (current.slideIndex + delta + deck.slides.length) %
          deck.slides.length;

        return { ...current, slideIndex: nextSlideIndex };
      });
    },
    [decks],
  );

  return (
    <>
      <div className="space-y-7">
        <section className="space-y-4">
          <SectionHeader
            countLabel={`${decks.length} slideshows`}
            title="AI Club Lectures"
          />
          <div className="space-y-4">
            {decks.map((deck, deckIndex) => (
              <article
                key={deck.id}
                className="grid gap-4 xl:grid-cols-[15rem_minmax(0,1fr)]"
              >
                <LeadSlideButton
                  deck={deck}
                  deckIndex={deckIndex}
                  onOpen={openSlide}
                />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <h3 className="font-serif text-lg font-medium leading-snug text-black">
                      {deck.title}
                    </h3>
                    <DeckMeta deck={deck} />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-800">
                    {deck.description}
                  </p>
                  {deck.slides.length > 1 && (
                    <div className="mt-3">
                      <CatalogueSlideStrip
                        deck={deck}
                        deckIndex={deckIndex}
                        onOpen={openSlide}
                      />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SectionHeader
            countLabel={`${videos.length} videos`}
            title="AI Architecture Video Series"
          />
          <VideoChronology videos={videos} />
        </section>
      </div>

      <SlideModal
        activeSlide={activeSlide}
        decks={decks}
        onClose={closeSlide}
        onMove={moveSlide}
      />
    </>
  );
}
