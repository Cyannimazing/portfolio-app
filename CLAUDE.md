# Project Rules — Cyril Jian Narvasa Portfolio

Personal portfolio for **Cyril Jian B. Narvasa**, Full Stack Developer.
Stack: **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **Motion (`motion/react`)**.

## Components

- **Strictly use official Aceternity UI components for portfolio UI.** Install them from the official registry into `components/ui/`; do not substitute another component library or a homemade imitation.
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

- Every page sets a title. The root layout (`app/layout.tsx`) defines the current title template `"%s | Cyril AI"`; `lib/seo.ts` applies matching canonical and social metadata.
- **Use `|` as the title separator, never `-`.** This applies to page titles and headings generally; avoid the `" - "` dash-as-separator style in copy too (use commas, parentheses, or a colon).
- Set `alternates.canonical` per page; provide `openGraph` (and images for project pages).

## Design tokens

- Hero background: charcoal `#10191e`; surfaces `#233642`; primary text `#f1f7fa`; supporting text `#c1ced7`; accent cyan `#62dcf3`. Preserve the existing dark/cyan identity while improving readability.
- Primary accent: `sky-400` / `sky-500`. Secondary accent: `violet-400` (e.g. the "My Solution" case-study column). CTA gradient: `bg-linear-to-r from-sky-500 to-cyan-400`.
- Section label pattern: `text-sky-400 text-xs font-bold uppercase tracking-[0.3em]` above a `font-black` heading.
- Fonts: Geist / Geist Mono (via `next/font`).

## Content voice

- Services and project copy are **outcome-framed for business clients** — describe what they get, not the tech layer (e.g. "Custom Business Software", not "Backend Development"). Tech-stack pills are fine as supporting credibility.
- Project detail pages follow a case-study shape: overview → **The Challenge** / **My Solution** (two columns) → tech/contribution/gallery → a "Book a discovery call" CTA linking to `/contact`. Keep the CTA label consistent across the site (hero, nav, project pages) as "Book a discovery call".


## Recorded portfolio design requirements

These instructions record the user's final direction from the portfolio redesign conversation. Later explicit corrections take precedence over earlier references and experiments.

### Current direction, October 9 (supersedes older presentation notes below)

- Izee, Inc. employment ended in October 2026: display June–October 2026 in the portfolio and CV, overriding the saved profile's earlier “present” date. Keep the saved profile Markdown unchanged. Describe responsibilities and client benefits (custom CMS/admin, optimized media/CDN delivery, CRM lead capture, payments/tracking, and AI automation), rather than listing project names or claiming ownership of a reusable/injectable platform. Keep the CV's five Izee bullets in strong verb, responsibility, result order.

- SEO uses `lib/site.ts` and `lib/seo.ts` as shared configuration. The domain candidate is `https://cyril.ai`, overridable with `NEXT_PUBLIC_SITE_URL` at build time. Keep canonical/social metadata, truthful JSON-LD, the canonical sitemap, robots rules, optional AI-readable content routes and readable no-JavaScript fallbacks. Preview deployments remain noindex. Preserve every existing project UUID and the saved profile Markdown. See README for domain and webmaster verification steps requiring the owner's accounts.
- Cleanup removed abandoned hero designs, unused UI components/dependencies, an unused font and duplicate case-study records. Only FaithSeeker, AidPoint and F.A Babila Architects use additional legacy data; earlier names of current projects redirect to UUID pages. Keep generation metadata for assets still used, and source evidence supporting published services and contributions.

