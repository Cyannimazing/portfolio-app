"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import { Spotlight } from "@/components/ui/spotlight";

// Project data structure
interface Project {
  id: number;
  title: string;
  type: string;
  year: string;
  description: string;
  mainImage: string;
  technologies: string[];
  fullDescription: string;
  features: string[];
  subImages?: { url: string; caption: string }[];
  pdfReports?: { name: string; url: string }[];
  liveLink?: string;
  githubLink?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "ChurchMS",
    type: "Web Application",
    year: "2025",
    description: "A comprehensive Church Management System with RESTful API integration - Capstone Project",
    mainImage: "/projects/main_image.png",
    technologies: ["Next.js", "Laravel", "MySQL", "RESTful API"],
    fullDescription: "A full-stack Church Management System built as a Capstone Project with a real client. The system features a Next.js frontend communicating with a Laravel backend through RESTful API endpoints (GET, POST, PUT, DELETE) for complete CRUD operations. It manages church members, events, donations, and administrative tasks with a MySQL database.",
    features: [
      "RESTful API integration (GET, POST, PUT, DELETE)",
      "Member management and registration",
      "Event scheduling and management",
      "Donation tracking and reporting",
      "Admin dashboard for church administrators",
      "Churchgoer portal for members",
    ],
    subImages: [
      { url: "/projects/sub_owner_image1.png", caption: "Admin Dashboard - Church management overview" },
      { url: "/projects/sub_owner_image2.png", caption: "Admin Panel - Member and event management" },
      { url: "/projects/sub_churchgoer_image1.png", caption: "Churchgoer Portal - Member view interface" },
    ],
    pdfReports: [
      { name: "Certificate of Baptism", url: "/reports/Certificate of Baptism.pdf" },
      { name: "Certificate of Marriage", url: "/reports/Certificate of Marriage.pdf" },
    ],
  },
  {
    id: 2,
    title: "Faculty Scheduling System",
    type: "Desktop Application",
    year: "2025",
    description: "An automated faculty scheduling and subject allocation system - Freelance Client Project",
    mainImage: "/projects/main_image1.png",
    technologies: ["React", "Laravel", "Inertia.js", "MySQL"],
    fullDescription: "A desktop application developed as a freelance project for a client. The Faculty Scheduling System automates the process of assigning subjects to faculty members and generating optimized schedules. Built with React for the frontend, Laravel for the backend, and Inertia.js for seamless SPA-like navigation, all powered by a MySQL database.",
    features: [
      "Automated subject-to-faculty allocation",
      "Schedule generation and optimization",
      "Program and curriculum management",
      "Faculty workload tracking",
      "Report generation and export",
      "Conflict detection and resolution",
    ],
    subImages: [
      { url: "/projects/sub_image_assigning_subject_to_program.png", caption: "Assigning subjects to programs" },
      { url: "/projects/sub_image_subject_allocation.png", caption: "Subject allocation interface" },
      { url: "/projects/sub_image_report.png", caption: "Generated schedule report" },
      { url: "/projects/sub_image_report2.png", caption: "Detailed faculty report" },
    ],
    pdfReports: [
      { name: "Sample CBT Class Schedule", url: "/reports/Sample-CBT-Class-Schedule.pdf" },
      { name: "Sample CBT Faculty Schedule", url: "/reports/Sample-CBT-Faculty-Schedule.pdf" },
    ],
  },
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <main className="relative bg-black/[0.96] antialiased bg-grid-white/[0.02] min-h-screen overflow-hidden">
      <Navigation />
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
            My Projects
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full"></div>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative h-64 md:h-96 bg-slate-800">
                <Image
                  src={projects[currentIndex].mainImage}
                  alt={projects[currentIndex].title}
                  fill
                  className="object-cover"
                />
                {/* Type Badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-sky-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    {projects[currentIndex].type}
                  </span>
                  <span className="px-3 py-1 bg-slate-900/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    {projects[currentIndex].year}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-white mb-3">
                  {projects[currentIndex].title}
                </h2>
                <p className="text-neutral-400 mb-4">
                  {projects[currentIndex].description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[currentIndex].technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => setSelectedProject(projects[currentIndex])}
                  className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition-colors duration-300 cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevProject}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-12 h-12 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextProject}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-12 h-12 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  index === currentIndex
                    ? "bg-sky-500 w-8"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}

// Image Lightbox Component
function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Full Size Image */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative w-full h-full max-w-6xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="100vw"
        />
      </motion.div>

      {/* Caption */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900/80 backdrop-blur-sm rounded-lg">
        <p className="text-sm text-neutral-300">{alt}</p>
      </div>
    </motion.div>
  );
}

// Project Detail Modal Component
function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  if (!project) return null;

  return (
    <>
      {/* Image Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <ImageLightbox
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            onClose={() => setLightboxImage(null)}
          />
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-4 right-4 float-right z-10 w-10 h-10 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-8">
            {/* Main Image */}
            <div
              className="relative h-64 md:h-96 bg-slate-800 rounded-xl mb-8 overflow-hidden cursor-pointer group"
              onClick={() => setLightboxImage({ src: project.mainImage, alt: project.title })}
            >
              <Image
                src={project.mainImage}
                alt={project.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
              {/* Type & Year Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-sky-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                  {project.type}
                </span>
                <span className="px-3 py-1 bg-slate-900/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                  {project.year}
                </span>
              </div>
            </div>

            {/* Project Title & Description */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {project.title}
            </h2>
            <p className="text-neutral-300 text-lg mb-6 leading-relaxed">
              {project.fullDescription}
            </p>

            {/* Technologies */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-sky-400 mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-sky-400 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-neutral-300">
                    <span className="text-sky-500 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sub Images */}
            {project.subImages && project.subImages.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-sky-400 mb-4">Screenshots</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.subImages.map((img, index) => (
                    <div
                      key={index}
                      className="bg-slate-800 rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => setLightboxImage({ src: img.url, alt: img.caption })}
                    >
                      <div className="relative h-48">
                        <Image
                          src={img.url}
                          alt={img.caption}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                          <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-sm text-neutral-400">{img.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PDF Reports */}
            {project.pdfReports && project.pdfReports.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-sky-400 mb-3">Reports & Documentation</h3>
                <div className="space-y-2">
                  {project.pdfReports.map((pdf, index) => (
                    <a
                      key={index}
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-sky-500/50 transition-colors cursor-pointer"
                    >
                      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                        <path d="M14 2v6h6M10 13h4M10 17h4M10 9h1" />
                      </svg>
                      <span className="text-neutral-300">{pdf.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition-colors cursor-pointer"
                >
                  View Live Site
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-700 hover:border-sky-500 transition-all cursor-pointer"
                >
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
