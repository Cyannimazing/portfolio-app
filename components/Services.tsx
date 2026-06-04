"use client";
import { motion } from "framer-motion";
import { CardSpotlight } from "./ui/card-spotlight";
import { SiReact, SiNextdotjs, SiLaravel, SiNodedotjs, SiPostgresql } from "react-icons/si";
import { MdApi, MdPhoneIphone } from "react-icons/md";

const services = [
  {
    icon: <SiNextdotjs className="w-7 h-7" />,
    title: "Frontend Development",
    desc: "Responsive, accessible, and polished interfaces using React, Next.js, Nuxt.js, and Tailwind CSS. Every pixel is intentional.",
    tags: ["React.js", "Next.js", "Tailwind CSS"],
  },
  {
    icon: <SiLaravel className="w-7 h-7" />,
    title: "Backend Development",
    desc: "Solid server-side logic and APIs with Laravel and Node.js. Built to scale, designed to last.",
    tags: ["Laravel", "Node.js", "REST APIs"],
  },
  {
    icon: <MdPhoneIphone className="w-7 h-7" />,
    title: "Mobile Development",
    desc: "Cross-platform mobile applications with React Native and Expo that feel native on any device.",
    tags: ["React Native", "Expo"],
  },
  {
    icon: <MdApi className="w-7 h-7" />,
    title: "API & Integrations",
    desc: "Third-party integrations built properly. OAuth 2.0, Graph API, payment systems, and more connected seamlessly into your platform.",
    tags: ["OAuth 2.0", "Graph API", "Webhooks"],
  },
];

export default function Services() {
  return (
    <section className="relative bg-[#080808] px-6 md:px-12 py-24">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-sky-400 text-xs font-bold uppercase tracking-[0.3em] mb-3">What I Do</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
            Services
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <CardSpotlight className="h-full rounded-md bg-[#0f0f0f] border-white/8 p-7" radius={300} color="#071a26">
                <div className="relative z-10 h-full flex flex-col gap-5">

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-md bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    {s.icon}
                  </div>

                  {/* Content */}
                  <div className="space-y-2 flex-1">
                    <h3 className="text-white font-black text-xl">{s.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/6">
                    {s.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium text-neutral-500 bg-white/4 border border-white/8 px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardSpotlight>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
