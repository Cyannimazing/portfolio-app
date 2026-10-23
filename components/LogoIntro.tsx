"use client";

import { motion } from "motion/react";
import BrandMark from "@/components/BrandMark";
import { studioEase } from "@/lib/studio-motion";
import styles from "./LogoIntro.module.css";

export const logoIntroDuration = 5500;

const trails = [
  { path: "M22 108C88-8 292 14 304 132C310 208 236 250 180 180", delay: 0, accent: true },
  { path: "M338 270C273 372 69 354 58 230C51 150 125 110 180 180", delay: .12, accent: false },
  { path: "M88 340C-20 262 38 42 158 58C226 67 249 130 180 180", delay: .24, accent: true },
];

// Animate the approved, intact brand asset. Curves are temporary light trails,
// not replacements for its geometry or clipped fragments of the logo.
export default function LogoIntro() {
  return <div className={styles.lockup} aria-hidden="true" data-logo-animation="flow">
    <motion.div className={styles.markStage}
      initial={{ x: "var(--logo-mark-shift)" }} animate={{ x: 0 }}
      transition={{ duration: .85, delay: 1.85, ease: studioEase }}>
      <motion.div className={styles.halo}
        initial={{ opacity: 0, scale: .35 }} animate={{ opacity: [0, .36, 0], scale: [.35, 1.15, 1.7] }}
        transition={{ duration: 1.7, delay: .15, times: [0, .5, 1], ease: "easeInOut" }} />
      <motion.svg className={styles.flow} viewBox="0 0 360 360" fill="none"
        initial={{ rotate: -45, scale: 1.12 }} animate={{ rotate: 35, scale: .74 }}
        transition={{ duration: 1.85, ease: studioEase }}>
        {trails.map(trail => <g key={trail.path} className={trail.accent ? styles.accentTrail : styles.neutralTrail}>
          {[9, 1.7].map((width, index) => <motion.path key={width} d={trail.path}
            stroke="currentColor" strokeWidth={width} strokeLinecap="round" opacity={index === 0 ? .08 : 1}
            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
            animate={{ pathLength: [0, .6, .28, 0], pathOffset: [0, .05, .65, 1], opacity: [0, index === 0 ? .1 : .85, index === 0 ? .05 : .6, 0] }}
            transition={{ duration: 1.5, delay: trail.delay, times: [0, .32, .78, 1], ease: "easeInOut" }} />)}
        </g>)}
      </motion.svg>
      <motion.span className={styles.core}
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, .85, 0], scale: [0, 1.4, .4] }}
        transition={{ duration: .85, delay: .15, times: [0, .45, 1], ease: "easeInOut" }} />
      <motion.div className={styles.mark}
        initial={{ opacity: 0, rotate: -115, scale: .24, y: 24, filter: "blur(10px)" }}
        animate={{ opacity: [0, 1, 1], rotate: [-115, 9, 0], scale: [.24, 1.1, 1], y: [24, -3, 0], filter: ["blur(10px)", "blur(0px)", "blur(0px)"] }}
        transition={{ duration: 1.45, delay: .28, times: [0, .7, 1], ease: studioEase }}>
        <BrandMark theme="dark" size={184} />
      </motion.div>
      <motion.svg className={styles.settleRing} viewBox="0 0 240 240" fill="none"
        initial={{ opacity: 0, scale: .75 }} animate={{ opacity: [0, .34, 0], scale: [.75, 1, 1.12] }}
        transition={{ duration: .9, delay: 1.05, times: [0, .35, 1], ease: "easeOut" }}>
        <circle cx="120" cy="120" r="103" stroke="currentColor" strokeWidth=".75" />
      </motion.svg>
    </motion.div>
    <div className={styles.wordmark}>
      <span className={styles.wordMask}><motion.span initial={{ y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .75, delay: 2.02, ease: studioEase }}>Cyril</motion.span></span>
      <span className={`${styles.wordMask} ${styles.ai}`}><motion.span initial={{ y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .75, delay: 2.17, ease: studioEase }}>AI</motion.span></span>
    </div>
    <motion.div className={styles.sweep}
      initial={{ "--logo-sweep": "120%", opacity: 0 }} animate={{ "--logo-sweep": "-20%", opacity: [0, .8, .8, 0] }}
      transition={{ duration: 1.6, delay: 3, times: [0, .12, .84, 1], ease: "linear" }}>
      <span className={styles.markGlint} />
      <span className={styles.wordGlint}><span>Cyril</span><span>AI</span></span>
    </motion.div>
  </div>;
}
