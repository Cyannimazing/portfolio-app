import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { projects, toSlug } from "@/lib/projects";
import { profileProjects } from "@/lib/profile-projects";
import { getProjectPath, projectStories } from "@/lib/project-stories";
import { projectPreviewPosters } from "@/lib/project-previews";
import { findPortfolioProject } from "@/lib/project-routing";
import { pageMetadata } from "@/lib/seo";
import { caseStudyStructuredData } from "@/lib/structured-data";
import StructuredData from "@/components/StructuredData";
import ProjectDetail from "./ProjectDetail";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";

// Pre-render one static page per project at build time (SSG).
export function generateStaticParams() {
  return [...profileProjects.map(project => ({ slug: project.slug })), ...projects.map(project => ({ slug: toSlug(project.title) }))];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const saved = findPortfolioProject(slug);
  if (saved) {
    const path = getProjectPath(saved);
    const cover = projectPreviewPosters[saved.id];
    return pageMetadata({ path, title: saved.name, description: projectStories[saved.id].summary, image: cover, type: "article" });
  }
  const project = projects.find((p) => toSlug(p.title) === slug);
  if (!project) return { title: "Project Not Found", robots: { index: false, follow: false } };

  return pageMetadata({ path: `/works/${slug}`, title: project.title, description: project.description, image: project.mainImage, type: "article" });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const saved = findPortfolioProject(slug);
  if (saved) {
    if (saved.slug !== slug) permanentRedirect(getProjectPath(saved));
    return <><StructuredData id="page-identity" data={caseStudyStructuredData({ path: getProjectPath(saved), name: saved.name, description: projectStories[saved.id].summary, image: projectPreviewPosters[saved.id], audience: projectStories[saved.id].audience })} /><ProjectCaseStudy project={saved} /></>;
  }
  const project = projects.find((p) => toSlug(p.title) === slug);
  if (!project) notFound();

  return <><StructuredData id="page-identity" data={caseStudyStructuredData({ path: `/works/${slug}`, name: project.title, description: project.description, image: project.mainImage })} /><ProjectDetail project={project} /></>;
}
