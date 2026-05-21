import Image from "next/image";
import Link from "next/link";
import { navigationItems } from "@/lib/navigation";
import SearchNavigation from "./SearchNavigation";

interface SidebarProps {
  currentPath: string;
}

type ArticleLink = {
  href: string;
  label: string;
  depth?: number;
};

const articleLinksByPath: Record<string, ArticleLink[]> = {
  "/": [
    { href: "#overview", label: "Overview" },
    { href: "#personal-life", label: "Personal Life" },
  ],
  "/professional-work": [
    { href: "#employment", label: "Employment" },
    { href: "#quantifind", label: "Quantifind", depth: 1 },
    { href: "#oracle", label: "Oracle", depth: 1 },
    { href: "#publications", label: "Publications" },
    {
      href: "#exploring-sparse-feature-topology-as-a-predictor-for-emergence",
      label: "Sparse Feature Topology",
      depth: 1,
    },
  ],
  "/independent-work": [
    { href: "#litreviewer", label: "LitReviewer" },
    { href: "#csc648-showcase-team-lead", label: "CSC648 Showcase" },
    { href: "#suri-concept-formation-model", label: "SURI Concept Formation" },
    {
      href: "#biological-timescale-synaptic-plasticity",
      label: "BTSP Writeup",
    },
  ],
  "/media": [
    { href: "#ai-club-lectures", label: "AI Club Lectures" },
    { href: "#ai-architecture-series", label: "AI Architecture Series" },
  ],
  "/blog": [
    { href: "#ask-a-question", label: "Ask a Question" },
    { href: "#answered-questions", label: "Answered Questions" },
  ],
};

export default function Sidebar({ currentPath }: SidebarProps) {
  const articleLinks = articleLinksByPath[currentPath] || [];

  return (
    <aside className="w-full border-b border-[#a2a9b1] bg-[#f8f9fa] md:fixed md:left-0 md:top-8 md:flex md:h-[calc(100vh-2rem)] md:min-h-[calc(100vh-2rem)] md:w-[15rem] md:min-w-[15rem] md:flex-col md:overflow-y-auto md:border-b-0 md:border-r">
      <div className="px-3 py-3">
        <div className="mb-4">
          <SearchNavigation />
        </div>

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
                      ? "border-[#202122] font-medium text-[#202122] hover:no-underline"
                      : "border-[#eaecf0] text-blue-700"
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
                  className={`block border-l border-[#eaecf0] py-1 leading-snug text-blue-700 hover:underline ${
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
      <div className="mt-auto hidden px-3 pb-3 md:block" aria-hidden="true">
        <div className="inline-block border border-[#a2a9b1] bg-white p-1">
          <Image
            src="/aang.jpg"
            alt=""
            width={333}
            height={250}
            className="h-auto w-24 object-cover"
          />
        </div>
      </div>
    </aside>
  );
}
