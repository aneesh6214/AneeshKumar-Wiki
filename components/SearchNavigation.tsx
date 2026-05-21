"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { siteContent } from "@/content/site";
import { SearchResult } from "@/lib/search-json";
import { sendBeacon } from "@/lib/beacon";

export default function SearchNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [displayItems, setDisplayItems] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    item.section
      ? `${item.url}#${item.section.toLowerCase().replace(/\s+/g, "-")}`
      : item.url;

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
    commitSearch(searchValue, resultDestination(item));
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

  const openSearch = () => {
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const closeSearch = () => {
    setIsOpen(false);
    setSelectedIndex(-1);
    setSearchValue("");
    setDisplayItems([]);
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
          className="w-full max-w-2xl border border-[#a2a9b1] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-[#a2a9b1] bg-[#f8f9fa] px-3 py-2">
            <div className="font-serif text-base font-medium text-[#202122]">
              {siteContent.search.dialogTitle}
            </div>
            <button
              type="button"
              onClick={closeSearch}
              className="flex h-7 w-7 items-center justify-center border border-transparent text-gray-600 hover:border-[#a2a9b1] hover:bg-white"
              aria-label="Close search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <form onSubmit={handleSubmit} role="search">
            <div className="flex items-stretch border-b border-[#a2a9b1]">
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
                  className="h-11 w-full bg-white py-2 pl-9 pr-3 text-base text-[#202122] outline-none"
                />
              </div>
              <button
                type="submit"
                className="border-l border-[#2a4b8d] bg-[#3366cc] px-4 text-sm font-medium text-white hover:bg-[#254fa3]"
              >
                Search
              </button>
            </div>
          </form>

          <div className="max-h-[50vh] overflow-y-auto">
            {isLoading ? (
              <div className="p-5 text-center text-sm italic text-gray-500">
                Searching...
              </div>
            ) : displayItems.length > 0 ? (
              <>
                <div className="border-b border-[#eaecf0] bg-[#f8f9fa] px-3 py-2 text-xs font-medium text-gray-600">
                  {searchValue.trim()
                    ? `Found ${displayItems.length} result${displayItems.length !== 1 ? "s" : ""}`
                    : "Quick navigation"}
                </div>
                <div>
                  {displayItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`cursor-pointer border-b border-[#eaecf0] px-3 py-2 last:border-b-0 ${
                        index === selectedIndex
                          ? "border-l-2 border-l-[#202122] bg-[#f8f9fa] pl-2.5"
                          : "border-l-2 border-l-transparent hover:bg-[#f8f9fa]"
                      }`}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        commitResult(item);
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium text-[#202122]">
                            {item.title}
                            {item.section && (
                              <span className="font-normal text-gray-500">
                                {" "}
                                • {item.section}
                              </span>
                            )}
                          </div>
                          <div
                            className="mt-1 line-clamp-2 text-xs leading-5 text-gray-600"
                            dangerouslySetInnerHTML={{
                              __html: item.highlightedPreview,
                            }}
                          />
                          {searchValue.trim() &&
                            item.matchedTerms.length > 0 && (
                              <div className="mt-1 flex flex-wrap gap-1">
                                {item.matchedTerms.slice(0, 3).map((term) => (
                                  <span
                                    key={term}
                                    className="border border-[#a2a9b1] bg-[#f8f9fa] px-1.5 py-0.5 text-xs text-gray-700"
                                  >
                                    {term}
                                  </span>
                                ))}
                              </div>
                            )}
                        </div>
                        <div className="shrink-0 font-mono text-[11px] text-gray-500">
                          {item.url === "/" ? "Home" : item.url.slice(1)}
                        </div>
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

          <div className="flex items-center justify-between border-t border-[#a2a9b1] bg-[#f8f9fa] px-3 py-2 text-xs text-gray-500">
            <span>Up/down to navigate</span>
            <span>Enter to open</span>
            <span>Esc to close</span>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className="flex h-9 w-full items-center gap-2 border border-[#a2a9b1] bg-white px-2.5 text-left text-sm text-gray-600 hover:border-[#72777d] hover:bg-[#f8f9fa]"
      >
        <Search
          className="h-4 w-4 shrink-0 text-gray-500"
          aria-hidden="true"
        />
        <span className="truncate">{siteContent.search.triggerLabel}</span>
      </button>
      {searchOverlay ? createPortal(searchOverlay, document.body) : null}
    </>
  );
}
