import type { ProjectDelivery } from "./project-delivery-types";

export const projectDeliveryWebB: Record<string, ProjectDelivery> = {
  "profile-12": {
    heading: "Project implementation",
    role: "Restoration website and online shop",
    summary:
      "Luxury Leather Restoration brings its services, online shop and business tools into one website. Customers can read about restoration work, browse products and complete a purchase. The business can update page content, manage orders and payments, and show review information from the same website.",
    responsibilities: [
      {
        title: "A connected online shop",
        description:
          "Customers can explore restoration services and browse products in the same place. Product details, shopping tools and payment confirmation support the steps from choosing an item to buying it.",
      },
      {
        title: "Keep store work organized",
        description:
          "Separate admin pages help the business manage products, customers, orders and promotions. Stripe payment reports show transactions and payment status alongside these records.",
      },
      {
        title: "Update content through admin",
        description:
          "The custom CMS lets the business edit page sections and images through its content tools. Routine text and image changes can be made without changing the website code.",
      },
      {
        title: "Help customers understand the business",
        description:
          "Review information and clear page details give customers useful context about the business. Search information and branded link previews support people finding and sharing the website.",
      },
    ],
    capabilities: [
      {
        title: "Keep content easy to manage",
        description:
          "The custom Supabase CMS keeps each business's page sections separate. Staff can edit sections on the page. Save checks warn when another editor has changed the same content.",
      },
      {
        title: "Manage purchases from one place",
        description:
          "Admin tools connect products, orders, promotions and Stripe payments. This gives the business the records it needs to manage purchases made through the website.",
      },
      {
        title: "Show customer review information",
        description:
          "The website can load business reviews through Google Places. It also supports an existing review service and saved review content when a live source does not return data.",
      },
      {
        title: "SEO and search visibility",
        description:
          "Clear service and product pages give search engines and AI tools useful business information to read. Shared links can show the website's name, description and image. The goal is to compete for top positions in relevant leather restoration and product searches, helping people enquire or shop.",
      },
      {
        title: "Track useful customer actions",
        description:
          "GA4 measures website activity when its Google tag is set up. Meta Pixel and server conversion tracking use matching event IDs so the same contact action can be recognized across both sources.",
      },
      {
        title: "Store images for use across the website",
        description:
          "Images can upload directly from the browser to Backblaze B2. The media library provides a CDN address when configured, with the storage address available as a backup.",
      },
      {
        title: "Deliver page content before interactions",
        description:
          "Server rendering prepares the business's homepage content before sending the page. Saved copies of the content can refresh when website information changes. Browser code then handles the interactive parts.",
      },
    ],
  },
  "profile-13": {
    role: "Full Stack Developer",
    summary:
      "We improved an existing custom home builder website as part of a two-person team. The work covered page design, CMS fixes and other bugs. It helped present completed homes, building locations and the construction process more clearly, while keeping the site's existing content tools in use.",
    responsibilities: [
      {
        title: "Make the website easier to explore",
        description:
          "We improved page layouts and navigation so visitors could browse project photos and building information more clearly. The work focused on the needs of people considering a custom home.",
      },
      {
        title: "Fix the content tools",
        description:
          "We fixed CMS issues affecting saved content and page sections. These tools support project galleries, building resources and pages for the areas the builder serves.",
      },
      {
        title: "Fix website functions",
        description:
          "We addressed bugs and other website functions within the existing site. The changes worked with its established pages and content structure as part of the two-person team.",
      },
    ],
    capabilities: [
      {
        title: "Keep website information organized",
        description:
          "Supabase stores the page sections and their display order. This content supports project galleries, building resources, process information and pages for the areas served.",
      },
      {
        title: "Update search details through the CMS",
        description:
          "The site uses saved page titles and descriptions for its search information. CMS updates can change these details on building location, gallery and process pages.",
      },
      {
        title: "SEO and search visibility",
        description:
          "Pages for the areas served give visitors, search engines and AI tools clear information about where the builder works. Link previews carry page titles and descriptions. The goal is to compete for top positions in relevant home building searches, helping prospective clients find projects and contact the team.",
      },
      {
        title: "Deliver project photos across the site",
        description:
          "Project photos are served through a shared CDN. The website's image components use those files across public pages, keeping the photos connected to the published content.",
      },
      {
        title: "Send content with the page",
        description:
          "Server rendering loads CMS sections and search details before sending the page. Cached responses can be reused and checked for updates, while browser code handles the interactive presentation.",
      },
    ],
  },
  "profile-14": {
    role: "Designer & Full Stack Developer",
    summary:
      "We redesigned Sergio Garcia's website to bring his golf career, foundation, family, partnerships and course design work together. We worked on the page design, content editing tools and search settings. The team can manage the information shown across the public pages through the CMS.",
    responsibilities: [
      {
        title: "Give the website a clear visual direction",
        description:
          "We designed the layouts and page flow around the player's different public roles. Each area has its own place while the website feels connected from page to page.",
      },
      {
        title: "Make page content easier to update",
        description:
          "We worked on the CMS for profile and brand content. Admin tools let the team maintain page sections and carry those changes through to the public website.",
      },
      {
        title: "Help people find and share each page",
        description:
          "We worked on page metadata, search descriptions and shared link previews. These details describe the content people are opening and help the redesigned pages keep a clear public identity.",
      },
    ],
    capabilities: [
      {
        title: "Manage profile content in one place",
        description:
          "The custom Supabase CMS stores content for the player, foundation and other public pages. Its read and save tools keep the content tied to the right site and page.",
      },
      {
        title: "SEO and search visibility",
        description:
          "Clear profile pages and structured profile information help search engines and AI tools read the player's public identity. Shared links can show page details and branded imagery. The aim is to compete for top positions in relevant searches for his name, career and wider public roles.",
      },
      {
        title: "Keep images ready for publishing",
        description:
          "Images can be uploaded to Backblaze B2 and managed through the media library. Configured CDN addresses let public pages use the stored files.",
      },
      {
        title: "Understand page visits",
        description:
          "GA4 and Meta Pixel can track page views when their tags are configured. GA4 also records selected navigation and website actions.",
      },
      {
        title: "Show profile content before interactions",
        description:
          "Server rendering loads player and foundation content before sending their pages. Revalidation checks for published updates. Browser components handle the parts visitors interact with.",
      },
    ],
  },
  "profile-15": {
    heading: "Project implementation",
    role: "Construction services website",
    summary:
      "TMBTX presents its construction services, completed work, financing information and estimate options in one website. Pages for the areas served help visitors find relevant information. Review tools, search details and project images support people learning about the business and planning their next step.",
    responsibilities: [
      {
        title: "Explain the available services",
        description:
          "Separate pages describe custom homes, metal buildings, roofing, concrete and related work. Visitors can explore the services that fit the project they have in mind.",
      },
      {
        title: "Support early project planning",
        description:
          "Estimate options, financing information and completed projects sit alongside service details. This gives prospective customers context before they discuss their own build with the business.",
      },
      {
        title: "Organize information by area",
        description:
          "Pages for the areas served bring local construction information together. Articles and guides give visitors more detail about the work they are researching.",
      },
      {
        title: "Help visitors assess the business",
        description:
          "Review tools and project images support the public presentation. Service details and estimate options are kept within the same website so visitors can explore and choose a next step.",
      },
    ],
    capabilities: [
      {
        title: "SEO and search visibility",
        description:
          "The goal is to compete for top positions when people search for construction services in the areas served. Clear service and area pages give search engines and AI tools useful information to read. Shared links show page details and images, helping visitors recognize the business and reach its estimate options.",
      },
      {
        title: "Help search tools find public pages",
        description:
          "The sitemap lists public pages in groups for locations, articles, guides and FAQs. Crawler rules point search tools toward this index and guide access to the site.",
      },
      {
        title: "Show Google review information",
        description:
          "The review section can request business reviews through Google Places. Saved fallback content is available when the integration cannot return reviews.",
      },
      {
        title: "Deliver project images and video",
        description:
          "Construction photos and the hero video use a shared CDN. Next.js image settings support AVIF and WebP formats for the images shown on public pages.",
      },
      {
        title: "Prepare useful pages before visitors interact",
        description:
          "The server can prepare area and article pages in advance and check for published content updates. Visitors receive the page information before interactive features start in their browser.",
      },
    ],
  },
  "profile-16": {
    role: "Designer & Full Stack Developer",
    summary:
      "We designed WUDR to explain water treatment choices through a visual product story and a clear path toward a consultation. Our work covered the 3D flow, page design, CMS, admin and lead features. These parts connect the information visitors explore with the tools the business uses to maintain it.",
    responsibilities: [
      {
        title: "Explain treatment options visually",
        description:
          "We built the 3D flow and page design to show how treatment options relate to water concerns. The experience moves from a broad explanation toward specific products.",
      },
      {
        title: "Give the business content controls",
        description:
          "We handled CMS and admin work so the business could maintain website information. These tools support the content behind the visual presentation.",
      },
      {
        title: "Help visitors prepare for a consultation",
        description:
          "We worked on lead features and the enquiry design around household needs, products and water concerns. The aim was to help visitors organize useful information for a treatment discussion.",
      },
      {
        title: "Connect product information with a next step",
        description:
          "We combined page design with the interactive product flow. The layouts and visual sequence guide visitors through treatment information and toward planning a consultation.",
      },
    ],
    capabilities: [
      {
        title: "Make product choices easier to understand",
        description:
          "Scrolling scenes, comparisons and product pages explain water softening, filtration, reverse osmosis and well water options. Visitors can explore these choices within the same website.",
      },
      {
        title: "Respect how visitors use motion",
        description:
          "GSAP controls the visual sequences. The site respects reduced motion settings and adjusts media behavior to whether it is visible and the available screen size.",
      },
      {
        title: "Deliver images and video for different screens",
        description:
          "A shared CDN serves WebP product and editorial images. Separate video versions are provided for phones and desktop screens through a central list of media files.",
      },
      {
        title: "Keep consultation details as a draft",
        description:
          "The current preview lets visitors keep water test details in a draft on their device and download a copy. They can organize household information and concerns before a consultation.",
      },
      {
        title: "SEO and search visibility",
        description:
          "The aim is to compete for top positions in relevant water-treatment searches and help people find suitable products. Clear product pages give search engines and AI tools useful information to read. Shared links include product images and details, helping visitors recognize what the page offers before planning a consultation.",
      },
      {
        title: "Deliver product pages before visual effects start",
        description:
          "Product pages are prepared from the catalog and rendered on the server. Their text and metadata arrive with the page. Browser code handles the interactive visual story.",
      },
    ],
  },
  "profile-17": {
    role: "Full Stack Developer",
    summary:
      "We added instant estimates, CMS features and AI checks for enquiries to an existing home energy website. Customers can explore initial pricing from property details. The business can update estimate rates and multipliers in admin, while CAPTCHA and contact checks help staff review suspicious enquiries.",
    responsibilities: [
      {
        title: "Turn property details into an initial estimate",
        description:
          "We built instant estimates using property measurements, roof details and editable prices. Saved proposals and a lead handoff give the team information it can use when following up.",
      },
      {
        title: "Let the business adjust content and prices",
        description:
          "We added CMS controls for public content, estimate rates and price multipliers. The business can make these changes in admin and use the saved settings in its estimates.",
      },
      {
        title: "Improve the existing website",
        description:
          "We fixed page design issues and minor bugs, and made changes requested by the client. The work extended the website that a teammate had originally built.",
      },
      {
        title: "Help staff spot suspicious enquiries",
        description:
          "We added CAPTCHA checks on the server and rules for suspicious contact details. AI reviews borderline cases. Submissions can be accepted, flagged for staff or rejected before lead capture.",
      },
    ],
    capabilities: [
      {
        title: "Connect estimates with useful follow-up details",
        description:
          "Google property and roof data support the estimate calculations. The flow can save the result, create a PDF proposal and send the estimate details with the customer enquiry.",
      },
      {
        title: "Change estimate prices through admin",
        description:
          "The Supabase CMS lets staff update public content, estimate rates and price multipliers. These saved settings supply the pages and the calculations used by the estimate experience.",
      },
      {
        title: "Check enquiries before they reach the team",
        description:
          "Google reCAPTCHA v2 is checked on the server. Contact rules check warning signs, and an optional AI classifier through OpenRouter reviews borderline cases. The result is an accepted enquiry, a warning for staff or a rejection.",
      },
      {
        title: "SEO and search visibility",
        description:
          "Public service pages and a readable text index give search engines and AI tools clear information to read. Shared links can show branded images and page details. The goal is to compete for top positions in relevant home energy searches in the areas served, leading to useful estimate enquiries.",
      },
      {
        title: "Track customer enquiries and website actions",
        description:
          "GA4 uses gtag to record website activity. Meta browser and server events track accepted enquiries, including estimate submissions. Matching event IDs help identify the same action across both sources when tracking is configured.",
      },
      {
        title: "Show reviews from the business listing",
        description:
          "When configured, the public review section loads customer reviews and business ratings through Google Places. This connects the displayed review information with the selected business listing.",
      },
      {
        title: "Manage uploaded images and files",
        description:
          "Backblaze B2 stores uploaded images and files. The media library can provide CDN addresses for delivery, keeping stored media available for use across the website.",
      },
      {
        title: "Send page content before interactive forms load",
        description:
          "Server rendering prepares service-page content before sending it to visitors. Article pages can be built in advance and refreshed after content updates. Estimate forms and other interactive features run in the browser.",
      },
    ],
  },
  "profile-21": {
    role: "Web Developer",
    summary:
      "Our work focused on how the existing spa website appears in browser tabs and shared links. We updated the small browser icon, the images used in shared links and the details shown with them. These changes carry the spa's branding into the places people see when they open or share its website.",
    responsibilities: [
      {
        title: "Update the browser icon",
        description:
          "We updated the favicon used in browser tabs and other places that show the website icon. This gives visitors a small, recognizable part of the spa branding.",
      },
      {
        title: "Add branded shared link images",
        description:
          "We added and updated Open Graph images for link previews. Supported social and messaging apps can use these images when someone shares the website.",
      },
      {
        title: "Connect preview details to the right assets",
        description:
          "We updated the link-preview settings so supported apps can show the intended spa image and details. This work focused on the website's appearance in browser tabs and shared links.",
      },
    ],
    capabilities: [
      {
        title: "Give clients a way to book",
        description:
          "The existing spa website opens the Boulevard appointment widget. It also provides a direct Boulevard booking link when the widget is unavailable.",
      },
      {
        title: "Keep spa information and hours in sync",
        description:
          "The existing Supabase CMS manages page content and business settings. When staff save new opening hours, the contact and policies pages are updated with the same information.",
      },
      {
        title: "SEO and search visibility",
        description:
          "The existing website provides clear spa information for search engines and AI tools to read when indexing is enabled. Shared links can show branded images and page details. The aim is to compete for top positions in relevant local treatment searches and give visitors a clear path to appointment options.",
      },
      {
        title: "Keep spa images ready to use",
        description:
          "The existing media tools upload images to Backblaze B2 and list them in a media library. Configured CDN addresses let the public website use those stored files.",
      },
      {
        title: "Deliver spa information with the page",
        description:
          "The existing server pages load homepage content, contact details and business settings before rendering. Visitors receive this information with the page, alongside the interactive booking controls.",
      },
    ],
  },
};
