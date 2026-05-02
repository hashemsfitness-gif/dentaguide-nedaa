"use client";

import Link from "next/link";

/**
 * PremiumLock — Premium content gate with upgrade CTA.
 * Shows a blurred overlay with a clear upgrade path.
 */

interface PremiumLockProps {
  scenarioTitle: string;
}

export function PremiumLock({ scenarioTitle }: PremiumLockProps) {
  return (
    <div
      className="relative overflow-hidden rounded-xl"
      role="region"
      aria-label="Premium-innehåll låst"
    >
      {/* Blurred preview content */}
      <div className="premium-lock-overlay p-6 space-y-4" aria-hidden="true">
        <div className="skeleton h-6 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-20 w-full mt-4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-4/5" />
      </div>

      {/* Lock overlay content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
        <div className="glass-card p-8 max-w-sm w-full text-center space-y-4">
          {/* Lock icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-premium-gold/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-premium-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          <h3 className="text-lg font-bold text-foreground">
            Premium-innehåll
          </h3>

          <p className="text-sm text-muted-foreground">
            &ldquo;{scenarioTitle}&rdquo; kräver Kliniker- eller Klinik-plan.
            Uppgradera för att få tillgång till alla 82 kliniska scenarier.
          </p>

          <div className="space-y-2">
            <Link
              href="/priser"
              className="block w-full px-4 py-2.5 bg-premium-gold text-white font-semibold rounded-lg hover:bg-premium-gold-dark transition-colors focus-visible:outline-premium-gold"
              aria-label="Uppgradera till Premium"
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Uppgradera nu
              </span>
            </Link>

            <p className="text-xs text-muted-foreground">
              Från 199 kr/mån · 14 dagars gratis provperiod
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
