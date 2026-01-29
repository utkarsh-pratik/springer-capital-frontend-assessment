type StatCardProps = {
    label: string;
    value: string;
  };
  
  export default function StatCard({ label, value }: StatCardProps) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-5">
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    );
  }
  