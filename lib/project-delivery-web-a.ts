import type { ProjectDelivery } from "./project-delivery-types";

export const projectDeliveryWebA: Record<string, ProjectDelivery> = {
  "profile-5": {
    role: "Full Stack Developer",
    summary: "We improved Viviour's existing jewelry shop, from the page design to checkout and the work behind an order. We connected payment and shopping tracking features, fixed problems across the site, and checked that customers could browse, choose products, and place orders.",
    responsibilities: [
      { title: "Improve the shopping experience", description: "We improved the existing design around browsing and buying jewelry. We kept these changes connected to the products and options customers choose before placing an order." },
      { title: "Connect payments to orders", description: "We added payment support to the existing store. This connected the customer's choices at checkout with the order details the business needs to handle a purchase." },
      { title: "Track shopping and purchase actions", description: "We added tracking features to the shopping experience. These connect customer actions to the store's reporting tools so the business can review purchase activity." },
      { title: "Fix and check the whole store", description: "We fixed problems in the visible pages and the code behind the store. We also checked the site throughout to keep changes working with the existing shopping process." },
    ],
    capabilities: [
      { title: "GA4 and Meta conversion tracking", description: "Shopping actions connect to GA4 and Google Ads. Meta purchase tracking uses matching event IDs in the browser and on the server. These IDs help Meta recognize the same purchase and avoid counting it twice." },
      { title: "SEO and search visibility", description: "The goal is to reach top positions for relevant jewelry searches and help shoppers find pieces they want to buy. Product pages give search engines and AI tools clear descriptions and details that help shoppers understand each item. Shared links show product images and useful details so shoppers know what to expect." },
      { title: "Manage store content and reviews", description: "Custom editing tools let staff maintain store information. The site displays approved customer reviews, and product reviews are limited to verified purchases." },
      { title: "Prepare images for the website", description: "Uploads resize images and save them in WebP format before storing them in Backblaze B2. A configurable CDN address lets the site use a separate service to deliver those images." },
      { title: "Product pages ready to read", description: "Product content and search information are prepared on the server. Product routes are created ahead of visits, so the page includes useful details before the shopping controls become interactive in the browser." },
    ],
  },
  "profile-6": {
    role: "Full Stack Developer",
    summary: "We worked on Martich Studios' existing website. We helped repair the booking system, improved content and admin tools, and fixed page and function issues. This supported clients booking studio services and the team maintaining the website.",
    responsibilities: [
      { title: "Repair the booking process", description: "We helped fix the existing booking system. The work supported the steps that connect a studio package and time with customer details, agreements, and payment." },
      { title: "Help the studio manage content", description: "We worked on the website's content editing and admin tools. These help the studio team maintain the service information and offers that clients see when planning a booking." },
      { title: "Fix page and function issues", description: "We fixed design issues and functions that were not working as expected in the existing site. The changes covered customer-facing pages and the tools used to maintain them." },
    ],
    capabilities: [
      { title: "Confirm payments and agreements", description: "The booking process checks payment status before confirmation. It saves signed agreements, creates a PDF, and records whether the client paid a deposit or the full amount." },
      { title: "Keep booking content editable", description: "A custom content management system stores page sections and booking packages. It prepares saved package details for the booking flow, so staff changes can be used by the reservation system." },
      { title: "Prepare and store website images", description: "Admin uploads resize images and convert them to WebP. Files are stored in Backblaze B2 and can use a configurable CDN address for website image delivery." },
      { title: "SEO and search visibility", description: "The goal is to reach top positions for relevant studio and location searches and help clients find a place to book. Clear studio, area, and article content can be read by search engines and AI tools. Shared links show useful page details so clients can understand the studio offering before opening the website." },
      { title: "Published pages ready to read", description: "Booking content and packages load on the server before the page is shown. Location routes are prepared ahead of visits, and saved page versions refresh after a set period. Booking controls then run in the browser." },
    ],
  },
  "profile-7": {
    role: "Full Stack Developer",
    summary: "We added shop and admin features to Ferma Coffee Co's existing website. We worked on product and content tools, Stripe payments, and promotions. We also improved the page design and fixed bugs to support customers placing orders and staff managing the shop.",
    responsibilities: [
      { title: "Improve the shop and product tools", description: "We added shop and admin features so the business could maintain its products. This supported the steps customers take from browsing the catalog to placing an order." },
      { title: "Make website content editable", description: "We worked on content editing features that give the team control over website information. These tools sit alongside the products, images, and descriptions used in the shop." },
      { title: "Connect payments and promotions", description: "We added Stripe payments and promotions to the store. This connected the offers customers see with the checkout process used to pay for their orders." },
      { title: "Improve pages and fix bugs", description: "We improved the design and fixed problems across the existing site. The work supported everyday shopping actions and the admin tasks needed to keep the store up to date." },
    ],
    capabilities: [
      { title: "Manage products and website content", description: "Custom admin tools let staff edit product descriptions, prices, images, stock, and availability. They can also update sections of the public website." },
      { title: "Take orders and payments", description: "Stripe checkout supports orders and promotional offers. Product and order tools give the business a way to manage the store behind each purchase." },
      { title: "GA4, Tag Manager, and Meta tracking", description: "The site loads GA4, Google Tag Manager, and Meta tracking. Contact and waitlist forms connect to browser and server lead events. Matching IDs help Meta avoid counting the same submission twice." },
      { title: "SEO and search visibility", description: "The goal is to reach top positions for relevant coffee searches and bring shoppers to products they can order. Product pages give search engines and AI tools clear information about prices, availability, and published customer reviews. Shared links show the business image and details, helping people recognize the shop and understand what it offers." },
      { title: "Prepare images for delivery", description: "Admin uploads resize images and convert them to WebP before storing them in Backblaze B2. The site can use a configurable CDN address to deliver those images." },
      { title: "Product information ready on arrival", description: "The server loads product details, shipping settings, and published reviews together. Product routes are prepared ahead of visits, and saved page versions refresh after a set period. Shopping controls become interactive in the browser." },
    ],
  },
  "profile-8": {
    role: "Full Stack Developer",
    summary: "We worked on River Taxes. We added AI help for bookkeeping, designed admin pages, worked on content tools, and fixed application problems. The AI work used client-specific tools, recorded changes, and asked for human decisions when review was needed.",
    responsibilities: [
      { title: "Add AI help for bookkeeping", description: "We worked on AI support for routine bookkeeping tasks. It uses the selected client's records, checks staff permissions, and keeps changes and review decisions recorded." },
      { title: "Design useful admin pages", description: "We designed admin pages around the staff's work with clients and business information. The pages connect the tools staff see with the application functions behind those tasks." },
      { title: "Make website content editable", description: "We worked on content management features so administrators could update website information. Published pages stay connected to the saved settings and content sections used by the application." },
      { title: "Improve functions and fix bugs", description: "We added features and fixed problems across the existing platform. This supported improvements to the daily work of the bookkeeping team and the clients using its tools." },
    ],
    capabilities: [
      { title: "AI tools for each client", description: "AI tools help categorize transactions, check possible duplicates, and review transfers for a selected client. Permission checks and recorded decisions control how changes are made." },
      { title: "Connect financial and client records", description: "The platform includes Plaid financial connections, Stripe payments, and Twilio communications. These work alongside bookkeeping records and tools for handling client documents." },
      { title: "SEO and search visibility", description: "The goal is to reach top positions for relevant bookkeeping searches and help prospective clients find the business's services. The team can update its public page content, search titles, and descriptions to explain the offering clearly. Published business information is readable to search engines and AI tools, helping them understand the services available." },
      { title: "Prepare public website images", description: "Admin uploads resize images and save them in WebP format. Public media uses Backblaze B2 storage and can be delivered through a configurable CDN address." },
      { title: "GA4 and Meta conversion tracking", description: "The website loads GA4 and Meta tracking. Enquiry and contact actions connect to browser and server event code. Matching IDs help Meta recognize the same action and avoid counting it twice." },
      { title: "Show the right public page", description: "The server checks whether a visitor is signed in before showing the public marketing page. Interactive application tools run in separate browser components." },
    ],
  },
  "profile-9": {
    role: "Full Stack Developer",
    summary: "We built Lowrie Roofing's lead, project, article, admin, and content editing features. This connected the public website with the tools behind it. The business can publish completed work, maintain useful information, and handle customer enquiries.",
    responsibilities: [
      { title: "Manage customer enquiries", description: "We built lead features that connect customer requests with admin tools. These give the business a place to review enquiries and support the team's follow-up work." },
      { title: "Publish completed projects", description: "We built project features for showing completed work and maintaining the details behind each page. These connect the public project gallery with the website's editing tools." },
      { title: "Publish articles and business information", description: "We built article and content editing features so the team could update the website. This supports information for customers researching roofing services and the areas the business serves." },
      { title: "Support day-to-day website work", description: "We built admin features around enquiries and published content. These bring the team's ongoing website tasks into tools connected to the public pages and customer requests." },
    ],
    capabilities: [
      { title: "Keep published content up to date", description: "The custom content system manages page sections, projects, articles, FAQs, testimonials, and business settings. Staff maintain this information through the website's admin tools." },
      { title: "SEO and search visibility", description: "The goal is to reach top positions for relevant roofing searches in the areas Lowrie serves and bring homeowners to an enquiry. Service pages, local information, and useful articles give search engines and AI tools clear content to read. Shared links show the business image and details, helping people recognize the company when its pages are shared." },
      { title: "Show Google business reviews", description: "The homepage loads reviews and the overall rating for the configured business from Google Places. A server route retrieves this information for the review section." },
      { title: "GA4 and Meta conversion tracking", description: "GA4 tracks website actions. Meta lead and contact events use matching IDs in the browser and on the server. These matches help Meta avoid counting the same action twice." },
      { title: "Prepare and deliver brand media", description: "Images are resized and saved as WebP before upload to Backblaze B2. Brand images and video use CDN links so the website can load them through its media delivery service." },
      { title: "Service pages ready to read", description: "The server loads saved content for service and location pages. These routes are prepared ahead of visits, so useful page information is available before browser controls become interactive." },
    ],
  },
  "profile-10": {
    role: "Full Stack Developer",
    summary: "We improved Masterbuilt Roofing's content tools, admin pages, design, and instant-estimate experience. The business can update website content and estimate prices. Adjustable rates and multipliers let the team change pricing inputs without editing code for every update.",
    responsibilities: [
      { title: "Improve instant estimates and pricing controls", description: "We worked on the estimate experience and its admin pricing tools. The business can adjust rates and multipliers when pricing needs change, with those saved values used by the estimator." },
      { title: "Make website content editable", description: "We worked on content editing features for the roofing website. These connect staff editing tasks with the service and project information presented to homeowners." },
      { title: "Improve admin tools", description: "We added admin features within the existing website. These give the business tools to manage the content and settings used in its day-to-day website work." },
      { title: "Improve the public page design", description: "We worked on the design of the customer-facing pages. The work shaped how visitors explore roofing information while keeping the design connected to the site's existing functions." },
    ],
    capabilities: [
      { title: "Keep estimate prices under business control", description: "The pricing editor saves package rates, old roof removal costs, and multipliers for roof steepness and building type. The estimator reads these saved settings from the CMS and uses them in its calculations." },
      { title: "Update website content and settings", description: "Custom content tools let staff maintain public page sections and business settings. They work alongside the pricing controls used by the estimate experience." },
      { title: "SEO and search visibility", description: "The goal is to reach top positions for relevant roofing and service-area searches and guide visitors toward an estimate request. Clear service and area pages give search engines and AI tools useful roofing information to read. Shared links to the estimate page include its title and description, helping people understand the next step." },
      { title: "Show Google business reviews", description: "A public review section loads Google Places reviews and the overall rating for the configured business. The website retrieves this information through a server route." },
      { title: "GA4 and Meta conversion tracking", description: "GA4 and Meta tracking connect to website actions. Matching event IDs link browser and server lead and contact events, helping Meta avoid counting the same action twice." },
      { title: "Prepare images and deliver media", description: "Uploads resize images and convert them to WebP before storing them in Backblaze B2. Brand images and video use CDN links for delivery to the website." },
      { title: "Keep pages and estimate settings ready", description: "Service-area pages are prepared ahead of visits, and saved page versions refresh after a set period. The estimate page loads CMS pricing on the server before its interactive calculator starts in the browser." },
    ],
  },
  "profile-11": {
    heading: "Project implementation",
    role: "Exterior-services website",
    summary: "Northforge Exteriors presents its services, local coverage, and contact options in one website. The business can update page content and receive customer enquiries. Clear search information and readable business details help search engines and AI tools understand the public pages.",
    responsibilities: [
      { title: "Present services and areas clearly", description: "Dedicated service and local pages explain the work the business offers and where it is available. This helps property owners find information relevant to their project." },
      { title: "Keep website content editable", description: "Custom editing tools let administrators update page sections and business information. The public pages use the content saved for the business's own website." },
      { title: "Collect useful customer enquiries", description: "Contact tools collect customer requests and allow an optional photo. This gives the business project details alongside the contact information needed to reply to an enquiry." },
    ],
    capabilities: [
      { title: "Google Tag Manager lead tracking", description: "The site loads Google Tag Manager to manage tracking tags. Accepted enquiries send a lead event to the tracking tools. Phone clicks are left to those tags, so the site's tracking helpers do not send the same event again." },
      { title: "SEO and search visibility", description: "The goal is to reach top positions for relevant exterior-service searches in the areas Northforge serves and bring interested property owners to an enquiry. Clear service and location pages give search engines and AI tools useful information about the business. Shared links show page images and details so people can recognize the offering before visiting." },
      { title: "Make business details easy to read", description: "The site provides business, service, and FAQ details in a format search tools can read. This helps those tools understand the company and the information on each relevant page." },
      { title: "Let staff manage page content", description: "Custom editing tools save page sections in Supabase. The public service pages use those saved values, giving the business control over its published information." },
      { title: "Handle enquiry photos with care", description: "Photo uploads check file size, resize the image, and save it as WebP before Backblaze B2 storage. Re-encoding also removes embedded location information from the uploaded photo." },
      { title: "Local pages ready to read", description: "Service and area pages load their content on the server. Routes are prepared ahead of visits, and saved page versions refresh after a set period. Published information is available before browser interactions start." },
    ],
  },
};
