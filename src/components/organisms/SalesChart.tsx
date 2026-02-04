/* eslint-disable @typescript-eslint/no-explicit-any */
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
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SalesChartProps {
  data: { month: string; sales: number }[];
  type: "line" | "bar" | "pie";
}

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8",
  "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1", "#d084d0",
  "#a4de6c", "#83a6ed"
];

export default function SalesChart({ data, type }: SalesChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        No data available
      </div>
    );
  }

  // Aggregate data by month to remove duplicates
  const aggregatedData = data.reduce((acc: { month: string; sales: number }[], item) => {
    const existing = acc.find((d) => d.month === item.month);
    if (existing) {
      existing.sales += item.sales;
    } else {
      acc.push({ month: item.month, sales: item.sales });
    }
    return acc;
  }, []);

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height="100%" minHeight={300}>
        <BarChart data={aggregatedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis />
          <Tooltip formatter={(value: any) => `₹${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" name="Sales Amount" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height="100%" minHeight={300}>
        <LineChart data={aggregatedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month"
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis />
          <Tooltip formatter={(value: any) => `₹${value.toLocaleString()}`} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="sales" 
            stroke="#8884d8" 
            strokeWidth={2}
            name="Sales Amount"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (type === "pie") {
    // For pie chart, show month-wise breakdown
    const pieData = aggregatedData.map((item) => ({
      name: item.month,
      value: item.sales,
    }));

    return (
      <ResponsiveContainer width="100%" height="100%" minHeight={400}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => 
              `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip formatter={(value: any) => `₹${value.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return null;
}
