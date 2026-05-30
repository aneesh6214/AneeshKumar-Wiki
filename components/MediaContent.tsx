import { mediaShowcaseContent } from "@/content/media";
import type { JSONContent } from "@/lib/json-content";
import MediaCatalogueBrowser from "./MediaCatalogueBrowser";
import { WikiArticleLayout } from "./WikiContent";

interface MediaContentProps {
  content: JSONContent;
}

export default function MediaContent({ content }: MediaContentProps) {
  return (
    <WikiArticleLayout content={content}>
      <MediaCatalogueBrowser showcase={mediaShowcaseContent} />
    </WikiArticleLayout>
  );
}
