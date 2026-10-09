"use client";

// Adapted from the official Aceternity Tabs registry component:
// https://ui.aceternity.com/registry/tabs.json
// Adds tab semantics, keyboard focus, optional hover activation and reduced motion.
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Tab = { title: ReactNode; value: string; content?: ReactNode };

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
  defaultValue,
  ariaLabel = "Explore tabs",
  orientation = "horizontal",
  activationMode = "click",
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
  defaultValue?: string;
  ariaLabel?: string;
  orientation?: "horizontal" | "vertical";
  activationMode?: "click" | "hover";
}) => {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const initialTab = propTabs.find((tab) => tab.value === defaultValue) ?? propTabs[0];
  const [active, setActive] = useState<Tab | undefined>(initialTab);
  const [tabs, setTabs] = useState<Tab[]>(() => initialTab
    ? [initialTab, ...propTabs.filter((tab) => tab.value !== initialTab.value)] : []);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1)[0];
    if (!selectedTab || active?.value === selectedTab.value) return;
    newTabs.unshift(selectedTab);
    setTabs(newTabs);
    setActive(selectedTab);
  };

  const handleKeys = (event: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let next: number;
    const forwardKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    const backKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    if (event.key === forwardKey) next = (idx + 1) % propTabs.length;
    else if (event.key === backKey) next = (idx - 1 + propTabs.length) % propTabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = propTabs.length - 1;
    else return;
    event.preventDefault();
    moveSelectedTabToTop(next);
    buttonRefs.current[next]?.focus();
  };

  if (!active) return null;

  return (
    <>
      <div role="tablist" aria-label={ariaLabel} aria-orientation={orientation}
        className={cn("relative flex w-full max-w-full",
          orientation === "vertical" ? "flex-col items-stretch" : "items-center", containerClassName)}>
        {propTabs.map((tab, idx) => (
          <button key={tab.value} type="button" role="tab"
            id={`${id}-tab-${tab.value}`} aria-controls={`${id}-panel-${tab.value}`}
            aria-selected={active.value === tab.value}
            tabIndex={active.value === tab.value ? 0 : -1}
            ref={(node) => { buttonRefs.current[idx] = node; }}
            onClick={() => moveSelectedTabToTop(idx)}
            onPointerEnter={(event) => {
              if (activationMode === "hover" && event.pointerType === "mouse") moveSelectedTabToTop(idx);
            }}
            onFocus={() => {
              if (activationMode === "hover") moveSelectedTabToTop(idx);
            }}
            onKeyDown={(event) => handleKeys(event, idx)}
            className={cn("relative min-h-11 rounded-full px-3 py-2", tabClassName)}>
            {active.value === tab.value && (
              <motion.div aria-hidden="true"
                layoutId={reduceMotion === false ? `${id}-clickedbutton` : undefined}
                transition={reduceMotion === false
                  ? { type: "spring", bounce: 0.15, duration: 0.35 } : { duration: 0 }}
                className={cn("absolute inset-0 rounded-full bg-white/10", activeTabClassName)} />
            )}
            <span className="relative block">{tab.title}</span>
          </button>
        ))}
      </div>
      <FadeInDiv key={active.value} tabs={tabs} active={active} idPrefix={id}
        className={contentClassName} reveal={activationMode === "hover"} />
    </>
  );
};

export const FadeInDiv = ({ className, tabs, active, idPrefix, hovering, reveal = false }: {
  className?: string;
  tabs: Tab[];
  active: Tab;
  idPrefix?: string;
  hovering?: boolean;
  reveal?: boolean;
}) => {
  const fallbackId = useId();
  const panelId = idPrefix ?? fallbackId;
  const reduceMotion = useReducedMotion();
  return (
    <div className={cn("relative w-full", className)} data-hovering={hovering || undefined}>
      {tabs.map((tab) => (
        <motion.div key={tab.value} role="tabpanel" id={`${panelId}-panel-${tab.value}`}
          aria-labelledby={`${panelId}-tab-${tab.value}`} hidden={tab.value !== active.value}
          initial={false}
          animate={reduceMotion === false
            ? reveal && tab.value === active.value ? { y: [8, 0], opacity: [0, 1], filter: ["blur(2px)", "blur(0px)"] } : { y: [6, 0] }
            : { y: 0, opacity: 1, filter: "none" }}
          transition={{ duration: reduceMotion === false ? reveal ? 0.3 : 0.2 : 0, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full">
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
