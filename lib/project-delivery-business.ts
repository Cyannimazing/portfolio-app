import type { ProjectDelivery } from "./project-delivery-types";

// Contribution scope comes from the saved profile and existing legacy records.
// Local implementation evidence is recorded in project-professional-evidence-business.json.
export const projectDeliveryBusiness: Record<string, ProjectDelivery> = {
  "profile-1": {
    role: "Full Stack Developer",
    summary: "We built Cynergy's interface, backend and business tools. Companies can manage access to licensed applications, run store operations and handle client outreach in one workspace. Our work also covers staff permissions, approval steps and connections for payments, calendars, email and AI-assisted drafts.",
    responsibilities: [
      {
        title: "Company and application access",
        description: "We built company memberships, invitations and application licenses. Staff receive access to specific applications and roles. Access checks use their company membership and assigned permissions.",
      },
      {
        title: "Connected store operations",
        description: "We built tools for sales, purchasing, stock, suppliers and cashier shifts. Approval steps control actions that need review. Reports bring the store's daily records together.",
      },
      {
        title: "AI-assisted outreach",
        description: "We built tools for finding prospects and preparing outreach. Gemini creates drafts from the supplied profile and prospect details. The backend checks the response format before using it.",
      },
      {
        title: "Payments and connected accounts",
        description: "We connected PayMongo for application billing and Google accounts for calendar and email tasks. These connections support payment requests, appointment availability and follow-up within the company workspace.",
      },
      {
        title: "SEO and search visibility",
        description: "We made public pages readable for search engines and AI tools. The SEO goal is to compete for top positions in relevant business software searches. We also added branded images and clear descriptions for shared links.",
      },
    ],
    capabilities: [
      {
        title: "Nuxt and Laravel application",
        description: "Nuxt 4, Vue 3 and TypeScript run the interface. Pinia manages interface state. Laravel 12 handles backend requests and business records.",
      },
      {
        title: "Company access checks",
        description: "The backend checks company membership, application licenses, assigned access and permissions. Role changes and member removal also check the company and staff roles involved.",
      },
      {
        title: "Controlled operational changes",
        description: "Approval steps save related changes together in a database transaction. The system records review decisions and sends notifications for sales, purchasing and cashier actions.",
      },
      {
        title: "AI responses and account security",
        description: "The backend checks Gemini's structured responses. Laravel encrypts stored outreach API keys and Google refresh tokens used to keep account connections working.",
      },
      {
        title: "Payments and Google integrations",
        description: "Laravel connects PayMongo payments to billing. Google OAuth lets users authorize calendar and email access for tasks in their company workspace.",
      },
      {
        title: "Public pages and link previews",
        description: "Public pages arrive with their text already in the page, so search engines and AI tools can read it. Private application pages load through the browser. Page descriptions and branded preview images support search results and shared links.",
      },
    ],
  },
  "profile-2": {
    role: "Full Stack Developer Intern",
    summary: "During our internship, we added frontend and backend features to Obiyen's existing platform. We worked on quotations, documents, timesheets, password management and connected accounts. We also fixed access and usability issues, with each task using the correct client or agency records and staff permissions.",
    responsibilities: [
      {
        title: "Quotations and documents",
        description: "We built tools for preparing, pricing and sending quotations. Staff can produce PDFs and follow client approval. The system keeps each document linked to its status and records.",
      },
      {
        title: "Account and search integrations",
        description: "We worked on Facebook and Instagram account connections, Microsoft Azure AD sign-in and search tracking through SerpAPI and Google Ads. These connections support the platform's agency tools.",
      },
      {
        title: "Timesheet submission and review",
        description: "We built timesheet submission and manager approval. Staff receive review notifications, and managers cannot approve their own entries. Each timesheet follows a clear submission and review process.",
      },
      {
        title: "Password management",
        description: "We built password-management tools with personal and company vaults. Stored passwords are encrypted, and access levels control who can use shared vaults. We also worked on directory connections.",
      },
      {
        title: "Access and usability fixes",
        description: "We fixed issues with company data access and sign-in. We also worked on helpdesk settings, document accessibility, and English and Danish translations across the existing platform.",
      },
    ],
    capabilities: [
      {
        title: "Frontend and backend features",
        description: "Nuxt 3 and Vue run the interface. Laravel 12 APIs and Sanctum handle backend access within the platform's client and agency structure.",
      },
      {
        title: "OAuth and search data",
        description: "OAuth connections let users authorize social accounts. Google Ads and SerpAPI requests supply data for the platform's search visibility tools.",
      },
      {
        title: "Approval steps and status records",
        description: "Timesheets move from draft to submission and review. Quotations check staff roles and document ownership, and record changes in status.",
      },
      {
        title: "Password storage and vault access",
        description: "Laravel encrypts stored passwords. Vault access checks confirm personal ownership or active company membership, with access levels for shared vaults.",
      },
      {
        title: "Documents and notifications",
        description: "Quotation services calculate totals, create PDFs and send approval messages. Timesheet review actions also send notifications through dedicated backend jobs.",
      },
    ],
  },
  "profile-3": {
    role: "Full Stack Developer",
    summary: "We built the complete SPOS application, including its interface, API and business rules. It connects sales, purchasing, stock and store administration. Our work also covers cashier shifts, approval requests, reports, invoices and receipts, giving staff one application for related tasks during the store's daily operations.",
    responsibilities: [
      {
        title: "Sales and customer tools",
        description: "We built sales orders and customer records. Staff can select products, change orders, record payments and produce receipts. These tasks use the same order information.",
      },
      {
        title: "Purchasing and stock movement",
        description: "We built purchase orders, supplier billing, storage areas and stock transfers. Staff can manage incoming products and record stock moving between locations within the same application.",
      },
      {
        title: "Cashier controls and approvals",
        description: "We built cashier-shift tools and approval steps for actions that need review. The system connects staff activity to the current shift and keeps the related review records.",
      },
      {
        title: "Administration and reporting",
        description: "We built tools for staff roles, permissions, expenses, revenue and store reports. These give administrators a place to manage access and review the records behind daily operations.",
      },
    ],
    capabilities: [
      {
        title: "Next.js interface and Laravel API",
        description: "Next.js 16, React 19 and TypeScript run the interface. Laravel services handle store operations and check data sent through the API.",
      },
      {
        title: "API access checks",
        description: "Sanctum handles signed-in API access, with request limits and permission checks. Relevant sales actions also require an active cashier shift and suitable token permissions.",
      },
      {
        title: "Approval handling",
        description: "The backend checks that a request is pending and locks it during review. It saves related changes together, then sends notifications after success.",
      },
      {
        title: "Connected purchasing records",
        description: "Purchasing and stock transfers use linked product, supplier, quantity and storage records. Cashier services save related shift and cash-movement changes together.",
      },
      {
        title: "Operational documents and reports",
        description: "Sales tools produce invoice PDFs and receipts. The application also provides expense, revenue, purchasing and shift information for staff and administrators.",
      },
    ],
  },
  "profile-19": {
    role: "Website Developer & Mobile Contributor",
    summary: "We worked on CacaoCare as a thesis project. Our main responsibility was the farm-management website, alongside bug fixes in the Android application. The wider project combines web tools for farm information with mobile cacao disease checks. Our contribution focused on the website and existing mobile experience.",
    responsibilities: [
      {
        title: "Farm-management website",
        description: "We mainly developed the website for managing farm information. This gave the thesis project a web interface alongside the Android application used for disease checks.",
      },
      {
        title: "Mobile application fixes",
        description: "We fixed bugs in the existing Android application alongside our main work on the farm-management website.",
      },
      {
        title: "Web development and mobile fixes",
        description: "We contributed website development and mobile fixes. Our work supported farm-management tasks on the web and the existing mobile experience in the field.",
      },
    ],
    capabilities: [
      {
        title: "Web application tools",
        description: "The farm-management website uses Nuxt for its interface, with Laravel and MySQL supporting the web application's backend and records.",
      },
      {
        title: "Android contribution",
        description: "The mobile application uses Android Studio and Java. Our work focused on fixing bugs in the existing Android experience.",
      },
      {
        title: "Web and mobile farming tools",
        description: "The product supports farm-management tasks on the website and cacao disease checks on Android. Both form part of the same thesis project.",
      },
    ],
  },
  "profile-20": {
    role: "Full Stack Developer",
    summary: "We built the complete faculty scheduling application, including its interface and backend. Staff can prepare timetables, manage faculty workloads and check lecturer, room and class availability. We also built desktop access and printable reports so the scheduling information can support the administration team's daily work.",
    responsibilities: [
      {
        title: "Timetable preparation",
        description: "We built faculty and class scheduling tools. Academic calendars, subjects, lecturers, rooms and class groups are linked so administrators can use those records when preparing a timetable.",
      },
      {
        title: "Schedule conflict checks",
        description: "We built checks for lecturer, room and class availability. The application compares time choices with existing schedules to help administrators avoid assigning the same resource twice.",
      },
      {
        title: "Academic administration and reports",
        description: "We built tools for academic records and faculty workloads. Class and faculty reports use the timetable information, connecting schedule preparation to the documents staff need for administration.",
      },
      {
        title: "Desktop access and printed reports",
        description: "We built an Electron desktop version and printable timetable reports. Staff can work in a desktop window and print schedules to review or share on paper.",
      },
    ],
    capabilities: [
      {
        title: "Laravel and Inertia application",
        description: "Laravel 12 sends academic records to the React 19 interface through Inertia 2. Application routes require staff to sign in.",
      },
      {
        title: "Availability checks",
        description: "The backend checks overlapping lecturer, room and class assignments. A new scheduling batch also considers active and upcoming schedules.",
      },
      {
        title: "Electron desktop application",
        description: "Electron starts the local PHP application and opens it in a desktop window. Build scripts package the application for distribution.",
      },
      {
        title: "Printable administrative reports",
        description: "Staff can print faculty and class schedules from the selected timetable information. Report settings include the relevant academic details.",
      },
    ],
  },
  "legacy-faithseeker": {
    role: "Full Stack Developer",
    summary: "We designed and built FaithSeeker as a capstone project. It brings church administration, online service bookings and certificate preparation into one platform. Each subscribed church manages its own settings and member records. Bookings and document outputs use the information held by that church.",
    responsibilities: [
      {
        title: "Independent church administration",
        description: "We built a separate admin portal for each subscribed church. Churches manage their own service settings and member information while using the same shared platform.",
      },
      {
        title: "Service bookings and appointments",
        description: "We built online service booking and appointment scheduling. Each church sets its own availability, and booking confirmations connect requests from churchgoers to that church's services.",
      },
      {
        title: "Official document preparation",
        description: "We built tools that create baptism and marriage certificates from stored records. Church staff can produce ready-to-print PDFs using information already held in the system.",
      },
    ],
    capabilities: [
      {
        title: "Frontend and backend tools",
        description: "Next.js and React run the interface, styled with Tailwind CSS. A Laravel API and MySQL support the backend and records.",
      },
      {
        title: "Separate church workspaces",
        description: "Several churches use one platform. Each subscribed church has its own admin portal, service settings and member records to manage.",
      },
      {
        title: "Bookings and printable certificates",
        description: "Bookings use the chosen church's availability. Stored baptism and marriage information is also used to create its printable certificate PDFs.",
      },
    ],
  },
  "legacy-aidpoint": {
    role: "Backend Developer",
    summary: "We developed AidPoint's backend. It supports five role-based portals used to manage financial aid. Our work covers access, application status, approval steps and fund records. Audit logs help staff follow the decisions and fund movements linked to an aid application.",
    responsibilities: [
      {
        title: "Backend for five user roles",
        description: "We built the backend for Admin, Director, Caseworker, Finance Officer and Beneficiary portals. Each role uses the shared aid records through the part of the application intended for it.",
      },
      {
        title: "Approval steps for financial aid",
        description: "We built approval steps for reviewing applications and releasing aid. Staff roles define responsibilities across the process, connecting review decisions to the related financial actions.",
      },
      {
        title: "Allocation and liquidation tracking",
        description: "We built backend tools for allocation and liquidation records. Staff can track funds assigned to an application and the records showing how those funds were used.",
      },
      {
        title: "Audit and status information",
        description: "We added audit logs and application status data for the portals. These records help staff follow approval decisions and fund movement through the aid process.",
      },
    ],
    capabilities: [
      {
        title: "Laravel API and MySQL",
        description: "A Laravel API and MySQL manage the backend's financial aid records. The API supplies data to the project's React and Next.js portals.",
      },
      {
        title: "Roles and approval steps",
        description: "Five user roles and several approval steps organize access to application review, administration and aid payments within the platform.",
      },
      {
        title: "Traceable fund records",
        description: "Fund allocation and usage records sit alongside audit logs and application status. Staff can follow approvals and related fund movement.",
      },
    ],
  },
  "legacy-fa-babila-architects": {
    role: "Full Stack Developer",
    summary: "We are building the practice's portfolio website and content management system. The work brings projects, services, journal content and enquiries into one site. We are also building publishing tools and SEO settings so the practice can manage its public information.",
    responsibilities: [
      {
        title: "Architecture portfolio website",
        description: "We are building pages for the practice's projects and services. These bring its work into one website where prospective clients can learn about the studio and its offering.",
      },
      {
        title: "Custom content management",
        description: "We are building a Laravel and MySQL content management system for projects, services, team profiles and journal entries. The practice will use it to update its website content.",
      },
      {
        title: "Website enquiries and SEO",
        description: "We are adding a contact enquiry form and clear page information for search results. Public pages will include their text when they first load, making it readable for visitors and search tools.",
      },
      {
        title: "Consistent website design",
        description: "We are setting up shared brand colors, light and dark themes, and font pairings. These settings keep the website's pages consistent as more content is added.",
      },
    ],
    capabilities: [
      {
        title: "Nuxt and Laravel tools",
        description: "Nuxt 4, Vue 3 and TypeScript run the website interface. Laravel and MySQL support the backend, with Tailwind CSS and Nuxt UI for styling.",
      },
      {
        title: "Managed portfolio content",
        description: "The content management system is being built for projects, services, team profiles and journal entries. It will let the practice maintain these pages.",
      },
      {
        title: "SEO and search visibility",
        description: "We are preparing readable project and service pages for search engines and AI tools. The SEO goal is to compete for top positions in relevant architecture searches. Clear page descriptions also help people find the information they need.",
      },
      {
        title: "Shared visual settings",
        description: "Shared brand colors, light and dark themes, and adjustable font pairings give the website a consistent design across its pages.",
      },
    ],
  },
};
