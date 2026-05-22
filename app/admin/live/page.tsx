import AdminPageLayout from "@/components/admin/AdminPageLayout";
import AdminArticleHeader from "@/components/admin/AdminArticleHeader";
import {
  AdminArticleBody,
  AdminLeadNote,
} from "@/components/admin/AdminPrimitives";
import LiveVisitorsTable from "@/components/admin/LiveVisitorsTable";
import { adminContent } from "@/content/admin";
import { getLiveVisitors } from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

export default async function AdminLivePage() {
  const initial = await getLiveVisitors();
  return (
    <AdminPageLayout currentWindow="30d" activePath="live">
      <AdminArticleHeader title={adminContent.articleTitle} activeTab="live" />

      <AdminArticleBody>
        <AdminLeadNote>{adminContent.notes.live}</AdminLeadNote>
        <LiveVisitorsTable initial={initial} />
        <p className="text-xs text-gray-600 italic mt-4">
          Visitor IDs are truncated for display. A visitor is considered
          &ldquo;active&rdquo; if their last recorded event is within the last
          5 minutes.
        </p>
      </AdminArticleBody>
    </AdminPageLayout>
  );
}
