import SectionHeading from "@/components/admin/SectionHeading";
import {
  ReferrersTable,
  CountriesTable,
} from "@/components/admin/tables/Tables";
import type { TopReferrer, CountryRow } from "@/lib/admin/queries";
import Footnote from "./Footnote";

interface Props {
  referrers: TopReferrer[];
  countries: CountryRow[];
}

export default function AcquisitionSection({ referrers, countries }: Props) {
  return (
    <>
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
        City-level data is available but not shown here to reduce surface area.
        <Footnote n={7} />
      </p>
      <CountriesTable data={countries} />
    </>
  );
}
