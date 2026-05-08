import { requireAdmin } from "@/lib/auth/admin-guard";
import { NextResponse } from "next/server";

export const revalidate = 60; // 60 second cache

/**
 * GET /api/admin/system-status
 * 
 * Returns the status of external services used by DentaGuide-Pro.
 * Cached for 60 seconds server-side.
 */
export async function GET() {
  try {
    await requireAdmin();
  } catch (response) {
    return response as Response;
  }

  try {
    const results = await Promise.allSettled([
      fetch("https://status.supabase.com/api/v2/status.json").then((r) => r.json()),
      fetch("https://status.stripe.com/api/v2/status.json").then((r) => r.json()),
      fetch("https://status.sentry.io/api/v2/status.json").then((r) => r.json()),
    ]);

    const pickStatus = (promiseResult: PromiseSettledResult<any>) => {
      if (promiseResult.status === "fulfilled") {
        return promiseResult.value.status?.indicator === "none" ? "operational" : "degraded";
      }
      return "unknown";
    };

    const statusData = {
      supabase: pickStatus(results[0]),
      stripe: pickStatus(results[1]),
      sentry: pickStatus(results[2]),
      vercel: "operational", // If this route is running, Vercel is up
      checked_at: new Date().toISOString(),
    };

    return NextResponse.json(statusData);
  } catch (error) {
    console.error("[SYSTEM STATUS ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to fetch system status" },
      { status: 500 }
    );
  }
}
