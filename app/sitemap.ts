import type { MetadataRoute } from "next";
import { canonicalProjectPaths } from "@/lib/project-routing";
import { publicPages } from "@/lib/seo";
import { absoluteUrl, indexingEnabled } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexingEnabled) return [];
  // Only canonical pages; omit query variants, redirect aliases and invented dates.
  return [...new Set([...publicPages.map(page => page.path), ...canonicalProjectPaths()])].map(path => ({ url: absoluteUrl(path) }));
}
