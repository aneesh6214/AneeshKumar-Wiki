import type { ReactNode } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { siteContent } from "@/content/site";
import type { ContentSection, SectionActionLink } from "@/lib/json-content";
import { InlineMarkdownText } from "./InlineContent";
import SearchableWikiTag from "./SearchableWikiTag";

interface ArticleSourceLineProps {
  className?: string;
}

interface ArticleTabsProps {
  activeLabel?: string;
}

interface ArticleLayoutProps {
  children: ReactNode;
  disambiguation?: string;
  sidePanel?: ReactNode;
}

interface ArticleDisambiguationProps {
  text?: string;
}

interface WikiSectionHeadingProps {
  id?: string;
  children: ReactNode;
  isFlush?: boolean;
}

interface WikiTagProps {
  children: ReactNode;
}

interface WikiExternalLinkBadgeProps {
  href: string;
  label: string;
}

interface WikiEntryFigureProps {
  image?: ContentSection["image"];
  isSquare?: boolean;
}

interface WikiBadgeRowProps {
  className?: string;
  links?: SectionActionLink[];
  tags?: string[];
}

export function ArticleSourceLine({ className = "" }: ArticleSourceLineProps) {
  return (
    <div className={`text-sm text-gray-600 ${className}`}>
      {siteContent.source.line}
    </div>
  );
}

export function ArticleTabs({
  activeLabel = "Article",
}: ArticleTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-6 border-b border-gray-300">
      <button
        type="button"
        className="border-b-2 border-black pb-2 font-medium text-black"
      >
        {activeLabel}
      </button>
    </div>
  );
}

export function ArticleDisambiguation({ text }: ArticleDisambiguationProps) {
  if (!text) return null;

  return (
    <p className="mb-2 text-xs italic text-gray-600">
      <InlineMarkdownText text={text} />
    </p>
  );
}

export function ArticleLayout({
  children,
  disambiguation,
  sidePanel,
}: ArticleLayoutProps) {
  return (
    <div className="flex flex-col gap-6 px-4 pt-3 sm:px-6 lg:flex-row">
      <div className="min-w-0 flex-1" data-search-content="true">
        <ArticleDisambiguation text={disambiguation} />
        {children}
      </div>
      {sidePanel}
    </div>
  );
}

export function WikiSectionHeading({
  id,
  children,
  isFlush = false,
}: WikiSectionHeadingProps) {
  return (
    <h2
      id={id}
      className={`${isFlush ? "mb-0" : "mb-2"} border-b border-gray-300 pb-1 font-serif text-xl font-medium text-black`}
    >
      {children}
    </h2>
  );
}

export function WikiTag({ children }: WikiTagProps) {
  if (typeof children === "string") {
    return <SearchableWikiTag label={children} />;
  }

  return (
    <span className="inline-flex min-h-6 items-center border border-gray-300 bg-white px-2 py-0.5 text-xs text-gray-700">
      {children}
    </span>
  );
}

export function WikiExternalLinkBadge({
  href,
  label,
}: WikiExternalLinkBadgeProps) {
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

export function WikiEntryFigure({
  image,
  isSquare = false,
}: WikiEntryFigureProps) {
  if (!image) return null;

  return (
    <figure className="w-full max-w-44 self-start border border-gray-300 bg-gray-50 p-1.5 text-center text-xs text-gray-600 sm:justify-self-end">
      <Image
        src={image.src}
        alt={image.alt}
        width={160}
        height={isSquare ? 160 : 96}
        className="mb-1.5 h-auto w-full bg-white object-contain"
      />
      {image.caption && (
        <figcaption className="leading-snug">
          {image.captionUrl ? (
            <a
              href={image.captionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {image.caption}
            </a>
          ) : (
            image.caption
          )}
        </figcaption>
      )}
    </figure>
  );
}

export function WikiBadgeRow({
  className = "mt-3",
  links = [],
  tags = [],
}: WikiBadgeRowProps) {
  if (links.length === 0 && tags.length === 0) return null;

  return (
    <div className={`${className} flex flex-wrap gap-1.5`}>
      {links.map((link) => (
        <WikiExternalLinkBadge
          key={`${link.label}-${link.href}`}
          href={link.href}
          label={link.label}
        />
      ))}
      {tags.map((tag) => (
        <WikiTag key={tag}>{tag}</WikiTag>
      ))}
    </div>
  );
}
