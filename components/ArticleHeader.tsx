import LanguageSelector from "./LanguageSelector";

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

      <div className="text-sm text-gray-600 mb-4">
        From Kumarpedia, the free encyclopedia
      </div>

      {/* Simplified Article Tab */}
      <div className="flex items-center gap-6 border-b border-gray-300">
        <button className="pb-2 border-b-2 border-black font-medium">
          Article
        </button>
      </div>
    </div>
  );
}
