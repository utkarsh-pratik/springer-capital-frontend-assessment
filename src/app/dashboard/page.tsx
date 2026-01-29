"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { salesData } from "@/data/salesData";
import YearSelector from "@/components/atoms/YearSelector";
import ChartTypeSelector from "@/components/atoms/ChartTypeSelector";
import ChartCard from "@/components/molecules/ChartCard";
import StatCard from "@/components/molecules/StatCard";

const SalesChart = dynamic(
  () => import("@/components/organisms/SalesChart"),
  { ssr: false }
);

export default function DashboardPage() {
  const [year, setYear] = useState<2022 | 2023 | 2024>(2024);
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [threshold, setThreshold] = useState(0);

  const filteredData = salesData[year].filter(
    (item) => item.sales >= threshold
  );

  const totalSales = filteredData.reduce((sum, d) => sum + d.sales, 0);
  const avgSales =
    filteredData.length > 0
      ? Math.round(totalSales / filteredData.length)
      : 0;
  const peakMonth =
    filteredData.length > 0
      ? filteredData.reduce((a, b) => (a.sales > b.sales ? a : b)).month
      : "N/A";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-10">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Sales Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              An overview of sales performance for {year}.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              label="Total Sales"
              value={`$${totalSales.toLocaleString()}`}
            />
            <StatCard
              label="Average Sales"
              value={`$${avgSales.toLocaleString()}`}
            />
            <StatCard label="Peak Month" value={peakMonth} />
          </div>

          {/* Filters Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
            <div className="flex flex-wrap items-center gap-4">
              <YearSelector
                selectedYear={year}
                onChange={(year) => setYear(year as 2022 | 2023 | 2024)}
              />
              <ChartTypeSelector
                selectedType={chartType}
                onChange={setChartType}
              />
              <input
                type="number"
                value={threshold}
                placeholder="Minimum sales"
                className="border px-3 py-2 rounded-md w-full sm:w-auto"
                onChange={(e) => setThreshold(Number(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* Chart Card */}
          <ChartCard title={`Sales Overview - ${year}`}>
            <SalesChart data={filteredData} type={chartType} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
