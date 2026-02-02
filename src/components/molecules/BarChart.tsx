"use client";

export const BarChart = ({
  data,
}: {
  data: Array<{ region: string; sales: number }>;
}) => {
  if (data.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center text-gray-400">
        No data available
      </div>
    );
  }

  const maxSales = Math.max(...data.map((d) => d.sales));
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="h-60 w-full p-4">
      <div className="flex h-48 items-end justify-around gap-4">
        {data.map((d, i) => {
          const height = (d.sales / maxSales) * 100;
          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div className="text-xs font-semibold text-gray-700">
                ${(d.sales / 1000).toFixed(0)}K
              </div>
              <div
                className="w-full rounded-t transition-all hover:opacity-80"
                style={{
                  height: `${height}%`,
                  backgroundColor: colors[i % colors.length],
                  minHeight: "4px",
                }}
              />
              <div className="text-xs font-medium text-gray-600">{d.region}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};