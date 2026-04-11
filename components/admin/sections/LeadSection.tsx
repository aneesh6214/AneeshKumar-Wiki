import type { AdminSummary } from "@/lib/admin/queries";
import type { TimeWindow } from "@/lib/admin/window";
import { formatNumber, formatPercent } from "@/lib/admin/format";
import Footnote from "./Footnote";

interface Props {
  summary: AdminSummary;
  window: TimeWindow;
}

export default function LeadSection({ summary, window }: Props) {
  const hasAnyHits = summary.totalPageviews > 0;

  if (!hasAnyHits) {
    return (
      <div className="text-[15px] leading-7 space-y-4">
        <p className="italic text-gray-600">
          No pageviews have been recorded yet in this window. Once traffic
          arrives, this page will populate automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="text-[15px] leading-7 space-y-4">
      <p>
        <strong>aneeshkumar.com</strong> is a personal portfolio website
        launched in {summary.launched}. Over the{" "}
        <strong>{window.label.toLowerCase()}</strong> it has received{" "}
        <strong>{formatNumber(summary.totalPageviews)} pageviews</strong> from
        an estimated{" "}
        <strong>{formatNumber(summary.uniqueVisitors)} unique visitors</strong>
        <Footnote n={1} />
        {summary.peakDate && summary.peakViews !== null && (
          <>
            , with traffic peaking on{" "}
            <strong>
              {new Date(summary.peakDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </strong>{" "}
            at {formatNumber(summary.peakViews)} views
            {summary.peakReferrer ? (
              <> following referrals from {summary.peakReferrer}</>
            ) : null}
            .<Footnote n={2} />
          </>
        )}
        {summary.topPage && summary.topPageShare !== null && (
          <>
            {" "}
            Its most-read page is <em>{summary.topPageTitle}</em>, accounting
            for{" "}
            <strong>{formatPercent(summary.topPageShare, 1)}</strong> of all
            traffic.
          </>
        )}
      </p>
      <p>
        {summary.topCountry && summary.topCountryShare !== null ? (
          <>
            Visitors are predominantly based in {summary.topCountry} (
            {formatPercent(summary.topCountryShare, 0)}) and access the site
            primarily via desktop browsers (
            {formatPercent(summary.desktopShare, 0)}).<Footnote n={3} />{" "}
          </>
        ) : (
          <>
            Device mix is currently {formatPercent(summary.desktopShare, 0)}{" "}
            desktop.
            <Footnote n={3} />{" "}
          </>
        )}
        {summary.returningVisitorRate !== null && (
          <>
            Around {formatPercent(summary.returningVisitorRate, 0)} of sessions
            originate from returning visitors.{" "}
          </>
        )}
        The site tracks no personally identifiable information beyond
        country-level geolocation.<Footnote n={4} />
      </p>
    </div>
  );
}
