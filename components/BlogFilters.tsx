"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { BlogTopic } from "@/lib/blog-content";

interface BlogFiltersProps {
  onFiltersChange: (filters: BlogFilterState) => void;
  availableTopics: BlogTopic[];
  dateRange: { min: Date; max: Date };
}

export interface BlogFilterState {
  searchQuery: string;
  selectedTopics: BlogTopic[];
  dateFrom: string;
  dateTo: string;
}

export const initialFilterState: BlogFilterState = {
  searchQuery: "",
  selectedTopics: [],
  dateFrom: "",
  dateTo: "",
};

// Dual Range Slider Component
interface DualRangeSliderProps {
  min: number;
  max: number;
  minVal: number;
  maxVal: number;
  onChange: (min: number, max: number) => void;
  formatLabel: (val: number) => string;
}

function DualRangeSlider({
  min,
  max,
  minVal,
  maxVal,
  onChange,
  formatLabel,
}: DualRangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);

  const getPercent = useCallback(
    (value: number) => ((value - min) / (max - min)) * 100,
    [min, max]
  );

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return Math.round(min + percent * (max - min));
    },
    [min, max]
  );

  const handleMouseDown = (thumb: "min" | "max") => (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(thumb);
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const value = getValueFromPosition(e.clientX);
      if (dragging === "min") {
        onChange(Math.min(value, maxVal - 86400000), maxVal); // At least 1 day apart
      } else {
        onChange(minVal, Math.max(value, minVal + 86400000));
      }
    };

    const handleMouseUp = () => {
      setDragging(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, minVal, maxVal, getValueFromPosition, onChange]);

  const minPercent = getPercent(minVal);
  const maxPercent = getPercent(maxVal);

  return (
    <div className="pt-2 pb-1">
      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-600 mb-3">
        <span>{formatLabel(minVal)}</span>
        <span>{formatLabel(maxVal)}</span>
      </div>

      {/* Slider Track */}
      <div
        ref={trackRef}
        className="relative h-1.5 bg-gray-200 rounded-full cursor-pointer"
      >
        {/* Active Range */}
        <div
          className="absolute h-full bg-blue-500 rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min Thumb */}
        <div
          className={`absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -translate-x-1/2 -translate-y-1/4 cursor-grab shadow-sm hover:shadow-md transition-shadow ${
            dragging === "min" ? "cursor-grabbing shadow-md" : ""
          }`}
          style={{ left: `${minPercent}%` }}
          onMouseDown={handleMouseDown("min")}
        />

        {/* Max Thumb */}
        <div
          className={`absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -translate-x-1/2 -translate-y-1/4 cursor-grab shadow-sm hover:shadow-md transition-shadow ${
            dragging === "max" ? "cursor-grabbing shadow-md" : ""
          }`}
          style={{ left: `${maxPercent}%` }}
          onMouseDown={handleMouseDown("max")}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
        <span>{formatLabel(min)}</span>
        <span>{formatLabel(max)}</span>
      </div>
    </div>
  );
}

export default function BlogFilters({
  onFiltersChange,
  availableTopics,
  dateRange,
}: BlogFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<BlogFilterState>(initialFilterState);

  // Date slider state (as timestamps)
  const minTimestamp = dateRange.min.getTime();
  const maxTimestamp = dateRange.max.getTime();
  const [sliderMin, setSliderMin] = useState(minTimestamp);
  const [sliderMax, setSliderMax] = useState(maxTimestamp);
  const [dateFilterActive, setDateFilterActive] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateFilters = (newFilters: Partial<BlogFilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const handleSliderChange = (newMin: number, newMax: number) => {
    setSliderMin(newMin);
    setSliderMax(newMax);
    setDateFilterActive(true);

    // Convert to ISO date strings for filtering
    const fromDate = new Date(newMin).toISOString().split("T")[0];
    const toDate = new Date(newMax).toISOString().split("T")[0];
    updateFilters({ dateFrom: fromDate, dateTo: toDate });
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const toggleTopic = (topic: BlogTopic) => {
    const newTopics = filters.selectedTopics.includes(topic)
      ? filters.selectedTopics.filter((t) => t !== topic)
      : [...filters.selectedTopics, topic];
    updateFilters({ selectedTopics: newTopics });
  };

  const clearFilters = () => {
    setFilters(initialFilterState);
    setSliderMin(minTimestamp);
    setSliderMax(maxTimestamp);
    setDateFilterActive(false);
    onFiltersChange(initialFilterState);
  };

  const hasActiveFilters =
    filters.searchQuery ||
    filters.selectedTopics.length > 0 ||
    dateFilterActive;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Filter Button - Wikipedia style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 text-sm px-2 py-1 border-b-2 transition-colors ${
          isOpen || hasActiveFilters
            ? "text-blue-600 border-blue-600"
            : "text-gray-600 border-transparent hover:text-gray-900"
        }`}
      >
        Filter
        {hasActiveFilters && (
          <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
            {(filters.selectedTopics.length > 0 ? 1 : 0) +
              (filters.searchQuery ? 1 : 0) +
              (dateFilterActive ? 1 : 0)}
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-300 rounded shadow-lg z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
            <span className="font-semibold text-sm text-gray-900">
              Filter Posts
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-blue-600 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="p-4 space-y-4">
            {/* Search by Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Search by title
              </label>
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => updateFilters({ searchQuery: e.target.value })}
                placeholder="Enter keywords..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Date Range Slider */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Date range
              </label>
              <DualRangeSlider
                min={minTimestamp}
                max={maxTimestamp}
                minVal={sliderMin}
                maxVal={sliderMax}
                onChange={handleSliderChange}
                formatLabel={formatDate}
              />
            </div>

            {/* Topics */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Topics
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableTopics.map((topic) => {
                  const isSelected = filters.selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      onClick={() => toggleTopic(topic)}
                      className={`px-2 py-1 text-xs rounded border transition-colors ${
                        isSelected
                          ? "bg-blue-100 border-blue-300 text-blue-700"
                          : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {topic}
                      {isSelected && <span className="ml-1">×</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-3 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
