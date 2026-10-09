"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { IconArrowLeft, IconArrowRight, IconArrowUpRight, IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import ProjectWebsitePreview from "@/components/ProjectWebsitePreview";
import PortfolioActions from "@/components/PortfolioActions";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import { projectChallenges } from "@/lib/project-case-studies";
import { projectStrengths } from "@/lib/project-strengths";
import { projectPresentations } from "@/lib/project-presentations";
import { profileProjects } from "@/lib/profile-projects";
import { getProjectLiveUrl, getProjectPath, projectStories, type PortfolioProject } from "@/lib/project-stories";
import { getServiceCategory } from "@/lib/service-categories";
import { readProjectCollection, selectProject, subscribeProjectSelection } from "@/lib/project-selection";
import styles from "./ProjectCaseStudy.module.css";

export default function ProjectCaseStudy({ project }: { project: PortfolioProject }) {
  const reduced = useMotionPreference();
  const [paused, setPaused] = useState(false);
  const collectionPath = useSyncExternalStore(subscribeProjectSelection, readProjectCollection, () => "/works");
  const story = projectStories[project.id];
  const index = profileProjects.findIndex(item => item.id === project.id);
  const liveUrl = getProjectLiveUrl(project);
  const technologies = project.technologies.filter(name => !["SaaS", "CMS", "Booking", "POS", "Inventory", "Reporting", "Ecommerce", "Estimator", "Lead capture", "Portfolio", "Business website", "Structured data", "RBAC"].includes(name));
  useEffect(() => { selectProject(project.id); }, [project.id]);
  return <main className={styles.page} data-project-case-study data-motion={paused || reduced ? "paused" : "running"}>
    <div className={styles.topbar}><Link href={collectionPath} className={styles.back}><IconArrowLeft size={18} aria-hidden="true" />Back to projects</Link>{!reduced && <button className={styles.motion} onClick={() => setPaused(value => !value)} aria-label={paused ? "Resume project animations" : "Pause project animations"}>{paused ? <IconPlayerPlay size={16} aria-hidden="true" /> : <IconPlayerPause size={16} aria-hidden="true" />}<span>{paused ? "Play motion" : "Pause motion"}</span></button>}</div>
    <header className={styles.intro}><div><span className={styles.eyebrow}>{projectPresentations[project.id].category}<span aria-hidden="true"> / </span>{String(index + 1).padStart(2, "0")}</span><h1 tabIndex={-1}>{project.name}</h1><p>{story.summary}</p><ul className={styles.tags} aria-label="Project services">{project.services.map(id => <li key={id}>{getServiceCategory(id).name}</li>)}</ul></div>{liveUrl && <HoverBorderGradient as={Link} href={liveUrl} target="_blank" rel="noopener noreferrer" paused={paused || reduced} containerClassName={styles.visit} className={styles.visitBody}>Visit live project<IconArrowUpRight size={18} aria-hidden="true" /></HoverBorderGradient>}</header>
    <div className={styles.preview}><ProjectWebsitePreview project={project} paused={paused || reduced} compact /></div>
    <section className={styles.valueSection} aria-labelledby="business-value"><h2 id="business-value" className={styles.sectionLabel}>Built for the business</h2><BentoGrid className={styles.highlights}>{projectStrengths[project.id].map(feature => <BentoGridItem key={feature.title} reveal className={styles.highlight} header={<div><span className={styles.featureNumber}>{feature.category}</span><h3>{feature.title}</h3><p>{feature.description}</p></div>} />)}</BentoGrid></section>
    <BentoGrid className={styles.narrative}>
      <BentoGridItem reveal className={styles.narrativeCard} header={<div><h2>The challenge</h2><p>{projectChallenges[project.id]}</p></div>} />
      <BentoGridItem reveal className={styles.narrativeCard} header={<div><h2>The solution</h2><p>{story.overview}</p></div>} />
    </BentoGrid>
    <section className={styles.implementation}>
      {"contribution" in project && <div><h2>Our contribution</h2><span className={styles.role}>{project.contribution.role}</span><p>{project.id === 4 ? "We designed and built this personal portfolio." : "We " + project.contribution.scope.charAt(0).toLowerCase() + project.contribution.scope.slice(1)}</p></div>}
      <div><h2>Built with</h2><ul className={styles.stack} aria-label="Project technologies">{technologies.map(name => <li key={name}>{name}</li>)}</ul><h3>Built for</h3><p>{story.audience}</p></div>
    </section>
    <nav className={styles.projectNavigation} aria-label="More project case studies">{index > 0 ? <Link href={getProjectPath(profileProjects[index - 1])}><span><IconArrowLeft size={17} />Previous project</span><strong>{profileProjects[index - 1].name}</strong></Link> : <span />}{index < profileProjects.length - 1 && <Link href={getProjectPath(profileProjects[index + 1])}><span>Next project<IconArrowRight size={17} /></span><strong>{profileProjects[index + 1].name}</strong></Link>}</nav>
    <footer className={styles.footer}><p>What can we build together?</p><PortfolioActions paused={paused || reduced} /></footer>
  </main>;
}
