"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { PerfPoint } from "@/lib/admin/queries";
import {
  GRID,
  WIKI_BLUE,
  WIKI_RED,
  axisProps,
  tooltipStyle,
  legendStyle,
} from "./theme";

export default function PerformanceLineChart({ data }: { data: PerfPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: -8 }}>
        <CartesianGrid strokeDasharray="2 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="date" {...axisProps} />
        <YAxis {...axisProps} unit="ms" />
        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{ stroke: "#a2a9b1", strokeDasharray: "2 2" }}
        />
        <Legend wrapperStyle={legendStyle} />
        <Line
          type="monotone"
          dataKey="ttfb"
          stroke={WIKI_BLUE}
          strokeWidth={1.5}
          dot={{ r: 2, fill: WIKI_BLUE }}
          name="TTFB (ms)"
        />
        <Line
          type="monotone"
          dataKey="lcp"
          stroke={WIKI_RED}
          strokeWidth={1.5}
          dot={{ r: 2, fill: WIKI_RED }}
          name="LCP (ms)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
