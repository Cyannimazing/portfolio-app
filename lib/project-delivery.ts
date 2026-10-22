import { projectDeliveryBusiness } from "./project-delivery-business";
import { projectDeliveryWebA } from "./project-delivery-web-a";
import { projectDeliveryWebB } from "./project-delivery-web-b";
import type { ProjectDelivery } from "./project-delivery-types";

export const projectDelivery: Record<string, ProjectDelivery> = {
  ...projectDeliveryBusiness,
  ...projectDeliveryWebA,
  ...projectDeliveryWebB,
  "profile-4": {
    role: "Designer & Full Stack Developer",
    summary: "We designed and built this portfolio as a complete presentation of the work, from project evidence and case studies to services and enquiries. The implementation connects reusable interface components, structured content, search metadata, and accessible navigation, with attention to how clients and recruiters assess real project contributions.",
    responsibilities: [
      { title: "Project presentation and content architecture", description: "Built a structured project catalog with permanent case-study URLs, real website previews and application captures, and service-based browsing that helps visitors explore work relevant to their needs." },
      { title: "Accessible interaction and responsive design", description: "Adapted shared interface components for keyboard navigation, focus management, reduced motion, and layouts that remain readable across phones, tablets, desktop screens, and short viewports." },
      { title: "SEO, Open Graph and AI discovery", description: "Implemented page-specific SEO metadata, Open Graph images and link previews, canonical URLs, structured data, sitemaps and readable AI content routes for public project discovery." },
      { title: "Enquiries and production foundations", description: "Connected the enquiry form to its delivery service with validation and retry states, and configured browser security headers, media handling, and static page generation for deployment." },
    ],
    capabilities: [
      { title: "Reusable presentation components", description: "Next.js and React combine Aceternity UI components with shared typography, spacing, and motion tokens across the portfolio and its case studies." },
      { title: "SEO and Open Graph link previews", description: "SEO metadata, canonical URLs, Open Graph images, JSON-LD, sitemaps and indexing settings share one configuration, preserving project identities across search and supported link previews." },
      { title: "AI-readable public content", description: "Readable llms.txt and extended content routes accompany crawler rules and no-JavaScript navigation, providing access to the portfolio's public information." },
      { title: "Optimized images and real previews", description: "Local WebP assets and Next.js image handling support real application captures, while live website previews retain each project's original interface." },
      { title: "Accessible forms and browser controls", description: "Enquiry validation, sending and retry feedback, keyboard focus handling, reduced-motion support, and content security policies are implemented across the site." },
      { title: "Server rendering and static generation", description: "Next.js server components and statically generated project routes deliver content and metadata in the initial HTML, with client islands handling interactive controls." },
    ],
  },
};
