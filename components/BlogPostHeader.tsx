import Link from "next/link";
import { BlogTopic } from "@/lib/blog-content";

interface BlogPostHeaderProps {
  title: string;
  date: string;
  topics: BlogTopic[];
}

export default function BlogPostHeader({
  title,
  date,
  topics,
}: BlogPostHeaderProps) {
  return (
    <div className="px-4 sm:px-6 pt-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl sm:text-3xl font-serif text-black">{title}</h1>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <div>{date}</div>
        <div className="italic">{topics.join(", ")}</div>
      </div>

      {/* Article Tab and Back Link */}
      <div className="flex items-center justify-between border-b border-gray-300">
        <button className="pb-2 border-b-2 border-black font-medium">
          Article
        </button>
        <Link
          href="/blog"
          className="text-sm text-blue-600 hover:underline pb-2"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
