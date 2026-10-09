import { profileProjects } from "./profile-projects";
import { getProjectPath } from "./project-stories";
import { serviceCategories } from "./service-categories";
import { serviceOfferings } from "./service-offerings";
import { absoluteUrl, siteConfig } from "./site";

const person = { "@id": absoluteUrl("/#person") };
const studio = { "@id": absoluteUrl("/#studio") };
const website = { "@id": absoluteUrl("/#website") };

export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", ...person, name: "Cyril Jian B. Narvasa", alternateName: siteConfig.owner, url: absoluteUrl("/practice"), jobTitle: "Full Stack Developer", image: absoluteUrl("/images/cyril-editorial-v2.webp"), email: siteConfig.email, sameAs: siteConfig.socialProfiles, homeLocation: { "@type": "Place", name: "Davao, Philippines" } },
    { "@type": "Organization", ...studio, name: siteConfig.name, url: absoluteUrl(), description: siteConfig.description, founder: person, email: siteConfig.email, logo: absoluteUrl("/brand/cyril-ai-logo-dark.webp") },
    { "@type": "WebSite", ...website, name: siteConfig.name, url: absoluteUrl(), description: siteConfig.description, inLanguage: "en", publisher: studio, about: person },
  ],
};

export function pageStructuredData(path: string, name: string, description: string, type = "WebPage", mainEntity?: Record<string, unknown>) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": type, "@id": `${url}#page`, url, name, description, inLanguage: "en", isPartOf: website, publisher: studio, ...(mainEntity ? { mainEntity } : {}) },
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl() },
        ...(path.startsWith("/works/") ? [{ "@type": "ListItem", position: 2, name: "Projects", item: absoluteUrl("/works") }] : []),
        ...(path === "/" ? [] : [{ "@type": "ListItem", position: path.startsWith("/works/") ? 3 : 2, name, item: url }]),
      ] },
    ],
  };
}

export function worksStructuredData(description: string) {
  return pageStructuredData("/works", "Selected projects", description, "CollectionPage", {
    "@type": "ItemList", numberOfItems: profileProjects.length,
    itemListElement: profileProjects.map((project, index) => ({ "@type": "ListItem", position: index + 1, name: project.name, url: absoluteUrl(getProjectPath(project)) })),
  });
}

export function servicesStructuredData(description: string) {
  return pageStructuredData("/services", "Development services", description, "CollectionPage", {
    "@type": "OfferCatalog", name: "Cyril AI development services",
    itemListElement: serviceCategories.map(category => {
      const offering = serviceOfferings.find(service => service.id === category.id)!;
      return { "@type": "Offer", url: absoluteUrl(`/services#${category.id}`), itemOffered: {
        "@type": "Service", "@id": absoluteUrl(`/services#${category.id}`), name: category.name, serviceType: category.name,
        description: `${offering.summary} ${offering.inclusions.join("; ")}.`, provider: studio,
        availableChannel: { "@type": "ServiceChannel", serviceUrl: absoluteUrl(`/contact?service=${category.id}`) },
      } };
    }),
  });
}

export function aboutStructuredData(description: string) {
  return pageStructuredData("/practice", "Behind the work", description, "ProfilePage", person);
}

export function contactStructuredData(description: string) {
  return pageStructuredData("/contact", "Contact Cyril AI", description, "ContactPage", person);
}

export function caseStudyStructuredData({ path, name, description, image, audience }: { path: string; name: string; description: string; image?: string; audience?: string }) {
  return pageStructuredData(path, name, description, "WebPage", {
    "@type": "CreativeWork", "@id": `${absoluteUrl(path)}#case-study`, name, description, url: absoluteUrl(path), author: person, publisher: studio,
    ...(image ? { image: absoluteUrl(image) } : {}),
    ...(audience ? { audience: { "@type": "Audience", audienceType: audience } } : {}),
  });
}

