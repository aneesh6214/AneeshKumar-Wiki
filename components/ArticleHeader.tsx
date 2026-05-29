import { ArticleSourceLine, ArticleTabs } from "./WikiPrimitives";

interface ArticleHeaderProps {
  title: string;
}

export default function ArticleHeader({ title }: ArticleHeaderProps) {
  return (
    <div className="px-4 sm:px-6 pt-4">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="min-w-0 text-2xl sm:text-3xl font-serif text-black">
          {title}
        </h1>
      </div>

      <ArticleSourceLine className="mb-4" />

      <ArticleTabs />
    </div>
  );
}
