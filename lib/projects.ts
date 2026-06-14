export interface Project {
  id: number;
  title: string;
  type: string;
  year: string;
  description: string;
  mainImage: string;
  technologies: string[];
  fullDescription: string;
  features: string[];
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
    title: "Obiyen",
    type: "Web Development",
    year: "Jan 2026 to Jun 2026",
    description: "Full-stack SaaS platform at awork.dk. Shipped timesheet, quoting, chat, and helpdesk modules in production.",
    mainImage: "/projects/obiyen_dashboard_main.png",
    technologies: ["Nuxt.js", "Vue 3", "Laravel", "PostgreSQL", "TypeScript", "Pusher"],
    fullDescription: "Contributed across 9 production modules on a custom multi-tenant B2B SaaS platform (Nuxt 3, Vue 3, Laravel 12, MySQL, Pusher), taking full-stack ownership from database schema and REST API design to Nuxt 3 frontend. Platform uses a custom tenancy architecture (Client - Agency - Workspace) with RBAC (Superadmin / Admin / Editor / Viewer) and real-time features via Laravel Echo and Pusher.",
    features: [
      "Integrated Facebook and Instagram APIs via OAuth 2.0, delivering agency-scoped post management, comment moderation, brand mention tracking, and engagement analytics with proper multi-tenant data isolation per agency.",
      "Architected the Password Manager module from scratch - personal and company vaults, Azure Active Directory (Entra) directory sync, seat-based licensing, user assignment, master password, breach monitoring, and credential import/export (17 models, 28 migrations, repository pattern).",
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
    id: 2,
    title: "FaithSeeker",
    type: "Web Development",
    year: "2025",
    description: "Multi-tenant SaaS for church services booking and management. Capstone Project.",
    mainImage: "/projects/main_image.png",
    technologies: ["Next.js", "React", "Laravel API", "MySQL", "Tailwind CSS"],
    fullDescription: "A multi-tenant SaaS platform enabling church owners to subscribe and manage their operations. Multiple churches operate independently with admin portals for service bookings, appointments, and document generation.",
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
    title: "CacaoCare",
    type: "Mobile Application",
    year: "2024 to 2025",
    description: "Cacao disease classifier with mobile detection and web farm management. Thesis Project.",
    mainImage: "/projects/cacao_main_image.png",
    technologies: ["Nuxt.js", "Laravel", "MySQL", "Android Studio", "Java"],
    fullDescription: "CacaoCare combines mobile cacao pod disease detection with a web platform for farm management. Uses a custom-trained YOLO11s model for image-based detection.",
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
    id: 5,
    title: "Faculty Scheduling",
    type: "Desktop Application",
    year: "2025",
    description: "Automated timetable generation and faculty workload management. Freelance Project.",
    mainImage: "/projects/main_image1.png",
    technologies: ["React", "Laravel", "Inertia.js", "MySQL", "Electron"],
    fullDescription: "A desktop application for a technical college automating conflict-free class timetables and faculty workload management.",
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
    year: "Apr 2026 to Present",
    description: "SaaS platform for managing multiple business apps. Currently features a POS system, with more apps to be added. Includes licensing, team invitations, and role-based access.",
    mainImage: "/projects/persona_main.png",
    technologies: ["Nuxt.js", "Vue 3", "TypeScript", "Pinia", "Tailwind CSS", "Zod", "Laravel", "PHP", "SQLite", "Sanctum", "Spatie Permission"],
    fullDescription: "Cynergy is a multi-module enterprise SaaS platform built solo using Nuxt 4 (Vue 3 + TypeScript) and Laravel 12 REST API, following Repository, Service, and Interface design patterns. The first module is a full-featured POS system supporting restaurants, retail shops, and repair service centers - with 80+ Eloquent models, 39 frontend pages, and real-time features via Laravel Reverb and Pusher. The platform uses a dual-tier role system: company-level app licensing controls which employees access which apps, while each app has its own custom role and permission management.",
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
];
