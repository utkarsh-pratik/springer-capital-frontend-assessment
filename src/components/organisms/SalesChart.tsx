"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

const COLORS = [
  "#6366F1",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
  "#8B5CF6",
];

export default function SalesChart({
  data,
  type,
}: {
  data: { month: string; sales: number }[];
  type: "bar" | "line" | "pie";
}) {
  return (
    <div className="h-[380px] w-full">
      <ResponsiveContainer>
        {type === "bar" && (
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" radius={[6, 6, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        )}

        {type === "line" && (
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#6366F1"
              strokeWidth={3}
            />
          </LineChart>
        )}

        {type === "pie" && (
          <PieChart>
            <Tooltip />
            <Pie
              data={data}
              dataKey="sales"
              nameKey="month"
              cx="50%"
              cy="50%"
              outerRadius={130}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
