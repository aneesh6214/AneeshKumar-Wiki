"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { navigationItems } from "@/lib/navigation"
import { SearchResult } from "@/lib/search-json"

export default function SearchNavigation() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [displayItems, setDisplayItems] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Get search results or navigation suggestions
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true)
      try {
        const query = searchValue.trim() ? `?q=${encodeURIComponent(searchValue)}` : ''
        const response = await fetch(`/api/search${query}`)
        if (response.ok) {
          const results = await response.json()
          setDisplayItems(results)
        } else {
          setDisplayItems([])
        }
      } catch (error) {
        console.error('Search error:', error)
        setDisplayItems([])
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(loadContent, searchValue.trim() ? 300 : 0) // Debounce search
    return () => clearTimeout(timeoutId)
  }, [searchValue])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchFocused) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < displayItems.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : displayItems.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && displayItems[selectedIndex]) {
          const item = displayItems[selectedIndex]
          if (item.section) {
            // Scroll to section if it exists
            window.location.href = `${item.url}#${item.section.toLowerCase().replace(/\s+/g, '-')}`
          } else {
            window.location.href = item.url
          }
        }
        break
      case 'Escape':
        setIsSearchFocused(false)
        setSelectedIndex(-1)
        setSearchValue("")
        break
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    setSelectedIndex(-1) // Reset selection when search changes
  }

  return (
    <div className="flex items-center gap-2 flex-1 max-w-md mx-4 sm:mx-8">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Search content, projects, experience..."
          value={searchValue}
          onChange={handleSearchChange}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
        />
        <Search className="absolute right-2 top-1.5 h-4 w-4 text-gray-400" />
        
        {isSearchFocused && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                Searching...
              </div>
            ) : displayItems.length > 0 ? (
              <>
                <div className="p-3 border-b border-gray-100">
                  <div className="text-xs text-gray-500 mb-2">
                    {searchValue.trim() ? `Found ${displayItems.length} result${displayItems.length !== 1 ? 's' : ''}` : 'Quick Navigation'}
                  </div>
                  <div className="space-y-2">
                    {displayItems.map((item, index) => (
                      <div
                        key={item.id}
                        className={`block px-3 py-2 rounded-md transition-colors cursor-pointer ${
                          index === selectedIndex 
                            ? 'bg-blue-50 border border-blue-200' 
                            : 'hover:bg-gray-50 border border-transparent'
                        }`}
                        onClick={() => {
                          if (item.section) {
                            window.location.href = `${item.url}#${item.section.toLowerCase().replace(/\s+/g, '-')}`
                          } else {
                            window.location.href = item.url
                          }
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {item.title}
                              {item.section && (
                                <span className="text-gray-500 font-normal"> • {item.section}</span>
                              )}
                            </div>
                            <div 
                              className="text-xs text-gray-600 mt-1 line-clamp-2"
                              dangerouslySetInnerHTML={{ __html: item.highlightedPreview }}
                            />
                            {searchValue.trim() && item.matchedTerms.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {item.matchedTerms.slice(0, 3).map(term => (
                                  <span key={term} className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                                    {term}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-gray-400 ml-2 flex-shrink-0">
                            {item.url === '/' ? 'Home' : item.url.slice(1)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-3 text-xs text-gray-500 flex items-center justify-between bg-gray-50">
                  <span>↑ ↓ to navigate</span>
                  <span>↵ to select</span>
                  <span>esc to close</span>
                </div>
              </>
            ) : searchValue.trim() ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No results found for "{searchValue}"
              </div>
            ) : null}
          </div>
        )}
      </div>
      <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 hidden sm:block">
        Search
      </button>
    </div>
  )
}