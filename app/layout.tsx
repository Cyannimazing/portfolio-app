import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import FooterVisibility from "@/components/FooterVisibility";
import PageTransition from "@/components/PageTransition";
import { siteConfig } from "@/lib/site";
import { pageMetadata, publicPages, searchRobots, searchVerification } from "@/lib/seo";
import { siteStructuredData } from "@/lib/structured-data";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Cyril AI",
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.owner, url: `${siteConfig.url}/practice` }],
  creator: siteConfig.owner,
  publisher: siteConfig.name,
  robots: searchRobots,
  verification: searchVerification,
  icons: {
    icon: [
      {
        url: "/brand/cyril-ai-icon-light.webp",
        media: "(prefers-color-scheme: light)",
        type: "image/webp",
        sizes: "256x256",
      },
      {
        url: "/brand/cyril-ai-icon-dark.webp",
        media: "(prefers-color-scheme: dark)",
        type: "image/webp",
        sizes: "256x256",
      },
    ],
  },
  openGraph: pageMetadata(publicPages[0]).openGraph,
  twitter: pageMetadata(publicPages[0]).twitter,
};

export const viewport: Viewport = { themeColor: "#10191e" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><link rel="describedby" href="/llms.txt" type="text/plain" /></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData id="site-identity" data={siteStructuredData} />
        <a href="#main-content" className="studio-skip-link">Skip to content</a>
        <PageTransition>
        <Navigation />
        <div id="main-content" tabIndex={-1} className="focus:outline-none">{children}</div>
        <noscript><nav className="studio-static-navigation" aria-label="Page navigation">{publicPages.map(page => <a key={page.path} href={page.path}>{page.path === "/" ? "Home" : page.title}</a>)}</nav></noscript>
        <FooterVisibility><Footer /></FooterVisibility>
        </PageTransition>
      </body>
    </html>
  );
}
