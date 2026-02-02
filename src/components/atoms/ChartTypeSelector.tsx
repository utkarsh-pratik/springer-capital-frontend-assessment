// src/components/atoms/ChartTypeSelector.tsx

interface ChartTypeSelectorProps {
  selectedType: "bar" | "line" | "pie";
  onChange: (type: "bar" | "line" | "pie") => void;
}

export default function ChartTypeSelector({ selectedType, onChange }: ChartTypeSelectorProps) {
  return (
    <div>
      <label htmlFor="chartType" className="mb-1 block text-sm font-medium text-slate-700">
        Chart Type
      </label>
      <select
        id="chartType"
        value={selectedType}
        onChange={(e) => onChange(e.target.value as "bar" | "line" | "pie")}
        className="w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="bar">Bar</option>
        <option value="line">Line</option>
        <option value="pie">Pie</option>
      </select>
    </div>
  );
}
