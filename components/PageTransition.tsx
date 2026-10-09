"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import styles from "./PageTransition.module.css";

type Phase = "opening" | "idle" | "covering" | "revealing";

// Keep the navigation stationary while the content passes through one curtain.
// Ordinary anchors retain new-tab, download, hash and external-link behavior.
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useMotionPreference();
  const [phase, setPhase] = useState<Phase>("opening");
  const phaseRef = useRef<Phase>("opening");
  const pendingPath = useRef<string | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const main = document.getElementById("main-content");
    const clearTimers = () => { timers.current.forEach(window.clearTimeout); timers.current = []; };
    const schedule = (callback: () => void, delay: number) => { timers.current.push(window.setTimeout(callback, delay)); };
    const changePhase = (next: Phase) => {
      phaseRef.current = next;
      document.documentElement.dataset.pageTransition = next;
      if (main) main.inert = next !== "idle";
      setPhase(next);
    };
    const finish = (focusHeading = true) => {
      pendingPath.current = null;
      changePhase("idle");
      const heading = main?.querySelector<HTMLElement>("h1");
      if (heading && focusHeading) { heading.setAttribute("tabindex", "-1"); heading.focus({ preventScroll: true }); }
    };
    document.documentElement.dataset.pageTransition = phaseRef.current;
    if (main) main.inert = phaseRef.current !== "idle";
    // The server-rendered opening curtain hides the first paint. Start content
    // entrances only after it clears, including on direct visits and refreshes.
    if (phaseRef.current === "opening") {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) finish(false);
      else schedule(() => {
        changePhase("revealing");
        schedule(() => finish(false), 520);
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
      changePhase("covering");
      schedule(() => router.push(destination.pathname + destination.search + destination.hash), 410);
      // A network error must never leave the portfolio covered or inert.
      schedule(finish, 8000);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimers();
      if (main) main.inert = false;
      delete document.documentElement.dataset.pageTransition;
    };
  }, [pathname, reduced, router]);

  return <>{children}<div className={styles.curtain} data-route-transition data-phase={phase} data-sidebar={pathname === "/" || pathname === "/works" || pathname.startsWith("/works/") || pathname === "/services" || pathname === "/practice" || pathname === "/contact"} aria-hidden="true"><BentoGrid className={styles.panels}>{[0, 1, 2].map(index => <BentoGridItem key={index} className={styles.panel} />)}</BentoGrid></div><noscript><style>{'[data-route-transition] { display: none !important; } #main-content * { animation: none !important; transition: none !important; } #main-content [data-entered="false"] { opacity: 1 !important; transform: none !important; filter: none !important; }'}</style></noscript></>;
}
