import WikiContent from "@/components/WikiContent";
import WikiArticlePage from "@/components/WikiArticlePage";
import { getJSONContent } from "@/lib/json-content";

export default async function HomePage() {
  const content = await getJSONContent("home");

  return (
    <WikiArticlePage currentPath="/" content={content}>
      <WikiContent content={content} />
    </WikiArticlePage>
  );
}
