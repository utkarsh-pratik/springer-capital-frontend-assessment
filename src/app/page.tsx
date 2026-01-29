import Link from "next/link";

export default function Home() {
  return (
    <section className="mt-24 max-w-2xl">
      <h1 className="text-3xl font-semibold mb-4">
        Sales Analytics Dashboard
      </h1>

      <p className="text-sm text-slate-500 mb-8 leading-relaxed">
        A clean, interactive dashboard to explore yearly sales performance
        using modern frontend architecture and data visualization.
      </p>

      <Link
        href="/dashboard"
        className="inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition"
      >
        View Dashboard →
      </Link>
    </section>
  );
}
