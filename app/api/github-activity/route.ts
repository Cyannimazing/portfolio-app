import { getGitHubActivity } from "@/lib/github-activity.server";

export async function GET() {
  try {
    return Response.json(await getGitHubActivity(), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "GitHub activity is temporarily unavailable." }, {
      status: 503,
      headers: { "Cache-Control": "no-store", "Retry-After": "60" },
    });
  }
}
