"use client";

// Aceternity 3D Card with typed items and touch/reduced-motion guards.
// Source: https://ui.aceternity.com/registry/3d-card.json
import { createContext, createElement, useContext, useRef, useState, type ReactNode, type ElementType, type ComponentPropsWithoutRef, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { useMotionPreference } from "@/hooks/use-motion-preference";

const MouseEnterContext = createContext(false);

export function CardContainer({ children, className, containerClassName, disabled = false, tilt = 6 }: {
  children?: ReactNode; className?: string; containerClassName?: string; disabled?: boolean; tilt?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const reducedMotion = useMotionPreference();
  const canAnimate = !disabled && !reducedMotion;
  const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!canAnimate || !finePointer() || !containerRef.current) return;
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width - 0.5) * tilt * 2;
    const y = -((event.clientY - top) / height - 0.5) * tilt * 2;
    containerRef.current.style.transform = "rotateY(" + x + "deg) rotateX(" + y + "deg)";
  };

  return <MouseEnterContext.Provider value={entered && canAnimate}>
    <div className={cn("flex items-center justify-center py-20", containerClassName)} style={{ perspective: "1000px" }}>
      <div ref={containerRef} className={cn("relative flex items-center justify-center transition-transform duration-200 ease-out", className)}
        style={{ transformStyle: "preserve-3d", transform: canAnimate ? undefined : "none" }} onMouseMove={handleMouseMove}
        onMouseEnter={() => { if (canAnimate && finePointer()) setEntered(true); }}
        onMouseLeave={() => { setEntered(false); if (containerRef.current) containerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)"; }}>{children}</div>
    </div>
  </MouseEnterContext.Provider>;
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]", className)}>{children}</div>;
}

type ItemProps<T extends ElementType> = {
  as?: T; children: ReactNode; className?: string;
  translateX?: number; translateY?: number; translateZ?: number;
  rotateX?: number; rotateY?: number; rotateZ?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function CardItem<T extends ElementType = "div">({ as, children, className, translateX = 0, translateY = 0, translateZ = 0, rotateX = 0, rotateY = 0, rotateZ = 0, ...rest }: ItemProps<T>) {
  const entered = useContext(MouseEnterContext);
  const Tag: ElementType = as ?? "div";
  const transform = entered ? "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) rotateZ(" + rotateZ + "deg)" : "translate3d(0,0,0)";
  return createElement(Tag, { ...rest, className: cn("w-fit transition-transform duration-200 ease-out", className),
    style: { transform, transformStyle: "preserve-3d" } }, children);
}
