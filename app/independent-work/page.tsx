import PageLayout from "@/components/PageLayout";
import ArticleHeader from "@/components/ArticleHeader";
import WorkCatalogueContent from "@/components/WorkCatalogueContent";
import { getJSONContent } from "@/lib/json-content";

export default async function IndependentWorkPage() {
  const content = await getJSONContent("independent-work");

  return (
    <PageLayout currentPath="/independent-work" content={content}>
      <ArticleHeader title={content.title} />
      <WorkCatalogueContent content={content} />
    </PageLayout>
  );
}
