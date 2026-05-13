export function TierBadge({ tier }: { tier: 'free' | 'premium' }) {
  if (tier === 'free') {
    return (
      <span className="font-mono text-[10px] tracking-widest2 uppercase border border-status-ok/30 bg-status-ok/10 text-status-ok rounded-full px-2.5 py-0.5">
        Gratis
      </span>
    );
  }
  return (
    <span className="font-mono text-[10px] tracking-widest2 uppercase border border-secondary/30 bg-secondary/10 text-secondary rounded-full px-2.5 py-0.5">
      Premium
    </span>
  );
}
