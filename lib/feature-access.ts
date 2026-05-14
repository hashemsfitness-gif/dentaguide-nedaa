/**
 * Feature access — central konfiguration för Free vs Premium.
 *
 * Free (publik, ingen login):
 *   - Första scenariot per klinisk område: Endodonti, Parodontologi, Protetik,
 *     Oralmedicin, Pedodonti, Käkkirurgi.
 *   - Verktyg: TraumaGuide, AntibiotikaTool, ParodKlassificerare,
 *     Manuell journalmall (rate-limit 4/dag implementeras separat).
 *
 * Premium (kräver login + tier='kliniker' eller 'klinik'):
 *   - Övriga scenarier inom områdena
 *   - Bettfysiologi, Ortodonti (alla scenarier)
 *   - AI-journalmall, Dosering, Debitering, Läkemedelskort
 *   - Simulator, Dashboard, Bokmärken, Anteckningar
 *
 * Auth-only (kräver login, oberoende av tier):
 *   - /dashboard
 *   - /simulator/*  (även gratis-användare loggade in)
 */

export type FeatureTier = 'free' | 'premium';

/**
 * Route-krav:
 *   - 'public'    = ingen login krävs (free-content)
 *   - 'auth-only' = login krävs men ingen tier-koll (t.ex. /dashboard,
 *                   där gratis-användare ändå har personlig översikt
 *                   och ser premium-gates på enskilda kort)
 *   - 'premium'   = login + tier 'kliniker' eller 'klinik' krävs
 */
export type RouteRequirement = 'public' | 'auth-only' | 'premium';

export const FIRST_SCENARIO_BY_AREA: Record<string, string> = {
  endodonti: 'asymtomatisk-apikal-parodontit',
  parodontologi: 'gingivit-parodontit',
  protetik: 'krona-bro-lossnad',
  oralmedicin: 'afte-stomatit',
  kakkirurgi: 'postop-blodning',
  pedodonti: 'trauma-primara',
};

// Exakta sökvägar som är publika (matchar pathname strikt)
export const FREE_EXACT_PATHS = new Set<string>([
  '/endodonti',
  '/parodontologi',
  '/protetik',
  '/oralmedicin',
  '/kakkirurgi',
  '/pedodonti',
  // Första scenario per område
  '/endodonti/asymtomatisk-apikal-parodontit',
  '/parodontologi/gingivit-parodontit',
  '/protetik/krona-bro-lossnad',
  '/oralmedicin/afte-stomatit',
  '/kakkirurgi/postop-blodning',
  '/pedodonti/trauma-primara',
  // Verktyg (alltid gratis)
  '/tools/antibiotika',
  '/tools/parod-klassificering',
  '/tools/journalmall',
  '/tools/journalmall/manuell',
]);

// Prefix-sökvägar som är publika (TraumaGuide har subroutes)
export const FREE_PREFIX_PATHS = ['/tools/traumaguide'];

/**
 * Är pathname tillgänglig utan login?
 * Används av middleware för att släppa igenom free-routes.
 */
export function isFreeAccessible(pathname: string): boolean {
  if (FREE_EXACT_PATHS.has(pathname)) return true;
  if (FREE_PREFIX_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return true;
  return false;
}

/**
 * Vilken tier krävs för denna route?
 * Används av UI-komponenter för att rendera badge + premium-gate.
 */
export function getRequiredTier(pathname: string): FeatureTier {
  return 'free'; // Öppna upp allt under testfasen
}

// ── UI-mappning (badge per landing/dashboard-kort) ──────────────────

export type CardFeature = {
  href: string;
  tier: FeatureTier;
};

/** Domänkort på landing/dashboard — vilka kort är free vs premium. */
export const DOMAIN_FEATURES: Record<string, FeatureTier> = {
  '/endodonti': 'free',
  '/parodontologi': 'free',
  '/protetik': 'free',
  '/oralmedicin': 'free',
  '/kakkirurgi': 'free',
  '/pedodonti': 'free',
  '/bettfysiologi': 'premium',
  '/ortodonti': 'premium',
};

/** Verktygskort på landing/dashboard. */
export const TOOL_FEATURES: Record<string, FeatureTier> = {
  '/tools/traumaguide': 'free',
  '/tools/antibiotika': 'free',
  '/tools/parod-klassificering': 'free',
  '/tools/journalmall/manuell': 'free',
  '/tools/journalmall': 'free',
  '/tools/journalmall/ai-assisterad': 'premium',
  '/tools/dosering': 'premium',
  '/tools/debitering': 'premium',
  '/tools/lakemedel': 'premium',
};

/** Simulator-kort. */
export const SIMULATOR_FEATURES: Record<string, FeatureTier> = {
  '/simulator': 'premium',
  '/simulator/historik': 'premium',
  '/simulator/leaderboard': 'premium',
};

export function featureTierForHref(href: string): FeatureTier {
  if (href in DOMAIN_FEATURES) return DOMAIN_FEATURES[href];
  if (href in TOOL_FEATURES) return TOOL_FEATURES[href];
  if (href in SIMULATOR_FEATURES) return SIMULATOR_FEATURES[href];
  // Fallback: prefix-match
  if (FREE_PREFIX_PATHS.some((p) => href === p || href.startsWith(`${p}/`))) return 'free';
  return 'premium';
}

// ── Auth-only routes (inloggning krävs, men ingen tier-koll i middleware) ──
// Dessa sidor visar personlig vy + premium-gate på enskilda funktioner.

const AUTH_ONLY_PATHS = new Set<string>(['/dashboard']);
const AUTH_ONLY_PREFIXES = ['/dashboard/'];

export function getRouteRequirement(pathname: string): RouteRequirement {
  if (isFreeAccessible(pathname)) return 'public';
  // Allt annat kräver bara inloggning (auth-only), ingen tier-kontroll i middleware
  return 'auth-only';
}
