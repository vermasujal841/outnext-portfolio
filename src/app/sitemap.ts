import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { serviceCategories } from "@/content/services";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["/", "/services", "/work", "/about", "/team", "/industries", "/contact", "/privacy"];

  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path === "/privacy" ? 0.2 : 0.8,
    })),
    ...serviceCategories.map((c) => ({
      url: absoluteUrl(`/services/${c.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Placeholder project slots are excluded until they are filled and marked ready
    ...projects
      .filter((p) => p.ready)
      .map((p) => ({
        url: absoluteUrl(`/work/${p.slug}`),
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
  ];
}
