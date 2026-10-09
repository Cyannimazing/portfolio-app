// Set NEXT_PUBLIC_SITE_URL to the final HTTPS origin before deployment.
// Metadata, structured data, crawler documents and social previews share it.
const configuredUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cyril.ai");
if (!/^https?:$/.test(configuredUrl.protocol) || configuredUrl.username || configuredUrl.password || configuredUrl.pathname !== "/" || configuredUrl.search || configuredUrl.hash) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be a complete HTTP(S) origin without a path, credentials, query or fragment.");
}

export const siteConfig = {
  name: "Cyril AI",
  owner: "Cyril Jian Narvasa",
  title: "Cyril AI | Websites, Business Software & Automation",
  description:
    "Cyril AI is Cyril Jian Narvasa’s independent development studio in Davao, Philippines. Business websites, custom software, CMS, integrations, and automation.",
  url: configuredUrl.origin,
  email: "cyrilnarvasa589@gmail.com",
  socialProfiles: ["https://github.com/Cyannimazing", "https://www.linkedin.com/in/cyril-jian-narvasa"],
};

export const indexingEnabled = process.env.VERCEL_ENV !== "preview" && process.env.SITE_INDEXING_ENABLED !== "false";

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).href;
}
