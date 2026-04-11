"use client";

import WikiTable, { WikiColumn } from "@/components/admin/WikiTable";
import { formatNumber } from "@/lib/admin/format";
import type { SearchRow } from "@/lib/admin/queries";

const columns: WikiColumn<SearchRow>[] = [
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

export default function SearchQueriesTable({ data }: { data: SearchRow[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm italic text-gray-600 my-4">
        No on-site searches in this window yet.
      </p>
    );
  }
  return (
    <WikiTable
      columns={columns}
      data={data}
      caption="Table 3. On-site search queries in the current window."
      defaultSort={{ key: "count", direction: "desc" }}
    />
  );
}
