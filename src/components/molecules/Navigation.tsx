"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Home } from "lucide-react";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed right-6 top-6 z-50 flex gap-2 rounded-xl border border-gray-200 bg-white/90 p-2 shadow-lg backdrop-blur-sm">
      <Link
        href="/"
        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
          pathname === "/"
            ? "bg-indigo-500 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">Overview</span>
      </Link>
      <Link
        href="/dashboard"
        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
          pathname === "/dashboard"
            ? "bg-indigo-500 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <LayoutDashboard className="h-4 w-4" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>
    </nav>
  );
};