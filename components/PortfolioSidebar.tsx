"use client";

import Image from "next/image";
import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { IconArrowUpRight, IconBrandGithub, IconCompass, IconFolder, IconHome, IconMail, IconMapPin, IconWorld } from "@tabler/icons-react";
import { DesktopSidebar, MobileSidebar, Sidebar, SidebarLink, useSidebar } from "@/components/ui/sidebar";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { FlipWords } from "@/components/ui/flip-words";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import { studioEase, studioPanelStart, studioPanelVisible } from "@/lib/studio-motion";
import styles from "./PortfolioSidebar.module.css";

const links = [
  { label: "Home", href: "/", icon: IconHome },
  { label: "Projects", href: "/works", icon: IconFolder },
  { label: "Services", href: "/services", icon: IconWorld },
  { label: "My approach", href: "/practice", icon: IconCompass },
  { label: "Contact", href: "/contact", icon: IconMail },
];

const isCurrentPath = (pathname: string, href: string) => pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
const professionalTitles = ["Full Stack Developer", "AI Engineer", "AI Automation Specialist"];

function MobileMenuContent() {
  const { setOpen } = useSidebar();
  const pathname = usePathname();
  const reducedMotion = useMotionPreference();
  const item = {
    closed: { ...studioPanelStart, transition: { duration: reducedMotion ? 0 : 0.18, ease: studioEase } },
    open: { ...studioPanelVisible, transition: { duration: reducedMotion ? 0 : 0.5, ease: studioEase } },
  };
  return <>
    <motion.div variants={item} className={styles.menuBrand}>
      <Link href="/" onClick={() => setOpen(false)} aria-label="Cyril AI home"><BrandMark theme="dark" size={34} /><span>Cyril <span>AI</span></span></Link>
    </motion.div>
    <motion.div variants={item} className={styles.menuIntro}>
      <span>EXPLORE THE PORTFOLIO</span><h2>Where to next?</h2><p>The work, the craft, and what we can build together.</p>
    </motion.div>
    <motion.nav aria-label="Portfolio navigation" className={styles.menuLinks}
      variants={{ open: { transition: { delayChildren: reducedMotion ? 0 : 0.14, staggerChildren: reducedMotion ? 0 : 0.065 } }, closed: { transition: { staggerChildren: reducedMotion ? 0 : 0.025, staggerDirection: -1 } } }}>
      {links.map(({ icon: Icon, ...link }, index) => <motion.div key={link.href} variants={item} className={styles.menuLinkWrap}>
        <HoverBorderGradient as={Link} href={link.href} onClick={() => setOpen(false)} paused={reducedMotion} duration={1.1} aria-current={isCurrentPath(pathname, link.href) ? "page" : undefined} containerClassName={styles.menuLink} className={styles.menuLinkBody}>
          <span className={styles.menuRouteIcon}><Icon size={23} stroke={1.5} aria-hidden="true" /></span>
          <span className={styles.menuLabel}>{link.label}</span>
          <span className={styles.menuTrailing} aria-hidden="true"><span className={styles.menuIndex}>0{index + 1}</span><span className={styles.menuArrow}><IconArrowUpRight size={17} /></span></span>
        </HoverBorderGradient>
      </motion.div>)}
    </motion.nav>
    <motion.div variants={item} className={styles.menuFooter}>
      <div className={styles.menuSocials}><a href="https://github.com/Cyannimazing" target="_blank" rel="noopener noreferrer" aria-label="Cyril on GitHub, opens in a new tab"><IconBrandGithub size={20} aria-hidden="true" /><span className="sr-only">Cyril on GitHub, opens in a new tab</span></a><a href="mailto:cyrilnarvasa589@gmail.com" aria-label="Email Cyril"><IconMail size={20} aria-hidden="true" /><span className="sr-only">Email Cyril</span></a><ThemeSwitcher inline /></div>
      <HoverBorderGradient as={Link} href="/contact" onClick={() => setOpen(false)} paused={reducedMotion} containerClassName={styles.menuCta} className={styles.menuCtaInner}>Book a discovery call<span className={styles.menuCtaArrow}><IconArrowUpRight size={15} aria-hidden="true" /></span></HoverBorderGradient>
    </motion.div>
  </>;
}

function SidebarContent() {
  const pathname = usePathname();
  const { open } = useSidebar();
  const reducedMotion = useMotionPreference();
  const [profileHovered, setProfileHovered] = useState(false);
  const [profileFocused, setProfileFocused] = useState(false);
  return <>
    <Link href="/" className={styles.wordmark} aria-label="Cyril AI home"><BrandMark theme="dark" size={34} /><span>Cyril <span>AI</span></span></Link>
    <Link href="/" className={styles.profile} aria-label="Cyril Jian B. Narvasa, Full Stack Developer, AI Engineer and AI Automation Specialist. Home."
      onMouseEnter={() => setProfileHovered(true)} onMouseLeave={() => setProfileHovered(false)}
      onFocus={() => setProfileFocused(true)} onBlur={() => setProfileFocused(false)}>
      <div className={styles.portraitWrap}><Image src="/images/cyril-editorial-v2.webp" width={160} height={196} priority sizes="160px" className={styles.portrait} alt="Cyril Jian B. Narvasa" /></div>
      <span className={styles.profileName}>Cyril Jian B. Narvasa<span className={styles.profileDot} aria-hidden="true" /></span>
      <span className={styles.role} aria-hidden="true" data-profile-role><FlipWords words={professionalTitles} duration={4500} variant="subtle" paused={reducedMotion || open || profileHovered || profileFocused} className={styles.roleWords} /></span>
      <span className={styles.handle}>@Cyannimazing</span>
    </Link>
    <div className={styles.socials}>
      <a href="https://github.com/Cyannimazing" target="_blank" rel="noopener noreferrer" aria-label="Cyril on GitHub, opens in a new tab"><IconBrandGithub size={17} aria-hidden="true" /><span className="sr-only">Cyril on GitHub, opens in a new tab</span></a>
      <a href="mailto:cyrilnarvasa589@gmail.com" aria-label="Email Cyril"><IconMail size={17} aria-hidden="true" /><span className="sr-only">Email Cyril</span></a>
      <ThemeSwitcher inline />
    </div>
    <div className={styles.divider} />
    <nav aria-label="Portfolio navigation" className={styles.links}>
      {links.map(({ icon: Icon, ...link }) => <SidebarLink key={link.href} link={{ ...link, icon: <Icon size={18} stroke={1.6} aria-hidden="true" /> }}
        aria-current={isCurrentPath(pathname, link.href) ? "page" : undefined} className={styles.navLink} />)}
    </nav>
    <div className={styles.sidebarBottom}>
      <p><IconMapPin size={13} aria-hidden="true" /> Davao, Philippines</p>
      <span>© {new Date().getFullYear()} Cyril AI</span>
    </div>
  </>;
}

export default function PortfolioSidebar() {
  const [open, setOpen] = useState(false);
  return <aside className={`studio-navigation ${styles.sidebar}`}>
    <Sidebar open={open} setOpen={setOpen} animate={false}>
      <DesktopSidebar className={styles.desktop}><SidebarContent /></DesktopSidebar>
      <MobileSidebar className={styles.mobilePanel} data-portfolio-mobile-header
        brand={<Link href="/" className={styles.mobileIdentity} aria-label="Cyril AI home"><BrandMark theme="dark" size={32} /><span>Cyril <span>AI</span></span></Link>}>
        <MobileMenuContent />
      </MobileSidebar>
    </Sidebar>
  </aside>;
}
