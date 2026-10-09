"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconArrowLeft, IconArrowUpRight, IconFolder } from "@tabler/icons-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { profileProjects } from "@/lib/profile-projects";
import { projectPresentations } from "@/lib/project-presentations";
import ProjectWebsitePreview from "@/components/ProjectWebsitePreview";
import { getProjectPath } from "@/lib/project-stories";
import { getServiceCategory, serviceCategories, type ServiceId } from "@/lib/service-categories";
import { studioEase, studioExitEase, studioPanelStart, studioPanelVisible } from "@/lib/studio-motion";
import styles from "./ProjectMenu.module.css";

type Project = (typeof profileProjects)[number];
type Props = { selectedIndex: number | null; onSelect: (index: number | null) => void; paused: boolean };

export function ProjectMenuHeader() {
  return <div className={styles.headerIdentity}>
    <span className={styles.headerIcon}><IconFolder size={19} stroke={1.5} aria-hidden="true" /></span>
    <span>Project collection</span><span className={styles.count}>{profileProjects.length}</span>
  </div>;
}

function ProjectCollection({ onSelect, paused, restoreIndex, filter, onFilter }: Pick<Props, "onSelect" | "paused"> & { restoreIndex: number | null; filter: ServiceId | null; onFilter: (filter: ServiceId | null) => void }) {
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (restoreIndex !== null) listRef.current?.querySelector<HTMLButtonElement>(`[data-project-index="${restoreIndex}"]`)?.focus({ preventScroll: false });
  }, [restoreIndex]);
  return <>
    <div className={styles.intro}><span className={styles.eyebrow}>THE WORK, IN ONE PLACE</span><h2>{profileProjects.length} projects.<br className={styles.mobileBreak} /> Real problems solved.</h2><p>Websites, business platforms, and applications. Explore the work behind each one.</p></div>
    <div className={styles.filters} role="group" aria-label="Filter projects by service">
      {[{ id: null, name: "All projects", short: "All projects" }, ...serviceCategories].map(category => {
        const count = category.id === null ? profileProjects.length : profileProjects.filter(project => (project.services as readonly string[]).includes(category.id!)).length;
        return <HoverBorderGradient key={category.id ?? "all"} type="button" paused={paused} aria-pressed={filter === category.id} aria-label={`Filter by ${category.name}`} onClick={() => onFilter(category.id)} containerClassName={styles.filterButton} className={styles.filterBody}>{category.short}<span>{count}</span></HoverBorderGradient>;
      })}
    </div>
    <p className={styles.resultCount} role="status">{filter === null ? `All ${profileProjects.length} projects` : `${profileProjects.filter(project => (project.services as readonly string[]).includes(filter)).length} projects · ${getServiceCategory(filter).name}`}</p>
    <motion.ul ref={listRef} className={styles.list} aria-label={filter ? getServiceCategory(filter).name + " projects" : `All ${profileProjects.length} projects`}
      variants={{ hidden: {}, visible: { transition: { delayChildren: paused ? 0 : 0.08, staggerChildren: paused ? 0 : 0.025 } } }} initial="hidden" animate="visible">
      {profileProjects.map((project, index) => {
        if (filter && !(project.services as readonly string[]).includes(filter)) return null;
        const presentation = projectPresentations[project.id];
        return <motion.li key={project.id} variants={{ hidden: studioPanelStart, visible: { ...studioPanelVisible, transition: { duration: paused ? 0 : 0.45, ease: studioEase } } }}>
          <HoverBorderGradient type="button" paused={paused} duration={0.8} onClick={() => onSelect(index)} aria-label={`Explore ${project.name}`} data-project-index={index} containerClassName={styles.projectButton} className={styles.projectButtonBody}>
            <span className={styles.projectText}><span className={styles.projectMeta}><span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>{presentation.category}</span><strong>{project.name}</strong><span className={styles.rowServices}>{project.services.map(id => <span key={id}>{getServiceCategory(id).short}</span>)}</span></span>
            <span className={styles.arrow} aria-hidden="true"><IconArrowUpRight size={17} /></span>
          </HoverBorderGradient>
        </motion.li>;
      })}
    </motion.ul>
  </>;
}

function ProjectDetails({ project, onBack, paused }: { project: Project; onBack: () => void; paused: boolean }) {
  const backRef = useRef<HTMLDivElement>(null);
  const presentation = projectPresentations[project.id];
  const external = project.href?.startsWith("http");
  useEffect(() => { backRef.current?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true }); }, []);
  return <>
    <div ref={backRef} className={styles.backWrap}><HoverBorderGradient type="button" onClick={onBack} paused={paused} containerClassName={styles.back} className={styles.backBody}><IconArrowLeft size={16} aria-hidden="true" />All projects</HoverBorderGradient></div>
    <div className={styles.detailLayout}>
      <div className={styles.cover}><ProjectWebsitePreview project={project} paused={paused} compact /></div>
      <div className={styles.detailCopy}><span className={styles.eyebrow}>{presentation.category} <span aria-hidden="true">/</span> {String(profileProjects.findIndex(item => item.id === project.id) + 1).padStart(2, "0")}</span><h2>{project.name}</h2><p>{project.description}</p>
        {"contribution" in project && <><h3>MY CONTRIBUTION</h3><p className={styles.contribution}><strong>{project.contribution.role}</strong><br />{project.contribution.scope}</p></>}
        <h3>SERVICES DELIVERED</h3><ul className={styles.tags} aria-label="Project services">{project.services.map(id => <li key={id}>{getServiceCategory(id).name}</li>)}</ul>
        <h3>BUILT WITH</h3><ul className={styles.tags} aria-label="Project technologies">{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
        <HoverBorderGradient as={Link} href={getProjectPath(project)} paused={paused} containerClassName={styles.visit} className={styles.visitBody}>Explore full project<IconArrowUpRight size={17} aria-hidden="true" /></HoverBorderGradient>
        {external && <Link href={project.href} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>Visit live project<IconArrowUpRight size={15} aria-hidden="true" /></Link>}
      </div>
    </div>
  </>;
}

export default function ProjectMenu({ selectedIndex, onSelect, paused }: Props) {
  const [lastSelected, setLastSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState<ServiceId | null>(null);
  const select = (index: number | null) => { if (index !== null) setLastSelected(index); onSelect(index); };
  return <AnimatePresence mode="wait">
    <motion.div key={selectedIndex ?? "collection"} className={styles.scrollContent} data-project-menu-view={selectedIndex === null ? "collection" : "detail"}
      initial={paused ? false : { opacity: 0, y: 12, filter: "blur(3px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -8, filter: "blur(2px)", transition: { duration: paused ? 0 : 0.16, ease: studioExitEase } }}
      transition={{ duration: paused ? 0 : 0.35, ease: studioEase }}>
      {selectedIndex === null ? <ProjectCollection onSelect={select} paused={paused} restoreIndex={lastSelected} filter={filter} onFilter={setFilter} /> : <ProjectDetails project={profileProjects[selectedIndex]} onBack={() => select(null)} paused={paused} />}
    </motion.div>
  </AnimatePresence>;
}
