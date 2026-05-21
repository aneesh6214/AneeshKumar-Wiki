import Image from "next/image";
import { ContentSection, JSONContent, sectionId } from "@/lib/json-content";
import { siteContent } from "@/content/site";
import { InlineMarkdownText } from "./InlineContent";
import { WikiInfobox } from "./WikiContent";
import { WikiExternalLinkBadge, WikiTag } from "./WikiPrimitives";

function splitTechnologies(value?: string): string[] {
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function entryLinks(
  section: ContentSection,
): Array<{ href: string; label: string }> {
  const links: Array<{ href: string; label: string }> = [];

  if (section.websiteUrl) links.push({ href: section.websiteUrl, label: "Website" });
  if (section.githubUrl) links.push({ href: section.githubUrl, label: "GitHub" });
  if (section.image?.link) links.push({ href: section.image.link, label: "View" });

  return links;
}

function EntryImage({ section }: { section: ContentSection }) {
  if (!section.image) return null;

  return (
    <figure className="w-full max-w-44 self-start border border-gray-300 bg-gray-50 p-1.5 text-center text-xs text-gray-600 sm:justify-self-end">
      <Image
        src={section.image.src}
        alt={section.image.alt}
        width={160}
        height={96}
        className="mb-1.5 h-24 w-full object-contain bg-white"
      />
      {section.image.caption && (
        <figcaption className="leading-snug">{section.image.caption}</figcaption>
      )}
    </figure>
  );
}

function WorkEntry({ section }: { section: ContentSection }) {
  const technologies = splitTechnologies(section.technologies);
  const links = entryLinks(section);

  return (
    <section
      id={sectionId(section)}
      className={`grid gap-4 py-4 ${
        section.image ? "sm:grid-cols-[minmax(0,1fr)_9rem]" : ""
      }`}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-gray-300 pb-1">
          <h3 className="font-serif text-lg font-medium leading-snug text-black">
            {section.title}
          </h3>
          {section.date && (
            <span className="ml-auto text-right text-xs italic text-gray-600">
              {section.date}
            </span>
          )}
        </div>

        {section.description && (
          <div className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-900">
            {section.description}
          </div>
        )}

        {(technologies.length > 0 || links.length > 0) && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {links.map((link) => (
              <WikiExternalLinkBadge
                key={`${link.label}-${link.href}`}
                href={link.href}
                label={link.label}
              />
            ))}
            {technologies.map((technology) => (
              <WikiTag key={technology}>{technology}</WikiTag>
            ))}
          </div>
        )}
      </div>

      <EntryImage section={section} />
    </section>
  );
}

export default function WorkCatalogueContent({ content }: { content: JSONContent }) {
  return (
    <div className="flex flex-col gap-6 px-4 pt-3 sm:px-6 lg:flex-row">
      <div className="min-w-0 flex-1">
        {content.disambiguation && (
          <p className="mb-3 text-xs italic text-gray-600">
            <InlineMarkdownText text={content.disambiguation} />
          </p>
        )}

        <div>
          {content.sections.map((section) => (
            <WorkEntry key={sectionId(section)} section={section} />
          ))}
        </div>
      </div>

      {content.infobox && (
        <aside className="lg:w-80 lg:flex-shrink-0">
          <WikiInfobox
            infobox={content.infobox}
            title={content.infoboxTitle || siteContent.infobox.defaultTitle}
          />
        </aside>
      )}
    </div>
  );
}
