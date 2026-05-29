import WorkCatalogueContent from "@/components/WorkCatalogueContent";
import WikiArticlePage from "@/components/WikiArticlePage";
import { getJSONContent } from "@/lib/json-content";

export default async function MediaPage() {
  const content = await getJSONContent("media");

  return (
    <WikiArticlePage currentPath="/media" content={content}>
      <WorkCatalogueContent content={content} />
    </WikiArticlePage>
  );
}
