"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { MagneticButton } from "@/components/ui/magnetic-button";

const contactItems = [
  {
    label: "Email",
    value: "cyrilnarvasa589@gmail.com",
    href: "mailto:cyrilnarvasa589@gmail.com",
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/Cyannimazing",
    href: "https://github.com/Cyannimazing",
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/cyril-narvasa",
    href: "https://www.linkedin.com/in/cyril-narvasa-28620b293",
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Davao City, Philippines",
    href: null,
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const messagePlaceholders = [
  "Tell me about your project...",
  "What can I help you build?",
  "Looking for a developer?",
  "Got a freelance opportunity?",
  "Let's build something together.",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mlgbjney", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="relative bg-[#080808] min-h-screen overflow-hidden flex flex-col">

      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[36px_36px] pointer-events-none" />

      {/* Breadcrumb — fixed top-left like other pages */}
      <div className="relative z-10 px-8 md:px-14 pt-24 pb-6">
        <p className="text-neutral-600 text-xs font-semibold uppercase tracking-[0.3em]">Contact</p>
      </div>

      {/* Content — centered */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-8 md:px-14">
      <div className="pb-24">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <p className="text-sky-400 text-xs font-bold uppercase tracking-[0.3em] mb-2">Get In Touch</p>
          <h1 className="text-3xl font-black text-white mb-2">Contact</h1>
          <p className="text-neutral-500 text-sm max-w-md">Have a project in mind or just want to talk? I would love to hear from you.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left — Contact info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="space-y-8">
            <div className="space-y-4">
              {contactItems.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      className="cursor-pointer flex items-center gap-4 p-4 rounded-md bg-white/4 border border-white/8 hover:border-sky-500/30 hover:bg-sky-500/5 transition-all duration-200 group">
                      <span className="text-sky-500 group-hover:text-sky-400 transition-colors">{item.icon}</span>
                      <div>
                        <p className="text-neutral-600 text-xs uppercase tracking-wider font-medium mb-0.5">{item.label}</p>
                        <p className="text-neutral-200 text-sm font-medium group-hover:text-sky-400 transition-colors">{item.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-md bg-white/4 border border-white/8">
                      <span className="text-sky-500">{item.icon}</span>
                      <div>
                        <p className="text-neutral-600 text-xs uppercase tracking-wider font-medium mb-0.5">{item.label}</p>
                        <p className="text-neutral-200 text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-neutral-600 text-sm leading-relaxed">
              I typically respond within 24 hours. Looking forward to hearing from you.
            </motion.p>
          </motion.div>

          {/* Right — Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            {status === "sent" ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-10 rounded-md bg-sky-500/8 border border-sky-500/20 text-center space-y-3">
                <div className="w-12 h-12 bg-sky-500/20 rounded-md flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-white font-black text-xl">Message sent.</p>
                <p className="text-neutral-500 text-sm">I will get back to you as soon as possible.</p>
                <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
                  className="cursor-pointer mt-4 text-xs text-sky-400 hover:text-sky-300 transition-colors">
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest block mb-2">Name</label>
                  <input
                    type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-md bg-white/4 border border-white/8 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest block mb-2">Email</label>
                  <input
                    type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-md bg-white/4 border border-white/8 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>

                {/* Message — PlaceholdersAndVanishInput */}
                <div>
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest block mb-2">Message</label>
                  <textarea
                    required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-md bg-white/4 border border-white/8 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-sky-500/50 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
                )}

                <MagneticButton strength={0.4}>
                  <button type="submit" disabled={status === "sending"}
                    className="cursor-pointer w-full py-3.5 rounded-md bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white font-semibold text-sm transition-colors shadow-lg shadow-sky-500/20">
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </MagneticButton>
              </form>
            )}
          </motion.div>

        </div>
      </div>
      </div>
    </main>
  );
}
