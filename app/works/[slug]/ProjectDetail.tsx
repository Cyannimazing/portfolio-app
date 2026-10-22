"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { TouchEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowLeft, IconArrowRight, IconArrowUpRight, IconFileText, IconMaximize } from "@tabler/icons-react";
import ProjectPlaceholder from "@/components/ProjectPlaceholder";
import ProjectCaseContent from "@/components/ProjectCaseContent";
import PortfolioActions from "@/components/PortfolioActions";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Modal, ModalBody, useModal } from "@/components/ui/animated-modal";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import { projectDelivery } from "@/lib/project-delivery";
import { toSlug, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import caseStudyStyles from "@/components/ProjectCaseStudy.module.css";
import styles from "./ProjectDetail.module.css";

type GalleryImage = { src: string; alt: string };
type LightboxState = { images: GalleryImage[]; index: number } | null;

export default function ProjectDetail({ project }: { project: Project }) {
  return <Modal><ProjectDetailContent project={project} /></Modal>;
}

function ProjectDetailContent({ project }: { project: Project }) {
  const reduced = useMotionPreference();
  const { setOpen } = useModal();
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const projectKey = `legacy-${toSlug(project.title)}`;
  const galleryImages = (project.subImages ?? []).map(image => ({ src: image.url, alt: image.caption }));
  const images = [
    ...(project.mainImage ? [{ src: project.mainImage, alt: project.description }] : []),
    ...galleryImages,
  ];

  function openGallery(index: number) {
    setLightbox({ images, index });
    setOpen(true);
  }

  return <>
    <ModalBody ariaLabel={`${project.title} image gallery`} className={styles.lightbox} header={<span className={styles.lightboxTitle}>{project.title} / Gallery</span>}>
      {lightbox && <ImageLightbox images={lightbox.images} initialIndex={lightbox.index} reduced={reduced} />}
    </ModalBody>

    <main className={caseStudyStyles.page} data-project-detail data-project-case-study data-motion={reduced ? "paused" : "running"}>
      <section className={cn(caseStudyStyles.preview, styles.hero)} aria-label={`${project.title} preview`}>
        <div className={styles.heroMedia}>
          {project.mainImage ? <button type="button" className={styles.heroImageButton} onClick={() => openGallery(0)} aria-label={`Enlarge ${project.title} preview`}>
            <Image src={project.mainImage} alt={project.title} fill sizes="100vw" priority className={styles.heroImage} />
          </button> : <ProjectPlaceholder name={project.title} />}
        </div>

        <div className={styles.toolbar}>
          <Link href="/works" className={cn(caseStudyStyles.back, styles.back)}><IconArrowLeft size={16} aria-hidden="true" />Back to projects</Link>
          {project.mainImage && <HoverBorderGradient as="button" type="button" paused={reduced} onClick={() => openGallery(0)} aria-label={`Open ${project.title} image gallery`} containerClassName={styles.enlarge} className={styles.enlargeBody}><IconMaximize size={18} aria-hidden="true" /><span>View images</span></HoverBorderGradient>}
        </div>

        <div className={styles.heroContent}>
          <header className={caseStudyStyles.intro}>
            <div>
              <span className={caseStudyStyles.eyebrow}>{project.industry ?? project.type}<span aria-hidden="true"> / </span>{project.year}</span>
              <h1 tabIndex={-1}>{project.title}</h1>
              <p>{project.description}</p>
              {!!project.services?.length && <ul className={caseStudyStyles.tags} aria-label="Project services">{project.services.map(service => <li key={service}>{service}</li>)}</ul>}
            </div>
            {project.liveLink && <HoverBorderGradient as="a" href={project.liveLink} target="_blank" rel="noopener noreferrer" paused={reduced} containerClassName={caseStudyStyles.visit} className={caseStudyStyles.visitBody}>Visit live project<IconArrowUpRight size={18} aria-hidden="true" /></HoverBorderGradient>}
          </header>
        </div>
      </section>

      <ProjectCaseContent challenge={project.challenge ?? ""} solution={project.solution ?? ""} rationale={project.rationale ?? ""} details={projectDelivery[projectKey]} technologies={project.technologies} />

      {!!project.subImages?.length && <section className={styles.resourceSection} aria-labelledby="project-gallery-heading">
        <span className={caseStudyStyles.sectionEyebrow}>Explore the interface</span>
        <h2 id="project-gallery-heading">Project gallery</h2>
        <div className={styles.gallery}>
          {project.subImages.map((image, index) => <button type="button" key={image.url} className={styles.galleryButton} onClick={() => openGallery(index + (project.mainImage ? 1 : 0))} aria-label={`Enlarge: ${image.caption}`}>
            <span className={styles.galleryImage}>
              <Image src={image.url} alt={image.caption} fill sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw" />
              <span className={styles.galleryZoom} aria-hidden="true"><IconMaximize size={20} /></span>
            </span>
            <span className={styles.galleryCaption}>{image.caption}</span>
          </button>)}
        </div>
      </section>}

      {!!project.pdfReports?.length && <section className={styles.resourceSection} aria-labelledby="project-documents-heading">
        <span className={caseStudyStyles.sectionEyebrow}>See the output</span>
        <h2 id="project-documents-heading">Sample documents</h2>
        <div className={styles.documents}>
          {project.pdfReports.map(document => <HoverBorderGradient as="a" key={document.url} href={document.url} target="_blank" rel="noopener noreferrer" paused={reduced} containerClassName={styles.document} className={styles.documentBody}>
            <IconFileText size={24} stroke={1.5} aria-hidden="true" />
            <span><strong>{document.name}</strong><span>View PDF document</span></span>
            <IconArrowUpRight size={19} aria-hidden="true" />
          </HoverBorderGradient>)}
        </div>
      </section>}

      {(project.demoCredentials || project.githubLink) && <section className={styles.resourceSection} aria-labelledby="project-access-heading">
        <span className={caseStudyStyles.sectionEyebrow}>Explore the project</span>
        <h2 id="project-access-heading">{project.demoCredentials ? "Demo access" : "Source code"}</h2>
        {project.demoCredentials && <dl className={styles.credentials}>
          <div><dt>Email</dt><dd>{project.demoCredentials.email}</dd></div>
          <div><dt>Password</dt><dd>{project.demoCredentials.password}</dd></div>
        </dl>}
        {project.githubLink && <HoverBorderGradient as="a" href={project.githubLink} target="_blank" rel="noopener noreferrer" paused={reduced} containerClassName={styles.sourceLink} className={styles.sourceLinkBody}>View on GitHub<IconArrowUpRight size={18} aria-hidden="true" /></HoverBorderGradient>}
      </section>}

      <footer className={caseStudyStyles.footer}><p>What can we build together?</p><PortfolioActions paused={reduced} /></footer>
    </main>
  </>;
}

function ImageLightbox({ images, initialIndex, reduced }: { images: GalleryImage[]; initialIndex: number; reduced: boolean }) {
  const [current, setCurrent] = useState(initialIndex);
  const total = images.length;
  const image = images[current];
  const previous = useCallback(() => setCurrent(index => (index - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent(index => (index + 1) % total), [total]);
  const touchStartX = useRef(0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
      if (event.key === "ArrowRight") { event.preventDefault(); next(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previous, next]);

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const delta = touchStartX.current - event.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) next();
      else previous();
    }
  }

  return <div className={styles.lightboxContent}>
    <div className={styles.lightboxImageArea} onTouchStart={event => { touchStartX.current = event.touches[0].clientX; }} onTouchEnd={handleTouchEnd}>
      <AnimatePresence mode="wait">
        <motion.img key={current} src={image.src} alt={image.alt} initial={reduced ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? undefined : { opacity: 0, x: -12 }} transition={{ duration: reduced ? 0 : 0.2 }} className={styles.lightboxImage} draggable={false} />
      </AnimatePresence>
    </div>
    <div className={styles.lightboxFooter}>
      <p className={styles.lightboxCaption} aria-live="polite">{image.alt}</p>
      {total > 1 && <div className={styles.lightboxNavigation} aria-label="Gallery navigation">
        <HoverBorderGradient as="button" type="button" paused={reduced} onClick={previous} aria-label="Previous image" containerClassName={styles.imageControl} className={styles.imageControlBody}><IconArrowLeft size={20} aria-hidden="true" /></HoverBorderGradient>
        <span className={styles.imageCount} aria-live="polite">{current + 1} / {total}</span>
        <HoverBorderGradient as="button" type="button" paused={reduced} onClick={next} aria-label="Next image" containerClassName={styles.imageControl} className={styles.imageControlBody}><IconArrowRight size={20} aria-hidden="true" /></HoverBorderGradient>
      </div>}
    </div>
  </div>;
}
