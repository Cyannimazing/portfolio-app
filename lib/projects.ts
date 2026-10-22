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
  rationale?: string;
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
    challenge: "Church organizations needed one platform for service bookings, appointments and official records. Each church also needed control over its own schedules, services and member information. Online booking had to use the chosen church's availability so churchgoers could request the right service.",
    solution: "We built a separate admin portal for each church. Staff can manage their service availability, booking confirmations, settings and member records. The platform also creates baptism and marriage certificate PDFs from stored information. Each subscribed church manages its own work within the shared system.",
    rationale: "A shared platform lets churches use the same tools while keeping their work separate. Booking requests use each church's own availability. Certificates use information already stored in its records, so staff do not need to type the same details again for every document.",
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
    challenge: "The financial aid institution needed a clear process for managing applications and releasing funds across five user roles. Staff needed to follow approval decisions, assigned funds and records of how the aid was used. Beneficiaries also needed to see the status of their requests.",
    solution: "We developed the backend within a four-person team. It supports portals for Admin, Director, Caseworker, Finance Officer and Beneficiary. Staff permissions and several approval steps control the aid process. Fund allocation, usage records and audit logs keep each financial action linked to the relevant case.",
    rationale: "Each role has different responsibilities, so access and approval steps need to reflect those duties. Audit logs let staff follow an application's progress. Keeping fund allocation and usage records together also gives staff one place to review the aid assigned to a case and how it was used.",
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
    challenge: "F.A Babila Architects needs a public website instead of sharing its portfolio through cloud-drive links. The practice also needs to update projects, services and journal entries itself. The website should explain its work clearly and give prospective clients a direct way to contact the studio.",
    solution: "We are building a Nuxt website with project, service and journal pages. A Laravel and MySQL content management system will let the practice make updates. We are also adding a contact enquiry form and clear page descriptions. Public pages will include their text when they first load so visitors and search tools can read it.",
    rationale: "Project pages explain the work alongside its images, and content tools let the practice maintain those pages itself. Readable public pages help search engines and AI tools understand the website. The SEO goal is to compete for top positions in relevant architecture searches, helping people find the studio and send an enquiry.",
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
