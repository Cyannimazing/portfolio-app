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
  const [service, setService] = useState("All");
  const [industry, setIndustry] = useState("All");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const services = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.services?.forEach((s) => set.add(s)));
    return ["All", ...Array.from(set)];
  }, []);

  const industries = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.industry && set.add(p.industry));
    return ["All", ...Array.from(set)];
  }, []);

  // Latest upload (Cynergy) leads; the rest keep their original order.
  const ordered = useMemo(() => {
    const i = projects.findIndex((p) => p.title === "Cynergy");
    if (i <= 0) return projects;
    return [projects[i], ...projects.slice(0, i), ...projects.slice(i + 1)];
  }, []);

  const filtered = useMemo(
    () =>
      ordered.filter(
        (p) =>
          (service === "All" || p.services?.includes(service)) &&
          (industry === "All" || p.industry === industry),
      ),
    [ordered, service, industry],
  );

  // Reset to the first slide whenever the filter set changes.
  useEffect(() => {
    setActive(0);
  }, [service, industry]);

  // Auto-advance every 5s; pause on hover; never run with 0/1 slides.
  useEffect(() => {
    if (paused || filtered.length <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % filtered.length), SWAP_MS);
    return () => clearInterval(id);
  }, [paused, filtered.length]);

  const total = filtered.length;
  const safeIndex = total > 0 ? Math.min(active, total - 1) : 0;
  const current = filtered[safeIndex];

  const go = (dir: 1 | -1) => setActive((i) => (i + dir + total) % total);

  return (
    <main className="relative bg-[#080808] min-h-screen flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[36px_36px] pointer-events-none" />

      {/* Breadcrumb */}
      <div className="relative z-10 px-8 md:px-14 pt-24 pb-6">
        <p className="text-neutral-600 text-xs font-semibold uppercase tracking-[0.3em]">Works</p>
      </div>

      {/* Header + filters */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pb-5">
        <p className="text-sky-400 text-xs font-bold uppercase tracking-[0.3em] mb-2">Projects & Case Studies</p>
        <h1 className="text-2xl md:text-3xl font-black text-white mb-5">Works</h1>
        <div className="space-y-3">
          <FilterRow label="Service" options={services} value={service} onChange={setService} />
          <FilterRow label="Industry" options={industries} value={industry} onChange={setIndustry} />
        </div>
      </div>

      {/* One-screen auto-rotating showcase */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 pb-10">
        {current ? (
          <div
            className="relative h-[58vh] md:h-[64vh] rounded-2xl overflow-hidden border border-white/8"
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

                  <div className="absolute bottom-0 left-0 right-0 p-7 md:p-12 max-w-3xl">
                    <p className="text-sky-400 text-xs font-bold uppercase tracking-[0.3em] mb-2">{current.industry ?? current.type}</p>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-3 text-balance">{current.title}</h2>
                    <p className="text-neutral-300 text-sm md:text-base mb-4 max-w-xl">{current.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {current.technologies.slice(0, 5).map((t) => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-neutral-200 backdrop-blur-sm">{t}</span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-sky-400 text-sm font-bold uppercase tracking-widest">
                      View Case Study
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            {total > 1 && (
              <>
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous project"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 border border-white/15 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next project"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 border border-white/15 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>

                {/* Dots + counter */}
                <div className="absolute bottom-5 right-6 z-30 flex items-center gap-3">
                  <span className="text-xs font-semibold text-white/70 tabular-nums">{String(safeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
                  <div className="flex items-center gap-1.5">
                    {filtered.map((p, i) => (
                      <button
                        key={p.id}
                        onClick={() => setActive(i)}
                        aria-label={`Go to ${p.title}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${i === safeIndex ? "w-6 bg-sky-400" : "w-1.5 bg-white/30 hover:bg-white/60"}`}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="py-20 text-neutral-500 text-sm">No projects match this combination yet. Try a different filter.</p>
        )}
      </div>
    </main>
  );
}
