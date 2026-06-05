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
    fullDescription: "Obiyen is a comprehensive enterprise SaaS platform developed at awork.dk. Over six months I built and shipped multiple production modules across the full stack. My contributions spanned OAuth integrations, social media APIs, a Password Manager, SEO tooling, Timesheet workflows, a Quotation system, DocFlow accessibility compliance, a Chat ownership system, a Helpdesk, and platform-wide localization.",
    features: [
      "Analytics and reporting with Google Analytics, Search Console, Rank Tracker, and Google Ads integration",
      "Social media management for Meta, Instagram, LinkedIn, YouTube, and X with post management and engagement tracking",
      "Marketing automation including A/B testing, conversion optimization, surveys, and campaign management",
      "Consent Management Platform with cookie consent, GDPR compliance, and session tracking",
      "SEO and website auditing with keyword rankings, accessibility audits, and AI-powered analysis",
      "Password Manager with personal and company vaults, licensing, audit logs, and directory sync",
      "Quotation system with branded templates, CRM linking, digital approvals, and PDF generation",
      "Helpdesk with ticket management, knowledge base, contact directory, and AI-assisted support",
      "Real-time chat with agent assignment, department routing, embeddable widgets, and voice support",
      "Timesheet and time tracking with approval workflows, holiday management, and payroll export",
      "DocFlow document management with role-based visibility and WCAG 2.1 AA compliance",
      "Workflow and project management with boards, teams, and task tracking",
      "Billing and subscription management with payment processing and plan upgrades",
      "Multi-platform SSO with Microsoft, Google, and SAML authentication",
      "Mail signature builder with template management and team distribution",
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
    features: ["Multi-tenant architecture", "Subscription-based SaaS", "Online service booking", "Appointment scheduling", "Official document generation", "Church admin dashboard"],
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
    features: ["Role-based portals", "Multi-level approvals", "Allocation and liquidation management", "Audit logs", "Secure authentication", "Real-time dashboards"],
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
    features: ["YOLO11s disease detection", "Mobile real-time analysis", "Farm management dashboard", "Harvest data tracking", "RESTful API web-mobile sync"],
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
    features: ["Automated conflict-free timetable", "Faculty assignment", "Workload balancing", "PDF report generation", "Cross-platform desktop app"],
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
    fullDescription: "Cynergy is a multi-tenant SaaS platform built to manage multiple business apps from one place. The first app available is a Point of Sale (POS) system, with more apps to be added in the future as the platform grows. Each app can be licensed, configured, and assigned to team members independently. The platform supports seat-based licensing, email invitations for members and admins, and custom role and permission management per app. Built solo using a Nuxt 3 SPA frontend and a Laravel 12 REST API backend following Repository, Service, and Interface design patterns.",
    features: [
      "Multi-app dashboard showing all available company applications",
      "Seat-based app licensing with 3 seats included by default and the option to purchase more",
      "Email-based invitations to add members or admins to your POS or company apps",
      "POS onboarding flow to guide new users through the initial setup",
      "POS checkout screen for browsing and selling products",
      "Income statement for tracking business expenses and profits",
      "Custom role creation with toggleable permissions for fine-grained access control",
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
