import PageLayout from "@/components/PageLayout"
import ArticleHeader from "@/components/ArticleHeader"
import WikiContent from "@/components/WikiContent"
import { getJSONContent } from "@/lib/json-content"

export default async function ContactPage() {
  const content = await getJSONContent('contact')
  
  return (
    <PageLayout currentPath="/contact">
      <ArticleHeader title={content.title} />
      <WikiContent content={content} />
    </PageLayout>
  )
}
