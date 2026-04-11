import React from "react";

export const BLOG_TOPICS = [
  "AI",
  "Machine Learning",
  "Software Engineering",
  "Research",
  "Philosophy",
  "Neuroscience",
  "Tutorial",
  "Career",
  "Projects",
  "Opinion",
] as const;

export type BlogTopic = (typeof BLOG_TOPICS)[number];

export interface BlogPostSection {
  title?: string;
  content: React.ReactNode;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  topics: BlogTopic[];
  sections: BlogPostSection[];
  searchableContent?: string;
}

export interface BlogContent {
  posts: BlogPost[];
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { blogPosts } = await import("../content/blog");
  return blogPosts.posts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}
