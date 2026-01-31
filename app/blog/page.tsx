import PageLayout from "@/components/PageLayout";
import BlogList from "@/components/BlogList";
import { getAllBlogPosts } from "@/lib/blog-content";

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <PageLayout currentPath="/blog">
      {/* Custom header without the Article tab (BlogList has its own) */}
      <div className="px-4 sm:px-6 pt-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl sm:text-3xl font-serif text-black">Blog</h1>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          From Wikipedia, the free encyclopedia
        </div>
      </div>

      <BlogList posts={posts} />
    </PageLayout>
  );
}
