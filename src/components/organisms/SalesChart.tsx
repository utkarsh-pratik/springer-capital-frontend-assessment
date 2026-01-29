"use client";

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import { SalesData } from "@/types/sales";

interface SalesChartProps {
  data: SalesData[];
  type: "bar" | "line" | "pie";
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function SalesChart({ data, type }: SalesChartProps) {
  // Ensure the chart has a container with a defined size to render into.
  return (
    <ResponsiveContainer width="100%" height={400}>
      {type === "bar" ? (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      ) : type === "line" ? (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
        </LineChart>
      ) : (
        <PieChart>
          <Pie data={data} dataKey="sales" nameKey="month" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </ResponsiveContainer>
  );
}
