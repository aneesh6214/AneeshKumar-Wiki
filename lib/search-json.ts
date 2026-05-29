import {
  getAllJSONContent,
  extractSearchableText,
  extractSections,
  JSONContent,
} from "./json-content";
import { siteContent } from "@/content/site";

export interface SearchableContent {
  id: string;
  title: string;
  url: string;
  content: string;
  section?: string;
  sectionId?: string;
  preview: string;
}

export interface SearchResult extends SearchableContent {
  score: number;
  matchedTerms: string[];
  highlightedPreview: string;
}

let contentCache: Record<string, JSONContent> | null = null;

function searchDisplayTitle(content: JSONContent): string {
  return (
    siteContent.navigation.find((item) => item.href === content.url)
      ?.sidebarLabel || content.title
  );
}

export async function getSearchableContent(): Promise<SearchableContent[]> {
  if (!contentCache) {
    contentCache = await getAllJSONContent();
  }

  const searchableItems: SearchableContent[] = [];

  for (const [slug, content] of Object.entries(contentCache)) {
    const searchableText = extractSearchableText(content);
    const title = searchDisplayTitle(content);

    searchableItems.push({
      id: `${slug}-main`,
      title,
      url: content.url,
      content: searchableText,
      preview: createPreview(searchableText),
    });

    const sections = extractSections(content);
    sections.forEach((section) => {
      searchableItems.push({
        id: `${slug}-${section.id}`,
        title,
        url: section.url,
        section: section.title,
        sectionId: section.id,
        content: section.content,
        preview: createPreview(section.content),
      });
    });
  }

  return searchableItems;
}

const DEFAULT_PREVIEW_LENGTH = 150;
const MATCH_PREVIEW_LENGTH = 190;
const PREVIEW_WORD_BOUNDARY_SLACK = 30;
const MAX_RESULTS = 8;
const TITLE_MATCH_WEIGHT = 10;
const SECTION_MATCH_WEIGHT = 5;
const CONTENT_MATCH_WEIGHT = 2;

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

function createMatchPreview(
  content: string,
  query: string,
  matchedTerms: string[],
): string {
  const normalized = content.replace(/\s+/g, " ").trim();
  if (normalized.length <= MATCH_PREVIEW_LENGTH) {
    return normalized;
  }

  const lowerContent = normalized.toLowerCase();
  const normalizedQuery = query.trim().replace(/\s+/g, " ");
  const lowerQuery = normalizedQuery.toLowerCase();

  let matchIndex = lowerQuery.length > 1 ? lowerContent.indexOf(lowerQuery) : -1;
  let matchLength = normalizedQuery.length;

  if (matchIndex < 0) {
    for (const term of matchedTerms) {
      const termIndex = lowerContent.indexOf(term.toLowerCase());
      if (termIndex >= 0) {
        matchIndex = termIndex;
        matchLength = term.length;
        break;
      }
    }
  }

  if (matchIndex < 0) {
    return createPreview(normalized, MATCH_PREVIEW_LENGTH);
  }

  const contextBefore = Math.floor((MATCH_PREVIEW_LENGTH - matchLength) / 2);
  let start = Math.max(0, matchIndex - contextBefore);
  let end = Math.min(normalized.length, start + MATCH_PREVIEW_LENGTH);

  if (end - start < MATCH_PREVIEW_LENGTH) {
    start = Math.max(0, end - MATCH_PREVIEW_LENGTH);
  }

  if (start > 0) {
    const nextSpace = normalized.indexOf(" ", start);
    if (nextSpace > 0 && nextSpace < matchIndex) {
      start = nextSpace + 1;
    }
  }

  if (end < normalized.length) {
    const previousSpace = normalized.lastIndexOf(" ", end);
    if (previousSpace > matchIndex + matchLength) {
      end = previousSpace;
    }
  }

  const prefix = start > 0 ? "..." : "";
  const suffix = end < normalized.length ? "..." : "";
  return `${prefix}${normalized.slice(start, end)}${suffix}`;
}

function highlightPreview(
  preview: string,
  query: string,
  matchedTerms: string[],
): string {
  const normalizedQuery = query.trim().replace(/\s+/g, " ");
  const lowerPreview = preview.toLowerCase();
  const phrases =
    normalizedQuery.length > 1 &&
    lowerPreview.includes(normalizedQuery.toLowerCase())
      ? [normalizedQuery]
      : [];
  const patterns = [...phrases, ...matchedTerms].filter(
    (pattern, index, allPatterns) =>
      pattern.length > 1 &&
      allPatterns.findIndex(
        (candidate) => candidate.toLowerCase() === pattern.toLowerCase(),
      ) === index,
  );

  if (patterns.length === 0) {
    return escapeHtml(preview);
  }

  const regex = new RegExp(`(${patterns.map(escapeRegExp).join("|")})`, "gi");
  let cursor = 0;
  let html = "";

  for (const match of preview.matchAll(regex)) {
    const index = match.index ?? 0;
    const value = match[0];
    html += escapeHtml(preview.slice(cursor, index));
    html += `<mark>${escapeHtml(value)}</mark>`;
    cursor = index + value.length;
  }

  html += escapeHtml(preview.slice(cursor));
  return html;
}

function preferredSearchResult(
  current: SearchResult | undefined,
  candidate: SearchResult,
): SearchResult {
  if (!current) return candidate;
  if (candidate.score !== current.score) {
    return candidate.score > current.score ? candidate : current;
  }
  if (candidate.section && !current.section) return candidate;
  if (!candidate.section && current.section) return current;
  return current;
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
  const resultsByUrl = new Map<string, SearchResult>();

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
      const preview = createMatchPreview(item.content, query, matchedTerms);
      const highlightedPreview = highlightPreview(preview, query, matchedTerms);
      const result = {
        ...item,
        preview,
        score,
        matchedTerms,
        highlightedPreview,
      };

      resultsByUrl.set(
        item.url,
        preferredSearchResult(resultsByUrl.get(item.url), result),
      );
    }
  });

  return Array.from(resultsByUrl.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_RESULTS);
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
