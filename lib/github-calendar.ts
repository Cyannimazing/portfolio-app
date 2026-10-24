import type { GitHubActivity } from "./github-activity";

function attribute(tag: string, name: string) {
  return new RegExp(`(?:^|\\s)${name}=["']([^"']*)["']`, "i").exec(tag)?.[1];
}

function textContent(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/\s+/g, " ").trim();
}

export function parseGitHubCalendar(html: string): Pick<GitHubActivity, "total" | "from" | "to" | "days"> {
  const counts = new Map<string, number>();
  for (const tooltip of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/gi)) {
    const id = attribute(tooltip[1], "for");
    const count = /^(No|[\d,]+) contributions?\b/i.exec(textContent(tooltip[2]))?.[1];
    if (id && count) counts.set(id, count.toLowerCase() === "no" ? 0 : Number(count.replaceAll(",", "")));
  }

  const days: GitHubActivity["days"] = [];
  const dates = new Set<string>();
  for (const cell of html.matchAll(/<td\b[^>]*\bdata-date=["'][^"']+["'][^>]*>/gi)) {
    const date = attribute(cell[0], "data-date");
    const id = attribute(cell[0], "id");
    const intensity = attribute(cell[0], "data-level");
    const count = id ? counts.get(id) : undefined;
    const level = intensity === undefined ? NaN : Number(intensity);
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || dates.has(date)
      || !Number.isFinite(Date.parse(`${date}T00:00:00Z`))
      || new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date
      || count === undefined || !Number.isSafeInteger(count) || count < 0
      || !Number.isInteger(level) || level < 0 || level > 4
      || (count === 0) !== (level === 0)) {
      throw new Error("GitHub returned an invalid contribution calendar.");
    }
    dates.add(date);
    days.push({ date, count, level });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  if (days.length < 365 || days.length > 373 || days.some((day, index) => index > 0
    && Date.parse(day.date) - Date.parse(days[index - 1].date) !== 86_400_000)) {
    throw new Error("GitHub returned an incomplete contribution calendar.");
  }

  const heading = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)]
    .map(match => /([\d,]+) contributions? in the last year/i.exec(textContent(match[1]))?.[1]).find(Boolean);
  const total = heading ? Number(heading.replaceAll(",", "")) : NaN;
  if (!Number.isSafeInteger(total) || total !== days.reduce((sum, day) => sum + day.count, 0)) {
    throw new Error("GitHub contribution totals could not be verified.");
  }
  return { total, from: days[0].date, to: days[days.length - 1].date, days };
}
