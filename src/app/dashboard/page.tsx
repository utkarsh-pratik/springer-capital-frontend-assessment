import SalesChart from "@/components/organisms/SalesChart";
import { salesData } from "@/data/salesData";

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-semibold mb-6">
        Sales Dashboard
      </h1>

      <div className="bg-white rounded-lg shadow p-6">
        <SalesChart data={salesData[2024]} />
      </div>
    </div>
  );
}
