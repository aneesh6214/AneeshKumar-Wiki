import Link from "next/link";
import { navigationItems } from "@/lib/navigation";

interface SidebarProps {
  currentPath: string;
}

export default function Sidebar({ currentPath }: SidebarProps) {
  return (
    <aside className="w-full bg-white border-b md:border-b-0 md:border-r border-gray-200 md:w-[13rem] md:min-w-[13rem] md:min-h-screen md:sticky md:top-0 md:h-screen md:overflow-y-auto">
      <div className="p-3">
        <div className="mb-4 hidden md:block">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Navigation</h2>
        </div>

        <nav className="flex flex-wrap gap-x-4 gap-y-1 md:flex-col md:space-y-1 text-sm">
          {navigationItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <div key={item.href} className="py-1">
                <Link
                  href={item.href}
                  className={`text-blue-600 hover:underline font-medium ${
                    isActive ? "bg-blue-50 px-2 py-1 rounded" : ""
                  }`}
                >
                  {item.sidebarLabel}
                </Link>
              </div>
            );
          })}

          <div className="py-1 md:mt-4 md:pt-4 md:border-t border-gray-200">
            <Link
              href="/contact"
              className={`text-blue-600 hover:underline ${
                currentPath === "/contact"
                  ? "font-medium bg-blue-50 px-2 py-1 rounded"
                  : ""
              }`}
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}
