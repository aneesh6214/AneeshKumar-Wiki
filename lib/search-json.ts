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

// Cache for content data
let contentCache: Record<string, JSONContent> | null = null;
let blogPostsCache: Awaited<ReturnType<typeof getAllBlogPosts>> | null = null;

export async function getSearchableContent(): Promise<SearchableContent[]> {
  // Use cache if available
  if (!contentCache) {
    contentCache = await getAllJSONContent();
  }

  const searchableItems: SearchableContent[] = [];

  for (const [slug, content] of Object.entries(contentCache)) {
    // Skip blog page - we'll add individual blog posts separately
    if (slug === "blog") continue;

    const searchableText = extractSearchableText(content);

    // Main page content
    searchableItems.push({
      id: `${slug}-main`,
      title: content.title,
      url: content.url,
      content: searchableText,
      preview: createPreview(searchableText),
    });

    // Extract sections
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

  // Add blog posts as individual searchable items
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

  // Also add the blog listing page
  searchableItems.push({
    id: "blog-main",
    title: "Blog",
    url: "/blog",
    content: "Blog technical articles project insights software engineering artificial intelligence research",
    preview: "Technical articles, project insights, and thoughts on software engineering and AI.",
  });

  return searchableItems;
}

function createPreview(content: string, maxLength: number = 150): string {
  const preview = content.replace(/\n/g, " ").trim();
  if (preview.length <= maxLength) {
    return preview;
  }

  const truncated = preview.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  return lastSpace > maxLength - 30
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

    // Search in title (highest weight)
    searchTerms.forEach((term) => {
      if (item.title.toLowerCase().includes(term)) {
        score += 10;
        matchedTerms.push(term);
      }
    });

    // Search in content
    searchTerms.forEach((term) => {
      const contentLower = item.content.toLowerCase();
      const matches = (contentLower.match(new RegExp(term, "g")) || []).length;
      if (matches > 0) {
        score += matches * 2;
        if (!matchedTerms.includes(term)) {
          matchedTerms.push(term);
        }
      }
    });

    // Search in section title (medium weight)
    if (item.section) {
      searchTerms.forEach((term) => {
        if (item.section!.toLowerCase().includes(term)) {
          score += 5;
          if (!matchedTerms.includes(term)) {
            matchedTerms.push(term);
          }
        }
      });
    }

    // Only include results with matches
    if (score > 0) {
      // Create highlighted preview
      let highlightedPreview = item.preview;
      matchedTerms.forEach((term) => {
        const regex = new RegExp(`(${term})`, "gi");
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

  // Sort by relevance score (descending)
  return results.sort((a, b) => b.score - a.score).slice(0, 8);
}

export async function getJSONNavigationSuggestions(): Promise<
  SearchableContent[]
> {
  const searchableContent = await getSearchableContent();

  // Return main page content (not sections)
  return searchableContent
    .filter((item) => item.id.includes("-main"))
    .slice(0, 6);
}
