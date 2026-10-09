import type { MetadataRoute } from "next";
import { absoluteUrl, indexingEnabled } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!indexingEnabled) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: {
      userAgent: ["*", "Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User"],
      allow: "/",
      disallow: "/api/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
