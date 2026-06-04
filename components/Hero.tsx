"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ContactModal from "./ContactModal";
import { ShootingStars } from "./ui/shooting-stars";
import { EncryptedText } from "./ui/encrypted-text";
import { FlipWords } from "./ui/flip-words";
import { MagneticButton } from "./ui/magnetic-button";

const CONTACT = [
  {
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "cyrilnarvasa589@gmail.com",
    href: "mailto:cyrilnarvasa589@gmail.com",
  },
  {
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
    label: "github.com/cyannimazing",
    href: "https://github.com/cyannimazing",
  },
  {
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: "linkedin.com/in/cyril-narvasa",
    href: "https://linkedin.com/in/cyril-narvasa",
  },
  {
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Philippines",
    href: null,
  },
];

export default function Hero() {
  const [flipped, setFlipped] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const router = useRouter();

  const flip = () => setFlipped((f) => !f);
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  const handleDownloadCV = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = "Cyril_Narvasa_CV.pdf";
    link.click();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080808] overflow-hidden">

      {/* Backgrounds */}
      <ShootingStars starColor="#38bdf8" trailColor="#7dd3fc" minSpeed={10} maxSpeed={22} minDelay={1200} maxDelay={3500} />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[36px_36px] pointer-events-none" />
      <div className="absolute inset-0 [background:radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(14,165,233,0.07),transparent)] pointer-events-none" />

      {/* Breadcrumb */}
      <div className="absolute z-10 top-24 left-8 md:left-14">
        <p className="text-neutral-600 text-xs font-semibold uppercase tracking-[0.3em]">Home</p>
      </div>

      {/* Main layout */}
      <div className="relative z-10 min-h-screen max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 pt-24 pb-16 md:pt-0 md:pb-0">

        {/* ── Left — Content ── */}
        <div className="flex-1 max-w-xl space-y-8">

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-sky-500/20 bg-sky-500/6 text-sky-400 text-[11px] font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Available for work
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <p className="text-neutral-600 text-[10px] font-medium uppercase tracking-[0.3em] mb-4">Hello, I&apos;m</p>
            <h1 className="font-extrabold tracking-tight leading-none">
              <span className="block text-white text-6xl md:text-7xl lg:text-8xl">
                <EncryptedText text="Cyril Jian" revealDelayMs={28} flipDelayMs={32} />
              </span>
              <span className="block text-sky-400 text-6xl md:text-7xl lg:text-8xl">
                <EncryptedText text="Narvasa" revealDelayMs={28} flipDelayMs={32} />
              </span>
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.32 }} className="text-xl md:text-2xl font-medium text-neutral-500">
            <FlipWords
              words={["Full Stack Developer", "Software Engineer", "Web Application Developer", "Mobile App Developer", "API Integrations Engineer", "UI/UX Implementer"]}
              className="text-sky-400 font-semibold"
            />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.42 }} className="text-neutral-500 text-base leading-relaxed">
            A Full-Stack Developer with production experience shipping end-to-end
            modules across a multi-app SaaS platform. From OAuth 2.0 and Graph API
            integrations to real-time systems and WCAG 2.1 compliant interfaces,
            I build and own features at every layer of the stack.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.52 }} className="flex flex-col sm:flex-row gap-3 w-full">
            <MagneticButton strength={0.5}>
              <button onClick={handleDownloadCV} className="cursor-pointer w-full sm:w-auto px-8 py-3.5 rounded-md bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm transition-colors shadow-lg shadow-sky-500/20">
                Download CV
              </button>
            </MagneticButton>
            <MagneticButton strength={0.5}>
              <button onClick={() => router.push("/contact")} className="cursor-pointer w-full sm:w-auto px-8 py-3.5 rounded-md border border-white/12 hover:border-sky-500/40 hover:bg-sky-500/6 text-white font-semibold text-sm transition-all">
                Let&apos;s Discuss
              </button>
            </MagneticButton>
          </motion.div>

        </div>

        {/* ── Right — Flippable business card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="shrink-0 w-full md:w-auto flex flex-col items-center"
        >
          {/* Flip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-center text-neutral-700 text-[10px] tracking-widest uppercase mb-4 select-none"
          >
            Click to flip
          </motion.p>

          {/* Business card — landscape, real proportions */}
          <div style={{ perspective: "1200px" }} className="relative">

            {/* Rotating gradient border */}
            <div className="absolute -inset-px rounded-md pointer-events-none overflow-hidden">
              <div
                className="absolute inset-0 rounded-md"
                style={{
                  background: "conic-gradient(from var(--angle, 0deg), transparent 60%, #38bdf8 80%, #7dd3fc 90%, transparent 100%)",
                  animation: "spin-border 4s linear infinite",
                }}
              />
            </div>

            {/* Outer glow */}
            <div className="absolute -inset-4 rounded-md bg-sky-500/8 blur-2xl pointer-events-none" />

            <motion.div
              onClick={flip}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="cursor-pointer relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-110"
            >

              {/* FRONT — Designed photo card */}
              <div
                className="absolute inset-0 rounded-md overflow-hidden shadow-2xl shadow-black/60"
                style={{ backfaceVisibility: "hidden" }}
              >
                {/* Photo */}
                <Image src="/profile.jpg" alt="Cyril Narvasa" fill className="object-cover object-top" priority />

                {/* Vignette */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-black/20 pointer-events-none" />

                {/* Subtle dot pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[18px_18px] pointer-events-none" />

                {/* Sky glow — top left */}
                <div className="absolute -top-6 -left-6 w-40 h-40 bg-sky-500/25 rounded-full blur-3xl pointer-events-none" />

                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-sky-500 via-sky-400/60 to-transparent" />

                {/* Left accent bar */}
                <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-linear-to-b from-sky-500 via-sky-400/30 to-transparent" />

                {/* All 4 corner brackets */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-sky-400/70 rounded-tl-sm pointer-events-none" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-sky-400/70 rounded-tr-sm pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-sky-400/70 rounded-bl-sm pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-sky-400/70 rounded-br-sm pointer-events-none" />

              </div>

              {/* BACK — Business card */}
              <div
                className="absolute inset-0 rounded-md overflow-hidden"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="h-full w-full rounded-md bg-[#0d0d0d] border border-white/8 p-6 relative">
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-sky-500/80 via-sky-400/40 to-transparent pointer-events-none" />

                  {/* Left accent bar */}
                  <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-linear-to-b from-sky-500/80 via-sky-400/20 to-transparent pointer-events-none" />

                  {/* Decorative triangle — bottom right */}
                  <div className="absolute bottom-0 right-0 w-28 h-28 opacity-[0.06] pointer-events-none overflow-hidden rounded-br-xl">
                    <svg viewBox="0 0 100 100" className="w-full h-full"><polygon points="100,0 100,100 0,100" fill="white" /></svg>
                  </div>

                  {/* Corner brackets */}
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-sky-400/40 rounded-tr-md pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-sky-400/40 rounded-bl-md pointer-events-none" />

                  <div className="relative z-10 h-full flex flex-col justify-between">

                    {/* Name + role + logo */}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white font-bold text-base tracking-tight uppercase leading-tight">Cyril Jian Narvasa</p>
                        <p className="text-sky-400 text-xs font-medium mt-1">Full Stack Developer</p>
                      </div>
                      <div className="relative w-9 h-9 opacity-80 shrink-0">
                        <Image src="/LOGO.png" alt="Logo" fill className="object-contain" />
                      </div>
                    </div>

                    {/* Contact rows with vertical accent bar */}
                    <div className="flex gap-3">
                      <div className="w-0.5 bg-linear-to-b from-sky-500 to-sky-500/10 rounded-full shrink-0" />
                      <div className="space-y-3">
                        {CONTACT.map((c, i) =>
                          c.href ? (
                            <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" onClick={stop}
                              className="cursor-pointer flex items-center gap-2.5 text-neutral-400 hover:text-sky-400 transition-colors text-xs group">
                              <span className="text-sky-500/80 group-hover:text-sky-400 transition-colors shrink-0">{c.icon}</span>
                              {c.label}
                            </a>
                          ) : (
                            <div key={i} className="flex items-center gap-2.5 text-neutral-400 text-xs">
                              <span className="text-sky-500/80 shrink-0">{c.icon}</span>
                              {c.label}
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Flip back */}
                    <button onClick={(e) => { e.stopPropagation(); flip(); }}
                      className="cursor-pointer self-start flex items-center gap-1.5 text-neutral-700 hover:text-sky-400 transition-colors text-[10px] font-medium tracking-widest uppercase">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      flip
                    </button>

                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </motion.div>

      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}
