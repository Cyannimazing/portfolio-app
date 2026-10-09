import { profileProjects } from "./profile-projects";
import { projects, toSlug } from "./projects";
import { getProjectPath } from "./project-stories";

// This earlier spa case study used a different spelling of the saved name.
// Redirect it to the current, verified contribution instead of indexing a duplicate.
const legacyAliases: Record<string, number> = { "beautiful-blessed-esthetics": 21 };

export function findPortfolioProject(slug: string) {
  return profileProjects.find(project => project.slug === slug || toSlug(project.name) === slug || project.id === legacyAliases[slug]);
}

export function canonicalProjectPaths() {
  return [
    ...profileProjects.map(getProjectPath),
    ...projects.filter(project => !findPortfolioProject(toSlug(project.title))).map(project => `/works/${toSlug(project.title)}`),
  ];
}
