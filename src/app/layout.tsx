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
      <body className="bg-gray-50 text-gray-900">
        {/* Navbar */}
        <nav className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
            <span className="font-semibold text-lg">
              Springer Capital
            </span>

            <div className="flex gap-6 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
