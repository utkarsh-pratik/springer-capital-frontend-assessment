type YearSelectorProps = {
    selectedYear: number;
    onChange: (year: number) => void;
  };
  
  const years = [2022, 2023, 2024];
  
  export default function YearSelector({
    selectedYear,
    onChange,
  }: YearSelectorProps) {
    return (
      <div className="flex gap-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onChange(year)}
            className={`px-4 py-2 rounded-md border transition
              ${
                selectedYear === year
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            {year}
          </button>
        ))}
      </div>
    );
  }
  