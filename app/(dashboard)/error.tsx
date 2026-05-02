"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

/**
 * app/(dashboard)/error.tsx — Dashboard error boundary
 * Reports to Sentry with dashboard context tag.
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    try {
      Sentry.captureException(error, {
        tags: { boundary: "dashboard" },
        extra: { digest: error.digest },
      });
    } catch {
      console.error("Dashboard error:", error);
    }
  }, [error]);

  return (
    <div
      className="flex items-center justify-center p-8"
      role="alert"
      aria-live="assertive"
    >
      <div className="glass-card max-w-md w-full p-8 text-center">
        <div className="text-4xl mb-4" aria-hidden="true">
          🔧
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Fel i dashboard
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Ett fel uppstod när sidan laddades. Prova att ladda om. Om problemet
          kvarstår, kontakta support.
          {error.digest && (
            <span className="block mt-2 font-mono text-xs text-muted-foreground/60">
              Ref: {error.digest}
            </span>
          )}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-nocturne-700 text-white rounded-lg hover:bg-nocturne-600 transition-colors focus-visible:outline-nocturne-400"
          aria-label="Försök igen"
        >
          Ladda om
        </button>
      </div>
    </div>
  );
}
