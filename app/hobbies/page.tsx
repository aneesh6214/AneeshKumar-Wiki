import { Menu, Search, Languages } from "lucide-react"
import Link from "next/link"

export default function HobbiesPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Header */}
      <header className="border-b border-gray-300 bg-white">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <button className="p-1 md:hidden">
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">W</span>
              </div>
              <div>
                <div className="text-lg font-bold text-black">WikipediA</div>
                <div className="text-xs text-gray-600 -mt-1 hidden sm:block">The Free Encyclopedia</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-md mx-4 sm:mx-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search Wikipedia"
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute right-2 top-1.5 h-4 w-4 text-gray-400" />
            </div>
            <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 hidden sm:block">
              Search
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <button className="hidden lg:flex items-center gap-1 text-blue-600 hover:underline">
              <Languages className="h-4 w-4" />
              <span className="hidden xl:inline">142 languages</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar - Personal Navigation */}
        <aside className="w-full md:w-1/5 md:min-w-[240px] bg-white border-r border-gray-200 min-h-screen md:sticky md:top-0 md:h-screen overflow-y-auto">
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-sm font-bold text-gray-900 mb-3">Navigation</h2>
            </div>

            <nav className="space-y-1 text-sm">
              <div className="py-1">
                <Link href="/" className="text-blue-600 hover:underline">
                  Home
                </Link>
              </div>

              <div className="py-1">
                <Link href="/blog" className="text-blue-600 hover:underline font-medium">
                  Blog
                </Link>
              </div>

              <div className="py-1">
                <Link href="/projects" className="text-blue-600 hover:underline font-medium">
                  Projects
                </Link>
              </div>

              <div className="py-1">
                <Link href="/industry-work" className="text-blue-600 hover:underline font-medium">
                  Industry Work
                </Link>
              </div>

              <div className="py-1">
                <Link
                  href="/hobbies"
                  className="text-blue-600 hover:underline font-medium bg-blue-50 px-2 py-1 rounded"
                >
                  Hobbies
                </Link>
              </div>

              <div className="py-1 mt-4 pt-4 border-t border-gray-200">
                <Link href="/contact" className="text-blue-600 hover:underline">
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full md:w-4/5">
          {/* Article Header */}
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl sm:text-3xl font-serif text-black">Aneesh Kumar - Hobbies</h1>
              <div className="flex items-center gap-2 text-sm">
                <button className="flex items-center gap-1 text-blue-600 hover:underline lg:hidden">
                  <Languages className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-4">From Wikipedia, the free encyclopedia</div>

            {/* Simplified Article Tab */}
            <div className="flex items-center gap-6 border-b border-gray-300 mb-6">
              <button className="pb-2 border-b-2 border-black font-medium">Article</button>
            </div>
          </div>

          <div className="px-4 sm:px-6">
            {/* Article Content */}
            <div className="max-w-4xl">
              <div className="mb-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Work in Progress</h2>
                  <p className="text-gray-700 mb-4">
                    This section is currently under development. Information about hobbies and personal interests will
                    be added soon.
                  </p>
                  <p className="text-sm text-gray-600">
                    Check back later for updates on personal interests, recreational activities, and hobbies of{" "}
                    <Link href="/" className="text-blue-600 hover:underline">
                      Aneesh Kumar
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
