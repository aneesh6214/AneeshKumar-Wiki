import { adminLinkClass } from "./AdminPrimitives";

interface SectionHeadingProps {
  id: string;
  num: string;
  children: React.ReactNode;
  level?: 2 | 3;
  editable?: boolean;
}

export default function SectionHeading({
  id,
  num,
  children,
  level = 2,
  editable = true,
}: SectionHeadingProps) {
  const sizeClass = level === 2 ? "text-2xl" : "text-lg";
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <div
      id={id}
      className={`${
        level === 2 ? "border-b border-[#a2a9b1] mt-10 pb-1" : "mt-6"
      } mb-3 flex items-baseline justify-between gap-4 scroll-mt-4`}
    >
      <Tag
        className={`${sizeClass} font-serif text-[#202122] leading-snug`}
      >
        <span className="text-gray-400 mr-2 font-sans text-base">{num}</span>
        {children}
      </Tag>
      {editable && (
        <span className="text-xs text-gray-500">
          [
          <a
            href={`#${id}`}
            className={adminLinkClass}
          >
            edit
          </a>
          ]
        </span>
      )}
    </div>
  );
}
