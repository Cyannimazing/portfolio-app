import { profileProjects } from "@/lib/profile-projects";

export type PortfolioProject = (typeof profileProjects)[number];
type ProductStory = {
  summary: string;
  overview: string;
  audience: string;
  features: { title: string; description: string }[];
  liveUrl?: string;
};

// Product capabilities come from the saved profile and read-only source audit.
// These describe the product; personal ownership is shown separately using
// the user's confirmed contribution. No results or team sizes are inferred.
export const projectStories: Record<number, ProductStory> = {
  21: {
    summary: "An esthetics website connecting treatment information, appointment booking, and editable content.",
    overview: "Beautiful & Blessed Esthetics presents the spa's treatments, team, testimonials, and business information. Visitors can start an appointment through its Boulevard booking integration or send an enquiry. CMS tools manage page sections and site settings. Service metadata, a sitemap, and local business structured data describe the offering to search engines, while Open Graph imagery supports shared-link previews.",
    audience: "Prospective spa clients and the spa team",
    features: [
      { title: "Appointment booking", description: "Start a booking through the Boulevard widget, with a direct booking link available as a fallback." },
      { title: "Editable spa content", description: "Maintain treatment information, page sections, business details, and opening hours through the CMS." },
      { title: "Search and sharing", description: "Service metadata, local business structured data, a sitemap, and Open Graph images support search and shared links." },
    ],
  },
  1: {
    summary: "One workspace for business applications, team access, sales, and stock.",
    overview: "Cynergy brings company operations into a shared SaaS workspace. Companies manage access to licensed applications, invite their teams, and assign permissions. Its wholesale and retail POS workflows connect sales, inventory, suppliers, cashier shifts, approvals, and reporting, alongside Client Outreach profiles and booking workflows.",
    audience: "Business owners, administrators, and store teams",
    liveUrl: "https://cynergy.cloud",
    features: [
      { title: "Application licensing", description: "License business applications and manage team invitations, roles, and permissions for each company." },
      { title: "Wholesale and retail POS", description: "Connect sales to inventory and supplier records, with cashier shifts, approvals, and reports." },
      { title: "Client Outreach and bookings", description: "Manage Client Outreach profiles and their booking workflows alongside the company's business applications." },
    ],
  },
  2: {
    summary: "Connected agency workflows, from quotations and timesheets to authentication and support.",
    overview: "Obiyen connects agency operations in an enterprise SaaS platform. Teams prepare quotations and PDF documents, review timesheets, and manage helpdesk settings within their tenant. Social account connections and Microsoft authentication support access to these workflows, while translations support the platform's interface.",
    audience: "Agencies, administrators, and their employees",
    liveUrl: "https://app.obiyen.com",
    features: [
      { title: "Client documents", description: "Quotation workflows and PDF documents for client-facing business processes." },
      { title: "Team workflows", description: "Timesheet approvals, helpdesk settings, and a multilingual interface within each tenant." },
      { title: "Connected accounts", description: "Facebook and Instagram OAuth, password management, and Azure AD authentication." },
    ],
  },
  3: {
    summary: "A point-of-sale application connecting transactions, stock, purchases, and reporting.",
    overview: "SPOS supports the day-to-day work of a retail business. Staff manage sales orders, customers, products, and supplier billing, while purchase orders and stock transfers connect purchasing with inventory. Cashier shifts, approvals, expenses, and revenue reports give the store team oversight of daily operations.",
    audience: "Store owners, cashiers, and inventory staff",
    features: [
      { title: "Sales workspace", description: "Sales orders, product records, and customer information in one application." },
      { title: "Stock and purchasing", description: "Supplier billing, purchase orders, and transfers between stock locations." },
      { title: "Operational oversight", description: "Cashier shifts, approvals, expense records, and revenue reports." },
    ],
  },
  4: {
    summary: "A personal portfolio connecting project evidence, services, and contact information.",
    overview: "This portfolio gives prospective clients a way to explore the work behind the services I offer. It combines project presentations, work history, service information, and contact details with interactive visual elements. Visitors can browse projects by service, inspect each product and my contribution, and start a conversation about their own project.",
    audience: "Prospective clients, collaborators, and recruiters",
    features: [
      { title: "Project evidence", description: "Project presentations and case studies showing products and contributions." },
      { title: "Services and experience", description: "Service information, work history, and the tools behind the work." },
      { title: "Contact paths", description: "Contact information and a discovery-call path for starting a conversation." },
    ],
  },
  5: {
    summary: "A jewelry shop for exploring collections, choosing product variants, and ordering online.",
    overview: "Viviour lets customers browse jewelry collections, inspect product galleries and reviews, choose variants, and save items to a wishlist. Stripe supports checkout and promotions. Store administrators manage products, orders, payments, reviews, and promotional offers through a connected workspace.",
    audience: "Jewelry customers and store administrators",
    features: [
      { title: "Jewelry catalog", description: "Browse collections, product galleries, variants, customer reviews, and wishlists." },
      { title: "Online checkout", description: "Place orders and pay through Stripe, with promotional offers available at checkout." },
      { title: "Store administration", description: "Manage products, orders, payments, reviews, and promotions in the admin workspace." },
    ],
  },
  6: {
    summary: "Studio services, bookings, and content management in a connected website.",
    overview: "Martich Studios helps clients explore studio spaces and services, choose packages, and book studio time. The booking flow collects client details, agreements, and deposits. Membership, event, and portfolio pages showcase the studio's offering, with CMS and admin tools for managing its published content.",
    audience: "Studio clients and the studio team",
    features: [
      { title: "Studio bookings", description: "Choose studio time and a package, submit booking details, and complete agreements and deposits." },
      { title: "Packages and memberships", description: "Explore studio services, memberships, events, and portfolio work." },
      { title: "Content publishing", description: "Update the studio's website content through CMS and admin tools." },
    ],
  },
  7: {
    summary: "A coffee, matcha, and tea storefront with connected payments and promotions.",
    overview: "Ferma Coffee Co connects a coffee, matcha, and tea shop with the tools used to manage it. Customers browse products through the storefront, with Stripe supporting payments and promotions. Admin and CMS workflows provide the business with product-shop functionality and control over its website content.",
    audience: "Coffee customers and store administrators",
    features: [
      { title: "Coffee, matcha, and tea", description: "Browse product categories and individual products through the online shop." },
      { title: "Checkout and promotions", description: "Order online, pay through Stripe, and apply promotional offers." },
      { title: "Shop management", description: "Manage products, orders, payments, reviews, and website content from the admin workspace." },
    ],
  },
  8: {
    summary: "AI-assisted bookkeeping for reviewing client records and handling routine accounting work.",
    overview: "River Taxes gives accountants a workspace for each client's books, transactions, statements, invoices, and documents. Its Client AI employee accepts plain-language requests to categorize transactions, find duplicates, match transfers, and investigate accounting discrepancies. It remembers client-specific answers and firm rules, records its changes, and asks for decisions when needed. Client emails and attachments can be filed into the relevant client's records.",
    audience: "Accountants, bookkeeping teams, and their clients",
    features: [
      { title: "Client AI employee", description: "Ask the AI to categorize transactions, find duplicates, match transfers, and review a client's books. Changes are recorded, and client answers are remembered." },
      { title: "Financial records", description: "Review transactions, reconcile statements, and manage invoices and accounting records in each client's workspace." },
      { title: "Documents and client emails", description: "Keep client documents together and file matched emails and attachments into the appropriate client's records." },
    ],
  },
  9: {
    summary: "A roofing website connecting service information, project content, and customer enquiries.",
    overview: "Lowrie Roofing helps prospective customers explore the company's services, locations, completed projects, and articles. Contact forms provide an enquiry path, with lead-management functionality supporting incoming requests. Admin and CMS tools let the business maintain the project and article content behind its public website.",
    audience: "Homeowners and the roofing business team",
    features: [
      { title: "Business presentation", description: "Roofing services, location pages, and project information." },
      { title: "Publishing tools", description: "Admin and CMS workflows for projects and articles." },
      { title: "Customer enquiries", description: "Contact forms and lead-management functionality." },
    ],
  },
  10: {
    summary: "Roofing services and instant estimates, supported by admin and content tools.",
    overview: "Masterbuilt Roofing combines service information, project galleries, reviews, and local coverage with an instant estimate experience. Pricing guides help visitors understand the offering, while admin pricing controls support the estimate interface. CMS and admin features provide the business with tools to manage the website's content.",
    audience: "Homeowners and roofing administrators",
    features: [
      { title: "Service information", description: "Service areas, project galleries, reviews, and pricing guides." },
      { title: "Estimate interface", description: "An instant estimate experience with admin pricing controls." },
      { title: "Content operations", description: "CMS and admin features supporting the business website." },
    ],
  },
  11: {
    summary: "An exterior-services website with local information and manageable content.",
    overview: "Northforge Exteriors helps property owners explore exterior services, check local coverage, and read customer reviews and articles. Contact forms let visitors enquire about work. Administrators maintain the public website through its content settings.",
    audience: "Property owners and exterior-services administrators",
    features: [
      { title: "Services and locations", description: "Service pages and location information for prospective customers." },
      { title: "Reviews and articles", description: "Customer-facing review and article content." },
      { title: "Enquiries and content", description: "Contact forms and admin content settings." },
    ],
  },
  12: {
    summary: "A leather-restoration website with commerce and administrative workflows.",
    overview: "Luxury Leather Restoration combines a public restoration website with commerce and administration. The platform connects product information with orders, customer records, promotions, and payment management. CMS-backed content supports the public presentation, while administrative workflows support the business behind the customer experience.",
    audience: "Restoration customers and store administrators",
    features: [
      { title: "Products and orders", description: "Commerce workflows for product information and order management." },
      { title: "Customer administration", description: "Customer records and promotion management." },
      { title: "Payments and content", description: "Payment management and CMS-backed website content." },
    ],
  },
  13: {
    summary: "A custom-home website for exploring completed homes, the building process, and local service areas.",
    overview: "Kevin Travis Homes helps prospective homeowners explore custom home projects and the areas the company serves. Building-process information and resources explain how to plan a home, while contact pages provide a path to discuss a project with the builder. CMS-backed content keeps the public website manageable for the business.",
    audience: "Prospective homeowners and the home-builder team",
    features: [
      { title: "Homes and locations", description: "Project presentation and information about the areas served." },
      { title: "Building information", description: "Building-process pages and resources for planning a custom home." },
      { title: "Project enquiries", description: "Contact forms connect prospective homeowners with the builder." },
    ],
  },
  14: {
    summary: "A professional golfer's website bringing his career, foundation, and partnerships together.",
    overview: "Sergio Garcia's website brings his golfing career, foundation, family, brand partnerships, and course-design work into one public profile. Fans and partners can explore each part of his work, while content administrators maintain the published pages through a shared CMS.",
    audience: "Golf fans, partners, and content administrators",
    features: [
      { title: "Public profile", description: "Explore his golfing career, family, and foundation through dedicated sections." },
      { title: "Professional work", description: "Brand ambassador and course-designer sections." },
      { title: "Content publishing", description: "Update public pages and their information through a shared CMS." },
    ],
  },
  15: {
    summary: "A construction website presenting services, estimates, and project information.",
    overview: "TMBTX helps property owners explore metal-building, concrete, roofing, and custom-home services and check local coverage. Estimate interfaces, articles, and financing information support visitors planning a construction project.",
    audience: "Property owners and prospective construction clients",
    features: [
      { title: "Construction services", description: "Metal buildings, concrete, roofing, and custom-home information." },
      { title: "Local coverage", description: "Service-area pages and articles." },
      { title: "Planning information", description: "Estimate interfaces and financing information." },
    ],
  },
  16: {
    summary: "Water-treatment products presented through an interactive 3D experience.",
    overview: "WUDR presents water filtration and softening solutions through an interactive 3D experience. Product categories, water-testing information, and service pages help visitors explore the offering. Contact and lead features connect enquiries with the business, while CMS and admin tools support the website's content.",
    audience: "Water-treatment customers and the business team",
    features: [
      { title: "Interactive presentation", description: "Explore water-treatment products through an interactive 3D experience." },
      { title: "Product information", description: "Filtration, softening, water-testing, and service content." },
      { title: "Enquiries and content", description: "Send product enquiries and manage incoming leads and published website content through the admin tools." },
    ],
  },
  17: {
    summary: "A solar and home-energy website with instant estimates for prospective customers.",
    overview: "Zenergy Solar helps homeowners explore solar and home-energy services and request an instant estimate. Service information and resources explain the offering, while enquiry paths connect prospective customers with the business. CMS tools let administrators maintain the website's content.",
    audience: "Homeowners and home-energy administrators",
    features: [
      { title: "Instant estimates", description: "Get an initial estimate through the website's interactive estimate flow." },
      { title: "Energy service information", description: "Explore solar and home-energy services and supporting resources." },
      { title: "Content management", description: "Maintain service information and website content through the CMS." },
    ],
  },
  19: {
    summary: "Cacao disease detection on mobile, connected with web farm management.",
    overview: "CacaoCare connects a cacao disease-detection mobile application with a web platform for farm management. Farmers use the mobile and web experiences as parts of the same project, with website functionality for farm records and management workflows. The product was developed as a two-person thesis project.",
    audience: "Cacao farmers and farm administrators",
    liveUrl: "https://cacao-care.nuxt.dev/",
    features: [
      { title: "Disease detection", description: "Use the mobile application to identify cacao disease." },
      { title: "Farm records", description: "Organize farm information and management workflows through the web platform." },
      { title: "Web and mobile access", description: "Access the project's farm tools through its website and Android application." },
    ],
  },
  20: {
    summary: "An academic scheduling application for timetables and faculty workloads.",
    overview: "Faculty Scheduling helps academic administrators organize faculty schedules, class timetables, and academic records. Availability and conflict checks support lecturer, room, and class assignments. Staff can use the desktop application and print class and faculty reports for administrative use.",
    audience: "Academic administrators and faculty",
    features: [
      { title: "Academic scheduling", description: "Faculty schedules, class timetables, and academic data management." },
      { title: "Availability checks", description: "Lecturer, room, and class availability and conflict checks." },
      { title: "Desktop access and reports", description: "Use the desktop application and print class and faculty reports." },
    ],
  },
};

export function getProjectPath(project: PortfolioProject) {
  return `/works/${project.slug}`;
}

export function getProjectLiveUrl(project: PortfolioProject) {
  return projectStories[project.id].liveUrl ?? (project.href.startsWith("http") ? project.href : undefined);
}
