import AdminPageLayout from "@/components/admin/AdminPageLayout";
import AdminArticleHeader from "@/components/admin/AdminArticleHeader";
import LiveVisitorsTable from "@/components/admin/LiveVisitorsTable";
import { getLiveVisitors } from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

export default async function AdminLivePage() {
  const initial = await getLiveVisitors();
  return (
    <AdminPageLayout currentWindow="30d">
      <AdminArticleHeader title="aneeshkumar.com" activeTab="live" />

      <article className="px-4 sm:px-6 py-4 text-[#202122]">
        <div className="text-sm italic text-gray-600 mb-4 pl-6 border-l-2 border-[#eaecf0]">
          Live view. Visitors active in the last 5 minutes.
        </div>
        <LiveVisitorsTable initial={initial} />
        <p className="text-xs text-gray-600 italic mt-4">
          Visitor IDs are truncated for display. A visitor is considered
          &ldquo;active&rdquo; if their last recorded event is within the last
          5 minutes.
        </p>
      </article>
    </AdminPageLayout>
  );
}
