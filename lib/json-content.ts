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

export async function getJSONContent(slug: string): Promise<JSONContent> {
  try {
    switch (slug) {
      case "home":
        const { homeContent } = await import("../content/home");
        return homeContent;
      case "industry-work":
        const { industryWorkContent } = await import(
          "../content/industry-work"
        );
        return industryWorkContent;
      case "research":
        const { researchContent } = await import("../content/research");
        return researchContent;
      case "projects":
        const { projectsContent } = await import("../content/projects");
        return projectsContent;
      case "blog":
        const { blogContent } = await import("../content/blog");
        return blogContent;
      case "contact":
        const { contactContent } = await import("../content/contact");
        return contactContent;
      default:
        throw new Error(`Content file not found: ${slug}`);
    }
  } catch (error) {
    throw new Error(`Failed to load content: ${slug}`);
  }
}

export async function getAllJSONContent(): Promise<
  Record<string, JSONContent>
> {
  const slugs = [
    "home",
    "industry-work",
    "research",
    "projects",
    "blog",
    "contact",
  ];
  const allContent: Record<string, JSONContent> = {};

  for (const slug of slugs) {
    allContent[slug] = await getJSONContent(slug);
  }

  return allContent;
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

      // Extract text from description (React.ReactNode)
      // We'll do a simple string conversion for search purposes
      if (section.description && typeof section.description === "string") {
        sectionText += section.description + " ";
      }

      // Extract technologies
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

      let sectionContent = "";

      // Extract from description (React.ReactNode)
      if (section.description && typeof section.description === "string") {
        sectionContent += section.description + " ";
      }

      // Extract from technologies
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
