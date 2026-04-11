import { BlogContent } from "@/lib/blog-content";
import { JSONContent } from "@/lib/json-content";
import { manifestoPost } from "./blog/manifesto";

export const blogPosts: BlogContent = {
  posts: [manifestoPost],
};

export const blogContent: JSONContent = {
  title: "Blog",
  subtitle: "Technical Writing and Thoughts",
  description: "Personal blog and technical articles",
  url: "/blog",
  sections: blogPosts.posts.map((post) => ({
    title: post.title,
    date: post.date,
    description: post.searchableContent || `${post.topics.join(", ")} - ${post.date}`,
  })),
};
