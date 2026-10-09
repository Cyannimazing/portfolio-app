import type { NextConfig } from "next";
import { projectPreviews } from "./lib/project-previews";

const isDev = process.env.NODE_ENV === "development";
// Keep the allowlist tied to the real previews, including www/apex redirects.
const previewOrigins = [...new Set(Object.values(projectPreviews).flatMap(({ url }) => {
  if (!url?.startsWith("https://")) return [];
  const origin = new URL(url);
  const alternate = new URL(origin.origin);
  alternate.hostname = origin.hostname.startsWith("www.") ? origin.hostname.slice(4) : `www.${origin.hostname}`;
  return [origin.origin, alternate.origin];
}))];

// Next's non-nonce policy preserves static pages and inline hydration/styles.
// Production disallows eval; only development permits it for the dev tooling.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' https://formspree.io${isDev ? " ws: wss:" : ""}`,
  `frame-src 'self' ${previewOrigins.join(" ")}`,
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formspree.io",
  "report-to security",
  "report-uri /api/security-reports",
  ...(!isDev ? ["upgrade-insecure-requests"] : []),
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Small, static portfolio metadata should reach every crawler in the head,
  // including AI fetchers that do not execute JavaScript or read streamed tags.
  htmlLimitedBots: /.*/,
  async headers() {
    const preview = process.env.VERCEL_ENV === "preview" || process.env.SITE_INDEXING_ENABLED === "false";
    return [{ source: "/:path*", headers: [
      { key: "Content-Security-Policy", value: contentSecurityPolicy },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), clipboard-write=(self)" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      // External previews need permissive embedding; other pages override this.
      { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
      { key: "Cross-Origin-Embedder-Policy-Report-Only", value: 'require-corp; report-to="security"' },
      { key: "Reporting-Endpoints", value: 'security="/api/security-reports"' },
      { key: "Link", value: '</llms.txt>; rel="describedby"' },
      ...(preview ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
    ] }, {
      // Keep PDFs outside CORP because browser PDF viewers can mishandle it.
      source: "/:path((?!.*\\.pdf$).*)",
      headers: [{ key: "Cross-Origin-Resource-Policy", value: "same-origin" }],
    }, ...["/services", "/practice", "/contact"].map(source => ({
      source,
      headers: [{ key: "Cross-Origin-Embedder-Policy", value: "require-corp" }],
    })), ...(!isDev ? [{
      source: "/:path*",
      // Legacy NEL needs an absolute HTTPS endpoint. Bind it to the actual host,
      // rather than the candidate canonical domain or a preview deployment URL.
      has: [{ type: "host" as const, value: "(?<reportHost>[a-z0-9.-]+)" }],
      headers: [
        { key: "Report-To", value: JSON.stringify({ group: "security", max_age: 86400, endpoints: [{ url: "https://:reportHost/api/security-reports" }] }) },
        { key: "NEL", value: JSON.stringify({ report_to: "security", max_age: 86400, success_fraction: 0, failure_fraction: 0.1 }) },
      ],
    }] : [])];
  },
};

export default nextConfig;
