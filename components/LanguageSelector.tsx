"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Languages } from "lucide-react";

export default function LanguageSelector() {
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLanguagesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setLanguagesOpen((open) => !open)}
        className="flex items-center gap-1 whitespace-nowrap text-sm text-blue-700 hover:underline"
        aria-expanded={languagesOpen}
      >
        <Languages className="h-4 w-4" aria-hidden="true" />
        <span>142 languages</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-150 ease-out ${
            languagesOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {languagesOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 border border-[#a2a9b1] bg-white shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
          <div className="border-b border-[#eaecf0] bg-[#f8f9fa] px-3 py-1.5 text-xs font-medium text-gray-600">
            Languages
          </div>
          <div className="px-4 py-3 text-center text-sm text-gray-600">
            Sorry! This feature has not been implemented yet.
          </div>
        </div>
      )}
    </div>
  );
}
