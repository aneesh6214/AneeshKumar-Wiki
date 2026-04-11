export default function Footnote({ n }: { n: number }) {
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
