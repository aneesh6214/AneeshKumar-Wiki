"use client";

import { useState } from "react";

const sections = [
  {
    num: "1",
    label: "Traffic",
    href: "#traffic",
    children: [
      { num: "1.1", label: "Pageviews over time", href: "#pageviews-over-time" },
      { num: "1.2", label: "Visitors and sessions", href: "#visitors-and-sessions" },
    ],
  },
  {
    num: "2",
    label: "Content",
    href: "#content",
    children: [
      { num: "2.1", label: "Most-read pages", href: "#most-read-pages" },
      { num: "2.2", label: "Outbound links", href: "#outbound-links" },
      { num: "2.3", label: "Search queries", href: "#search-queries" },
    ],
  },
  {
    num: "3",
    label: "Engagement",
    href: "#engagement",
    children: [
      { num: "3.1", label: "Scroll depth", href: "#scroll-depth" },
      { num: "3.2", label: "Time on page", href: "#time-on-page" },
    ],
  },
  {
    num: "4",
    label: "Acquisition",
    href: "#acquisition",
    children: [
      { num: "4.1", label: "Referrers", href: "#referrers" },
      { num: "4.2", label: "Geography", href: "#geography" },
    ],
  },
  {
    num: "5",
    label: "Client environment",
    href: "#client-environment",
    children: [
      { num: "5.1", label: "Device, browser, OS", href: "#device-browser-os" },
    ],
  },
  {
    num: "6",
    label: "Operational",
    href: "#operational",
    children: [
      { num: "6.1", label: "Performance", href: "#performance" },
      { num: "6.2", label: "JavaScript errors", href: "#javascript-errors" },
    ],
  },
  { num: "7", label: "Methodology", href: "#methodology" },
  { num: "8", label: "See also", href: "#see-also" },
  { num: "9", label: "References", href: "#references" },
];

export default function TableOfContents() {
  const [hidden, setHidden] = useState(false);

  return (
    <div className="inline-block border border-[#a2a9b1] bg-[#f8f9fa] px-4 py-3 my-6 text-sm min-w-[280px]">
      <div className="flex items-center justify-between gap-6 pb-1 border-b border-[#eaecf0] mb-2">
        <span className="font-bold text-[#202122]">Contents</span>
        <button
          onClick={() => setHidden((h) => !h)}
          className="text-blue-600 hover:underline text-xs"
        >
          [{hidden ? "show" : "hide"}]
        </button>
      </div>
      {!hidden && (
        <ol className="space-y-0.5 pl-0 list-none">
          {sections.map((s) => (
            <li key={s.num}>
              <a href={s.href} className="text-blue-600 hover:underline">
                <span className="text-[#202122] mr-1">{s.num}</span>
                {s.label}
              </a>
              {s.children && (
                <ol className="pl-5 list-none">
                  {s.children.map((c) => (
                    <li key={c.num}>
                      <a
                        href={c.href}
                        className="text-blue-600 hover:underline"
                      >
                        <span className="text-[#202122] mr-1">{c.num}</span>
                        {c.label}
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
