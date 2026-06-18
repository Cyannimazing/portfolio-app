# Project Rules — Cyril Jian Narvasa Portfolio

Personal portfolio for **Cyril Jian Narvasa**, Full Stack Developer.
Stack: **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **framer-motion**.

## Components

- **Prefer Aceternity UI components.** Reusable UI lives in `components/ui/` (these are Aceternity-style components). Reach for them first.
- **Do not feel locked to the components that already exist.** When a layout calls for something new, add a fresh Aceternity component from [ui.aceternity.com](https://ui.aceternity.com) (drop it in `components/ui/`) rather than hand-rolling a one-off or forcing an ill-fitting existing component.
- Merge class names with the `cn()` helper from `lib/utils.ts`.
- Match the existing visual language (see Design tokens below) when adding sections.

## Rendering (Server-first)

- **Pages are Server Components by default.** Do not put `"use client"` at the top of a `page.tsx`.
- **Isolate interactivity into small client islands.** When a route needs state/hooks/handlers, move that UI into a sibling `*Client.tsx` (e.g. `WorksClient.tsx`, `ProjectDetail.tsx`) marked `"use client"`, and have the server `page.tsx` render it.
- Server pages **must** export `metadata` (static) or `generateMetadata` (dynamic).
- Dynamic routes export `generateStaticParams` so they pre-render at build (SSG). In Next 16, `params` is a Promise — type it `Promise<{ ... }>` and `await` it.
- Shared SEO/branding strings live in `lib/site.ts` (`siteConfig`).

## SEO & titles

- Every page sets a title. The root layout (`app/layout.tsx`) defines a title template: `"%s | Cyril Jian Narvasa"`, so a page only needs `title: "Works"` → renders `Works | Cyril Jian Narvasa`.
- **Use `|` as the title separator, never `-`.** This applies to page titles and headings generally; avoid the `" - "` dash-as-separator style in copy too (use commas, parentheses, or a colon).
- Set `alternates.canonical` per page; provide `openGraph` (and images for project pages).

## Design tokens

- Background: `#080808` (sections), cards `#0f0f0f`.
- Primary accent: `sky-400` / `sky-500`. Secondary accent: `violet-400` (e.g. the "My Solution" case-study column). CTA gradient: `bg-linear-to-r from-sky-500 to-cyan-400`.
- Section label pattern: `text-sky-400 text-xs font-bold uppercase tracking-[0.3em]` above a `font-black` heading.
- Fonts: Geist / Geist Mono (via `next/font`).

## Content voice

- Services and project copy are **outcome-framed for business clients** — describe what they get, not the tech layer (e.g. "Custom Business Software", not "Backend Development"). Tech-stack pills are fine as supporting credibility.
- Project detail pages follow a case-study shape: overview → **The Challenge** / **My Solution** (two columns) → tech/contribution/gallery → a "Let's Discuss" CTA linking to `/contact`. Keep the CTA label consistent across the site (hero, nav, project pages) as "Let's Discuss".
