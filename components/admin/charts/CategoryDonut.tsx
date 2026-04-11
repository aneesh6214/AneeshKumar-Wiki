"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { SlicePoint } from "@/lib/admin/queries";
import { PIE_PALETTE, TEXT, FONT_FAMILY, tooltipStyle } from "./theme";

export default function CategoryDonut({ data }: { data: SlicePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Tooltip contentStyle={tooltipStyle} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={40}
          outerRadius={70}
          paddingAngle={1}
          stroke="#ffffff"
          strokeWidth={1}
          label={({ name, value }) => `${name} ${value}%`}
          labelLine={false}
          style={{ fontSize: 11, fontFamily: FONT_FAMILY, fill: TEXT }}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_PALETTE[i % PIE_PALETTE.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
