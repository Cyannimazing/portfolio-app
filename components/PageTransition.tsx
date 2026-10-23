"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import BrandMark from "@/components/BrandMark";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import { studioEase } from "@/lib/studio-motion";
import styles from "./PageTransition.module.css";

type Phase = "opening" | "idle" | "covering" | "revealing";
type CurtainScope = "content" | "page";

function usesSidebar(pathname: string) {
  return ["/", "/works", "/services", "/practice", "/contact"].includes(pathname);
}

// Keep shared navigation stationary; cover the whole page when its layout changes.
// Ordinary anchors retain new-tab, download, hash and external-link behavior.
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useMotionPreference();
  const [phase, setPhase] = useState<Phase>("opening");
  const [scope, setScope] = useState<CurtainScope>("page");
  const [showIntro, setShowIntro] = useState(true);
  const [introBackdrop, setIntroBackdrop] = useState(true);
  const initialOpening = useRef(true);
  const openingStartedAt = useRef<number | null>(null);
  const skipIntro = useRef<(() => void) | null>(null);
  const scopeRef = useRef(scope);
  const phaseRef = useRef<Phase>("opening");
  const pendingPath = useRef<string | null>(null);
  const pendingDestination = useRef<string | null>(null);
  const previousPath = useRef(pathname);
  const timers = useRef<number[]>([]);

  useLayoutEffect(() => {
    const main = document.getElementById("main-content");
    const clearTimers = () => { timers.current.forEach(window.clearTimeout); timers.current = []; };
    const schedule = (callback: () => void, delay: number) => { timers.current.push(window.setTimeout(callback, delay)); };
    const changeScope = (next: CurtainScope) => { scopeRef.current = next; setScope(next); };
    const dismissIntro = () => { initialOpening.current = false; setShowIntro(false); };
    const completeIntro = () => { dismissIntro(); setIntroBackdrop(false); };
    const updateInteraction = (next: Phase) => {
      if (main) main.inert = next !== "idle";
      document.querySelectorAll<HTMLElement>(".studio-navigation").forEach(navigation => {
        navigation.inert = next !== "idle" && scopeRef.current === "page";
      });
    };
    const changePhase = (next: Phase) => {
      phaseRef.current = next;
      document.documentElement.dataset.pageTransition = next;
      updateInteraction(next);
      setPhase(next);
    };
    const finish = (focusContent = true, focusIntro = false) => {
      completeIntro();
      pendingPath.current = null;
      pendingDestination.current = null;
      changePhase("idle");
      changeScope(usesSidebar(pathname) ? "content" : "page");
      const focusTarget = focusIntro ? main : main?.querySelector<HTMLElement>("h1");
      if (focusTarget && focusContent) {
        focusTarget.setAttribute("tabindex", "-1");
        // Let React remove the intro and commit the destination before focus moves.
        schedule(() => { if (phaseRef.current === "idle" && focusTarget.isConnected) focusTarget.focus({ preventScroll: true }); }, 50);
      }
    };
    const sourcePath = previousPath.current;
    previousPath.current = pathname;
    if (sourcePath !== pathname && initialOpening.current) {
      completeIntro();
    }
    if (sourcePath !== pathname && phaseRef.current === "idle") {
      // The router can commit browser-history changes before a popstate
      // listener runs. Cover that commit before the browser paints it.
      pendingPath.current = sourcePath;
      changeScope(usesSidebar(sourcePath) && usesSidebar(pathname) ? "content" : "page");
      changePhase("opening");
    }
    document.documentElement.dataset.pageTransition = phaseRef.current;
    updateInteraction(phaseRef.current);
    if (pendingPath.current && scopeRef.current === "page") {
      document.querySelectorAll<HTMLElement>(".studio-navigation").forEach(navigation => {
        navigation.dataset.transitionArrival = "true";
      });
    }
    // The server-rendered opening curtain hides the first paint. Start content
    // entrances only after it clears, including on direct visits and refreshes.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (pendingDestination.current && pendingPath.current === pathname) {
        // A preference change can cancel the deferred push during cleanup.
        // Complete it immediately and release interaction without animation.
        changePhase("idle");
        router.push(pendingDestination.current);
        schedule(finish, 8000);
      } else {
        const introHadFocus = Boolean(document.activeElement?.closest("[data-brand-intro]"));
        finish(Boolean(pendingPath.current) || introHadFocus, introHadFocus);
      }
    } else if (phaseRef.current === "opening") {
      const isIntro = initialOpening.current && !pendingPath.current;
      if (isIntro && openingStartedAt.current === null) openingStartedAt.current = performance.now();
      const openingDelay = isIntro ? Math.max(0, 3400 - (performance.now() - openingStartedAt.current!)) : 80;
      schedule(() => {
        dismissIntro();
        changePhase("revealing");
        schedule(() => finish(isIntro || Boolean(pendingPath.current), isIntro), 520);
      }, openingDelay);
    } else if (phaseRef.current === "revealing") {
      schedule(() => finish(Boolean(pendingPath.current)), 520);
    // This effect runs after the new route's DOM is committed.
    } else if (pendingPath.current && pathname !== pendingPath.current) {
      schedule(() => {
        changePhase("revealing");
        schedule(finish, 520);
      }, 60);
    }
    skipIntro.current = () => {
      if (!initialOpening.current) return;
      clearTimers();
      dismissIntro();
      changePhase("revealing");
      schedule(() => finish(true, true), 520);
    };
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || reduced) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname || /\.[a-z0-9]+$/i.test(destination.pathname)) return;
      event.preventDefault();
      if (phaseRef.current !== "idle") return;
      clearTimers();
      pendingPath.current = pathname;
      pendingDestination.current = destination.pathname + destination.search + destination.hash;
      // Freeze the curtain width until the destination is fully revealed.
      // Both the outgoing sidebar and the incoming full-width view stay hidden.
      changeScope(usesSidebar(pathname) && usesSidebar(destination.pathname) ? "content" : "page");
      changePhase("covering");
      schedule(() => router.push(destination.pathname + destination.search + destination.hash), 410);
      // A network error must never leave the portfolio covered or inert.
      schedule(finish, 8000);
    };
    const onPopState = () => {
      if (reduced || window.location.pathname === pathname) return;
      clearTimers();
      pendingPath.current = pathname;
      pendingDestination.current = null;
      changeScope(usesSidebar(pathname) && usesSidebar(window.location.pathname) ? "content" : "page");
      // History navigation has already begun; conceal its first paint before
      // revealing the restored route instead of exposing a layout jump.
      changePhase("opening");
      schedule(finish, 8000);
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState, true);
      clearTimers();
      skipIntro.current = null;
      if (main) main.inert = false;
      document.querySelectorAll<HTMLElement>(".studio-navigation").forEach(navigation => { navigation.inert = false; });
      delete document.documentElement.dataset.pageTransition;
    };
  }, [pathname, reduced, router]);

  return <>{children}<div className={styles.curtain} data-route-transition data-phase={phase} data-scope={scope} data-intro={introBackdrop}>
    <div className={styles.panelBackdrop} aria-hidden="true"><BentoGrid className={styles.panels}>{[0, 1, 2].map(index => <BentoGridItem key={index} className={styles.panel} />)}</BentoGrid></div>
    <AnimatePresence>
      {showIntro && phase === "opening" && <motion.div data-brand-intro className={styles.brandIntro} role="dialog" aria-modal="true" aria-label="Cyril AI introduction" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .18, ease: studioEase }} onKeyDown={event => {
        if (event.key === "Tab") { event.preventDefault(); event.currentTarget.querySelector("button")?.focus(); }
        if (event.key === "Escape") skipIntro.current?.();
      }}>
        <div className={styles.brandLockup} aria-hidden="true">
          <motion.div className={styles.introMark} initial={{ x: "var(--intro-mark-shift)" }} animate={{ x: 0 }} transition={{ duration: .75, delay: 1.1, ease: studioEase }}>
            <motion.svg className={styles.introArc} viewBox="0 0 220 220" initial={{ rotate: -120 }} animate={{ rotate: 45 }} transition={{ duration: 1.45, delay: .08, ease: "easeInOut" }}>
              <motion.circle cx="110" cy="110" r="92" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: [0, 1, 1], opacity: [0, .7, 0] }} transition={{ duration: 1.45, delay: .08, times: [0, .72, 1], ease: "easeInOut" }} />
            </motion.svg>
            {[
              { clip: "polygon(0 0, 100% 0, 100% 34%, 0 34%)", x: -150, y: -100, rotate: -70 },
              { clip: "polygon(0 33.5%, 100% 33.5%, 100% 67%, 0 67%)", x: 150, y: -25, rotate: 65 },
              { clip: "polygon(0 66.5%, 100% 66.5%, 100% 100%, 0 100%)", x: -110, y: 100, rotate: -60 },
            ].map((slice, index) => <motion.div key={slice.clip} className={styles.introSlice} style={{ clipPath: slice.clip }} initial={{ opacity: 0, x: slice.x, y: slice.y, rotate: slice.rotate, scale: .78, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, filter: "blur(0px)" }} transition={{ duration: .9, delay: .1 + index * .1, ease: studioEase }}>
              <BrandMark theme="dark" size={160} />
            </motion.div>)}
          </motion.div>
          <motion.div className={styles.introWordmark} initial={{ opacity: 0, x: -24, filter: "blur(4px)", clipPath: "inset(0 100% 0 0)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)", clipPath: "inset(0 0% 0 0)" }} transition={{ duration: .72, delay: 1.25, ease: studioEase }}>Cyril <span>AI</span></motion.div>
          <motion.div className={styles.lockupSweep} initial={{ "--intro-sweep": "180%", opacity: 0 }} animate={{ "--intro-sweep": "-80%", opacity: [0, .65, 0] }} transition={{ duration: .6, delay: 1.9, ease: "easeInOut" }}>
            <span className={styles.introLightSweep} />
            <span className={styles.introWordmarkSweep}>Cyril AI</span>
          </motion.div>
        </div>
        <button type="button" className={styles.skipIntro} autoFocus onClick={() => skipIntro.current?.()}>Skip intro <span aria-hidden="true">↗</span></button>
      </motion.div>}
    </AnimatePresence>
  </div><noscript><style>{'[data-route-transition] { display: none !important; } #main-content * { animation: none !important; transition: none !important; } #main-content [data-entered="false"] { opacity: 1 !important; transform: none !important; filter: none !important; }'}</style></noscript></>;
}
