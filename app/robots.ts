import type { MetadataRoute } from "next";

/**
 * app/robots.ts — Robots.txt configuration
 * Blocks crawlers from /dashboard, /admin, /api
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://dentaguide-pro.se";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/admin/",
          "/api/",
          "/login",
          "/register",
          "/onboarding",
          "/403",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
