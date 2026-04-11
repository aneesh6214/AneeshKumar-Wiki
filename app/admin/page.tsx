import Link from "next/link";
import AdminPageLayout from "@/components/admin/AdminPageLayout";
import AdminArticleHeader from "@/components/admin/AdminArticleHeader";
import Infobox from "@/components/admin/Infobox";
import TableOfContents from "@/components/admin/TableOfContents";
import RefreshButton from "@/components/admin/RefreshButton";
import LeadSection from "@/components/admin/sections/LeadSection";
import TrafficSection from "@/components/admin/sections/TrafficSection";
import ContentSection from "@/components/admin/sections/ContentSection";
import EngagementSection from "@/components/admin/sections/EngagementSection";
import AcquisitionSection from "@/components/admin/sections/AcquisitionSection";
import ClientEnvSection from "@/components/admin/sections/ClientEnvSection";
import OperationalSection from "@/components/admin/sections/OperationalSection";
import MethodologySection from "@/components/admin/sections/MethodologySection";
import SeeAlsoSection from "@/components/admin/sections/SeeAlsoSection";
import ReferencesSection from "@/components/admin/sections/ReferencesSection";
import { parseWindow, type WindowValue } from "@/lib/admin/window";
import {
  getSummary,
  getDailyPageviews,
  getTopPages,
  getTopReferrers,
  getTopSearches,
  getTopOutbound,
  getTopCountries,
  getDevices,
  getBrowsers,
  getOperatingSystems,
  getScrollDepth,
  getPerformance,
  getJsErrors,
} from "@/lib/admin/queries";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ window?: string }>;
}

export default async function AdminDashboardPage({ searchParams }: Props) {
  const params = await searchParams;
  const window = parseWindow(params.window);

  const [
    summary,
    daily,
    topPages,
    referrers,
    searches,
    outbound,
    countries,
    devices,
    browsers,
    os,
    scroll,
    perf,
    errors,
  ] = await Promise.all([
    getSummary(window),
    getDailyPageviews(window),
    getTopPages(window),
    getTopReferrers(window),
    getTopSearches(window),
    getTopOutbound(window),
    getTopCountries(window),
    getDevices(window),
    getBrowsers(window),
    getOperatingSystems(window),
    getScrollDepth(window),
    getPerformance(window),
    getJsErrors(window),
  ]);

  return (
    <AdminPageLayout currentWindow={window.value as WindowValue}>
      <AdminArticleHeader title="aneeshkumar.com" activeTab="dashboard" />

      <article className="px-4 sm:px-6 py-4 text-[#202122] max-w-none">
        <div className="text-sm italic text-gray-600 mb-4 pl-6 border-l-2 border-[#eaecf0]">
          This is the administrator&apos;s private observability dashboard for
          the website. For the public article, see{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          .
        </div>

        <Infobox summary={summary} windowLabel={window.label} />

        <LeadSection summary={summary} window={window} />

        <TableOfContents />

        <TrafficSection summary={summary} daily={daily} window={window} />
        <ContentSection
          topPages={topPages}
          outbound={outbound}
          searches={searches}
        />
        <EngagementSection scroll={scroll} topPages={topPages} />
        <AcquisitionSection referrers={referrers} countries={countries} />
        <ClientEnvSection devices={devices} browsers={browsers} os={os} />
        <OperationalSection perf={perf} errors={errors} />
        <MethodologySection />
        <SeeAlsoSection />
        <ReferencesSection />

        <div className="mt-12 pt-2 border-t border-[#a2a9b1] text-xs text-gray-600 italic">
          This dashboard was last refreshed at{" "}
          {new Date(summary.lastRefresh).toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "UTC",
          })}{" "}
          UTC. <RefreshButton />
        </div>
      </article>
    </AdminPageLayout>
  );
}
