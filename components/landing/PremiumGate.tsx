'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';

type GateState = {
  open: boolean;
  href: string;
  label: string;
};

type PremiumGateContextValue = {
  show: (href: string, label: string) => void;
  hide: () => void;
};

const PremiumGateContext = createContext<PremiumGateContextValue | null>(null);

export function usePremiumGate() {
  const ctx = useContext(PremiumGateContext);
  if (!ctx) {
    throw new Error('usePremiumGate måste användas inuti <PremiumGateProvider>');
  }
  return ctx;
}

export function PremiumGateProvider({
  isLoggedIn,
  isPremium,
  children,
}: {
  isLoggedIn: boolean;
  isPremium: boolean;
  children: ReactNode;
}) {
  const [state, setState] = useState<GateState>({ open: false, href: '', label: '' });

  const show = useCallback((href: string, label: string) => {
    setState({ open: true, href, label });
  }, []);

  const hide = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  const value = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <PremiumGateContext.Provider value={value}>
      {children}
      <PremiumGateModal
        state={state}
        onClose={hide}
        isLoggedIn={isLoggedIn}
        isPremium={isPremium}
      />
    </PremiumGateContext.Provider>
  );
}

function PremiumGateModal({
  state,
  onClose,
  isLoggedIn,
  isPremium,
}: {
  state: GateState;
  onClose: () => void;
  isLoggedIn: boolean;
  isPremium: boolean;
}) {
  if (!state.open) return null;

  const loginHref = `/login?redirect=${encodeURIComponent(state.href)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="premium-gate-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Stäng"
        onClick={onClose}
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-[480px] bg-white rounded-[28px] shadow-deep border border-border-light overflow-hidden">
        <div className="bg-gradient-to-br from-header-from to-header-to text-white px-8 pt-8 pb-10 relative overflow-hidden">
          <div
            className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-secondary/20 blur-3xl"
            aria-hidden
          />
          <div className="relative z-10">
            <span className="font-mono text-[10px] tracking-widest2 uppercase text-secondary-container/90">
              Premium krävs
            </span>
            <h3 id="premium-gate-title" className="font-display text-[32px] leading-tight mt-2">
              <span className="ed-italic text-secondary-container">{state.label}</span>
            </h3>
            <p className="text-white/72 text-[14px] leading-relaxed mt-3">
              Den här funktionen ingår i <strong className="text-white">Kliniker</strong>-prenumerationen.
              Få full åtkomst till alla 82 scenarier, AI-journalmall, Doseringskalkylator och fler verktyg.
            </p>
          </div>
        </div>

        <div className="px-8 py-7">
          <ul className="space-y-2.5 text-[13px] text-ink/75 mb-7">
            <li className="flex gap-3">
              <span className="text-status-ok mt-0.5">✓</span> Alla 8 domäner · 82 scenarier
            </li>
            <li className="flex gap-3">
              <span className="text-status-ok mt-0.5">✓</span> AI-journalmall + alla verktyg
            </li>
            <li className="flex gap-3">
              <span className="text-status-ok mt-0.5">✓</span> Bokmärken &amp; egna anteckningar
            </li>
            <li className="flex gap-3">
              <span className="text-status-ok mt-0.5">✓</span> 14 dagars provperiod utan kort
            </li>
          </ul>

          <div className="flex flex-col gap-3">
            <Link
              href="/pricing"
              onClick={onClose}
              className="btn-accent justify-center w-full"
            >
              Se prisplanerna <span aria-hidden>→</span>
            </Link>

            {!isLoggedIn ? (
              <Link href={loginHref} onClick={onClose} className="btn-ghost justify-center w-full">
                Har du redan konto? Logga in
              </Link>
            ) : !isPremium ? (
              <button onClick={onClose} className="btn-ghost justify-center w-full" type="button">
                Stäng
              </button>
            ) : (
              <Link href={state.href} onClick={onClose} className="btn-ghost justify-center w-full">
                Fortsätt till {state.label} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Convenience Link-komponent ──────────────────────────────────────

/**
 * <FeatureLink> — länk som öppnar PremiumGate vid klick om funktionen
 * är premium och användaren inte har åtkomst. Annars vanlig navigering.
 */
export function FeatureLink({
  href,
  tier,
  label,
  className,
  children,
}: {
  href: string;
  tier: 'free' | 'premium';
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const { show } = usePremiumGate();

  if (tier === 'free') {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        show(href, label);
      }}
    >
      {children}
    </Link>
  );
}
