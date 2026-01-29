"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type SalesChartProps = {
  data: { month: string; sales: number }[];
};

export default function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
