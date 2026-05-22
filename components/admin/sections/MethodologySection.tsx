import SectionHeading from "@/components/admin/SectionHeading";
import { AdminInlineCode } from "../AdminPrimitives";

export default function MethodologySection() {
  return (
    <>
      <SectionHeading id="methodology" num="7" editable={false}>
        Methodology
      </SectionHeading>
      <p className="leading-7 mb-3">
        Data is collected via a <em>hybrid pipeline</em>: an edge middleware
        running on every qualifying request writes an authoritative{" "}
        <AdminInlineCode>server_hits</AdminInlineCode>{" "}
        row to Supabase Postgres, while a client-side beacon separately records
        engagement events (scroll depth, time on page, outbound clicks, search
        queries, JavaScript errors) to a{" "}
        <AdminInlineCode>client_events</AdminInlineCode>{" "}
        table. The two tables are never reconciled: pageview counts come
        exclusively from the server path, engagement metrics come exclusively
        from the client path. Each table answers the questions it can answer
        with confidence.
      </p>
      <p className="leading-7 mb-3">
        All writes occur after the HTTP response is flushed via{" "}
        <AdminInlineCode>event.waitUntil</AdminInlineCode>
        , so analytics collection adds no observable latency to the site. RSC
        prefetch requests are filtered in middleware and do not count toward
        pageview totals.
      </p>
      <p className="leading-7 mb-3">
        No raw IP addresses are stored. Geolocation is sourced from the Vercel
        edge network at request time and persisted only at the country, region,
        and city granularity. Visitor identity is a signed first-party cookie
        with a one-year expiry, reset whenever the user clears cookies or
        switches browsers.
      </p>
    </>
  );
}
