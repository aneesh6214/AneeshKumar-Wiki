import type { ContentSection, JSONContent } from "@/lib/json-content";
import { sectionId, splitCommaList } from "@/lib/json-content";
import { MarkdownParagraphs } from "./InlineContent";
import { WikiBadgeRow, WikiEntryFigure } from "./WikiPrimitives";

interface DossierContentProps {
  content: JSONContent;
}

interface CompanyEntryProps {
  company: ContentSection;
}

interface RoleTimelineItemProps {
  hasConnector: boolean;
  role: ContentSection;
}

interface RoleTimelineProps {
  roles: ContentSection[];
}

interface RoleDescriptionProps {
  description?: string;
}

function isCurrentRole(section: ContentSection): boolean {
  return /(current position|ongoing)/i.test(section.date || "");
}

function RoleDescription({
  description,
}: RoleDescriptionProps) {
  if (!description?.trim()) return null;

  return (
    <div className="mt-1">
      <MarkdownParagraphs
        text={description}
        className="max-w-3xl text-sm leading-relaxed text-gray-800"
      />
    </div>
  );
}

function CompanyEntry({ company }: CompanyEntryProps) {
  const roles = company.subsections || [];

  return (
    <section
      id={sectionId(company)}
      className={`grid gap-4 border-b border-gray-200 py-4 last:border-b-0 ${
        company.image ? "sm:grid-cols-[minmax(0,1fr)_9rem]" : ""
      }`}
    >
      <div className="min-w-0">
        {roles.length > 0 && <RoleTimeline roles={roles} />}
      </div>

      <WikiEntryFigure image={company.image} isSquare />
    </section>
  );
}

function RoleTimeline({ roles }: RoleTimelineProps) {
  return (
    <div>
      {roles.map((role, index) => (
        <RoleTimelineItem
          key={sectionId(role)}
          hasConnector={index < roles.length - 1}
          role={role}
        />
      ))}
    </div>
  );
}

function RoleTimelineItem({
  hasConnector,
  role,
}: RoleTimelineItemProps) {
  const current = isCurrentRole(role);
  const technologies = splitCommaList(role.technologies, 8);

  return (
    <section className="grid grid-cols-[1rem_minmax(0,1fr)] gap-x-3">
      <div className="relative flex justify-center">
        {hasConnector && (
          <span className="absolute bottom-[-0.6875rem] top-[0.6875rem] w-px bg-gray-300" />
        )}
        <span
          className={`z-10 mt-1.5 block h-2.5 w-2.5 rounded-full border ${
            current ? "border-blue-600 bg-blue-600" : "border-gray-400 bg-white"
          }`}
        />
      </div>

      <div className="pb-4">
        <h3
          className={`leading-snug text-blue-700 ${
            current ? "text-lg font-semibold" : "text-base font-semibold"
          }`}
        >
          {role.title}
        </h3>
        {role.date && (
          <div className="mt-0.5 text-xs italic text-gray-600">
            {role.date}
          </div>
        )}

        <RoleDescription description={role.description} />

        <WikiBadgeRow className="mt-2" tags={technologies} />
      </div>
    </section>
  );
}

export default function DossierContent({ content }: DossierContentProps) {
  return (
    <div>
      {content.sections.map((company) => (
        <CompanyEntry
          key={sectionId(company)}
          company={company}
        />
      ))}
    </div>
  );
}
