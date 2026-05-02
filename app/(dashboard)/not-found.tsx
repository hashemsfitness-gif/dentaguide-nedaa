import Link from "next/link";

/**
 * app/(dashboard)/not-found.tsx — Dashboard 404
 */
export default function DashboardNotFound() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="glass-card max-w-md w-full p-8 text-center">
        <div className="text-5xl mb-4 font-bold text-nocturne-400" aria-hidden="true">
          404
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Sidan hittades inte
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Denna sida finns inte i dashboard. Den kan ha tagits bort eller
          adressen är felaktig.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex px-4 py-2 bg-nocturne-700 text-white rounded-lg hover:bg-nocturne-600 transition-colors focus-visible:outline-nocturne-400"
          aria-label="Gå till dashboard"
        >
          Tillbaka till Dashboard
        </Link>
      </div>
    </div>
  );
}
