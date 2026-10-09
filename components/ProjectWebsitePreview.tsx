"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { IconBrowser } from "@tabler/icons-react";
import { projectPreviewPosters, projectPreviews } from "@/lib/project-previews";
import type { PortfolioProject } from "@/lib/project-stories";
import styles from "./ProjectWebsitePreview.module.css";

// A display-only website viewport. All navigation lives in surrounding buttons.
export default function ProjectWebsitePreview({ project, active = true, compact = false, wide = false, retainLive = false, navigation, children }: { project: PortfolioProject; paused: boolean; active?: boolean; compact?: boolean; wide?: boolean; retainLive?: boolean; navigation?: ReactNode; children?: ReactNode }) {
  const preview = projectPreviews[project.id];
  const screenshot = projectPreviewPosters[project.id];
  const stage = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [activated, setActivated] = useState(false);
  const [scale, setScale] = useState(1);
  const display = active || (retainLive && activated);
  const moving = !!preview.url && activated && (active || retainLive) && !failed;
  const fallback = !preview.url || failed;

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActivated(true); }, { rootMargin: "100px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = body.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 1440);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!moving || ready) return;
    const timeout = window.setTimeout(() => setFailed(true), 20000);
    return () => window.clearTimeout(timeout);
  }, [moving, ready]);

  const status = !preview.url || failed ? "Actual screenshot" : ready ? "Live website" : "Loading website";
  return <div ref={stage} className={`${styles.stage} ${compact ? styles.compact : ""} ${wide ? styles.wide : ""}`} data-project-preview data-preview-mode={moving ? "live" : fallback ? "screenshot" : "idle"} data-preview-ready={ready}>
    <div className={styles.browser}>
    <div className={styles.browserBar}><IconBrowser size={15} stroke={1.5} aria-hidden="true" /><span className={styles.address}>{preview.label}</span><span className={styles.previewState}><i aria-hidden="true" />{status}</span></div>
    <div ref={body} className={styles.browserBody} inert aria-hidden="true">
      {moving && <iframe title={`${project.name} live website`} src={preview.url} tabIndex={-1} onLoad={() => setReady(true)} onError={() => setFailed(true)} allow="autoplay" referrerPolicy="no-referrer" sandbox="allow-scripts allow-same-origin" style={{ height: wide ? 810 : 900, transform: `scale(${scale})` }} />}
      {fallback && display && screenshot && <Image src={screenshot} alt={`${project.name} actual interface screenshot`} fill sizes={compact ? "(min-width: 1280px) 24vw, (min-width: 600px) 45vw, 94vw" : "(min-width: 1024px) 65vw, 94vw"} className={styles.screenshot} priority={!compact && active} />}
      {!fallback && display && screenshot && <noscript><Image src={screenshot} alt={`${project.name} actual interface screenshot`} fill sizes={compact ? "(min-width: 1280px) 24vw, (min-width: 600px) 45vw, 94vw" : "(min-width: 1024px) 65vw, 94vw"} className={styles.screenshot} /></noscript>}
      {fallback && !screenshot && <div className={styles.empty}><IconBrowser size={28} stroke={1.3} /><span>{project.name}</span><small>Explore the product features and project details.</small></div>}
      {moving && !ready && <div className={styles.empty}>
        <IconBrowser size={28} stroke={1.3} />
        <span>Loading live website</span>
        <small>{preview.label}</small>
      </div>}
    </div>
    {navigation && <div className={styles.navigation}>{navigation}</div>}
    {children && <div className={styles.overlay}>{children}</div>}
    </div>
  </div>;
}
