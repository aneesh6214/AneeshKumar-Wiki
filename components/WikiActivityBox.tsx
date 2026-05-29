import React from "react";

interface WikiActivityBoxProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function WikiActivityBox({
  title,
  icon,
  children,
}: WikiActivityBoxProps) {
  return (
    <section className="h-full border border-gray-300 bg-gray-50 text-sm">
      <div className="flex items-center justify-center border-b border-gray-300 bg-gray-100 px-3 py-1.5">
        <h3 className="flex items-center justify-center gap-1.5 text-center text-sm font-bold text-gray-900">
          <span>{title}</span>
          {icon && (
            <span className="shrink-0 text-gray-700" aria-hidden="true">
              {icon}
            </span>
          )}
        </h3>
      </div>
      <div className="p-3">{children}</div>
    </section>
  );
}
