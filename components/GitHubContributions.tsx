"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { IconArrowUpRight, IconBrandGithub, IconGitBranch } from "@tabler/icons-react";
import { githubActivityRefreshMs, githubProfileUrl, type GitHubActivity } from "@/lib/github-activity";
import styles from "./GitHubContributions.module.css";

const dayLength = 86_400_000;
function dateValue(date: string) { return new Date(`${date.slice(0, 10)}T00:00:00Z`); }
function formatDate(date: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(dateValue(date));
}

export default function GitHubContributions({ initialActivity }: { initialActivity: GitHubActivity | null }) {
  const [activity, setActivity] = useState(initialActivity);
  const [refreshFailed, setRefreshFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let inFlight = false;
    let lastAttempt = 0;
    async function refresh() {
      if (document.visibilityState === "hidden" || inFlight || Date.now() - lastAttempt < 60_000) return;
      inFlight = true;
      lastAttempt = Date.now();
      try {
        const response = await fetch("/api/github-activity", {
          cache: "no-store",
          signal: AbortSignal.any([controller.signal, AbortSignal.timeout(12_000)]),
        });
        if (!response.ok) throw new Error("GitHub refresh failed.");
        const latest: GitHubActivity = await response.json();
        if (!controller.signal.aborted) {
          setActivity(latest);
          setRefreshFailed(false);
        }
      } catch {
        if (!controller.signal.aborted) setRefreshFailed(true);
      } finally {
        inFlight = false;
      }
    }
    void refresh();
    const timer = window.setInterval(refresh, githubActivityRefreshMs);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      controller.abort();
      window.clearInterval(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  if (!activity) return <div className={styles.activity} data-github-activity>
    <header className={styles.header}><a className={styles.profileLink} href={githubProfileUrl} target="_blank" rel="noopener noreferrer"><span className={styles.icon}><IconBrandGithub size={19} aria-hidden="true" /></span><h2>GitHub contributions</h2><IconArrowUpRight className={styles.arrow} size={14} aria-hidden="true" /><span className="sr-only">, opens in a new tab</span></a></header>
    <div className={styles.unavailable} role="status"><p>GitHub activity is temporarily unavailable.</p><a href={githubProfileUrl} target="_blank" rel="noopener noreferrer">View my activity on GitHub <IconArrowUpRight size={14} aria-hidden="true" /><span className="sr-only">, opens in a new tab</span></a></div>
  </div>;

  const first = dateValue(activity.from);
  const start = first.getTime() - first.getUTCDay() * dayLength;
  const end = dateValue(activity.to).getTime();
  const days = new Map(activity.days.map(day => [day.date, day]));
  const weeks = Array.from({ length: Math.ceil((end - start + dayLength) / (7 * dayLength)) }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => days.get(new Date(start + (week * 7 + day) * dayLength).toISOString().slice(0, 10))));
  const months = weeks.flatMap((week, index) => {
    const day = index === 0 ? week.find(Boolean) : week.find(day => day?.date.endsWith("-01"));
    return day ? [{ name: formatDate(day.date, { month: "short" }), column: index + 1 }] : [];
  });
  const visibleMonths = months.filter((_, index) => index !== 0 || !months[1] || months[1].column > 3);
  const repository = activity.repositories[0];
  const repositoriesUrl = `${activity.profileUrl.replace(/\/$/, "")}?tab=repositories`;
  const range = `${formatDate(activity.from, { month: "short", year: "numeric" })} – ${formatDate(activity.to, { month: "short", year: "numeric" })}`;

  return <div className={styles.activity} data-github-activity>
    <header className={styles.header}>
      <a className={styles.profileLink} href={activity.profileUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub contributions, opens in a new tab">
        <span className={styles.icon}><IconBrandGithub size={19} aria-hidden="true" /></span>
        <div><h2>GitHub contributions</h2><p><strong>{activity.total.toLocaleString("en-US")}</strong> contributions</p></div>
        <IconArrowUpRight className={styles.arrow} size={14} aria-hidden="true" />
      </a>
      <span className={styles.updated} role="status"><time dateTime={activity.updatedAt} title={`Refreshes automatically every 15 minutes. Last retrieved from GitHub: ${new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Taipei" }).format(new Date(activity.updatedAt))} (UTC+8).`}>{refreshFailed ? "Refresh delayed" : `Updated ${formatDate(activity.updatedAt, { month: "short", day: "numeric" })}`}</time></span>
    </header>

    <figure className={styles.calendar} style={{ "--calendar-weeks": weeks.length } as CSSProperties} aria-label={`GitHub contribution calendar from ${range}`}>
      <div className={styles.months} aria-hidden="true">{visibleMonths.map(month => <span key={month.column} style={{ gridColumn: month.column }}>{month.name}</span>)}</div>
      <div className={styles.plot}>
        <div className={styles.dayLabels} aria-hidden="true">{["", "Mon", "", "Wed", "", "Fri", ""].map((label, index) => <span key={index}>{label}</span>)}</div>
        <div className={styles.cells} role="list" aria-label="Daily contribution counts">{weeks.flat().map((day, index) => {
          const label = day ? `${day.count} ${day.count === 1 ? "contribution" : "contributions"} on ${formatDate(day.date, { month: "long", day: "numeric", year: "numeric" })}` : undefined;
          return <span key={day?.date ?? `padding-${index}`} className={styles.cell} data-level={day ? Math.min(4, Math.max(0, day.level)) : undefined} data-empty={!day} role={day ? "listitem" : undefined} aria-label={label} aria-hidden={day ? undefined : true} title={label} />;
        })}</div>
      </div>
      <figcaption className={styles.legend}><span>{range}</span><span className={styles.key} aria-label="Contribution intensity from less to more">Less{[0, 1, 2, 3, 4].map(level => <i key={level} className={styles.cell} data-level={level} aria-hidden="true" />)}More</span></figcaption>
    </figure>

    <div className={styles.footer}>
      {repository && <a className={styles.repository} href={repository.url} target="_blank" rel="noopener noreferrer" title={repository.description ?? `View ${repository.name} on GitHub`} aria-label={`View ${repository.name} on GitHub, opens in a new tab`}><IconGitBranch size={15} aria-hidden="true" /><span><strong>{repository.name}</strong>{repository.language && <small>{repository.language}</small>}</span></a>}
      <a className={styles.repositoriesLink} href={repositoriesUrl} target="_blank" rel="noopener noreferrer">View repositories <IconArrowUpRight size={14} aria-hidden="true" /><span className="sr-only">, opens in a new tab</span></a>
    </div>
  </div>;
}
