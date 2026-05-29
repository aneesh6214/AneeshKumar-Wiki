import Image from "next/image";
import type { ElementType, ReactNode } from "react";
import { siteContent } from "@/content/site";
import type {
  ContentSection,
  Infobox,
  InfoboxSocialLink,
  JSONContent,
} from "@/lib/json-content";
import { sectionId } from "@/lib/json-content";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import HomeActivityGrid from "./HomeActivityGrid";
import HomeRoleFocus from "./HomeRoleFocus";
import {
  InlineMarkdownWithBreaks,
  MarkdownParagraphs,
} from "./InlineContent";
import { ArticleLayout, WikiSectionHeading } from "./WikiPrimitives";

interface WikiContentProps {
  content: JSONContent;
}

interface WikiSectionProps {
  level: number;
  section: ContentSection;
}

interface WikiTextSectionHeadingProps {
  HeadingTag: ElementType;
  id: string;
  level: number;
  title: string;
}

interface WikiInfoboxPanelProps {
  infobox?: Infobox;
  title?: string;
}

interface WikiArticleLayoutProps {
  children: ReactNode;
  content: JSONContent;
}

interface WikiInfoboxProps {
  infobox: Infobox;
  title: string;
}

interface SocialIconProps {
  link: InfoboxSocialLink;
}

interface InfoboxValueProps {
  value: string;
}

export default function WikiContent({ content }: WikiContentProps) {
  return (
    <WikiArticleLayout content={content}>
      <div className="max-w-none">
        {content.sections.map((section, index) => (
          <WikiSection key={index} section={section} level={2} />
        ))}
      </div>
    </WikiArticleLayout>
  );
}

function WikiSection({ section, level }: WikiSectionProps) {
  if (section.variant === "home-role-focus") {
    return <HomeRoleFocus items={section.roleFocusItems ?? []} />;
  }

  if (section.variant === "home-activity-grid") {
    return (
      <div className="mb-4">
        <HomeActivityGrid />
      </div>
    );
  }

  const HeadingTag = `h${level}` as ElementType;
  const id = sectionId(section);

  return (
    <div className="mb-4 flow-root first:mt-0">
      {section.title && (
        <WikiTextSectionHeading
          HeadingTag={HeadingTag}
          id={id}
          level={level}
          title={section.title}
        />
      )}

      <div className="space-y-2">
        <div className="text-sm leading-relaxed text-gray-900">
          <MarkdownParagraphs text={section.description} />
        </div>
      </div>

      {section.subsections && (
        <div className="mt-3">
          {section.subsections.map((subsection, index) => (
            <WikiSection
              key={index}
              section={subsection}
              level={Math.min(level + 1, 6)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function WikiTextSectionHeading({
  HeadingTag,
  id,
  level,
  title,
}: WikiTextSectionHeadingProps) {
  if (level === 2) {
    return <WikiSectionHeading id={id}>{title}</WikiSectionHeading>;
  }

  return (
    <div
      className={`mb-2 ${level === 3 ? "border-b border-gray-200 pb-1" : ""}`}
    >
      <HeadingTag
        id={id}
        className={
          level === 3
            ? "font-serif text-base font-medium"
            : "font-serif text-sm font-medium"
        }
      >
        {title}
      </HeadingTag>
    </div>
  );
}

export function WikiInfoboxPanel({
  infobox,
  title,
}: WikiInfoboxPanelProps) {
  if (!infobox) return null;

  return (
    <aside className="lg:w-80 lg:flex-shrink-0" data-search-exclude="true">
      <WikiInfobox
        infobox={infobox}
        title={title || siteContent.infobox.defaultTitle}
      />
    </aside>
  );
}

export function WikiArticleLayout({
  children,
  content,
}: WikiArticleLayoutProps) {
  return (
    <ArticleLayout
      disambiguation={content.disambiguation}
      sidePanel={
        <WikiInfoboxPanel
          infobox={content.infobox}
          title={content.infoboxTitle || content.title}
        />
      }
    >
      {children}
    </ArticleLayout>
  );
}

export function WikiInfobox({
  infobox,
  title,
}: WikiInfoboxProps) {
  return (
    <div className="w-full max-w-xs border border-gray-400 bg-gray-50 text-[13px] lg:sticky lg:top-20">
      <h3 className="border-b border-gray-400 bg-gray-100 px-2 py-1.5 text-center text-sm font-bold text-gray-900">
        {title}
      </h3>

      {infobox.image && (
        <div className="px-2 pb-2 pt-2">
          <Image
            src={infobox.image}
            alt={infobox.imageCaption || title}
            width={320}
            height={420}
            unoptimized
            className="w-full border border-gray-300 object-contain"
          />
          {infobox.imageCaption && (
            <p className="mt-1.5 text-center text-xs italic text-gray-600">
              {infobox.imageCaption}
            </p>
          )}
        </div>
      )}

      <dl className="border-t border-gray-300">
        {infobox.fields.map((field, index) => (
          <div
            key={index}
            className="grid grid-cols-[5.75rem_minmax(0,1fr)] border-b border-gray-200 last:border-b-0"
          >
            <dt className="bg-gray-100 px-2 py-1.5 font-semibold text-gray-900">
              {field.label}
            </dt>
            <dd className="min-w-0 break-words px-2 py-1.5 text-gray-700">
              <InfoboxValue value={field.value} />
            </dd>
          </div>
        ))}
      </dl>

      {(infobox.email || infobox.socialLinks?.length) && (
        <dl className="border-t border-gray-300">
          {infobox.email && (
            <div
              className={`grid grid-cols-[5.75rem_minmax(0,1fr)] ${
                infobox.socialLinks?.length ? "border-b border-gray-200" : ""
              }`}
            >
              <dt className="bg-gray-100 px-2 py-1.5 font-semibold text-gray-900">
                Email
              </dt>
              <dd className="min-w-0 break-words px-2 py-1.5 text-gray-700">
                <a
                  href={`mailto:${infobox.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {infobox.email}
                </a>
              </dd>
            </div>
          )}

          {infobox.socialLinks?.length ? (
            <div className="grid grid-cols-[5.75rem_minmax(0,1fr)]">
              <dt className="bg-gray-100 px-2 py-1.5 font-semibold text-gray-900">
                Social
              </dt>
              <dd className="flex min-w-0 items-center gap-3 px-2 py-1.5 text-gray-700">
                {infobox.socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className="transition-colors hover:text-blue-700"
                  >
                    <SocialIcon link={link} />
                  </a>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>
      )}
    </div>
  );
}

function SocialIcon({ link }: SocialIconProps) {
  const className = "h-5 w-5";

  if (link.platform === "linkedin") {
    return <FaLinkedin aria-hidden="true" className={className} />;
  }

  if (link.platform === "github") {
    return <FaGithub aria-hidden="true" className={className} />;
  }

  return <FaYoutube aria-hidden="true" className={className} />;
}

function InfoboxValue({ value }: InfoboxValueProps) {
  return <InlineMarkdownWithBreaks text={value} />;
}
