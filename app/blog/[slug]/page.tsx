import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import BlogPostHeader from "@/components/BlogPostHeader";
import BlogPostContent from "@/components/BlogPostContent";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-content";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <PageLayout currentPath="/blog">
      <BlogPostHeader title={post.title} date={post.date} topics={post.topics} />
      <BlogPostContent post={post} />
    </PageLayout>
  );
}
