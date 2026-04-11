"use client";

import Link from "next/link";
import WikiTable, { WikiColumn } from "@/components/admin/WikiTable";
import { formatNumber, formatDuration } from "@/lib/admin/format";
import type { TopPage } from "@/lib/admin/queries";

type PageRow = TopPage & { rank: number };

const columns: WikiColumn<PageRow>[] = [
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

export default function TopPagesTable({ data }: { data: TopPage[] }) {
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
      columns={columns}
      data={ranked}
      caption="Table 1. Top pages by views in the current window, with engagement metrics. Click a column header to sort."
      defaultSort={{ key: "views", direction: "desc" }}
    />
  );
}
