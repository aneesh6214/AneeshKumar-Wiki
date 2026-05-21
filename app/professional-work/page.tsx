import PageLayout from "@/components/PageLayout";
import ArticleHeader from "@/components/ArticleHeader";
import ProfessionalWorkTabs from "@/components/ProfessionalWorkTabs";
import { WikiInfobox } from "@/components/WikiContent";
import { siteContent } from "@/content/site";
import { getJSONContent } from "@/lib/json-content";

export default async function ProfessionalWorkPage() {
  const content = await getJSONContent("professional-work");

  return (
    <PageLayout currentPath="/professional-work" content={content}>
      <ArticleHeader title={content.title} />
      <ProfessionalWorkTabs
        content={content}
        sidePanel={
          content.infobox ? (
            <aside className="lg:w-80 lg:flex-shrink-0">
              <WikiInfobox
                infobox={content.infobox}
                title={content.infoboxTitle || siteContent.infobox.defaultTitle}
              />
            </aside>
          ) : null
        }
      />
    </PageLayout>
  );
}
