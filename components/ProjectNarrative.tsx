import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import styles from "./ProjectCaseStudy.module.css";

export default function ProjectNarrative({ challenge, solution, rationale }: {
  challenge: string;
  solution: string;
  rationale: string;
}) {
  const sections = [
    { label: "Project context", title: "The challenge", content: challenge },
    { label: "Our approach", title: "The solution", content: solution },
  ];

  return <section aria-label="Project challenge and approach" className={styles.story}>
    <BentoGrid className={styles.narrative}>
      {sections.map(section => <BentoGridItem key={section.title} reveal className={styles.narrativeCard} header={
        <div>
          <span className={styles.sectionEyebrow}>{section.label}</span>
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </div>
      } />)}
    </BentoGrid>
    {rationale && <div className={styles.reasoning}><h3>Why this approach</h3><p>{rationale}</p></div>}
  </section>;
}
