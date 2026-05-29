import Link from "next/link";
import { navigationItems } from "@/lib/navigation";
import { ArticleNavItem } from "@/lib/json-content";

interface SidebarProps {
  currentPath: string;
  articleLinks: ArticleNavItem[];
}

export default function Sidebar({ currentPath, articleLinks }: SidebarProps) {
  return (
    <aside className="w-full border-b border-gray-200 bg-white md:fixed md:left-0 md:top-14 md:flex md:h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-3.5rem)] md:w-[15rem] md:min-w-[15rem] md:flex-col md:overflow-y-auto md:border-b-0 md:border-r">
      <div className="px-3 py-3">
        <nav
          className="flex flex-wrap gap-x-1 gap-y-1 md:flex-col md:gap-0"
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
  );
}
