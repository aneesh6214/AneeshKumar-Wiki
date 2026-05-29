import type { ReactNode } from "react";
import DossierContent from "./DossierContent";
import { WikiArticleLayout } from "./WikiContent";
import {
  WikiBadgeRow,
  WikiExternalLinkBadge,
  WikiSectionHeading,
} from "./WikiPrimitives";
import type { ContentSection, JSONContent } from "@/lib/json-content";
import { sectionId, splitCommaList } from "@/lib/json-content";

interface ProfessionalWorkTabsProps {
  content: JSONContent;
}

interface WikiSectionProps {
  children: ReactNode;
  isFlush?: boolean;
  section: ContentSection;
}

interface PublicationsCatalogueProps {
  publications: ContentSection[];
}

function WikiSection({
  children,
  isFlush = false,
  section,
}: WikiSectionProps) {
  return (
    <section className="mb-6 last:mb-0">
      <WikiSectionHeading id={sectionId(section)} isFlush={isFlush}>
        {section.title}
      </WikiSectionHeading>
      {children}
    </section>
  );
}

function PublicationsCatalogue({
  publications,
}: PublicationsCatalogueProps) {
  return (
    <section className="overflow-x-auto pb-4">
      <table className="w-full min-w-[680px] border-collapse text-sm">
        <thead>
          <tr className="border-y border-gray-300 bg-gray-100 text-left">
            <th className="px-2 py-2 font-semibold">Year</th>
            <th className="px-2 py-2 font-semibold">Title</th>
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
                <WikiBadgeRow
                  className="mt-0"
                  tags={splitCommaList(publication.technologies)}
                />
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
    <WikiArticleLayout content={content}>
      {employmentSection && (
        <WikiSection section={employmentSection}>
          <DossierContent content={employmentContent} />
        </WikiSection>
      )}

      {publicationsSection && (
        <WikiSection section={publicationsSection} isFlush>
          <PublicationsCatalogue
            publications={publicationsSection.subsections || []}
          />
        </WikiSection>
      )}
    </WikiArticleLayout>
  );
}
