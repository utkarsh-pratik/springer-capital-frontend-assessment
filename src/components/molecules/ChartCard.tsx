  export default function ChartCard({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-medium">{title}</h2>
        {children}
      </div>
    );
  }
  
  