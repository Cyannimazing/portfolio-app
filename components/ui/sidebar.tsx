"use client";

// Aceternity Sidebar with Next links, mobile focus management and reduced motion.
// Source: https://ui.aceternity.com/registry/sidebar.json
import Link from "next/link";
import { createPortal } from "react-dom";
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ComponentProps, type Dispatch, type ReactNode, type RefObject, type SetStateAction } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { studioEase, studioExitEase } from "@/lib/studio-motion";

type SidebarContextValue = { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>; animate: boolean };
function MenuGlyph({ state }: { state?: "open" | "closed" }) {
  const reducedMotion = useReducedMotion();
  return <motion.span aria-hidden="true" initial={false} animate={state} className="relative block h-4 w-5 shrink-0">
    <motion.span className="absolute left-0 top-[7px] h-[1.5px] w-5 rounded-[1px] bg-current" variants={{ closed: { y: -3, rotate: 0 }, open: { y: 0, rotate: 45 } }} transition={{ duration: reducedMotion ? 0 : 0.3, ease: studioEase }} />
    <motion.span className="absolute left-0 top-[7px] h-[1.5px] w-5 rounded-[1px] bg-current" variants={{ closed: { y: 3, rotate: 0 }, open: { y: 0, rotate: -45 } }} transition={{ duration: reducedMotion ? 0 : 0.3, ease: studioEase }} />
  </motion.span>;
}
const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a Sidebar");
  return context;
}

export function Sidebar({ children, open: controlledOpen, setOpen: controlledSetOpen, animate = true }: {
  children: ReactNode; open?: boolean; setOpen?: Dispatch<SetStateAction<boolean>>; animate?: boolean;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  return <SidebarContext.Provider value={{ open: controlledOpen ?? internalOpen, setOpen: controlledSetOpen ?? setInternalOpen, animate }}>{children}</SidebarContext.Provider>;
}

export function DesktopSidebar({ className, children, ...props }: ComponentProps<typeof motion.div>) {
  const { open, setOpen, animate } = useSidebar();
  const reducedMotion = useReducedMotion();
  return <motion.div className={cn("hidden h-full w-[300px] shrink-0 flex-col px-4 py-4 lg:flex", className)}
    animate={animate ? { width: open ? 300 : 60 } : undefined}
    transition={{ duration: reducedMotion ? 0 : 0.2 }}
    onMouseEnter={() => { if (animate) setOpen(true); }}
    onMouseLeave={() => { if (animate) setOpen(false); }} {...props}>{children}</motion.div>;
}

type MenuAnchor = { top: number; left: number; width: number; height: number; clipPath: string };

function MobileNavigationPanel({ children, className, id, anchor, triggerRef, updateAnchor }: {
  children: ReactNode; className?: string; id: string; anchor: MenuAnchor | null;
  triggerRef: RefObject<HTMLButtonElement | null>; updateAnchor: () => void;
}) {
  const { setOpen } = useSidebar();
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const root = document.documentElement;
    const previousGutter = root.style.scrollbarGutter;
    const previousOverflow = document.body.style.overflow;
    // Keep the header width stable when a classic scrollbar disappears.
    if (window.innerWidth > root.clientWidth) root.style.scrollbarGutter = "stable";
    document.body.style.overflow = "hidden";
    const background = Array.from(document.querySelectorAll<HTMLElement>("main, .studio-navigation")).map(element => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
      if (event.key !== "Tab") return;
      const elements = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []).filter(element => element.getBoundingClientRect().height > 0);
      if (!elements?.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus({ preventScroll: true }); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus({ preventScroll: true }); }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => { if (desktop.matches) setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", updateAnchor);
    desktop.addEventListener("change", onDesktop);
    // AnimatePresence keeps this panel mounted, and the page locked, through exit.
    return () => {
      document.body.style.overflow = previousOverflow;
      root.style.scrollbarGutter = previousGutter;
      background.forEach(({ element, inert }) => { element.inert = inert; });
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", updateAnchor);
      desktop.removeEventListener("change", onDesktop);
      if (trigger?.isConnected && trigger.getBoundingClientRect().height) trigger.focus({ preventScroll: true });
    };
  }, [setOpen, triggerRef, updateAnchor]);

  return <motion.div ref={dialogRef} id={id} role="dialog" aria-modal="true" aria-label="Portfolio navigation"
    variants={{
      closed: { clipPath: anchor?.clipPath ?? "inset(14px 20px calc(100% - 58px) calc(100% - 100px) round 4px)", transition: { duration: reducedMotion ? 0 : 0.48, delay: reducedMotion ? 0 : 0.18, ease: studioExitEase } },
      open: { clipPath: "inset(0px 0px 0px 0px round 0px)", transition: { duration: reducedMotion ? 0 : 0.68, ease: studioEase } },
    }} initial={reducedMotion ? false : "closed"} animate="open" exit="closed"
    className={cn("fixed inset-0 z-[100] flex flex-col overflow-y-auto p-7", className)}>
    <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)}
      style={anchor ? { top: anchor.top, left: anchor.left, width: anchor.width, height: anchor.height } : { top: 14, right: 20 }}
      className="absolute z-10 inline-flex h-11 min-w-20 items-center justify-end gap-3 rounded-[4px] text-[11px] font-medium tracking-[.04em] text-[#c1ced7] transition-colors hover:text-[#62dcf3]">
      <motion.span variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }} transition={{ duration: reducedMotion ? 0 : 0.15 }}>Close</motion.span><MenuGlyph />
    </button>
    {children}
  </motion.div>;
}

