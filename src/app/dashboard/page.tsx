/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import SalesChart from "@/components/organisms/SalesChart";
import { salesData } from "@/data/salesData";

export default function DashboardPage() {
  const [year, setYear] = useState<2022 | 2023 | 2024>(2024);
  const [chartType, setChartType] =
    useState<"bar" | "line" | "pie">("bar");

  const data = salesData.filter((item) => item.year === year);

  const total = data.reduce((s, d) => s + d.sales, 0);
  const avg = data.length > 0 ? Math.round(total / data.length) : 0;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Sales Dashboard</h1>
        <p className="text-slate-600 mt-1">
          Monitor trends, performance, and growth across years
        </p>
      </div>

      {/* KPI + Controls Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-sm text-slate-500">Total Sales</p>
          <p className="text-3xl font-bold text-indigo-600">
            ₹ {total}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-sm text-slate-500">Avg / Month</p>
          <p className="text-3xl font-bold text-green-600">
            ₹ {avg}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 space-y-3">
          <select
            value={year}
            onChange={(e) =>
              setYear(Number(e.target.value) as any)
            }
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value={2022}>2022</option>
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
          </select>

          <select
            value={chartType}
            onChange={(e) =>
              setChartType(e.target.value as any)
            }
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-xl font-semibold mb-4">
          {year} Sales Distribution
        </h2>
        <SalesChart 
          data={salesData
            .filter(item => item.year === year)
            .map(item => ({
              month: `${item.year}-${String(item.month).padStart(2, '0')}`,
              sales: item.sales
            }))}
          type={chartType} 
        />
      </div>
    </div>
  );
}
