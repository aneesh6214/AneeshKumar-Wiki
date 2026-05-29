import Link from "next/link";
import { BookOpen, Braces, Cpu, type LucideIcon } from "lucide-react";
import type { RoleFocusItem } from "@/lib/json-content";

interface HomeRoleFocusProps {
  items: RoleFocusItem[];
}

const roleIcons: Record<string, LucideIcon> = {
  Engineering: Cpu,
  Research: Braces,
  Education: BookOpen,
};

function RoleIcon({
  role,
  className = "",
}: {
  role: string;
  className?: string;
}) {
  const Icon = roleIcons[role] ?? Braces;
  return <Icon className={className} strokeWidth={1.8} aria-hidden="true" />;
}

export default function HomeRoleFocus({ items }: HomeRoleFocusProps) {
  return (
    <figure className="my-4 bg-white px-3 py-4 text-sm">
      <div className="relative grid gap-0 sm:grid-cols-3">
        <div
          className="absolute left-[17%] right-[17%] top-7 hidden border-t border-gray-300 sm:block"
          aria-hidden="true"
        />
        {items.map((item) => (
          <section
            key={item.role}
            className="relative grid grid-cols-[3.5rem_1fr] gap-3 border-b border-gray-200 py-3 first:pt-0 last:border-b-0 last:pb-0 sm:block sm:border-b-0 sm:px-4 sm:py-0 sm:text-center"
          >
            <div className="relative z-10 grid size-12 place-items-center bg-white text-gray-700 sm:mx-auto">
              <span
                className="absolute inset-0 border border-gray-400"
                aria-hidden="true"
              />
              <span
                className="absolute inset-[3px] border border-gray-200"
                aria-hidden="true"
              />
              <RoleIcon role={item.role} className="h-5 w-5" />
            </div>
            <div className="min-w-0 sm:mt-3">
              <h3 className="font-serif text-[18px] font-medium leading-5 text-[#202122]">
                {item.role}
              </h3>
              <p className="mt-1.5 text-[13px] leading-5 text-gray-700 sm:mx-auto sm:max-w-[13.5rem]">
                {item.statement}
              </p>
              <p className="mt-1.5 text-xs italic leading-4 text-gray-600">
                <span>See also:</span>{" "}
                <Link
                  href={item.seeAlso.href}
                  className="text-blue-600 hover:underline"
                >
                  {item.seeAlso.label}
                </Link>
              </p>
            </div>
          </section>
        ))}
      </div>
    </figure>
  );
}
