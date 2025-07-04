import PageLayout from "@/components/PageLayout"
import ArticleHeader from "@/components/ArticleHeader"
import WikiContent from "@/components/WikiContent"
import { getJSONContent } from "@/lib/json-content"

export default async function ProjectsPage() {
  const content = await getJSONContent('projects')
  
  return (
    <PageLayout currentPath="/projects">
      <ArticleHeader title={content.title} />
      <WikiContent content={content} />
    </PageLayout>
  )
}
