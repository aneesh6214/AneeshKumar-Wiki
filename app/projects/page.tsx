import { Menu, Search, Languages } from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
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
                <Link
                  href="/projects"
                  className="text-blue-600 hover:underline font-medium bg-blue-50 px-2 py-1 rounded"
                >
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
              <h1 className="text-2xl sm:text-3xl font-serif text-black">Aneesh Kumar - Projects</h1>
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
                <p className="text-sm italic mb-4">
                  This article covers the notable software projects developed by{" "}
                  <Link href="/" className="text-blue-600 hover:underline">
                    Aneesh Kumar
                  </Link>
                  . For his professional work experience, see{" "}
                  <Link href="/industry-work" className="text-blue-600 hover:underline">
                    Aneesh Kumar (Industry Work)
                  </Link>
                  .
                </p>

                <p className="mb-6 leading-relaxed text-sm sm:text-base">
                  <strong>Aneesh Kumar</strong> has developed several notable software projects spanning{" "}
                  <Link href="#machine-learning" className="text-blue-600 hover:underline">
                    machine learning
                  </Link>
                  ,{" "}
                  <Link href="#web-development" className="text-blue-600 hover:underline">
                    web development
                  </Link>
                  , and{" "}
                  <Link href="#automation" className="text-blue-600 hover:underline">
                    browser automation
                  </Link>
                  . His projects demonstrate expertise in modern{" "}
                  <Link href="#ai-technologies" className="text-blue-600 hover:underline">
                    AI technologies
                  </Link>
                  , neuroscience applications, and developer tooling.
                </p>

                {/* Twitter LLM Project */}
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                    Twitter LLM Project
                  </h2>
                  <p className="mb-4 leading-relaxed text-sm sm:text-base">
                    The <strong>Twitter LLM Project</strong> is a{" "}
                    <Link href="#large-language-model" className="text-blue-600 hover:underline">
                      large language model
                    </Link>{" "}
                    application designed to analyze and generate Twitter-style content. Developed in 2023-2024, the
                    project leverages{" "}
                    <Link href="#natural-language-processing" className="text-blue-600 hover:underline">
                      natural language processing
                    </Link>{" "}
                    techniques to understand social media patterns and generate contextually relevant responses.
                  </p>
                  <p className="mb-4 leading-relaxed text-sm sm:text-base">
                    The system incorporates{" "}
                    <Link href="#transformer-architecture" className="text-blue-600 hover:underline">
                      transformer architecture
                    </Link>{" "}
                    and was trained on a curated dataset of social media interactions. Key features include sentiment
                    analysis, trend detection, and automated content generation while maintaining appropriate tone and
                    context for social media platforms.
                  </p>
                </section>

                {/* One-Shot Memory Formation */}
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                    One-Shot Memory Formation with BTSP
                  </h2>
                  <p className="mb-4 leading-relaxed text-sm sm:text-base">
                    <strong>One-Shot Memory Formation with BTSP</strong> (Behavioral Tagging and Synaptic Plasticity) is
                    a computational neuroscience project that models{" "}
                    <Link href="#memory-formation" className="text-blue-600 hover:underline">
                      memory formation
                    </Link>{" "}
                    mechanisms in the brain. The project implements the{" "}
                    <Link href="#btsp-theory" className="text-blue-600 hover:underline">
                      BTSP theory
                    </Link>
                    , which explains how memories can be formed from a single learning experience.
                  </p>
                  <p className="mb-4 leading-relaxed text-sm sm:text-base">
                    The implementation uses{" "}
                    <Link href="#python" className="text-blue-600 hover:underline">
                      Python
                    </Link>{" "}
                    and{" "}
                    <Link href="#neural-network-simulation" className="text-blue-600 hover:underline">
                      neural network simulation
                    </Link>{" "}
                    libraries to model synaptic plasticity and behavioral tagging processes. The project contributes to
                    understanding how the brain can rapidly encode new information and has applications in{" "}
                    <Link href="#artificial-intelligence" className="text-blue-600 hover:underline">
                      artificial intelligence
                    </Link>{" "}
                    and{" "}
                    <Link href="#cognitive-computing" className="text-blue-600 hover:underline">
                      cognitive computing
                    </Link>
                    .
                  </p>
                </section>

                {/* Browser Automation Tools */}
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                    Browser Automation Tools
                  </h2>
                  <p className="mb-4 leading-relaxed text-sm sm:text-base">
                    The <strong>Browser Automation Tools</strong> project is a comprehensive suite of utilities designed
                    to automate web browser interactions for testing, data collection, and workflow optimization. Built
                    using{" "}
                    <Link href="#selenium" className="text-blue-600 hover:underline">
                      Selenium
                    </Link>
                    ,{" "}
                    <Link href="#puppeteer" className="text-blue-600 hover:underline">
                      Puppeteer
                    </Link>
                    , and{" "}
                    <Link href="#playwright" className="text-blue-600 hover:underline">
                      Playwright
                    </Link>
                    , the tools provide cross-browser compatibility and robust automation capabilities.
                  </p>
                  <p className="mb-4 leading-relaxed text-sm sm:text-base">
                    Key features include automated form filling, web scraping with respect for{" "}
                    <Link href="#robots-txt" className="text-blue-600 hover:underline">
                      robots.txt
                    </Link>
                    , screenshot capture, and performance monitoring. The tools are designed with{" "}
                    <Link href="#ethical-automation" className="text-blue-600 hover:underline">
                      ethical automation
                    </Link>{" "}
                    principles in mind and include rate limiting and respectful crawling mechanisms. The project has
                    been used by several development teams to streamline their{" "}
                    <Link href="#qa-testing" className="text-blue-600 hover:underline">
                      QA testing
                    </Link>{" "}
                    processes.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
