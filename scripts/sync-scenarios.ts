/**
 * scripts/sync-scenarios.ts — HTML → Supabase scenario sync
 *
 * Reads HTML files from content/scenarios/[area]/*.html
 * and upserts them into the scenarios table via scenario_code.
 *
 * Usage: npx tsx scripts/sync-scenarios.ts
 */

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import { JSDOM } from "jsdom";

// ── Configuration ───────────────────────────────────────────

const CONTENT_DIR = path.join(process.cwd(), "content", "scenarios");

const AREA_CATEGORY_MAP: Record<string, string> = {
  endodonti: "endodonti",
  parodontologi: "parodontologi",
  protetik: "protetik",
  oralmedicin: "oralmedicin",
  kakkirurgi: "kakkirurgi",
  bettfysiologi: "bettfysiologi",
  "pedodonti-trauma": "pedodonti-trauma",
  "pedodonti-akut": "pedodonti-akut",
  "pedodonti-munslemhinna": "pedodonti-munslemhinna",
  "pedodonti-beteende": "pedodonti-beteende",
  ortodonti: "ortodonti",
  allmant: "allmant",
};

// ── Supabase client (service role — bypasses RLS) ───────────

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// ── HTML parser ─────────────────────────────────────────────

interface ParsedScenario {
  scenarioCode: string;
  title: string;
  slug: string;
  icdCode: string | null;
  definition: string | null;
  anamnes: string | null;
  statusSection: string | null;
  diagnostik: string | null;
  behandling: string | null;
  uppfoljning: string | null;
  komplikationer: string | null;
  redFlags: Array<{
    id: string;
    title: string;
    description: string;
    severity: "critical" | "warning";
  }>;
  referencesText: string | null;
  isPremium: boolean;
  patientQuote: string | null;
  troligDiagnos: string | null;
  differentialdiagnoser: string[];
  kallor: Array<{ name: string; url?: string }>;
  difficulty: "basic" | "standard" | "advanced";
}

function parseHtmlFile(filePath: string): ParsedScenario | null {
  try {
    const html = fs.readFileSync(filePath, "utf-8");
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Extract metadata from data attributes or structured HTML
    const title =
      doc.querySelector("h1")?.textContent?.trim() ||
      doc.querySelector("[data-title]")?.getAttribute("data-title") ||
      path.basename(filePath, ".html");

    const scenarioCode =
      doc
        .querySelector("[data-scenario-code]")
        ?.getAttribute("data-scenario-code") ||
      path.basename(filePath, ".html").toUpperCase().replace(/-/g, "_");

    const slug = path
      .basename(filePath, ".html")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-");

    const icdCode =
      doc.querySelector("[data-icd-code]")?.getAttribute("data-icd-code") ||
      doc.querySelector(".icd-code")?.textContent?.trim() ||
      null;

    const isPremium =
      doc.querySelector("[data-premium]")?.getAttribute("data-premium") ===
      "true";

    // Extract content sections
    const getSection = (selector: string): string | null => {
      const el =
        doc.querySelector(`[data-section="${selector}"]`) ||
        doc.querySelector(`.${selector}`) ||
        doc.querySelector(`#${selector}`);
      return el?.innerHTML?.trim() || null;
    };

    // Extract red flags
    const redFlags: ParsedScenario["redFlags"] = [];
    const flagElements = doc.querySelectorAll("[data-red-flag], .red-flag");
    flagElements.forEach((el, i) => {
      redFlags.push({
        id: `flag-${i + 1}`,
        title: el.querySelector(".flag-title")?.textContent?.trim() || el.getAttribute("data-title") || `Röd flagga ${i + 1}`,
        description: el.querySelector(".flag-description")?.textContent?.trim() || el.textContent?.trim() || "",
        severity: (el.getAttribute("data-severity") as "critical" | "warning") || "warning",
      });
    });

    return {
      scenarioCode,
      title,
      slug,
      icdCode,
      definition: getSection("definition"),
      anamnes: getSection("anamnes"),
      statusSection: getSection("status"),
      diagnostik: getSection("diagnostik"),
      behandling: getSection("behandling"),
      uppfoljning: getSection("uppfoljning"),
      komplikationer: getSection("komplikationer"),
      redFlags,
      referencesText: getSection("references"),
      isPremium,
      patientQuote: 
        doc.querySelector("[data-patient-quote]")?.getAttribute("data-patient-quote") ||
        doc.querySelector(".symptom-item:contains('Citat')")?.textContent?.split(":")[1]?.trim()?.replace(/^"|"$/g, "") ||
        null,
      troligDiagnos:
        doc.querySelector("[data-trolig-diagnos]")?.getAttribute("data-trolig-diagnos") ||
        title,
      differentialdiagnoser:
        doc.querySelector("[data-differentials]")?.getAttribute("data-differentials")?.split(",")?.map(s => s.trim()) ||
        Array.from(doc.querySelectorAll(".warning-box strong")).map(el => el.textContent?.replace("DIFFERENTIALDIAGNOS:", "")?.trim()).filter(Boolean) as string[],
      kallor:
        JSON.parse(doc.querySelector("[data-sources-json]")?.getAttribute("data-sources-json") || "[]") ||
        Array.from(doc.querySelectorAll(".sources-modal li")).map(li => ({ name: li.textContent?.trim() })),
      difficulty: (doc.querySelector("[data-difficulty]")?.getAttribute("data-difficulty") as any) || "standard",
    };
  } catch (error) {
    console.error(`❌ Error parsing ${filePath}:`, error);
    return null;
  }
}

