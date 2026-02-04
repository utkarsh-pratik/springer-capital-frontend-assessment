/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import SalesChart from "@/components/organisms/SalesChart";
import { salesData } from "@/data/salesData";
import { RotateCcw } from "lucide-react";

export default function DashboardPage() {
  const [year, setYear] = useState<2022 | 2023 | 2024>(2024);
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [threshold, setThreshold] = useState<number>(5000);

  // Default values for reset
  //const DEFAULT_YEAR = 2024;
  //const DEFAULT_CHART_TYPE = "bar";
  //const DEFAULT_THRESHOLD = 5000;

  const handleReset = () => {
    setYear(2024);
    setChartType("bar");
    setThreshold(5000);
  };

  const filteredByYear = salesData.filter(
    (item) => item.year === year && item.sales >= threshold
  );
  const total = filteredByYear.reduce((s, d) => s + d.sales, 0);
  const avg = Math.round(total / filteredByYear.length);

  return (
    <div className="min-h-screen w-full p-6 pt-20 lg:p-8">
      <div className="mx-auto max-w-screen-2xl space-y-10">
        {/* Header with Reset Button */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Sales Dashboard</h1>
            <p className="mt-1 text-slate-600">
              Monitor trends, performance, and growth across years
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Filters
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Total Sales</p>
            <p className="text-3xl font-bold text-indigo-600">
              ₹ {total.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Avg / Month</p>
            <p className="text-3xl font-bold text-green-600">
              ₹ {avg.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Filters</h2>
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label
                htmlFor="year-select"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Year
              </label>
              <select
                id="year-select"
                value={year}
                onChange={(e) => setYear(Number(e.target.value) as any)}
                className="rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={2022}>2022</option>
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="chart-type-select"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Chart Type
              </label>
              <select
                id="chart-type-select"
                value={chartType}
                onChange={(e) => setChartType(e.target.value as any)}
                className="rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="threshold-input"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Threshold (₹)
              </label>
              <input
                id="threshold-input"
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-32 rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100"
            >
              <RotateCcw className="h-4 w-4" />
              Reset All Filters
            </button>
          </div>
        </div>

        {/* Chart Section */}
        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold">
            {year} Sales Distribution
          </h2>
          <div className="h-96 w-full">
            <SalesChart
              data={filteredByYear.map((item) => ({
                month: `${item.year}-${String(item.month).padStart(2, "0")}`,
                sales: item.sales,
              }))}
              type={chartType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
