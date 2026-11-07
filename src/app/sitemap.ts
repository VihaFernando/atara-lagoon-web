import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/business";
import { nav } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-07");
  return nav.map((n) => ({
    url: `${SITE_URL}${n.href === "/" ? "/" : n.href}`,
    lastModified,
    changeFrequency: n.href === "/" ? "weekly" : "monthly",
    priority: n.href === "/" ? 1 : n.href === "/accommodation" || n.href === "/contact" ? 0.9 : 0.7,
  }));
}
