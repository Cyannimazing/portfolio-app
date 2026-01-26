"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Spotlight } from "@/components/ui/spotlight";

export default function AboutPage() {
  const skills = {
    frontend: ["HTML", "CSS", "JavaScript", "Next.js", "Nuxt.js"],
    backend: ["Laravel", "Python", "Java"],
    database: ["MySQL", "MongoDB"],
    tools: ["Git", "GitHub", "VS Code", "Figma"],
  };

  const bentoItems = [
    {
      title: "Frontend Development",
      description: "Building responsive and interactive user interfaces with Next.js, Nuxt.js, and modern frameworks.",
      icon: <div className="h-4 w-4 rounded-full bg-sky-500" />,
      className: "md:col-span-2",
    },
    {
      title: "Backend Development",
      description: "Creating robust server-side applications with Laravel and database management.",
      icon: <div className="h-4 w-4 rounded-full bg-sky-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Full Stack Solutions",
      description: "End-to-end development from concept to deployment with seamless integration.",
      icon: <div className="h-4 w-4 rounded-full bg-sky-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Freelance Experience",
      description: "Working on diverse projects, delivering quality solutions tailored to client needs.",
      icon: <div className="h-4 w-4 rounded-full bg-sky-500" />,
      className: "md:col-span-2",
    },
  ];

  return (
    <main className="relative bg-black/[0.96] antialiased bg-grid-white/[0.02] min-h-screen overflow-hidden">
      <Navigation />
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
            About Me
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full"></div>
        </motion.div>

        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 mb-8 items-center">
            {/* Profile Image */}
            <div className="md:col-span-2">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl">
                  <Image
                    src="/pfp.jpg"
                    alt="Cyril Narvasa"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-3 space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Hello! I'm Cyril Jian B. Narvasa
                </h2>
                <p className="text-lg text-neutral-300 leading-relaxed">
                  A passionate Full Stack Developer dedicated to creating beautiful, 
                  functional, and user-friendly digital experiences.
                </p>
              </div>

              <div className="space-y-4 text-neutral-400 leading-relaxed">
                <p>
                  I specialize in building modern web applications using Next.js, Nuxt.js, 
                  and Laravel. My experience spans both frontend and backend development, 
                  with a focus on creating clean, maintainable code and intuitive user 
                  interfaces.
                </p>
                <p>
                  As a freelance developer, I've had the opportunity to work on diverse 
                  projects, continuously expanding my skills and staying current with 
                  industry best practices.
                </p>
              </div>
            </div>
          </div>

          {/* Education - Full Width Below */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-sky-400 mb-2">
              Bachelor of Science in Information Technology
            </h3>
            <p className="text-white font-medium">STI College Davao</p>
            <p className="text-sm text-neutral-400">2022 - 2026</p>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, techs]) => (
              <motion.div
                key={category}
                whileHover={{ y: -5 }}
                className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 hover:border-sky-500/30 transition-all"
              >
                <h3 className="text-xl font-semibold text-sky-400 mb-4 capitalize">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-700/50 hover:border-sky-500/50 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What I Offer - Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
            What I Offer
          </h2>
          <BentoGrid className="max-w-7xl mx-auto">
            {bentoItems.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                icon={item.icon}
                className={item.className}
              />
            ))}
          </BentoGrid>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-800 rounded-3xl p-12 md:p-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Let&apos;s Work Together
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              I&apos;m always open to discussing new projects, creative ideas, or 
              opportunities to be part of your vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-full transition-colors duration-300 cursor-pointer"
              >
                Get In Touch
              </Link>
              <Link
                href="/"
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-full border border-slate-700 hover:border-sky-500 transition-all duration-300 cursor-pointer"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
