import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import type { ProjectDelivery } from "@/lib/project-delivery-types";
import { getProjectDetailIcon } from "./project-detail-icons";
import styles from "./ProjectCaseStudy.module.css";

export default function ProjectDeliveryDetails({ details }: {
  details: ProjectDelivery;
}) {
  return <section className={styles.implementation} aria-label="Project contribution">
      <header className={styles.chapterHeader}>
        <div><span className={styles.sectionEyebrow}>The work</span><h2>{details.heading ?? "Our contribution"}</h2></div>
        <p className={styles.role}>{details.role}</p>
      </header>
      <p className={styles.chapterIntro}>{details.summary}</p>
      <BentoGrid className={styles.responsibilityGrid}>
        {details.responsibilities.map(item => {
          const DetailIcon = getProjectDetailIcon(item.title);
          return <BentoGridItem key={item.title} reveal className={styles.responsibilityCard} header={<div>
            <h3><DetailIcon size={20} stroke={1.6} aria-hidden="true" />{item.title}</h3><p>{item.description}</p>
          </div>} />;
        })}
      </BentoGrid>
  </section>;
}

export function ProjectTechnicalDetails({ details, technologies }: {
  details: ProjectDelivery;
  technologies: readonly string[];
}) {
  return <aside className={styles.technicalPanel} aria-label="Technical implementation">
      <header className={styles.chapterHeader}><div><span className={styles.sectionEyebrow}>Build notes</span><h2>Technical delivery</h2></div></header>
      <div className={styles.projectFacts}><h3 className={styles.metaHeading}>Built with</h3><ul className={styles.stack} aria-label="Project technologies">{technologies.map(name => <li key={name}>{name}</li>)}</ul></div>
      <BentoGrid className={styles.capabilityGrid}>
        {details.capabilities.map(item => {
          return <BentoGridItem key={item.title} reveal className={styles.capabilityCard} header={<div className={styles.capabilityContent}>
            <h3>{item.title}</h3><p>{item.description}</p>
          </div>} />;
        })}
      </BentoGrid>
  </aside>;
}
