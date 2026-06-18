"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiReact, SiNextdotjs, SiVuedotjs, SiTailwindcss, SiTypescript, SiJavascript, SiLaravel, SiNodedotjs, SiPostgresql, SiMysql, SiMongodb, SiFigma, SiGit, SiGithub, SiGraphql } from "react-icons/si";
import { MdApi, MdPhoneIphone } from "react-icons/md";
import { Timeline } from "@/components/ui/timeline";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

/* ─── Data ─────────────────────────────────────────────────── */

const manifesto = [
  {
    tag: "Mission",
    quote: "One person with purpose can change everything.",
    body: "I build software that helps businesses grow, and I leave every client better than I found them.",
  },
  {
    tag: "Vision",
    quote: "Building a legacy, not just a career.",
    body: "To build a studio from nothing and become the developer that teams seek out and rely on.",
  },
];

const coreValues = [
  { num: "01", name: "Honesty Over Everything",  desc: "I would rather tell you something uncomfortable than let you believe something false. With me, what you see is what you get." },
  { num: "02", name: "People Before Projects",   desc: "The project matters but the person behind it matters more. I listen first, build second. The best solutions come from actually understanding people." },
  { num: "03", name: "Build With Purpose",       desc: "I do not write code just to write code. Every line I put down serves a reason. If it does not make something better, it should not be there." },
  { num: "04", name: "Show Up Consistently",     desc: "Talent is nothing without reliability. I show up when it counts, I meet my deadlines, and I do not disappear when things get hard." },
  { num: "05", name: "Leave A Mark",             desc: "I want every project I touch to be better because I was part of it. Not just delivered, but genuinely better than when I found it." },
];


const timelineData = [
  {
    title: "2022 to 2026",
    content: (
      <div className="p-6 rounded-md bg-[#0f0f0f] border border-white/8 space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-white font-black text-lg">BS Information Technology</p>
            <p className="text-sky-400 text-sm font-semibold mt-0.5">STI College Davao</p>
          </div>
          <span className="text-xs font-bold text-neutral-600 uppercase tracking-widest bg-white/4 border border-white/8 px-3 py-1 rounded-md">Education</span>
        </div>
        <p className="text-neutral-500 text-sm leading-relaxed">
          Built my foundation here. Studied software engineering, databases, and web development.
          Worked on academic and capstone projects that pushed me to think like a real developer.
        </p>
      </div>
    ),
  },
  {
    title: "Jan 2026 to Jun 2026",
    content: (
      <div className="p-6 rounded-md bg-[#0f0f0f] border border-white/8 space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-white font-black text-lg">Full Stack Developer</p>
            <p className="text-sky-400 text-sm font-semibold mt-0.5">awork.dk - Obiyen Platform</p>
          </div>
          <span className="text-xs font-bold text-neutral-600 uppercase tracking-widest bg-white/4 border border-white/8 px-3 py-1 rounded-md">Internship</span>
        </div>
        <p className="text-neutral-500 text-sm leading-relaxed">
          Built and shipped production modules inside a live SaaS platform. Owned the Timesheet,
          Quotation, Helpdesk, and Chat systems end to end. Integrated OAuth 2.0, Graph API,
          Microsoft auth, SerpAPI, and Google Ads API. Handled WCAG 2.1 accessibility and
          Danish and English localization.
        </p>
      </div>
    ),
  },
];

const bentoItems = [
  { title: "Frontend Development",  description: "Responsive, accessible, and polished UIs with React, Next.js, Nuxt.js, and Tailwind CSS.", className: "md:col-span-2" },
  { title: "Backend Development",   description: "Solid APIs and server-side logic with Laravel and Node.js.", className: "md:col-span-1" },
  { title: "Mobile Development",    description: "Cross-platform mobile apps with React Native and Expo.", className: "md:col-span-1" },
  { title: "API Integrations",      description: "OAuth 2.0, Graph API, and third-party service integrations built for production.", className: "md:col-span-2" },
];

/* ─── Value Row ─────────────────────────────────────────────── */

