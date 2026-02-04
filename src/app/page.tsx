"use client";

import { useState } from "react";
import { DollarSign, ShoppingCart, TrendingUp, RotateCcw } from "lucide-react";
import { salesData } from "@/data/salesData";
import type { SalesDataItem } from "@/types/sales";
import { KpiCard } from "@/components/atoms/KpiCard";
import { ChartCard } from "@/components/molecules/ChartCard";
import { LineChart } from "@/components/molecules/LineChart";
import { PieChart } from "@/components/molecules/PieChart";
import { BarChart } from "@/components/molecules/BarChart";
import { ControlPanel } from "@/components/organisms/ControlPanel";

// --- Utility Functions ---
const calculateTotalSales = (data: SalesDataItem[], year: number) => {
  return data
    .filter((item) => item.year === year)
    .reduce((sum, item) => sum + item.sales, 0);
};

const calculateAvgSales = (data: SalesDataItem[], year: number) => {
  const filteredData = data.filter((item) => item.year === year);
  const total = filteredData.reduce((sum, item) => sum + item.sales, 0);
  return filteredData.length > 0 ? total / filteredData.length : 0;
};

const aggregateByCategory = (data: SalesDataItem[]) => {
  const categoryMap = new Map<string, number>();
  data.forEach((item) => {
    const current = categoryMap.get(item.category) || 0;
    categoryMap.set(item.category, current + item.sales);
  });
  return Array.from(categoryMap.entries())
    .map(([category, sales]) => ({
      category,
      sales,
    }))
    .sort((a, b) => b.sales - a.sales);
};

const aggregateByRegion = (data: SalesDataItem[]) => {
  const regionMap = new Map<string, number>();
  data.forEach((item) => {
    const current = regionMap.get(item.region) || 0;
    regionMap.set(item.region, current + item.sales);
  });
  return Array.from(regionMap.entries())
    .map(([region, sales]) => ({
      region,
      sales,
    }))
    .sort((a, b) => b.sales - a.sales);
};

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
      .map(([period, sales]) => ({
        period,
        sales,
      }))
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
      .map(([period, sales]) => ({
        period,
        sales,
      }))
      .sort((a, b) => a.period.localeCompare(b.period));
  }
};

// --- Main Page Component ---

export default function LandingPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [chartType, setChartType] = useState<"monthly" | "quarterly">("monthly");

  // Default values for reset
  const DEFAULT_YEAR = 2024;
  const DEFAULT_CHART_TYPE = "monthly";
  const DEFAULT_THRESHOLD = 0;

  const handleReset = () => {
    setSelectedYear(DEFAULT_YEAR);
    setChartType(DEFAULT_CHART_TYPE);
    setThreshold(DEFAULT_THRESHOLD);
  };

  const [threshold, setThreshold] = useState<number>(0);

  // Filter data by selected year and threshold
  const filteredData = salesData.filter(
    (item) => item.year === selectedYear && item.sales >= threshold
  );

  // Calculate KPIs
  const totalSales = calculateTotalSales(salesData, selectedYear);
  const avgSales = calculateAvgSales(salesData, selectedYear);
  const prevYearTotal = calculateTotalSales(salesData, selectedYear - 1);
  const growthRate =
    prevYearTotal > 0
      ? (((totalSales - prevYearTotal) / prevYearTotal) * 100).toFixed(1)
      : "N/A";

  // Prepare chart data
  const trendData = aggregateByPeriod(filteredData, chartType);
  const categoryData = aggregateByCategory(filteredData);
  const regionData = aggregateByRegion(filteredData);

  return (
    <main className="min-h-screen w-full p-6 pt-20 lg:p-8">
      <div className="mx-auto max-w-screen-2xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Sales Overview</h1>
          <p className="mt-2 text-lg text-gray-600">
            Welcome back, here&apos;s your performance summary for {selectedYear}.
          </p>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column: KPIs and Controls */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <KpiCard
              title="Total Sales"
              value={`$${totalSales.toLocaleString()}`}
              icon={DollarSign}
              trend={
                growthRate !== "N/A"
                  ? `${Number(growthRate) > 0 ? "+" : ""}${growthRate}% YoY`
                  : undefined
              }
            />
            <KpiCard
              title="Avg. Sale Value"
              value={`$${Math.round(avgSales).toLocaleString()}`}
              icon={ShoppingCart}
            />
            <KpiCard
              title="Total Transactions"
              value={filteredData.length.toLocaleString()}
              icon={TrendingUp}
            />

            <ControlPanel
              selectedYear={selectedYear}
              chartType={chartType}
              onYearChange={setSelectedYear}
              onChartTypeChange={setChartType}
            />

            {/* Threshold Filter */}
            <div className="rounded-xl border border-gray-200 bg-white/80 p-6 shadow-md backdrop-blur-sm">
              <h3 className="font-semibold text-gray-800">Sales Threshold</h3>
              <div className="mt-4 space-y-3">
                <div>
                  <label
                    htmlFor="threshold"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Minimum Sale Amount ($)
                  </label>
                  <input
                    id="threshold"
                    type="number"
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 text-base focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Showing {filteredData.length} transactions ≥ ${threshold.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Add this reset button card */}
            <div className="rounded-xl border border-gray-200 bg-white/80 p-6 shadow-md backdrop-blur-sm">
              <button
                onClick={handleReset}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 hover:shadow-md"
              >
                <RotateCcw className="h-4 w-4" />
                Reset All Filters
              </button>
            </div>
          </div>

          {/* Right Column: Main Charts */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <ChartCard title="Sales Trend">
              <LineChart data={trendData} />
            </ChartCard>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <ChartCard title="Sales by Category">
                <PieChart data={categoryData} />
              </ChartCard>
              <ChartCard title="Regional Performance">
                <BarChart data={regionData} />
              </ChartCard>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
