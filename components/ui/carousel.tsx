"use client";

// Aceternity Carousel's sliding track, adapted for one split project at a time,
// automatic homepage slides, pause on hover/focus and reduced motion. The full
// Projects browser supplies a controlled selection with its own Back/Next UI.
// Source: https://ui.aceternity.com/registry/carousel.json
import { forwardRef, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import { studioEase } from "@/lib/studio-motion";
import { cn } from "@/lib/utils";
import styles from "./carousel.module.css";

// An outgoing slide remains visible only for its transition. Immediately make
// its controls inert so rapid navigation never exposes duplicate actions.
const ShowcaseSlide = forwardRef<HTMLDivElement, { children: ReactNode; label: string; direction: 1 | -1; paused: boolean }>(function ShowcaseSlide({ children, label, direction, paused }, ref) {
  const present = useIsPresent();
  return <motion.div ref={ref} className={styles.showcaseSlide} role="group" aria-roledescription="slide" aria-label={label} aria-hidden={!present} inert={!present}
    custom={direction} variants={{ enter: (travel: number) => ({ opacity: 0, x: `${travel * 100}%` }), visible: { opacity: 1, x: 0 }, leave: (travel: number) => ({ opacity: 0, x: `${-travel * 100}%` }) }}
    initial={paused ? false : "enter"} animate="visible" exit="leave" transition={{ duration: paused ? 0 : 0.5, ease: studioEase }}>
    {children}
  </motion.div>;
});

// Persistent cards: a preview seen at the edge moves into the center without
// remounting its iframe. Fade only at the shared viewport edges.
function GalleryCarousel<T>({ slides, current, renderSlide, getSlideKey, paused, className, ariaLabel }: { slides: T[]; current: number; renderSlide: (slide: T, index: number, active: boolean) => ReactNode; getSlideKey?: (slide: T) => string | number; paused: boolean; className?: string; ariaLabel: string }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [gap, setGap] = useState(16);
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const mobile = window.innerWidth < 1024;
      const frameWidth = mobile ? entry.contentRect.width - 44 : Math.min(entry.contentRect.width - 112, (entry.contentRect.height - 34) * 16 / 9);
      setWidth(Math.max(0, frameWidth));
      setGap(parseFloat(getComputedStyle(element).getPropertyValue("--studio-grid-gap")) || 16);
      element.closest<HTMLElement>("[data-project-browser]")?.style.setProperty("--project-frame-width", Math.max(0, frameWidth) + "px");
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={viewport} className={cn(styles.gallery, className)} role="region" aria-roledescription="carousel" aria-label={ariaLabel}>
    {width > 0 && slides.map((slide, index) => {
      const half = Math.floor(slides.length / 2);
      const offset = (index - current + half + slides.length) % slides.length - half;
      const distance = Math.abs(offset);
      const travel = Math.sign(offset) * (width * .94 + gap + Math.max(0, distance - 1) * (width * .88 + gap));
      return <motion.div key={getSlideKey?.(slide) ?? index} className={styles.gallerySlide} style={{ width }} role="group" aria-roledescription="slide" aria-label={"Project " + (index + 1) + " of " + slides.length} data-active={index === current} aria-hidden={index !== current} inert={index !== current}
        initial={false} animate={{ x: distance ? travel : 0, scale: distance ? .88 : 1, opacity: distance ? .5 : 1 }} transition={{ duration: paused ? 0 : .75, ease: [.22, 1, .36, 1] }}>
        {renderSlide(slide, index, distance <= 1)}
      </motion.div>;
    })}
  </div>;
}

export default function Carousel<T>({ slides, renderSlide, paused = false, collectionAction, selectedIndex, direction = 1, autoPlay = true, presentation = "track", className, getSlideKey, ariaLabel = "Featured projects" }: {
  slides: T[]; renderSlide: (slide: T, index: number, active: boolean) => ReactNode; paused?: boolean; collectionAction?: ReactNode;
  selectedIndex?: number; direction?: 1 | -1; autoPlay?: boolean; presentation?: "track" | "showcase" | "gallery";
  className?: string; getSlideKey?: (slide: T) => string | number; ariaLabel?: string;
}) {
  const [internalCurrent, setCurrent] = useState(0);
  const current = selectedIndex ?? internalCurrent;
  const [interacting, setInteracting] = useState(false);
  const reducedMotion = useMotionPreference();

  useEffect(() => {
    if (!autoPlay || selectedIndex !== undefined || paused || reducedMotion || interacting || slides.length < 2) return;
    const timer = window.setTimeout(() => setCurrent(value => (value + 1) % slides.length), 6500);
    return () => window.clearTimeout(timer);
  }, [current, paused, reducedMotion, interacting, slides.length, autoPlay, selectedIndex]);

  if (!slides.length) return null;
  if (presentation === "gallery") return <GalleryCarousel slides={slides} current={current} renderSlide={renderSlide} getSlideKey={getSlideKey} paused={reducedMotion || paused} className={className} ariaLabel={ariaLabel} />;
  // The project browser mounts one complete slide so its copy sets the natural
  // height and offscreen projects do not load covers or steal keyboard focus.
  if (presentation === "showcase") return <div className={cn(styles.showcase, className)} role="region" aria-roledescription="carousel" aria-label={ariaLabel}>
    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
      <ShowcaseSlide key={getSlideKey?.(slides[current]) ?? current} label={`Project ${current + 1} of ${slides.length}`} direction={direction} paused={reducedMotion || paused}>
        {renderSlide(slides[current], current, true)}
      </ShowcaseSlide>
    </AnimatePresence>
    {collectionAction}
  </div>;

  return <div className={cn(styles.carousel, className)} role="region" aria-roledescription="carousel" aria-label={ariaLabel}
    onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
    onFocus={() => setInteracting(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
    <div className={styles.window}>
      <motion.div className={styles.track} animate={{ x: `-${current * 100}%` }} transition={{ duration: reducedMotion || paused ? 0 : 0.6, ease: studioEase }}>
        {slides.map((slide, index) => <div key={index} className={styles.page} inert={index !== current} aria-hidden={index !== current} role="group" aria-roledescription="slide" aria-label={`Project ${index + 1} of ${slides.length}`}><div className={styles.slide}>{renderSlide(slide, index, index === current)}</div></div>)}
      </motion.div>
    </div>
    {collectionAction && <div className={styles.controls}>{collectionAction}</div>}
  </div>;
}
