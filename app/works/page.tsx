"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
  contribution?: { role: string; team: string };
  subImages?: { url: string; caption: string }[];
  pdfReports?: { name: string; url: string }[];
  liveLink?: string;
  githubLink?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Obiyen",
    type: "Web Development",
    year: "Jan 2026 to Jun 2026",
    description: "Full-stack SaaS platform at awork.dk. Shipped timesheet, quoting, chat, and helpdesk modules in production.",
    mainImage: "/projects/obiyen_dashboard_main.png",
    technologies: ["Nuxt.js", "Vue 3", "Laravel", "PostgreSQL", "TypeScript", "Pusher"],
    fullDescription: "Obiyen is a comprehensive enterprise SaaS platform developed at awork.dk. Over six months I built and shipped multiple production modules across the full stack. My contributions spanned OAuth integrations, social media APIs, a Password Manager, SEO tooling, Timesheet workflows, a Quotation system, DocFlow accessibility compliance, a Chat ownership system, a Helpdesk, and platform-wide localization.",
    features: [
      "Analytics and reporting with Google Analytics, Search Console, Rank Tracker, and Google Ads integration",
      "Social media management for Meta, Instagram, LinkedIn, YouTube, and X with post management and engagement tracking",
      "Marketing automation including A/B testing, conversion optimization, surveys, and campaign management",
      "Consent Management Platform with cookie consent, GDPR compliance, and session tracking",
      "SEO and website auditing with keyword rankings, accessibility audits, and AI-powered analysis",
      "Password Manager with personal and company vaults, licensing, audit logs, and directory sync",
      "Quotation system with branded templates, CRM linking, digital approvals, and PDF generation",
      "Helpdesk with ticket management, knowledge base, contact directory, and AI-assisted support",
      "Real-time chat with agent assignment, department routing, embeddable widgets, and voice support",
      "Timesheet and time tracking with approval workflows, holiday management, and payroll export",
      "DocFlow document management with role-based visibility and WCAG 2.1 AA compliance",
      "Workflow and project management with boards, teams, and task tracking",
      "Billing and subscription management with payment processing and plan upgrades",
      "Multi-platform SSO with Microsoft, Google, and SAML authentication",
      "Mail signature builder with template management and team distribution",
    ],
    contribution: { role: "Full Stack Developer", team: "awork.dk development team" },
    subImages: [
      { url: "/projects/obiyen_dashboard_main.png", caption: "Main Dashboard showing platform activity and key metrics" },
      { url: "/projects/obiyen_timesheet.png", caption: "Timesheet Employee View for logging daily working hours" },
      { url: "/projects/obiyen_timesheet_admin.png", caption: "Timesheet Admin View for reviewing and approving timesheets" },
      { url: "/projects/obiyen_quote.png", caption: "Quote Management for creating and managing client-facing quotes" },
      { url: "/projects/obiyen_chat.png", caption: "Internal Chat for real-time messaging between team members" },
      { url: "/projects/obiyen_helpdesk.png", caption: "Helpdesk System for ticketing and support management" },
    ],
    liveLink: "https://app.obiyen.com",
  },
  {
    id: 2,
    title: "FaithSeeker",
    type: "Web Application",
    year: "2025",
    description: "Multi-tenant SaaS for church services booking and management. Capstone Project.",
    mainImage: "/projects/main_image.png",
    technologies: ["Next.js", "React", "Laravel API", "MySQL", "Tailwind CSS"],
    fullDescription: "A multi-tenant SaaS platform enabling church owners to subscribe and manage their operations. Multiple churches operate independently with admin portals for service bookings, appointments, and document generation.",
    features: ["Multi-tenant architecture", "Subscription-based SaaS", "Online service booking", "Appointment scheduling", "Official document generation", "Church admin dashboard"],
    contribution: { role: "Full Stack Developer", team: "Solo" },
    subImages: [
      { url: "/projects/sub_owner_image1.png", caption: "Admin Dashboard showing service and booking overview" },
      { url: "/projects/sub_owner_image2.png", caption: "My Churches multi-church management portal" },
      { url: "/projects/sub_churchgoer_image1.png", caption: "User Portal for service booking" },
    ],
    pdfReports: [
      { name: "Sample Baptism Certificate", url: "/reports/Certificate of Baptism.pdf" },
      { name: "Sample Marriage Certificate", url: "/reports/Certificate of Marriage.pdf" },
    ],
    liveLink: "https://churchms-frontend.vercel.app/",
  },
  {
    id: 3,
    title: "AidPoint",
    type: "Web Application",
    year: "2025",
    description: "SaaS financial aid management with role-based portals and multi-level approvals. Freelance Project.",
    mainImage: "/projects/aidpoint_main.png",
    technologies: ["Laravel API", "MySQL", "React", "Next.js", "Tailwind CSS"],
    fullDescription: "AidPoint is a SaaS platform streamlining financial aid operations for institutions. Features role-based portals for Admin, Director, Caseworker, Finance Officer, and Beneficiary with multi-level approval workflows.",
    features: ["Role-based portals", "Multi-level approvals", "Allocation and liquidation management", "Audit logs", "Secure authentication", "Real-time dashboards"],
    contribution: { role: "Backend Stack Developer", team: "4-person team" },
    subImages: [
      { url: "/projects/aidpoint_admin_portal.png", caption: "Admin Portal for system administration" },
      { url: "/projects/aidpoint_director_portal.png", caption: "Director Portal for review and approvals" },
      { url: "/projects/aidpoint_caseworker_portal.png", caption: "Caseworker Portal for case management" },
      { url: "/projects/aidpoint_finance_officer_portal.png", caption: "Finance Officer Portal for disbursement" },
      { url: "/projects/aidpoint_beneficiary_portal.png", caption: "Beneficiary Portal for requests and status tracking" },
    ],
  },
  {
    id: 4,
    title: "CacaoCare",
    type: "Mobile Application",
    year: "2024 to 2025",
    description: "Cacao disease classifier with mobile detection and web farm management. Thesis Project.",
    mainImage: "/projects/cacao_main_image.png",
    technologies: ["Nuxt.js", "Laravel", "MySQL", "Android Studio", "Java"],
    fullDescription: "CacaoCare combines mobile cacao pod disease detection with a web platform for farm management. Uses a custom-trained YOLO11s model for image-based detection.",
    features: ["YOLO11s disease detection", "Mobile real-time analysis", "Farm management dashboard", "Harvest data tracking", "RESTful API web-mobile sync"],
    contribution: { role: "Full Stack Developer (Web Only)", team: "2-person team" },
    subImages: [
      { url: "/projects/cacao_admin_portal_image.png", caption: "Admin Portal for farm management" },
      { url: "/projects/cacao_user_portal_image.png", caption: "Farmer interface and user portal" },
      { url: "/projects/cacao_mobile_image1.jpg", caption: "Mobile app pod detection interface" },
      { url: "/projects/cacao_mobile_image2.jpg", caption: "Mobile app disease analysis results" },
    ],
    liveLink: "https://cacao-care.nuxt.dev/",
  },
  {
    id: 5,
    title: "Faculty Scheduling",
    type: "Desktop Application",
    year: "2025",
    description: "Automated timetable generation and faculty workload management. Freelance Project.",
    mainImage: "/projects/main_image1.png",
    technologies: ["React", "Laravel", "Inertia.js", "MySQL", "Electron"],
    fullDescription: "A desktop application for a technical college automating conflict-free class timetables and faculty workload management.",
    features: ["Automated conflict-free timetable", "Faculty assignment", "Workload balancing", "PDF report generation", "Cross-platform desktop app"],
    contribution: { role: "Full Stack Developer", team: "2-person team" },
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
];

