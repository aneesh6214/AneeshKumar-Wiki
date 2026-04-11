import SectionHeading from "@/components/admin/SectionHeading";
import WikiFigure from "@/components/admin/WikiFigure";
import { PerformanceLineChart } from "@/components/admin/charts/Charts";
import type { PerfPoint, JsErrorRow } from "@/lib/admin/queries";

interface Props {
  perf: PerfPoint[];
  errors: JsErrorRow[];
}

export default function OperationalSection({ perf, errors }: Props) {
  return (
    <>
      <SectionHeading id="operational" num="6">
        Operational
      </SectionHeading>

      <SectionHeading id="performance" num="6.1" level={3}>
        Performance
      </SectionHeading>
      {perf.length > 0 ? (
        <WikiFigure
          number={7}
          caption="Median time-to-first-byte (TTFB) and largest contentful paint (LCP), sampled per day."
        >
          <PerformanceLineChart data={perf} />
        </WikiFigure>
      ) : (
        <p className="italic text-gray-600 my-4">No Web Vitals samples yet.</p>
      )}

      <SectionHeading id="javascript-errors" num="6.2" level={3}>
        JavaScript errors
      </SectionHeading>
      <p className="leading-7 mb-2">
        Errors captured via{" "}
        <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0] text-xs">
          window.onerror
        </code>{" "}
        and{" "}
        <code className="bg-[#f8f9fa] px-1 border border-[#eaecf0] text-xs">
          unhandledrejection
        </code>
        .
      </p>
      {errors.length > 0 ? (
        <div className="my-4 overflow-x-auto">
          <table className="border-collapse border border-[#a2a9b1] bg-white text-sm w-full">
            <thead>
              <tr className="bg-[#eaecf0]">
                <th className="border border-[#a2a9b1] px-3 py-1.5 text-left font-bold">
                  Time
                </th>
                <th className="border border-[#a2a9b1] px-3 py-1.5 text-left font-bold">
                  Path
                </th>
                <th className="border border-[#a2a9b1] px-3 py-1.5 text-left font-bold">
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {errors.map((e, i) => (
                <tr key={i} className="hover:bg-[#f8f9fa]">
                  <td className="border border-[#a2a9b1] px-3 py-1.5 font-mono text-xs">
                    {e.time}
                  </td>
                  <td className="border border-[#a2a9b1] px-3 py-1.5 font-mono text-xs">
                    {e.path}
                  </td>
                  <td className="border border-[#a2a9b1] px-3 py-1.5 text-xs">
                    {e.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="italic text-gray-600 my-4">
          No errors reported in this window.
        </p>
      )}
    </>
  );
}
