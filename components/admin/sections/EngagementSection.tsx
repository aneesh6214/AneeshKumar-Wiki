import SectionHeading from "@/components/admin/SectionHeading";
import WikiFigure from "@/components/admin/WikiFigure";
import ScrollDepthChart from "@/components/admin/charts/ScrollDepthChart";
import type { ScrollDepthData, TopPage } from "@/lib/admin/queries";
import { formatDuration } from "@/lib/admin/format";
import Footnote from "./Footnote";

interface Props {
  scroll: ScrollDepthData;
  topPages: TopPage[];
}

export default function EngagementSection({ scroll, topPages }: Props) {
  return (
    <>
      <SectionHeading id="engagement" num="3">
        Engagement
      </SectionHeading>
      <p className="leading-7 mb-2">
        Engagement metrics characterise how deeply visitors interact with
        content, rather than simply whether they arrived. Figures here are
        collected via a client-side beacon and are subject to ad-block loss of
        roughly 10–30%.<Footnote n={6} />
      </p>

      <SectionHeading id="scroll-depth" num="3.1" level={3}>
        Scroll depth
      </SectionHeading>
      {scroll.points.length > 0 ? (
        <WikiFigure
          number={3}
          caption="Percentage of sessions reaching each scroll depth bucket, for the three most-read pages in the current window."
        >
          <ScrollDepthChart data={scroll.points} labels={scroll.pageLabels} />
        </WikiFigure>
      ) : (
        <p className="italic text-gray-600 my-4">No engagement data yet.</p>
      )}

      <SectionHeading id="time-on-page" num="3.2" level={3}>
        Time on page
      </SectionHeading>
      {topPages.length > 0 && topPages[0].avgTimeSec > 0 ? (
        <p className="leading-7 mb-2">
          Average time visible, per page, derived from{" "}
          <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0] text-xs">
            visibilitychange
          </code>{" "}
          +{" "}
          <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0] text-xs">
            pagehide
          </code>{" "}
          events. The longest average session is on{" "}
          <em>{topPages[0].title}</em> at{" "}
          {formatDuration(topPages[0].avgTimeSec)}.
        </p>
      ) : (
        <p className="italic text-gray-600 my-4">No engagement data yet.</p>
      )}
    </>
  );
}
