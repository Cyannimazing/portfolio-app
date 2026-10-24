import Hero from "@/components/Hero";
import StructuredData from "@/components/StructuredData";
import { pageMetadata, publicPages } from "@/lib/seo";
import { pageStructuredData } from "@/lib/structured-data";
import { getGitHubActivity } from "@/lib/github-activity.server";

export const metadata = pageMetadata(publicPages[0]);

export default async function Home() {
  const githubActivity = await getGitHubActivity().catch(() => null);
  return (
    <main className="studio-home">
      <StructuredData id="page-identity" data={pageStructuredData("/", publicPages[0].title, publicPages[0].description)} />
      <Hero githubActivity={githubActivity} />
    </main>
  );
}
