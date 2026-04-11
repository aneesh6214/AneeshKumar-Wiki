"use client";

import Link from "next/link";
import WikiTable, { WikiColumn } from "@/components/admin/WikiTable";
import {
  formatNumber,
  formatPercent,
  formatDuration,
  topPages,
  topReferrers,
  topSearches,
  topOutbound,
  countries,
} from "@/lib/admin/mock-data";

type PageRow = (typeof topPages)[number] & { rank: number };

const pageColsRanked: WikiColumn<PageRow>[] = [
  {
    key: "rank",
    label: "#",
    align: "right",
    render: (r) => <span className="text-gray-500">{r.rank}</span>,
  },
  {
    key: "page",
    label: "Page",
    sortable: true,
    sortValue: (r) => r.title,
    render: (r) => (
      <span>
        <Link
          href={r.path}
          className="text-blue-600 hover:underline"
          target="_blank"
        >
          {r.title}
        </Link>
        <span className="text-gray-500 text-xs ml-2 font-mono">{r.path}</span>
      </span>
    ),
  },
  {
    key: "views",
    label: "Views",
    align: "right",
    sortable: true,
    sortValue: (r) => r.views,
    render: (r) => formatNumber(r.views),
  },
  {
    key: "scroll",
    label: "Avg. scroll",
    align: "right",
    sortable: true,
    sortValue: (r) => r.avgScroll,
    render: (r) => `${r.avgScroll}%`,
  },
  {
    key: "time",
    label: "Avg. time",
    align: "right",
    sortable: true,
    sortValue: (r) => r.avgTimeSec,
    render: (r) => formatDuration(r.avgTimeSec),
  },
];

export function TopPagesTable() {
  const ranked: PageRow[] = topPages.map((p, i) => ({ ...p, rank: i + 1 }));
  return (
    <WikiTable
      columns={pageColsRanked}
      data={ranked}
      caption="Table 1. Top pages by views over the last 30 days, with engagement metrics. Click a column header to sort."
      defaultSort={{ key: "views", direction: "desc" }}
    />
  );
}

type RefRow = (typeof topReferrers)[number];
const refCols: WikiColumn<RefRow>[] = [
  {
    key: "source",
    label: "Source",
    sortable: true,
    sortValue: (r) => r.source,
    render: (r) => <span className="font-mono text-xs">{r.source}</span>,
  },
  {
    key: "bucket",
    label: "Bucket",
    sortable: true,
    sortValue: (r) => r.bucket,
    render: (r) => <span className="italic">{r.bucket}</span>,
  },
  {
    key: "visits",
    label: "Visits",
    align: "right",
    sortable: true,
    sortValue: (r) => r.visits,
    render: (r) => formatNumber(r.visits),
  },
  {
    key: "share",
    label: "Share",
    align: "right",
    sortable: true,
    sortValue: (r) => r.share,
    render: (r) => formatPercent(r.share, 1),
  },
];

export function ReferrersTable() {
  return (
    <WikiTable
      columns={refCols}
      data={topReferrers}
      caption="Table 4. Top referrer sources grouped into buckets (search / direct / social / other). Direct is inflated by browsers that strip referrer headers."
      defaultSort={{ key: "visits", direction: "desc" }}
    />
  );
}

type SearchRow = (typeof topSearches)[number];
const searchCols: WikiColumn<SearchRow>[] = [
  {
    key: "query",
    label: "Query",
    sortable: true,
    sortValue: (r) => r.query,
    render: (r) => (
      <span className="font-mono text-xs">&ldquo;{r.query}&rdquo;</span>
    ),
  },
  {
    key: "count",
    label: "Count",
    align: "right",
    sortable: true,
    sortValue: (r) => r.count,
    render: (r) => formatNumber(r.count),
  },
];

export function SearchQueriesTable() {
  return (
    <WikiTable
      columns={searchCols}
      data={topSearches}
      caption="Table 3. On-site search queries, last 30 days."
      defaultSort={{ key: "count", direction: "desc" }}
    />
  );
}

type OutboundRow = (typeof topOutbound)[number];
const outboundCols: WikiColumn<OutboundRow>[] = [
  {
    key: "url",
    label: "URL",
    sortable: true,
    sortValue: (r) => r.url,
    render: (r) => (
      <a
        href={r.url}
        className="text-blue-600 hover:underline font-mono text-xs break-all"
        target="_blank"
        rel="noopener noreferrer"
      >
        {r.url}
      </a>
    ),
  },
  {
    key: "clicks",
    label: "Clicks",
    align: "right",
    sortable: true,
    sortValue: (r) => r.clicks,
    render: (r) => formatNumber(r.clicks),
  },
];

export function OutboundLinksTable() {
  return (
    <WikiTable
      columns={outboundCols}
      data={topOutbound}
      caption="Table 2. External links clicked from any page, last 30 days."
      defaultSort={{ key: "clicks", direction: "desc" }}
    />
  );
}

type CountryRow = (typeof countries)[number];
const countryCols: WikiColumn<CountryRow>[] = [
  {
    key: "country",
    label: "Country",
    sortable: true,
    sortValue: (r) => r.country,
    render: (r) => r.country,
  },
  {
    key: "visits",
    label: "Visits",
    align: "right",
    sortable: true,
    sortValue: (r) => r.visits,
    render: (r) => formatNumber(r.visits),
  },
  {
    key: "share",
    label: "Share",
    align: "right",
    sortable: true,
    sortValue: (r) => r.share,
    render: (r) => formatPercent(r.share, 1),
  },
];

export function CountriesTable() {
  return (
    <WikiTable
      columns={countryCols}
      data={countries}
      caption="Table 5. Visits by country, last 30 days."
      defaultSort={{ key: "visits", direction: "desc" }}
    />
  );
}
