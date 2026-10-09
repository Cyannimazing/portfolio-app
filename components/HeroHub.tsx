"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { IconArrowLeft, IconArrowRight, IconArrowUpRight, IconAward, IconCalendarEvent, IconCheck, IconCode, IconDatabase, IconDownload, IconFolder, IconPencil, IconPlugConnected, IconSettings, IconWorld } from "@tabler/icons-react";
import { Modal, ModalBody, useModal } from "@/components/ui/animated-modal";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Carousel from "@/components/ui/carousel";
import { FlipWords } from "@/components/ui/flip-words";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { profileProjects } from "@/lib/profile-projects";
import { type ServiceId } from "@/lib/service-categories";
import { getProjectPath, projectStories } from "@/lib/project-stories";
import { projectPresentations } from "@/lib/project-presentations";
import { toolbox } from "@/lib/toolbox";
import ToolboxCarousel, { ToolIcon } from "@/components/ToolboxCarousel";
import ProjectWebsitePreview from "@/components/ProjectWebsitePreview";
import PortfolioActions from "@/components/PortfolioActions";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import ProjectMenu, { ProjectMenuHeader } from "@/components/ProjectMenu";
import projectMenuStyles from "./ProjectMenu.module.css";
import styles from "./HeroHub.module.css";

// Complete service categories from Services.tsx; professional facts from cyril-profile.md.
const services = [
  { name: "Custom Business Software", short: "Custom software", icon: IconDatabase, heading: "Software around your operations.", description: "Dashboards, POS, booking systems, and internal tools shaped around how your business works.", features: ["Roles & permissions", "Reports & exports", "Connected business data"], stack: "Laravel · Nuxt · Next.js · SQL" },
  { name: "Business Websites", short: "Websites", icon: IconWorld, heading: "Your business, beautifully online.", description: "Responsive websites and storefronts with clear customer journeys, lead capture, and content tools.", features: ["Responsive interfaces", "Contact & booking flows", "Content management"], stack: "Next.js · React · Tailwind CSS" },
  { name: "Content Management Systems", short: "CMS", icon: IconPencil, heading: "Your content. Your control.", description: "Admin tools for managing pages, products, articles, and business information without routine code changes.", features: ["Content editing", "Staff access controls", "Publishing workflows"], stack: "React · Supabase · PostgreSQL" },
  { name: "Booking Systems", short: "Booking", icon: IconCalendarEvent, heading: "From availability to a confirmed booking.", description: "Booking flows for studio spaces and services, including improvements and fixes to Martich Studios' existing reservation system.", features: ["Space & date selection", "Booking agreements", "Deposits & payment flows"], stack: "Next.js · React · Supabase · Stripe" },
  { name: "Integrations & Automation", short: "Integrations", icon: IconPlugConnected, heading: "Good tools. Better together.", description: "Connect payments, authentication, social platforms, and third-party services to your application.", features: ["Stripe payments", "OAuth & Azure AD", "Social & search APIs"], stack: "REST APIs · OAuth · Stripe · Webhooks" },
  { name: "Other Solutions", short: "Other solutions", icon: IconSettings, heading: "More ways to help your product.", description: "Android and connected web work, plus fixes, maintenance, and feature improvements for existing products. This includes CacaoCare's website and mobile fixes, alongside ongoing full-stack improvements across client projects.", features: ["Mobile app improvements", "Bug fixes & maintenance", "Ongoing feature development"], stack: "Java · Android Studio · Laravel · Next.js" },
];
const specialties = ["business websites", "SaaS & internal tools", "mobile applications"];
type Panel = "projects" | "toolbox" | "education" | number;
const serviceGroups: ServiceId[][] = [["business-software"], ["websites"], ["cms"], ["booking"], ["automation"], ["mobile-apps", "support"]];
const serviceProof = serviceGroups.map(ids => {
  const matched = profileProjects.map((project, index) => ({ project, index }))
    .filter(({ project }) => ids.some(id => (project.services as readonly string[]).includes(id)));
  return { names: matched.slice(0, 3).map(({ project }) => project.name).join(" · "), projects: matched.map(({ index }) => index) };
});