export function MobileSidebar({ children, className, brand, ...props }: ComponentProps<"div"> & { brand?: ReactNode }) {
  const { open, setOpen } = useSidebar();
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [anchor, setAnchor] = useState<MenuAnchor | null>(null);
  const updateAnchor = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect?.height) return;
    setAnchor({ top: rect.top, left: rect.left, width: rect.width, height: rect.height,
      clipPath: `inset(${rect.top}px ${document.documentElement.clientWidth - rect.right}px ${window.innerHeight - rect.bottom}px ${rect.left}px round 4px)` });
  }, []);

  return <div className="flex items-center justify-between lg:hidden" {...props}>
    {brand}
    <button ref={triggerRef} type="button" aria-label="Open navigation" aria-expanded={open} aria-controls={id}
      className="relative z-20 inline-flex h-11 min-w-20 items-center justify-end gap-3 rounded-[4px] text-[11px] font-medium tracking-[.04em] text-[#c1ced7] transition-colors hover:text-[#62dcf3]" onClick={() => {
        updateAnchor();
        setOpen(true);
      }}><span>Menu</span><MenuGlyph state={open ? "open" : "closed"} /></button>
    {typeof document !== "undefined" && createPortal(<AnimatePresence>
      {open && <MobileNavigationPanel id={id} anchor={anchor} triggerRef={triggerRef} updateAnchor={updateAnchor} className={className}>{children}</MobileNavigationPanel>}
    </AnimatePresence>, document.body)}
  </div>;
}

export function SidebarLink({ link, className, ...props }: Omit<ComponentProps<typeof Link>, "href" | "children"> & {
  link: { label: string; href: string; icon: ReactNode }; className?: string;
}) {
  const { open, animate, setOpen } = useSidebar();
  return <Link href={link.href} className={cn("group/sidebar flex items-center gap-3 py-2", className)} {...props}
    onClick={(event) => { props.onClick?.(event); setOpen(false); }}>
    {link.icon}<motion.span animate={{ opacity: animate ? (open ? 1 : 0) : 1 }}
      className="inline-block whitespace-nowrap transition-transform duration-150 group-hover/sidebar:translate-x-1">{link.label}</motion.span>
  </Link>;
}
