"use client";

import { useState } from "react";
import SalesChart from "@/components/organisms/SalesChart";
import YearSelector from "@/components/atoms/YearSelector";
import { salesData } from "@/data/salesData";

export default function DashboardPage() {
  const [year, setYear] = useState<2022 | 2023 | 2024>(2024);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">
        Sales Dashboard
      </h1>

      {/* Year Selector */}
      <div className="mb-6">
        <YearSelector selectedYear={year} onChange={setYear} />
      </div>

      {/* Chart Card */}
      <div className="bg-white rounded-xl shadow p-6">
        <SalesChart data={salesData[year]} />
      </div>
    </div>
  );
}
