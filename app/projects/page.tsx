import WorkCatalogueContent from "@/components/WorkCatalogueContent";
import WikiArticlePage from "@/components/WikiArticlePage";
import { getJSONContent } from "@/lib/json-content";

export default async function ProjectsPage() {
  const content = await getJSONContent("projects");

  return (
    <WikiArticlePage currentPath="/projects" content={content}>
      <WorkCatalogueContent content={content} />
    </WikiArticlePage>
  );
}
