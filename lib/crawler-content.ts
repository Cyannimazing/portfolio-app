import { profileProjects } from "./profile-projects";
import { getProjectPath, projectStories } from "./project-stories";
import { publicPages } from "./seo";
import { getServiceCategory, serviceCategories } from "./service-categories";
import { serviceOfferings } from "./service-offerings";
import { absoluteUrl, siteConfig } from "./site";

// Public content uses the same data as the displayed services/case studies.
// Local audit paths, private source files and inferred ownership stay out.
export function llmsIndex() {
  return [
    `# ${siteConfig.name}`,
    `> ${siteConfig.description}`,
    `${siteConfig.owner} is a full stack developer based in Davao, Philippines. This is his independent development studio and portfolio. Case studies separate product capabilities from his confirmed contribution.`,
    "## Main pages",
    ...publicPages.map(page => `- [${page.path === "/" ? "Home" : page.title}](${absoluteUrl(page.path)}): ${page.description}`),
    "## Readable service and project content",
    `- [Service scopes and case studies, plain text](${absoluteUrl("/llms-full.txt")}): Public service inclusions, product features, intended users, and confirmed contributions.`,
    "## Project case studies",
    ...profileProjects.map(project => `- [${project.name}](${absoluteUrl(getProjectPath(project))}): ${projectStories[project.id].summary}`),
    "## Contact",
    `- [Project enquiry](${absoluteUrl("/contact")}): Discuss a project or book a discovery call.`,
    `- [Email](mailto:${siteConfig.email}): ${siteConfig.email}.`,
  ].join("\n\n") + "\n";
}

export function llmsFullContent() {
  const services = serviceCategories.map(category => {
    const offering = serviceOfferings.find(service => service.id === category.id)!;
    return [`### ${category.name}`, `Source: ${absoluteUrl(`/services#${category.id}`)}`, offering.summary,
      ...offering.details.map(detail => `- ${detail.title}: ${detail.description}`),
      `Example uses: ${offering.examples.join("; ")}.`,
      `Enquiry: ${absoluteUrl(`/contact?service=${category.id}`)}`,
    ].join("\n\n");
  });
  const cases = profileProjects.map(project => {
    const story = projectStories[project.id];
    return [`### ${project.name}`, `Source: ${absoluteUrl(getProjectPath(project))}`, story.summary, story.overview,
      `Built for: ${story.audience}.`,
      `Services: ${project.services.map(id => getServiceCategory(id).name).join("; ")}.`,
      "Product capabilities:", ...story.features.map(feature => `- ${feature.title}: ${feature.description}`),
      ...("contribution" in project ? [`Confirmed contribution (${project.contribution.role}): ${project.contribution.scope}`] : []),
    ].join("\n\n");
  });
  return [`# ${siteConfig.name}`, siteConfig.description, `Developer: ${siteConfig.owner}. Location: Davao, Philippines.`, "## Services", ...services, "## Project case studies", ...cases, "## Contact", `${absoluteUrl("/contact")}\n${siteConfig.email}`].join("\n\n") + "\n";
}
