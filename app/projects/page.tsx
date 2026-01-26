"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import { Spotlight } from "@/components/ui/spotlight";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

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
  contribution?: {
    role: string;
    team: string;
  };
  subImages?: { url: string; caption: string }[];
  pdfReports?: { name: string; url: string }[];
  liveLink?: string;
  githubLink?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "FaithSeeker",
    type: "Web Application",
    year: "2025",
    description: "Multi-tenant SaaS platform for church services booking and management — Capstone Project",
    mainImage: "/projects/main_image.png",
    technologies: ["Next.js", "React", "Laravel API", "MySQL", "Tailwind CSS", "Git"],
    fullDescription: "A multi-tenant SaaS platform that enables church owners to subscribe and manage their own church operations. FaithSeeker allows multiple churches to operate independently on a single platform, each with their own admin portal for managing service bookings, appointments, schedules, and official document generation. Churchgoers can easily book services and track their appointments through a dedicated user portal. Built with a React/Next.js frontend styled with Tailwind CSS, powered by a Laravel RESTful API backend with MySQL database supporting multi-tenancy.",
    features: [
      "Multi-tenant architecture for multiple churches",
      "Subscription-based SaaS model for church owners",
      "Online service booking and reservation system",
      "Appointment scheduling and calendar management",
      "Official document generation (certificates)",
      "Church admin dashboard with full management controls",
      "User portal for booking history and status",
      "RESTful API architecture (GET, POST, PUT, DELETE)",
    ],
    contribution: {
      role: "Full Stack Developer",
      team: "Solo",
    },
    subImages: [
      { url: "/projects/sub_owner_image1.png", caption: "Admin Dashboard - Service and booking overview" },
      { url: "/projects/sub_owner_image2.png", caption: "My Churches - Multi-church management portal" },
      { url: "/projects/sub_churchgoer_image1.png", caption: "User Portal - Service booking interface" },
    ],
    pdfReports: [
      { name: "Sample Baptism Certificate", url: "/reports/Certificate of Baptism.pdf" },
      { name: "Sample Marriage Certificate", url: "/reports/Certificate of Marriage.pdf" },
    ],
  },
  {
    id: 2,
    title: "Faculty Scheduling System",
    type: "Desktop Application",
    year: "2025",
    description: "Automated timetable generation and faculty workload management — Freelance Project",
    mainImage: "/projects/main_image1.png",
    technologies: ["React", "Laravel", "Inertia.js", "MySQL", "Electron", "Tailwind CSS", "DomPDF"],
    fullDescription: "A desktop application developed for a technical college to automate the creation of conflict-free class timetables and manage faculty workloads. The system intelligently assigns subjects to instructors while preventing scheduling conflicts, and generates printable reports for administration. Built as a cross-platform desktop app using Electron with a React + Inertia.js frontend, Laravel backend, and MySQL database. Report generation is handled through Laravel DomPDF.",
    features: [
      "Automated conflict-free timetable generation",
      "Intelligent subject-to-faculty assignment",
      "Faculty workload balancing and tracking",
      "Program and curriculum management",
      "PDF report generation (class & faculty schedules)",
      "Cross-platform desktop application",
    ],
    contribution: {
      role: "Full Stack Developer",
      team: "2-person team (me + a friend)",
    },
    subImages: [
      { url: "/projects/sub_image1.png", caption: "Subject assignment to programs" },
      { url: "/projects/sub_image2.png", caption: "Faculty subject allocation" },
      { url: "/projects/sub_image3.png", caption: "Generated class schedule report" },
      { url: "/projects/sub_image4.png", caption: "Faculty workload report" },
    ],
    pdfReports: [
      { name: "Sample Class Schedule", url: "/reports/Sample-CBT-Class-Schedule.pdf" },
      { name: "Sample Faculty Schedule", url: "/reports/Sample-CBT-Faculty-Schedule.pdf" },
    ],
  },
  {
    id: 3,
    title: "AidPoint",
    type: "Web Application",
    year: "2025",
    description: "SaaS financial aid management system with role-based portals, multi-level approvals, and subscription onboarding (Director) — Freelance Project",
    mainImage: "/projects/aidpoint_main.png",
    technologies: ["Laravel (API)", "MySQL", "React", "Next.js", "Tailwind CSS"],
    fullDescription:
      "AidPoint is a SaaS web-based platform designed to streamline end-to-end financial aid operations for institutions. It features role-based portals including Admin, Director, Caseworker, Finance Officer, and Beneficiary, enabling secure and structured workflows. The system enforces multi-level approvals before case disbursement, manages allocations and liquidations, and maintains audit logs for full transaction traceability. Directors can subscribe to activate and manage the institution’s access to the system. Built with Laravel (API) + MySQL, React/Next.js, and Tailwind CSS, with secure authentication and real-time dashboards.",
    features: [
      "Role-based portals (Admin, Director, Caseworker, Finance Officer, Beneficiary)",
      "Director subscription onboarding to activate institution access",
      "Multi-level approvals before case disbursement",
      "Allocation and liquidation management",
      "Audit logs for full transaction traceability",
      "Secure authentication and access control",
      "Real-time dashboards for operational monitoring",
    ],
    contribution: {
      role: "Backend Stack Developer",
      team: "4-person team",
    },
    subImages: [
      { url: "/projects/aidpoint_admin_portal.png", caption: "Admin Portal - System administration" },
      { url: "/projects/aidpoint_director_portal.png", caption: "Director Portal - Review and approvals" },
      { url: "/projects/aidpoint_caseworker_portal.png", caption: "Caseworker Portal - Case management workflow" },
      { url: "/projects/aidpoint_finance_officer_portal.png", caption: "Finance Officer Portal - Disbursement and liquidation" },
      { url: "/projects/aidpoint_beneficiary_portal.png", caption: "Beneficiary Portal - Requests and status tracking" },
    ],
  },
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [typeFilter, setTypeFilter] = useState<
    "All" | "Web Development" | "Desktop Application" | "Mobile Application"
  >("All");

  const featuredProject = projects[featuredIndex];

  // Auto-scroll featured projects every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % projects.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getProjectCategory = (
    project: Project
  ): "Web Development" | "Desktop Application" | "Mobile Application" => {
    const t = project.type.toLowerCase();
    if (t.includes("desktop")) return "Desktop Application";
    if (t.includes("mobile")) return "Mobile Application";
    // treat SaaS / web / anything else as web
    return "Web Development";
  };

  const filteredProjects =
    typeFilter === "All"
      ? projects
      : projects.filter((p) => getProjectCategory(p) === typeFilter);

  return (
    <main className="relative bg-black/[0.96] antialiased bg-grid-white/[0.02] min-h-screen overflow-hidden">
      <Navigation />
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <Spotlight className="top-40 right-0 md:right-60" fill="blue" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6">
            Featured Projects
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            A showcase of my recent work in full-stack development.
          </p>
        </motion.div>

        {/* Featured Project - Large Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500" />
            
            <div className="relative bg-slate-900/90 backdrop-blur-sm border border-slate-800 rounded-3xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="grid md:grid-cols-2 gap-0"
                >
                  {/* Image Section */}
                  <div className="relative h-72 md:h-[500px] overflow-hidden">
                    <Image
                      src={featuredProject.mainImage}
                      alt={featuredProject.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/80 md:block hidden" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:hidden" />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <span className="px-4 py-2 bg-sky-500 text-white text-sm font-bold rounded-full shadow-lg shadow-sky-500/25">
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-sky-500/20 text-sky-400 text-xs font-semibold rounded-full border border-sky-500/30">
                        {featuredProject.type}
                      </span>
                      <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-full">
                        {featuredProject.year}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {featuredProject.title}
                    </h2>
                    
                    <p className="text-neutral-400 mb-6 leading-relaxed">
                      {featuredProject.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {featuredProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-slate-300 hover:border-sky-500/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="flex gap-4">
                      <HoverBorderGradient
                        containerClassName="rounded-full"
                        className="flex items-center gap-2 px-6 py-2"
                        onClick={() => setSelectedProject(featuredProject)}
                      >
                        <span>View Case Study</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </HoverBorderGradient>
                    </div>

                    {/* Project Links */}
                    {(featuredProject.liveLink || featuredProject.githubLink) && (
                      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-slate-700/50">
                        {featuredProject.liveLink && (
                          <a
                            href={featuredProject.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 text-sm font-medium rounded-lg border border-sky-500/30 hover:border-sky-500/50 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span>Live Demo</span>
                          </a>
                        )}
                        {featuredProject.githubLink && (
                          <a
                            href={featuredProject.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white text-sm font-medium rounded-lg border border-slate-700 hover:border-slate-600 transition-all"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Featured Project Selector */}
          <div className="flex justify-center gap-3 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setFeaturedIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === featuredIndex
                    ? "bg-sky-500 w-12"
                    : "bg-slate-700 hover:bg-slate-600 w-8"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* All Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div className="flex items-center gap-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                All Projects
              </h2>
              <div className="hidden md:block h-px flex-1 w-24 bg-gradient-to-r from-slate-800 via-slate-700 to-transparent" />
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap gap-2 md:justify-end">
              {([
                "All",
                "Web Development",
                "Desktop Application",
                "Mobile Application",
              ] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setTypeFilter(filter)}
                  aria-pressed={typeFilter === filter}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                    typeFilter === filter
                      ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                      : "bg-slate-900/40 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group relative"
              >
                {/* Card Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
                
                <div
                  className="relative bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:border-slate-700 transition-all duration-300"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={project.mainImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-sky-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                        {project.type}
                      </span>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                        {project.year}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-slate-800/80 text-slate-400 text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded-md">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
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
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/95"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

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
  project: Project;
  onClose: () => void;
}) {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <AnimatePresence>
        {lightboxImage && (
          <ImageLightbox
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            onClose={() => setLightboxImage(null)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 bg-slate-900 md:bg-black/90 md:backdrop-blur-sm"
      >
        <div
          className="relative w-full h-full md:h-auto md:max-w-5xl md:max-h-[90vh] bg-slate-900 md:border md:border-slate-800 md:rounded-3xl shadow-2xl overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-6 pt-16 md:p-12">
            {/* Main Image */}
            <div
              className="relative h-72 md:h-[400px] bg-slate-800 rounded-2xl mb-10 overflow-hidden cursor-pointer group"
              onClick={() => setLightboxImage({ src: project.mainImage, alt: project.title })}
            >
              <Image
                src={project.mainImage}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-4 py-1.5 bg-sky-500 text-white text-sm font-semibold rounded-full">
                    {project.type}
                  </span>
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                    {project.year}
                  </span>
                </div>
              </div>
            </div>

            {/* Project Title & Description */}
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {project.title}
            </h2>
            <p className="text-neutral-300 text-lg mb-10 leading-relaxed">
              {project.fullDescription}
            </p>

            {/* Technologies */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-sky-400 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-300 hover:border-sky-500/50 hover:text-sky-400 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Contribution */}
            {project.contribution && (
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-sky-400 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Contribution
                </h3>

                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl">
                    <p className="text-xs text-neutral-500 mb-1">Role</p>
                    <p className="text-sm text-white font-medium">{project.contribution.role}</p>
                  </div>
                  <div className="px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl">
                    <p className="text-xs text-neutral-500 mb-1">Team</p>
                    <p className="text-sm text-white font-medium">{project.contribution.team}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-sky-400 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Key Features
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <div className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Screenshots */}
            {project.subImages && project.subImages.length > 0 && (
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-sky-400 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Screenshots
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.subImages.map((img, index) => (
                    <div
                      key={index}
                      className="group cursor-pointer"
                      onClick={() => setLightboxImage({ src: img.url, alt: img.caption })}
                    >
                      <div className="relative h-40 rounded-xl overflow-hidden mb-2">
                        <Image
                          src={img.url}
                          alt={img.caption}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors">{img.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PDF Reports */}
            {project.pdfReports && project.pdfReports.length > 0 && (
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-sky-400 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Sample Documents
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.pdfReports.map((pdf, index) => (
                    <a
                      key={index}
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-red-500/50 hover:bg-slate-800 transition-all group cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                        <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                          <path d="M14 2v6h6M10 13h4M10 17h4M10 9h1" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium group-hover:text-red-400 transition-colors">{pdf.name}</p>
                        <p className="text-xs text-neutral-500">Click to view PDF</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {(project.liveLink || project.githubLink) && (
              <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-800">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Live Site
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl border border-slate-700 hover:border-slate-600 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
