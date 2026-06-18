"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { CardSpotlight } from "./ui/card-spotlight";
import {
  MdDashboardCustomize,
  MdLanguage,
  MdPhoneIphone,
  MdSync,
  MdSupportAgent,
} from "react-icons/md";

const services = [
  {
    icon: <MdDashboardCustomize className="w-9 h-9" />,
    title: "Custom Business Software",
    tagline: "Software built around how your business runs.",
    desc: "Dashboards, booking systems, POS, and internal tools tailored to your operations, instead of a rigid off-the-shelf product you have to bend your business around.",
    gets: ["Roles & permissions", "Real-time updates", "Reports & exports", "Multi-branch support", "Secure data isolation"],
    tech: ["Laravel", "Nuxt.js", "Next.js", "PostgreSQL"],
  },
  {
    icon: <MdLanguage className="w-9 h-9" />,
    title: "Business Websites",
    tagline: "Sites that turn visitors into customers.",
    desc: "Fast, modern, mobile-ready websites built to load quickly, look great on every screen, and guide visitors toward booking, buying, or contacting you.",
    gets: ["Responsive design", "SEO foundations", "Contact & booking forms", "Fast page loads", "Analytics setup"],
    tech: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    icon: <MdPhoneIphone className="w-9 h-9" />,
    title: "Mobile Apps",
    tagline: "Your business, in your customers' pocket.",
    desc: "Cross-platform iOS and Android apps connected to your live business data, with the device features your users expect.",
    gets: ["iOS & Android, one codebase", "Camera & scanning", "Push notifications", "Offline support", "Syncs with your web platform"],
    tech: ["React Native", "Expo", "Android Studio"],
  },
  {
    icon: <MdSync className="w-9 h-9" />,
    title: "Integrations & Automation",
    tagline: "Connect your tools. Kill the busywork.",
    desc: "Link the services you already use (payments, social, email, accounting) and automate the manual steps that eat your team's time.",
    gets: ["Payment gateways", "Social & email integration", "Automated notifications", "Data sync between tools", "Scheduled reports"],
    tech: ["OAuth 2.0", "Graph API", "Webhooks", "REST APIs"],
  },
  {
    icon: <MdSupportAgent className="w-9 h-9" />,
    title: "Ongoing Support & Maintenance",
    tagline: "Launch is the start, not the finish.",
    desc: "Keep your software fast, secure, and improving after launch, with updates, monitoring, bug fixes, and new features as your business grows.",
    gets: ["Security updates", "Bug fixes", "Performance monitoring", "Feature improvements", "Priority support"],
    tech: ["Monitoring", "Backups", "CI/CD"],
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
          className="mb-20 max-w-2xl"
        >
          <p className="text-sky-400 text-xs font-bold uppercase tracking-[0.3em] mb-3">What I Can Build For You</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Services</h2>
          <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
            No jargon, just outcomes. Here is what I can deliver for your business, from the first idea to long after launch.
          </p>
        </motion.div>

        {/* Service blocks */}
        <div className="space-y-24 md:space-y-32">
          {services.map((s, i) => {
            const visualLeft = i % 2 === 1;
            return (
              <div
                key={s.title}
                className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:min-h-[58vh]"
              >
                {/* Text column */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                  className={visualLeft ? "lg:order-2" : ""}
                >
                  <p className="text-sky-400 text-xs font-bold uppercase tracking-[0.3em] mb-3">{s.tagline}</p>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4">{s.title}</h3>
                  <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8">{s.desc}</p>

                  {/* What You Get */}
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">What You Get</p>
                  <ul className="space-y-2.5 mb-8">
                    {s.gets.map((g) => (
                      <li key={g} className="flex items-center gap-3 text-neutral-300 text-sm">
                        <span className="w-5 h-5 rounded-sm bg-sky-500/15 flex items-center justify-center shrink-0">
                          <svg className="w-3 h-3 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        {g}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {s.tech.map((t) => (
                      <span key={t} className="text-xs font-medium text-neutral-400 bg-white/4 border border-white/8 px-3 py-1.5 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Sticky visual column */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                  className={`lg:sticky lg:top-28 ${visualLeft ? "lg:order-1" : ""}`}
                >
                  <Link href="/contact" className="group block" aria-label={`Discuss ${s.title}`}>
                    <CardSpotlight className="rounded-xl bg-[#0f0f0f] border-white/8 group-hover:border-sky-500/40 transition-colors p-0 h-72 lg:h-80" radius={320} color="#071a26">
                      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 text-center px-8">
                        <div className="w-16 h-16 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                          {s.icon}
                        </div>
                        <p className="text-white font-black text-xl">{s.title}</p>
                        <span className="text-neutral-600 text-xs font-bold uppercase tracking-[0.3em]">{`0${i + 1}`}</span>
                        <span className="inline-flex items-center gap-1.5 text-sky-400 text-xs font-bold uppercase tracking-widest opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          Let&apos;s Discuss
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </span>
                      </div>
                    </CardSpotlight>
                  </Link>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
