"use client";

import { useState, ReactNode } from "react";

export interface WikiColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  align?: "left" | "right" | "center";
  render: (row: T) => ReactNode;
  sortValue?: (row: T) => number | string;
}

interface WikiTableProps<T> {
  columns: WikiColumn<T>[];
  data: T[];
  caption?: string;
  defaultSort?: { key: string; direction: "asc" | "desc" };
}

export default function WikiTable<T>({
  columns,
  data,
  caption,
  defaultSort,
}: WikiTableProps<T>) {
  const [sort, setSort] = useState<{ key: string; direction: "asc" | "desc" } | null>(
    defaultSort ?? null,
  );

  const sorted = [...data];
  if (sort) {
    const col = columns.find((c) => c.key === sort.key);
    if (col?.sortValue) {
      sorted.sort((a, b) => {
        const av = col.sortValue!(a);
        const bv = col.sortValue!(b);
        if (av < bv) return sort.direction === "asc" ? -1 : 1;
        if (av > bv) return sort.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
  }

  const handleSort = (key: string) => {
    setSort((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "desc" };
    });
  };

  return (
    <div className="my-4 overflow-x-auto">
      <table className="border-collapse border border-[#a2a9b1] bg-white text-sm w-full">
        {caption && (
          <caption className="caption-bottom text-xs text-[#202122] mt-2 italic font-serif text-left">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-[#eaecf0]">
            {columns.map((c) => {
              const isSorted = sort?.key === c.key;
              return (
                <th
                  key={c.key}
                  onClick={c.sortable ? () => handleSort(c.key) : undefined}
                  className={`border border-[#a2a9b1] px-3 py-1.5 font-bold text-[#202122] text-${c.align ?? "left"} ${
                    c.sortable ? "cursor-pointer hover:bg-[#dce1e5] select-none" : ""
                  }`}
                >
                  <span>{c.label}</span>
                  {c.sortable && (
                    <span className="ml-1 text-gray-500 text-xs">
                      {isSorted ? (sort!.direction === "asc" ? "▲" : "▼") : "⇅"}
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={i} className="hover:bg-[#f8f9fa]">
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={`border border-[#a2a9b1] px-3 py-1.5 text-[#202122] text-${c.align ?? "left"}`}
                >
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
