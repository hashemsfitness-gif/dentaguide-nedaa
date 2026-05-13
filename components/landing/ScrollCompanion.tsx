'use client';

export default function ScrollCompanion() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="scroll-companion"
      aria-label="Tillbaka till toppen"
      title="Tillbaka till toppen"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/characters/think.gif" alt="" />
    </button>
  );
}
