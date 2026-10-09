import type { Metadata } from "next";
import { absoluteUrl, indexingEnabled, siteConfig } from "./site";

export const publicPages = [
  { path: "/", title: siteConfig.title, description: siteConfig.description },
  { path: "/works", title: "Projects", description: "Explore Cyril Jian Narvasa’s project case studies: business websites, SaaS platforms, internal tools, booking systems, and mobile applications." },
  { path: "/services", title: "Services", description: "Custom business software, websites, CMS, online bookings, mobile app improvements, coded automation, and ongoing support from Cyril AI in Davao, Philippines." },
  { path: "/practice", title: "Behind the work", description: "Meet Cyril Jian Narvasa, a full stack developer in Davao, Philippines. Explore his development approach, working principles, and professional experience." },
  { path: "/contact", title: "Contact", description: "Discuss your website, business software, CMS, booking system, or automation project with Cyril Jian Narvasa. Book a discovery call with Cyril AI." },
] as const;

type PageMetadata = { path: string; title: string; description: string; image?: string; type?: "website" | "article" };

export function pageMetadata({ path, title, description, image, type = "website" }: PageMetadata): Metadata {
  const fullTitle = path === "/" ? title : `${title} | ${siteConfig.name}`;
  const preview = image
    ? { url: absoluteUrl(image), alt: `${title} project preview` }
    : { url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: "Cyril AI | Your next idea. Fully built." };
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { title: fullTitle, description, url: absoluteUrl(path), siteName: siteConfig.name, locale: "en_PH", type, images: [preview] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [preview.url] },
  };
}

export const searchRobots: Metadata["robots"] = indexingEnabled
  ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
  : { index: false, follow: false };

export const searchVerification: Metadata["verification"] = {
  google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
};
