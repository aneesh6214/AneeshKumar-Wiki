import type { ContentSection, JSONContent } from "@/lib/json-content";
import {
  sectionActionLinks,
  sectionId,
  splitCommaList,
} from "@/lib/json-content";
import { MarkdownParagraphs } from "./InlineContent";
import { WikiArticleLayout } from "./WikiContent";
import { WikiBadgeRow, WikiEntryFigure } from "./WikiPrimitives";

interface WorkCatalogueContentProps {
  content: JSONContent;
}

interface WorkEntryProps {
  section: ContentSection;
}

function WorkEntry({ section }: WorkEntryProps) {
  const technologies = splitCommaList(section.technologies, 8);
  const links = sectionActionLinks(section);

  return (
    <section
      id={sectionId(section)}
      className={`grid gap-4 py-4 first:pt-0 ${
        section.image ? "sm:grid-cols-[minmax(0,1fr)_9rem]" : ""
      }`}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-gray-300 pb-1">
          <h2 className="font-serif text-xl font-medium leading-snug text-black">
            {section.title}
          </h2>
          {section.date && (
            <span className="ml-auto text-right text-xs italic text-gray-600">
              {section.date}
            </span>
          )}
        </div>

        {section.description && (
          <div className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-900">
            <MarkdownParagraphs text={section.description} />
          </div>
        )}

        <WikiBadgeRow links={links} tags={technologies} />
      </div>

      <WikiEntryFigure image={section.image} />
    </section>
  );
}

export default function WorkCatalogueContent({
  content,
}: WorkCatalogueContentProps) {
  return (
    <WikiArticleLayout content={content}>
      <div>
        {content.sections.map((section) => (
          <WorkEntry key={sectionId(section)} section={section} />
        ))}
      </div>
    </WikiArticleLayout>
  );
}
