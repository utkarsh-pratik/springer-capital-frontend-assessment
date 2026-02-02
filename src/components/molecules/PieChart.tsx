"use client";

export const PieChart = ({
  data,
}: {
  data: Array<{ category: string; sales: number }>;
}) => {
  if (data.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center text-gray-400">
        No data available
      </div>
    );
  }

  const total = data.reduce((sum, d) => sum + d.sales, 0);
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  // Calculate all angles using reduce
  const paths = data.reduce<
    Array<{
      d: string;
      color: string;
      label: string;
      percentage: string;
    }>
  >((acc, d, i) => {
    const percentage = d.sales / total;
    const angle = percentage * 360;

    // Get accumulated angle from previous slices
    const startAngle = acc.reduce((sum, item) => {
      const prevPercentage = parseFloat(item.percentage) / 100;
      return sum + prevPercentage * 360;
    }, -90);

    const endAngle = startAngle + angle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = 100 + 80 * Math.cos(startRad);
    const y1 = 100 + 80 * Math.sin(startRad);
    const x2 = 100 + 80 * Math.cos(endRad);
    const y2 = 100 + 80 * Math.sin(endRad);
    const largeArc = angle > 180 ? 1 : 0;

    return [
      ...acc,
      {
        d: `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`,
        color: colors[i % colors.length],
        label: d.category,
        percentage: (percentage * 100).toFixed(1),
      },
    ];
  }, []);

  return (
    <div className="flex h-60 w-full items-center justify-center">
      <div className="flex gap-6">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {paths.map((path, i) => (
            <path key={i} d={path.d} fill={path.color} />
          ))}
        </svg>
        <div className="flex flex-col justify-center gap-2">
          {paths.map((path, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded"
                style={{ backgroundColor: path.color }}
              />
              <span className="text-sm text-gray-700">
                {path.label} ({path.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};