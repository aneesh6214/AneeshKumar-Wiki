"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import BlogFilters, {
  BlogFilterState,
  initialFilterState,
} from "./BlogFilters";
import { BlogPost, BlogTopic } from "@/lib/blog-content";

interface BlogListProps {
  posts: BlogPost[];
}

function TopicBadge({ topic }: { topic: BlogTopic }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 border border-gray-300 rounded text-gray-700">
      {topic}
    </span>
  );
}

export default function BlogList({ posts }: BlogListProps) {
  const [filters, setFilters] = useState<BlogFilterState>(initialFilterState);

  // Get all unique topics from posts
  const availableTopics = useMemo(() => {
    const topicsSet = new Set<BlogTopic>();
    posts.forEach((post) => {
      post.topics.forEach((topic) => topicsSet.add(topic));
    });
    return Array.from(topicsSet).sort();
  }, [posts]);

  // Get date range from posts
  const dateRange = useMemo(() => {
    if (posts.length === 0) {
      const now = new Date();
      return { min: now, max: now };
    }
    const dates = posts.map((post) => new Date(post.date).getTime());
    return {
      min: new Date(Math.min(...dates)),
      max: new Date(Math.max(...dates)),
    };
  }, [posts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter((post) =>
        post.title.toLowerCase().includes(query)
      );
    }

    // Filter by topics
    if (filters.selectedTopics.length > 0) {
      result = result.filter((post) =>
        filters.selectedTopics.some((topic) => post.topics.includes(topic))
      );
    }

    // Filter by date range
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      result = result.filter((post) => new Date(post.date) >= fromDate);
    }
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      result = result.filter((post) => new Date(post.date) <= toDate);
    }

    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return result;
  }, [posts, filters]);

  const hasActiveFilters =
    filters.searchQuery ||
    filters.selectedTopics.length > 0 ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <>
      {/* Header with Article tab and Filter button */}
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between border-b border-gray-300">
          <button className="pb-2 border-b-2 border-black font-medium">
            Article
          </button>
          <BlogFilters
            onFiltersChange={setFilters}
            availableTopics={availableTopics}
            dateRange={dateRange}
          />
        </div>

        {/* Article description */}
        <p className="text-xs italic mt-3 mb-4 text-gray-600">
          This is the blog of <Link href="/" className="text-blue-600 hover:underline">Aneesh Kumar</Link>. For general information, visit the{" "}
          <Link href="/" className="text-blue-600 hover:underline">Home Page</Link>.
        </p>
      </div>

      <div className="px-4 sm:px-6">
        {/* Active filters summary */}
        {hasActiveFilters && (
          <div className="text-sm text-gray-600 mb-4">
            Showing {filteredPosts.length} of {posts.length} posts
            {filters.searchQuery && (
              <span>
                {" "}
                matching "<strong>{filters.searchQuery}</strong>"
              </span>
            )}
            {filters.selectedTopics.length > 0 && (
              <span> in {filters.selectedTopics.join(", ")}</span>
            )}
          </div>
        )}

        {/* Blog Posts Table */}
        <div className="border border-gray-300 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="text-left px-4 py-2 font-semibold text-gray-900">
                  Title
                </th>
                <th className="text-left px-4 py-2 font-semibold text-gray-900 hidden sm:table-cell">
                  Date
                </th>
                <th className="text-left px-4 py-2 font-semibold text-gray-900 hidden md:table-cell">
                  Topics
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post, index) => (
                <tr
                  key={post.slug}
                  className={`${index !== filteredPosts.length - 1 ? "border-b border-gray-200" : ""} hover:bg-gray-50 transition-colors`}
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {post.title}
                    </Link>
                    {/* Mobile: show date below title */}
                    <div className="text-xs text-gray-500 mt-1 sm:hidden">
                      {post.date}
                    </div>
                    {/* Mobile: show topics below */}
                    <div className="flex flex-wrap gap-1 mt-2 md:hidden">
                      {post.topics.map((topic) => (
                        <TopicBadge key={topic} topic={topic} />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden sm:table-cell whitespace-nowrap">
                    {post.date}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {post.topics.map((topic) => (
                        <TopicBadge key={topic} topic={topic} />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-8 text-gray-500 border border-gray-300 border-t-0 rounded-b">
            {hasActiveFilters
              ? "No posts match your filters."
              : "No blog posts yet. Check back soon!"}
          </div>
        )}
      </div>
    </>
  );
}
