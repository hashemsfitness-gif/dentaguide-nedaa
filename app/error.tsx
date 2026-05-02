"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

/**
 * app/error.tsx — Global error boundary
 * Catches unhandled errors and reports to Sentry.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    try {
      Sentry.captureException(error, {
        tags: { boundary: "global" },
        extra: { digest: error.digest },
      });
    } catch {
      // Sentry not initialized — log to console
      console.error("Global error boundary:", error);
    }
  }, [error]);

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4"
      role="alert"
      aria-live="assertive"
    >
      <div className="glass-card max-w-md w-full p-8 text-center">
        <div className="text-4xl mb-4" aria-hidden="true">
          ⚠️
        </div>
        <h1 className="text-xl font-semibold text-foreground mb-2">
          Något gick fel
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Ett oväntat fel har uppstått. Vårt team har meddelats automatiskt.
          {error.digest && (
            <span className="block mt-2 font-mono text-xs text-muted-foreground/60">
              Felkod: {error.digest}
            </span>
          )}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-nocturne-700 text-white rounded-lg hover:bg-nocturne-600 transition-colors focus-visible:outline-nocturne-400"
            aria-label="Försök igen"
          >
            Försök igen
          </button>
          <a
            href="/"
            className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
            aria-label="Gå till startsidan"
          >
            Startsidan
          </a>
        </div>
      </div>
    </div>
  );
}