- Contact follows My approach with the shared sidebar, typography, page gutters and curtain/entrance sequence. Use an Aceternity Bento composition: direct conversation/email options, project enquiry form and clear next steps. Keep “I” in personal contact copy, real email/social destinations, editable service preselection and optional USD/PHP budget. Preserve the user's custom dropdown design and original choice labels (Business Website and Mobile App); CMS/Booking remain available for those booking links. PHP budgets start at ₱5,000, with ₱5k–₱10k, ₱10k–₱25k, ₱25k–₱50k, ₱50k+ and Not sure yet. On Contact, the discovery-call action focuses the enquiry form; CV stays beside it. Show inline validation, sending, success and retry states; preserve input after failures and prevent duplicate submissions. Retain the existing Formspree endpoint. Verify submissions through browser interception, never send live test messages. Respect content height on small screens instead of clipping fields or reducing targets below 44px.
- Buttons across pages share smooth hover/focus/press feedback and small directional icon motion, using the installed Aceternity Hover Border Gradient. Keep their placement and hit targets stable. Card highlights follow the existing radius. Reduced motion disables animated feedback and entrances; content and controls remain usable. Interaction changes must not replay page entrances or project carousel transitions.
- Every page must remain responsive across phones, tablets, laptops, desktop/ultrawide screens and short landscape viewports. Check intermediate breakpoints, readable text, horizontal overflow, mobile navigation, dropdown placement and all project case studies. Preserve natural scrolling for long details and forms on small screens. The custom dropdown must retain its visual design while supporting keyboard/touch selection and staying inside the available viewport.
- `/practice` is the My approach page, preserving the original mission/vision/values intent. Use “I” and “my” on this personal page; project/team narratives retain their previously requested voice. Use the shared sidebar, page gutters, compact display scale, discovery/CV actions and curtain/entrance sequence. The page contains direction, interactive working principles and experience; do not repeat Home's toolkit or education/foundation cards. Experience uses the roles and dates in the saved profile, with its complete descriptions in an Aceternity dialog on compact screens.
- Working principles use Aceternity Tabs with hover, keyboard focus and tap activation. Reveal one description in a stable panel with a short transition rather than moving the entire page. The vertical choice stack and description panel align at both top and bottom. Keep 44px targets, arrow/Home/End keyboard controls, reduced motion and readable no-JavaScript content. Hover highlights on Services and My approach must inherit the card radius through the card body and glow wrapper, align exactly with the existing border, and activate on the hovered card rather than neighboring cards.
- Services displays all seven categories in a varied Aceternity Bento Grid, with a tall software card and wide support card when the canvas allows. Fit the complete grid and all booking controls into one desktop viewport. Keep readable, natural layouts on phones. Each card lists client-facing capabilities; its heading opens a scope dialog explaining benefits, example uses and related projects. Booking links use `/contact?service=<shared-service-id>`; Contact preselects the matching service, keeps it editable, and submits that selection. Do not replace the service grid with a scrolling service index and detail panel.
- The latest Services copy must be direct and understandable to clients. Do not restrict every offer to three highlights, show technology lists, equate business software with POS/sales, or use individual project features as service highlights. Software spans internal tools/SaaS, staff and client portals, forms/approvals/documents, scheduling/resources and dashboards/reports. Websites cover enquiries, Google/AI search foundations, real Google reviews and Meta conversion tracking. CMS offers content publishing and understandable SEO settings. Automation covers connected systems, repeat workflows, notifications and useful AI assistance implemented in custom code. Keep specific project implementations in case studies and evidence. Do not advertise n8n or promise rankings, AI citations, results, or service guarantees. Responsiveness is a baseline, not a distinct offer.
- Home, Work, Services, and case studies share the page gutter and compact display typography tokens. Home's header contains the adjacent discovery/CV actions with no play/pause button, per the user's latest request. Keep reduced-motion and hover/focus behavior. Align desktop Home cards and Work's active preview to the same bottom gutter.
- Keep the profile/navigation sidebar on the left. Put the page heading "The work." at the top using Home's typography tokens, with a wide central preview and smaller neighboring cards on both sides. The project's category, title and Case study/Visit site actions belong inside its frame; there is no separate project side panel.
- Replace discovery/CV actions in the Work header with a compact Carousel/Grid switcher. Service filters appear only in grid view, with counts and a clear selected state. Remove the old gallery pause/control rail. Home and case studies keep the shared adjacent discovery/CV component.
- Previous/Next are circular controls fully inside each project's preview, with equal 16px insets and at least 44px targets. Each card owns its buttons: they move with the preview, rather than staying fixed during switching. Hide inactive neighboring arrows, keep inactive controls inert, and transfer keyboard focus to the incoming card's corresponding arrow.
- Keep the carousel circular: navigation wraps in either direction, neighbors scale to .88 of the active card, and persistent mounted cards retain previously loaded live iframes. Use one .75s slide/scale transition; never replay page entrances when merely changing project. Fade equally at the viewport's left/right margins using the shared Home gutter and inter-card gap tokens.
- Default gallery fits one desktop viewport, including 1024 by 500. Grid may scroll and uses four columns on wide desktops, three on medium desktops, two on narrow desktops/tablets, one on phones.
- Browsing Next/Back or switching views stays at /works. Only Case study/Details opens the saved permanent UUID route as a separate full page. Retain gallery selection, filter and view on return. Home's Explore project links directly to the featured project's UUID case study.
- Full case studies use a large real preview, actual feature highlights, The challenge/The solution, Our contribution where confirmed, verified technologies and intended users. Use “we” in the contribution narrative. Never present development fixes as product features or invent performance metrics, SEO rankings, ownership, algorithms or team sizes.
- Use live iframes where embedding is permitted, uniformly scaled from a fixed 1440px width (810px height in the wide carousel, 900px in Home/grid/case studies). Prevent pointer/keyboard interaction with the embedded website. Pausing/reduced motion does not replace a live preview with an image. Do not bypass framing protections. Current mapping: 14 live sites and 6 actual screenshot fallbacks.
- Use original interface captures for blocked/private/desktop/mobile apps; no AI mockups, generated product covers, recordings or recreated website HTML in the visible gallery, Home or case studies. The user explicitly approved public use of the actual SPOS local dashboard screenshot. Keep that approval scoped to that screenshot.
- Home rotates River Taxes, Lowrie Roofing, Luxury Leather Restoration and Kevin Travis Homes. Keep River Taxes second and Obiyen seventeenth; UUIDs remain unchanged. Beautiful & Blessed Esthetics is appended as project 20. Key Masker stays excluded.
- Beautiful & Blessed Esthetics: inspect the local beautifulbless source. Describe Boulevard bookings, CMS business settings/hours synchronization and search metadata as product capabilities. Personal contribution is limited to the user's confirmed favicon/Open Graph changes in three verified commits; do not imply ownership of the complete spa application.
- Martich Studios includes booking-system fixes confirmed by the user. Seven shared service categories include Booking Systems. Home still displays six cards, combining Mobile Apps and Support under Other Solutions.
- Entrances follow one sequence: page identity, supporting copy, layout switcher, preview. Use the shared studio easing and masked text reveal. Grid and case-study sections enter once as they become visible. Reduced motion and case-study motion pause expose all content without animation.
- Internal page links use the shared three-panel curtain transition. The desktop profile sidebar stays stationary between gallery and case studies. Start destination CSS entrances after the curtain clears; restore focus to the destination heading. Preserve new-tab, download, external and same-page hash behavior.
- Direct visits and refreshes include the opening curtain before the content entrance sequence, including `/works`. Do not replay that sequence for carousel movement or layout/filter changes. Reduced motion skips the curtain; content remains available without JavaScript.
- Temporary verification/capture scripts and unused asset drafts were removed at the user's request. Keep the saved profile Markdown, live preview fallbacks, branding, CV and documents linked from existing project pages. Contact starts with PHP selected. The remaining scripts maintain permanent project identifiers and reconcile profile data; do not regenerate identifiers or rewrite the profile as part of cleanup.

