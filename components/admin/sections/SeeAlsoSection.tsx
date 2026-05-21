import Link from "next/link";
import SectionHeading from "@/components/admin/SectionHeading";

export default function SeeAlsoSection() {
  return (
    <>
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
          <Link href="/independent-work" className="text-blue-600 hover:underline">
            Independent Work
          </Link>{" "}
          — independent products and research prototypes
        </li>
        <li>
          <Link href="/media" className="text-blue-600 hover:underline">
            Media
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
    </>
  );
}
