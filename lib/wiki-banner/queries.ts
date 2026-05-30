import { getSupabase } from "@/lib/supabase/server";
import type { WikiBannerArticle, WikiBannerPayload } from "./types";

interface WikiBannerArticleRow {
  id: string;
  url: string;
  article_title: string;
  article_key: string;
  enabled: boolean;
  created_at: string;
}

interface WikiBannerDailyPickRow {
  display_date: string;
  article_id: string;
  created_at: string;
}

interface WikipediaSummaryResponse {
  title?: string;
  extract?: string;
  content_urls?: {
    desktop?: {
      page?: string;
    };
  };
}

export interface CreateWikiBannerArticleResult {
  article: WikiBannerArticle | null;
  status: "created" | "duplicate" | "restored";
}

const PACIFIC_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "2-digit",
  timeZone: "America/Los_Angeles",
  year: "numeric",
});

function mapArticle(row: WikiBannerArticleRow): WikiBannerArticle {
  return {
    id: row.id,
    url: row.url,
    articleTitle: row.article_title,
    articleKey: row.article_key,
    enabled: row.enabled,
    createdAt: row.created_at,
  };
}

function pacificDisplayDate(): string {
  const parts = PACIFIC_DATE_FORMATTER.formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function articleTitleForDisplay(articleTitle: string): string {
  return articleTitle.replace(/_/g, " ");
}

function canonicalWikipediaUrl(articleTitle: string): string {
  return `https://en.wikipedia.org/wiki/${articleTitle
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
}

export function parseWikipediaArticleUrl(input: string): {
  articleKey: string;
  articleTitle: string;
  url: string;
} {
  let parsed: URL;

  try {
    parsed = new URL(input.trim());
  } catch {
    throw new Error("Enter a valid Wikipedia article URL.");
  }

  if (parsed.hostname !== "en.wikipedia.org") {
    throw new Error("Only en.wikipedia.org article URLs are supported.");
  }

  if (!parsed.pathname.startsWith("/wiki/")) {
    throw new Error("Use a Wikipedia article URL such as https://en.wikipedia.org/wiki/Mind.");
  }

  const rawTitle = decodeURIComponent(parsed.pathname.slice("/wiki/".length));
  const articleTitle = rawTitle.trim().replace(/[\s_]+/g, "_");

  if (!articleTitle) {
    throw new Error("The Wikipedia article URL is missing a page title.");
  }

  return {
    articleKey: articleTitle.toLowerCase(),
    articleTitle,
    url: canonicalWikipediaUrl(articleTitle),
  };
}

export async function getAdminWikiBannerArticles(): Promise<WikiBannerArticle[]> {
  const { data, error } = await getSupabase()
    .from("wiki_banner_articles")
    .select("id, url, article_title, article_key, enabled, created_at")
    .eq("enabled", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return ((data ?? []) as WikiBannerArticleRow[]).map(mapArticle);
}

export async function createWikiBannerArticle(
  url: string,
): Promise<CreateWikiBannerArticleResult> {
  const article = parseWikipediaArticleUrl(url);
  const { data, error } = await getSupabase()
    .from("wiki_banner_articles")
    .insert({
      article_key: article.articleKey,
      article_title: article.articleTitle,
      url: article.url,
    })
    .select("id, url, article_title, article_key, enabled, created_at")
    .maybeSingle();

  if (error) {
    if (error.code === "23505") {
      const { data: existing, error: findError } = await getSupabase()
        .from("wiki_banner_articles")
        .select("id, url, article_title, article_key, enabled, created_at")
        .eq("article_key", article.articleKey)
        .maybeSingle();

      if (findError) throw findError;
      if (!existing) return { article: null, status: "duplicate" };

      const existingArticle = mapArticle(existing as WikiBannerArticleRow);
      if (existingArticle.enabled) {
        return { article: existingArticle, status: "duplicate" };
      }

      const { data: restored, error: restoreError } = await getSupabase()
        .from("wiki_banner_articles")
        .update({ enabled: true, updated_at: new Date().toISOString() })
        .eq("id", existingArticle.id)
        .select("id, url, article_title, article_key, enabled, created_at")
        .maybeSingle();

      if (restoreError) throw restoreError;
      return {
        article: restored ? mapArticle(restored as WikiBannerArticleRow) : null,
        status: "restored",
      };
    }

    throw error;
  }

  return {
    article: data ? mapArticle(data as WikiBannerArticleRow) : null,
    status: "created",
  };
}

export async function getTodayWikiBannerArticle(): Promise<WikiBannerArticle | null> {
  return getPickArticle(pacificDisplayDate());
}

export async function removeWikiBannerArticle(id: string): Promise<void> {
  const displayDate = pacificDisplayDate();
  const { error: updateError } = await getSupabase()
    .from("wiki_banner_articles")
    .update({ enabled: false, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (updateError) throw updateError;

  const { error: deleteError } = await getSupabase()
    .from("wiki_banner_daily_picks")
    .delete()
    .eq("display_date", displayDate)
    .eq("article_id", id);

  if (deleteError) throw deleteError;
}

export async function setTodayWikiBannerArticle(id: string): Promise<void> {
  const displayDate = pacificDisplayDate();
  const { error: enableError } = await getSupabase()
    .from("wiki_banner_articles")
    .update({ enabled: true, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (enableError) throw enableError;

  const { error: pickError } = await getSupabase()
    .from("wiki_banner_daily_picks")
    .upsert(
      {
        article_id: id,
        display_date: displayDate,
      },
      { onConflict: "display_date" },
    );

  if (pickError) throw pickError;
}

async function getPickArticle(displayDate: string): Promise<WikiBannerArticle | null> {
  const { data: pick, error: pickError } = await getSupabase()
    .from("wiki_banner_daily_picks")
    .select("display_date, article_id, created_at")
    .eq("display_date", displayDate)
    .maybeSingle();

  if (pickError) throw pickError;
  if (!pick) return null;

  const { data: article, error: articleError } = await getSupabase()
    .from("wiki_banner_articles")
    .select("id, url, article_title, article_key, enabled, created_at")
    .eq("id", (pick as WikiBannerDailyPickRow).article_id)
    .maybeSingle();

  if (articleError) throw articleError;
  const mappedArticle = article ? mapArticle(article as WikiBannerArticleRow) : null;
  return mappedArticle?.enabled ? mappedArticle : null;
}

async function chooseDailyArticle(displayDate: string): Promise<WikiBannerArticle | null> {
  const existing = await getPickArticle(displayDate);
  if (existing) return existing;

  const { data, error } = await getSupabase()
    .from("wiki_banner_articles")
    .select("id, url, article_title, article_key, enabled, created_at")
    .eq("enabled", true)
    .order("created_at", { ascending: true });

  if (error) throw error;

  const articles = ((data ?? []) as WikiBannerArticleRow[]).map(mapArticle);
  if (articles.length === 0) return null;

  const { data: recentPicks, error: recentError } = await getSupabase()
    .from("wiki_banner_daily_picks")
    .select("display_date, article_id, created_at")
    .order("display_date", { ascending: false })
    .limit(Math.max(0, articles.length - 1));

  if (recentError) throw recentError;

  const recentlyUsed = new Set(
    ((recentPicks ?? []) as WikiBannerDailyPickRow[]).map((pick) => pick.article_id),
  );
  const candidates = articles.filter((article) => !recentlyUsed.has(article.id));
  const pool = candidates.length > 0 ? candidates : articles;
  const selected = pool[Math.floor(Math.random() * pool.length)];

  const { error: insertError } = await getSupabase()
    .from("wiki_banner_daily_picks")
    .upsert(
      {
        article_id: selected.id,
        display_date: displayDate,
      },
      { onConflict: "display_date" },
    );

  if (insertError) {
    if (insertError.code === "23505") {
      return getPickArticle(displayDate);
    }

    throw insertError;
  }

  return selected;
}

async function getWikipediaSummary(
  article: WikiBannerArticle,
): Promise<WikiBannerPayload> {
  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      article.articleTitle,
    )}`,
    {
      headers: {
        "Api-User-Agent": "aneeshkumar.com wiki banner (https://aneeshkumar.com)",
        "User-Agent": "aneeshkumar.com wiki banner (https://aneeshkumar.com)",
      },
      next: { revalidate: 86400 },
    },
  );

  if (!response.ok) {
    throw new Error(`Wikipedia summary request failed with ${response.status}.`);
  }

  const summary = (await response.json()) as WikipediaSummaryResponse;
  const title = summary.title || articleTitleForDisplay(article.articleTitle);
  const extract = summary.extract?.trim();

  if (!extract) {
    throw new Error("Wikipedia summary response did not include an extract.");
  }

  return {
    title,
    extract,
    url: summary.content_urls?.desktop?.page || article.url,
    sourceLabel: "Wikipedia",
  };
}

export async function getDailyWikiBanner(): Promise<WikiBannerPayload | null> {
  const displayDate = pacificDisplayDate();
  const article = await chooseDailyArticle(displayDate);
  if (!article) return null;

  return {
    ...(await getWikipediaSummary(article)),
    displayDate,
  };
}
