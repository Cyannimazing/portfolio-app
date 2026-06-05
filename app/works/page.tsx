"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects, toSlug } from "@/lib/projects";
import type { Project } from "@/lib/projects";

const getCategory = (p: Project): "Web Development" | "Desktop Application" | "Mobile Application" => {
  const t = p.type.toLowerCase();
  if (t.includes("desktop")) return "Desktop Application";
  if (t.includes("mobile")) return "Mobile Application";
  return "Web Development";
};

export default function WorksPage() {
  const [filter, setFilter] = useState<"All" | "Web Development" | "Desktop Application" | "Mobile Application">("All");

  const filteredProjects = filter === "All" ? projects : projects.filter((p) => getCategory(p) === filter);
  const featuredProject = filteredProjects[0] ?? null;
  const gridProjects = filteredProjects.slice(1);

  return (
    <main className="relative bg-[#080808] min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[36px_36px] pointer-events-none" />

      {/* Breadcrumb */}
      <div className="px-8 md:px-14 pt-24 pb-6 relative z-10">
        <p className="text-neutral-600 text-xs font-semibold uppercase tracking-[0.3em]">Works</p>
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-sky-400 text-xs font-bold uppercase tracking-[0.3em] mb-2">Projects & Case Studies</p>
          <h1 className="text-3xl font-black text-white mb-2">Works</h1>
          <p className="text-neutral-500 text-sm">Click any project to explore the full case study.</p>
        </motion.div>
      </div>

      {/* Filter pills */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-4">
        <div className="flex flex-wrap gap-2">
          {(["All", "Web Development", "Desktop Application", "Mobile Application"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`cursor-pointer px-4 py-2 rounded-md text-xs font-semibold border transition-colors ${
                filter === f
                  ? "bg-sky-500/15 text-sky-400 border-sky-500/40"
                  : "bg-white/4 text-neutral-500 border-white/8 hover:text-white hover:border-white/20"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {featuredProject && (
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={featuredProject.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <Link
                href={`/works/${toSlug(featuredProject.title)}`}
                className="block group relative h-96 md:h-125 rounded-md overflow-hidden border border-white/8 hover:border-sky-500/30 transition-all duration-300"
              >
                <Image src={featuredProject.mainImage} alt={featuredProject.title} fill sizes="100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 bg-sky-500 text-white text-xs font-bold rounded-md uppercase tracking-widest">Featured</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <p className="text-sky-400 text-xs font-bold uppercase tracking-widest mb-2">{featuredProject.type}</p>
                  <p className="text-neutral-400 text-xs mb-2">{featuredProject.year}</p>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-3">{featuredProject.title}</h2>
                  <p className="text-neutral-400 text-sm md:text-base max-w-2xl mb-4">{featuredProject.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.technologies.slice(0, 5).map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-neutral-200">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-6 py-3 bg-sky-500 text-white font-semibold text-sm rounded-md">View Case Study</span>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gridProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/works/${toSlug(project.title)}`}
                className="block group relative h-64 rounded-md overflow-hidden border border-white/8 hover:border-sky-500/30 transition-all duration-300"
              >
                <Image src={project.mainImage} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-sky-400 text-xs font-bold uppercase tracking-widest mb-1">{project.type}</p>
                  <h3 className="text-white font-black text-xl">{project.title}</h3>
                  <p className="text-neutral-500 text-xs mt-0.5">{project.year}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-5 py-2 bg-sky-500 text-white font-semibold text-xs rounded-md">View Case Study</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
