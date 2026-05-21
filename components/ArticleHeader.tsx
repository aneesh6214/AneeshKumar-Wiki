import LanguageSelector from "./LanguageSelector";
import { ArticleSourceLine, ArticleTabs } from "./WikiPrimitives";

interface ArticleHeaderProps {
  title: string;
  showLanguageButton?: boolean;
}

export default function ArticleHeader({
  title,
  showLanguageButton = true,
}: ArticleHeaderProps) {
  return (
    <div className="px-4 sm:px-6 pt-4">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="min-w-0 text-2xl sm:text-3xl font-serif text-black">
          {title}
        </h1>
        {showLanguageButton && <LanguageSelector />}
      </div>

      <ArticleSourceLine className="mb-4" />

      <ArticleTabs />
    </div>
  );
}
