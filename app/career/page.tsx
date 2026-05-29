import ProfessionalWorkTabs from "@/components/ProfessionalWorkTabs";
import WikiArticlePage from "@/components/WikiArticlePage";
import { getJSONContent } from "@/lib/json-content";

export default async function CareerPage() {
  const content = await getJSONContent("career");

  return (
    <WikiArticlePage currentPath="/career" content={content}>
      <ProfessionalWorkTabs content={content} />
    </WikiArticlePage>
  );
}
