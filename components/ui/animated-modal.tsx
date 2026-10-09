"use client";

// Aceternity Animated Modal, adapted with focus trapping, focus restoration,
// named dialogs, cleanup and reduced-motion support.
// Source: https://ui.aceternity.com/registry/animated-modal.json
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import { studioEase, studioExitEase, studioPanelStart, studioPanelVisible } from "@/lib/studio-motion";

const ModalContext = createContext<{ open: boolean; setOpen: (open: boolean) => void; triggerRef: RefObject<HTMLElement | null> } | undefined>(undefined);
export function Modal({ children }: { children: ReactNode }) {
  const [open, setInternalOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const setOpen = useCallback((value: boolean) => {
    if (value) triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setInternalOpen(value);
  }, []);
  return <ModalContext.Provider value={{ open, setOpen, triggerRef }}>{children}</ModalContext.Provider>;
}
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within Modal");
  return context;
}
type ModalBodyProps = { children: ReactNode; className?: string; ariaLabel: string; header?: ReactNode; motionDisabled?: boolean; motionStyle?: "panel" | "slide" };

function ModalPanel({ children, className, ariaLabel, header, motionDisabled = false, motionStyle = "panel" }: ModalBodyProps) {
  const { setOpen, triggerRef } = useModal();
  const reducedMotion = useMotionPreference();
  const disabled = reducedMotion || motionDisabled;
  const start = motionStyle === "slide" ? { opacity: 0, y: 16 } : studioPanelStart;
  const visible = motionStyle === "slide" ? { opacity: 1, y: 0 } : studioPanelVisible;
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    const previousGutter = root.style.scrollbarGutter;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = triggerRef.current;
    if (window.innerWidth > root.clientWidth) root.style.scrollbarGutter = "stable";
    document.body.style.overflow = "hidden";
    const background = Array.from(document.querySelectorAll<HTMLElement>("#main-content, .studio-navigation")).map(element => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    closeRef.current?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
      if (event.key !== "Tab") return;
      const elements = Array.from(modalRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]') ?? []).filter(el => el.getBoundingClientRect().height > 0);
      if (!elements.length) return;
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      root.style.scrollbarGutter = previousGutter;
      background.forEach(({ element, inert }) => { element.inert = inert; });
      window.removeEventListener("keydown", onKeyDown);
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [setOpen, triggerRef]);
  return <motion.div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/65 p-4 backdrop-blur-xl [perspective:800px]"
    initial={disabled ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: disabled ? 0 : 0.18 }}
    onPointerDown={event => { if (event.target === event.currentTarget) setOpen(false); }}>
    <motion.div ref={modalRef} role="dialog" aria-modal="true" aria-label={ariaLabel} className={cn("relative flex max-h-full w-full flex-col overflow-hidden rounded-[6px]", className)}
      initial={disabled ? false : start} animate={visible}
      exit={disabled ? undefined : { ...start, transition: { duration: motionStyle === "slide" ? 0.18 : 0.28, ease: studioExitEase } }} transition={{ duration: disabled ? 0 : motionStyle === "slide" ? 0.32 : 0.6, ease: studioEase }}>
      {header ? <div data-modal-header className="relative z-10 flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-7">
        {header}<button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close portfolio details" className="inline-flex h-11 min-w-[72px] shrink-0 items-center justify-end gap-3 rounded-[4px] text-[11px] font-medium text-[#c1ced7] transition-colors hover:text-[#62dcf3]"><span>Close</span><IconX size={20} stroke={1.5} aria-hidden="true" /></button>
      </div> : <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close portfolio details" className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-[4px] border border-white/20 text-cyan-100"><IconX size={18} aria-hidden="true" /></button>}
      {children}
    </motion.div>
  </motion.div>;
}

export function ModalBody(props: ModalBodyProps) {
  const { open } = useModal();
  return typeof document !== "undefined" ? createPortal(<AnimatePresence>{open && <ModalPanel {...props} />}</AnimatePresence>, document.body) : null;
}
