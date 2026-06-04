"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EncryptedText } from "./ui/encrypted-text";

const navItems = [
  { name: "Home",     href: "/" },
  { name: "Practice", href: "/practice" },
  { name: "Works",    href: "/works" },
  { name: "Contact",  href: "/contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#080808]/85 backdrop-blur-lg" : ""
      }`}>

        {/* Bottom gradient accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-sky-500/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-2 shrink-0"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <motion.div
              animate={logoHovered ? { rotate: 15, scale: 1.1 } : { rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative w-7 h-7"
            >
              <Image src="/LOGO.png" alt="Logo" fill sizes="28px" className="object-contain" priority />
            </motion.div>
            <span className={`font-semibold text-xl tracking-wide transition-colors duration-200 ${logoHovered ? "text-sky-400" : "text-white"}`}>
              <EncryptedText
                text="Portfolio"
                revealDelayMs={30}
                flipDelayMs={25}
              />
            </span>
          </Link>
          </motion.div>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {navItems.map((item, idx) => {
              const active = pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08, duration: 0.4, ease: "easeOut" }}
                >
                <Link
                  href={item.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer rounded-md z-10 block ${
                    active ? "text-sky-400" : "text-neutral-500 hover:text-white"
                  }`}
                >
                  {/* Hover — radial sky glow */}
                  {hoveredIdx === idx && !active && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-md"
                      style={{
                        background: "radial-gradient(ellipse at 50% 100%, rgba(14,165,233,0.18) 0%, transparent 70%)",
                        boxShadow: "inset 0 -1px 0 rgba(56,189,248,0.3)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}

                  {/* Active — neon underline glow */}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0.5 left-3 right-3 h-px bg-sky-400 rounded-full"
                      style={{ boxShadow: "0 0 10px 2px rgba(56,189,248,0.7), 0 0 4px 1px rgba(56,189,248,0.5)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10">{item.name}</span>
                </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden cursor-pointer p-1 text-neutral-400 hover:text-white transition-colors"
            aria-label="Menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <motion.span animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block h-px bg-current w-full origin-center" />
              <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block h-px bg-current w-full" />
              <motion.span animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block h-px bg-current w-full origin-center" />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden bg-[#080808]/98 backdrop-blur-md flex flex-col items-center justify-center gap-10"
            onClick={() => setMobileOpen(false)}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={item.href}
                  className={`text-4xl font-bold tracking-tight cursor-pointer ${
                    pathname === item.href ? "text-sky-400" : "text-white hover:text-sky-400 transition-colors"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
