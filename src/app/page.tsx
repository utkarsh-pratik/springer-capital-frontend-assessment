"use client";

import { useState } from "react";
import { salesData } from "@/data/salesData";
import { ChartCard } from "@/components/molecules/ChartCard";
import { LineChart } from "@/components/molecules/LineChart";
import { PieChart } from "@/components/molecules/PieChart";
import { BarChart } from "@/components/molecules/BarChart";
import type { SalesDataItem } from "@/types/sales";

const aggregateByPeriod = (
  data: SalesDataItem[],
  type: "monthly" | "quarterly"
) => {
  if (type === "monthly") {
    const monthMap = new Map<string, number>();
    data.forEach((item) => {
      const key = `${item.year}-${String(item.month).padStart(2, "0")}`;
      const current = monthMap.get(key) || 0;
      monthMap.set(key, current + item.sales);
    });
    return Array.from(monthMap.entries())
      .map(([period, sales]) => ({ period, sales }))
      .sort((a, b) => a.period.localeCompare(b.period));
  } else {
    const quarterMap = new Map<string, number>();
    data.forEach((item) => {
      const quarter = Math.ceil(item.month / 3);
      const key = `${item.year}-Q${quarter}`;
      const current = quarterMap.get(key) || 0;
      quarterMap.set(key, current + item.sales);
    });
    return Array.from(quarterMap.entries())
      .map(([period, sales]) => ({ period, sales }))
      .sort((a, b) => a.period.localeCompare(b.period));
  }
};

const aggregateByCategory = (data: SalesDataItem[]) => {
  const categoryMap = new Map<string, number>();
  data.forEach((item) => {
    const current = categoryMap.get(item.category) || 0;
    categoryMap.set(item.category, current + item.sales);
  });
  return Array.from(categoryMap.entries())
    .map(([category, sales]) => ({ category, sales }))
    .sort((a, b) => b.sales - a.sales);
};

const aggregateByRegion = (data: SalesDataItem[]) => {
  const regionMap = new Map<string, number>();
  data.forEach((item) => {
    const current = regionMap.get(item.region) || 0;
    regionMap.set(item.region, current + item.sales);
  });
  return Array.from(regionMap.entries())
    .map(([region, sales]) => ({ region, sales }))
    .sort((a, b) => b.sales - a.sales);
};

export default function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [chartType, setChartType] = useState<"monthly" | "quarterly">("monthly");
  const [threshold, setThreshold] = useState<number>(5000);

  const filteredData = salesData.filter(
    (item) => item.year === selectedYear && item.sales >= threshold
  );

  const trendData = aggregateByPeriod(filteredData, chartType);
  const categoryData = aggregateByCategory(filteredData);
  const regionData = aggregateByRegion(filteredData);

  return (
    <main className="min-h-screen w-full p-6 pt-20 lg:p-8">
      <div className="mx-auto max-w-screen-2xl">
        {/* Header */}
        <header className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Detailed Analytics Dashboard
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Advanced filtering and visualization for {selectedYear}
            </p>
          </div>
        </header>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4 rounded-xl border border-gray-200 bg-white/80 p-4 shadow-md backdrop-blur-sm">
          <div>
            <label htmlFor="year-filter" className="block text-sm font-medium text-gray-600">
              Year
            </label>
            <select
              id="year-filter"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="mt-1 block rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value={2024}>2024</option>
              <option value={2023}>2023</option>
              <option value={2022}>2022</option>
            </select>
          </div>
          <div>
            <label htmlFor="period-filter" className="block text-sm font-medium text-gray-600">
              Period
            </label>
            <select
              id="period-filter"
              value={chartType}
              onChange={(e) => setChartType(e.target.value as "monthly" | "quarterly")}
              className="mt-1 block rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>
          <div>
            <label htmlFor="threshold-filter" className="block text-sm font-medium text-gray-600">
              Sales Threshold ($)
            </label>
            <input
              id="threshold-filter"
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="mt-1 block w-32 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 text-base focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <ChartCard title="Sales Trend Over Time">
              <LineChart data={trendData} />
            </ChartCard>
          </div>
          <ChartCard title="Sales by Category">
            <PieChart data={categoryData} />
          </ChartCard>
          <ChartCard title="Regional Performance">
            <BarChart data={regionData} />
          </ChartCard>
        </div>

        {/* Data Summary */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white/80 p-6 shadow-md backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-gray-800">Data Summary</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <p className="text-sm text-gray-500">Filtered Transactions</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredData.length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">
                ${filteredData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Sale</p>
              <p className="text-2xl font-bold text-gray-900">
                ${filteredData.length > 0 
                  ? Math.round(filteredData.reduce((sum, item) => sum + item.sales, 0) / filteredData.length).toLocaleString()
                  : 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Profit</p>
              <p className="text-2xl font-bold text-gray-900">
                ${filteredData.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
