"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type SalesChartProps = {
  data: { month: string; sales: number }[];
  type: "bar" | "line" | "pie";
};

export default function SalesChart({ data, type }: SalesChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        {type === "bar" && (
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" />
          </BarChart>
        )}

        {type === "line" && (
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" />
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
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} />
              ))}
            </Pie>
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
