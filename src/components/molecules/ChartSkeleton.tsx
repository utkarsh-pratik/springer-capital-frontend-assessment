// src/components/molecules/ChartSkeleton.tsx

export function ChartSkeleton() {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-200/50">
        <div className="h-full w-full animate-pulse rounded-lg bg-slate-200"></div>
      </div>
    );
  }