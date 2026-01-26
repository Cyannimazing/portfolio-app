"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
  onItemClick,
}: {
  items: {
    title: string;
    description: string;
    image: string;
    type: string;
    year: string;
    technologies: string[];
  }[];
  className?: string;
  onItemClick?: (index: number) => void;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => onItemClick?.(idx)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-br from-sky-500/20 to-blue-600/20 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-3 py-1 bg-sky-500 text-white text-xs font-semibold rounded-full">
                  {item.type}
                </span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                  {item.year}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <CardTitle>{item.title}</CardTitle>
              </div>
            </div>
            <div className="p-4">
              <CardDescription>{item.description}</CardDescription>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {item.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-md"
                  >
                    {tech}
                  </span>
                ))}
                {item.technologies.length > 4 && (
                  <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded-md">
                    +{item.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden bg-slate-900/80 border border-slate-800 group-hover:border-sky-500/50 relative z-20 transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-white font-bold text-xl tracking-tight", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "text-slate-400 text-sm leading-relaxed line-clamp-2",
        className
      )}
    >
      {children}
    </p>
  );
};
