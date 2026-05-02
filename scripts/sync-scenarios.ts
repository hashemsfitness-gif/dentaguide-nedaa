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

  // Check content directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log(`📁 Content directory not found: ${CONTENT_DIR}`);
    console.log("   Creating directory structure...");
    fs.mkdirSync(CONTENT_DIR, { recursive: true });

    // Create subdirectories
    for (const area of Object.keys(AREA_CATEGORY_MAP)) {
      fs.mkdirSync(path.join(CONTENT_DIR, area), { recursive: true });
    }

    console.log("   ✅ Directory structure created. Add HTML files and re-run.");
    return;
  }

  // Get all categories from DB
  const { data: categories, error: catError } = await supabase
    .from("categories")
    .select("id, slug");

  if (catError) {
    console.error("❌ Error fetching categories:", catError.message);
    process.exit(1);
  }

  const categoryMap = new Map(categories?.map((c) => [c.slug, c.id]) || []);

  let totalSynced = 0;
  let totalErrors = 0;

  // Process each area directory
  for (const [area, categorySlug] of Object.entries(AREA_CATEGORY_MAP)) {
    const areaDir = path.join(CONTENT_DIR, area);

    if (!fs.existsSync(areaDir)) {
      console.log(`⏭️  Skipping ${area} (directory not found)`);
      continue;
    }

    const categoryId = categoryMap.get(categorySlug);
    if (!categoryId) {
      console.log(`⚠️  Category not found in DB: ${categorySlug}`);
      continue;
    }

    const htmlFiles = fs
      .readdirSync(areaDir)
      .filter((f) => f.endsWith(".html"));

    console.log(`\n📂 ${area} (${htmlFiles.length} files)`);

    for (const file of htmlFiles) {
      const filePath = path.join(areaDir, file);
      const scenario = parseHtmlFile(filePath);

      if (!scenario) {
        totalErrors++;
        continue;
      }

      // Upsert via scenario_code
      const { error } = await supabase.from("scenarios").upsert(
        {
          category_id: categoryId,
          scenario_code: scenario.scenarioCode,
          title: scenario.title,
          slug: scenario.slug,
          icd_code: scenario.icdCode,
          definition: scenario.definition,
          anamnes: scenario.anamnes,
          status_section: scenario.statusSection,
          diagnostik: scenario.diagnostik,
          behandling: scenario.behandling,
          uppfoljning: scenario.uppfoljning,
          komplikationer: scenario.komplikationer,
          red_flags: scenario.redFlags,
          references_text: scenario.referencesText,
          is_premium: scenario.isPremium,
        },
        { onConflict: "scenario_code" }
      );

      if (error) {
        console.error(`   ❌ ${file}: ${error.message}`);
        totalErrors++;
      } else {
        console.log(`   ✅ ${file} → ${scenario.scenarioCode}`);
        totalSynced++;
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
