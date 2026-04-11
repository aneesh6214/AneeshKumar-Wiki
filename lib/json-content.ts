import React from "react";

export enum ImagePosition {
  LEFT = "left",
  RIGHT = "right",
}

export interface ContentSection {
  title: string;
  date?: string;
  description: React.ReactNode;
  technologies?: string;
  githubUrl?: string;
  websiteUrl?: string;
  image?: {
    src: string;
    alt: string;
    caption?: string;
    position: ImagePosition;
    link?: string;
  };
  subsections?: ContentSection[];
}

export interface InfoboxField {
  label: string;
  value: string;
}

export interface Infobox {
  image?: string;
  imageCaption?: string;
  fields: InfoboxField[];
}

export interface JSONContent {
  title: string;
  subtitle?: string;
  description: string;
  url: string;
  disambiguation?: string;
  infobox?: Infobox;
  sections: ContentSection[];
}

const CONTENT_LOADERS: Record<string, () => Promise<JSONContent>> = {
  home: () => import("../content/home").then((m) => m.homeContent),
  "industry-work": () =>
    import("../content/industry-work").then((m) => m.industryWorkContent),
  research: () => import("../content/research").then((m) => m.researchContent),
  projects: () => import("../content/projects").then((m) => m.projectsContent),
  blog: () => import("../content/blog").then((m) => m.blogContent),
  contact: () => import("../content/contact").then((m) => m.contactContent),
};

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

function reactNodeToText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(reactNodeToText).join(" ");
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return reactNodeToText(node.props.children);
  }
  return "";
}

export function extractSearchableText(content: JSONContent): string {
  let text =
    content.title +
    " " +
    (content.subtitle || "") +
    " " +
    content.description +
    " ";

  if (content.disambiguation) {
    text += content.disambiguation + " ";
  }

  if (content.infobox) {
    content.infobox.fields.forEach((field) => {
      text += field.label + " " + field.value + " ";
    });
  }

  function extractFromSections(sections: ContentSection[]): string {
    let sectionText = "";
    sections.forEach((section) => {
      sectionText += section.title + " ";
      sectionText += reactNodeToText(section.description) + " ";
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
      const id = section.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      let sectionContent = reactNodeToText(section.description) + " ";
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
