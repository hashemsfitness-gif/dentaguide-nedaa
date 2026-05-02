import Link from "next/link";

/**
 * app/not-found.tsx — Global 404 page
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-8 text-center">
        <div className="text-6xl mb-4 font-bold text-nocturne-400" aria-hidden="true">
          404
        </div>
        <h1 className="text-xl font-semibold text-foreground mb-2">
          Sidan hittades inte
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Sidan du letar efter finns inte eller har flyttats. Kontrollera
          adressen och försök igen.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="px-4 py-2 bg-nocturne-700 text-white rounded-lg hover:bg-nocturne-600 transition-colors focus-visible:outline-nocturne-400"
            aria-label="Gå till startsidan"
          >
            Startsidan
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
            aria-label="Gå till dashboard"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
