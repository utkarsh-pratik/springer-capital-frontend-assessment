import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Springer Capital Frontend Assessment",
  description: "Sales dashboard built with Next.js 15",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
  {/* Top Navigation */}
  <nav className="bg-white border-b border-slate-200">
    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <span className="text-sm font-semibold tracking-wide">
        Springer Capital
      </span>

      <div className="flex gap-6 text-sm text-slate-600">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        <a href="/dashboard" className="hover:text-slate-900">Dashboard</a>
      </div>
    </div>
  </nav>

  {/* Page Content */}
  <main className="max-w-6xl mx-auto px-6 py-10">
    {children}
  </main>
</body>

    </html>
  );
}
