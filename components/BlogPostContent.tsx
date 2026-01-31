import Link from "next/link";
import React from "react";
import { BlogPost, BlogPostSection } from "@/lib/blog-content";

// Subtitle component for use within blog post content
export function Subtitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-base font-semibold underline decoration-1 underline-offset-2 text-gray-900 mt-4 mb-0">
      {children}
    </h4>
  );
}

// Component to parse JSX content with embedded markdown-style links
function ParsedContent({ children }: { children: React.ReactNode }) {
  const transformNode = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === "string") {
      return parseText(node);
    }

    if (React.isValidElement(node)) {
      const newChildren =
        React.Children.map(node.props.children, transformNode) || [];
      return React.cloneElement(node, node.props, ...newChildren);
    }

    return node;
  };

  return <>{transformNode(children)}</>;
}

// Parser function for Wikipedia-style links in text
function parseText(text: string): React.ReactNode {
  if (!text) return text;

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = text.split(linkRegex);

  const elements: React.ReactNode[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (i % 3 === 0) {
      if (part) elements.push(part);
    } else if (i % 3 === 1) {
      const linkText = part;
      const linkUrl = parts[i + 1];
      elements.push(
        <Link
          key={`link-${i}`}
          href={linkUrl}
          className="text-blue-600 hover:underline"
        >
          {linkText}
        </Link>
      );
    }
  }

  return elements.length === 1 ? elements[0] : elements;
}

interface BlogSectionProps {
  section: BlogPostSection;
  isFirst: boolean;
}

function BlogSection({ section, isFirst }: BlogSectionProps) {
  const id = section.title
    ? section.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    : undefined;

  return (
    <div className={`${isFirst ? "" : "mt-6"}`}>
      {section.title && (
        <h2
          id={id}
          className="text-xl font-bold mb-2 border-b border-gray-300 pb-1"
        >
          {section.title}
        </h2>
      )}
      <div className="text-gray-900 leading-relaxed text-sm [&>p]:mb-3 [&>p:last-child]:mb-0">
        <ParsedContent>{section.content}</ParsedContent>
      </div>
    </div>
  );
}

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <div className="px-4 sm:px-6 pt-3 pb-12">
      <article>
        {post.sections.map((section, index) => (
          <BlogSection key={index} section={section} isFirst={index === 0} />
        ))}
      </article>
    </div>
  );
}