### Component source and composition

- Strictly use Aceternity UI components. Research their current official documentation before adding or rebuilding a component; install with the official registry, for example `npx shadcn@latest add @aceternity/bento-grid`.
- Use the installed Aceternity Bento Grid for the hero; Sidebar for navigation; Carousel for featured work; 3D Card for previews; Infinite Moving Cards for tools; Hover Border Gradient for CTAs; Glowing Effect for interactive surfaces; Animated Modal for details; Flip Words for supporting hero copy.
- Customize official components for the portfolio's theme, responsive sizing, accessibility, motion settings and required behavior. Keep their source and documentation traceable. Recreate a composition when needed instead of forcing an unsuitable old layout.
- The supplied portfolio screenshot is inspiration for a useful single-screen hub, not a template to copy. Create an original arrangement and original content presentation.

### Layout and responsiveness

- Desktop (1024px and wider): the homepage hero is one viewport high with no page scrolling. Keep work, all services, tools, qualifications and integrations together in this section.
- Mobile and narrow tablets (below 1024px, including landscape phones): allow natural vertical page scrolling. Stack the bento cards at readable intrinsic heights with full-sized project images, complete descriptions and comfortable touch targets. Never force the desktop one-screen requirement onto phones by shrinking text or clipping content. This explicit correction supersedes the earlier no-scroll requirement for mobile.
- Reflow the bento layout for desktop, tablet, small portrait phones and short landscape screens. Test intermediate widths and viewport heights, not just one desktop and one phone.
- Use the available width and height. Avoid excessive outer margins, empty card sections, squeezed project images, clipped descriptions or inaccessible controls.
- Card internals must flex to the available space. Remove empty optional blocks and conflicting default spacing rather than hiding real overflow.
- Keep dialogs and mobile navigation within the viewport; allow dialog content to scroll on phones so project names, service details and controls stay readable. Preserve focus management, Escape closing and reduced-motion support. Do not claim responsiveness based only on hiding document overflow.
- Give each dialog a dedicated close-control area above its scrolling content. The X must never overlay project tiles or other content when scrolling.
- Mobile navigation is an original command deck: a compact logo header, a clear navigation heading, numbered route buttons and contact actions. Do not repeat the desktop portrait/profile layout in the menu. Use a layout that fits short portrait and landscape screens.
- The latest button redesign uses full-width horizontal route buttons in portrait, with cyan icon badges, aligned text, small indices and arrow controls. Use the installed Aceternity Hover Border Gradient with smooth hover/focus/press states; avoid oversized empty navigation tiles. Keep a compact two-column button arrangement on short landscape screens.

