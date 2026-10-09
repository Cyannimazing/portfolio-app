"use client";

// Aceternity Infinite Moving Cards, adapted with declarative duplicate content
// (no DOM cloning), icon cards, pause controls and reduced-motion support.
// Source: https://ui.aceternity.com/registry/infinite-moving-cards.json
import type { CSSProperties, ReactNode } from "react";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import styles from "./infinite-moving-cards.module.css";

export function InfiniteMovingCards({ items, direction = "left", paused = false }: {
  items: { name: string; icon: ReactNode }[]; direction?: "left" | "right"; paused?: boolean;
}) {
  const reducedMotion = useMotionPreference();
  return <div className={styles.scroller}>
    <div className={styles.track} style={{ "--direction": direction === "right" ? "reverse" : "normal", animationPlayState: reducedMotion || paused ? "paused" : "running" } as CSSProperties}>
      {[0, 1].map(copy => <ul key={copy} className={styles.group} aria-hidden={copy === 1}>{items.map(item => <li key={item.name}><span>{item.icon}</span><strong>{item.name}</strong></li>)}</ul>)}
    </div>
  </div>;
}
