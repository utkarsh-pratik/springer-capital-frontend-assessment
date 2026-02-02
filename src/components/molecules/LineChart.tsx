"use client";

export const LineChart = ({
  data,
}: {
  data: Array<{ period: string; sales: number }>;
}) => {
  if (data.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center text-gray-400">
        No data available
      </div>
    );
  }

  const maxSales = Math.max(...data.map((d) => d.sales));
  const minSales = Math.min(...data.map((d) => d.sales));
  const chartHeight = 200;
  const chartWidth = 800;
  const padding = 40;

  return (
    <div className="relative h-60 w-full">
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${chartWidth} ${chartHeight + padding}`}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line
              x1="0"
              y1={i * (chartHeight / 4)}
              x2={chartWidth}
              y2={i * (chartHeight / 4)}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <text
              x="-5"
              y={i * (chartHeight / 4) + 4}
              fontSize="10"
              fill="#9ca3af"
              textAnchor="end"
            >
              ${((maxSales - (maxSales - minSales) * (i / 4)) / 1000).toFixed(0)}k
            </text>
          </g>
        ))}

        {/* Area fill */}
        <path
          d={`M 0,${chartHeight} ${data
            .map((d, i) => {
              const x = (i / (data.length - 1)) * chartWidth;
              const y =
                chartHeight -
                ((d.sales - minSales) / (maxSales - minSales)) * chartHeight;
              return `L ${x},${y}`;
            })
            .join(" ")} L ${chartWidth},${chartHeight} Z`}
          fill="url(#gradient)"
          opacity="0.3"
        />

        {/* Line path */}
        <polyline
          points={data
            .map((d, i) => {
              const x = (i / (data.length - 1)) * chartWidth;
              const y =
                chartHeight -
                ((d.sales - minSales) / (maxSales - minSales)) * chartHeight;
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
        />

        {/* Data points */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * chartWidth;
          const y =
            chartHeight -
            ((d.sales - minSales) / (maxSales - minSales)) * chartHeight;
          return <circle key={i} cx={x} cy={y} r="4" fill="#3b82f6" />;
        })}

        {/* X-axis labels */}
        {data.map((d, i) => {
          if (i % Math.ceil(data.length / 8) === 0) {
            const x = (i / (data.length - 1)) * chartWidth;
            return (
              <text
                key={i}
                x={x}
                y={chartHeight + 20}
                fontSize="10"
                fill="#9ca3af"
                textAnchor="middle"
              >
                {d.period.split("-")[1]}
              </text>
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
};