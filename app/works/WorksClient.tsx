"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconArrowRight, IconArrowUpRight, IconBrowser, IconChevronLeft, IconChevronRight, IconLayoutGrid } from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Carousel from "@/components/ui/carousel";
import ProjectWebsitePreview from "@/components/ProjectWebsitePreview";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import { profileProjects } from "@/lib/profile-projects";
import { projectPresentations } from "@/lib/project-presentations";
import { getProjectLiveUrl, getProjectPath, projectStories, type PortfolioProject } from "@/lib/project-stories";
import { projectSelectionEvent, readProjectSelection, rememberProjectCollection, selectProject } from "@/lib/project-selection";
import { getServiceCategory, serviceCategories, type ServiceId } from "@/lib/service-categories";
import styles from "./Works.module.css";

type View = "single" | "grid";
function subscribe(onChange: () => void) {
  const events = ["popstate", "portfolio-project-navigation", projectSelectionEvent];
  events.forEach(event => window.addEventListener(event, onChange));
  return () => events.forEach(event => window.removeEventListener(event, onChange));
}
const readQuery = () => window.location.search;
const serverQuery = () => "";
const serverSelection = () => profileProjects[0].id;
const hasService = (project: PortfolioProject, service: ServiceId | null) => !service || (project.services as readonly string[]).includes(service);

function ProjectCaption({ project, paused }: { project: PortfolioProject; paused: boolean }) {
  const liveUrl = getProjectLiveUrl(project);
  return <div className={styles.caption} data-project-caption><div className={styles.captionText}><span className={styles.category}>{projectPresentations[project.id].category}</span><h2>{project.name}</h2></div>
    <div className={styles.projectActions}><HoverBorderGradient as={Link} href={getProjectPath(project)} paused={paused} containerClassName={styles.detailsButton} className={styles.detailsBody}>Case study<IconArrowRight size={16} aria-hidden="true" /></HoverBorderGradient>{liveUrl && <Link href={liveUrl} target="_blank" rel="noopener noreferrer" className={styles.visit}>Visit site<IconArrowUpRight size={16} aria-hidden="true" /></Link>}</div>
  </div>;
}

