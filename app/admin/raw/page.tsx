import AdminPageLayout from "@/components/admin/AdminPageLayout";
import AdminArticleHeader from "@/components/admin/AdminArticleHeader";

const mockEvents = [
  { t: "14:02:14", type: "server_hit", vid: "a3f2...b91", path: "/blog/manifesto", country: "US", device: "desktop" },
  { t: "14:02:09", type: "engagement", vid: "8d17...c42", path: "/research", scroll: "87%", time: "4m 12s" },
  { t: "14:01:58", type: "server_hit", vid: "1e9c...f0a", path: "/", country: "DE", device: "mobile" },
  { t: "14:01:51", type: "outbound_click", vid: "a3f2...b91", url: "https://github.com/aneesh6214" },
  { t: "14:01:47", type: "server_hit", vid: "a3f2...b91", path: "/blog/manifesto", country: "US", device: "desktop" },
  { t: "14:01:42", type: "search_query", vid: "8d17...c42", query: "interpretability" },
  { t: "14:01:39", type: "server_hit", vid: "7b2d...e55", path: "/projects", country: "GB", device: "desktop" },
  { t: "14:01:33", type: "server_hit", vid: "8d17...c42", path: "/research", country: "US", device: "desktop" },
  { t: "14:01:28", type: "engagement", vid: "7b2d...e55", path: "/", scroll: "54%", time: "32s" },
  { t: "14:01:22", type: "server_hit", vid: "f91a...2cd", path: "/", country: "CA", device: "mobile" },
];

export default function AdminRawPage() {
  return (
    <AdminPageLayout currentWindow="30d">
      <AdminArticleHeader title="aneeshkumar.com" activeTab="raw" />

      <article className="px-4 sm:px-6 py-4 text-[#202122]">
        <div className="text-sm italic text-gray-600 mb-4 pl-6 border-l-2 border-[#eaecf0]">
          Raw event stream. This is the underlying data that the main
          dashboard aggregates. Sorted newest-first.
        </div>

        <div className="border border-[#a2a9b1] bg-[#f8f9fa]">
          <div className="bg-[#eaecf0] border-b border-[#a2a9b1] px-3 py-1.5 text-xs font-mono flex justify-between">
            <span>tail -f events</span>
            <span className="text-gray-500">last 100 events</span>
          </div>
          <div className="font-mono text-xs text-[#202122] bg-white p-3 space-y-1 max-h-[70vh] overflow-y-auto">
            {mockEvents.map((e, i) => (
              <div key={i} className="flex gap-3 hover:bg-[#f8f9fa] px-1 py-0.5">
                <span className="text-gray-500 shrink-0">{e.t}</span>
                <span
                  className={`shrink-0 w-32 ${
                    e.type === "server_hit"
                      ? "text-[#3366cc]"
                      : e.type === "engagement"
                        ? "text-[#14866d]"
                        : e.type === "outbound_click"
                          ? "text-[#7e57c2]"
                          : e.type === "search_query"
                            ? "text-[#b37d00]"
                            : "text-[#b32424]"
                  }`}
                >
                  {e.type}
                </span>
                <span className="text-gray-500 shrink-0 w-20">{e.vid}</span>
                <span className="text-[#202122] break-all">
                  {e.path && `path=${e.path}  `}
                  {e.country && `geo=${e.country}  `}
                  {e.device && `device=${e.device}  `}
                  {e.scroll && `scroll=${e.scroll}  `}
                  {e.time && `time=${e.time}  `}
                  {e.url && `url=${e.url}  `}
                  {e.query && `query="${e.query}"  `}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-600 italic mt-4">
          Equivalent to <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0]">
            select * from server_hits union all select * from client_events order
            by created_at desc limit 100
          </code>
          .
        </p>
      </article>
    </AdminPageLayout>
  );
}
