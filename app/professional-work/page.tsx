import PageLayout from "@/components/PageLayout";
import DossierContent from "@/components/DossierContent";
import ProfessionalWorkTabs from "@/components/ProfessionalWorkTabs";
import { WikiInfobox } from "@/components/WikiContent";
import { getJSONContent } from "@/lib/json-content";

export default async function ProfessionalWorkPage() {
  const content = await getJSONContent("professional-work");
  const employmentContent = {
    ...content,
    sections: content.sections.filter((section) => section.subsections?.length),
  };

  return (
    <PageLayout currentPath="/professional-work">
      <ProfessionalWorkTabs
        title={content.title}
        employment={
          <DossierContent
            embedded
            content={employmentContent}
            showDisambiguation={false}
            showInfobox={false}
            showMetaPanels={false}
            technologyPlacement="inline-role"
          />
        }
        sidePanel={
          content.infobox ? (
            <aside className="lg:w-80 lg:flex-shrink-0">
              <WikiInfobox infobox={content.infobox} title="Aneesh Kumar" />
            </aside>
          ) : null
        }
      />
    </PageLayout>
  );
}
