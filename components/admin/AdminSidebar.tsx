import Link from "next/link";

const SIDEBAR_WINDOWS = [
  { label: "Last 24 hours", value: "24h" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "Last year", value: "1y" },
  { label: "All time", value: "all" },
] as const;

interface AdminSidebarProps {
  currentWindow?: string;
}

export default function AdminSidebar({ currentWindow = "30d" }: AdminSidebarProps) {
  return (
    <aside className="w-full bg-white border-b md:border-b-0 md:border-r border-gray-200 md:w-1/5 md:min-w-[240px] md:min-h-screen md:sticky md:top-0 md:h-screen md:overflow-y-auto">
      <div className="p-4">
        <div className="mb-4 hidden md:block">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Data views</h2>
          <p className="text-xs text-gray-500 mb-3 italic">6 windows</p>
        </div>

        <nav className="flex flex-wrap gap-x-4 gap-y-1 md:flex-col md:space-y-1 text-sm">
          {SIDEBAR_WINDOWS.map((w) => {
            const isActive = w.value === currentWindow;
            return (
              <div key={w.value} className="py-1">
                <Link
                  href={`/admin?window=${w.value}`}
                  className={`text-blue-600 hover:underline ${
                    isActive ? "font-medium bg-blue-50 px-2 py-1 rounded" : ""
                  }`}
                >
                  {w.label}
                </Link>
              </div>
            );
          })}

          <div className="py-1 md:mt-4 md:pt-4 md:border-t border-gray-200">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
              Admin tools
            </h3>
            <div className="space-y-1">
              <Link
                href="/admin/raw"
                className="block text-blue-600 hover:underline"
              >
                Raw data
              </Link>
              <Link
                href="/admin/live"
                className="block text-blue-600 hover:underline"
              >
                Live view
              </Link>
              <form action="/api/admin/logout" method="post" className="inline">
                <button type="submit" className="text-blue-600 hover:underline">
                  Log out
                </button>
              </form>
            </div>
          </div>

          <div className="py-1 md:mt-4 md:pt-4 md:border-t border-gray-200">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
              Site
            </h3>
            <div className="space-y-1">
              <Link href="/" className="block text-blue-600 hover:underline">
                Return to site
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
