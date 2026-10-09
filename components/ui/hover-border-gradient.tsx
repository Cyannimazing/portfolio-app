"use client";

// Aceternity Hover Border Gradient with typed polymorphic props and motion pause.
// Source: https://ui.aceternity.com/registry/hover-border-gradient.json
import { createElement, useEffect, useState, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";
const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, #b4edff 0%, transparent 100%)",
  LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, #b4edff 0%, transparent 100%)",
  BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, #b4edff 0%, transparent 100%)",
  RIGHT: "radial-gradient(16.2% 41.2% at 100% 50%, #b4edff 0%, transparent 100%)",
};
type Props<T extends ElementType> = {
  as?: T; children: ReactNode; containerClassName?: string; className?: string;
  duration?: number; clockwise?: boolean; paused?: boolean;
  borderMotion?: "always" | "hover";
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function HoverBorderGradient<T extends ElementType = "button">({
  children, containerClassName, className, as, duration = 2, clockwise = true, paused = false, borderMotion = "hover", ...props
}: Props<T>) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");
  const reducedMotion = useReducedMotion();
  const moving = !paused && reducedMotion === false;
  const Tag: ElementType = as ?? "button";
  useEffect(() => {
    if (!moving || hovered || borderMotion === "hover") return;
    const timer = window.setInterval(() => setDirection((current) => {
      const index = directions.indexOf(current);
      return directions[(index + (clockwise ? 3 : 1)) % 4];
    }), duration * 1000);
    return () => window.clearInterval(timer);
  }, [moving, hovered, clockwise, duration, borderMotion]);

  return createElement(Tag, { ...props, "data-studio-action": "", className: cn("relative isolate flex w-fit rounded-[4px] p-px", containerClassName),
    onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true), onBlur: () => setHovered(false) }, <>
    <span className={cn("relative z-10 rounded-[inherit] px-4 py-2", className)}>{children}</span>
    <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]"
      initial={false} animate={{ background: hovered && moving ? "radial-gradient(75% 181% at 50% 50%, #46d5f1 0%, transparent 100%)" : borderMotion === "hover" ? "transparent" : movingMap[direction] }}
      transition={{ duration: moving ? borderMotion === "hover" ? .35 : duration : 0, ease: borderMotion === "hover" ? [.16, 1, .3, 1] : "linear" }} />
  </>);
}
