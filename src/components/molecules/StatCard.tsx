
  export default function StatCard({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
          {label}
        </p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    );
  }
  