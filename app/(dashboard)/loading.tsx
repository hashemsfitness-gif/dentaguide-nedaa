/**
 * app/(dashboard)/loading.tsx — Dashboard-specific loading state
 */
export default function DashboardLoading() {
  return (
    <div
      className="space-y-6 animate-in fade-in duration-300"
      role="status"
      aria-label="Laddar dashboard..."
    >
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="skeleton h-8 w-48" />
        <div className="skeleton h-8 w-24 rounded-lg" />
      </div>

      {/* Category grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass-card p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="skeleton h-10 w-10 rounded-lg" />
              <div className="flex-1">
                <div className="skeleton h-4 w-3/4 mb-2" />
                <div className="skeleton h-3 w-1/2" />
              </div>
            </div>
            <div className="skeleton h-3 w-full" />
            <div className="skeleton h-3 w-2/3" />
          </div>
        ))}
      </div>

      {/* Recent scenarios skeleton */}
      <div className="space-y-3">
        <div className="skeleton h-6 w-40 mb-4" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 glass-card">
            <div className="skeleton h-8 w-8 rounded" />
            <div className="flex-1">
              <div className="skeleton h-4 w-2/3 mb-1" />
              <div className="skeleton h-3 w-1/3" />
            </div>
            <div className="skeleton h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
