// src/components/atoms/YearSelector.tsx

interface YearSelectorProps {
  selectedYear: number;
  onChange: (year: number) => void;
}

export default function YearSelector({ selectedYear, onChange }: YearSelectorProps) {
  return (
    <div>
      <label htmlFor="year" className="mb-1 block text-sm font-medium text-slate-700">
        Year
      </label>
      <select
        id="year"
        value={selectedYear}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value={2024}>2024</option>
        <option value={2023}>2023</option>
        <option value={2022}>2022</option>
      </select>
    </div>
  );
}