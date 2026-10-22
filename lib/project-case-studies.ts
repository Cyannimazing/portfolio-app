export type ProjectCaseStudyContent = {
  challenge: string;
  solution: string;
  rationale: string;
};

// Based on the saved profile, confirmed contributions and project evidence.
// These explanations describe the work and its purpose without claiming measured results.
// Product descriptions stay neutral where personal ownership is not confirmed.
export const projectCaseStudies: Record<number, ProjectCaseStudyContent> = {
  21: {
    challenge: "Beautiful & Blessed Esthetics needed its existing website to show the same spa branding in browser tabs and shared links. The work focused on the small browser icon, the image shown when someone shares a link, and the business details displayed with that image.",
    solution: "We updated the favicons, which are the small icons shown in browser tabs. We also updated the Open Graph images and link details so supported messaging and social platforms can show the spa's branding when someone shares its website.",
    rationale: "People may first see the spa in a shared message or return to it through an open browser tab. Using the same branding in these places helps them recognize the business and gives its shared links a clear, professional appearance.",
  },
  1: {
    challenge: "Cynergy needed one platform where businesses could choose applications, invite staff and manage daily work. Sales, stock and client outreach needed to work together. Each company also needed control over its own records and which tools its staff could use.",
    solution: "We built a workspace for each company with application access, team invitations and staff roles. The business tools cover sales, stock, suppliers, approvals, reports and outreach bookings. Access checks use the person's company, role and assigned applications to decide which tools and records they can use.",
    rationale: "Sales, stock and customer follow-up are parts of the same business. Bringing them into one workspace gives staff a familiar place to work. Company and role checks keep access tied to the right business and the responsibilities of each team member.",
  },
  8: {
    challenge: "River Taxes needed AI help with routine bookkeeping, better admin screens and tools for updating website content. The AI needed to use the right client's records and the firm's instructions. Staff also needed a record of its changes and a way to review accounting decisions.",
    solution: "We added AI assistance and improved admin and content tools in the existing platform. The AI uses bookkeeping tools for a specific client's records. It can follow saved instructions, record changes and ask staff for decisions when reviewing transactions or differences in the accounts.",
    rationale: "Bookkeeping work needs the right records and a clear explanation of what changed. Keeping the AI's tools tied to a client helps it work with the intended information. Recorded changes and staff review let the team check its work and stay involved in accounting decisions.",
  },
  3: {
    challenge: "The business needed SPOS to bring sales, purchasing and stock management into one point-of-sale application. Managers also needed cashier shifts, approval steps, expense records and revenue reports. These tools had to support the store's daily work using related records in the same system.",
    solution: "We built the full application with connected sales, purchases, stock records and supplier information. Cashier shifts and approval steps control relevant store actions. Admin screens and reports let managers review expenses and revenue alongside the records behind those figures.",
    rationale: "Selling products, buying stock and moving inventory affect the same store records. Keeping these tasks together helps staff work from the same information. Shift records and approval steps also show who handled important actions and which decisions need a manager's review.",
  },
  4: {
    challenge: "I needed a professional portfolio to show my projects, explain my work and present the services I offer. Clients and recruiters needed clear project information, useful previews and a simple way to get in touch. The site also needed to work across screen sizes.",
    solution: "We built the portfolio with real website previews, application screenshots and separate case studies. Visitors can browse work by service and read what we contributed to each project. Shared navigation, contact options and reduced-motion support help people use the site on different devices.",
    rationale: "A real preview shows what a project looks like. The case study explains the client's needs, the work and the reasons behind it. Linking this information to services and contact options helps visitors decide whether the experience fits their own project.",
  },
  5: {
    challenge: "Viviour needed improvements to its existing jewelry shop, including design changes, payments and sales tracking. The work had to cover both the pages shoppers use and the server features behind orders. Browsing, product choices and checkout needed to keep working together after each change.",
    solution: "We improved the existing design, fixed problems in the shop and server code, and connected payment and sales-tracking features. We checked the website across the buying process, from browsing jewelry and choosing options to placing an order.",
    rationale: "A purchase involves several steps. A change to product options or payments can affect the steps around it. Working across the shop and its server features, then checking the full buying process, helps keep those steps consistent with the business's existing store.",
  },
  6: {
    challenge: "Martich Studios needed repairs to its existing booking system and improvements to its content and admin tools. The studio needed customers to move through the reservation steps, while staff maintained service information and packages. The work also included problems in the design and website behavior.",
    solution: "We helped repair the booking system and improve the CMS and admin features. We also fixed design and functional problems across the existing site. The work covered the reservation steps and the tools staff use to update the studio's public information.",
    rationale: "Booking details, packages, agreements and payment steps need to work together. Staff also need the published service information to match what customers can book. Improving both the booking process and content tools supports these related tasks within the studio's existing website.",
  },
  7: {
    challenge: "Ferma Coffee Co needed more features in its existing online shop, including product management, content editing, payments and promotions. The team needed to maintain its coffee, matcha and tea products. Customers needed clear product pages and a buying process that matched the prices and offers shown.",
    solution: "We extended the shop and admin tools, worked on the CMS, and connected payments and promotions. We also improved the interface and fixed bugs. The changes linked product management and website content with the steps customers use to browse and order.",
    rationale: "Product details, prices and offers need to stay consistent from the product page to checkout. Bringing content editing, shop management and payment work together helps the business maintain those details and gives customers a clear path to place an order.",
  },
  9: {
    challenge: "Lowrie Roofing needed a professional website to show its services and completed projects. The team also needed tools to publish projects and articles, update business information and manage enquiries. Customer messages had to reach the admin tools so the business could review them and follow up.",
    solution: "We built the lead, project, article, admin and CMS features. Published projects and articles connect to editing tools, while customer enquiries connect to lead management. This gives the business ways to update its website and handle the requests it receives.",
    rationale: "Completed projects and useful articles help customers learn about the business before getting in touch. The team then needs to keep that information current and respond to enquiries. Connecting publishing and lead management supports both the public website and the work behind it.",
  },
  10: {
    challenge: "Masterbuilt Roofing needed an instant roofing estimator and improvements to its existing website and admin tools. The team needed to update services and projects, change pricing as its rates changed, and manage the multipliers used in estimates through the admin panel.",
    solution: "We added the instant estimator and admin controls for material prices, old-roof removal costs, roof-pitch factors and building-type multipliers. We also worked on the design and CMS. The business can change these pricing settings in its admin panel, and the estimator uses the saved values.",
    rationale: "An instant estimate gives customers an early idea of project costs before they enquire. Admin pricing controls let the business adjust the calculation when its rates change, without editing code for each price update. Content tools also help the team keep service and project information current.",
  },
  11: {
    challenge: "Northforge Exteriors needed a website that clearly explained its exterior services and the areas it covers. The business needed to update its own content and give customers a way to ask about work. Visitors needed to find the right service and check whether it was available in their area.",
    solution: "The website has separate service and location pages, along with articles and contact forms. Admin tools let the team update public information. Search settings and a sitemap help search engines read the published pages and understand the business's services and coverage.",
    rationale: "Customers usually need to know what work a business offers and whether it serves their location. Separate service and area pages answer those questions directly. Articles and contact options help visitors take the next step, while editing tools let the team keep the information current.",
  },
  12: {
    challenge: "Luxury Leather Restoration needed one website for its restoration services and online shop. The business also needed tools for product information, orders, customer records, promotions and payments. Staff needed to manage those tasks while keeping public website content up to date.",
    solution: "The website combines restoration information and product shopping with admin tools for running the store. Product pages lead into ordering and payment. The team can manage customer records and promotions, and use the CMS to update the information customers read on the website.",
    rationale: "The information customers see needs to match the products and offers the business manages. Keeping website editing and store administration together gives the team a way to maintain public content and handle the orders, payments and customer records behind each purchase.",
  },
  13: {
    challenge: "Kevin Travis Homes needed improvements to its existing website's design, features and CMS. The business needed to present completed homes, explain its building process and show the areas it serves. The team also needed working content tools and a clear way for visitors to ask about a project.",
    solution: "We improved the design and fixed website and CMS problems. The work supported the pages used to explore completed homes and plan a building project. We also worked on the tools the business uses to maintain those pages.",
    rationale: "People planning a home need examples of past work, information about the building process and a way to contact the builder. Improving these pages and their editing tools helps the business maintain a useful website while keeping its existing content and site structure.",
  },
  14: {
    challenge: "Sergio Garcia needed a website redesign that brought his playing career, foundation, partnerships and course-design work together. Each part of his public profile needed a clear place on the site. The team also needed tools to update the content and control how pages appear in search and shared links.",
    solution: "We redesigned the website with separate sections for his career, foundation and professional partnerships. CMS work lets the team manage these sections. Page settings describe each section for search engines and shared links, while the design keeps the website consistent throughout.",
    rationale: "His career, foundation and partnerships have different information to share. Giving each a clear section helps visitors find what interests them. A shared design keeps the site recognizable, and content tools let the team update the public profile as its information changes.",
  },
  15: {
    challenge: "TMBTX needed a construction website that explained its metal-building, concrete, roofing and custom-home services. The business also needed to show its local coverage and provide project-planning information. Estimates and contact options needed to help visitors ask about work relevant to their location and plans.",
    solution: "The website gives each construction service its own page and includes pages for the areas served. Estimate tools, financing information and articles help visitors plan a project. Contact options give people a way to discuss their requirements with the business.",
    rationale: "Construction customers need to find the right type of work and check where it is available. Service and area pages make those answers easier to find. Planning information and estimate tools then help visitors prepare a more informed enquiry about their own project.",
  },
  16: {
    challenge: "WUDR needed a website that clearly explained its water-treatment products using an interactive 3D presentation and written information. The business also needed content and enquiry tools. The site had to connect information about filtration, softening and testing with a way for interested visitors to contact the team.",
    solution: "We built an interactive 3D presentation and worked on the surrounding design and lead features. Product information explains the water-treatment options. CMS and admin tools support website updates and the management of enquiries from people who want to discuss a solution.",
    rationale: "A visual presentation helps introduce how the products work. Written product information gives visitors more detail, and enquiry options help them discuss their needs. Editing and lead-management tools support the business in maintaining the website and handling the interest it receives.",
  },
  17: {
    challenge: "Zenergy Solar needed instant estimates based on property details, along with pricing and content the team could update. The business also needed to check suspicious or fake contact details before passing enquiries to its normal follow-up process. The work included CAPTCHA, AI-assisted checks, design changes and bug fixes.",
    solution: "We added instant estimates using property details, editable pricing, saved results and proposal PDFs. We also added a CAPTCHA check verified by the server. Contact-data rules look for warning signs, and AI reviews uncertain submissions. An enquiry can be accepted, passed to the team with a warning or rejected before it is forwarded.",
    rationale: "Property details and saved estimates give the team useful information for follow-up. Admin pricing controls keep the calculations adjustable. CAPTCHA checks and lead screening help the business handle suspicious submissions. AI reviews uncertain cases, and flagged enquiries can still reach staff for review instead of being discarded automatically.",
  },
  2: {
    challenge: "Obiyen needed improvements to its existing agency platform, covering quotations, documents, timesheet approvals, account connections and admin tools. Each agency needed its staff and records to stay within the right workspace. Sign-in, helpdesk settings and interface fixes also needed to support the people using those tools.",
    solution: "During our internship, we worked on the website screens and server features for quotations, PDF documents, timesheet approvals and connected accounts. We also improved helpdesk settings, sign-in, translations and checks that keep actions tied to the right agency workspace.",
    rationale: "Quotes, approvals and connected accounts belong to specific agencies and users. Workspace and access checks help keep actions tied to the right records. Working on both the screens and server features connects what staff do in the interface with the permissions and information behind it.",
  },
  19: {
    challenge: "The CacaoCare thesis project needed a farm-management website to work alongside its Android disease-checking app. The work also included fixes in the mobile app. The website work focused on giving farmers and administrators tools for farm records and management.",
    solution: "We mainly developed the farm-management website and fixed bugs in the Android app. The website provides tools for organizing farm records and management tasks. The mobile work addressed problems in the existing app.",
    rationale: "A mobile app can support disease checks in the field. A website gives farmers and administrators more space to organize farm information. Supporting both parts lets the project cover the immediate check and the ongoing work of managing farm records.",
  },
  20: {
    challenge: "The academic administration team needed tools to prepare class timetables and faculty workloads. The application needed to check lecturer, room and class conflicts and keep related academic records together. Staff also needed desktop access and printable reports for their daily administration work.",
    solution: "We built the full application for timetable and faculty-workload management. Availability and conflict checks support lecturer, room and class assignments. Academic records provide the information needed for scheduling, while desktop access and printable reports let staff use and share the resulting schedules.",
    rationale: "A timetable needs to account for the lecturer, room and class involved in each assignment. Checking those resources during scheduling helps staff spot conflicts as they work. Keeping records and reports in the same application connects timetable preparation with the administration tasks that follow.",
  },
};
