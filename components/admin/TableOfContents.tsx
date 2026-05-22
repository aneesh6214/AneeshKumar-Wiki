"use client";

import { useState } from "react";
import { adminContent } from "@/content/admin";
import { adminLinkClass } from "./AdminPrimitives";

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
          {adminContent.tableOfContents.map((s) => (
            <li key={s.num}>
              <a href={s.href} className={adminLinkClass}>
                <span className="text-[#202122] mr-1">{s.num}</span>
                {s.label}
              </a>
              {s.children && (
                <ol className="pl-5 list-none">
                  {s.children.map((c) => (
                    <li key={c.num}>
                      <a
                        href={c.href}
                        className={adminLinkClass}
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
