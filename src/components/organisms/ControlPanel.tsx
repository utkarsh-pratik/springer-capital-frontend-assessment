"use client";

export const ControlPanel = ({
  selectedYear,
  chartType,
  onYearChange,
  onChartTypeChange,
}: {
  selectedYear: number;
  chartType: "monthly" | "quarterly";
  onYearChange: (year: number) => void;
  onChartTypeChange: (type: "monthly" | "quarterly") => void;
}) => (
  <div className="rounded-xl border border-gray-200 bg-white/80 p-6 shadow-md backdrop-blur-sm">
    <h3 className="font-semibold text-gray-800">Controls</h3>
    <div className="mt-4 space-y-4">
      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-600">
          Year
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        >
          <option value={2024}>2024</option>
          <option value={2023}>2023</option>
          <option value={2022}>2022</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="chart-type"
          className="block text-sm font-medium text-gray-600"
        >
          Period
        </label>
        <select
          id="chart-type"
          value={chartType}
          onChange={(e) => onChartTypeChange(e.target.value as "monthly" | "quarterly")}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>
      </div>
    </div>
  </div>
);