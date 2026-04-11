import {
  getAllJSONContent,
  extractSearchableText,
  extractSections,
  JSONContent,
} from "./json-content";
import { getAllBlogPosts } from "./blog-content";

export interface SearchableContent {
  id: string;
  title: string;
  url: string;
  content: string;
  section?: string;
  preview: string;
}

export interface SearchResult extends SearchableContent {
  score: number;
  matchedTerms: string[];
  highlightedPreview: string;
}

let contentCache: Record<string, JSONContent> | null = null;
let blogPostsCache: Awaited<ReturnType<typeof getAllBlogPosts>> | null = null;

export async function getSearchableContent(): Promise<SearchableContent[]> {
  if (!contentCache) {
    contentCache = await getAllJSONContent();
  }

  const searchableItems: SearchableContent[] = [];

  for (const [slug, content] of Object.entries(contentCache)) {
    if (slug === "blog") continue;

    const searchableText = extractSearchableText(content);

    searchableItems.push({
      id: `${slug}-main`,
      title: content.title,
      url: content.url,
      content: searchableText,
      preview: createPreview(searchableText),
    });

    const sections = extractSections(content);
    sections.forEach((section) => {
      searchableItems.push({
        id: `${slug}-${section.id}`,
        title: section.title,
        url: section.url,
        section: section.title,
        content: section.content,
        preview: createPreview(section.content),
      });
    });
  }

  if (!blogPostsCache) {
    blogPostsCache = await getAllBlogPosts();
  }

  blogPostsCache.forEach((post) => {
    const content = post.searchableContent || `${post.title} ${post.topics.join(" ")}`;
    searchableItems.push({
      id: `blog-${post.slug}`,
      title: post.title,
      url: `/blog/${post.slug}`,
      content: content,
      preview: createPreview(content),
    });
  });

  searchableItems.push({
    id: "blog-main",
    title: "Blog",
    url: "/blog",
    content: "Blog technical articles project insights software engineering artificial intelligence research",
    preview: "Technical articles, project insights, and thoughts on software engineering and AI.",
  });

  return searchableItems;
}

const DEFAULT_PREVIEW_LENGTH = 150;
const PREVIEW_WORD_BOUNDARY_SLACK = 30;
const MAX_RESULTS = 8;
const TITLE_MATCH_WEIGHT = 10;
const SECTION_MATCH_WEIGHT = 5;
const CONTENT_MATCH_WEIGHT = 2;

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function createPreview(
  content: string,
  maxLength: number = DEFAULT_PREVIEW_LENGTH,
): string {
  const preview = content.replace(/\n/g, " ").trim();
  if (preview.length <= maxLength) {
    return preview;
  }

  const truncated = preview.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  return lastSpace > maxLength - PREVIEW_WORD_BOUNDARY_SLACK
    ? truncated.substring(0, lastSpace) + "..."
    : truncated + "...";
}

export async function searchJSONContent(
  query: string,
): Promise<SearchResult[]> {
  if (!query.trim()) {
    return [];
  }

  const searchTerms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 1);

  if (searchTerms.length === 0) {
    return [];
  }

  const searchableContent = await getSearchableContent();
  const results: SearchResult[] = [];

  searchableContent.forEach((item) => {
    let score = 0;
    const matchedTerms: string[] = [];

    searchTerms.forEach((term) => {
      if (item.title.toLowerCase().includes(term)) {
        score += TITLE_MATCH_WEIGHT;
        matchedTerms.push(term);
      }
    });

    searchTerms.forEach((term) => {
      const contentLower = item.content.toLowerCase();
      const matches = (contentLower.match(new RegExp(escapeRegExp(term), "g")) || []).length;
      if (matches > 0) {
        score += matches * CONTENT_MATCH_WEIGHT;
        if (!matchedTerms.includes(term)) {
          matchedTerms.push(term);
        }
      }
    });

    if (item.section) {
      searchTerms.forEach((term) => {
        if (item.section!.toLowerCase().includes(term)) {
          score += SECTION_MATCH_WEIGHT;
          if (!matchedTerms.includes(term)) {
            matchedTerms.push(term);
          }
        }
      });
    }

    if (score > 0) {
      let highlightedPreview = item.preview;
      matchedTerms.forEach((term) => {
        const regex = new RegExp(`(${escapeRegExp(term)})`, "gi");
        highlightedPreview = highlightedPreview.replace(
          regex,
          "<mark>$1</mark>",
        );
      });

      results.push({
        ...item,
        score,
        matchedTerms,
        highlightedPreview,
      });
    }
  });

  return results.sort((a, b) => b.score - a.score).slice(0, MAX_RESULTS);
}

const NAV_SUGGESTION_LIMIT = 6;

export async function getJSONNavigationSuggestions(): Promise<
  SearchableContent[]
> {
  const searchableContent = await getSearchableContent();
  return searchableContent
    .filter((item) => item.id.includes("-main"))
    .slice(0, NAV_SUGGESTION_LIMIT);
}