// ── Main sync function ──────────────────────────────────────

async function syncScenarios() {
  console.log("🦷 DentaGuide-Pro — Scenario Sync");
  console.log("══════════════════════════════════════");

  // Get all categories from DB
  const { data: categories, error: catError } = await supabase
    .from("categories")
    .select("id, slug");

  if (catError) {
    console.error("❌ Error fetching categories:", catError.message);
    process.exit(1);
  }

  const categoryMap = new Map(categories?.map((c) => [c.slug, c.id]) || []);

  const SOURCES_DIR = path.join(process.cwd(), "html-sources");
  const MEGA_FILES_MAP: Record<string, string> = {
    "värk_och_smärta_html_JUSTERAD.html": "endodonti",
    "akut-parod_html_JUSTERAD.html": "parodontologi",
    "protetik_och_bettfunktion_html_JUSTERAD.html": "protetik",
    "oralmedicin_html_JUSTERAD.html": "oralmedicin",
    "kirurgi_html_JUSTERAD.html": "kakkirurgi",
    "bettfysiologi_html_JUSTERAD.html": "bettfysiologi",
    "ped-akut_uppdaterad.html": "pedodonti-akut",
    "ped-oralmedicin_uppdaterad.html": "pedodonti-munslemhinna",
    "ped-beteende-sed_uppdaterad.html": "pedodonti-beteende",
    "ortodonti_uppdaterad.html": "ortodonti",
    "trauma permanent_pedo_45-48_uppdaterad.html": "pedodonti-trauma",
    "trauma primära_pedo_41-44_uppdaterad.html": "pedodonti-trauma",
  };

  let totalSynced = 0;
  let totalErrors = 0;

  for (const [fileName, categorySlug] of Object.entries(MEGA_FILES_MAP)) {
    const filePath = path.join(SOURCES_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping ${fileName} (not found)`);
      continue;
    }

    const categoryId = categoryMap.get(categorySlug);
    if (!categoryId) {
      console.log(`⚠️  Category not found: ${categorySlug}`);
      continue;
    }

    console.log(`\n📂 Processing ${fileName} → ${categorySlug}`);
    const html = fs.readFileSync(filePath, "utf-8");
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const displays = doc.querySelectorAll(".scenario-display-wrapper");
    console.log(`   Found ${displays.length} scenarios`);

    for (const display of displays) {
      try {
        const id = display.id.replace("-display", "");
        const title = display.querySelector("h3")?.textContent?.replace(/⚡ SCENARIO \d+: /, "")?.trim() || "Namnlös";
        const icdCode = Array.from(display.querySelectorAll(".symptom-item")).find(el => el.textContent?.includes("ICD-10"))?.textContent?.split(":")[1]?.trim() || null;
        
        const getSection = (tabName: string) => {
          const el = display.querySelector(`[id$="-${tabName}"]`);
          return el?.innerHTML?.trim() || null;
        };

        const anamnes = getSection("snabb") || getSection("anamnes");
        const status = getSection("snabb") || getSection("status");
        const behandling = getSection("behandling");

        // Extract patient quote
        const quoteEl = Array.from(display.querySelectorAll(".symptom-item")).find(el => el.textContent?.includes("Citat"));
        const patientQuote = quoteEl?.textContent?.split(":")[1]?.trim()?.replace(/^"|"$/g, "") || null;

        // TLV Codes
        const tlvRows = display.querySelectorAll(".billing-codes table tr");
        const tlvCodes = Array.from(tlvRows).map(row => row.querySelector("td strong")?.textContent?.trim()).filter(Boolean) as string[];

        // Sources
        const sourcesModal = doc.querySelector(".sources-modal");
        const sources = Array.from(sourcesModal?.querySelectorAll("li") || []).map(li => ({ name: li.textContent?.trim() }));

        const { error } = await supabase.from("scenarios").upsert(
          {
            category_id: categoryId,
            scenario_code: id.toUpperCase(),
            title,
            slug: id.toLowerCase(),
            icd_code: icdCode,
            anamnes,
            status_section: status,
            behandling,
            patient_quote: patientQuote,
            trolig_diagnos: title,
            debitering: tlvCodes.join(", "),
            kallor: sources,
            is_published: true,
            difficulty: "standard"
          },
          { onConflict: "scenario_code" }
        );

        if (error) {
          console.error(`   ❌ ${id}: ${error.message}`);
          totalErrors++;
        } else {
          console.log(`   ✅ ${id} → ${title}`);
          totalSynced++;
        }
      } catch (err) {
        console.error(`   ❌ Error processing scenario in ${fileName}`, err);
        totalErrors++;
      }
    }
  }

  console.log("\n══════════════════════════════════════");
  console.log(`✅ Synced: ${totalSynced} | ❌ Errors: ${totalErrors}`);
}

// ── Run ─────────────────────────────────────────────────────

syncScenarios().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
