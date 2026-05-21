import React from "react";

interface WikiActivityBoxProps {
  title: string;
  children: React.ReactNode;
}

export default function WikiActivityBox({
  title,
  children,
}: WikiActivityBoxProps) {
  return (
    <section className="h-full border border-gray-300 bg-gray-50 text-sm">
      <h3 className="border-b border-gray-300 bg-gray-100 px-3 py-1.5 text-center text-sm font-bold text-gray-900">
        {title}
      </h3>
      <div className="p-3">{children}</div>
    </section>
  );
}
