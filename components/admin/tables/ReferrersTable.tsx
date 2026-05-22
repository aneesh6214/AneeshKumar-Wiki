"use client";

import WikiTable, { WikiColumn } from "@/components/admin/WikiTable";
import { AdminEmptyState } from "@/components/admin/AdminPrimitives";
import { formatNumber, formatPercent } from "@/lib/admin/format";
import type { TopReferrer } from "@/lib/admin/queries";

const columns: WikiColumn<TopReferrer>[] = [
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

export default function ReferrersTable({ data }: { data: TopReferrer[] }) {
  if (data.length === 0) {
    return (
      <AdminEmptyState>
        No referrer data in this window yet.
      </AdminEmptyState>
    );
  }
  return (
    <WikiTable
      columns={columns}
      data={data}
      caption="Table 4. Top referrer sources grouped into buckets (search / direct / social / other). Direct is inflated by browsers that strip referrer headers."
      defaultSort={{ key: "visits", direction: "desc" }}
    />
  );
}
