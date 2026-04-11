// lib/analytics/referrer.ts
// Bucketise a raw document.referrer value. Matches the taxonomy shown on
// the admin dashboard: search / social / direct / other.

const SEARCH_HOSTS = new Set([
  "google.com", "www.google.com",
  "bing.com", "www.bing.com",
  "duckduckgo.com", "www.duckduckgo.com",
  "search.yahoo.com", "yahoo.com",
  "search.brave.com", "brave.com",
  "ecosia.org", "www.ecosia.org",
  "kagi.com", "www.kagi.com",
]);

const SOCIAL_HOSTS = new Set([
  "news.ycombinator.com",
  "twitter.com", "x.com", "t.co",
  "linkedin.com", "www.linkedin.com", "lnkd.in",
  "github.com", "www.github.com",
  "reddit.com", "www.reddit.com", "old.reddit.com",
  "facebook.com", "www.facebook.com", "m.facebook.com",
  "bsky.app",
  "mastodon.social",
  "threads.net",
]);

export interface BucketedReferrer {
  source: string;   // hostname or "(direct)"
  bucket: "search" | "social" | "direct" | "other";
}

export function bucketReferrer(raw: string | null | undefined, selfHost: string): BucketedReferrer {
  if (!raw) return { source: "(direct)", bucket: "direct" };
  let host: string;
  try {
    host = new URL(raw).hostname.toLowerCase();
  } catch {
    return { source: "(direct)", bucket: "direct" };
  }
  if (host === selfHost || host === `www.${selfHost}`) {
    return { source: "(direct)", bucket: "direct" };
  }
  if (SEARCH_HOSTS.has(host)) return { source: host, bucket: "search" };
  if (SOCIAL_HOSTS.has(host)) return { source: host, bucket: "social" };
  return { source: host, bucket: "other" };
}