export default function WorksClient() {
  const search = useSyncExternalStore(subscribe, readQuery, serverQuery);
  const selectedId = useSyncExternalStore(subscribe, readProjectSelection, serverSelection);
  const query = new URLSearchParams(search);
  const view: View = query.get("view") === "grid" ? "grid" : "single";
  const service = serviceCategories.find(item => item.id === query.get("service"))?.id ?? null;
  const filtered = profileProjects.filter(item => hasService(item, service));
  const current = Math.max(0, filtered.findIndex(item => item.id === selectedId));
  const project = filtered[current];
  const reducedMotion = useMotionPreference();
  const [direction, setDirection] = useState<1 | -1>(1);
  const main = useRef<HTMLElement>(null);
  const navigationFocus = useRef<string | null>(null);
  const paused = reducedMotion;
  useEffect(() => { rememberProjectCollection("/works" + search); }, [search]);
  useEffect(() => {
    if (!navigationFocus.current) return;
    main.current?.querySelector<HTMLButtonElement>('[data-active="true"] [aria-label="' + navigationFocus.current + '"]')?.focus({ preventScroll: true });
    navigationFocus.current = null;
  }, [selectedId]);
  const browse = (index: number, step: 1 | -1) => {
    const target = (index + step + filtered.length) % filtered.length;
    navigationFocus.current = step === 1 ? "Next project" : "Previous project";
    setDirection(step);
    selectProject(filtered[target].id);
  };
  const updateCollection = (change: { view?: View; service?: ServiceId | null }) => {
    const next = new URLSearchParams(search);
    if (change.view) {
      if (change.view === "grid") next.set("view", "grid");
      else next.delete("view");
    }
    if ("service" in change) {
      if (change.service) next.set("service", change.service);
      else next.delete("service");
    }
    const params = next.toString();
    window.history.pushState(null, "", "/works" + (params ? "?" + params : ""));
    window.dispatchEvent(new Event("portfolio-project-navigation"));
  };
  return <main ref={main} className={styles.page} data-project-browser data-view={view} data-motion={paused ? "paused" : "running"}>
    <section className={styles.canvas} aria-label={view === "single" ? "Selected project" : "All projects"}>
      <header className={styles.heading}>
        <div className={styles.headingCopy}>
          <div className={styles.meta}><span className={styles.category}>SELECTED WORK / {profileProjects.length} PROJECTS</span><span className={styles.count}>{view === "single" ? String(current + 1).padStart(2, "0") : String(filtered.length).padStart(2, "0")}<span>{view === "single" ? " / " + String(filtered.length).padStart(2, "0") : " projects"}</span></span></div>
          <h1 tabIndex={-1}>The work.</h1>
          <p>Websites, applications, and systems we helped build.</p>
        </div>
        <div className={styles.headerActions}><div className={styles.viewTabs} role="group" aria-label="Project layout">
          <HoverBorderGradient type="button" paused={paused} onClick={() => updateCollection({ view: "single" })} aria-pressed={view === "single"} containerClassName={styles.viewTab} className={styles.tabBody}><IconBrowser size={16} aria-hidden="true" />Carousel</HoverBorderGradient>
          <HoverBorderGradient type="button" paused={paused} onClick={() => updateCollection({ view: "grid" })} aria-pressed={view === "grid"} containerClassName={styles.viewTab} className={styles.tabBody}><IconLayoutGrid size={16} aria-hidden="true" />Grid</HoverBorderGradient>
        </div></div>
      </header>
      <AnimatePresence mode="wait" initial={false}><motion.div key={view} initial={paused ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: paused ? 0 : .18 }} className={styles.viewContent}>
        {view === "single" ? <div className={styles.deck}>
          <Carousel slides={filtered} selectedIndex={current} direction={direction} autoPlay={false} presentation="gallery" getSlideKey={item => item.slug} paused={paused} className={styles.projectCarousel} ariaLabel="Project showcase" renderSlide={(item, index, active) => <BentoGridItem className={styles.showcaseCard} header={<ProjectWebsitePreview project={item} paused={paused} active={active} retainLive wide navigation={<>
            <HoverBorderGradient type="button" paused={paused} disabled={filtered.length < 2} onClick={() => browse(index, -1)} aria-label="Previous project" data-project-navigation={item.id} containerClassName={styles.backButton} className={styles.navigationBody}><IconChevronLeft size={22} stroke={1.8} aria-hidden="true" /></HoverBorderGradient>
            <HoverBorderGradient type="button" paused={paused} disabled={filtered.length < 2} onClick={() => browse(index, 1)} aria-label="Next project" data-project-navigation={item.id} containerClassName={styles.nextButton} className={styles.navigationBody}><IconChevronRight size={22} stroke={1.8} aria-hidden="true" /></HoverBorderGradient>
          </>}><ProjectCaption project={item} paused={paused} /></ProjectWebsitePreview>} />} />
        </div> : <>
          <div className={styles.filters} role="group" aria-label="Filter projects by service" data-project-filters>
            {[{ id: null, short: "All projects" }, ...serviceCategories].map(item => <HoverBorderGradient key={item.id ?? "all"} type="button" paused={paused} onClick={() => updateCollection({ service: item.id })} aria-pressed={service === item.id} containerClassName={styles.filterButton} className={styles.filterBody}><span>{item.short}</span><span>{profileProjects.filter(project => hasService(project, item.id)).length}</span></HoverBorderGradient>)}
          </div>
          <BentoGrid className={styles.projectGrid}>{filtered.map(item => <BentoGridItem key={item.id} reveal className={styles.gridCard} header={<div className={styles.gridBody}>
          <div className={styles.gridMedia}><ProjectWebsitePreview project={item} paused={paused} compact /><div className={styles.gridCaption}><span className={styles.category}>{projectPresentations[item.id].category}</span><h2>{item.name}</h2></div></div>
          <div className={styles.gridCopy}><p>{projectStories[item.id].summary}</p><ul aria-label={item.name + " services"}>{item.services.map(id => <li key={id}>{getServiceCategory(id).short}</li>)}</ul></div>
          <div className={styles.gridActions}>{getProjectLiveUrl(item) && <Link href={getProjectLiveUrl(item)!} target="_blank" rel="noopener noreferrer" className={styles.visit}>Visit site<IconArrowUpRight size={15} aria-hidden="true" /></Link>}<HoverBorderGradient as={Link} href={getProjectPath(item)} prefetch={false} paused={paused} data-project-index={profileProjects.findIndex(entry => entry.id === item.id)} aria-label={"View " + item.name} containerClassName={styles.gridDetails} className={styles.gridDetailsBody}>Details<IconArrowRight size={15} aria-hidden="true" /></HoverBorderGradient></div>
        </div>} />)}</BentoGrid></>}
      </motion.div></AnimatePresence>
    </section>
    <p className={styles.status} role="status" aria-live="polite">{view === "single" ? project.name + ", project " + (current + 1) + " of " + filtered.length : filtered.length + " projects"}</p>
  </main>;
}
