"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const WIKI_BLUE = "#3366cc";
const WIKI_GRAY = "#888";
const WIKI_RED = "#b32424";
const WIKI_GREEN = "#14866d";
const GRID = "#e5e5e5";
const TEXT = "#202122";

const axisProps = {
  tick: { fontSize: 11, fill: TEXT, fontFamily: "Arial, Helvetica, sans-serif" },
  stroke: "#a2a9b1",
};

const tooltipStyle = {
  border: "1px solid #a2a9b1",
  background: "#f8f9fa",
  fontSize: 12,
  fontFamily: "Arial, Helvetica, sans-serif",
  color: TEXT,
  borderRadius: 0,
};

interface DailyPoint {
  date: string;
  views: number;
  visitors: number;
}

export function PageviewsLineChart({ data }: { data: DailyPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: -8 }}>
        <CartesianGrid strokeDasharray="2 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="date" {...axisProps} interval={4} />
        <YAxis {...axisProps} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "#a2a9b1", strokeDasharray: "2 2" }} />
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

export function VisitorsVsSessionsBarChart({ data }: { data: DailyPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: -8 }}>
        <CartesianGrid strokeDasharray="2 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="date" {...axisProps} interval={4} />
        <YAxis {...axisProps} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f8f9fa" }} />
        <Legend
          wrapperStyle={{
            fontSize: 11,
            fontFamily: "Arial, Helvetica, sans-serif",
            color: TEXT,
          }}
        />
        <Bar dataKey="visitors" fill={WIKI_BLUE} name="Unique visitors" />
        <Bar dataKey="views" fill={WIKI_GRAY} name="Pageviews" />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface ScrollPoint {
  bucket: string;
  [k: string]: string | number;
}

interface ScrollChartProps {
  data: ScrollPoint[];
  labels: { p1?: string; p2?: string; p3?: string };
}

const SCROLL_COLORS = [WIKI_BLUE, WIKI_GREEN, WIKI_GRAY];

function prettyPath(path: string): string {
  if (path === "/") return "Home";
  return path.split("/").filter(Boolean).join(" / ");
}

export function ScrollDepthChart({ data, labels }: ScrollChartProps) {
  const series = (["p1", "p2", "p3"] as const)
    .filter((k) => labels[k])
    .map((k, i) => ({ key: k, name: prettyPath(labels[k]!), fill: SCROLL_COLORS[i] }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: -8 }}>
        <CartesianGrid strokeDasharray="2 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="bucket" {...axisProps} />
        <YAxis {...axisProps} unit="%" domain={[0, 100]} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f8f9fa" }} />
        <Legend
          wrapperStyle={{
            fontSize: 11,
            fontFamily: "Arial, Helvetica, sans-serif",
            color: TEXT,
          }}
        />
        {series.map((s) => (
          <Bar key={s.key} dataKey={s.key} fill={s.fill} name={s.name} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

interface PerfPoint {
  date: string;
  ttfb: number | null;
  lcp: number | null;
}

export function PerformanceLineChart({ data }: { data: PerfPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: -8 }}>
        <CartesianGrid strokeDasharray="2 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="date" {...axisProps} />
        <YAxis {...axisProps} unit="ms" />
        <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "#a2a9b1", strokeDasharray: "2 2" }} />
        <Legend
          wrapperStyle={{
            fontSize: 11,
            fontFamily: "Arial, Helvetica, sans-serif",
            color: TEXT,
          }}
        />
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

interface SlicePoint {
  name: string;
  value: number;
}

const PIE_PALETTE = [WIKI_BLUE, WIKI_GRAY, WIKI_GREEN, "#c8a951", "#7e57c2"];

export function CategoryDonut({ data }: { data: SlicePoint[] }) {
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
          style={{
            fontSize: 11,
            fontFamily: "Arial, Helvetica, sans-serif",
            fill: TEXT,
          }}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_PALETTE[i % PIE_PALETTE.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