export default function WorksPage() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <main className="relative bg-[#080808] min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[36px_36px] pointer-events-none" />

      {/* Breadcrumb — matches Practice */}
      <div className="px-8 md:px-14 pt-24 pb-6 relative z-10">
        <p className="text-neutral-600 text-xs font-semibold uppercase tracking-[0.3em]">Works</p>
      </div>

      {/* Header — matches Practice section headers */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-sky-400 text-xs font-bold uppercase tracking-[0.3em] mb-2">Projects & Case Studies</p>
          <h1 className="text-3xl font-black text-white mb-2">Works</h1>
          <p className="text-neutral-500 text-sm">Click any project to explore the full case study.</p>
        </motion.div>
      </div>

      {/* Featured — Obiyen (full width) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          onClick={() => setSelected(projects[0])}
          className="cursor-pointer group relative h-96 md:h-125 rounded-md overflow-hidden border border-white/8 hover:border-sky-500/30 transition-all duration-300"
        >
          <Image src={projects[0].mainImage} alt={projects[0].title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

          {/* Badge */}
          <div className="absolute top-6 left-6">
            <span className="px-3 py-1 bg-sky-500 text-white text-xs font-bold rounded-md uppercase tracking-widest">Featured</span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <p className="text-sky-400 text-xs font-bold uppercase tracking-widest mb-2">{projects[0].type} · {projects[0].year}</p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3">{projects[0].title}</h2>
            <p className="text-neutral-400 text-sm md:text-base max-w-2xl mb-4">{projects[0].description}</p>
            <div className="flex flex-wrap gap-2">
              {projects[0].technologies.slice(0, 5).map(t => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-neutral-200">{t}</span>
              ))}
            </div>
          </div>

          {/* Hover CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-6 py-3 bg-sky-500 text-white font-semibold text-sm rounded-md">View Case Study</span>
          </div>
        </motion.div>
      </div>

      {/* Grid — remaining 4 projects */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {projects.slice(1).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelected(project)}
              className="cursor-pointer group relative h-64 rounded-md overflow-hidden border border-white/8 hover:border-sky-500/30 transition-all duration-300"
            >
              <Image src={project.mainImage} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-sky-400 text-xs font-bold uppercase tracking-widest mb-1">{project.type}</p>
                <h3 className="text-white font-black text-xl">{project.title}</h3>
                <p className="text-neutral-500 text-xs mt-0.5">{project.year}</p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-5 py-2 bg-sky-500 text-white font-semibold text-xs rounded-md">View Case Study</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectDetailModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </main>
  );
}

