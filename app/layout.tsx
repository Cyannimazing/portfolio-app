import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import FooterVisibility from "@/components/FooterVisibility";
import PageTransition from "@/components/PageTransition";
import { siteConfig } from "@/lib/site";
import { pageMetadata, publicPages, searchRobots, searchVerification } from "@/lib/seo";
import { siteStructuredData } from "@/lib/structured-data";
import StructuredData from "@/components/StructuredData";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import InteractiveBackground from "@/components/InteractiveBackground";
import { defaultPortfolioTheme, themeBootstrapScript } from "@/lib/theme-preference";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const displayFont = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
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

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0b0d0e" }, { media: "(prefers-color-scheme: light)", color: "#eeede9" }] };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-portfolio-theme={defaultPortfolioTheme} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} /><link rel="describedby" href="/llms.txt" type="text/plain" /></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} antialiased`}
      >
        <StructuredData id="site-identity" data={siteStructuredData} />
        <a href="#main-content" className="studio-skip-link">Skip to content</a>
        <PageTransition>
        <Navigation />
        <div id="main-content" tabIndex={-1} className="focus:outline-none"><InteractiveBackground />{children}<ThemeSwitcher /></div>
        <noscript><nav className="studio-static-navigation" aria-label="Page navigation">{publicPages.map(page => <a key={page.path} href={page.path}>{page.path === "/" ? "Home" : page.title}</a>)}</nav></noscript>
        <FooterVisibility><Footer /></FooterVisibility>
        </PageTransition>
      </body>
    </html>
  );
}
