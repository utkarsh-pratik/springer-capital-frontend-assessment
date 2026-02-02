export const KpiCard = ({
    title,
    value,
    icon: Icon,
    trend,
  }: {
    title: string;
    value: string;
    icon: React.ElementType;
    trend?: string;
  }) => (
    <div className="rounded-xl border border-gray-200 bg-white/80 p-6 shadow-md backdrop-blur-sm transition-all hover:shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      {trend && <p className="mt-1 text-sm font-medium text-green-600">{trend}</p>}
    </div>
  );
  