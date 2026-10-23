"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import { studioEase } from "@/lib/studio-motion";
import { getPortfolioTheme, getServerPortfolioTheme, setPortfolioTheme, subscribeToPortfolioTheme } from "@/lib/theme-preference";
import styles from "./ThemeSwitcher.module.css";

export default function ThemeSwitcher({ inline = false }: { inline?: boolean }) {
  const pathname = usePathname();
  const theme = useSyncExternalStore(subscribeToPortfolioTheme, getPortfolioTheme, getServerPortfolioTheme);
  const reducedMotion = useMotionPreference();
  const dark = theme === "terminal-dark";
  const sidebarFallback = !inline && ["/", "/works", "/services", "/practice", "/contact"].includes(pathname);

  return <div className={`${styles.switcher}${inline ? ` ${styles.inline}` : ""}${sidebarFallback ? ` ${styles.sidebarFallback}` : ""}`} data-theme-switcher>
    <HoverBorderGradient type="button" role="switch" aria-checked={dark} aria-label="Dark theme" paused={reducedMotion}
      onClick={() => setPortfolioTheme(dark ? "terminal-light" : "terminal-dark")} containerClassName={styles.toggle} className={styles.toggleBody}>
      <AnimatePresence initial={false} mode="wait">
        <motion.span key={dark ? "dark" : "light"} className={styles.icon} aria-hidden="true"
          initial={reducedMotion ? false : { opacity: 0, rotate: -20, scale: 0.9 }} animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, rotate: 20, scale: 0.9 }} transition={{ duration: reducedMotion ? 0 : 0.14, ease: studioEase }}>
          {dark ? <IconMoon size={18} stroke={1.6} /> : <IconSun size={18} stroke={1.6} />}
        </motion.span>
      </AnimatePresence>
    </HoverBorderGradient>
  </div>;
}
