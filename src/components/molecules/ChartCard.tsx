type ChartCardProps = {
    title: string;
    children: React.ReactNode;
  };
  
  export default function ChartCard({ title, children }: ChartCardProps) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
      </div>
    );
  }
  