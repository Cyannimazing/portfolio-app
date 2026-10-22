"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { IconArrowLeft, IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import ProjectWebsitePreview from "@/components/ProjectWebsitePreview";
import PortfolioActions from "@/components/PortfolioActions";
import ProjectCaseContent from "@/components/ProjectCaseContent";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import { projectCaseStudies } from "@/lib/project-case-studies";
import { projectDelivery } from "@/lib/project-delivery";
import { projectPresentations } from "@/lib/project-presentations";
import { profileProjects } from "@/lib/profile-projects";
import { getProjectLiveUrl, getProjectPath, projectStories, type PortfolioProject } from "@/lib/project-stories";
import { getServiceCategory } from "@/lib/service-categories";
import { readProjectCollection, selectProject, subscribeProjectSelection } from "@/lib/project-selection";
import styles from "./ProjectCaseStudy.module.css";

export default function ProjectCaseStudy({ project }: { project: PortfolioProject }) {
  const reduced = useMotionPreference();
  const collectionPath = useSyncExternalStore(subscribeProjectSelection, readProjectCollection, () => "/works");
  const story = projectStories[project.id];
  const caseStudy = projectCaseStudies[project.id];
  const index = profileProjects.findIndex(item => item.id === project.id);
  const liveUrl = getProjectLiveUrl(project);
  const technologies = project.technologies.filter(name => !["SaaS", "CMS", "Booking", "POS", "Inventory", "Reporting", "Ecommerce", "Estimator", "Lead capture", "Portfolio", "Business website", "Structured data", "RBAC"].includes(name));
  useEffect(() => { selectProject(project.id); }, [project.id]);
  return <main className={styles.page} data-project-detail data-project-case-study data-motion={reduced ? "paused" : "running"}>
    <div className={styles.preview}><ProjectWebsitePreview project={project} paused={reduced} wide fullWidth toolbar={<Link href={collectionPath} className={styles.back}><IconArrowLeft size={16} aria-hidden="true" />Back to projects</Link>}>
      <header className={styles.intro}><div><span className={styles.eyebrow}>{projectPresentations[project.id].category}<span aria-hidden="true"> / </span>{String(index + 1).padStart(2, "0")}</span><h1 tabIndex={-1}>{project.name}</h1><p>{story.summary}</p><ul className={styles.tags} aria-label="Project services">{project.services.map(id => <li key={id}>{getServiceCategory(id).name}</li>)}</ul></div>{liveUrl && <HoverBorderGradient as={Link} href={liveUrl} target="_blank" rel="noopener noreferrer" paused={reduced} containerClassName={styles.visit} className={styles.visitBody}>Visit live project<IconArrowUpRight size={18} aria-hidden="true" /></HoverBorderGradient>}</header>
    </ProjectWebsitePreview></div>
    <ProjectCaseContent challenge={caseStudy.challenge} solution={caseStudy.solution} rationale={caseStudy.rationale} details={projectDelivery[`profile-${project.id}`]} technologies={technologies} />
    <nav className={styles.projectNavigation} aria-label="More project case studies">{index > 0 ? <Link href={getProjectPath(profileProjects[index - 1])}><span><IconArrowLeft size={17} />Previous project</span><strong>{profileProjects[index - 1].name}</strong></Link> : <span />}{index < profileProjects.length - 1 && <Link href={getProjectPath(profileProjects[index + 1])}><span>Next project<IconArrowRight size={17} /></span><strong>{profileProjects[index + 1].name}</strong></Link>}</nav>
    <footer className={styles.footer}><p>What can we build together?</p><PortfolioActions paused={reduced} /></footer>
  </main>;
}
