import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Small, static portfolio metadata should reach every crawler in the head,
  // including AI fetchers that do not execute JavaScript or read streamed tags.
  htmlLimitedBots: /.*/,
  async headers() {
    const preview = process.env.VERCEL_ENV === "preview" || process.env.SITE_INDEXING_ENABLED === "false";
    return [{ source: "/:path*", headers: [
      { key: "Link", value: '</llms.txt>; rel="describedby"' },
      ...(preview ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
    ] }];
  },
};

export default nextConfig;
