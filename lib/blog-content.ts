import React from "react";

// Available topics for blog posts
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
  title?: string; // Section title (with horizontal rule)
  content: React.ReactNode; // Main content, can include subtitles via <Subtitle>
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // Display date like "January 15, 2026"
  topics: BlogTopic[];
  sections: BlogPostSection[];
  searchableContent?: string; // Plain text version for search indexing
}

export interface BlogContent {
  posts: BlogPost[];
}

// Function to get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { blogPosts } = await import("../content/blog");
  return blogPosts.posts;
}

// Function to get a single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}

// Function to get posts filtered by topic
export async function getBlogPostsByTopic(topic: BlogTopic): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.topics.includes(topic));
}

// Function to get all unique topics from existing posts
export async function getUsedTopics(): Promise<BlogTopic[]> {
  const posts = await getAllBlogPosts();
  const topicsSet = new Set<BlogTopic>();
  posts.forEach((post) => {
    post.topics.forEach((topic) => topicsSet.add(topic));
  });
  return Array.from(topicsSet);
}
