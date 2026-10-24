"use client";

import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { motion } from "motion/react";
import BrandMark from "@/components/BrandMark";
import { logoFilmDuration } from "@/lib/logo-film-timing";
import { studioEase } from "@/lib/studio-motion";
import { scheduleVisibleTimeout } from "@/lib/visible-timeout";
import type { LogoFilmProps } from "./LogoFilm";
import styles from "./LogoIntro.module.css";

export const logoIntroDuration = logoFilmDuration;

type Presentation = "pending" | "film" | "fallback";
type FilmBundle = { Component: ComponentType<LogoFilmProps>; light: boolean };

export default function LogoIntro({ onReady, onComplete }: { onReady: () => void; onComplete: () => void }) {
  const [presentation, setPresentation] = useState<Presentation>("pending");
  const [film, setFilm] = useState<FilmBundle | null>(null);
  const active = useRef(true);
  const failed = useRef(false);
  const cancelLoading = useRef<() => void>(() => {});

  const handleReady = useCallback(() => {
    if (!active.current || failed.current) return;
    cancelLoading.current();
    setPresentation("film");
    onReady();
  }, [onReady]);
  const handleUnavailable = useCallback(() => {
    if (!active.current || failed.current) return;
    failed.current = true;
    cancelLoading.current();
    setPresentation("fallback");
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let mounted = true;
    active.current = true;
    cancelLoading.current = scheduleVisibleTimeout(handleUnavailable, 3000);
    // Load the frame-based brand film only for the opening introduction.
    void import("./LogoFilm").then(module => {
      if (!mounted || failed.current) return;
      setFilm({ Component: module.default, light: document.documentElement.dataset.portfolioTheme === "terminal-light" });
    }).catch(handleUnavailable);
    return () => {
      mounted = false;
      active.current = false;
      cancelLoading.current();
    };
  }, [handleUnavailable]);

  useEffect(() => {
    if (presentation !== "fallback") return;
    onReady();
    return scheduleVisibleTimeout(onComplete, 2600);
  }, [presentation, onReady, onComplete]);

  const Film = film?.Component;
  return (
    <div className={styles.scene} aria-hidden="true" data-logo-animation="remotion-film" data-presentation={presentation}>
      {Film && presentation !== "fallback" && <Film light={film.light} onReady={handleReady} onComplete={onComplete} onUnavailable={handleUnavailable} />}
      <motion.div className={styles.fallbackLockup}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: presentation === "fallback" ? 1 : 0, y: 0 }}
        transition={{ duration: .7, ease: studioEase }}>
        <div className={styles.fallbackMark}><BrandMark theme="dark" size={360} /></div>
        <div className={styles.fallbackTitle}><span>Cyril</span><span className={styles.ai}>AI</span></div>
      </motion.div>
    </div>
  );
}
