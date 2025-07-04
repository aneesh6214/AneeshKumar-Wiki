import PageLayout from "@/components/PageLayout"
import ArticleHeader from "@/components/ArticleHeader"
import WikiContent from "@/components/WikiContent"
import { getJSONContent } from "@/lib/json-content"

export default async function IndustryWorkPage() {
  const content = await getJSONContent('industry-work')
  
  return (
    <PageLayout currentPath="/industry-work">
      <ArticleHeader title={content.title} />
      <WikiContent content={content} />
    </PageLayout>
  )
}