### Visual language and consistency

- Retain and enhance the dark charcoal/cyan color theme with readable text, restrained highlights and user-friendly contrast. Do not switch to the reference's light palette.
- Make the interface boxy with a little radius: panels/previews/dialogs 6px, buttons/icon containers 4px, small tags 2px. Avoid rounded pill-shaped UI and large card radii. Circles are reserved for existing logos and decorative geometry.
- Use the same typography, spacing, border thickness, radii and button behavior across the hero, sidebar, previews and detail panels.
- Maintain subtle depth and meaningful interaction. The user does not want a flat static design, but also does not want noisy effects.
- Keep the background quiet and consistent. Do not restore rejected animated beams, drifting lines, oversized spotlights or distracting background motion.
- No cut-off shadows, clipped button glow, hard seams or unnecessary separators between project image and description. Current carousel direction explicitly allows smaller neighboring projects with symmetric, smooth edge fades.
- Hover/focus highlights must follow the element's small corner radius; no square outline around a rounded card or button.
- Every real clickable element must use a pointer cursor and visible keyboard focus. Disabled controls must clearly communicate their state.

### Profile, branding and copy

- `public/cyril-profile.md` is the authoritative source for the name, Full Stack Developer title, experience, education, skills and currently included projects. Key Masker remains excluded; Beautiful & Blessed Esthetics brings the current collection to 20 projects. Derive counts from data. Do not invent capabilities, experience, projects or URLs.
- Sergio Garcia's project uses the user-supplied `https://sergio-garcia-zeta.vercel.app/` destination; keep the saved profile and displayed project link in sync.
- Keep the user's actual logo visible on desktop and mobile. Use one profile portrait in the top-left identity area; do not repeat the portrait or biography in hero cards.
- Mobile header: use the logo and Cyril AI wordmark; remove the tiny framed portrait. Keep the main portrait in the desktop sidebar. Menu/Close controls should use clean text and a morphing two-line glyph, without a boxed hamburger or X.
- Keep Menu and Close in exactly the same measured position at every mobile size. The glyph morphs in place; neither control snaps into the space above the header. Preserve the page's scroll position and scrollbar width through the entire opening and closing sequence, and restore focus without scrolling.
- Primary CTA wording is `Book a discovery call` consistently; replace `Let's Discuss`. Use `/contact` until an actual meeting-booking URL is supplied. Do not invent a scheduling destination.
- Place Download CV beside the discovery-call CTA, including on phones. Remove the redundant Let's make something link from the sidebar.
- Remove the redundant standalone `Davao, Philippines ? Full Stack Developer` line below the grid. Sidebar identity/location can remain.

