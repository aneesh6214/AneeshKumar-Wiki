"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { DailyPoint } from "@/lib/admin/queries";
import {
  GRID,
  WIKI_BLUE,
  WIKI_GRAY,
  axisProps,
  tooltipStyle,
  legendStyle,
} from "./theme";

export default function VisitorsVsSessionsBarChart({
  data,
}: {
  data: DailyPoint[];
}) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: -8 }}>
        <CartesianGrid strokeDasharray="2 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="date" {...axisProps} interval={4} />
        <YAxis {...axisProps} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f8f9fa" }} />
        <Legend wrapperStyle={legendStyle} />
        <Bar dataKey="visitors" fill={WIKI_BLUE} name="Unique visitors" />
        <Bar dataKey="views" fill={WIKI_GRAY} name="Pageviews" />
      </BarChart>
    </ResponsiveContainer>
  );
}
