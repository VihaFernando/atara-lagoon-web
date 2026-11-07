import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/business";

/**
 * Policy: all public pages are open to every crawler, including search and
 * AI answer-engine crawlers (Googlebot, Bingbot, OAI-SearchBot, GPTBot,
 * PerplexityBot, ClaudeBot, etc.). Only the API is disallowed.
 * To opt out of AI *training* crawlers specifically, add rules for e.g.
 * GPTBot / Google-Extended / ClaudeBot here.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
