import SectionHeading from "@/components/admin/SectionHeading";
import WikiFigure from "@/components/admin/WikiFigure";
import PageviewsLineChart from "@/components/admin/charts/PageviewsLineChart";
import VisitorsVsSessionsBarChart from "@/components/admin/charts/VisitorsVsSessionsBarChart";
import type { AdminSummary, DailyPoint } from "@/lib/admin/queries";
import type { TimeWindow } from "@/lib/admin/window";
import { formatNumber } from "@/lib/admin/format";

interface Props {
  summary: AdminSummary;
  daily: DailyPoint[];
  window: TimeWindow;
}

export default function TrafficSection({ summary, daily, window }: Props) {
  const hasAnyHits = summary.totalPageviews > 0;
  const dailyAvg = summary.windowDays
    ? Math.round(summary.totalPageviews / summary.windowDays)
    : summary.totalPageviews;

  return (
    <>
      <SectionHeading id="traffic" num="1">
        Traffic
      </SectionHeading>
      {hasAnyHits ? (
        <p className="leading-7 mb-4">
          The site received{" "}
          <strong>{formatNumber(summary.totalPageviews)}</strong> pageviews
          across <strong>{formatNumber(summary.sessions)}</strong> sessions in{" "}
          {window.label.toLowerCase()}. Daily traffic averages roughly{" "}
          {dailyAvg} views.
        </p>
      ) : (
        <p className="leading-7 mb-4 italic text-gray-600">
          Awaiting first pageview.
        </p>
      )}

      <SectionHeading
        id="pageviews-over-time"
        num="1.1"
        level={3}
        editable={false}
      >
        Pageviews over time
      </SectionHeading>
      {daily.length > 0 ? (
        <WikiFigure number={1} caption="Daily pageviews in the current window.">
          <PageviewsLineChart data={daily} />
        </WikiFigure>
      ) : (
        <p className="italic text-gray-600 my-4">No data yet.</p>
      )}

      <SectionHeading
        id="visitors-and-sessions"
        num="1.2"
        level={3}
        editable={false}
      >
        Visitors and sessions
      </SectionHeading>
      {daily.length > 0 ? (
        <WikiFigure
          number={2}
          caption="Unique visitors vs. pageviews per day. The gap between the two series approximates average pages per session."
        >
          <VisitorsVsSessionsBarChart data={daily} />
        </WikiFigure>
      ) : (
        <p className="italic text-gray-600 my-4">No data yet.</p>
      )}
    </>
  );
}
