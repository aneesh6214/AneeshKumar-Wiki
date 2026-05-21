import Image from "next/image";
import React from "react";
import { siteContent } from "@/content/site";
import { ContentSection, JSONContent, sectionId } from "@/lib/json-content";
import { InlineMarkdownText } from "./InlineContent";
import { WikiExternalLinkBadge, WikiTag } from "./WikiPrimitives";
import { WikiInfobox } from "./WikiContent";

interface DossierContentProps {
  embedded?: boolean;
  content: JSONContent;
  sideInfoboxTitle?: string;
  showDisambiguation?: boolean;
  showInfobox?: boolean;
  showMetaPanels?: boolean;
  technologyPlacement?: TechnologyPlacement;
}

type DossierRecord = ContentSection & {
  depth: number;
};

type TechnologyPlacement =
  | "full-row"
  | "inline-role"
  | "logo-panel"
  | "metadata-line";

function collectTextUntilBreak(
  node: React.ReactNode,
  state: { stopped: boolean },
): string {
  if (state.stopped || node == null || typeof node === "boolean") {
    return "";
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map((child) => collectTextUntilBreak(child, state)).join(" ");
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    if (node.type === "br") {
      state.stopped = true;
      return "";
    }

    return collectTextUntilBreak(node.props.children, state);
  }

  return "";
}

function stripMarkdownLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}

