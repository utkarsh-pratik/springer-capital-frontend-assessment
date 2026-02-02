// src/components/molecules/StatCardSkeleton.tsx

export function StatCardSkeleton() {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200"></div>
        <div className="mt-2 h-8 w-1/2 animate-pulse rounded bg-slate-200"></div>
      </div>
    );
  }