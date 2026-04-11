import SectionHeading from "@/components/admin/SectionHeading";
import TopPagesTable from "@/components/admin/tables/TopPagesTable";
import OutboundLinksTable from "@/components/admin/tables/OutboundLinksTable";
import SearchQueriesTable from "@/components/admin/tables/SearchQueriesTable";
import type {
  TopPage,
  OutboundRow,
  SearchRow,
} from "@/lib/admin/queries";
import Footnote from "./Footnote";

interface Props {
  topPages: TopPage[];
  outbound: OutboundRow[];
  searches: SearchRow[];
}

export default function ContentSection({ topPages, outbound, searches }: Props) {
  return (
    <>
      <SectionHeading id="content" num="2">
        Content
      </SectionHeading>
      <p className="leading-7 mb-2">
        Content performance is the highest-signal view for a personal portfolio:
        it answers which pages are worth writing more of, which external links
        are worth highlighting, and what visitors look for when they arrive.
        <Footnote n={5} />
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
        Queries entered into the site&apos;s own search bar. A query appearing
        often without a clear matching page is a signal that content may be
        missing or poorly indexed.
      </p>
      <SearchQueriesTable data={searches} />
    </>
  );
}
