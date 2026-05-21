import PageLayout from "@/components/PageLayout";
import ArticleHeader from "@/components/ArticleHeader";
import WorkCatalogueContent from "@/components/WorkCatalogueContent";
import { getJSONContent } from "@/lib/json-content";

export default async function MediaPage() {
  const content = await getJSONContent("media");

  return (
    <PageLayout currentPath="/media">
      <ArticleHeader title={content.title} />
      <WorkCatalogueContent content={content} />
    </PageLayout>
  );
}
