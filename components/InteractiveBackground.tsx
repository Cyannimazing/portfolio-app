"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import { studioEase } from "@/lib/studio-motion";
import styles from "./InteractiveBackground.module.css";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true, attributeFilter: ["data-page-transition", "data-phase", "aria-modal", "inert"] });
  document.addEventListener("visibilitychange", onChange);
  return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onChange); };
}

function backgroundIsActive() {
  return !document.hidden && document.documentElement.dataset.pageTransition === "idle"
    && !document.getElementById("main-content")?.inert
    && !document.querySelector('[aria-modal="true"]');
}

export default function InteractiveBackground() {
  const active = useSyncExternalStore(subscribe, backgroundIsActive, () => false);
  const reduced = useMotionPreference();
  const running = active && !reduced;
  const pointerX = useMotionValue(-1000), pointerY = useMotionValue(-1000);
  const x = useSpring(pointerX, { stiffness: 180, damping: 30, mass: .7 });
  const y = useSpring(pointerY, { stiffness: 180, damping: 30, mass: .7 });
  const pointerOpacity = useMotionValue(0);
  const [pulse, setPulse] = useState<{ x: number; y: number; id: number } | null>(null);
  const lastPulse = useRef(0);

  useEffect(() => {
    if (!running) return;
    let pointerEntered = false;
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX.set(event.clientX); pointerY.set(event.clientY); pointerOpacity.set(1);
      if (!pointerEntered) { x.jump(event.clientX); y.jump(event.clientY); pointerEntered = true; }
    };
    const leave = () => { pointerOpacity.set(0); pointerEntered = false; };
    const out = (event: PointerEvent) => { if (!event.relatedTarget) leave(); };
    const press = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || (event.target instanceof Element && event.target.closest('input, textarea, select, [role="combobox"]'))) return;
      const now = performance.now();
      if (now - lastPulse.current < 250) return;
      lastPulse.current = now;
      setPulse({ x: event.clientX, y: event.clientY, id: now });
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerout", out, { passive: true });
    window.addEventListener("blur", leave);
    return () => {
      pointerOpacity.set(0);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerout", out);
      window.removeEventListener("blur", leave);
    };
  }, [running, pointerX, pointerY, pointerOpacity, x, y]);

  return <div className={styles.background} data-interactive-background data-paused={!running} aria-hidden="true">
    <Spotlight paused={!running} gradientFirst="var(--studio-ambient-first)" gradientSecond="var(--studio-ambient-second)" gradientThird="var(--studio-ambient-third)" duration={18} xOffset={70} width={780} height={1500} smallWidth={180} translateY={-500} />
    <motion.div className={styles.pointerLight} data-background-pointer style={{ x, y, opacity: pointerOpacity }} />
    <AnimatePresence>
      {running && pulse && <motion.span key={pulse.id} className={styles.pulse} data-background-pulse style={{ left: pulse.x, top: pulse.y }} initial={{ scale: .4, opacity: .7 }} animate={{ scale: 18, opacity: 0 }} exit={{ opacity: 0, transition: { duration: reduced ? 0 : .18 } }} transition={{ duration: 1.1, ease: studioEase }} />}
    </AnimatePresence>
  </div>;
}
