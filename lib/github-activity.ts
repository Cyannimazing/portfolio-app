import snapshot from "./github-activity.json";

export type GitHubActivity = {
  total: number;
  from: string;
  to: string;
  days: { date: string; count: number; level: number }[];
  repositories: { name: string; url: string; description: string | null; language: string | null }[];
  profileUrl: string;
  updatedAt: string;
};

// A dated snapshot of the public GitHub profile, without a runtime API token.
export const githubActivity: GitHubActivity = snapshot;
