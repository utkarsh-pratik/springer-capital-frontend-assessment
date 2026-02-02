export const ChartCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-gray-200 bg-white/80 p-6 shadow-md backdrop-blur-sm transition-all hover:shadow-lg">
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <div className="mt-4">{children}</div>
  </div>
);
