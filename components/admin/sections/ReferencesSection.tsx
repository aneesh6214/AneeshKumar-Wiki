import SectionHeading from "@/components/admin/SectionHeading";

export default function ReferencesSection() {
  return (
    <>
      <SectionHeading id="references" num="9" editable={false}>
        References
      </SectionHeading>
      <ol className="list-none pl-0 space-y-2 text-sm leading-6">
        <li id="ref-1">
          <a href="#fn-1" className="text-blue-600 hover:underline">
            1. ^
          </a>{" "}
          Unique visitor counts approximate the number of distinct browsers that
          have accepted the site&apos;s first-party{" "}
          <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0] text-xs">
            vid
          </code>{" "}
          cookie. Incognito sessions, cookie clearing, and cross-device browsing
          will each inflate the count.
        </li>
        <li id="ref-2">
          <a href="#fn-2" className="text-blue-600 hover:underline">
            2. ^
          </a>{" "}
          Referrer attribution is based on{" "}
          <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0] text-xs">
            document.referrer
          </code>{" "}
          bucketed into search / direct / social / other, and is best-effort:
          browsers that strip referrer headers (including Safari with link
          tracking protection) default to <em>direct</em>.
        </li>
        <li id="ref-3">
          <a href="#fn-3" className="text-blue-600 hover:underline">
            3. ^
          </a>{" "}
          Device and browser distributions are derived from user-agent strings
          parsed at edge request time. The category &ldquo;bot&rdquo; is
          excluded from these percentages.
        </li>
        <li id="ref-4">
          <a href="#fn-4" className="text-blue-600 hover:underline">
            4. ^
          </a>{" "}
          The site does not serve any third-party analytics beacons, embed any
          third-party iframes, or transmit IP addresses to any external service.
          All collection terminates at the site&apos;s own Supabase project.
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
          Geolocation is provided by the hosting provider&apos;s edge network
          and persisted without any intermediate third-party service.
        </li>
      </ol>
    </>
  );
}
