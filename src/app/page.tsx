import Link from "next/link";

export default function Home() {
  return (
    <section className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">
        Sales Analytics Dashboard
      </h1>

      <p className="text-gray-600 max-w-xl mx-auto mb-8">
        An interactive dashboard to visualize yearly sales data
        using modern frontend architecture and data visualization.
      </p>

      <Link
        href="/dashboard"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        View Dashboard →
      </Link>
    </section>
  );
}
