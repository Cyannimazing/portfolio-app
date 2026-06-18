"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SelectMenu } from "@/components/ui/select-menu";

const PROJECT_TYPES = [
  "Custom Business Software",
  "Business Website",
  "Mobile App",
  "Integrations & Automation",
  "Ongoing Support & Maintenance",
  "Other / Not sure yet",
];

const BUDGETS: Record<"USD" | "PHP", string[]> = {
  USD: ["< $1k", "$1k – $5k", "$5k – $10k", "$10k+", "Not sure yet"],
  PHP: ["< ₱50k", "₱50k – ₱150k", "₱150k – ₱300k", "₱300k+", "Not sure yet"],
};

const infoCards = [
  {
    title: "New Projects",
    sub: "Discuss your project, get a quote.",
    value: "cyrilnarvasa589@gmail.com",
    href: "mailto:cyrilnarvasa589@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Let's Connect",
    sub: "Find me on LinkedIn.",
    value: "linkedin.com/in/cyril-jian-narvasa",
    href: "https://www.linkedin.com/in/cyril-jian-narvasa",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function ContactClient() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [currency, setCurrency] = useState<"USD" | "PHP">("USD");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [attempted, setAttempted] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const switchCurrency = (c: "USD" | "PHP") => {
    setCurrency(c);
    set("budget", ""); // reset so a value from the other currency can't linger
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.projectType) {
      setAttempted(true);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mlgbjney", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          projectType: form.projectType,
          budget: form.budget ? `${form.budget} (${currency})` : "",
          message: form.message,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full px-4 py-3 rounded-md bg-white/4 border border-white/8 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-sky-500/50 transition-colors";

  return (
    <main className="relative bg-[#080808] min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[36px_36px] pointer-events-none" />

      {/* Breadcrumb */}
      <div className="relative z-10 px-8 md:px-14 pt-24 pb-6">
        <p className="text-neutral-600 text-xs font-semibold uppercase tracking-[0.3em]">Contact</p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — pitch + info cards */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sky-400 text-xs font-bold uppercase tracking-[0.3em] mb-5">Get In Touch</p>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight mb-8">
              Let&apos;s build something together.
            </h1>
            <p className="text-neutral-400 text-base leading-relaxed max-w-md mb-10">
              Whether you need custom business software, a new website, a mobile app, or help connecting your tools, tell me about it and I will craft the right plan.
            </p>

            <div className="space-y-4 max-w-md">
              {infoCards.map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-5 rounded-xl bg-white/4 border border-white/8 hover:border-sky-500/30 hover:bg-sky-500/5 transition-all"
                >
                  <span className="w-11 h-11 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                    {c.icon}
                  </span>
                  <div>
                    <p className="text-white font-bold text-sm mb-0.5">{c.title}</p>
                    <p className="text-neutral-500 text-xs mb-1">{c.sub}</p>
                    <p className="text-sky-400 text-sm font-medium group-hover:text-sky-300 transition-colors">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <p className="text-neutral-600 text-xs mt-6 flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Based in Davao City, Philippines · Available worldwide
            </p>
          </motion.div>

          {/* Right — form card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="rounded-2xl bg-[#0f0f0f] border border-white/8 p-6 md:p-8">
              {status === "sent" ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 bg-sky-500/20 rounded-md flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="text-white font-black text-xl">Message sent.</p>
                  <p className="text-neutral-500 text-sm">I will get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setStatus("idle"); setForm({ firstName: "", lastName: "", email: "", projectType: "", budget: "", message: "" }); }}
                    className="cursor-pointer mt-2 text-xs text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="text-white font-black text-2xl mb-1">Tell me about your project</h2>
                    <p className="text-neutral-500 text-sm">I will get back to you within 24 hours.</p>
                  </div>

                  {/* Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest block mb-2">First Name</label>
                      <input type="text" required value={form.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="Jane" className={fieldClass} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest block mb-2">Last Name</label>
                      <input type="text" required value={form.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Doe" className={fieldClass} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest block mb-2">Email</label>
                    <input type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@company.com" className={fieldClass} />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest block mb-2">Project Type</label>
                    <SelectMenu
                      value={form.projectType}
                      onChange={(v) => set("projectType", v)}
                      options={PROJECT_TYPES}
                      placeholder="Select a project type"
                      invalid={attempted && !form.projectType}
                    />
                    {attempted && !form.projectType && (
                      <p className="text-red-400 text-xs mt-1.5">Please choose a project type.</p>
                    )}
                  </div>

                  {/* Budget + currency toggle */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Budget Range</label>
                      <div className="flex items-center gap-1 bg-white/4 border border-white/8 rounded-md p-0.5">
                        {(["USD", "PHP"] as const).map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => switchCurrency(c)}
                            className={`cursor-pointer px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                              currency === c ? "bg-sky-500 text-white" : "text-neutral-500 hover:text-white"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    <SelectMenu
                      value={form.budget}
                      onChange={(v) => set("budget", v)}
                      options={BUDGETS[currency]}
                      placeholder="Select a range"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest block mb-2">Message</label>
                    <textarea required value={form.message} onChange={(e) => set("message", e.target.value)} rows={5} placeholder="Tell me about your project..." className={`${fieldClass} resize-none`} />
                  </div>

                  {status === "error" && <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>}

                  <MagneticButton strength={0.4}>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="cursor-pointer w-full py-3.5 rounded-md bg-linear-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-lg shadow-sky-500/20"
                    >
                      {status === "sending" ? "Sending..." : "Send Message"}
                    </button>
                  </MagneticButton>

                  <p className="text-neutral-600 text-xs text-center">I typically respond within 24 hours.</p>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
