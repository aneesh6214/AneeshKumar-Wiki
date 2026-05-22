import Link from "next/link";
import { adminContent, type AdminTabKey } from "@/content/admin";
import { adminLinkClass } from "./AdminPrimitives";

interface AdminSidebarProps {
  currentWindow?: string;
  activePath?: AdminTabKey;
}

export default function AdminSidebar({
  currentWindow = "30d",
  activePath = "dashboard",
}: AdminSidebarProps) {
  return (
    <aside className="w-full bg-white border-b md:border-b-0 md:border-r border-gray-200 md:w-1/5 md:min-w-[240px] md:min-h-screen md:sticky md:top-0 md:h-screen md:overflow-y-auto">
      <div className="p-4">
        <div className="mb-4 hidden md:block">
          <h2 className="text-sm font-bold text-gray-900 mb-1">
            {adminContent.sidebar.windowsHeading}
          </h2>
          <p className="text-xs text-gray-500 mb-3 italic">
            {adminContent.sidebar.windowsSummary}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-4 gap-y-1 md:flex-col md:space-y-1 text-sm">
          {adminContent.sidebar.windows.map((w) => {
            const isActive = w.value === currentWindow;
            return (
              <div key={w.value} className="py-1">
                <Link
                  href={`/admin?window=${w.value}`}
                  className={`${adminLinkClass} ${
                    isActive
                      ? "border-l-2 border-[#202122] bg-[#f8f9fa] px-2 py-1 font-medium text-[#202122] hover:no-underline"
                      : ""
                  }`}
                >
                  {w.label}
                </Link>
              </div>
            );
          })}

          <div className="py-1 md:mt-4 md:pt-4 md:border-t border-gray-200">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
              {adminContent.sidebar.toolsHeading}
            </h3>
            <div className="space-y-1">
              {adminContent.sidebar.tools.map((link) => {
                const isActive =
                  (activePath === "ama" && link.href === "/admin/ama") ||
                  (activePath === "raw" && link.href === "/admin/raw") ||
                  (activePath === "live" && link.href === "/admin/live");

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block ${adminLinkClass} ${
                      isActive ? "font-medium text-[#202122] hover:no-underline" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <form action="/api/admin/logout" method="post" className="inline">
                <button type="submit" className={adminLinkClass}>
                  Log out
                </button>
              </form>
            </div>
          </div>

          <div className="py-1 md:mt-4 md:pt-4 md:border-t border-gray-200">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
              {adminContent.sidebar.siteHeading}
            </h3>
            <div className="space-y-1">
              {adminContent.sidebar.siteLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block ${adminLinkClass}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
