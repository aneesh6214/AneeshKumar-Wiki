"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Languages, ChevronDown } from "lucide-react";
import SearchNavigation from "./SearchNavigation";

export default function Header() {
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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
    <header className="hidden md:block border-b border-gray-300 bg-white">
      <div className="flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">W</span>
            </div>
            <div>
              <div className="text-lg font-bold text-black" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                WikipediA
              </div>
              <div className="text-xs text-gray-600 -mt-0.5 hidden sm:block" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                The Aneesh Encyclopedia
              </div>
            </div>
          </div>
        </Link>

        <SearchNavigation />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setLanguagesOpen(!languagesOpen)}
            className="hidden lg:flex items-center gap-1 text-blue-600 hover:underline text-sm"
          >
            <Languages className="h-4 w-4" />
            <span className="hidden xl:inline">142 languages</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${languagesOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Languages Dropdown */}
          {languagesOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg z-50">
              <div className="px-4 py-3 text-sm text-gray-600 text-center">
                Sorry! This feature has not been implemented yet.
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
