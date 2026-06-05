"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { projects, toSlug } from "@/lib/projects";
import type { Project } from "@/lib/projects";

type LightboxState = { images: { src: string; alt: string }[]; index: number } | null;

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => toSlug(p.title) === slug);
  if (!project) notFound();

  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const galleryImages = (project.subImages ?? []).map((img) => ({ src: img.url, alt: img.caption }));

  return (
    <>
      <AnimatePresence>
        {lightbox && (
          <ImageLightbox
            images={lightbox.images}
            initialIndex={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>

      <main className="relative bg-[#080808] min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[36px_36px] pointer-events-none" />

        {/* Breadcrumb row - matches works page */}
        <div className="relative z-10 px-8 md:px-14 pt-24 pb-6">
          <Link
            href="/works"
            className="flex items-center gap-2 text-xs text-neutral-600 font-semibold uppercase tracking-[0.3em] hover:text-white transition-colors w-fit"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Works
          </Link>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-24"
        >
          {/* Hero - full bleed with title overlaid */}
          <div
            className="relative h-[55vh] md:h-[65vh] rounded-xl mb-12 overflow-hidden cursor-pointer group"
            onClick={() => setLightbox({ images: [{ src: project.mainImage, alt: project.description }, ...galleryImages], index: 0 })}
          >
            <Image
              src={project.mainImage}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* layered gradients */}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/30 to-transparent" />


            {/* overlaid title block */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sky-400 text-xs font-bold uppercase tracking-[0.3em]">{project.type}</span>
                <span className="text-neutral-600">·</span>
                <span className="text-xs text-neutral-500">{project.year}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">{project.title}</h1>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 6).map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-neutral-200 backdrop-blur-sm">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Live site + URL + credentials */}
          {project.liveLink && (
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold rounded-md transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Site
              </a>
              <span className="text-neutral-600">|</span>
              <span className="text-sm text-neutral-500 font-mono">{new URL(project.liveLink).hostname}</span>
              {project.demoCredentials && (
                <>
                  <span className="text-neutral-700 hidden sm:block">|</span>
                  <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-500">
                    <span className="text-neutral-600 uppercase tracking-wide font-semibold">Demo:</span>
                    <span className="font-mono text-neutral-300">{project.demoCredentials.email}</span>
                    <span className="text-neutral-700">/</span>
                    <span className="font-mono text-neutral-300">{project.demoCredentials.password}</span>
                  </div>
                </>
              )}
            </div>
          )}

          <p className="text-neutral-400 text-base mb-10 leading-relaxed">{project.fullDescription}</p>

          {/* Tech stack - full list */}
          <div className="mb-10">
            <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span key={t} className="px-3 py-1.5 bg-white/4 border border-white/8 rounded-md text-sm text-neutral-300 hover:border-sky-500/40 hover:text-sky-400 transition-all">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Contribution */}
          {project.contribution && (
            <div className="mb-10">
              <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">Contribution</h2>
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-3 bg-white/4 border border-white/8 rounded-md">
                  <p className="text-xs text-neutral-600 mb-1 uppercase tracking-wide">Role</p>
                  <p className="text-sm text-white font-semibold">{project.contribution.role}</p>
                </div>
                <div className="px-4 py-3 bg-white/4 border border-white/8 rounded-md">
                  <p className="text-xs text-neutral-600 mb-1 uppercase tracking-wide">Team</p>
                  <p className="text-sm text-white font-semibold">{project.contribution.team}</p>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mb-10">
            <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {project.features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white/4 rounded-md border border-white/8">
                  <div className="w-5 h-5 rounded-sm bg-sky-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-neutral-300 text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          {project.subImages && project.subImages.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">Gallery</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.subImages.map((img, i) => (
                  <div key={i} className="group cursor-pointer" onClick={() => setLightbox({ images: [{ src: project.mainImage, alt: project.description }, ...galleryImages], index: i + 1 })}>
                    <div className="relative h-40 rounded-md overflow-hidden mb-2">
                      <Image
                        src={img.url}
                        alt={img.caption}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-600 group-hover:text-neutral-400 transition-colors">{img.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PDF Reports */}
          {project.pdfReports && project.pdfReports.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">Sample Documents</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.pdfReports.map((pdf, i) => (
                  <a key={i} href={pdf.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/4 border border-white/8 rounded-md hover:border-sky-500/30 transition-all group cursor-pointer">
                    <div className="w-10 h-10 bg-sky-500/10 rounded-md flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm group-hover:text-sky-400 transition-colors">{pdf.name}</p>
                      <p className="text-xs text-neutral-600">Click to view PDF</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Demo credentials + GitHub */}
          {(project.demoCredentials || project.githubLink) && (
            <div className="pt-6 border-t border-white/8 space-y-4">
              {project.demoCredentials && (
                <div>
                  <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">Demo Access</h2>
                  <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-3 bg-white/4 border border-white/8 rounded-md">
                      <p className="text-xs text-neutral-600 mb-1 uppercase tracking-wide">Email</p>
                      <p className="text-sm text-white font-mono">{project.demoCredentials.email}</p>
                    </div>
                    <div className="px-4 py-3 bg-white/4 border border-white/8 rounded-md">
                      <p className="text-xs text-neutral-600 mb-1 uppercase tracking-wide">Password</p>
                      <p className="text-sm text-white font-mono">{project.demoCredentials.password}</p>
                    </div>
                  </div>
                </div>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/8 text-white font-semibold rounded-md transition-colors text-sm">
                  GitHub
                </a>
              )}
            </div>
          )}
        </motion.div>
      </main>
    </>
  );
}

function ImageLightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: { src: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const total = images.length;
  const img = images[current];

  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total]);
  const touchStartX = useRef(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-9999 flex flex-col bg-black"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0" onClick={(e) => e.stopPropagation()}>
        {total > 1 ? (
          <span className="text-xs font-semibold text-neutral-500 tabular-nums">{current + 1} / {total}</span>
        ) : (
          <span />
        )}
        <button
          onClick={onClose}
          className="w-9 h-9 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Image area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Left - desktop only */}
        {total > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-0 top-0 bottom-0 w-16 md:w-24 hidden md:flex items-center justify-start pl-4 z-10 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 group-hover:text-white group-hover:bg-white/10 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>
        )}

        <div
          className="flex-1 flex items-center justify-center md:px-24 h-full w-full"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={img.src}
              alt={img.alt}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="max-h-full max-w-full object-contain select-none cursor-default"
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {/* Right - desktop only */}
        {total > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-0 top-0 bottom-0 w-16 md:w-24 hidden md:flex items-center justify-end pr-4 z-10 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 group-hover:text-white group-hover:bg-white/10 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        )}
      </div>

      {/* Caption bar */}
      {img.alt && (
        <div className="shrink-0 px-6 py-5 border-t border-white/6 text-center" onClick={(e) => e.stopPropagation()}>
          <p className="text-sm text-neutral-300 max-w-2xl mx-auto">{img.alt}</p>
        </div>
      )}
    </motion.div>
  );
}
