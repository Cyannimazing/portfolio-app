"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects, toSlug } from "@/lib/projects";

const SWAP_MS = 5000;

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      <span className="text-neutral-600 text-xs font-bold uppercase tracking-[0.3em] sm:w-20 shrink-0">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`cursor-pointer px-3.5 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
              value === opt
                ? "bg-sky-500/15 text-sky-400 border-sky-500/40"
                : "bg-white/4 text-neutral-500 border-white/8 hover:text-white hover:border-white/20"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function WorksClient() {
  const [industry, setIndustry] = useState("All");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const industries = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.industry && set.add(p.industry));
    return ["All", ...Array.from(set)];
  }, []);

  // Newest first: sort by id descending. A new project gets the next id and auto-leads.
  const ordered = useMemo(() => [...projects].sort((a, b) => b.id - a.id), []);

  const filtered = useMemo(
    () => ordered.filter((p) => industry === "All" || p.industry === industry),
    [ordered, industry],
  );

  const total = filtered.length;
  const safeIndex = total > 0 ? Math.min(active, total - 1) : 0;
  const current = filtered[safeIndex];

  // Reset to the first slide whenever the filter changes.
  useEffect(() => {
    setActive(0);
  }, [industry]);

  // Auto-advance: re-armed on every slide change (manual or auto) so the
  // progress bar and the real timer stay in sync. Pause on hover.
  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % total), SWAP_MS);
    return () => clearTimeout(id);
  }, [paused, total, safeIndex]);

  const go = (dir: 1 | -1) => setActive((i) => (i + dir + total) % total);

  return (
    <main className="relative bg-[#080808] min-h-screen flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[36px_36px] pointer-events-none" />

      {/* Breadcrumb */}
      <div className="relative z-10 px-8 md:px-14 pt-24 pb-6">
        <p className="text-neutral-600 text-xs font-semibold uppercase tracking-[0.3em]">Works</p>
      </div>

      {/* Header + filter */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pb-5">
        <p className="text-sky-400 text-xs font-bold uppercase tracking-[0.3em] mb-2">Projects & Case Studies</p>
        <h1 className="text-2xl md:text-3xl font-black text-white mb-5">Works</h1>
        <FilterRow label="Industry" options={industries} value={industry} onChange={setIndustry} />
      </div>

      {/* One-screen auto-rotating showcase */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 pb-10">
        {current ? (
          <>
            <div
              className="relative h-[56vh] md:h-[62vh] rounded-2xl overflow-hidden border border-white/8"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Progress timer */}
              {total > 1 && !paused && (
                <motion.div
                  key={safeIndex}
                  className="absolute top-0 left-0 h-0.5 bg-sky-400 z-30"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: SWAP_MS / 1000, ease: "linear" }}
                />
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Link href={`/works/${toSlug(current.title)}`} className="group absolute inset-0 block cursor-pointer">
                    <Image src={current.mainImage} alt={current.title} fill priority sizes="100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent" />

                    {/* clickable affordance: inset ring + corner hint on hover */}
                    <div className="absolute inset-0 rounded-2xl ring-inset ring-0 group-hover:ring-2 group-hover:ring-sky-400/50 transition-all duration-300 pointer-events-none" />
                    <div className="absolute top-5 left-5 md:top-6 md:left-6 flex items-center gap-2 px-3 py-1.5 rounded-md bg-sky-500/90 text-white text-xs font-bold uppercase tracking-widest opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Open Case Study
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 max-w-3xl">
                      <p className="text-sky-400 text-[0.65rem] sm:text-xs font-bold uppercase tracking-[0.3em] mb-2">{current.industry ?? current.type}</p>
                      <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-3 text-balance">{current.title}</h2>
                      <p className="text-neutral-300 text-sm md:text-base mb-5 max-w-xl line-clamp-3">{current.description}</p>
                      <span className="inline-flex items-center gap-2 text-sky-400 text-sm font-bold uppercase tracking-widest">
                        View Case Study
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Control strip — below the card, never over the image */}
            {total > 1 && (
              <div className="mt-6 flex items-center justify-between gap-4">
                {/* Editorial counter */}
                <div className="flex items-baseline gap-1.5 tabular-nums">
                  <span className="text-3xl md:text-4xl font-black text-white leading-none">{String(safeIndex + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-semibold text-neutral-600 leading-none">/ {String(total).padStart(2, "0")}</span>
                </div>

                {/* Dot scrubber */}
                <div className="hidden sm:flex items-center gap-1.5">
                  {filtered.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setActive(i)}
                      aria-label={`Go to ${p.title}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${i === safeIndex ? "w-7 bg-sky-400" : "w-1.5 bg-white/25 hover:bg-white/50"}`}
                    />
                  ))}
                </div>

                {/* Prev / next */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => go(-1)}
                    aria-label="Previous project"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/25 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={() => go(1)}
                    aria-label="Next project"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/25 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="py-20 text-neutral-500 text-sm">No projects match this filter yet. Try a different industry.</p>
        )}
      </div>
    </main>
  );
}
