import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import * as Sentry from "@sentry/nextjs";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "./globals.css";

// ── Fonts ───────────────────────────────────────────────────────
const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ── Sentry initialization ───────────────────────────────────────
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: process.env.NODE_ENV,
  });
}

// ── Metadata ────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "DentaGuide-Pro — Kliniskt beslutsstöd för tandläkare",
    template: "%s | DentaGuide-Pro",
  },
  description:
    "Evidensbaserade kliniska protokoll, journalmallar, läkemedelsstöd och AI-driven journalstrukturering vid patientstolen. Byggt för svenska tandläkare.",
  keywords: [
    "tandläkare",
    "beslutsstöd",
    "kliniskt stöd",
    "dental",
    "journalmall",
    "endodonti",
    "parodontologi",
    "pedodonti",
    "dosering",
    "antibiotika",
  ],
  authors: [{ name: "DentaGuide-Pro" }],
  creator: "DentaGuide-Pro",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: "DentaGuide-Pro",
    title: "DentaGuide-Pro — Kliniskt beslutsstöd för tandläkare",
    description:
      "Evidensbaserade kliniska protokoll, journalmallar och AI-stöd vid patientstolen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DentaGuide-Pro",
    description: "Kliniskt beslutsstöd för svenska tandläkare",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0E3B52",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// ── Root Layout ─────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {/* Skip to main content — WCAG 2.1 AA */}
        <a href="#main-content" className="skip-link">
          Hoppa till huvudinnehåll
        </a>

        <QueryProvider>
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </QueryProvider>

        {/* PSL Disclaimer — visas på varje sida */}
        <footer className="psl-disclaimer" role="contentinfo">
          <p>
            <strong>⚠️ PSL 2010:659</strong> — DentaGuide-Pro är ett
            beslutsstödssystem och ersätter inte kvalificerad klinisk
            bedömning. Varje rekommendation måste granskas och godkännas av
            legitimerad tandläkare innan klinisk användning.
          </p>
          <p>
            © {new Date().getFullYear()} DentaGuide-Pro. Alla rättigheter
            förbehållna.
          </p>
        </footer>
      </body>
    </html>
  );
}
