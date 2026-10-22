"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useMotionPreference } from "@/hooks/use-motion-preference";
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
  const [scope, setScope] = useState<CurtainScope>(() => usesSidebar(pathname) ? "content" : "page");
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
    const finish = (focusHeading = true) => {
      pendingPath.current = null;
      pendingDestination.current = null;
      changePhase("idle");
      changeScope(usesSidebar(pathname) ? "content" : "page");
      const heading = main?.querySelector<HTMLElement>("h1");
      if (heading && focusHeading) { heading.setAttribute("tabindex", "-1"); heading.focus({ preventScroll: true }); }
    };
    const sourcePath = previousPath.current;
    previousPath.current = pathname;
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
      } else finish(Boolean(pendingPath.current));
    } else if (phaseRef.current === "opening") {
      schedule(() => {
        changePhase("revealing");
        schedule(() => finish(Boolean(pendingPath.current)), 520);
      }, 80);
    } else if (phaseRef.current === "revealing") {
      schedule(() => finish(Boolean(pendingPath.current)), 520);
    // This effect runs after the new route's DOM is committed.
    } else if (pendingPath.current && pathname !== pendingPath.current) {
      schedule(() => {
        changePhase("revealing");
        schedule(finish, 520);
      }, 60);
    }
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
      if (main) main.inert = false;
      document.querySelectorAll<HTMLElement>(".studio-navigation").forEach(navigation => { navigation.inert = false; });
      delete document.documentElement.dataset.pageTransition;
    };
  }, [pathname, reduced, router]);

  return <>{children}<div className={styles.curtain} data-route-transition data-phase={phase} data-scope={scope} aria-hidden="true"><BentoGrid className={styles.panels}>{[0, 1, 2].map(index => <BentoGridItem key={index} className={styles.panel} />)}</BentoGrid></div><noscript><style>{'[data-route-transition] { display: none !important; } #main-content * { animation: none !important; transition: none !important; } #main-content [data-entered="false"] { opacity: 1 !important; transform: none !important; filter: none !important; }'}</style></noscript></>;
}
