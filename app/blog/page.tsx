import PageLayout from "@/components/PageLayout"
import ArticleHeader from "@/components/ArticleHeader"
import WikiContent from "@/components/WikiContent"
import { getJSONContent } from "@/lib/json-content"

export default async function BlogPage() {
  const content = await getJSONContent('blog')
  
  return (
    <PageLayout currentPath="/blog">
      <ArticleHeader title={content.title} />
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center mx-4 sm:mx-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Work in Progress</h2>
        <div className="prose prose-sm max-w-none text-center">
          <WikiContent content={content} />
        </div>
      </div>
    </PageLayout>
  )
}
