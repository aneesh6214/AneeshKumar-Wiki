import type { AdminSummary } from "@/lib/admin/queries";
import { formatNumber, formatPercent, formatDuration } from "@/lib/admin/format";
import { adminContent } from "@/content/admin";

interface InfoboxProps {
  summary: AdminSummary;
  windowLabel: string;
}

export default function Infobox({ summary, windowLabel }: InfoboxProps) {
  const rows: { label: string; value: string }[] = [
    { label: "Type", value: adminContent.infobox.siteType },
    { label: "Launched", value: summary.launched },
    {
      label: "Tracking since",
      value: summary.firstHit
        ? new Date(summary.firstHit).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "—",
    },
    { label: "Window", value: windowLabel },
    { label: "Pageviews", value: formatNumber(summary.totalPageviews) },
    { label: "Unique visitors", value: formatNumber(summary.uniqueVisitors) },
    { label: "Sessions", value: formatNumber(summary.sessions) },
    {
      label: "Avg. session",
      value:
        summary.avgSessionSeconds > 0
          ? formatDuration(Math.round(summary.avgSessionSeconds))
          : "—",
    },
    {
      label: "Bounce rate",
      value:
        summary.bounceRate === null ? "—" : formatPercent(summary.bounceRate, 0),
    },
    {
      label: "Top country",
      value: summary.topCountry
        ? `${summary.topCountry} (${formatPercent(summary.topCountryShare ?? 0, 0)})`
        : "—",
    },
    {
      label: "Top page",
      value: summary.topPageTitle ?? "—",
    },
    {
      label: "Last refresh",
      value:
        new Date(summary.lastRefresh).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "UTC",
        }) + " UTC",
    },
  ];

  return (
    <aside className="w-full sm:w-[300px] sm:float-right sm:ml-6 sm:mb-4 mb-6 border border-[#a2a9b1] bg-[#f8f9fa] text-sm">
      <div className="bg-[#eaecf0] border-b border-[#a2a9b1] px-3 py-2 text-center">
        <div className="font-serif text-base font-bold text-[#202122]">
          {adminContent.infobox.title}
        </div>
        <div className="text-xs text-gray-600 italic">
          {adminContent.infobox.subtitle}
        </div>
      </div>

      <table className="w-full">
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.label}
              className={i % 2 === 0 ? "bg-[#f8f9fa]" : "bg-white"}
            >
              <th className="text-left align-top font-normal text-[#202122] px-3 py-1.5 w-[45%] border-t border-[#eaecf0]">
                {r.label}
              </th>
              <td className="align-top text-[#202122] px-3 py-1.5 border-t border-[#eaecf0]">
                {r.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  );
}
