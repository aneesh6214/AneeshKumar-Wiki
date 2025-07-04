"use client"

import { Menu, Languages } from "lucide-react"
import SearchNavigation from "./SearchNavigation"

export default function Header() {
  return (
    <header className="border-b border-gray-300 bg-white">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <button className="p-1 md:hidden">
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">W</span>
            </div>
            <div>
              <div className="text-lg font-bold text-black">WikipediA</div>
              <div className="text-xs text-gray-600 -mt-1 hidden sm:block">The Free Encyclopedia</div>
            </div>
          </div>
        </div>

        <SearchNavigation />

        <div className="flex items-center gap-2 text-sm">
          <button className="hidden lg:flex items-center gap-1 text-blue-600 hover:underline">
            <Languages className="h-4 w-4" />
            <span className="hidden xl:inline">142 languages</span>
          </button>
        </div>
      </div>
    </header>
  )
}