### Projects page (latest direction, October 8)

- Keep the established charcoal/cyan theme and boxy 6px/4px/2px radii. Use the same Aceternity sidebar on the left throughout `/works` and project routes; highlight Projects as the active section.
- The Projects page defaults to one spacious project at a time. Provide explicit Back/Next controls and a view switch to a four-column grid on wide desktops, reducing columns for smaller screens. Preserve selection and service filters between views.
- Latest correction: the default single-project view must fit one desktop viewport with no page scrolling. Size the cover and presentation to the remaining height and keep navigation/view controls and discovery/CV actions visible. Use Aceternity Animated Modal for the complete description, features, contribution, and stack; never achieve this by clipping overflowing content. Grid view may scroll. Preserve natural mobile/tablet scrolling below 1024px as previously requested.
- This latest request authorizes manual project navigation on the Projects page. The homepage featured card retains its automatic-only carousel behavior.
- Each selected project has a permanent UUID-style `/works/{uuid}` URL. IDs are assigned once and saved, never regenerated on render. Direct links, refresh, browser Back/Forward, canonical metadata, and old descriptive URL redirects must work.
- Explain the product with an overview, intended users, feature highlights, services, verified stack, and confirmed personal contribution. Keep product capabilities separate from personal ownership. Omit unsupported results, dates, team sizes, and unconfirmed contributions.
- Use the available width for complete, uncropped WebP covers and readable descriptions. Keep carousel controls usable without scrolling through the entire case study. Grid entries must link to their real project URLs and support opening in a new tab.
- Reference research is documented in `design-assets/project-browser-design.md`; interpret its information structure using this portfolio's existing visual language.

### Featured projects and images

- One featured project at a time in two columns on desktop: image or placeholder on the left, short description on the right. Stack the image above the description on narrow phones. The description includes project name, category, a brief outcome, relevant technology tags and an interactive Explore project CTA.
- Rotate featured projects automatically. No next/previous project buttons, clickable dots, clickable slide indicators, swipe controls or keyboard controls that advance the carousel. Pause automatic movement during hover, keyboard focus, open dialogs, user motion pause and reduced-motion preference.
- Project details and the all-project collection may be opened. Show every included project together in the collection (currently 19 after removing Key Masker); do not add project pagination.
- The temporary Cynergy placeholder has been superseded by the user's October 8 request: use the updated local Personal-Saas/Cynergy preview for a generated presentation. Do not restore outdated Persona/POS screenshots. Preserve original source files rather than deleting them destructively.
- Generate polished screenshot-based project presentations, not just raw screenshots. Use a consistent visual family, tight intentional framing, original recognizable interfaces and the portfolio's surrounding theme.
- Crop browser chrome, OS taskbars and stray scrollbars appropriately. Avoid blank side strips, poor letterboxing, distorted images or inconsistent preview sizes.
- Show the whole generated product mockup without cropping its frame. Give the project composition the available card space; omit the redundant Selected work footer. The work heading opens the complete collection.
- Save generated production images locally as optimized WebP and update all consumers. Keep original source assets and record generation prompts and optimized paths.
- Latest cleanup request: after generating the covers, convert remaining workspace PNG assets to WebP, update consumers/provenance references, verify dimensions and transparency, and remove the redundant PNG copies. Keep external project folders and image-tool output originals outside this workspace untouched.

