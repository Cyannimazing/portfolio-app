"use client";

// Adapted from Aceternity UI Flip Words:
// https://ui.aceternity.com/components/flip-words
// Adds a pause API, timer cleanup, reduced motion and a stable SSR-visible layout.
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words, duration = 3000, className, paused = false, variant = "default",
}: { words: string[]; duration?: number; className?: string; paused?: boolean; variant?: "default" | "subtle" }) => {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const currentWord = words[index % Math.max(words.length, 1)] ?? "";

  useEffect(() => {
    if (reduceMotion !== false || paused || words.length < 2) return;
    let timer: number | undefined;
    const schedule = () => {
      window.clearTimeout(timer);
      if (document.visibilityState === "visible") {
        timer = window.setTimeout(() => setIndex((value) => (value + 1) % words.length), duration);
      }
    };
    schedule();
    document.addEventListener("visibilitychange", schedule);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [index, words, duration, paused, reduceMotion]);

  if (!words.length) return null;

  return (
    <span className={cn("relative inline-grid text-left align-baseline", className)}>
      {words.map((word) => (
        <span key={word} aria-hidden="true" className="invisible col-start-1 row-start-1">{word}</span>
      ))}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={currentWord}
          initial={reduceMotion === false ? { opacity: 0, y: variant === "subtle" ? 6 : 22, filter: variant === "subtle" ? "blur(0px)" : "blur(6px)" } : false}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduceMotion === false
            ? { opacity: 0, y: variant === "subtle" ? -4 : -10, filter: variant === "subtle" ? "blur(0px)" : "blur(3px)", transition: { duration: 0.16, ease: "easeIn" } }
            : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: reduceMotion === false ? variant === "subtle" ? 0.32 : 0.6 : 0, ease: [0.16, 1, 0.3, 1] }}
          className="col-start-1 row-start-1">
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
