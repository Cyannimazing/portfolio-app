// Shared service labels for project tags, collection filters and service proof.
export const serviceCategories = [
  { id: "business-software", name: "Custom Business Software", short: "Custom software" },
  { id: "websites", name: "Business Websites", short: "Websites" },
  { id: "cms", name: "Content Management Systems", short: "CMS" },
  { id: "booking", name: "Booking Systems", short: "Booking" },
  { id: "mobile-apps", name: "Mobile Apps", short: "Mobile apps" },
  { id: "automation", name: "Integrations & Automation", short: "Integrations" },
  { id: "support", name: "Ongoing Support & Maintenance", short: "Support" },
] as const;

export type ServiceId = (typeof serviceCategories)[number]["id"];

export function getServiceCategory(id: string) {
  const service = serviceCategories.find(category => category.id === id);
  if (!service) throw new Error(`Unknown service category: ${id}`);
  return service;
}
