import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Färgpalett (speglar globals.css :root + teman) ─────────────────
      colors: {
        // Gemensamma primära
        primary:           '#0E3B52',
        'primary-container': '#1E3028',
        secondary:         '#CC5833',
        'secondary-container': '#FF7E55',
        neutral:           '#F9F7F2',
        surface:           '#FCF9F8',

        // Status
        'status-ok':      '#2D6A4F',
        'status-warning': '#E07B39',
        'status-danger':  '#C1121F',
        'status-info':    '#0E3B52',
        'tertiary-gold':  '#C9A84C',

        // Stitch Pro (header-gradient + dark surfaces)
        'header-from':    '#0d4a65',
        'header-to':      '#062f40',
        'dark-surface':   '#0F1A14',
        'dark-bg':        '#062f40',

        // Stitch Pediatric
        'pediatric-warm': '#FFB59F',
        'pediatric-soft': '#FFDBD0',

        // Accenter
        accent:           'var(--accent-primary)',
        'accent-light':   'var(--accent-light)',
        'accent-hover':   'var(--accent-hover, #b04a29)',

        // Borders
        'border-light':   '#E5E3DF',
        'border-medium':  '#D1CEC9',
      },

      // ── Typografi ───────────────────────────────────────────────────────
      fontFamily: {
        display: ['Newsreader', 'Cormorant Garamond', 'serif'],
        body:    ['Plus Jakarta Sans', 'sans-serif'],
        mono:    ['IBM Plex Mono', 'Space Grotesk', 'monospace'],
      },

      // ── Border-radius (designsystemets skala) ───────────────────────────
      borderRadius: {
        'ds-sm':   '8px',
        'ds-md':   '12px',
        'ds-lg':   '16px',
        'ds-xl':   '24px',
        'ds-2xl':  '2rem',
        'ds-3xl':  '3rem',
        'ds-pill': '9999px',
      },

      // ── Box-shadow (designsystemets skuggor) ────────────────────────────
      boxShadow: {
        'ds-sm':   '0 2px 8px rgba(30, 81, 71, 0.08)',
        'ds-md':   '0 4px 16px rgba(30, 81, 71, 0.12)',
        'ds-lg':   '0 8px 32px rgba(31, 38, 135, 0.04)',
        'ds-xl':   '0 30px 60px rgba(9, 27, 20, 0.12)',
        'clay':    '0 8px 24px rgba(30, 48, 40, 0.06)',
        'clay-lg': '0 20px 50px rgba(9, 27, 20, 0.08)',
        'accent':  '0 8px 16px -4px rgba(204, 88, 51, 0.4)',
      },
    },
  },
  plugins: [],
} satisfies Config
