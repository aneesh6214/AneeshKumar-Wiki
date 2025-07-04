import PageLayout from "@/components/PageLayout"
import ArticleHeader from "@/components/ArticleHeader"
import WikiContent from "@/components/WikiContent"
import { getJSONContent } from "@/lib/json-content"

export default async function WikipediaStyleKB() {
  const content = await getJSONContent('home')

  return (
    <PageLayout currentPath="/">
      <ArticleHeader title={content.title} />
      <WikiContent content={content} />
    </PageLayout>
  )
}
