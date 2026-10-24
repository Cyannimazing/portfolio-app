"use client";

import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import LogoIntro, { logoIntroDuration } from "@/components/LogoIntro";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import { studioEase } from "@/lib/studio-motion";
import { scheduleVisibleTimeout } from "@/lib/visible-timeout";
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
  const [introPrepared, setIntroPrepared] = useState(false);
  const initialOpening = useRef(true);
  const skipIntro = useRef<(() => void) | null>(null);
  const scopeRef = useRef(scope);
  const phaseRef = useRef<Phase>("opening");
  const pendingPath = useRef<string | null>(null);
  const pendingDestination = useRef<string | null>(null);
  const previousPath = useRef(pathname);
  const timers = useRef<number[]>([]);
  const prepareIntro = useCallback(() => {
    if (initialOpening.current && phaseRef.current === "opening") setIntroPrepared(true);
  }, []);
  const completeBrandIntro = useCallback(() => skipIntro.current?.(), []);

  useLayoutEffect(() => {
    const main = document.getElementById("main-content");
    const openingDeadlines = new Set<() => void>();
    const clearTimers = () => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
      openingDeadlines.forEach(cancel => cancel());
      openingDeadlines.clear();
    };
    const schedule = (callback: () => void, delay: number) => { timers.current.push(window.setTimeout(callback, delay)); };
    const scheduleOpening = (callback: () => void, delay: number) => {
      const cancel = scheduleVisibleTimeout(() => { openingDeadlines.delete(cancel); callback(); }, delay);
      openingDeadlines.add(cancel);
    };
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
      if (isIntro && !introPrepared) {
        // Start the brand sequence after its first rendered frame, with a
        // bounded loading fallback so the portfolio can never stay covered.
        scheduleOpening(prepareIntro, 3500);
      } else {
        // The film's ended event normally opens the page. This longer deadline
        // is only a safety net for a player or browser failure.
        const reveal = () => {
          dismissIntro();
          changePhase("revealing");
          schedule(() => finish(isIntro || Boolean(pendingPath.current), isIntro), 520);
        };
        if (isIntro) scheduleOpening(reveal, logoIntroDuration + 6000);
        else schedule(reveal, 80);
      }
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
  }, [pathname, reduced, router, introPrepared, prepareIntro]);

  return <>{children}<div className={styles.curtain} data-route-transition data-phase={phase} data-scope={scope} data-intro={introBackdrop}>
    <div className={styles.panelBackdrop} aria-hidden="true"><BentoGrid className={styles.panels}>{[0, 1, 2].map(index => <BentoGridItem key={index} className={styles.panel} />)}</BentoGrid></div>
    <AnimatePresence>
      {showIntro && phase === "opening" && <motion.div data-brand-intro className={styles.brandIntro} role="dialog" aria-modal="true" aria-label="Cyril AI introduction" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .18, ease: studioEase }} onKeyDown={event => {
        if (event.key === "Tab") { event.currentTarget.dataset.keyboardFocus = "true"; event.preventDefault(); event.currentTarget.querySelector("button")?.focus(); }
        if (event.key === "Escape") skipIntro.current?.();
      }}>
        <LogoIntro onReady={prepareIntro} onComplete={completeBrandIntro} />
        <button type="button" className={styles.introDismiss} aria-label="Continue to portfolio" autoFocus onClick={() => skipIntro.current?.()} />
      </motion.div>}
    </AnimatePresence>
  </div><noscript><style>{'[data-route-transition] { display: none !important; } #main-content * { animation: none !important; transition: none !important; } #main-content [data-entered="false"] { opacity: 1 !important; transform: none !important; filter: none !important; }'}</style></noscript></>;
}
