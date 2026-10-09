"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconArrowUpRight } from "@tabler/icons-react";
import BrandMark from "./BrandMark";
import PortfolioSidebar from "./PortfolioSidebar";
import {
  Navbar, NavBody, NavItems, NavbarButton,
  MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle,
} from "./ui/resizable-navbar";
import styles from "./Navigation.module.css";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Work", link: "/works" },
  { name: "Services", link: "/services" },
  { name: "Contact", link: "/contact" },
];

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" aria-label="Cyril AI home" className={styles.wordmark} onClick={onClick}>
      <BrandMark theme="dark" size={32} className={styles.brandMark} />
      <span>Cyril <span className={styles.brandAccent}>AI</span></span>
    </Link>
  );
}

function DiscussLink({ onClick }: { onClick?: () => void }) {
  return (
    <NavbarButton as={Link} href="/contact" variant="secondary" className={styles.discussLink} onClick={onClick}>
      Book a discovery call <IconArrowUpRight size={17} stroke={1.7} aria-hidden="true" />
    </NavbarButton>
  );
}

function NavigationContent({ pathname }: { pathname: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback((restoreFocus = false) => {
    setMobileOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => { if (desktop.matches) closeMenu(); };
    desktop.addEventListener("change", onDesktop);
    return () => desktop.removeEventListener("change", onDesktop);
  }, [closeMenu]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mobileOpen, closeMenu]);

  return (
    <header ref={headerRef} className={`studio-navigation ${styles.header}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
      }}>
      <Navbar className={styles.navbar}>
        <NavBody compact={false} integrated className={styles.desktopBar}>
          <Wordmark />
          <nav aria-label="Main navigation" className={styles.desktopLinks}>
            <NavItems items={navItems} activePath={pathname} className={styles.navItems} />
          </nav>
          <DiscussLink />
        </NavBody>

        <MobileNav compact={false} integrated className={styles.mobileBar}>
          <MobileNavHeader className={styles.mobileHeader}>
            <Wordmark onClick={() => closeMenu()} />
            <MobileNavToggle ref={toggleRef} isOpen={mobileOpen} aria-controls="portfolio-mobile-menu"
              className={styles.toggle} onClick={() => setMobileOpen((open) => !open)} />
          </MobileNavHeader>
          <MobileNavMenu id="portfolio-mobile-menu" isOpen={mobileOpen}
            onClose={() => closeMenu(true)} className={styles.mobileMenu}>
            <nav aria-label="Mobile navigation" className={styles.mobileLinks}>
              {navItems.map((item) => {
                const active = pathname === item.link || (item.link !== "/" && pathname.startsWith(`${item.link}/`));
                return (
                  <Link key={item.link} href={item.link} aria-current={active ? "page" : undefined}
                    className={styles.mobileLink} onClick={() => closeMenu()}>
                    {item.name}
                  </Link>
                );
              })}
              <DiscussLink onClick={() => closeMenu()} />
            </nav>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/works" || pathname.startsWith("/works/") || pathname === "/services" || pathname === "/practice" || pathname === "/contact") return <PortfolioSidebar />;
  return <NavigationContent key={pathname} pathname={pathname} />;
}
