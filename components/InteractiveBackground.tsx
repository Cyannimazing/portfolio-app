"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { BackgroundRippleEffect, type RippleCell } from "@/components/ui/background-ripple-effect";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import styles from "./InteractiveBackground.module.css";

function subscribeToViewport(onChange: () => void) {
  window.addEventListener("resize", onChange, { passive: true });
  return () => window.removeEventListener("resize", onChange);
}
function viewportSnapshot() { return `${window.innerWidth}:${window.innerHeight}`; }
function serverViewportSnapshot() { return "0:0"; }

function fieldGeometry(viewport: string) {
  const [width, height] = viewport.split(":").map(Number);
  const limit = width < 768 ? 90 : 240;
  let cellSize = width < 768 ? 76 : 96;
  let cols = Math.ceil(width / cellSize);
  let rows = Math.ceil(height / cellSize);
  while (cols * rows > limit) {
    cellSize += 8;
    cols = Math.ceil(width / cellSize);
    rows = Math.ceil(height / cellSize);
  }
  return { width, height, rows, cols, cellSize, offsetX: (width - cols * cellSize) / 2 };
}

type FieldStyle = CSSProperties & { "--field-cell-size": string; "--field-offset-x": string };

export default function InteractiveBackground() {
  const viewport = useSyncExternalStore(subscribeToViewport, viewportSnapshot, serverViewportSnapshot);
  const geometry = useMemo(() => fieldGeometry(viewport), [viewport]);
  const reducedMotion = useMotionPreference();
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [ripple, setRipple] = useState<{ cell: RippleCell | null; key: number }>({ cell: null, key: 0 });

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background || !geometry.width) return;
    let paused = true;
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let lastRipple = -Infinity;

    const hidePointer = () => { background.dataset.pointer = "false"; };
    const checkPause = () => {
      paused = reducedMotion || document.visibilityState === "hidden"
        || Boolean(document.querySelector('[aria-modal="true"]'))
        || Boolean(document.querySelector('[data-route-transition]:not([data-phase="idle"])'))
        || ["opening", "covering", "revealing"].includes(document.documentElement.dataset.pageTransition ?? "");
      background.dataset.paused = String(paused);
      if (paused) {
        hidePointer();
        cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
      }
    };
    const pointerMove = (event: PointerEvent) => {
      if (paused || event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        background.style.setProperty("--pointer-x", `${pointerX}px`);
        background.style.setProperty("--pointer-y", `${pointerY}px`);
        background.dataset.pointer = "true";
        pointerFrame = 0;
      });
    };
    const pointerDown = (event: PointerEvent) => {
      if (paused || !event.isPrimary || event.button !== 0) return;
      const now = performance.now();
      if (now - lastRipple < 180) return;
      lastRipple = now;
      const row = Math.min(geometry.rows - 1, Math.max(0, Math.floor(event.clientY / geometry.cellSize)));
      const col = Math.min(geometry.cols - 1, Math.max(0, Math.floor((event.clientX - geometry.offsetX) / geometry.cellSize)));
      setRipple(previous => ({ cell: { row, col }, key: previous.key + 1 }));
    };
    const pointerOut = (event: PointerEvent) => { if (!event.relatedTarget) hidePointer(); };
    const observer = new MutationObserver(checkPause);
    observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-page-transition", "data-phase", "aria-modal"] });
    checkPause();
    window.addEventListener("pointermove", pointerMove, { passive: true });
    window.addEventListener("pointerdown", pointerDown, { passive: true });
    window.addEventListener("pointerout", pointerOut, { passive: true });
    window.addEventListener("blur", hidePointer);
    document.addEventListener("visibilitychange", checkPause);
    return () => {
      cancelAnimationFrame(pointerFrame);
      observer.disconnect();
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointerout", pointerOut);
      window.removeEventListener("blur", hidePointer);
      document.removeEventListener("visibilitychange", checkPause);
    };
  }, [geometry, reducedMotion]);

  const style: FieldStyle = { "--field-cell-size": `${geometry.cellSize}px`, "--field-offset-x": `${geometry.offsetX}px` };
  return <div ref={backgroundRef} className={styles.background} style={style} data-interactive-background data-paused="true" data-pointer="false" aria-hidden="true">
    {geometry.width > 0 && <BackgroundRippleEffect rows={geometry.rows} cols={geometry.cols} cellSize={geometry.cellSize}
      clickedCell={ripple.cell} rippleKey={ripple.key} className={styles.grid} cellClassName={styles.cell} />}
    <div className={styles.pointerGrid} />
  </div>;
}
