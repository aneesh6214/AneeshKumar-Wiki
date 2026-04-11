"use client";

import Link from "next/link";
import WikiTable, { WikiColumn } from "@/components/admin/WikiTable";
import { formatNumber, formatPercent, formatDuration } from "@/lib/admin/format";
import type {
  TopPage,
  TopReferrer,
  CountryRow,
  SearchRow,
  OutboundRow,
} from "@/lib/admin/queries";

// ---------- Top Pages ----------

type PageRow = TopPage & { rank: number };

const pageCols: WikiColumn<PageRow>[] = [
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
    render: (r) => (r.avgScroll > 0 ? `${r.avgScroll}%` : "—"),
  },
  {
    key: "time",
    label: "Avg. time",
    align: "right",
    sortable: true,
    sortValue: (r) => r.avgTimeSec,
    render: (r) => (r.avgTimeSec > 0 ? formatDuration(r.avgTimeSec) : "—"),
  },
];

export function TopPagesTable({ data }: { data: TopPage[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm italic text-gray-600 my-4">
        No pageviews in this window yet.
      </p>
    );
  }
  const ranked: PageRow[] = data.map((p, i) => ({ ...p, rank: i + 1 }));
  return (
    <WikiTable
      columns={pageCols}
      data={ranked}
      caption="Table 1. Top pages by views in the current window, with engagement metrics. Click a column header to sort."
      defaultSort={{ key: "views", direction: "desc" }}
    />
  );
}

// ---------- Referrers ----------

const refCols: WikiColumn<TopReferrer>[] = [
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

export function ReferrersTable({ data }: { data: TopReferrer[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm italic text-gray-600 my-4">
        No referrer data in this window yet.
      </p>
    );
  }
  return (
    <WikiTable
      columns={refCols}
      data={data}
      caption="Table 4. Top referrer sources grouped into buckets (search / direct / social / other). Direct is inflated by browsers that strip referrer headers."
      defaultSort={{ key: "visits", direction: "desc" }}
    />
  );
}

// ---------- Searches ----------

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

export function SearchQueriesTable({ data }: { data: SearchRow[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm italic text-gray-600 my-4">
        No on-site searches in this window yet.
      </p>
    );
  }
  return (
    <WikiTable
      columns={searchCols}
      data={data}
      caption="Table 3. On-site search queries in the current window."
      defaultSort={{ key: "count", direction: "desc" }}
    />
  );
}

// ---------- Outbound ----------

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

export function OutboundLinksTable({ data }: { data: OutboundRow[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm italic text-gray-600 my-4">
        No outbound clicks in this window yet.
      </p>
    );
  }
  return (
    <WikiTable
      columns={outboundCols}
      data={data}
      caption="Table 2. External links clicked from any page in the current window."
      defaultSort={{ key: "clicks", direction: "desc" }}
    />
  );
}

// ---------- Countries ----------

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

export function CountriesTable({ data }: { data: CountryRow[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm italic text-gray-600 my-4">
        No geolocation data yet. Country is only recorded for requests served by Vercel&apos;s edge network; local-dev requests do not populate this field.
      </p>
    );
  }
  return (
    <WikiTable
      columns={countryCols}
      data={data}
      caption="Table 5. Visits by country in the current window."
      defaultSort={{ key: "visits", direction: "desc" }}
    />
  );
}
