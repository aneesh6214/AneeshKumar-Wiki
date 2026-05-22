import AdminPageLayout from "@/components/admin/AdminPageLayout";
import AdminArticleHeader from "@/components/admin/AdminArticleHeader";
import {
  AdminArticleBody,
  AdminInlineCode,
  AdminLeadNote,
  AdminPanel,
  AdminPanelHeader,
} from "@/components/admin/AdminPrimitives";
import { adminContent } from "@/content/admin";
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
    <AdminPageLayout currentWindow="30d" activePath="raw">
      <AdminArticleHeader title={adminContent.articleTitle} activeTab="raw" />

      <AdminArticleBody>
        <AdminLeadNote>{adminContent.notes.raw}</AdminLeadNote>

        <AdminPanel>
          <AdminPanelHeader mono meta={`last ${events.length} events`}>
            tail -f events
          </AdminPanelHeader>
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
        </AdminPanel>

        <p className="text-xs text-gray-600 italic mt-4">
          Equivalent to{" "}
          <AdminInlineCode>
            select * from server_hits union all select * from client_events
            order by created_at desc limit 100
          </AdminInlineCode>
          .
        </p>
      </AdminArticleBody>
    </AdminPageLayout>
  );
}
