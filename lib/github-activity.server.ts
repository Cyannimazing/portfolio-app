import "server-only";
import { githubProfileUrl, type GitHubActivity } from "./github-activity";
import { parseGitHubCalendar } from "./github-calendar";

const username = "Cyannimazing";
const headers = { "User-Agent": "Cyril-AI-Portfolio", "Accept-Language": "en-US" };

async function getCalendar() {
  const response = await fetch(`https://github.com/users/${username}/contributions`, {
    headers: { ...headers, Accept: "text/html" },
    next: { revalidate: 900 },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`GitHub calendar request failed (${response.status}).`);
  const calendar = parseGitHubCalendar(await response.text());
  const fetchedAt = response.headers.get("date");
  const updatedAt = fetchedAt && Number.isFinite(Date.parse(fetchedAt))
    ? new Date(fetchedAt).toISOString() : new Date().toISOString();
  return { ...calendar, updatedAt };
}

async function getPublicRepositories(): Promise<GitHubActivity["repositories"]> {
  const response = await fetch(`https://api.github.com/users/${username}/repos?type=owner&sort=pushed&direction=desc&per_page=4`, {
    headers: { ...headers, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2026-03-10" },
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`GitHub repository request failed (${response.status}).`);
  const repositories: unknown = await response.json();
  if (!Array.isArray(repositories)) throw new Error("GitHub returned invalid repository data.");
  return repositories.filter(repository => repository.private === false
    && repository.owner?.login?.toLowerCase() === username.toLowerCase()
    && typeof repository.name === "string"
    && typeof repository.html_url === "string"
    && repository.html_url.startsWith(`${githubProfileUrl}/`))
    .map(repository => ({
      name: repository.name,
      url: repository.html_url,
      description: typeof repository.description === "string" ? repository.description : null,
      language: typeof repository.language === "string" ? repository.language : null,
    }));
}

export async function getGitHubActivity(): Promise<GitHubActivity> {
  const [calendar, repositories] = await Promise.all([getCalendar(), getPublicRepositories().catch(() => [])]);
  return { ...calendar, repositories, profileUrl: githubProfileUrl };
}
