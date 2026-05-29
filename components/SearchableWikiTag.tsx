"use client";

import {
  OPEN_SEARCH_EVENT,
  type OpenSearchEventDetail,
} from "@/lib/search-events";

interface SearchableWikiTagProps {
  label: string;
}

export default function SearchableWikiTag({ label }: SearchableWikiTagProps) {
  const openTagSearch = () => {
    window.dispatchEvent(
      new CustomEvent<OpenSearchEventDetail>(OPEN_SEARCH_EVENT, {
        detail: { query: label },
      }),
    );
  };

  return (
    <button
      type="button"
      onClick={openTagSearch}
      className="inline-flex min-h-6 cursor-pointer items-center border border-gray-300 bg-white px-2 py-0.5 text-xs text-gray-700 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#3366cc]"
      aria-label={`Search for ${label}`}
    >
      {label}
    </button>
  );
}
