import Link from "next/link"
import { navigationItems } from "@/lib/navigation"

interface SidebarProps {
  currentPath: string
}

export default function Sidebar({ currentPath }: SidebarProps) {
  return (
    <aside className="w-full md:w-1/5 md:min-w-[240px] bg-white border-r border-gray-200 min-h-screen md:sticky md:top-0 md:h-screen overflow-y-auto">
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Navigation</h2>
        </div>

        <nav className="space-y-1 text-sm">
          {navigationItems.slice(0, -1).map((item) => {
            const isActive = currentPath === item.href
            return (
              <div key={item.href} className="py-1">
                <Link 
                  href={item.href} 
                  className={`text-blue-600 hover:underline font-medium ${
                    isActive ? 'bg-blue-50 px-2 py-1 rounded' : ''
                  }`}
                >
                  {item.sidebarLabel}
                </Link>
              </div>
            )
          })}
          
          <div className="py-1 mt-4 pt-4 border-t border-gray-200">
            <Link 
              href="/contact" 
              className={`text-blue-600 hover:underline ${
                currentPath === '/contact' ? 'font-medium bg-blue-50 px-2 py-1 rounded' : ''
              }`}
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  )
}