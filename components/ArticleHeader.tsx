interface ArticleHeaderProps {
  title: string
  showLanguageButton?: boolean
}

export default function ArticleHeader({ title, showLanguageButton = true }: ArticleHeaderProps) {
  return (
    <div className="px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl sm:text-3xl font-serif text-black">{title}</h1>
        {showLanguageButton && (
          <div className="flex items-center gap-2 text-sm">
            <button className="flex items-center gap-1 text-blue-600 hover:underline lg:hidden">
              <span className="text-sm">🌐</span>
            </button>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-600 mb-4">From Wikipedia, the free encyclopedia</div>

      {/* Simplified Article Tab */}
      <div className="flex items-center gap-6 border-b border-gray-300 mb-2">
        <button className="pb-2 border-b-2 border-black font-medium">Article</button>
      </div>
    </div>
  )
}