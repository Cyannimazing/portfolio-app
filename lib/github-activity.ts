export type GitHubActivity = {
  total: number;
  from: string;
  to: string;
  days: { date: string; count: number; level: number }[];
  repositories: { name: string; url: string; description: string | null; language: string | null }[];
  profileUrl: string;
  updatedAt: string;
};

export const githubProfileUrl = "https://github.com/Cyannimazing";
export const githubActivityRefreshMs = 15 * 60 * 1000;
