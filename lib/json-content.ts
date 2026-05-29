export enum ImagePosition {
  LEFT = "left",
  RIGHT = "right",
}

export interface RoleFocusItem {
  role: string;
  statement: string;
  seeAlso: {
    href: string;
    label: string;
  };
}

export interface ContentSection {
  id?: string;
  title: string;
  group?: string;
  variant?: "home-role-focus" | "home-activity-grid";
  hideFromArticleNav?: boolean;
  date?: string;
  venue?: string;
  description?: string;
  roleFocusItems?: RoleFocusItem[];
  technologies?: string;
  githubUrl?: string;
  websiteUrl?: string;
  image?: {
    src: string;
    alt: string;
    caption?: string;
    captionUrl?: string;
    position: ImagePosition;
    link?: string;
  };
  subsections?: ContentSection[];
}

export interface InfoboxField {
  label: string;
  value: string;
}

export interface InfoboxSocialLink {
  platform: "linkedin" | "github" | "youtube";
  href: string;
  label: string;
}

export interface Infobox {
  image?: string;
  imageCaption?: string;
  email?: string;
  socialLinks?: InfoboxSocialLink[];
  fields: InfoboxField[];
}

export interface JSONContent {
  title: string;
  url: string;
  disambiguation?: string;
  infobox?: Infobox;
  infoboxTitle?: string;
  sections: ContentSection[];
}

export interface ArticleNavItem {
  href: string;
  label: string;
  depth: number;
}

export interface SectionActionLink {
  href: string;
  label: string;
}

const CONTENT_LOADERS: Record<string, () => Promise<JSONContent>> = {
  home: () => import("../content/home").then((m) => m.homeContent),
  career: () => import("../content/career").then((m) => m.careerContent),
  projects: () => import("../content/projects").then((m) => m.projectsContent),
  media: () => import("../content/media").then((m) => m.mediaContent),
  ama: () => import("../content/ama").then((m) => m.amaContent),
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function sectionId(section: ContentSection): string {
  return section.id || slugify(section.title);
}

export function splitCommaList(value?: string, limit?: number): string[] {
  const items = (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function sectionActionLinks(
  section: ContentSection,
  imageLinkLabel = "View",
): SectionActionLink[] {
  const links: SectionActionLink[] = [];

  if (section.websiteUrl) {
    links.push({ href: section.websiteUrl, label: "Website" });
  }

  if (section.githubUrl) {
    links.push({ href: section.githubUrl, label: "GitHub" });
  }

  if (section.image?.link) {
    links.push({ href: section.image.link, label: imageLinkLabel });
  }

  return links;
}

export function getArticleNavigation(
  content: JSONContent,
  maxDepth = 1,
): ArticleNavItem[] {
  const links: ArticleNavItem[] = [];

  function visit(sections: ContentSection[], depth: number) {
    if (depth > maxDepth) return;

    for (const section of sections) {
      const hasVisibleTitle = section.title.trim().length > 0;
      if (!section.hideFromArticleNav && hasVisibleTitle) {
        links.push({
          href: `#${sectionId(section)}`,
          label: section.title,
          depth,
        });
      }

      if (section.subsections) {
        visit(section.subsections, depth + 1);
      }
    }
  }

  visit(content.sections, 0);
  return links;
}

export async function getJSONContent(slug: string): Promise<JSONContent> {
  const loader = CONTENT_LOADERS[slug];
  if (!loader) {
    throw new Error(`Content file not found: ${slug}`);
  }
  return loader();
}

export async function getAllJSONContent(): Promise<
  Record<string, JSONContent>
> {
  const allContent: Record<string, JSONContent> = {};
  for (const slug of Object.keys(CONTENT_LOADERS)) {
    allContent[slug] = await getJSONContent(slug);
  }
  return allContent;
}

export function stripMarkdownLinks(value: string): string {
  return value.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function descriptionText(value?: string): string {
  return stripMarkdownLinks(value ?? "");
}

function roleFocusText(items?: RoleFocusItem[]): string {
  return (items ?? [])
    .map((item) => `${item.role} ${item.statement} ${item.seeAlso.label}`)
    .join(" ");
}

export function extractSearchableText(content: JSONContent): string {
  let text = "";

  if (content.disambiguation) {
    text += stripMarkdownLinks(content.disambiguation) + " ";
  }

  function extractFromSections(sections: ContentSection[]): string {
    let sectionText = "";
    sections.forEach((section) => {
      sectionText += section.title + " ";
      sectionText += descriptionText(section.description) + " ";
      sectionText += roleFocusText(section.roleFocusItems) + " ";
      if (section.technologies) {
        sectionText += section.technologies + " ";
      }
      if (section.subsections) {
        sectionText += extractFromSections(section.subsections);
      }
    });
    return sectionText;
  }

  text += extractFromSections(content.sections);

  return text;
}

export function extractSections(
  content: JSONContent,
): Array<{ id: string; title: string; content: string; url: string }> {
  const sections: Array<{
    id: string;
    title: string;
    content: string;
    url: string;
  }> = [];

  function processSections(
    sectionList: ContentSection[],
    parentTitle?: string,
  ) {
    sectionList.forEach((section) => {
      const fullTitle = parentTitle
        ? `${parentTitle} > ${section.title}`
        : section.title;
      if (section.title.trim().length === 0) {
        if (section.subsections) {
          processSections(section.subsections, parentTitle);
        }
        return;
      }

      const id = sectionId(section);

      let sectionContent = descriptionText(section.description) + " ";
      sectionContent += roleFocusText(section.roleFocusItems) + " ";
      if (section.technologies) {
        sectionContent += section.technologies + " ";
      }

      sections.push({
        id,
        title: fullTitle,
        content: sectionContent.trim(),
        url: content.url,
      });

      if (section.subsections) {
        processSections(section.subsections, fullTitle);
      }
    });
  }

  processSections(content.sections);
  return sections;
}