function truncateSentence(text: string, maxLength = 240): string {
  const normalized = stripMarkdownLinks(text).replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const clipped = normalized.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, Math.max(0, lastSpace)).trim()}...`;
}

function sectionSummary(section: ContentSection): string {
  return truncateSentence(collectTextUntilBreak(section.description, { stopped: false }));
}

function flattenSections(sections: ContentSection[], depth = 0): DossierRecord[] {
  return sections.flatMap((section) => [
    { ...section, depth },
    ...(section.subsections ? flattenSections(section.subsections, depth + 1) : []),
  ]);
}

function pageKind(content: JSONContent): string {
  if (isProfessionalWork(content)) return "Professional";
  if (content.url === "/independent-work") return "Independent";
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
  return content.url === "/professional-work";
}

function splitTechnologies(value?: string): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function isCurrentRole(section: ContentSection): boolean {
  return /(current position|ongoing)/i.test(section.date || "");
}

function externalLinks(section: ContentSection): Array<{ href: string; label: string }> {
  const links: Array<{ href: string; label: string }> = [];

  if (section.websiteUrl) {
    links.push({ href: section.websiteUrl, label: "Website" });
  }

  if (section.githubUrl) {
    links.push({ href: section.githubUrl, label: "GitHub" });
  }

  if (section.image?.link) {
    links.push({ href: section.image.link, label: "Document" });
  }

  return links;
}

function DossierInfobox({
  content,
  records,
}: {
  content: JSONContent;
  records: DossierRecord[];
}) {
  const entriesWithLinks = records.filter((record) => externalLinks(record).length > 0).length;
  const datedEntries = records.filter((record) => record.date).length;

  return (
    <aside className="lg:w-72 lg:flex-shrink-0">
      <div className="border border-gray-300 bg-gray-50 text-sm lg:sticky lg:top-6">
        <h3 className="border-b border-gray-300 bg-gray-100 px-3 py-2 text-center font-bold">
          {content.title}
        </h3>
        <dl className="divide-y divide-gray-200">
          <div className="grid grid-cols-[6.5rem_1fr]">
            <dt className="bg-gray-100 px-3 py-2 font-semibold">Scope</dt>
            <dd className="px-3 py-2 text-gray-700">{content.subtitle || content.description}</dd>
          </div>
          <div className="grid grid-cols-[6.5rem_1fr]">
            <dt className="bg-gray-100 px-3 py-2 font-semibold">Entries</dt>
            <dd className="px-3 py-2 text-gray-700">{records.length}</dd>
          </div>
          <div className="grid grid-cols-[6.5rem_1fr]">
            <dt className="bg-gray-100 px-3 py-2 font-semibold">Dated</dt>
            <dd className="px-3 py-2 text-gray-700">{datedEntries}</dd>
          </div>
          <div className="grid grid-cols-[6.5rem_1fr]">
            <dt className="bg-gray-100 px-3 py-2 font-semibold">Linked</dt>
            <dd className="px-3 py-2 text-gray-700">{entriesWithLinks}</dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}

function DossierRecordItem({
  content,
  record,
  technologyPlacement,
}: {
  content: JSONContent;
  record: DossierRecord;
  technologyPlacement: TechnologyPlacement;
}) {
  const summary = sectionSummary(record);
  const links = externalLinks(record);
  const technologies = splitTechnologies(record.technologies);
  const isProfessionalPage = isProfessionalWork(content);
  const inlineRoles = isProfessionalPage ? record.subsections || [] : [];
  const roleTechnologies = inlineRoles.flatMap((role) =>
    splitTechnologies(role.technologies),
  );
  const isProfessionalCompany = isProfessionalPage && inlineRoles.length > 0;
  const showHeaderDate = !isProfessionalCompany;
  const showImageCaptionInMeta = !isProfessionalCompany;
  const showRecordSummary = !isProfessionalCompany;
  const useSquareImage = isProfessionalCompany;

  return (
    <section
      id={sectionId(record)}
      className={`grid gap-4 border-b border-gray-200 py-4 last:border-b-0 ${
        record.image ? "sm:grid-cols-[minmax(0,1fr)_9rem]" : ""
      }`}
    >
      <div className="min-w-0">
        {!isProfessionalCompany && (
          <>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h2
                className={`font-semibold leading-snug text-blue-700 ${
                  record.depth > 0 ? "text-base" : "text-lg"
                }`}
              >
                {record.title}
              </h2>
              {showHeaderDate && record.date && (
                <span className="text-xs text-gray-600">{record.date}</span>
              )}
            </div>

            <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-600">
              <span>{recordKind(content, record)}</span>
              {showImageCaptionInMeta && record.image?.caption && (
                <span>{record.image.caption}</span>
              )}
            </div>
          </>
        )}

        {showRecordSummary && summary && (
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-900">
            {summary}
          </p>
        )}

        {inlineRoles.length > 0 && (
          <RoleTimeline
            roles={inlineRoles}
            showTechnologies={technologyPlacement === "inline-role"}
          />
        )}

        {(technologies.length > 0 || links.length > 0) && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {technologies.map((technology) => (
              <WikiTag key={technology}>{technology}</WikiTag>
            ))}
            {links.map((link) => (
              <WikiExternalLinkBadge
                key={`${link.label}-${link.href}`}
                href={link.href}
                label={link.label}
              />
            ))}
          </div>
        )}
      </div>

      {record.image && (
        <figure className="w-full max-w-44 self-start border border-gray-300 bg-gray-50 p-1.5 text-center text-xs text-gray-600 sm:justify-self-end">
          <Image
            src={record.image.src}
            alt={record.image.alt}
            width={160}
            height={useSquareImage ? 160 : 96}
            className={`mb-1.5 w-full object-contain bg-white ${
              useSquareImage ? "aspect-square" : "h-24"
            }`}
          />
          {record.image.caption && (
            <figcaption className="leading-snug">
              {record.image.captionUrl ? (
                <a
                  href={record.image.captionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {record.image.caption}
                </a>
              ) : (
                record.image.caption
              )}
            </figcaption>
          )}
        </figure>
      )}

      {technologyPlacement === "logo-panel" && roleTechnologies.length > 0 && (
        <div className="sm:col-start-2 sm:row-start-2">
          <div className="w-full max-w-44 border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-700 sm:justify-self-end">
            <div className="mb-1 border-b border-gray-300 pb-1 text-center font-semibold text-gray-900">
              Technologies
            </div>
            <div className="flex flex-wrap justify-center gap-1">
              {roleTechnologies.map((technology) => (
                <span
                  key={technology}
                  className="inline-flex min-h-5 items-center border border-gray-300 bg-white px-1.5 py-0.5 text-[11px]"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {technologyPlacement === "metadata-line" && roleTechnologies.length > 0 && (
        <div className="border-t border-gray-200 pt-2 text-xs text-gray-700 sm:col-span-2">
          <span className="font-semibold text-gray-900">Technologies: </span>
          {roleTechnologies.join(" · ")}
        </div>
      )}

      {technologyPlacement === "full-row" && roleTechnologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:col-span-2">
          {roleTechnologies.map((technology) => (
            <WikiTag key={technology}>{technology}</WikiTag>
          ))}
        </div>
      )}
    </section>
  );
}

function RoleTimeline({
  roles,
  showTechnologies,
}: {
  roles: ContentSection[];
  showTechnologies: boolean;
}) {
  return (
    <div>
      {roles.map((role, index) => {
        const current = isCurrentRole(role);
        const summary = sectionSummary(role);
        const technologies = splitTechnologies(role.technologies);

        return (
          <section
            key={sectionId(role)}
            className="grid grid-cols-[1rem_minmax(0,1fr)] gap-x-3"
          >
            <div className="relative flex justify-center">
              {index < roles.length - 1 && (
                <span className="absolute bottom-[-0.6875rem] top-[0.6875rem] w-px bg-gray-300" />
              )}
              <span
                className={`z-10 mt-1.5 block h-2.5 w-2.5 rounded-full border ${
                  current
                    ? "border-blue-600 bg-blue-600"
                    : "border-gray-400 bg-white"
                }`}
              />
            </div>

            <div className="pb-4">
              <h3
                className={`leading-snug ${
                  current
                    ? "text-lg font-semibold text-blue-700"
                    : "text-base font-semibold text-blue-700"
                }`}
              >
                {role.title}
              </h3>
              {role.date && (
                <div className="mt-0.5 text-xs italic text-gray-600">
                  {role.date}
                </div>
              )}

              {summary && (
                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-gray-800">
                  {summary}
                </p>
              )}

              {showTechnologies && technologies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {technologies.map((technology) => (
                    <WikiTag key={technology}>{technology}</WikiTag>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default function DossierContent({
  embedded = false,
  content,
  sideInfoboxTitle,
  showDisambiguation = true,
  showInfobox = true,
  showMetaPanels = true,
  technologyPlacement = "full-row",
}: DossierContentProps) {
  const records =
    isProfessionalWork(content)
      ? content.sections.map((section) => ({ ...section, depth: 0 }))
      : flattenSections(content.sections);
  const hasSidePanel =
    !embedded && (showMetaPanels || (showInfobox && Boolean(content.infobox)));

  return (
    <div
      className={
        embedded
          ? ""
          : `flex flex-col gap-6 px-4 pt-3 sm:px-6 ${
              hasSidePanel ? "lg:flex-row" : ""
            }`
      }
    >
      <div className="min-w-0 flex-1">
        {showDisambiguation && content.disambiguation && (
          <p className="mb-3 text-xs italic text-gray-600">
            <InlineMarkdownText text={content.disambiguation} />
          </p>
        )}

        {showMetaPanels && (
          <div className="mb-4 border border-gray-300 bg-gray-50 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-[8rem_1fr]">
              <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 font-semibold sm:border-b-0 sm:border-r">
                Subject
              </div>
              <div className="px-3 py-2 text-gray-800">{content.description}</div>
            </div>
            <div className="grid grid-cols-1 border-t border-gray-200 sm:grid-cols-[8rem_1fr]">
              <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 font-semibold sm:border-b-0 sm:border-r">
                Coverage
              </div>
              <div className="px-3 py-2 text-gray-800">
                {records.length} {records.length === 1 ? "entry" : "entries"}
              </div>
            </div>
          </div>
        )}

        <div className={embedded ? "" : "border-t border-gray-300"}>
          {records.map((record) => (
            <DossierRecordItem
              key={`${record.depth}-${sectionId(record)}`}
              content={content}
              record={record}
              technologyPlacement={technologyPlacement}
            />
          ))}
        </div>
      </div>

      {!embedded && showInfobox && content.infobox ? (
        <aside className="lg:w-80 lg:flex-shrink-0">
          <WikiInfobox
            infobox={content.infobox}
            title={
              sideInfoboxTitle ||
              content.infoboxTitle ||
              siteContent.infobox.defaultTitle
            }
          />
        </aside>
      ) : (
        !embedded &&
        showMetaPanels && <DossierInfobox content={content} records={records} />
      )}
    </div>
  );
}
