import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import * as Sentry from "@sentry/nextjs";

/**
 * POST /api/auth/logout — Server-side logout
 * Clears session and cookies, then redirects to home.
 */
export async function POST() {
  try {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.signOut();

    if (error) {
      Sentry.captureException(error, {
        tags: { route: "/api/auth/logout" },
      });
      return NextResponse.json(
        { error: "Kunde inte logga ut" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Utloggad" },
      { status: 200 }
    );
  } catch (error) {
    Sentry.captureException(error, {
      tags: { route: "/api/auth/logout" },
    });
    return NextResponse.json(
      { error: "Internt serverfel" },
      { status: 500 }
    );
  }
}
