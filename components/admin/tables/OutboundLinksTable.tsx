"use client";

import WikiTable, { WikiColumn } from "@/components/admin/WikiTable";
import {
  AdminEmptyState,
  adminLinkClass,
} from "@/components/admin/AdminPrimitives";
import { formatNumber } from "@/lib/admin/format";
import type { OutboundRow } from "@/lib/admin/queries";

const columns: WikiColumn<OutboundRow>[] = [
  {
    key: "url",
    label: "URL",
    sortable: true,
    sortValue: (r) => r.url,
    render: (r) => (
      <a
        href={r.url}
        className={`${adminLinkClass} font-mono text-xs break-all`}
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

export default function OutboundLinksTable({ data }: { data: OutboundRow[] }) {
  if (data.length === 0) {
    return (
      <AdminEmptyState>
        No outbound clicks in this window yet.
      </AdminEmptyState>
    );
  }
  return (
    <WikiTable
      columns={columns}
      data={data}
      caption="Table 2. External links clicked from any page in the current window."
      defaultSort={{ key: "clicks", direction: "desc" }}
    />
  );
}
