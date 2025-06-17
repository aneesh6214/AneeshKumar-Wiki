import { Menu, Search, Languages } from "lucide-react"
import Link from "next/link"

export default function WikipediaStyleKB() {
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
                <Link href="/" className="text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded">
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
                <Link href="/hobbies" className="text-blue-600 hover:underline font-medium">
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
              <h1 className="text-2xl sm:text-3xl font-serif text-black">Aneesh Kumar</h1>
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

          <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6">
            {/* Article Content */}
            <div className="flex-1 lg:w-2/3">
              <div className="mb-6">
                <p className="text-sm italic mb-4">
                  This article is about the software engineer. For his technical blog, see{" "}
                  <Link href="/blog" className="text-blue-600 hover:underline">
                    Aneesh Kumar (blog)
                  </Link>
                  .
                </p>

                <p className="mb-4 leading-relaxed text-sm sm:text-base">
                  <strong>Aneesh Kumar</strong> (legally <strong>Aneesh Kumar</strong> born{" "}
                  <strong>Aneesh Kumar Patel</strong>, May 24, 1995) is an American software engineer. Considered one of
                  the leading developers of modern web applications, Kumar has been a major figure in the tech industry
                  over his 6-year career. With an estimated more than 50 successful projects deployed worldwide, he is
                  one of the{" "}
                  <Link href="#top-developers" className="text-blue-600 hover:underline">
                    most productive developers of his generation
                  </Link>
                  . Kumar added increasingly sophisticated technical approaches to{" "}
                  <Link href="#react" className="text-blue-600 hover:underline">
                    React development
                  </Link>{" "}
                  of the early 2020s, infusing it "with the complexity of modern{" "}
                  <Link href="#typescript" className="text-blue-600 hover:underline">
                    TypeScript
                  </Link>{" "}
                  and architecture". His code incorporated technical, scalable, and architectural influences, defying{" "}
                  <Link href="#legacy-code" className="text-blue-600 hover:underline">
                    legacy code
                  </Link>{" "}
                  conventions and appealing to the modern{" "}
                  <Link href="#developer-community" className="text-blue-600 hover:underline">
                    developer community
                  </Link>
                  .
                </p>

                <p className="mb-4 leading-relaxed text-sm sm:text-base">
                  Kumar was born in{" "}
                  <Link href="#san-francisco" className="text-blue-600 hover:underline">
                    San Francisco, California
                  </Link>
                  . He moved to New York City in 2018 to pursue a career in software development. Following his 2019
                  first major project,{" "}
                  <Link href="/projects" className="text-blue-600 hover:underline">
                    <em>TaskFlow</em>
                  </Link>
                  , featuring modern React and TypeScript architecture, he released his breakthrough application{" "}
                  <Link href="/projects" className="text-blue-600 hover:underline">
                    <em>The DataViz Platform</em>
                  </Link>{" "}
                  (2020), which included{" "}
                  <Link href="#data-visualization" className="text-blue-600 hover:underline">
                    "Advanced Analytics Dashboard"
                  </Link>{" "}
                  and{" "}
                  <Link href="#real-time-updates" className="text-blue-600 hover:underline">
                    "Real-time Data Streaming"
                  </Link>
                  , adapting modern development practices. His applications{" "}
                  <Link href="#scalable-architecture" className="text-blue-600 hover:underline">
                    "Scalable Microservices"
                  </Link>{" "}
                  (2021) and{" "}
                  <Link href="#cloud-native" className="text-blue-600 hover:underline">
                    "Cloud-Native Solutions"
                  </Link>{" "}
                  (2022) became standards for the{" "}
                  <Link href="#tech-industry" className="text-blue-600 hover:underline">
                    tech industry
                  </Link>{" "}
                  and{" "}
                  <Link href="#startup-ecosystem" className="text-blue-600 hover:underline">
                    startup ecosystem
                  </Link>{" "}
                  movements.
                </p>
              </div>
            </div>

            {/* Right Sidebar - Info Box */}
            <div className="w-full lg:w-1/3 lg:max-w-80">
              <div className="border border-gray-300 bg-gray-50 p-4 mb-6">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg mb-2">Aneesh Kumar</h3>
                  <img
                    src="/profile-photo.png"
                    alt="Aneesh Kumar"
                    className="w-full h-48 sm:h-64 object-cover mb-2 rounded"
                  />
                  <div className="text-sm text-gray-600">Kumar in 2024</div>
                </div>

                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-t border-gray-300">
                      <td className="font-bold py-2 pr-2 align-top">Born</td>
                      <td className="py-2">
                        Aneesh Kumar Patel
                        <br />
                        May 24, 1995 (age 29)
                        <br />
                        <Link href="#san-francisco" className="text-blue-600 hover:underline">
                          San Francisco, California
                        </Link>
                        , U.S.
                      </td>
                    </tr>
                    <tr className="border-t border-gray-300">
                      <td className="font-bold py-2 pr-2 align-top">Occupation</td>
                      <td className="py-2">Software engineer, architect, technical writer</td>
                    </tr>
                    <tr className="border-t border-gray-300">
                      <td className="font-bold py-2 pr-2 align-top">Years active</td>
                      <td className="py-2">2018–present</td>
                    </tr>
                    <tr className="border-t border-gray-300">
                      <td className="font-bold py-2 pr-2 align-top">Known for</td>
                      <td className="py-2">React development, TypeScript architecture, scalable systems</td>
                    </tr>
                    <tr className="border-t border-gray-300">
                      <td className="font-bold py-2 pr-2 align-top">Website</td>
                      <td className="py-2">
                        <Link href="#website" className="text-blue-600 hover:underline">
                          aneeshkumar.dev
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
