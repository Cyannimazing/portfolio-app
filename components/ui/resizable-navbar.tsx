"use client";
// Installed from Aceternity UI's resizable-navbar registry; adapted for Cyril AI.
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";

import React, { useRef, useState } from "react";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  compact?: boolean;
  integrated?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
  activePath?: string;
  numbered?: boolean;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  compact?: boolean;
  integrated?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("sticky inset-x-0 top-20 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible, compact = true, integrated = false }: NavBodyProps) => {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      animate={{
        backdropFilter: visible && !integrated ? "blur(10px)" : "none",
        boxShadow: visible && !integrated
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: compact && visible ? "40%" : "100%",
        y: compact && visible ? 20 : 0,
      }}
      transition={reducedMotion ? { duration: 0 } : {
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: compact ? "800px" : undefined,
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent",
        visible && !integrated && "bg-white/80 dark:bg-neutral-950/80",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, activePath, numbered = false }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => {
        const active = activePath === item.link || (item.link !== "/" && activePath?.startsWith(`${item.link}/`));
        return (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          aria-current={active ? "page" : undefined}
          data-active={active ? "true" : "false"}
          className={cn("group relative flex min-h-11 items-center gap-2 px-4 py-2 text-[var(--studio-muted)] transition-colors hover:text-[var(--studio-text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--studio-accent)]", numbered && "studio-nav-link", active && "text-[var(--studio-text)]", active && !numbered && "underline decoration-[var(--studio-accent)] underline-offset-8")}
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && !numbered && (
            <motion.div
              aria-hidden="true"
              layoutId={reducedMotion ? undefined : "studio-nav-hovered"}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.18 }}
              className="absolute inset-0 h-full w-full rounded-sm bg-white/5"
            />
          )}
          {numbered && (
            <>
              <span aria-hidden="true" className="studio-nav-bracket absolute top-1/2 left-0 h-3 w-1 -translate-y-1/2 border-y border-l border-[var(--studio-accent)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[active=true]:opacity-100" />
              <span aria-hidden="true" className="studio-nav-bracket absolute top-1/2 right-0 h-3 w-1 -translate-y-1/2 border-y border-r border-[var(--studio-accent)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[active=true]:opacity-100" />
              <span aria-hidden="true" className="studio-nav-index relative z-20 font-mono text-[10px] tracking-normal text-[var(--studio-muted)]">{String(idx + 1).padStart(2, "0")}</span>
            </>
          )}
          <span className="studio-nav-label relative z-20">{item.name}</span>
        </Link>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible, compact = true, integrated = false }: MobileNavProps) => {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      animate={{
        backdropFilter: visible && !integrated ? "blur(10px)" : "none",
        boxShadow: visible && !integrated
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: compact && visible ? "90%" : "100%",
        paddingRight: compact ? (visible ? "12px" : "0px") : undefined,
        paddingLeft: compact ? (visible ? "12px" : "0px") : undefined,
        borderRadius: compact ? (visible ? "4px" : "2rem") : undefined,
        y: compact && visible ? 20 : 0,
      }}
      transition={reducedMotion ? { duration: 0 } : {
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && !integrated && "bg-white/80 dark:bg-neutral-950/80",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
  id,
}: MobileNavMenuProps) => {
  const reducedMotion = useReducedMotion();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.16 }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.stopPropagation();
              onClose();
            }
          }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button"> & { isOpen: boolean }>(
  function MobileNavToggle({ isOpen, className, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        className={cn("inline-flex h-11 w-11 cursor-pointer items-center justify-center text-[var(--studio-text)] transition-colors hover:text-[var(--studio-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--studio-accent)]", className)}
        {...props}
      >
        {isOpen ? <IconX aria-hidden="true" size={22} stroke={1.5} /> : <IconMenu2 aria-hidden="true" size={22} stroke={1.5} />}
      </button>
    );
  },
);

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <span className="font-semibold text-[var(--studio-text)]">Cyril <span className="text-[var(--studio-accent)]">AI</span></span>
    </Link>
  );
};

type NavbarButtonProps<T extends React.ElementType = "a"> = {
  as?: T;
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "href" | "children" | "className" | "variant">;

export const NavbarButton = <T extends React.ElementType = "a">({
  href,
  as,
  children,
  className,
  variant = "primary",
  ...props
}: NavbarButtonProps<T>) => {
  const Tag = as ?? "a";
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return React.createElement(
    Tag,
    {
      ...props,
      ...(href ? { href } : {}),
      className: cn(baseStyles, variantStyles[variant], className),
    },
    children,
  );
};