### Services, toolbox and details

- Base the six service categories and deliverables on real profile/project work: Custom Business Software, Business Websites, Content Management Systems, Mobile Apps, Integrations & Automation, Ongoing Support & Maintenance.
- Use the services reference's information structure: concise service badge/headline, description, deliverables, technology tags and a complementary icon panel. Keep it inside responsive details rather than adding a long homepage.
- Link service examples to relevant real projects. Do not copy the reference's unrelated SEO, AI-agent or CRM claims.
- Categorize every included project under one or more real services. Use shared category IDs/labels for collection filters, project detail tags, case studies and service examples. Assign services from the user's contribution answers and verified project work; do not imply a maintenance contract merely because a site is live.
- Ask a separate contribution question for each project. Record personal responsibilities, pre-existing work, teammate responsibilities, project context/status and substantiated outcomes. Verify stacks and integrations from available local source rather than repeatedly asking the user to recall them. Keep confirmed answers in the profile and questionnaire; do not invent missing results or ownership.
- The project collection uses Aceternity Animated Modal and Hover Border Gradient: every included entry with a generated WebP thumbnail, service filters, readable names and a detail view. No pagination or manual featured-carousel navigation. Keep Close in a dedicated stationary header, with scrolling inside the dialog and consistent opening/closing motion.
- SPOS: the user rejected the sign-in cover. Capture the actual local POS application, not its sign-in screen.
- Capture missing images from actual public sites or authorized local previews in Personal Work/Izee. Generate polished screenshot-based covers in the established visual family and encode WebP. Use an honest architecture illustration for backend-only work, and identify a sign-in preview when authentication prevents a dashboard capture. Record exact sources, prompts and optimized paths.
- Replace the former work-experience/process card with the full toolbox using icons and an automatic carousel. Include the profile's skills and relevant daily tools such as Claude Code, Codex, Cursor, Figma and VS Code.
- Give tools/skills meaningful distinct icons. Agile Scrum, CMS, lead capture, SaaS and payments must not all share a generic plug icon.

### Motion and finishing checks

- Use one unique, choreographed entrance sequence with shared timing, easing and reveal behavior. Stagger related elements as part of that sequence; do not add random unrelated animations.
- Open and close panels with the same motion language; closing should reverse the opening behavior. Keep hover, press, carousel and toolbox motion consistent and restrained.
- The mobile menu expands from the actual menu-button position, reveals route buttons in one sequence, then reverses the sequence and collapses to the trigger when closing.
- Make the hero entrance observable: headline, supporting copy, CTA and bento cards share a deliberate sequence. On mobile, below-the-fold cards reveal once when entering view so their entrance does not finish before the user scrolls to them.
- Follow a deliberate reading order: sidebar identity and navigation, headline, supporting copy, discovery/CV actions, Work, Services, Toolbox, Foundation, Connected tools. Main boxes start 180ms apart with the same panel reveal; each heading and description follows its own box. Sidebar links reveal from top to bottom. Use masked text reveals rather than unrelated or random effects.
- Buttons need visible, smooth hover/focus/press interaction using Aceternity effects. Reserve sufficient room for their visual treatment; no clipping beneath CTAs.
- Respect reduced motion. Keep existing motion controls where requested, and omit the Home play/pause button per the latest instruction. Do not make animation necessary to access content.
- Finish all requested work before handing it back for judgment. Validate actual visible content, ancestors that clip, images, navigation, dialogs, auto rotation, keyboard interaction and production build/type checks.
