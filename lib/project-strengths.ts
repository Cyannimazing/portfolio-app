type ClientCapability = { category: string; title: string; description: string };

// Product capabilities, not claims of sole authorship or measured results.
// Evidence: design-assets/project-capability-audit.json and
// design-assets/project-capability-evidence.md. Contributions remain separate.
export const projectStrengths: Record<number, ClientCapability[]> = {
  1: [
    { category: "Access", title: "One company workspace", description: "Keep application licenses, team invitations, and role permissions together, with access scoped to each company." },
    { category: "Operations", title: "Connected sales and stock", description: "Manage sales, suppliers, inventory, shifts, and approvals through the wholesale and retail POS." },
    { category: "Client workflows", title: "Outreach and bookings", description: "Keep prospect information, conversations, and booking workflows alongside the company's applications." },
  ],
  2: [
    { category: "Documents", title: "Quotes through approval", description: "Prepare quotations, produce PDF documents, and track their acceptance through the client workflow." },
    { category: "SEO tools", title: "Search visibility monitoring", description: "Agency tools connect search tracking and Google Ads data so teams can review clients' search visibility." },
    { category: "Team operations", title: "Connected agency workflows", description: "Bring timesheet approvals, helpdesk configuration, social accounts, and Microsoft sign-in into tenant-aware tools." },
  ],
  3: [
    { category: "Point of sale", title: "Daily store operations", description: "Connect sales orders, customers, purchasing, supplier billing, and stock transfers in one application." },
    { category: "Staff access", title: "Role-based controls", description: "Give staff appropriate access to store tools, including shifts and approval workflows." },
    { category: "Reporting", title: "Operational visibility", description: "Review revenue and expenses alongside the sales and inventory records behind them." },
  ],
  4: [
    { category: "Presentation", title: "Work clients can explore", description: "Browse real websites and application captures, then open a dedicated case study for the selected project." },
    { category: "SEO", title: "Shareable project pages", description: "Individual pages provide project titles, descriptions, canonical URLs, and social preview metadata." },
    { category: "Experience", title: "Responsive navigation", description: "Use the portfolio across desktop and mobile, with clear contact paths and reduced-motion support." },
  ],
  5: [
    { category: "Commerce", title: "From collection to checkout", description: "Browse jewelry, choose variants, and place orders through the Stripe payment flow, with promotional offers." },
    { category: "Administration", title: "Manage the store", description: "Maintain product presentation, orders, payments, reviews, and promotions through the admin tools." },
    { category: "SEO", title: "Product search foundations", description: "Product metadata, canonical URLs, and product and breadcrumb structured data describe individual pieces to search engines." },
  ],
  6: [
    { category: "Booking", title: "A connected reservation flow", description: "Choose a package and time, submit client details, sign an agreement, and pay a deposit or the full amount through Stripe." },
    { category: "CMS", title: "Content the studio controls", description: "Maintain website sections, packages, and business information through the studio's content and admin tools." },
    { category: "SEO", title: "Searchable studio content", description: "Location and article pages use dedicated metadata and structured data, with a sitemap covering published pages." },
  ],
  7: [
    { category: "Commerce", title: "Payments and promotions", description: "Connect the coffee, matcha, and tea catalog with Stripe checkout and promotional offers." },
    { category: "CMS", title: "Manage the shop and content", description: "Update products, store settings, reviews, and public page content from the administrative workspace." },
    { category: "SEO", title: "Descriptive product listings", description: "Product pages provide their own titles and descriptions, with structured data for price, availability, and published reviews." },
  ],
  8: [
    { category: "Automation", title: "AI support for bookkeeping", description: "Use client-specific instructions to categorize transactions, investigate duplicates, and match transfers, with recorded changes and decisions when needed." },
    { category: "Integrations", title: "Connected financial records", description: "Plaid integration brings bank activity into the accounting workspace, alongside statements, invoices, and client documents." },
    { category: "Client operations", title: "Information stays together", description: "Client workspaces organize financial records, and email intake can file matched messages and attachments into the relevant client." },
  ],
  9: [
    { category: "CMS", title: "Publish without code changes", description: "Maintain page sections, projects, articles, testimonials, and business settings through the built-in administration tools." },
    { category: "SEO", title: "Search-ready service pages", description: "Service and article pages use dedicated metadata, canonical URLs, and structured data alongside local service-area content." },
    { category: "Leads", title: "From enquiry to follow-up", description: "Contact forms collect prospective customers' requests, with lead-management tools supporting the business's follow-up." },
  ],
  10: [
    { category: "Estimates", title: "An initial quote online", description: "Give homeowners an instant estimate flow, with pricing information and controls maintained by the business." },
    { category: "CMS", title: "Control the public website", description: "Manage service content, project galleries, reviews, and business settings through the admin workspace." },
    { category: "SEO", title: "Page-specific search information", description: "Dedicated service and location pages provide descriptive titles and metadata for the business's offering and local coverage." },
  ],
  11: [
    { category: "SEO", title: "Local service discovery", description: "Location and article pages use metadata, canonical URLs, structured data, and sitemap entries to describe the site's content." },
    { category: "CMS", title: "Maintain business content", description: "Update public page sections and business information through the content administration tools." },
    { category: "Enquiries", title: "Clear contact paths", description: "Service information, reviews, and contact forms help property owners explore the offering and enquire about work." },
  ],
  12: [
    { category: "Commerce", title: "Products and payments", description: "Connect product browsing with orders, promotions, payment management, and customer records." },
    { category: "CMS", title: "Manage the storefront", description: "Maintain the public presentation and its page content through the site's CMS and administrative workflows." },
    { category: "SEO", title: "Search and sharing foundations", description: "Public pages include search metadata, canonical references, and structured data describing the business and content." },
  ],
  13: [
    { category: "Presentation", title: "Help homeowners plan", description: "Show completed homes, explain the building process, and provide resources and contact paths for a prospective project." },
    { category: "CMS", title: "Editable pages and metadata", description: "Published page sections and metadata are retrieved from the CMS, keeping the builder's content connected to its website." },
    { category: "SEO", title: "Local coverage in search", description: "Location content, page metadata, canonical URLs, and a sitemap describe the areas served by the custom-home builder." },
  ],
  14: [
    { category: "Brand", title: "One connected public profile", description: "Bring golfing, foundation, family, partnerships, and course-design work into a cohesive website." },
    { category: "CMS", title: "Content that stays manageable", description: "Public sections read from shared CMS content, so administrators can maintain the website's published information." },
    { category: "SEO", title: "Profile and page metadata", description: "Page-specific metadata, canonical URLs, social preview images, and profile structured data describe the career and public pages." },
  ],
  15: [
    { category: "SEO", title: "Local construction discovery", description: "Service-area pages use content-backed metadata, canonical URLs, local business structured data, and sitemap entries." },
    { category: "Services", title: "Explain the full offering", description: "Dedicated pages present custom homes, metal buildings, concrete, roofing, and other construction services." },
    { category: "Planning", title: "Paths to an enquiry", description: "Estimate interfaces, financing information, and contact paths support visitors planning a construction project." },
  ],
  16: [
    { category: "3D experience", title: "Explain products visually", description: "An interactive 3D flow introduces water-treatment solutions alongside filtration, softening, and testing information." },
    { category: "CMS", title: "Manage content and enquiries", description: "Maintain website content and incoming enquiries through the CMS and administrative tools." },
    { category: "Services", title: "A clear customer journey", description: "Product categories, solution pages, and contact paths help visitors explore the offering and request assistance." },
  ],
  17: [
    { category: "Estimates", title: "Initial pricing without a call", description: "The instant roof estimate flow combines property measurements and configurable pricing, with estimate snapshots and PDF output." },
    { category: "CMS", title: "Content and pricing control", description: "CMS content supplies page sections and estimator pricing, with admin tools for maintaining the public website." },
    { category: "SEO", title: "Service and resource discovery", description: "Service and resource pages include descriptive metadata, canonical references, structured data, and sitemap coverage." },
  ],
  19: [
    { category: "Mobile", title: "Disease detection in the field", description: "The Android application supports cacao disease checks as part of the connected thesis product." },
    { category: "Web platform", title: "Organized farm information", description: "Web farm-management tools give farmers and administrators a place to maintain farm records." },
    { category: "Connected tools", title: "Web and mobile workflows", description: "Use the Android app for disease checks and the web platform for managing information within the same farming project." },
  ],
  20: [
    { category: "Scheduling", title: "Check resource conflicts", description: "Availability checks account for lecturer, room, and class assignments when preparing a timetable." },
    { category: "Administration", title: "Connected academic records", description: "Manage class timetables and faculty schedules alongside the academic information needed for those assignments." },
    { category: "Delivery", title: "Desktop use and printed reports", description: "Access the application through its Electron desktop shell and print class and faculty reports for administrative use." },
  ],
  21: [
    { category: "Bookings", title: "A direct appointment path", description: "Treatment pages connect to the Boulevard booking widget, with a direct booking link available when the widget is unavailable." },
    { category: "CMS", title: "Content the spa can maintain", description: "Edit page sections and business settings, including opening hours that synchronize across contact information, policies, and the footer." },
    { category: "SEO & sharing", title: "Search and brand foundations", description: "Treatment metadata, local business structured data, a sitemap, favicons, and Open Graph imagery support discovery and consistent shared links." },
  ],
};
