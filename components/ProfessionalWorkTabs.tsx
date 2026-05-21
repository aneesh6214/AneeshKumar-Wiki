import type { ReactNode } from "react";
import DossierContent from "./DossierContent";
import { InlineMarkdownText } from "./InlineContent";
import {
  ArticleLayout,
  WikiExternalLinkBadge,
  WikiSectionHeading,
  WikiTag,
} from "./WikiPrimitives";
import {
  ContentSection,
  JSONContent,
  sectionId,
} from "@/lib/json-content";

interface ProfessionalWorkTabsProps {
  content: JSONContent;
  sidePanel: ReactNode;
}

function WikiSection({
  children,
  section,
}: {
  children: ReactNode;
  section: ContentSection;
}) {
  return (
    <section className="mb-6 last:mb-0">
      <WikiSectionHeading id={sectionId(section)}>
        {section.title}
      </WikiSectionHeading>
      {children}
    </section>
  );
}

function splitTags(value?: string): string[] {
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function PublicationsCatalogue({
  publications,
}: {
  publications: ContentSection[];
}) {
  return (
    <section className="overflow-x-auto py-4">
      <table className="w-full min-w-[680px] border-collapse text-sm">
        <thead>
          <tr className="border-y border-gray-300 bg-gray-100 text-left">
            <th className="px-2 py-2 font-semibold">Year</th>
            <th className="px-2 py-2 font-semibold">Publication</th>
            <th className="px-2 py-2 font-semibold">Venue</th>
            <th className="px-2 py-2 font-semibold">Topics</th>
            <th className="px-2 py-2 font-semibold">URL</th>
          </tr>
        </thead>
        <tbody>
          {publications.map((publication) => (
            <tr
              key={sectionId(publication)}
              id={sectionId(publication)}
              className="border-b border-gray-200 align-top"
            >
              <td className="px-2 py-2 text-gray-700">{publication.date}</td>
              <td className="px-2 py-2">
                <div className="font-semibold text-blue-700">
                  {publication.title}
                </div>
              </td>
              <td className="px-2 py-2 text-gray-700">{publication.venue}</td>
              <td className="px-2 py-2">
                <div className="flex flex-wrap gap-1.5">
                  {splitTags(publication.technologies).map((tag) => (
                    <WikiTag key={tag}>{tag}</WikiTag>
                  ))}
                </div>
              </td>
              <td className="px-2 py-2">
                {publication.websiteUrl && (
                  <WikiExternalLinkBadge
                    href={publication.websiteUrl}
                    label="View"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default function ProfessionalWorkTabs({
  content,
  sidePanel,
}: ProfessionalWorkTabsProps) {
  const employmentSection = content.sections.find(
    (section) => section.group === "employment" || section.id === "employment",
  );
  const publicationsSection = content.sections.find(
    (section) =>
      section.group === "publications" || section.id === "publications",
  );
  const employmentContent: JSONContent = {
    ...content,
    sections: employmentSection?.subsections || [],
  };

  return (
    <ArticleLayout sidePanel={sidePanel}>
      {content.disambiguation && (
        <p className="mb-3 text-xs italic text-gray-600">
          <InlineMarkdownText text={content.disambiguation} />
        </p>
      )}

      {employmentSection && (
        <WikiSection section={employmentSection}>
          <DossierContent
            embedded
            content={employmentContent}
            showDisambiguation={false}
            showInfobox={false}
            showMetaPanels={false}
            technologyPlacement="inline-role"
          />
        </WikiSection>
      )}

      {publicationsSection && (
        <WikiSection section={publicationsSection}>
          <PublicationsCatalogue
            publications={publicationsSection.subsections || []}
          />
        </WikiSection>
      )}
    </ArticleLayout>
  );
}
