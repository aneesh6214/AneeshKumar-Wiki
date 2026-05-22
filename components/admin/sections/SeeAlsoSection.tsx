import Link from "next/link";
import SectionHeading from "@/components/admin/SectionHeading";
import { adminContent } from "@/content/admin";
import { adminLinkClass } from "../AdminPrimitives";

export default function SeeAlsoSection() {
  return (
    <>
      <SectionHeading id="see-also" num="8" editable={false}>
        See also
      </SectionHeading>
      <ul className="list-disc pl-6 space-y-1 leading-7">
        {adminContent.seeAlso.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={adminLinkClass}>
              {item.label}
            </Link>
            {item.description ? <> - {item.description}</> : null}
          </li>
        ))}
      </ul>
    </>
  );
}
