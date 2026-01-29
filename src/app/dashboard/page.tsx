"use client";

import { useState } from "react";
import { salesData } from "@/data/salesData";
import SalesChart from "@/components/organisms/SalesChart";
import YearSelector from "@/components/atoms/YearSelector";
import ChartTypeSelector from "@/components/atoms/ChartTypeSelector";
import ChartCard from "@/components/molecules/ChartCard";
import StatCard from "@/components/molecules/StatCard";

export default function DashboardPage() {
  const [year, setYear] = useState<2022 | 2023 | 2024>(2024);
  const [chartType, setChartType] =
    useState<"bar" | "line" | "pie">("bar");
  const [threshold, setThreshold] = useState(0);

  const data = salesData[year].filter(
    (item) => item.sales >= threshold
  );

  const totalSales = data.reduce((sum, d) => sum + d.sales, 0);
  const avgSales =
    data.length > 0 ? Math.round(totalSales / data.length) : 0;
  const peakMonth =
    data.length > 0
      ? data.reduce((a, b) => (a.sales > b.sales ? a : b)).month
      : "—";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Sales Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Interactive overview of yearly sales performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard label="Total Sales" value={`₹ ${totalSales}`} />
        <StatCard label="Average Monthly Sales" value={`₹ ${avgSales}`} />
        <StatCard label="Best Month" value={peakMonth} />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="grid md:grid-cols-3 gap-6">
        <div className="flex flex-wrap gap-4 mb-6">
        <YearSelector
          selectedYear={year}
          onChange={(year) => setYear(year as 2022 | 2023 | 2024)}
        />
        </div>
          <div>
            <p className="text-sm mb-2 font-medium">Chart Type</p>
            <ChartTypeSelector
              selectedType={chartType}
              onChange={setChartType}
            />
          </div>

          <div>
            <p className="text-sm mb-2 font-medium">Minimum Sales</p>
            <input
              type="number"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="e.g. 20000"
              value={threshold}
              onChange={(e) =>
                setThreshold(Number(e.target.value))
              }
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <ChartCard title={`Sales Overview – ${year}`}>
        {data.length > 0 ? (
          <SalesChart data={data} type={chartType} />
        ) : (
          <p className="text-center text-gray-500 py-10">
            No data matches the selected filter.
          </p>
        )}
      </ChartCard>
    </div>
  );
}