/* ─── Bento Card ────────────────────────────────────────────── */
function BentoCard({ value, large, accent }: { value: typeof coreValues[0]; large?: boolean; accent?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative h-full w-full p-7 rounded-md border transition-all duration-300 overflow-hidden cursor-default ${
        hovered ? "border-sky-500/30" : "border-white/8"
      } ${accent ? "bg-sky-500/8" : "bg-[#0f0f0f]"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 [background:radial-gradient(ellipse_60%_60%_at_30%_80%,rgba(14,165,233,0.08),transparent)] pointer-events-none"
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3 text-center">

        <motion.span
          animate={{ opacity: hovered ? 1 : 0.4 }}
          className="text-sky-400 text-xs font-bold uppercase tracking-widest"
        >
          {value.num}
        </motion.span>

        <motion.h3
          animate={{ color: hovered ? "#e0f2fe" : "#ffffff" }}
          transition={{ duration: 0.3 }}
          className={`font-black leading-tight ${large ? "text-3xl md:text-4xl" : "text-lg md:text-xl"}`}
        >
          {value.name}
        </motion.h3>

        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-neutral-400 text-sm leading-relaxed overflow-hidden max-w-xs"
            >
              {value.desc}
            </motion.p>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function PracticeClient() {
  return (
    <main className="relative bg-[#080808] min-h-screen overflow-x-hidden">


      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[36px_36px] pointer-events-none" />

      {/* ── Mission & Vision — fills the screen from the top ── */}
      {/* Breadcrumb above the split */}
      <div className="px-8 md:px-14 pt-24 pb-6">
        <p className="text-neutral-600 text-xs font-semibold uppercase tracking-[0.3em]">About Me / Practice</p>
      </div>

      <section className="grid md:grid-cols-2 max-w-7xl mx-auto px-0">
        {manifesto.map((item, i) => (
          <motion.div
            key={item.tag}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.8 }}
            className={`relative min-h-[85vh] overflow-hidden ${
              i === 0 ? "border-b md:border-b-0 md:border-r border-white/6" : ""
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12">
            <div className="relative z-10 w-full max-w-md space-y-5">
              <span className="text-sky-400 text-xs font-bold uppercase tracking-[0.3em]">{item.tag}</span>

              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
                {item.quote}
              </h2>

              <p className="text-neutral-500 text-sm leading-relaxed">
                {item.body}
              </p>
            </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ── Core Values ── */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto py-20 min-h-screen flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-sky-400 text-xs font-bold uppercase tracking-[0.3em] mb-2">What I Stand For</p>
          <h2 className="text-3xl font-black text-white">Core Values</h2>
        </motion.div>

        {/* Mobile: single column stack | Desktop: bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 md:flex-1">

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}
            className="md:col-span-2 md:row-span-2 min-h-52 md:min-h-0">
            <BentoCard value={coreValues[0]} large />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="min-h-44 md:min-h-0">
            <BentoCard value={coreValues[1]} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="min-h-44 md:min-h-0">
            <BentoCard value={coreValues[2]} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="min-h-44 md:min-h-0">
            <BentoCard value={coreValues[3]} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
            className="md:col-span-2 min-h-44 md:min-h-0">
            <BentoCard value={coreValues[4]} />
          </motion.div>

        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sky-400 text-xs font-bold uppercase tracking-[0.3em] mb-2">What I Work With</p>
          <h2 className="text-3xl font-black text-white">Tech Stack</h2>
        </motion.div>

        <div className="space-y-8">
          {[
            {
              label: "Frontend",
              skills: [
                { name: "React.js",    icon: <SiReact /> },
                { name: "Next.js",     icon: <SiNextdotjs /> },
                { name: "Nuxt.js",     icon: <SiVuedotjs /> },
                { name: "Tailwind CSS",icon: <SiTailwindcss /> },
                { name: "TypeScript",  icon: <SiTypescript /> },
                { name: "JavaScript",  icon: <SiJavascript /> },
              ],
            },
            {
              label: "Backend",
              skills: [
                { name: "Laravel",     icon: <SiLaravel /> },
                { name: "Node.js",     icon: <SiNodedotjs /> },
                { name: "RESTful APIs",icon: <MdApi /> },
                { name: "Graph API",   icon: <SiGraphql /> },
                { name: "OAuth 2.0",   icon: <MdApi /> },
              ],
            },
            {
              label: "Database",
              skills: [
                { name: "PostgreSQL",  icon: <SiPostgresql /> },
                { name: "MySQL",       icon: <SiMysql /> },
                { name: "MongoDB",     icon: <SiMongodb /> },
              ],
            },
            {
              label: "Mobile",
              skills: [
                { name: "React Native",icon: <SiReact /> },
                { name: "Expo",        icon: <MdPhoneIphone /> },
              ],
            },
            {
              label: "Tools",
              skills: [
                { name: "Git",         icon: <SiGit /> },
                { name: "GitHub",      icon: <SiGithub /> },
                { name: "Figma",       icon: <SiFigma /> },
              ],
            },
          ].map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] items-start gap-6"
            >
              <span className="text-neutral-600 text-xs font-bold uppercase tracking-widest pt-2">{cat.label}</span>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s.name}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-neutral-200 bg-white/4 border border-white/8 rounded-md hover:border-sky-500/40 hover:text-sky-400 hover:bg-sky-500/6 transition-all duration-200 cursor-default"
                  >
                    <span className="text-base">{s.icon}</span>
                    {s.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Experience & Education ── */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <p className="text-sky-400 text-xs font-bold uppercase tracking-[0.3em] mb-2">Where I Have Been</p>
          <h2 className="text-3xl font-black text-white">Experience & Education</h2>
        </motion.div>
        <Timeline data={timelineData} />
      </section>


    </main>
  );
}
