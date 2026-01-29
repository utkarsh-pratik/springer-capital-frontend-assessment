type ChartType = "bar" | "line" | "pie";

type ChartTypeSelectorProps = {
  selectedType: ChartType;
  onChange: (type: ChartType) => void;
};

const chartTypes: ChartType[] = ["bar", "line", "pie"];

export default function ChartTypeSelector({
  selectedType,
  onChange,
}: ChartTypeSelectorProps) {
  return (
    <div className="flex gap-2">
      {chartTypes.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`px-4 py-2 capitalize rounded-md border transition
            ${
              selectedType === type
                ? "bg-green-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
