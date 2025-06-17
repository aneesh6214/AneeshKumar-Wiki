import { Menu, Search, Languages } from "lucide-react"
import Link from "next/link"

export default function IndustryWorkPage() {
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
                <Link
                  href="/industry-work"
                  className="text-blue-600 hover:underline font-medium bg-blue-50 px-2 py-1 rounded"
                >
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
              <h1 className="text-2xl sm:text-3xl font-serif text-black">Aneesh Kumar - Industry Work</h1>
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
                  This article covers the professional work experience of{" "}
                  <Link href="/" className="text-blue-600 hover:underline">
                    Aneesh Kumar
                  </Link>
                  . For his personal projects, see{" "}
                  <Link href="/projects" className="text-blue-600 hover:underline">
                    Aneesh Kumar (Projects)
                  </Link>
                  .
                </p>

                <p className="mb-6 leading-relaxed text-sm sm:text-base">
                  <strong>Aneesh Kumar</strong> has accumulated significant industry experience working as a{" "}
                  <Link href="#software-engineer" className="text-blue-600 hover:underline">
                    software engineer
                  </Link>{" "}
                  at major technology companies and in academic settings. His professional career spans{" "}
                  <Link href="#enterprise-software" className="text-blue-600 hover:underline">
                    enterprise software development
                  </Link>
                  ,{" "}
                  <Link href="#data-analytics" className="text-blue-600 hover:underline">
                    data analytics
                  </Link>
                  , and{" "}
                  <Link href="#education" className="text-blue-600 hover:underline">
                    educational technology
                  </Link>
                  .
                </p>

                {/* Oracle */}
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                    Software Engineer at Oracle
                  </h2>
                  <p className="mb-4 leading-relaxed text-sm sm:text-base">
                    Kumar joined{" "}
                    <Link href="#oracle-corporation" className="text-blue-600 hover:underline">
                      Oracle Corporation
                    </Link>{" "}
                    as a <strong>Software Engineer</strong>, where he contributed to the development of{" "}
                    <Link href="#enterprise-database-systems" className="text-blue-600 hover:underline">
                      enterprise database systems
                    </Link>{" "}
                    and{" "}
                    <Link href="#cloud-infrastructure" className="text-blue-600 hover:underline">
                      cloud infrastructure
                    </Link>{" "}
                    solutions. His work focused on optimizing database performance, implementing{" "}
                    <Link href="#scalability-solutions" className="text-blue-600 hover:underline">
                      scalability solutions
                    </Link>
                    , and developing tools for database administration.
                  </p>
                  <p className="mb-4 leading-relaxed text-sm sm:text-base">
                    During his tenure at Oracle, Kumar worked on{" "}
                    <Link href="#oracle-cloud" className="text-blue-600 hover:underline">
                      Oracle Cloud
                    </Link>{" "}
                    services, contributing to the migration of legacy systems to cloud-native architectures. He
                    collaborated with cross-functional teams to deliver high-availability database solutions serving
                    millions of users worldwide. His contributions included performance optimization algorithms that
                    improved query execution times by up to 40%.
                  </p>
                </section>

                {/* Quantifind */}
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                    Software Engineer at Quantifind
                  </h2>
                  <p className="mb-4 leading-relaxed text-sm sm:text-base">
                    At{" "}
                    <Link href="#quantifind" className="text-blue-600 hover:underline">
                      Quantifind
                    </Link>
                    , Kumar worked as a <strong>Software Engineer</strong> specializing in{" "}
                    <Link href="#data-analytics" className="text-blue-600 hover:underline">
                      data analytics
                    </Link>{" "}
                    and{" "}
                    <Link href="#machine-learning-platforms" className="text-blue-600 hover:underline">
                      machine learning platforms
                    </Link>
                    . Quantifind is a leading provider of{" "}
                    <Link href="#risk-analytics" className="text-blue-600 hover:underline">
                      risk analytics
                    </Link>{" "}
                    and{" "}
                    <Link href="#consumer-insights" className="text-blue-600 hover:underline">
                      consumer insights
                    </Link>{" "}
                    solutions for financial services and retail industries.
                  </p>
                  <p className="mb-4 leading-relaxed text-sm sm:text-base">
                    Kumar's responsibilities included developing{" "}
                    <Link href="#real-time-analytics" className="text-blue-600 hover:underline">
                      real-time analytics
                    </Link>{" "}
                    pipelines, implementing{" "}
                    <Link href="#predictive-models" className="text-blue-600 hover:underline">
                      predictive models
                    </Link>
                    , and building scalable data processing systems. He worked extensively with{" "}
                    <Link href="#big-data-technologies" className="text-blue-600 hover:underline">
                      big data technologies
                    </Link>{" "}
                    including Apache Spark, Kafka, and distributed computing frameworks. His work contributed to
                    improving the accuracy of risk assessment models used by major financial institutions.
                  </p>
                </section>

                {/* SFSU TA/Grader */}
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                    Teaching Assistant and Grader at San Francisco State University
                  </h2>
                  <p className="mb-4 leading-relaxed text-sm sm:text-base">
                    Kumar served as a <strong>Teaching Assistant and Grader</strong> at{" "}
                    <Link href="#san-francisco-state-university" className="text-blue-600 hover:underline">
                      San Francisco State University (SFSU)
                    </Link>
                    , where he supported undergraduate{" "}
                    <Link href="#computer-science-education" className="text-blue-600 hover:underline">
                      computer science education
                    </Link>
                    . His role involved assisting students with programming assignments, conducting lab sessions, and
                    providing academic support in various computer science courses.
                  </p>
                  <p className="mb-4 leading-relaxed text-sm sm:text-base">
                    As a TA, Kumar helped students understand fundamental concepts in{" "}
                    <Link href="#data-structures" className="text-blue-600 hover:underline">
                      data structures
                    </Link>
                    ,{" "}
                    <Link href="#algorithms" className="text-blue-600 hover:underline">
                      algorithms
                    </Link>
                    , and{" "}
                    <Link href="#software-engineering" className="text-blue-600 hover:underline">
                      software engineering
                    </Link>
                    . He developed supplementary learning materials, created coding exercises, and mentored students on
                    best practices in software development. His teaching approach emphasized practical application of
                    theoretical concepts and hands-on problem-solving.
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
