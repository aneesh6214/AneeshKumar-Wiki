import type { ContentSection, JSONContent } from "@/lib/json-content";
import {
  sectionActionLinks,
  sectionId,
  splitCommaList,
} from "@/lib/json-content";
import { MarkdownParagraphs } from "./InlineContent";
import { WikiBadgeRow, WikiEntryFigure } from "./WikiPrimitives";

interface DossierContentProps {
  content: JSONContent;
}

interface DossierRecordProps {
  content: JSONContent;
  record: ContentSection;
}

interface RoleTimelineItemProps {
  hasConnector: boolean;
  role: ContentSection;
}

interface RoleTimelineProps {
  roles: ContentSection[];
}

interface DossierDescriptionProps {
  className?: string;
  description?: string;
  textClassName: string;
}

function pageKind(content: JSONContent): string {
  if (isProfessionalWork(content)) return "Professional";
  if (content.url === "/projects") return "Project";
  if (content.url === "/media") return "Media";
  return "Entry";
}

function recordKind(content: JSONContent, section: ContentSection): string {
  if (isProfessionalWork(content) && section.date) {
    return section.date;
  }

  const prefix = section.title.split(":")[0];

  if (["Paper", "Report"].includes(prefix)) {
    return prefix;
  }

  return pageKind(content);
}

function isProfessionalWork(content: JSONContent): boolean {
  return content.url === "/career";
}

function isCurrentRole(section: ContentSection): boolean {
  return /(current position|ongoing)/i.test(section.date || "");
}

function DossierRecordHeader({
  content,
  record,
}: DossierRecordProps) {
  return (
    <>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h2 className="text-lg font-semibold leading-snug text-blue-700">
          {record.title}
        </h2>
        {record.date && (
          <span className="text-xs text-gray-600">{record.date}</span>
        )}
      </div>

      <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-600">
        <span>{recordKind(content, record)}</span>
        {record.image?.caption && <span>{record.image.caption}</span>}
      </div>
    </>
  );
}

function DossierDescription({
  className = "",
  description,
  textClassName,
}: DossierDescriptionProps) {
  if (!description?.trim()) return null;

  return (
    <div className={className}>
      <MarkdownParagraphs text={description} className={textClassName} />
    </div>
  );
}

function DossierRecordItem({
  content,
  record,
}: DossierRecordProps) {
  const links = sectionActionLinks(record, "Document");
  const technologies = splitCommaList(record.technologies, 8);
  const isProfessionalPage = isProfessionalWork(content);
  const inlineRoles = isProfessionalPage ? record.subsections || [] : [];
  const isProfessionalCompany = isProfessionalPage && inlineRoles.length > 0;

  return (
    <section
      id={sectionId(record)}
      className={`grid gap-4 border-b border-gray-200 py-4 last:border-b-0 ${
        record.image ? "sm:grid-cols-[minmax(0,1fr)_9rem]" : ""
      }`}
    >
      <div className="min-w-0">
        {!isProfessionalCompany && (
          <DossierRecordHeader content={content} record={record} />
        )}

        {!isProfessionalCompany && (
          <DossierDescription
            className="mt-2"
            description={record.description}
            textClassName="max-w-3xl text-sm leading-relaxed text-gray-900"
          />
        )}

        {inlineRoles.length > 0 && <RoleTimeline roles={inlineRoles} />}

        <WikiBadgeRow links={links} tags={technologies} />
      </div>

      <WikiEntryFigure image={record.image} isSquare={isProfessionalCompany} />
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

        <DossierDescription
          className="mt-1"
          description={role.description}
          textClassName="max-w-3xl text-sm leading-relaxed text-gray-800"
        />

        <WikiBadgeRow className="mt-2" tags={technologies} />
      </div>
    </section>
  );
}

export default function DossierContent({ content }: DossierContentProps) {
  return (
    <div>
      {content.sections.map((record) => (
        <DossierRecordItem
          key={sectionId(record)}
          content={content}
          record={record}
        />
      ))}
    </div>
  );
}
