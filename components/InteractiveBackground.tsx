"use client";

import { useSyncExternalStore } from "react";
import { StarsBackground } from "@/components/ui/stars-background";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import styles from "./InteractiveBackground.module.css";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true, attributeFilter: ["data-page-transition", "data-phase", "aria-modal", "inert"] });
  document.addEventListener("visibilitychange", onChange);
  return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onChange); };
}

function backgroundIsActive() {
  const transition = document.querySelector<HTMLElement>("[data-route-transition]")?.dataset.phase ?? document.documentElement.dataset.pageTransition;
  return !document.hidden && (!transition || transition === "idle")
    && !document.getElementById("main-content")?.inert
    && !document.querySelector('[aria-modal="true"]');
}

export default function InteractiveBackground() {
  const active = useSyncExternalStore(subscribe, backgroundIsActive, () => false);
  const reduced = useMotionPreference();
  const running = active && !reduced;
  return <div className={styles.background} data-interactive-background data-paused={!running} aria-hidden="true"><StarsBackground paused={!running} className={styles.field} /></div>;
}
