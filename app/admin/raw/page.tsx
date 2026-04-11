import AdminPageLayout from "@/components/admin/AdminPageLayout";
import AdminArticleHeader from "@/components/admin/AdminArticleHeader";
import { getRawEvents } from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

const SOURCE_COLORS: Record<string, string> = {
  server_hit: "text-[#3366cc]",
  engagement: "text-[#14866d]",
  outbound: "text-[#7e57c2]",
  search: "text-[#b37d00]",
  error: "text-[#b32424]",
  vitals: "text-[#888]",
};
const DEFAULT_SOURCE_COLOR = "text-[#202122]";

function renderExtras(extras: Record<string, unknown>): string {
  const parts: string[] = [];
  for (const [k, v] of Object.entries(extras)) {
    if (v === null || v === undefined || v === "") continue;
    const val = typeof v === "string" ? v : JSON.stringify(v);
    parts.push(`${k}=${val}`);
  }
  return parts.join("  ");
}

export default async function AdminRawPage() {
  const events = await getRawEvents(100);

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
            <span className="text-gray-500">last {events.length} events</span>
          </div>
          <div className="font-mono text-xs text-[#202122] bg-white p-3 space-y-1 max-h-[70vh] overflow-y-auto">
            {events.length === 0 ? (
              <div className="italic text-gray-600">No events yet.</div>
            ) : (
              events.map((e, i) => (
                <div
                  key={i}
                  className="flex gap-3 hover:bg-[#f8f9fa] px-1 py-0.5"
                >
                  <span className="text-gray-500 shrink-0">{e.at}</span>
                  <span className={`shrink-0 w-32 ${SOURCE_COLORS[e.source] ?? DEFAULT_SOURCE_COLOR}`}>
                    {e.source}
                  </span>
                  <span className="text-gray-500 shrink-0 w-20">
                    {e.vidShort}
                  </span>
                  <span className="text-[#202122] break-all">
                    {e.path && `path=${e.path}  `}
                    {renderExtras(e.extras)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <p className="text-xs text-gray-600 italic mt-4">
          Equivalent to{" "}
          <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0]">
            select * from server_hits union all select * from client_events
            order by created_at desc limit 100
          </code>
          .
        </p>
      </article>
    </AdminPageLayout>
  );
}
