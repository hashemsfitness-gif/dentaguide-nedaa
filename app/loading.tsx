/**
 * app/loading.tsx — Global loading state
 * Shown while root layout children are loading.
 */
export default function Loading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      role="status"
      aria-label="Laddar..."
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated tooth icon */}
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-nocturne-700/20 border-t-nocturne-400 animate-spin" />
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">
          Laddar DentaGuide-Pro...
        </p>
      </div>
    </div>
  );
}
