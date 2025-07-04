import { NextRequest, NextResponse } from 'next/server'
import { searchJSONContent, getJSONNavigationSuggestions } from '@/lib/search-json'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  
  try {
    if (query && query.trim()) {
      const results = await searchJSONContent(query)
      return NextResponse.json(results)
    } else {
      const suggestions = await getJSONNavigationSuggestions()
      return NextResponse.json(suggestions.map(item => ({
        ...item,
        score: 0,
        matchedTerms: [],
        highlightedPreview: item.preview
      })))
    }
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}