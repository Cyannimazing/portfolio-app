import type { ServiceId } from "./service-categories";

type ServiceOffering = {
  id: ServiceId;
  summary: string;
  inclusions: string[];
  compactInclusions: string[];
  details: { title: string; description: string }[];
  examples: string[];
};

// Client-facing capabilities, supported by the source review in
// design-assets/project-capability-evidence.md. Project features stay in case studies.
export const serviceOfferings: ServiceOffering[] = [
  {
    id: "business-software",
    summary: "Custom applications built around how your business works.",
    inclusions: ["Custom internal tools & SaaS platforms", "Staff & client portals with permissions", "Forms, approvals & document workflows", "Scheduling & resource management", "Dashboards & custom reports"],
    compactInclusions: ["Custom tools & SaaS apps", "Staff & client portals", "Forms & approvals", "Schedules & resources", "Dashboards & reports"],
    details: [
      { title: "Software around your workflow", description: "We build internal tools and business platforms around your processes, so your team can manage its work in one place." },
      { title: "Staff and client portals", description: "Give staff and customers their own workspace, with access to the records and actions relevant to them." },
      { title: "Forms, approvals and documents", description: "Handle requests, review steps, timesheets, quotations, and documents without passing everything between separate spreadsheets." },
      { title: "Scheduling and resource planning", description: "Organize people, times, rooms, and other resources, with availability and conflict checks where the workflow needs them." },
      { title: "Dashboards and reports", description: "Bring your records into useful dashboards, searches, and reports so your team can follow progress and make informed decisions." },
    ],
    examples: ["A staff or client portal", "An approval and document system", "A scheduling application", "A sales and inventory system"],
  },
  {
    id: "websites",
    summary: "Help customers understand your business, trust it, and get in touch.",
    inclusions: ["Business pages that explain your services", "Lead Capturing", "SEO for Google & AI search", "Google reviews to build customer trust", "Meta ad conversion tracking"],
    compactInclusions: ["Clear business pages", "Lead Capturing", "Google & AI search SEO", "Show Google reviews", "Meta ad conversions"],
    details: [
      { title: "Explain what you offer", description: "Clear business, service, and location pages, with project galleries and contact paths that help visitors decide whether your business meets their needs." },
      { title: "Lead capturing", description: "Collect customer enquiries through contact and quote-request forms, with the details your team needs to follow up." },
      { title: "SEO for Google and AI search", description: "Clear content, crawlable links, page metadata, sitemaps, and structured business information help search engines discover and understand your pages. These are also the foundations used by Google's AI search features." },
      { title: "Show Google reviews", description: "Bring real customer reviews onto your website so visitors can see feedback about your business before making an enquiry." },
      { title: "Measure Meta ad conversions", description: "Connect enquiry or purchase events to Meta's conversion tracking so you can measure customer actions beyond ad clicks." },
    ],
    examples: ["A local business website", "A service and enquiry website", "An online storefront"],
  },
  {
    id: "cms",
    summary: "Keep your website up to date without waiting for every change to be coded.",
    inclusions: ["Edit page text, images & service details", "Publish articles, FAQs & project galleries", "Manage products, prices & business details", "Manage page & article SEO settings"],
    compactInclusions: ["Edit pages & images", "Publish articles & FAQs", "Manage products & details", "Page & article SEO settings"],
    details: [
      { title: "Update your pages yourself", description: "Change headlines, page text, images, and service information from an admin dashboard when your business needs an update." },
      { title: "Publish useful content", description: "Add and update articles, FAQs, testimonials, and project galleries to keep customers informed and show your work." },
      { title: "Manage products and business details", description: "Update product information, photos, prices, availability, contact information, and other details displayed on the website." },
      { title: "Control SEO settings", description: "Edit page titles and meta descriptions, plus the search description for an article. The public pages use these saved settings in their search metadata." },
    ],
    examples: ["Replace a homepage headline and image", "Publish a new article or completed project", "Update a product's price and availability", "Update a page's SEO settings"],
  },
  {
    id: "booking",
    summary: "Let customers book and pay online, with records your team can manage.",
    inclusions: ["Services, packages & available times", "Customer details & booking agreements", "Deposits, payments & confirmations", "Booking records & admin controls"],
    compactInclusions: ["Services & available times", "Details & agreements", "Payments & confirmations", "Booking admin controls"],
    details: [
      { title: "Let customers choose and book", description: "Present your services or packages, collect the customer's details, and guide them through date and time selection." },
      { title: "Handle agreements and payments", description: "Connect booking agreements, signatures, deposits, or full payment with the reservation flow." },
      { title: "Confirm and manage reservations", description: "Give the customer a clear confirmation and your team access to booking records and package settings." },
      { title: "Improve an existing booking system", description: "We can investigate and fix issues in the booking, payment, or confirmation steps of the system you already use." },
    ],
    examples: ["Studio or space reservations", "Service appointments", "A booking flow with a deposit"],
  },
  {
    id: "mobile-apps",
    summary: "Improve your Android app and the business tools connected to it.",
    inclusions: ["Mobile screens & interaction improvements", "Connected records & admin tools", "Fixes for existing application issues"],
    compactInclusions: ["Improve mobile screens", "Connect business records", "Fix application issues"],
    details: [
      { title: "Improve the mobile experience", description: "Refine Android screens and interactions so people can use the application more easily." },
      { title: "Connect the app to your records", description: "Build or improve the web and admin tools that support the mobile application's business data." },
      { title: "Repair existing issues", description: "Investigate reported problems and fix the affected behavior in the app." },
      { title: "Extend the existing application", description: "Improve features within the app's current structure and the systems it already connects to." },
    ],
    examples: ["An existing Android app", "A mobile app with a web admin workspace"],
  },
  {
    id: "automation",
    summary: "Connect your systems and reduce repetitive work with custom automation.",
    inclusions: ["Connect your business tools & data", "Automate forms, approvals & documents", "Send updates, notifications & reminders", "Add AI assistance to routine workflows"],
    compactInclusions: ["Connect tools & data", "Forms & approvals", "Updates & reminders", "AI-assisted workflows"],
    details: [
      { title: "Connect the tools you use", description: "We connect applications and accounts so information can move between systems instead of being copied by hand." },
      { title: "Automate repeated steps", description: "Turn repeated form, approval, and document tasks into a connected workflow that follows your business rules." },
      { title: "Keep people informed", description: "Send updates, notifications, or reminders when the relevant event happens in your application." },
      { title: "Add AI where it helps", description: "Build AI assistance into routine tasks such as working with records or documents, with review and permissions suited to your team." },
      { title: "Custom automation in your application", description: "We code the workflow into your software and connect the services it needs, with controls for your team to review and manage the work." },
    ],
    examples: ["Move data between business systems", "Generate documents from submitted forms", "Notify staff when a request needs approval", "Assist the team with repetitive document work"],
  },
  {
    id: "support",
    summary: "Keep improving the website or application your business already uses.",
    inclusions: ["Fix broken forms & application flows", "Improve layouts & everyday usability", "Add and refine existing features", "Resolve issues in connected services"],
    compactInclusions: ["Repair broken workflows", "Improve everyday usability", "Add or refine features", "Fix connected services"],
    details: [
      { title: "Fix what is getting in the way", description: "Reproduce and repair problems in forms, booking flows, admin screens, and other application features." },
      { title: "Make the interface easier to use", description: "Improve layouts and interactions across customer pages and internal tools." },
      { title: "Keep the product moving forward", description: "Add or refine features as your business and its requirements change." },
      { title: "Repair connected workflows", description: "Investigate issues where your application connects to payments, accounts, or other services." },
    ],
    examples: ["A form that stops working", "An admin workflow that needs improvement", "A new feature in an existing app"],
  },
];
