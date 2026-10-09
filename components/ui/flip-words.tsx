"use client";

// Adapted from Aceternity UI Flip Words:
// https://ui.aceternity.com/components/flip-words
// Adds a pause API, timer cleanup, reduced motion and a stable SSR-visible layout.
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words, duration = 3000, className, paused = false,
}: { words: string[]; duration?: number; className?: string; paused?: boolean }) => {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const currentWord = words[index % Math.max(words.length, 1)] ?? "";

  useEffect(() => {
    if (reduceMotion !== false || paused || words.length < 2) return;
    const timer = window.setTimeout(() => setIndex((value) => (value + 1) % words.length), duration);
    return () => window.clearTimeout(timer);
  }, [index, words, duration, paused, reduceMotion]);

  if (!words.length) return null;

  return (
    <span className={cn("relative inline-grid text-left align-baseline", className)}>
      {words.map((word) => (
        <span key={word} aria-hidden="true" className="invisible col-start-1 row-start-1">{word}</span>
      ))}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={currentWord}
          initial={reduceMotion === false ? { opacity: 0, y: 22, filter: "blur(6px)" } : false}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduceMotion === false
            ? { opacity: 0, y: -10, filter: "blur(3px)", transition: { duration: 0.16, ease: "easeIn" } }
            : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: reduceMotion === false ? 0.6 : 0, ease: [0.16, 1, 0.3, 1] }}
          className="col-start-1 row-start-1">
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
