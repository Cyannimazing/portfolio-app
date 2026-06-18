import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, toSlug } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import ProjectDetail from "./ProjectDetail";

// Pre-render one static page per project at build time (SSG).
export function generateStaticParams() {
  return projects.map((p) => ({ slug: toSlug(p.title) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => toSlug(p.title) === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/works/${slug}` },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
      type: "article",
      url: `${siteConfig.url}/works/${slug}`,
      images: [{ url: project.mainImage }],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => toSlug(p.title) === slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
