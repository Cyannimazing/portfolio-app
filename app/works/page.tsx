import Link from "next/link";
import WorksClient from "./WorksClient";
import StructuredData from "@/components/StructuredData";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { profileProjects } from "@/lib/profile-projects";
import { getProjectPath, projectStories } from "@/lib/project-stories";
import { pageMetadata, publicPages } from "@/lib/seo";
import { worksStructuredData } from "@/lib/structured-data";
import styles from "./Works.module.css";

export const metadata = pageMetadata(publicPages[1]);

export default function Page() {
  return <>
    <StructuredData id="page-identity" data={worksStructuredData(publicPages[1].description)} />
    <WorksClient />
    <noscript>
      <style>{'[data-project-browser] { height: auto !important; min-height: 0 !important; padding-bottom: 0 !important; } [data-project-browser] [aria-label="Project layout"], [data-project-browser] [data-project-filters], [data-project-browser] [aria-roledescription="carousel"] { display: none !important; }'}</style>
      <section className={styles.noScriptCollection} aria-label="All project case studies">
        <BentoGrid className={styles.projectGrid}>{profileProjects.map(project => <BentoGridItem key={project.id} className={styles.noScriptProject} header={<article>
          <h2><Link href={getProjectPath(project)}>{project.name}</Link></h2>
          <p>{projectStories[project.id].summary}</p>
          <Link href={getProjectPath(project)} className={styles.visit}>Read case study →</Link>
        </article>} />)}</BentoGrid>
      </section>
    </noscript>
  </>;
}
