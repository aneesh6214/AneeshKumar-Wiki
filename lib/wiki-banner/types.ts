export interface WikiBannerPayload {
  title: string;
  extract: string;
  url: string;
  sourceLabel: string;
  displayDate?: string;
  fallback?: boolean;
}

export interface WikiBannerArticle {
  id: string;
  url: string;
  articleTitle: string;
  articleKey: string;
  enabled: boolean;
  createdAt: string;
}
