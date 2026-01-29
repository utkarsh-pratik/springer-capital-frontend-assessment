"use client";

import { useState } from "react";
import { salesData } from "@/data/salesData";
import SalesChart from "@/components/organisms/SalesChart";
import YearSelector from "@/components/atoms/YearSelector";
import ChartTypeSelector from "@/components/atoms/ChartTypeSelector";
import ChartCard from "@/components/molecules/ChartCard";

export default function DashboardPage() {
  const [year, setYear] = useState<2022 | 2023 | 2024>(2024);
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">
        Sales Dashboard
      </h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <YearSelector selectedYear={year} onChange={(year) => setYear(year as 2022 | 2023 | 2024)} />
        <ChartTypeSelector
          selectedType={chartType}
          onChange={setChartType}
        />
      </div>

      <ChartCard title={`Sales Overview - ${year}`}>
        <SalesChart
          data={salesData[year]}
          type={chartType}
        />
      </ChartCard>
    </div>
  );
}