function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-10000 flex items-center justify-center p-4 bg-black/95" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative w-full h-full max-w-6xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" />
      </motion.div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#111]/80 backdrop-blur-sm rounded-md">
        <p className="text-sm text-neutral-300">{alt}</p>
      </div>
    </motion.div>
  );
}

function ProjectDetailModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  return (
    <>
      <AnimatePresence>
        {lightboxImage && <ImageLightbox src={lightboxImage.src} alt={lightboxImage.alt} onClose={() => setLightboxImage(null)} />}
      </AnimatePresence>

      {/* Backdrop — click outside to close */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-9999 flex items-end md:items-center justify-center md:p-6 bg-black/70 backdrop-blur-sm cursor-pointer"
      >
        {/* Modal panel — stop propagation so clicking inside doesn't close */}
        <motion.div
          initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={e => e.stopPropagation()}
          className="cursor-default relative w-full md:max-w-4xl max-h-[92vh] bg-[#0f0f0f] border border-white/10 rounded-t-md md:rounded-md shadow-2xl overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {/* Modal header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/6 bg-[#0f0f0f]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">{project.type}</span>
              <span className="text-xs text-neutral-600">{project.year}</span>
            </div>
            <button onClick={onClose} className="cursor-pointer w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="p-6 md:p-10">
            <div className="relative h-72 md:h-96 rounded-md mb-10 overflow-hidden cursor-pointer group" onClick={() => setLightboxImage({ src: project.mainImage, alt: project.title })}>
              <Image src={project.mainImage} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5">{project.title}</h2>
            <p className="text-neutral-400 text-base mb-10 leading-relaxed">{project.fullDescription}</p>
            <div className="mb-10">
              <h3 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(t => <span key={t} className="px-3 py-1.5 bg-white/4 border border-white/8 rounded-md text-sm text-neutral-300 hover:border-sky-500/40 hover:text-sky-400 transition-all">{t}</span>)}
              </div>
            </div>
            {project.contribution && (
              <div className="mb-10">
                <h3 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">Contribution</h3>
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
            <div className="mb-10">
              <h3 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {project.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white/4 rounded-md border border-white/8">
                    <div className="w-5 h-5 rounded-sm bg-sky-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-sky-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <span className="text-neutral-300 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            {project.subImages && project.subImages.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">Gallery</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.subImages.map((img, i) => (
                    <div key={i} className="group cursor-pointer" onClick={() => setLightboxImage({ src: img.url, alt: img.caption })}>
                      <div className="relative h-40 rounded-md overflow-hidden mb-2">
                        <Image src={img.url} alt={img.caption} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-600 group-hover:text-neutral-400 transition-colors">{img.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {project.pdfReports && project.pdfReports.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">Sample Documents</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.pdfReports.map((pdf, i) => (
                    <a key={i} href={pdf.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/4 border border-white/8 rounded-md hover:border-sky-500/30 transition-all group cursor-pointer">
                      <div className="w-10 h-10 bg-sky-500/10 rounded-md flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
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
            {(project.liveLink || project.githubLink) && (
              <div className="flex flex-wrap gap-4 pt-6 border-t border-white/8">
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="cursor-pointer px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-md transition-colors flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    View Live Site
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
