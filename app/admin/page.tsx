import Link from "next/link";
import AdminPageLayout from "@/components/admin/AdminPageLayout";
import AdminArticleHeader from "@/components/admin/AdminArticleHeader";
import Infobox from "@/components/admin/Infobox";
import TableOfContents from "@/components/admin/TableOfContents";
import SectionHeading from "@/components/admin/SectionHeading";
import WikiFigure from "@/components/admin/WikiFigure";
import {
  PageviewsLineChart,
  VisitorsVsSessionsBarChart,
  ScrollDepthChart,
  PerformanceLineChart,
  CategoryDonut,
} from "@/components/admin/charts/Charts";
import {
  TopPagesTable,
  OutboundLinksTable,
  SearchQueriesTable,
  ReferrersTable,
  CountriesTable,
} from "@/components/admin/tables/Tables";
import RefreshButton from "@/components/admin/RefreshButton";
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
import { formatNumber, formatPercent, formatDuration } from "@/lib/admin/format";

export const dynamic = "force-dynamic";

function FN({ n }: { n: number }) {
  return (
    <sup className="text-xs">
      <a
        href={`#ref-${n}`}
        className="text-blue-600 hover:underline"
        id={`fn-${n}`}
      >
        [{n}]
      </a>
    </sup>
  );
}

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

  const hasAnyHits = summary.totalPageviews > 0;
  const dailyAvg = summary.windowDays
    ? Math.round(summary.totalPageviews / summary.windowDays)
    : summary.totalPageviews;

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

        <div className="text-[15px] leading-7 space-y-4">
          {hasAnyHits ? (
            <>
              <p>
                <strong>aneeshkumar.com</strong> is a personal portfolio website
                launched in {summary.launched}. Over the{" "}
                <strong>{window.label.toLowerCase()}</strong> it has received{" "}
                <strong>
                  {formatNumber(summary.totalPageviews)} pageviews
                </strong>{" "}
                from an estimated{" "}
                <strong>
                  {formatNumber(summary.uniqueVisitors)} unique visitors
                </strong>
                <FN n={1} />
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
                    .<FN n={2} />
                  </>
                )}
                {summary.topPage && summary.topPageShare !== null && (
                  <>
                    {" "}
                    Its most-read page is <em>{summary.topPageTitle}</em>,
                    accounting for{" "}
                    <strong>
                      {formatPercent(summary.topPageShare, 1)}
                    </strong>{" "}
                    of all traffic.
                  </>
                )}
              </p>
              <p>
                {summary.topCountry && summary.topCountryShare !== null ? (
                  <>
                    Visitors are predominantly based in {summary.topCountry} (
                    {formatPercent(summary.topCountryShare, 0)}) and access the
                    site primarily via desktop browsers (
                    {formatPercent(summary.desktopShare, 0)}).<FN n={3} />{" "}
                  </>
                ) : (
                  <>
                    Device mix is currently{" "}
                    {formatPercent(summary.desktopShare, 0)} desktop.
                    <FN n={3} />{" "}
                  </>
                )}
                {summary.returningVisitorRate !== null && (
                  <>
                    Around {formatPercent(summary.returningVisitorRate, 0)} of
                    sessions originate from returning visitors.{" "}
                  </>
                )}
                The site tracks no personally identifiable information beyond
                country-level geolocation.<FN n={4} />
              </p>
            </>
          ) : (
            <p className="italic text-gray-600">
              No pageviews have been recorded yet in this window. Once traffic
              arrives, this page will populate automatically.
            </p>
          )}
        </div>

        <TableOfContents />

        {/* 1. Traffic */}
        <SectionHeading id="traffic" num="1">
          Traffic
        </SectionHeading>
        {hasAnyHits ? (
          <p className="leading-7 mb-4">
            The site received{" "}
            <strong>{formatNumber(summary.totalPageviews)}</strong> pageviews
            across <strong>{formatNumber(summary.sessions)}</strong> sessions
            in {window.label.toLowerCase()}. Daily traffic averages roughly{" "}
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
          <WikiFigure
            number={1}
            caption="Daily pageviews in the current window."
          >
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

        {/* 2. Content */}
        <SectionHeading id="content" num="2">
          Content
        </SectionHeading>
        <p className="leading-7 mb-2">
          Content performance is the highest-signal view for a personal
          portfolio: it answers which pages are worth writing more of, which
          external links are worth highlighting, and what visitors look for
          when they arrive.<FN n={5} />
        </p>

        <SectionHeading id="most-read-pages" num="2.1" level={3}>
          Most-read pages
        </SectionHeading>
        <TopPagesTable data={topPages} />

        <SectionHeading id="outbound-links" num="2.2" level={3}>
          Outbound links
        </SectionHeading>
        <p className="leading-7 mb-2">
          Outbound clicks indicate which external resources visitors chose to
          follow after arriving.
        </p>
        <OutboundLinksTable data={outbound} />

        <SectionHeading id="search-queries" num="2.3" level={3}>
          Search queries
        </SectionHeading>
        <p className="leading-7 mb-2">
          Queries entered into the site&apos;s own search bar. A query
          appearing often without a clear matching page is a signal that
          content may be missing or poorly indexed.
        </p>
        <SearchQueriesTable data={searches} />

        {/* 3. Engagement */}
        <SectionHeading id="engagement" num="3">
          Engagement
        </SectionHeading>
        <p className="leading-7 mb-2">
          Engagement metrics characterise how deeply visitors interact with
          content, rather than simply whether they arrived. Figures here are
          collected via a client-side beacon and are subject to ad-block loss
          of roughly 10–30%.<FN n={6} />
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

        {/* 4. Acquisition */}
        <SectionHeading id="acquisition" num="4">
          Acquisition
        </SectionHeading>

        <SectionHeading id="referrers" num="4.1" level={3}>
          Referrers
        </SectionHeading>
        <ReferrersTable data={referrers} />

        <SectionHeading id="geography" num="4.2" level={3}>
          Geography
        </SectionHeading>
        <p className="leading-7 mb-2">
          Country-level geolocation is derived from Vercel&apos;s edge network.
          City-level data is available but not shown here to reduce surface
          area.<FN n={7} />
        </p>
        <CountriesTable data={countries} />

        {/* 5. Client environment */}
        <SectionHeading id="client-environment" num="5">
          Client environment
        </SectionHeading>

        <SectionHeading id="device-browser-os" num="5.1" level={3}>
          Device, browser, and operating system
        </SectionHeading>
        <p className="leading-7 mb-4">
          User-agent strings parsed server-side in middleware.
        </p>
        {devices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <WikiFigure number={4} caption="Device type breakdown.">
              <CategoryDonut data={devices} />
            </WikiFigure>
            <WikiFigure number={5} caption="Browser share.">
              <CategoryDonut data={browsers} />
            </WikiFigure>
            <WikiFigure number={6} caption="Operating system share.">
              <CategoryDonut data={os} />
            </WikiFigure>
          </div>
        ) : (
          <p className="italic text-gray-600 my-4">No data yet.</p>
        )}

        {/* 6. Operational */}
        <SectionHeading id="operational" num="6">
          Operational
        </SectionHeading>

        <SectionHeading id="performance" num="6.1" level={3}>
          Performance
        </SectionHeading>
        {perf.length > 0 ? (
          <WikiFigure
            number={7}
            caption="Median time-to-first-byte (TTFB) and largest contentful paint (LCP), sampled per day."
          >
            <PerformanceLineChart data={perf} />
          </WikiFigure>
        ) : (
          <p className="italic text-gray-600 my-4">No Web Vitals samples yet.</p>
        )}

        <SectionHeading id="javascript-errors" num="6.2" level={3}>
          JavaScript errors
        </SectionHeading>
        <p className="leading-7 mb-2">
          Errors captured via{" "}
          <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0] text-xs">
            window.onerror
          </code>{" "}
          and{" "}
          <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0] text-xs">
            unhandledrejection
          </code>
          .
        </p>
        {errors.length > 0 ? (
          <div className="my-4 overflow-x-auto">
            <table className="border-collapse border border-[#a2a9b1] bg-white text-sm w-full">
              <thead>
                <tr className="bg-[#eaecf0]">
                  <th className="border border-[#a2a9b1] px-3 py-1.5 text-left font-bold">
                    Time
                  </th>
                  <th className="border border-[#a2a9b1] px-3 py-1.5 text-left font-bold">
                    Path
                  </th>
                  <th className="border border-[#a2a9b1] px-3 py-1.5 text-left font-bold">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody>
                {errors.map((e, i) => (
                  <tr key={i} className="hover:bg-[#f8f9fa]">
                    <td className="border border-[#a2a9b1] px-3 py-1.5 font-mono text-xs">
                      {e.time}
                    </td>
                    <td className="border border-[#a2a9b1] px-3 py-1.5 font-mono text-xs">
                      {e.path}
                    </td>
                    <td className="border border-[#a2a9b1] px-3 py-1.5 text-xs">
                      {e.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="italic text-gray-600 my-4">
            No errors reported in this window.
          </p>
        )}

        {/* 7. Methodology */}
        <SectionHeading id="methodology" num="7" editable={false}>
          Methodology
        </SectionHeading>
        <p className="leading-7 mb-3">
          Data is collected via a <em>hybrid pipeline</em>: an edge middleware
          running on every qualifying request writes an authoritative{" "}
          <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0] text-xs">
            server_hits
          </code>{" "}
          row to Supabase Postgres, while a client-side beacon separately
          records engagement events (scroll depth, time on page, outbound
          clicks, search queries, JavaScript errors) to a{" "}
          <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0] text-xs">
            client_events
          </code>{" "}
          table. The two tables are never reconciled: pageview counts come
          exclusively from the server path, engagement metrics come
          exclusively from the client path. Each table answers the questions
          it can answer with confidence.
        </p>
        <p className="leading-7 mb-3">
          All writes occur after the HTTP response is flushed via{" "}
          <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0] text-xs">
            event.waitUntil
          </code>
          , so analytics collection adds no observable latency to the site.
          RSC prefetch requests are filtered in middleware and do not count
          toward pageview totals.
        </p>
        <p className="leading-7 mb-3">
          No raw IP addresses are stored. Geolocation is sourced from the
          Vercel edge network at request time and persisted only at the
          country, region, and city granularity. Visitor identity is a signed
          first-party cookie with a one-year expiry, reset whenever the user
          clears cookies or switches browsers.
        </p>

        {/* 8. See also */}
        <SectionHeading id="see-also" num="8" editable={false}>
          See also
        </SectionHeading>
        <ul className="list-disc pl-6 space-y-1 leading-7">
          <li>
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>{" "}
            — the public landing page
          </li>
          <li>
            <Link href="/blog" className="text-blue-600 hover:underline">
              Blog
            </Link>{" "}
            — long-form writing
          </li>
          <li>
            <Link href="/research" className="text-blue-600 hover:underline">
              Research
            </Link>{" "}
            — academic work and interpretability notes
          </li>
          <li>
            <Link href="/projects" className="text-blue-600 hover:underline">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/admin/raw" className="text-blue-600 hover:underline">
              Raw event stream
            </Link>{" "}
            — the underlying events, unaggregated
          </li>
          <li>
            <Link href="/admin/live" className="text-blue-600 hover:underline">
              Live view
            </Link>{" "}
            — rolling 5-minute window
          </li>
        </ul>

        {/* 9. References */}
        <SectionHeading id="references" num="9" editable={false}>
          References
        </SectionHeading>
        <ol className="list-none pl-0 space-y-2 text-sm leading-6">
          <li id="ref-1">
            <a href="#fn-1" className="text-blue-600 hover:underline">
              1. ^
            </a>{" "}
            Unique visitor counts approximate the number of distinct browsers
            that have accepted the site&apos;s first-party{" "}
            <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0] text-xs">
              vid
            </code>{" "}
            cookie. Incognito sessions, cookie clearing, and cross-device
            browsing will each inflate the count.
          </li>
          <li id="ref-2">
            <a href="#fn-2" className="text-blue-600 hover:underline">
              2. ^
            </a>{" "}
            Referrer attribution is based on{" "}
            <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0] text-xs">
              document.referrer
            </code>{" "}
            bucketed into search / direct / social / other, and is
            best-effort: browsers that strip referrer headers (including
            Safari with link tracking protection) default to <em>direct</em>.
          </li>
          <li id="ref-3">
            <a href="#fn-3" className="text-blue-600 hover:underline">
              3. ^
            </a>{" "}
            Device and browser distributions are derived from user-agent
            strings parsed at edge request time. The category &ldquo;bot&rdquo;
            is excluded from these percentages.
          </li>
          <li id="ref-4">
            <a href="#fn-4" className="text-blue-600 hover:underline">
              4. ^
            </a>{" "}
            The site does not serve any third-party analytics beacons, embed
            any third-party iframes, or transmit IP addresses to any external
            service. All collection terminates at the site&apos;s own Supabase
            project.
          </li>
          <li id="ref-5">
            <a href="#fn-5" className="text-blue-600 hover:underline">
              5. ^
            </a>{" "}
            Content metrics are a composition of{" "}
            <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0] text-xs">
              server_hits
            </code>{" "}
            (for view counts) and{" "}
            <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0] text-xs">
              client_events
            </code>{" "}
            (for scroll and time), reported independently.
          </li>
          <li id="ref-6">
            <a href="#fn-6" className="text-blue-600 hover:underline">
              6. ^
            </a>{" "}
            Engagement events are sent via{" "}
            <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0] text-xs">
              navigator.sendBeacon
            </code>
            . Ad blockers, strict content-blocking browsers, and users with{" "}
            <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0] text-xs">
              DNT: 1
            </code>{" "}
            will not contribute to these figures.
          </li>
          <li id="ref-7">
            <a href="#fn-7" className="text-blue-600 hover:underline">
              7. ^
            </a>{" "}
            Geolocation is provided by the hosting provider&apos;s edge
            network and persisted without any intermediate third-party
            service.
          </li>
        </ol>

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
