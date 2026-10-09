"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import { cn } from "@/lib/utils";

function menuPosition(button: HTMLButtonElement, count: number) {
  const rect = button.getBoundingClientRect();
  const viewport = window.visualViewport;
  const viewportTop = viewport?.offsetTop ?? 0;
  const viewportHeight = viewport?.height ?? window.innerHeight;
  const viewportWidth = document.documentElement.clientWidth;
  const below = Math.max(0, viewportTop + viewportHeight - rect.bottom - 16);
  const above = Math.max(0, rect.top - viewportTop - 16);
  const desired = Math.min(256, count * 44 + 10);
  const upwards = below < desired && above > below;
  const maxHeight = Math.min(desired, upwards ? above : below);
  const width = Math.min(rect.width, viewportWidth - 16);
  return { left: Math.max(8, Math.min(rect.left, viewportWidth - width - 8)), top: upwards ? rect.top - maxHeight - 8 : rect.bottom + 8, width, maxHeight };
}

// Preserve the portfolio's dropdown and selected-item checkmark. Position the
// menu in available viewport space so cards and phone keyboards cannot clip it.
export function SelectMenu({ value, onChange, options, placeholder, invalid, id, name, disabled = false, describedBy, className }: {
  value: string; onChange: (value: string) => void; options: string[];
  placeholder: string; invalid?: boolean; id?: string; name?: string;
  disabled?: boolean; describedBy?: string; className?: string;
}) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const listId = controlId + "-options";
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLUListElement>(null);
  const search = useRef({ text: "", time: 0 });
  const reduced = useMotionPreference();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState({ left: 0, top: 0, width: 0, maxHeight: 256 });
  const expanded = open && !disabled;
  const show = (index = Math.max(0, options.indexOf(value))) => {
    if (disabled || !button.current) return;
    setPosition(menuPosition(button.current, options.length)); setActive(index); setOpen(true);
  };
  const choose = (index: number) => {
    onChange(options[index]); setOpen(false); button.current?.focus({ preventScroll: true });
  };
  useEffect(() => {
    if (!expanded) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !button.current?.contains(event.target) && !menu.current?.contains(event.target)) setOpen(false);
    };
    const update = () => { if (button.current) setPosition(menuPosition(button.current, options.length)); };
    const scroll = (event: Event) => { if (!(event.target instanceof Node && menu.current?.contains(event.target))) update(); };
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", scroll, true);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", scroll, true);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, [expanded, options.length]);
  useEffect(() => {
    if (expanded) menu.current?.querySelector<HTMLElement>(`[data-option-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [expanded, active]);
  const keyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (["ArrowDown", "ArrowUp", "Home", "End", "Enter", " ", "Escape"].includes(event.key)) {
      event.preventDefault();
      if (event.key === "Escape") { setOpen(false); event.stopPropagation(); return; }
      if (event.key === "Enter" || event.key === " ") { if (expanded) choose(active); else show(); return; }
      if (event.key === "Home") { if (!expanded) show(0); else setActive(0); return; }
      if (event.key === "End") { if (!expanded) show(options.length - 1); else setActive(options.length - 1); return; }
      if (!expanded) show(event.key === "ArrowUp" ? options.length - 1 : Math.max(0, options.indexOf(value)));
      else setActive(index => (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
    } else if (event.key === "Tab") setOpen(false);
    else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const now = Date.now();
      search.current = { text: now - search.current.time < 700 ? search.current.text + event.key : event.key, time: now };
      const match = options.findIndex(option => option.toLowerCase().startsWith(search.current.text.toLowerCase()));
      if (match >= 0) { event.preventDefault(); if (expanded) setActive(match); else show(match); }
    }
  };
  return <div className="relative min-w-0">
    {name && <input type="hidden" name={name} value={value} />}
    <button ref={button} id={controlId} type="button" role="combobox" aria-haspopup="listbox" aria-expanded={expanded} aria-controls={expanded ? listId : undefined} aria-activedescendant={expanded ? `${listId}-${active}` : undefined} aria-invalid={invalid || undefined} aria-describedby={describedBy} disabled={disabled} onKeyDown={keyDown} onClick={() => expanded ? setOpen(false) : show()} data-studio-action
      className={cn("flex min-h-11 w-full items-center justify-between gap-2 rounded-md border bg-white/4 px-4 py-3 text-left text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60", invalid ? "border-red-500/50" : expanded ? "border-sky-500/50" : "border-white/8 hover:border-white/20", className)}>
      <span className={cn("min-w-0", value ? "text-white" : "text-neutral-400")}>{value || placeholder}</span>
      <svg aria-hidden="true" className={cn("h-4 w-4 shrink-0 text-neutral-400 transition-transform", expanded && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
    {typeof document !== "undefined" && createPortal(<AnimatePresence>{expanded && <motion.ul ref={menu} id={listId} role="listbox" aria-labelledby={controlId} initial={reduced ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -6 }} transition={{ duration: reduced ? 0 : .18, ease: [.16,1,.3,1] }} style={{ ...position, position: "fixed", zIndex: 120 }} className="overflow-y-auto overscroll-contain rounded-md border border-white/10 bg-[#0f0f0f] p-1 shadow-xl shadow-black/60">
      {options.map((option,index) => <li key={option} role="presentation"><button id={`${listId}-${index}`} type="button" role="option" tabIndex={-1} aria-selected={value === option} data-option-index={index} onPointerDown={event=>event.preventDefault()} onPointerMove={()=>setActive(index)} onClick={()=>choose(index)} className={cn("flex min-h-11 w-full items-center justify-between gap-2 rounded px-3 py-2.5 text-left text-sm transition-colors", value === option ? "bg-sky-500/15 text-sky-400" : "text-neutral-300", active === index && "bg-white/8 text-white")}>{option}{value === option && <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}</button></li>)}
    </motion.ul>}</AnimatePresence>, document.body)}
  </div>;
}
