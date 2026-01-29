import Button from "./Button";

const years = [2022, 2023, 2024];

export default function YearSelector({
  selectedYear,
  onChange,
}: {
  selectedYear: number;
  onChange: (year: number) => void;
}) {
  return (
    <div className="flex gap-2">
      {years.map((year) => (
        <Button
          key={year}
          label={String(year)}
          active={selectedYear === year}
          onClick={() => onChange(year)}
        />
      ))}
    </div>
  );
}
