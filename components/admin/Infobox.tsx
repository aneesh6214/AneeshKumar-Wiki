import { summary, formatNumber, formatPercent } from "@/lib/admin/mock-data";

const rows: { label: string; value: string }[] = [
  { label: "Type", value: "Personal portfolio" },
  { label: "Launched", value: summary.launched },
  { label: "Window", value: "Last 30 days" },
  { label: "Pageviews", value: formatNumber(summary.totalPageviews) },
  { label: "Unique visitors", value: formatNumber(summary.uniqueVisitors) },
  { label: "Sessions", value: formatNumber(summary.sessions) },
  {
    label: "Avg. session",
    value: `${summary.avgSessionMinutes.toFixed(1)} min`,
  },
  { label: "Bounce rate", value: formatPercent(summary.bounceRate, 0) },
  {
    label: "Top country",
    value: `${summary.topCountry} (${formatPercent(summary.topCountryShare, 0)})`,
  },
  {
    label: "Top page",
    value: summary.topPageTitle,
  },
  { label: "Last refresh", value: summary.lastRefresh },
];

export default function Infobox() {
  return (
    <aside className="w-full sm:w-[300px] sm:float-right sm:ml-6 sm:mb-4 mb-6 border border-[#a2a9b1] bg-[#f8f9fa] text-sm">
      <div className="bg-[#eaecf0] border-b border-[#a2a9b1] px-3 py-2 text-center">
        <div className="font-serif text-base font-bold text-[#202122]">
          aneeshkumar.com
        </div>
        <div className="text-xs text-gray-600 italic">Observability summary</div>
      </div>

      <div className="px-3 py-3 border-b border-[#a2a9b1] bg-white">
        <div className="w-full h-24 border border-[#a2a9b1] bg-gradient-to-br from-[#f8f9fa] to-[#eaecf0] flex items-center justify-center">
          <div className="text-center">
            <div
              className="text-2xl font-bold text-[#202122]"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              W
            </div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">
              screenshot
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-600 mt-2 text-center italic leading-snug">
          A screenshot of the home page, captured at 14:02 UTC.
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

      <div className="bg-[#eaecf0] border-t border-[#a2a9b1] px-3 py-1.5 text-center text-xs">
        <a href="#" className="text-blue-600 hover:underline">
          refresh
        </a>
        <span className="text-gray-400 mx-1">·</span>
        <a href="#" className="text-blue-600 hover:underline">
          export
        </a>
        <span className="text-gray-400 mx-1">·</span>
        <a href="#" className="text-blue-600 hover:underline">
          reset
        </a>
      </div>
    </aside>
  );
}
