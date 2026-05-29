import type { ReactNode } from "react";
import type { JSONContent } from "@/lib/json-content";
import ArticleHeader from "./ArticleHeader";
import PageLayout from "./PageLayout";

interface WikiArticlePageProps {
  children: ReactNode;
  content: JSONContent;
  currentPath: string;
}

export default function WikiArticlePage({
  children,
  content,
  currentPath,
}: WikiArticlePageProps) {
  return (
    <PageLayout currentPath={currentPath} content={content}>
      <ArticleHeader title={content.title} />
      {children}
    </PageLayout>
  );
}
