export interface Project {
  id: number;
  title: string;
  type: string;
  year: string;
  description: string;
  mainImage: string;
  technologies: string[];
  fullDescription: string;
  challenge?: string;
  solution?: string;
  services?: string[];
  industry?: string;
  features?: string[];
  contribution?: { role: string; team: string };
  subImages?: { url: string; caption: string }[];
  pdfReports?: { name: string; url: string }[];
  liveLink?: string;
  githubLink?: string;
  demoCredentials?: { email: string; password: string };
}

export function toSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export const projects: Project[] = [
  {
    id: 1,
    title: "CacaoCare",
    type: "Mobile Application",
    year: "2024 to 2025",
    description: "Cacao disease classifier with mobile detection and web farm management. Thesis Project.",
    mainImage: "/projects/cacao_main_image.png",
    technologies: ["Nuxt.js", "Laravel", "MySQL", "Android Studio", "Java"],
    fullDescription: "CacaoCare combines mobile cacao pod disease detection with a web platform for farm management. Uses a custom-trained YOLO11s model for image-based detection.",
    challenge: "Cacao farmers needed to catch pod diseases early without sending samples to a lab or depending on a network connection in the field, while farm owners still needed a way to track harvests and review detection history.",
    solution: "I built the web side of a two-part system. A custom-trained YOLO11s model runs on-device in the mobile app for real-time, offline pod disease detection with no lab required, and I built the synchronized Laravel web platform and REST API behind it, syncing every detection to a dashboard for harvest tracking and farm analytics and centralizing detection history across mobile and web.",
    services: ["Mobile Apps", "Custom Business Software"],
    industry: "Agriculture",
    features: [
      "Integrated a custom-trained YOLO11s deep learning model into a mobile app, enabling real-time cacao pod disease detection via on-device camera without requiring server round-trips.",
      "Built a synchronized web platform for farm management connecting to the mobile app via RESTful API, enabling harvest data tracking, farm analytics, and detection history review.",
      "Designed the full Laravel backend API handling image analysis results, farm records, and mobile-web data synchronization across both platforms.",
    ],
    contribution: { role: "Full Stack Developer (Web Only)", team: "2-person team" },
    subImages: [
      { url: "/projects/cacao_admin_portal_image.png", caption: "Admin Portal for farm management" },
      { url: "/projects/cacao_user_portal_image.png", caption: "Farmer interface and user portal" },
      { url: "/projects/cacao_mobile_image1.jpg", caption: "Mobile app pod detection interface" },
      { url: "/projects/cacao_mobile_image2.jpg", caption: "Mobile app disease analysis results" },
    ],
    liveLink: "https://cacao-care.nuxt.dev/",
  },
  {
    id: 2,
    title: "FaithSeeker",
    type: "Web Development",
    year: "2025",
    description: "Multi-tenant SaaS for church services booking and management. Capstone Project.",
    mainImage: "/projects/main_image.png",
    technologies: ["Next.js", "React", "Laravel API", "MySQL", "Tailwind CSS"],
    fullDescription: "A multi-tenant SaaS platform enabling church owners to subscribe and manage their operations. Multiple churches operate independently with admin portals for service bookings, appointments, and document generation.",
    challenge: "Churches needed an affordable way to run service bookings, appointments, and official records online, but each church had to stay completely independent, with its own members, data, and configuration, rather than sharing one common system.",
    solution: "I designed a multi-tenant SaaS platform where every subscribed church gets its own independent admin portal with fully isolated data, service configurations, and private member records. I replaced manual scheduling with self-service online booking tied to church-specific availability and confirmation flows, and automated baptism and marriage certificates as ready-to-print PDF documents generated straight from stored records.",
    services: ["Custom Business Software", "Business Websites"],
    industry: "Religious Organizations",
    features: [
      "Designed and built a multi-tenant SaaS platform where each subscribed church operates independently with its own isolated admin portal, service configurations, and member data.",
      "Implemented online service booking and appointment scheduling with church-specific availability, session management, and booking confirmation flows.",
      "Built automated official document generation for baptism and marriage certificates, producing accurate PDF outputs from stored records.",
    ],
    contribution: { role: "Full Stack Developer", team: "Solo" },
    subImages: [
      { url: "/projects/sub_owner_image1.png", caption: "Admin Dashboard showing service and booking overview" },
      { url: "/projects/sub_owner_image2.png", caption: "My Churches multi-church management portal" },
      { url: "/projects/sub_churchgoer_image1.png", caption: "User Portal for service booking" },
    ],
    pdfReports: [
      { name: "Sample Baptism Certificate", url: "/reports/Certificate of Baptism.pdf" },
      { name: "Sample Marriage Certificate", url: "/reports/Certificate of Marriage.pdf" },
    ],
    liveLink: "https://churchms-frontend.vercel.app/",
  },
  {
    id: 3,
    title: "AidPoint",
    type: "Web Development",
    year: "2025",
    description: "SaaS financial aid management with role-based portals and multi-level approvals. Freelance Project.",
    mainImage: "/projects/aidpoint_main.png",
    technologies: ["Laravel API", "MySQL", "React", "Next.js", "Tailwind CSS"],
    fullDescription: "AidPoint is a SaaS platform streamlining financial aid operations for institutions. Features role-based portals for Admin, Director, Caseworker, Finance Officer, and Beneficiary with multi-level approval workflows.",
    challenge: "A financial aid institution needed to move disbursements off spreadsheets and manual sign-offs, with clear accountability across five different roles and a complete audit trail for every amount that moved.",
    solution: "I built the backend powering role-based portals for five roles (Admin, Director, Caseworker, Finance Officer, Beneficiary), replacing spreadsheet-based aid tracking with multi-level approval workflows that govern every disbursement. I engineered allocation and liquidation tracking with full audit logs for end-to-end traceability, and exposed secure real-time data that gives all five stakeholder roles a clear, live view of application status, approvals, and fund movement.",
    services: ["Custom Business Software"],
    industry: "Finance & Social Services",
    features: [
      "Developed role-based portals for 5 distinct roles (Admin, Director, Caseworker, Finance Officer, Beneficiary) with multi-level approval workflows governing each financial aid disbursement.",
      "Engineered allocation and liquidation management with full audit logs ensuring complete traceability across every stage of the disbursement cycle.",
      "Built real-time dashboards and secure authentication enabling each stakeholder role to track aid application status, approvals, and fund movement at a glance.",
    ],
    contribution: { role: "Backend Stack Developer", team: "4-person team" },
    subImages: [
      { url: "/projects/aidpoint_admin_portal.png", caption: "Admin Portal for system administration" },
      { url: "/projects/aidpoint_director_portal.png", caption: "Director Portal for review and approvals" },
      { url: "/projects/aidpoint_caseworker_portal.png", caption: "Caseworker Portal for case management" },
      { url: "/projects/aidpoint_finance_officer_portal.png", caption: "Finance Officer Portal for disbursement" },
      { url: "/projects/aidpoint_beneficiary_portal.png", caption: "Beneficiary Portal for requests and status tracking" },
    ],
  },
  {
    id: 4,
    title: "Obiyen",
    type: "Web Development",
    year: "Jan 2026 to Jun 2026",
    description: "Full-stack SaaS platform at awork.dk. Shipped timesheet, quoting, chat, and helpdesk modules in production.",
    mainImage: "/projects/obiyen_dashboard_main.png",
    technologies: ["Nuxt.js", "Vue 3", "Laravel", "PostgreSQL", "TypeScript", "Pusher"],
    fullDescription: "Contributed across 9 production modules on a custom multi-tenant B2B SaaS platform (Nuxt 3, Vue 3, Laravel 12, MySQL, Pusher), taking full-stack ownership from database schema and REST API design to Nuxt 3 frontend. Platform uses a custom tenancy architecture (Client - Agency) with RBAC (Admin / Editor / Viewer) and real-time features via Laravel Echo and Pusher.",
    challenge: "awork.dk runs Obiyen, a multi-app B2B SaaS platform where agencies subscribe to the business apps they need (social management, quoting, timesheets, helpdesk, and more). Each module had to be built and hardened in production with strict per-agency data isolation, role-based access, and real-time collaboration across every app.",
    solution: "I contributed across 9 production modules (now live and used by agencies) on Obiyen's custom Nuxt 3 and Laravel 12 multi-tenant architecture (Client to Agency, with Admin/Editor/Viewer roles). I shipped the full quotation lifecycle with PDF rendering and digital approval, resolving 11 post-QA issues around multi-currency, VAT inheritance, and Danish characters; delivered a four-eyes timesheet approval workflow; integrated Facebook and Instagram for agency-scoped social management; and brought DocFlow document management to 100% WCAG accessibility compliance. I also wired transactional email across quotes, invoices, and signatures, and restored Microsoft SSO and accurate per-agency analytics after critical production bug fixes, all with multi-tenant isolation and EN/DA localization.",
    services: ["Custom Business Software", "Integrations & Automation"],
    industry: "SaaS & Agencies",
    features: [
      "Integrated Facebook and Instagram APIs via OAuth 2.0, delivering agency-scoped post management, comment moderation, brand mention tracking, and engagement analytics with proper multi-tenant data isolation per agency.",
      "Built the Quotation module end-to-end: full lifecycle (draft - sent - viewed - accepted/declined/expired), PDF and web rendering via Snappy, digital approval with audit log, template system, pricing engine, and automated email notifications. Resolved 11 post-QA issues including UTF-8 Danish characters, multi-currency (DKK/EUR/USD), VAT inheritance, decimal precision, and dynamic sender branding per template.",
      "Delivered the Timesheet module with a 4-eyes approval workflow and addressed post-launch feedback by fixing a raw JSON display bug, implementing dual Admin+Manager role support (company-level vs. app-level roles), designing a Superadmin bypass to prevent self-approval deadlocks, and adding full EN/DA translation for international teams.",
      "Redesigned the SEO rank tracking pipeline to eliminate Google Search Console dependency by rerouting SERP data through SerpAPI and keyword volume through Google Ads API, decoupling the module from GSC availability and increasing pipeline resilience.",
      "Enhanced DocFlow document management with multi-select bulk template operations and bulk positioning controls, resolved accessibility violations to achieve 100% WCAG compliance, and surfaced role and permission visibility in the sidebar for end-user clarity.",
      "Built per-department email configuration in the Helpdesk module - inbox aliases, SMTP/IMAP provider (Obiyen or custom), HTML signature templates with dynamic variables (agent.name, ticket.id, company.name), auto-reply templates, and keyword-based routing rules.",
      "Wired transactional email flows across Quotes (sent with PDF, accepted, declined, expiry reminders via cron), Timesheet (submitted to manager, approved/rejected with reason to employee), Invoice (PDF dispatch on payment, batch send), and Mail Signature (send-to-self preview in standard and Outlook modes).",
      "Resolved multi-tenant data scoping and analytics payload bugs in the Survey module and a Microsoft Azure AD (Entra) OAuth SSO failure, restoring accurate per-agency reporting and re-enabling SSO for all Microsoft-authenticated users, with fixes validated via platform-wide QA across local and staging.",
    ],
    contribution: { role: "Full Stack Developer", team: "awork.dk development team" },
    subImages: [
      { url: "/projects/obiyen_dashboard_main.png", caption: "Main Dashboard showing platform activity and key metrics" },
      { url: "/projects/obiyen_timesheet.png", caption: "Timesheet Employee View for logging daily working hours" },
      { url: "/projects/obiyen_timesheet_admin.png", caption: "Timesheet Admin View for reviewing and approving timesheets" },
      { url: "/projects/obiyen_quote.png", caption: "Quote Management for creating and managing client-facing quotes" },
      { url: "/projects/obiyen_chat.png", caption: "Internal Chat for real-time messaging between team members" },
      { url: "/projects/obiyen_helpdesk.png", caption: "Helpdesk System for ticketing and support management" },
    ],
    liveLink: "https://app.obiyen.com",
  },
  {
    id: 5,
    title: "Faculty Scheduling",
    type: "Desktop Application",
    year: "2025",
    description: "Automated timetable generation and faculty workload management. Freelance Project.",
    mainImage: "/projects/main_image1.png",
    technologies: ["React", "Laravel", "Inertia.js", "MySQL", "Electron"],
    fullDescription: "A desktop application for a technical college automating conflict-free class timetables and faculty workload management.",
    challenge: "A technical college was building class timetables and faculty workloads entirely by hand, a slow, error-prone process that frequently produced scheduling conflicts and uneven teaching loads.",
    solution: "I built a desktop application that replaced a fully manual process with automatic, conflict-free timetable generation, balancing faculty workloads against subject expertise, load limits, and room constraints. I packaged it as a cross-platform desktop app with Electron and added print-ready PDF reports for class schedules and faculty workload summaries.",
    services: ["Custom Business Software"],
    industry: "Education",
    features: [
      "Automated conflict-free class timetable generation and faculty workload balancing for a technical college, replacing a fully manual scheduling process.",
      "Built a faculty assignment and workload distribution engine that respects subject expertise, load limits, and room constraints to produce valid schedules without conflicts.",
      "Packaged the application as a cross-platform desktop app using Electron with PDF report generation for class schedules and faculty workload summaries.",
    ],
    contribution: { role: "Full Stack Developer", team: "2-person team" },
    subImages: [
      { url: "/projects/sub_image1.png", caption: "Subject assignment to programs" },
      { url: "/projects/sub_image2.png", caption: "Faculty subject allocation" },
      { url: "/projects/sub_image3.png", caption: "Generated class schedule report" },
      { url: "/projects/sub_image4.png", caption: "Faculty workload report" },
    ],
    pdfReports: [
      { name: "Sample Class Schedule", url: "/reports/Sample-CBT-Class-Schedule.pdf" },
      { name: "Sample Faculty Schedule", url: "/reports/Sample-CBT-Faculty-Schedule.pdf" },
    ],
  },
  
  {
    id: 6,
    title: "Cynergy",
    type: "Web Development",
    year: "Apr 2026",
    description: "SaaS platform for managing multiple business apps. Currently features a POS system, with more apps to be added. Includes licensing, team invitations, and role-based access.",
    mainImage: "/projects/persona_main.png",
    technologies: ["Nuxt.js", "Vue 3", "TypeScript", "Pinia", "Tailwind CSS", "Zod", "Laravel", "PHP", "MySQL", "Sanctum", "Spatie Permission"],
    fullDescription: "Cynergy is a multi-module enterprise SaaS platform built solo using Nuxt 4 (Vue 3 + TypeScript) and Laravel 12 REST API, following Repository, Service, and Interface design patterns. The first module is a full-featured POS system supporting restaurants, retail shops, and repair service centers - with 80+ Eloquent models, 39 frontend pages, and real-time features via Laravel Reverb and Pusher. The platform uses a dual-tier role system: company-level app licensing controls which employees access which apps, while each app has its own custom role and permission management.",
    challenge: "Small businesses (restaurants, retail shops, repair centers) juggle separate apps for sales, inventory, scheduling, and staff permissions. They needed one platform where a company licenses only the apps it actually uses and controls exactly who can access what.",
    solution: "I built Cynergy solo on Nuxt 4 and Laravel 12, unifying sales, inventory, scheduling, and permissions into one licensable platform, starting with a full-featured POS (80+ models, 40+ modules) spanning bookings, job scheduling, kitchen, and procurement. I prevented financial inconsistencies with idempotent, immutable transaction handling (separate refund, void, and reversal flows), added a dual-tier role system (company-level app licensing plus per-app permissions), and delivered real-time cashier, kitchen, and stock updates across connected clients via Laravel Reverb and Pusher.",
    services: ["Custom Business Software", "Integrations & Automation"],
    industry: "Retail & Hospitality",
    features: [
      "Architected a multi-module enterprise SaaS platform supporting restaurants, retail shops, and repair service centers - 80+ Eloquent models and 40+ feature modules spanning POS, inventory, bookings, job scheduling, kitchen management, and procurement.",
      "Designed dual-tier role-based access control: company-level app licensing linked to granular module-specific permissions, with custom role creation and toggleable permissions per tenant.",
      "Implemented transaction management with idempotency keys, immutable invoice states, and separate refund, void, and reversal flows to prevent financial inconsistencies across concurrent operations.",
      "Engineered real-time features via Laravel Reverb and Pusher.js, broadcasting live cashier queue updates, kitchen order status changes, and stock alerts to connected clients.",
      "Built an inventory system with batch tracking, expiry date management, multi-location stock transfers, and stock reservations for pending service orders.",
      "Developed a promo engine supporting conditional discount rules, package deals, loyalty credits per customer, and a real-time promotion preview endpoint before checkout.",
      "Built work order and job scheduling for service centers with labor time tracking, worker scheduling, device diagnostics capture, and warranty PDF certificate generation via wkhtmltopdf/Snappy.",
      "Designed financial reconciliation workflows including cash session open/close/approve cycles, drawer adjustment entries, force-close overrides, and comprehensive audit logging.",
      "Integrated barcode and QR scanning via html5-qrcode for product lookup at checkout and PDF generation via Snappy for invoices, receipts, supply slips, and warranty certificates.",
    ],
    contribution: { role: "Full Stack Developer", team: "Solo" },
    subImages: [
      { url: "/projects/persona_main.png", caption: "Platform Overview - shows all apps available in Cynergy. The POS is the first app, with more apps to be added in the future" },
      { url: "/projects/persona_invite_member.png", caption: "Member Invitation - shows the email invite sent to add a member or admin to manage your POS or company apps" },
      { url: "/projects/persona_app_licensing.png", caption: "App Licensing - each license includes 3 seats by default - additional seats can be purchased as needed" },
      { url: "/projects/persona_pos_onboarding.png", caption: "POS Onboarding - guides new users through the initial setup of the POS app" },
      { url: "/projects/persona_pos_checkout.png", caption: "POS Checkout - displays the products available for sale at the point of sale" },
      { url: "/projects/persona_pos_income%20statement.png", caption: "Income Statement - tracks expenses and profits to give a clear view of business performance" },
      { url: "/projects/persona_pos_roles_%26_privilleges.png", caption: "Roles and Permissions - create custom roles and toggle which actions each role is allowed to perform" },
    ],
    liveLink: "https://cynergy.cloud/",
    demoCredentials: { email: "owner@example.com", password: "password" },
  },
  {
    id: 7,
    title: "F.A Babila Architects",
    type: "Web Development",
    year: "Jun 2026",
    description: "SEO-friendly marketing and portfolio website for an architecture and interior design firm, with a built-in CMS and contact enquiries. Currently in progress.",
    mainImage: "/projects/archi_main.png",
    technologies: ["Nuxt.js", "Vue 3", "TypeScript", "Tailwind CSS", "Nuxt UI", "Laravel", "PHP", "MySQL"],
    fullDescription: "F.A Babila Architects is a marketing and portfolio website for a Davao City architecture and interior design practice, built on Nuxt 4 (Vue 3, TypeScript) with a Laravel and MySQL backend. It replaces the firm's habit of sharing work through cloud-drive links with a fast, SEO-friendly public site, and gives the team a content management system to publish projects, services, and journal entries without a developer. Currently in active development.",
    challenge: "F.A Babila Architects shared their portfolio the traditional way, through cloud-drive links, which left the firm invisible on Google and hard to find next to competing practices. They needed a professional, SEO-friendly website that showcases their work, ranks in search, lets them manage their own content, and gives prospective clients an easy way to get in touch.",
    solution: "I am building F.A Babila a fast, SEO-friendly marketing and portfolio website on Nuxt 4 (Vue 3, TypeScript) backed by a Laravel and MySQL API, replacing scattered drive links with a single, searchable home for their work. The site ships with a content management system so the firm can publish and edit projects, services, and journal entries themselves, plus a simple contact enquiry flow that turns visitors into leads. A custom typography and theming system (light/dark, swappable font pairings) sets the practice apart from competitors online.",
    services: ["Business Websites", "Custom Business Software"],
    industry: "Architecture & Design",
    features: [
      "Built a fast, SEO-friendly public website on Nuxt 4 with server-side rendering, semantic structure, and per-page metadata so the firm ranks on Google and is discoverable next to competing practices, replacing their drive-link portfolio sharing.",
      "Developing a content management system on a Laravel and MySQL backend so the firm can publish and edit projects, services, team profiles, and journal entries without developer involvement.",
      "Added a contact enquiry flow that lets prospective clients reach the studio directly from the site, turning portfolio visits into qualified leads.",
      "Designed a custom design system with brand color tokens, light and dark theming, and swappable typography pairings to give the practice a distinctive, high-end presence online.",
    ],
    contribution: { role: "Full Stack Developer", team: "Solo" },
    liveLink: "https://archi-client.vercel.app/",
  },
  {
    id: 8,
    title: "Beautiful Blessed Esthetics",
    type: "Web Development",
    year: "2026",
    description: "Marketing website for a medical esthetics spa, with an admin CMS so the team edits services, pricing, and content themselves, plus lead-capture contact forms. Live and in active development.",
    mainImage: "/projects/beautifulbless.png",
    technologies: ["Next.js", "React", "Supabase", "PostgreSQL", "Tailwind CSS", "Zod", "Backblaze B2 CDN"],
    fullDescription: "Beautiful Blessed Esthetics is a marketing and content-managed website for a medical esthetics spa, built on Next.js 16 (App Router, React 19) with a Supabase (PostgreSQL) backend. Service providers edit every page section, hero copy, service descriptions, pricing, testimonials, and team bios, through a built-in admin CMS without touching code, while contact enquiries flow straight into the spa's lead-management system. Imagery is served from a Backblaze B2 CDN with Next.js image optimization. Live at beautifulblessedesthetics.com and under active development.",
    challenge: "A medical esthetics spa needed a polished, search-friendly website to present its laser, skincare, and permanent-makeup services and convert visitors into booked consultations. The owners also wanted to update services, pricing, and content themselves, without paying a developer for every wording or image change, and to capture every enquiry as a trackable lead.",
    solution: "As a developer on this production Next.js 16 and Supabase platform, I work across the admin CMS that lets the spa edit every page section (hero copy, service pages, pricing, testimonials, and team bios) without touching code, the lead-capture contact forms (React Hook Form with Zod validation) that route enquiries into the spa's lead-management pipeline, and the Supabase Row-Level Security and Backblaze B2 CDN image delivery that keep the site secure and fast. Content changes publish live via incremental static regeneration.",
    services: ["Business Websites", "Custom Business Software", "Integrations & Automation"],
    industry: "Beauty & Wellness",
    contribution: { role: "Full Stack Developer", team: "2-person team" },
    liveLink: "https://www.beautifulblessedesthetics.com/",
  },
];
