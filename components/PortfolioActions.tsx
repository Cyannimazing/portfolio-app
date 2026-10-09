"use client";

import Link from "next/link";
import { IconArrowUpRight, IconDownload } from "@tabler/icons-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import styles from "./PortfolioActions.module.css";

export default function PortfolioActions({ paused = false, contactHref = "/contact" }: { paused?: boolean; contactHref?: string }) {
  const ContactLink = contactHref.startsWith("#") ? "a" : Link;
  return <div className={styles.actions} data-portfolio-actions>
    <HoverBorderGradient as={ContactLink} href={contactHref} paused={paused} containerClassName={styles.call} className={styles.callBody}>Book a discovery call<IconArrowUpRight size={17} aria-hidden="true" /></HoverBorderGradient>
    <a href="/cv.pdf" download="Cyril-Jian-Narvasa-CV.pdf" className={styles.cv} data-studio-action><IconDownload size={16} aria-hidden="true" />Download CV</a>
  </div>;
}
