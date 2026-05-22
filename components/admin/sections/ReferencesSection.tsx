import SectionHeading from "@/components/admin/SectionHeading";
import {
  AdminInlineCode,
  adminLinkClass,
} from "../AdminPrimitives";

export default function ReferencesSection() {
  return (
    <>
      <SectionHeading id="references" num="9" editable={false}>
        References
      </SectionHeading>
      <ol className="list-none pl-0 space-y-2 text-sm leading-6">
        <li id="ref-1">
          <a href="#fn-1" className={adminLinkClass}>
            1. ^
          </a>{" "}
          Unique visitor counts approximate the number of distinct browsers that
          have accepted the site&apos;s first-party{" "}
          <AdminInlineCode>vid</AdminInlineCode>{" "}
          cookie. Incognito sessions, cookie clearing, and cross-device browsing
          will each inflate the count.
        </li>
        <li id="ref-2">
          <a href="#fn-2" className={adminLinkClass}>
            2. ^
          </a>{" "}
          Referrer attribution is based on{" "}
          <AdminInlineCode>document.referrer</AdminInlineCode>{" "}
          bucketed into search / direct / social / other, and is best-effort:
          browsers that strip referrer headers (including Safari with link
          tracking protection) default to <em>direct</em>.
        </li>
        <li id="ref-3">
          <a href="#fn-3" className={adminLinkClass}>
            3. ^
          </a>{" "}
          Device and browser distributions are derived from user-agent strings
          parsed at edge request time. The category &ldquo;bot&rdquo; is
          excluded from these percentages.
        </li>
        <li id="ref-4">
          <a href="#fn-4" className={adminLinkClass}>
            4. ^
          </a>{" "}
          The site does not serve any third-party analytics beacons, embed any
          third-party iframes, or transmit IP addresses to any external service.
          All collection terminates at the site&apos;s own Supabase project.
        </li>
        <li id="ref-5">
          <a href="#fn-5" className={adminLinkClass}>
            5. ^
          </a>{" "}
          Content metrics are a composition of{" "}
          <AdminInlineCode>server_hits</AdminInlineCode>{" "}
          (for view counts) and{" "}
          <AdminInlineCode>client_events</AdminInlineCode>{" "}
          (for scroll and time), reported independently.
        </li>
        <li id="ref-6">
          <a href="#fn-6" className={adminLinkClass}>
            6. ^
          </a>{" "}
          Engagement events are sent via{" "}
          <AdminInlineCode>navigator.sendBeacon</AdminInlineCode>
          . Ad blockers, strict content-blocking browsers, and users with{" "}
          <AdminInlineCode>DNT: 1</AdminInlineCode>{" "}
          will not contribute to these figures.
        </li>
        <li id="ref-7">
          <a href="#fn-7" className={adminLinkClass}>
            7. ^
          </a>{" "}
          Geolocation is provided by the hosting provider&apos;s edge network
          and persisted without any intermediate third-party service.
        </li>
      </ol>
    </>
  );
}
