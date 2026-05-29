"use client";

import { Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { siteContent } from "@/content/site";
import { SearchResult } from "@/lib/search-json";
import { sendBeacon } from "@/lib/beacon";
import {
  OPEN_SEARCH_EVENT,
  type OpenSearchEventDetail,
} from "@/lib/search-events";

interface SearchNavigationProps {
  className?: string;
  buttonClassName?: string;
}

interface SearchShortcutHintProps {
  isMac: boolean;
  className?: string;
  keyClassName: string;
  symbolClassName: string;
}

function SearchShortcutHint({
  isMac,
  className = "",
  keyClassName,
  symbolClassName,
}: SearchShortcutHintProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-mono leading-none text-gray-500 ${className}`}
      aria-hidden="true"
    >
      {isMac ? (
        <>
          <span className={symbolClassName}>⌘</span>
          <span className={keyClassName}>K</span>
        </>
      ) : (
        <span className={keyClassName}>Ctrl K</span>
      )}
    </span>
  );
}

export default function SearchNavigation({
  className,
  buttonClassName,
}: SearchNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [displayItems, setDisplayItems] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openSearch = useCallback((initialQuery?: string) => {
    if (initialQuery !== undefined) {
      setSearchValue(initialQuery);
    }
    setIsOpen(true);
    setSelectedIndex(-1);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setSelectedIndex(-1);
    setSearchValue("");
    setDisplayItems([]);
  }, []);

  const addHighlightToDestination = (destination: string, query: string) => {
    const q = query.trim();
    if (q.length < 2 || typeof window === "undefined") {
      return destination;
    }

    const [pathWithQuery, hash] = destination.split("#");
    const url = new URL(pathWithQuery, window.location.origin);
    url.searchParams.set("searchHighlight", q);

    return `${url.pathname}${url.search}${hash ? `#${hash}` : ""}`;
  };

  useEffect(() => {
    const platform = window.navigator.platform.toLowerCase();
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsMac(platform.includes("mac") || /iphone|ipad|ipod/.test(userAgent));
  }, []);

  useEffect(() => {
    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      const isSearchShortcut =
        event.key.toLowerCase() === "k" &&
        (isMac ? event.metaKey : event.ctrlKey) &&
        !event.shiftKey &&
        !event.altKey;

      if (!isSearchShortcut) return;

      event.preventDefault();
      openSearch();
    };

    const handleOpenSearch = (event: Event) => {
      const query = (event as CustomEvent<OpenSearchEventDetail>).detail?.query;
      openSearch(query ?? "");
    };

    window.addEventListener("keydown", handleDocumentKeyDown);
    window.addEventListener(OPEN_SEARCH_EVENT, handleOpenSearch);

    return () => {
      window.removeEventListener("keydown", handleDocumentKeyDown);
      window.removeEventListener(OPEN_SEARCH_EVENT, handleOpenSearch);
    };
  }, [isMac, openSearch]);

  useEffect(() => {
    if (!isOpen) return;

    const loadContent = async () => {
      setIsLoading(true);
      try {
        const query = searchValue.trim()
          ? `?q=${encodeURIComponent(searchValue)}`
          : "";
        const response = await fetch(`/api/search${query}`);
        if (response.ok) {
          const results = await response.json();
          setDisplayItems(results);
        } else {
          setDisplayItems([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setDisplayItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(loadContent, searchValue.trim() ? 250 : 0);
    return () => clearTimeout(timeoutId);
  }, [isOpen, searchValue]);

  useEffect(() => {
    if (isOpen) {
      const frame = window.requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
      return () => window.cancelAnimationFrame(frame);
    }
  }, [isOpen]);

  const resultDestination = (item: SearchResult) =>
    item.sectionId ? `${item.url}#${item.sectionId}` : item.url;

  const commitSearch = (query: string, destination: string) => {
    const q = query.trim();
    if (q.length >= 2) {
      sendBeacon({
        type: "search",
        path: window.location.pathname,
        payload: { query: q, destination },
      });
    }
    window.location.href = destination;
  };

  const commitResult = (item: SearchResult) => {
    commitSearch(
      searchValue,
      addHighlightToDestination(resultDestination(item), searchValue),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const item =
      selectedIndex >= 0 && displayItems[selectedIndex]
        ? displayItems[selectedIndex]
        : displayItems[0];

    if (item) {
      commitResult(item);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        if (displayItems.length === 0) return;
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < displayItems.length - 1 ? prev + 1 : 0,
        );
        break;
      case "ArrowUp":
        if (displayItems.length === 0) return;
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : displayItems.length - 1,
        );
        break;
      case "Enter":
        e.preventDefault();
        if (displayItems.length > 0) {
          const item =
            selectedIndex >= 0 ? displayItems[selectedIndex] : displayItems[0];
          commitResult(item);
        }
        break;
      case "Escape":
        closeSearch();
        break;
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setSelectedIndex(-1); // Reset selection when search changes
  };

  const searchOverlay =
    isOpen && typeof document !== "undefined" ? (
      <div
        className="fixed inset-0 z-[9999] flex items-start justify-center bg-white/80 px-4 pt-[18vh] backdrop-blur-[1px]"
        role="dialog"
        aria-modal="true"
        aria-label="Search this site"
        onMouseDown={closeSearch}
      >
        <div
          className="w-full max-w-2xl border border-gray-300 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-gray-300 bg-gray-50 px-3 py-2">
            <div className="font-serif text-base font-medium text-[#202122]">
              {siteContent.search.dialogTitle}
            </div>
            <button
              type="button"
              onClick={closeSearch}
              className="flex h-7 w-7 items-center justify-center border border-transparent text-gray-600 hover:border-gray-300 hover:bg-white"
              aria-label="Close search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <form onSubmit={handleSubmit} role="search">
            <div className="border-b border-gray-300">
              <div className="relative min-w-0 flex-1">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                  aria-hidden="true"
                />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={siteContent.search.triggerLabel}
                  value={searchValue}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  className="h-11 w-full bg-white py-2 pl-9 pr-20 text-base text-[#202122] outline-none"
                />
                <SearchShortcutHint
                  isMac={isMac}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                  keyClassName="text-xs"
                  symbolClassName="text-lg"
                />
              </div>
            </div>
          </form>

          <div className="max-h-[50vh] overflow-y-auto">
            {isLoading ? (
              <div className="p-5 text-center text-sm italic text-gray-500">
                Searching...
              </div>
            ) : displayItems.length > 0 ? (
              <>
                <div className="border-b border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
                  {searchValue.trim()
                    ? `Found ${displayItems.length} result${displayItems.length !== 1 ? "s" : ""}`
                    : "Quick navigation"}
                </div>
                <div>
                  {displayItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`cursor-pointer border-b border-[#eaecf0] px-3 py-3 last:border-b-0 ${
                        index === selectedIndex
                          ? "border-l-2 border-l-[#202122] bg-gray-50 pl-2.5"
                          : "border-l-2 border-l-transparent hover:bg-gray-50"
                      }`}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        commitResult(item);
                      }}
                    >
                      <div className="min-w-0">
                        <div className="flex min-w-0 items-baseline gap-2">
                          <div className="truncate font-serif text-base font-medium leading-5 text-[#202122]">
                            {item.title}
                          </div>
                          {item.section && (
                            <div className="min-w-0 truncate text-xs italic text-gray-500">
                              {item.section}
                            </div>
                          )}
                        </div>
                        <div
                          className="mt-1 line-clamp-2 text-sm leading-5 text-gray-600"
                          dangerouslySetInnerHTML={{
                            __html: item.highlightedPreview,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : searchValue.trim() ? (
              <div className="p-5 text-center text-sm italic text-gray-500">
                No results found for &ldquo;{searchValue}&rdquo;
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-between border-t border-gray-300 bg-gray-50 px-3 py-2 text-xs text-gray-500">
            <span>Up/down to navigate</span>
            <span>Enter to open</span>
            <span>Esc to close</span>
          </div>
        </div>
      </div>
    ) : null;

  const triggerClassName =
    buttonClassName ??
    "flex h-9 w-full items-center gap-2 border border-gray-300 bg-white px-2.5 text-left text-sm text-gray-600 hover:border-gray-400 hover:bg-gray-50";

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => openSearch()}
        className={triggerClassName}
        aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
      >
        <Search
          className="h-4 w-4 shrink-0 text-gray-500"
          aria-hidden="true"
        />
        <span className="truncate">{siteContent.search.triggerLabel}</span>
        <SearchShortcutHint
          isMac={isMac}
          className="ml-auto shrink-0"
          keyClassName="text-[11px]"
          symbolClassName="text-sm"
        />
      </button>
      {searchOverlay ? createPortal(searchOverlay, document.body) : null}
    </div>
  );
}
