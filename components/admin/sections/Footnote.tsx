import { adminLinkClass } from "../AdminPrimitives";

export default function Footnote({ n }: { n: number }) {
  return (
    <sup className="text-xs">
      <a
        href={`#ref-${n}`}
        className={adminLinkClass}
        id={`fn-${n}`}
      >
        [{n}]
      </a>
    </sup>
  );
}
