"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { DailyPoint } from "@/lib/admin/queries";
import { GRID, WIKI_BLUE, axisProps, tooltipStyle } from "./theme";

export default function PageviewsLineChart({ data }: { data: DailyPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: -8 }}>
        <CartesianGrid strokeDasharray="2 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="date" {...axisProps} interval={4} />
        <YAxis {...axisProps} />
        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{ stroke: "#a2a9b1", strokeDasharray: "2 2" }}
        />
        <Line
          type="monotone"
          dataKey="views"
          stroke={WIKI_BLUE}
          strokeWidth={1.5}
          dot={false}
          activeDot={{ r: 3, fill: WIKI_BLUE, stroke: WIKI_BLUE }}
          name="Pageviews"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
