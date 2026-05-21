import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { siteContent } from "@/content/site";

interface ArticleSourceLineProps {
  className?: string;
}

interface ArticleTabsProps {
  activeLabel?: string;
}

interface ArticleLayoutProps {
  children: ReactNode;
  sidePanel?: ReactNode;
}

interface WikiSectionHeadingProps {
  id?: string;
  children: ReactNode;
}

interface WikiTagProps {
  children: ReactNode;
}

interface WikiExternalLinkBadgeProps {
  href: string;
  label: string;
}

export function ArticleSourceLine({ className = "" }: ArticleSourceLineProps) {
  return (
    <div className={`text-sm text-gray-600 ${className}`}>
      {siteContent.source.line}
    </div>
  );
}

export function ArticleTabs({ activeLabel = "Article" }: ArticleTabsProps) {
  return (
    <div className="flex items-center gap-6 border-b border-gray-300">
      <button className="border-b-2 border-black pb-2 font-medium">
        {activeLabel}
      </button>
    </div>
  );
}

export function ArticleLayout({ children, sidePanel }: ArticleLayoutProps) {
  return (
    <div className="flex flex-col gap-6 px-4 pt-3 sm:px-6 lg:flex-row">
      <div className="min-w-0 flex-1">{children}</div>
      {sidePanel}
    </div>
  );
}

export function WikiSectionHeading({ id, children }: WikiSectionHeadingProps) {
  return (
    <h2
      id={id}
      className="mb-2 border-b border-gray-300 pb-1 font-serif text-xl font-medium text-black"
    >
      {children}
    </h2>
  );
}

export function WikiTag({ children }: WikiTagProps) {
  return (
    <span className="inline-flex min-h-6 items-center border border-gray-300 bg-white px-2 py-0.5 text-xs text-gray-700">
      {children}
    </span>
  );
}

export function WikiExternalLinkBadge({ href, label }: WikiExternalLinkBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-6 items-center gap-1 border border-gray-300 bg-gray-50 px-2 py-0.5 text-xs text-blue-700 hover:bg-blue-50 hover:no-underline"
    >
      <span>{label}</span>
      <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
    </a>
  );
}
