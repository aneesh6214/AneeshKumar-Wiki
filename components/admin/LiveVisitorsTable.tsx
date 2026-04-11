"use client";

import { useEffect, useState } from "react";
import type { LiveVisitor } from "@/lib/admin/queries";

export default function LiveVisitorsTable({
  initial,
}: {
  initial: LiveVisitor[];
}) {
  const [visitors, setVisitors] = useState<LiveVisitor[]>(initial);

  useEffect(() => {
    let alive = true;
    const tick = async () => {
      try {
        const res = await fetch("/api/admin/live", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (alive) setVisitors(data.visitors ?? []);
      } catch {
        /* ignore */
      }
    };
    const id = setInterval(tick, 10000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return (
    <>
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-5xl font-serif text-[#202122]">
          {visitors.length}
        </span>
        <span className="text-lg text-gray-600">
          {visitors.length === 1
            ? "visitor on site right now"
            : "visitors on site right now"}
        </span>
        <span className="ml-auto text-xs text-gray-500 italic">
          auto-refreshing every 10s
        </span>
      </div>

      {visitors.length === 0 ? (
        <p className="italic text-gray-600">
          No visitors in the last 5 minutes.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="border-collapse border border-[#a2a9b1] bg-white text-sm w-full">
            <thead>
              <tr className="bg-[#eaecf0]">
                <th className="border border-[#a2a9b1] px-3 py-1.5 text-left font-bold">
                  Visitor
                </th>
                <th className="border border-[#a2a9b1] px-3 py-1.5 text-left font-bold">
                  Country
                </th>
                <th className="border border-[#a2a9b1] px-3 py-1.5 text-left font-bold">
                  Current page
                </th>
                <th className="border border-[#a2a9b1] px-3 py-1.5 text-left font-bold">
                  Device
                </th>
                <th className="border border-[#a2a9b1] px-3 py-1.5 text-right font-bold">
                  On page for
                </th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((v) => (
                <tr key={v.vidShort} className="hover:bg-[#f8f9fa]">
                  <td className="border border-[#a2a9b1] px-3 py-1.5 font-mono text-xs text-gray-600">
                    {v.vidShort}
                  </td>
                  <td className="border border-[#a2a9b1] px-3 py-1.5">
                    {v.country ?? "—"}
                  </td>
                  <td className="border border-[#a2a9b1] px-3 py-1.5 font-mono text-xs">
                    {v.path}
                  </td>
                  <td className="border border-[#a2a9b1] px-3 py-1.5 italic text-gray-600">
                    {v.device ?? "—"}
                  </td>
                  <td className="border border-[#a2a9b1] px-3 py-1.5 text-right font-mono text-xs">
                    {v.since}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
