import Link from "next/link";
import BrandMark from "./BrandMark";

const NAV = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About me", href: "/practice" },
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
    <footer className="relative overflow-hidden border-t border-[var(--studio-border)] bg-[var(--studio-sidebar)]">
      {/* Oversized faint wordmark */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center select-none">
        <span className="text-[20vw] leading-[0.8] font-black tracking-tight text-[var(--studio-text)] opacity-[0.035] whitespace-nowrap">
          Narvasa
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 pt-16 pb-10">

        {/* Columns */}
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">

          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" aria-label="Cyril AI home" className="cursor-pointer inline-flex items-center gap-2 group mb-4">
              <BrandMark theme="dark" size={24} className="h-6 w-6" />
              <span className="font-semibold text-sm tracking-wide text-[var(--studio-text)]">Cyril <span className="text-[var(--brand-accent)]">AI</span></span>
            </Link>
            <p className="text-[var(--studio-muted)] text-sm leading-relaxed mb-5">
              Full Stack Developer building custom business software, websites, and mobile apps that move businesses forward.
            </p>
            <Link
              href="/contact"
              data-studio-action className="inline-flex min-h-11 items-center gap-1.5 px-4 py-2 rounded-[var(--studio-control-radius)] text-xs font-semibold text-[var(--studio-action-ink)] bg-[var(--studio-action-bg)]"
            >
              Book a discovery call
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-[var(--studio-muted)] text-xs font-bold uppercase tracking-[0.3em] mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center text-[var(--studio-muted)] hover:text-[var(--studio-accent)] text-sm transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[var(--studio-muted)] text-xs font-bold uppercase tracking-[0.3em] mb-4">Connect</p>
            <ul className="space-y-2.5">
              {CONNECT.map((c) => (
                <li key={c.name}>
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-[var(--studio-muted)] hover:text-[var(--studio-accent)] text-sm transition-colors"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[var(--studio-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--studio-muted)] text-xs">&copy; {year} Cyril AI</p>
        </div>
      </div>
    </footer>
  );
}