const featuredProjects = [8, 9, 12, 13].map(id => {
  const index = profileProjects.findIndex(project => project.id === id);
  const project = profileProjects[index];
  return { project, index, name: project.name, category: projectPresentations[id].category, description: projectStories[id].summary, stack: project.technologies.slice(0, 3).join(" · ") };
});

function Heading({ icon, children, count, onClick }: { icon: ReactNode; children: ReactNode; count?: string; onClick?: () => void }) {
  const content = <><span className={styles.tileIcon}>{icon}</span><span>{children}</span>{count && <span className={styles.tileCount}>{count}</span>}{onClick && <IconArrowUpRight size={15} className={styles.tileArrow} aria-hidden="true" />}</>;
  return <h2 className={styles.tileHeading}>{onClick ? <button type="button" onClick={onClick}>{content}</button> : <span>{content}</span>}</h2>;
}
function Glow({ enabled }: { enabled: boolean }) { return <GlowingEffect disabled={!enabled} spread={45} proximity={40} inactiveZone={0.15} movementDuration={0.7} borderWidth={2} />; }

function HubContent() {
  const reducedMotion = useMotionPreference();
  const [panel, setPanel] = useState<Panel>("projects");
  const [libraryPage, setLibraryPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const { open, setOpen } = useModal();
  const motionEnabled = !reducedMotion && !open;
  const showPanel = (value: Panel) => { setPanel(value); setSelectedProject(null); setLibraryPage(0); setOpen(true); };
  const service = typeof panel === "number" ? services[panel] : null;

  return <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
    <section className={styles.hero} aria-labelledby="hero-heading" data-hero="aceternity" data-motion={motionEnabled ? "running" : "paused"} inert={open}>
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.content}>
        <header className={styles.header}>
          <div><p className={styles.eyebrow}>IDEAS, INTERFACES & EVERYTHING IN BETWEEN</p><h1 id="hero-heading"><span className={styles.headingLead}>Your next idea.</span><br className={styles.headingBreak} /> <span className={styles.headingFinish}>Fully built.</span></h1><p className={styles.intro}>Full stack development for <span aria-hidden="true"><FlipWords words={specialties} paused={!motionEnabled} duration={4000} className={styles.specialties} /></span><span className="sr-only">business websites, SaaS, internal tools, and mobile applications.</span><span className={styles.introEnd}> From data to the details.</span></p></div>
          <div className={styles.headerActions}><PortfolioActions paused={!motionEnabled} /></div>
        </header>

        <BentoGrid className={styles.hubGrid}>
          <BentoGridItem reveal className={`${styles.tile} ${styles.workTile}`} header={<div className={styles.tileContent}>
            <Glow enabled={motionEnabled} />
            <Heading icon={<IconFolder size={18} aria-hidden="true" />} count={String(profileProjects.length)} onClick={() => showPanel("projects")}>The work</Heading>
            <p className={styles.tileDescription}>Business websites, platforms, and applications. All {profileProjects.length} projects, in one place.</p>
            <Carousel slides={featuredProjects} paused={!motionEnabled} renderSlide={(item, _index, active) =>
              <div className={styles.featuredLayout}>
                <CardContainer disabled tilt={0} containerClassName={styles.featuredContainer} className={styles.previewStage}>
                  <CardBody className={styles.previewBody}><CardItem as="div" translateZ={0} className={styles.featuredStage} data-presentation>
                    <ProjectWebsitePreview project={item.project} paused={reducedMotion} active={active} />
                  </CardItem></CardBody>
                </CardContainer>
                <div className={styles.projectStory}><span className={styles.featuredCategory}>{item.category}</span><h3>{item.name}</h3><p>{item.description}</p><div className={styles.projectTags}>{item.stack.split(" · ").map(tag => <span key={tag}>{tag}</span>)}</div><HoverBorderGradient as={Link} href={getProjectPath(item.project)} paused={!motionEnabled} containerClassName={styles.projectAction} className={styles.projectActionInner}>Explore project <IconArrowUpRight size={15} aria-hidden="true" /></HoverBorderGradient></div>
              </div>
            } />
          </div>} />

          <BentoGridItem reveal className={`${styles.tile} ${styles.servicesTile}`} header={<div className={styles.tileContent}>
            <Glow enabled={motionEnabled} />
            <Heading icon={<IconCode size={18} aria-hidden="true" />} count="06">How I can help</Heading>
            <p className={styles.tileDescription}>From the first idea to long after launch. Pick a service to explore.</p>
            <div className={styles.serviceGrid}>{services.map((item, index) => <button key={item.name} type="button" onClick={() => showPanel(index)} aria-label={`Explore ${item.name}`}><span className={styles.serviceIcon}><item.icon size={19} stroke={1.5} aria-hidden="true" /></span><span><span className={styles.serviceFull}>{item.name}</span><span className={styles.serviceShort}>{item.short}</span><small className={styles.serviceExample}>{serviceProof[index].names}</small></span><IconArrowUpRight size={13} aria-hidden="true" /></button>)}</div>
            <p className={styles.servicesFootnote}>One developer. The whole stack.</p>
          </div>} />

          <BentoGridItem reveal className={`${styles.tile} ${styles.experienceTile}`} header={<div className={styles.tileContent}>
            <Glow enabled={motionEnabled} />
            <Heading icon={<IconCode size={18} aria-hidden="true" />} count={String(toolbox.length)} onClick={() => showPanel("toolbox")}>My toolbox</Heading>
            <p className={styles.tileDescription}>Frameworks, databases, integrations, and the tools behind the work.</p>
            <ToolboxCarousel paused={!motionEnabled} />
          </div>} />

          <BentoGridItem reveal className={`${styles.tile} ${styles.educationTile}`} header={<div className={styles.tileContent}>
            <Glow enabled={motionEnabled} />
            <Heading icon={<IconAward size={18} aria-hidden="true" />} onClick={() => showPanel("education")}>The foundation</Heading>
            <button type="button" className={styles.educationBody} onClick={() => showPanel("education")} aria-label="View education and qualifications"><span className={styles.medallion}><IconAward size={37} stroke={1.4} aria-hidden="true" /><i aria-hidden="true" /></span><span><strong>Cum Laude</strong><span>BS Information Technology</span><small>STI College Davao · 2026</small></span></button>
          </div>} />

          <BentoGridItem reveal className={`${styles.tile} ${styles.integrationTile}`} header={<div className={styles.tileContent}>
            <Glow enabled={motionEnabled} />
            <Heading icon={<IconPlugConnected size={18} aria-hidden="true" />} onClick={() => showPanel(4)}>Connected tools</Heading>
            <p className={styles.tileDescription}>APIs that bring your tools together.</p>
            <button type="button" className={styles.integrationVisual} onClick={() => showPanel(4)} aria-label="Explore API integrations and automation"><span className={styles.integrationHub}><IconPlugConnected size={25} stroke={1.5} aria-hidden="true" /></span><span className={`${styles.integrationPill} ${styles.stripe}`}>Stripe<i /></span><span className={`${styles.integrationPill} ${styles.oauth}`}>OAuth<i /></span><span className={`${styles.integrationPill} ${styles.azure}`}>Azure AD<i /></span><span className={`${styles.integrationPill} ${styles.api}`}>REST APIs<i /></span><span className={styles.connections} aria-hidden="true" /></button>
          </div>} />
        </BentoGrid>

      </div>
    </section>

    <ModalBody className={`${styles.detailModal} ${service ? styles.serviceModal : ""} ${panel === "projects" ? projectMenuStyles.modal : ""}`} header={panel === "projects" ? <ProjectMenuHeader /> : undefined} motionDisabled={reducedMotion} ariaLabel={panel === "projects" ? "Project collection" : service?.name ?? (panel === "education" ? "Education and qualifications" : "Complete toolbox")}>
      {panel === "projects" ? <ProjectMenu selectedIndex={selectedProject} onSelect={setSelectedProject} paused={reducedMotion} /> : <div className={styles.modalContent}>
        {service && <div className={styles.serviceDetailLayout}><div><span className={styles.serviceBadge}><service.icon size={15} aria-hidden="true" />{service.heading}</span><h2>{service.name}</h2><p className={styles.projectDescription}>{service.description}</p><h3 className={styles.detailLabel}>WHAT YOU GET</h3><ul className={styles.features}>{service.features.map(feature => <li key={feature}><IconCheck size={15} aria-hidden="true" />{feature}</li>)}</ul><h3 className={styles.detailLabel}>TECH STACK</h3><div className={styles.technologyTags}>{service.stack.split(" · ").map(tag => <span key={tag}>{tag}</span>)}</div><h3 className={styles.detailLabel}>BUILT IN THESE PROJECTS</h3><div className={styles.serviceProof}>{serviceProof[Number(panel)].projects.map(index => <button key={index} type="button" onClick={() => { setPanel("projects"); setSelectedProject(index); }}>{profileProjects[index].name}<IconArrowUpRight size={12} aria-hidden="true" /></button>)}</div><HoverBorderGradient as={Link} href="/contact" containerClassName={styles.projectAction} className={styles.projectActionInner}>Book a discovery call <IconArrowUpRight size={15} aria-hidden="true" /></HoverBorderGradient></div><div className={styles.serviceDetailVisual} aria-hidden="true"><GlowingEffect spread={40} proximity={80} borderWidth={1} disabled={reducedMotion} /><span><service.icon size={48} stroke={1.3} /></span><i /><b /></div></div>}
        {panel === "toolbox" && <><span className={styles.modalEyebrow}>THE TOOLS BEHIND THE WORK</span><h2>My full toolbox.</h2><div className={styles.toolsGrid}>{toolbox.slice(libraryPage * 12, libraryPage * 12 + 12).map(name => <span key={name}><ToolIcon name={name} />{name}</span>)}</div><div className={styles.pagination}><button type="button" disabled={libraryPage === 0} onClick={() => setLibraryPage(value => value - 1)} aria-label="Previous tools"><IconArrowLeft size={17} aria-hidden="true" /></button><span>Page {libraryPage + 1} of {Math.ceil(toolbox.length / 12)} · {toolbox.length} tools & skills</span><button type="button" disabled={libraryPage === Math.ceil(toolbox.length / 12) - 1} onClick={() => setLibraryPage(value => value + 1)} aria-label="Next tools"><IconArrowRight size={17} aria-hidden="true" /></button></div></>}
        {panel === "education" && <><span className={styles.modalEyebrow}>EDUCATION & QUALIFICATIONS</span><span className={styles.serviceDetailIcon}><IconAward size={30} aria-hidden="true" /></span><h2>Bachelor of Science in Information Technology</h2><h3>STI College Davao · 2022–2026</h3><p className={styles.projectDescription}>Graduated Cum Laude with a GWA of 1.39.</p><div className={styles.technologyTags}><span>Full Stack Developer</span><span>34 saved professional skills</span></div><a href="/cv.pdf" download="Cyril-Jian-Narvasa-CV.pdf" className={styles.modalPrimary}>Download CV <IconDownload size={17} aria-hidden="true" /></a></>}
      </div>}
    </ModalBody>
  </MotionConfig>;
}
export default function HeroHub() { return <Modal><HubContent /></Modal>; }
