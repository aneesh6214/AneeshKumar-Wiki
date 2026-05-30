"use client";

import Link from "next/link";
import { navigationItems } from "@/lib/navigation";
import type { ArticleNavItem } from "@/lib/json-content";
import { useMobileSidebar } from "./MobileSidebarProvider";

interface SidebarProps {
  currentPath: string;
  articleLinks: ArticleNavItem[];
}

export default function Sidebar({ currentPath, articleLinks }: SidebarProps) {
  const { closeSidebar, isSidebarOpen } = useMobileSidebar();

  return (
    <>
      {isSidebarOpen && (
        <button
          type="button"
          className="fixed inset-x-0 bottom-0 top-14 z-40 cursor-default bg-black/15 md:hidden"
          aria-label="Close navigation"
          onClick={closeSidebar}
        />
      )}
      <aside
        id="site-sidebar"
        className={`fixed left-0 top-14 z-50 h-[calc(100vh-3.5rem)] w-[min(18rem,calc(100vw-2rem))] flex-col overflow-y-auto border-r border-gray-200 bg-white shadow-[8px_0_24px_rgba(0,0,0,0.12)] md:flex md:w-[15rem] md:min-w-[15rem] md:shadow-none ${
          isSidebarOpen ? "flex" : "hidden"
        }`}
      >
      <div className="px-3 py-3">
        <nav
          className="flex flex-col gap-0"
          aria-label="Pages"
        >
          <div className="mb-1 w-full px-2 text-[11px] font-bold uppercase tracking-[0.08em] text-gray-500">
            Pages
          </div>
          {navigationItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeSidebar}
                  className={`block border-l px-2 py-1.5 text-[17px] leading-snug hover:underline ${
                    isActive
                      ? "border-gray-500 font-medium text-[#202122] hover:no-underline"
                      : "border-gray-200 text-blue-700"
                  }`}
                >
                  {item.sidebarLabel}
                </Link>
              </div>
            );
          })}
        </nav>

        {articleLinks.length > 0 && (
          <nav className="mt-5" aria-label="This article">
            <div className="mb-1 px-2 text-[11px] font-bold uppercase tracking-[0.08em] text-gray-500">
              This Article
            </div>
            <div className="grid">
              {articleLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`block border-l border-gray-200 py-1 leading-snug text-blue-700 hover:underline ${
                    item.depth ? "pl-5 pr-2 text-sm" : "px-2 text-[15px]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
      </aside>
    </>
  );
}
