"use client";

import WikiTable, { WikiColumn } from "@/components/admin/WikiTable";
import { AdminEmptyState } from "@/components/admin/AdminPrimitives";
import { formatNumber, formatPercent } from "@/lib/admin/format";
import type { CountryRow } from "@/lib/admin/queries";

const columns: WikiColumn<CountryRow>[] = [
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

export default function CountriesTable({ data }: { data: CountryRow[] }) {
  if (data.length === 0) {
    return (
      <AdminEmptyState>
        No geolocation data yet. Country is only recorded for requests served by Vercel&apos;s edge network; local-dev requests do not populate this field.
      </AdminEmptyState>
    );
  }
  return (
    <WikiTable
      columns={columns}
      data={data}
      caption="Table 5. Visits by country in the current window."
      defaultSort={{ key: "visits", direction: "desc" }}
    />
  );
}
