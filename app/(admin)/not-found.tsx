import Link from "next/link";

/**
 * app/(admin)/not-found.tsx — Admin 404
 */
export default function AdminNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-8">
      <div className="glass-card max-w-md w-full p-8 text-center">
        <div className="text-5xl mb-4 font-bold text-nocturne-400" aria-hidden="true">
          404
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Admin-sidan hittades inte
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Den admin-sida du letar efter finns inte. Kontrollera adressen
          och försök igen.
        </p>
        <Link
          href="/admin"
          className="inline-flex px-4 py-2 bg-nocturne-700 text-white rounded-lg hover:bg-nocturne-600 transition-colors focus-visible:outline-nocturne-400"
          aria-label="Gå till admin-panelen"
        >
          Tillbaka till Admin
        </Link>
      </div>
    </div>
  );
}
