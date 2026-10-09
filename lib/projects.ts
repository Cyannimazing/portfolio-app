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
  contribution?: { role: string; team?: string; scope?: string };
  subImages?: { url: string; caption: string }[];
  pdfReports?: { name: string; url: string }[];
  liveLink?: string;
  githubLink?: string;
  demoCredentials?: { email: string; password: string };
}

export function toSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// Earlier versions of current portfolio projects redirect to their permanent UUID pages.
// Only the three independent legacy case studies need this additional content.
export const projects: Project[] = [
{
    id: 2,
    title: "FaithSeeker",
    type: "Web Development",
    year: "2025",
    description: "Multi-tenant SaaS for church services booking and management. Capstone Project.",
    mainImage: "/projects/optimized/main_image-presentation.webp",
    technologies: ["Next.js", "React", "Laravel API", "MySQL", "Tailwind CSS"],
    fullDescription: "A multi-tenant SaaS platform enabling church owners to subscribe and manage their operations. Multiple churches operate independently with admin portals for service bookings, appointments, and document generation.",
    challenge: "Churches needed an affordable way to run service bookings, appointments, and official records online, but each church had to stay completely independent, with its own members, data, and configuration, rather than sharing one common system.",
    solution: "I designed a multi-tenant SaaS platform where every subscribed church gets its own independent admin portal with fully isolated data, service configurations, and private member records. I replaced manual scheduling with self-service online booking tied to church-specific availability and confirmation flows, and automated baptism and marriage certificates as ready-to-print PDF documents generated straight from stored records.",
    services: ["Custom Business Software", "Business Websites"],
    industry: "Education & Community",
    features: [
      "Designed and built a multi-tenant SaaS platform where each subscribed church operates independently with its own isolated admin portal, service configurations, and member data.",
      "Implemented online service booking and appointment scheduling with church-specific availability, session management, and booking confirmation flows.",
      "Built automated official document generation for baptism and marriage certificates, producing accurate PDF outputs from stored records.",
    ],
    contribution: { role: "Full Stack Developer", team: "Solo" },
    subImages: [
      { url: "/projects/optimized/sub_owner_image1.webp", caption: "Admin Dashboard showing service and booking overview" },
      { url: "/projects/optimized/sub_owner_image2.webp", caption: "My Churches multi-church management portal" },
      { url: "/projects/optimized/sub_churchgoer_image1.webp", caption: "User Portal for service booking" },
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
    mainImage: "/projects/optimized/aidpoint_main-presentation.webp",
    technologies: ["Laravel API", "MySQL", "React", "Next.js", "Tailwind CSS"],
    fullDescription: "AidPoint is a SaaS platform streamlining financial aid operations for institutions. Features role-based portals for Admin, Director, Caseworker, Finance Officer, and Beneficiary with multi-level approval workflows.",
    challenge: "A financial aid institution needed to move disbursements off spreadsheets and manual sign-offs, with clear accountability across five different roles and a complete audit trail for every amount that moved.",
    solution: "I built the backend powering role-based portals for five roles (Admin, Director, Caseworker, Finance Officer, Beneficiary), replacing spreadsheet-based aid tracking with multi-level approval workflows that govern every disbursement. I engineered allocation and liquidation tracking with full audit logs for end-to-end traceability, and exposed secure real-time data that gives all five stakeholder roles a clear, live view of application status, approvals, and fund movement.",
    services: ["Custom Business Software"],
    industry: "Business & SaaS",
    features: [
      "Developed role-based portals for 5 distinct roles (Admin, Director, Caseworker, Finance Officer, Beneficiary) with multi-level approval workflows governing each financial aid disbursement.",
      "Engineered allocation and liquidation management with full audit logs ensuring complete traceability across every stage of the disbursement cycle.",
      "Built real-time dashboards and secure authentication enabling each stakeholder role to track aid application status, approvals, and fund movement at a glance.",
    ],
    contribution: { role: "Backend Stack Developer", team: "4-person team" },
    subImages: [
      { url: "/projects/optimized/aidpoint_admin_portal.webp", caption: "Admin Portal for system administration" },
      { url: "/projects/optimized/aidpoint_director_portal.webp", caption: "Director Portal for review and approvals" },
      { url: "/projects/optimized/aidpoint_caseworker_portal.webp", caption: "Caseworker Portal for case management" },
      { url: "/projects/optimized/aidpoint_finance_officer_portal.webp", caption: "Finance Officer Portal for disbursement" },
      { url: "/projects/optimized/aidpoint_beneficiary_portal.webp", caption: "Beneficiary Portal for requests and status tracking" },
    ],
  },
{
    id: 7,
    title: "F.A Babila Architects",
    type: "Web Development",
    year: "May 2026",
    description: "SEO-friendly marketing and portfolio website for an architecture and interior design firm, with a built-in CMS and contact enquiries. Currently in progress.",
    mainImage: "/projects/optimized/archi_main-presentation.webp",
    technologies: ["Nuxt.js", "Vue 3", "TypeScript", "Tailwind CSS", "Nuxt UI", "Laravel", "PHP", "MySQL"],
    fullDescription: "F.A Babila Architects is a marketing and portfolio website for a Davao City architecture and interior design practice, built on Nuxt 4 (Vue 3, TypeScript) with a Laravel and MySQL backend. It replaces the firm's habit of sharing work through cloud-drive links with a fast, SEO-friendly public site, and gives the team a content management system to publish projects, services, and journal entries without a developer. Currently in active development.",
    challenge: "F.A Babila Architects shared their portfolio the traditional way, through cloud-drive links, which left the firm invisible on Google and hard to find next to competing practices. They needed a professional, SEO-friendly website that showcases their work, ranks in search, lets them manage their own content, and gives prospective clients an easy way to get in touch.",
    solution: "I am building F.A Babila a fast, SEO-friendly marketing and portfolio website on Nuxt 4 (Vue 3, TypeScript) backed by a Laravel and MySQL API, replacing scattered drive links with a single, searchable home for their work. The site ships with a content management system so the firm can publish and edit projects, services, and journal entries themselves, plus a simple contact enquiry flow that turns visitors into leads. A custom typography and theming system (light/dark, swappable font pairings) sets the practice apart from competitors online.",
    services: ["Business Websites", "Custom Business Software"],
    industry: "Web & Branding",
    features: [
      "Built a fast, SEO-friendly public website on Nuxt 4 with server-side rendering, semantic structure, and per-page metadata so the firm ranks on Google and is discoverable next to competing practices, replacing their drive-link portfolio sharing.",
      "Developing a content management system on a Laravel and MySQL backend so the firm can publish and edit projects, services, team profiles, and journal entries without developer involvement.",
      "Added a contact enquiry flow that lets prospective clients reach the studio directly from the site, turning portfolio visits into qualified leads.",
      "Designed a custom design system with brand color tokens, light and dark theming, and swappable typography pairings to give the practice a distinctive, high-end presence online.",
    ],
    contribution: { role: "Full Stack Developer", team: "Solo" },
    liveLink: "https://archi-client.vercel.app/",
  },
];
