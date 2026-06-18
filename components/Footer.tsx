import Link from "next/link";
import Image from "next/image";

const NAV = [
  { name: "Home", href: "/" },
  { name: "Practice", href: "/practice" },
  { name: "Works", href: "/works" },
  { name: "Contact", href: "/contact" },
];

const CONNECT = [
  { name: "Email", href: "mailto:cyrilnarvasa589@gmail.com", external: false },
  { name: "GitHub", href: "https://github.com/Cyannimazing", external: true },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/cyril-jian-narvasa", external: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#080808] border-t border-white/6 overflow-hidden">
      {/* Oversized faint wordmark */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center select-none">
        <span className="text-[20vw] leading-[0.8] font-black tracking-tight text-white/[0.03] whitespace-nowrap">
          Narvasa
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 pt-16 pb-10">

        {/* Columns */}
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">

          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="cursor-pointer inline-flex items-center gap-2 group mb-4">
              <div className="relative w-6 h-6">
                <Image src="/LOGO.png" alt="Logo" fill sizes="24px" className="object-contain" />
              </div>
              <span className="text-white font-semibold text-sm tracking-wide group-hover:text-sky-400 transition-colors">Portfolio</span>
            </Link>
            <p className="text-neutral-500 text-sm leading-relaxed mb-5">
              Full Stack Developer building custom business software, websites, and mobile apps that move businesses forward.
            </p>
            <Link
              href="/contact"
              className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold text-white bg-linear-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 transition-all"
            >
              Let&apos;s Discuss
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-neutral-600 text-xs font-bold uppercase tracking-[0.3em] mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="cursor-pointer text-neutral-400 hover:text-sky-400 text-sm transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-neutral-600 text-xs font-bold uppercase tracking-[0.3em] mb-4">Connect</p>
            <ul className="space-y-2.5">
              {CONNECT.map((c) => (
                <li key={c.name}>
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="cursor-pointer text-neutral-400 hover:text-sky-400 text-sm transition-colors"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-600 text-xs">&copy; {year} Cyril Jian Narvasa &middot; All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
