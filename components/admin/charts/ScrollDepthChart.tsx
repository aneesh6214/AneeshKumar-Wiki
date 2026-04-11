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
import type { ScrollPoint } from "@/lib/admin/queries";
import {
  GRID,
  SCROLL_COLORS,
  axisProps,
  tooltipStyle,
  legendStyle,
} from "./theme";

interface Props {
  data: ScrollPoint[];
  labels: { p1?: string; p2?: string; p3?: string };
}

function prettyPath(path: string): string {
  if (path === "/") return "Home";
  return path.split("/").filter(Boolean).join(" / ");
}

export default function ScrollDepthChart({ data, labels }: Props) {
  const series = (["p1", "p2", "p3"] as const)
    .filter((k) => labels[k])
    .map((k, i) => ({
      key: k,
      name: prettyPath(labels[k]!),
      fill: SCROLL_COLORS[i],
    }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: -8 }}>
        <CartesianGrid strokeDasharray="2 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="bucket" {...axisProps} />
        <YAxis {...axisProps} unit="%" domain={[0, 100]} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f8f9fa" }} />
        <Legend wrapperStyle={legendStyle} />
        {series.map((s) => (
          <Bar key={s.key} dataKey={s.key} fill={s.fill} name={s.name} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
