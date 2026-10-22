import type { ProjectDelivery } from "@/lib/project-delivery-types";
import ProjectNarrative from "./ProjectNarrative";
import ProjectDeliveryDetails, { ProjectTechnicalDetails } from "./ProjectDeliveryDetails";
import styles from "./ProjectCaseStudy.module.css";

export default function ProjectCaseContent({ challenge, solution, rationale, details, technologies }: {
  challenge: string;
  solution: string;
  rationale: string;
  details: ProjectDelivery;
  technologies: readonly string[];
}) {
  return <div className={styles.caseContent}>
    <div className={styles.readingColumn}>
      <ProjectNarrative challenge={challenge} solution={solution} rationale={rationale} />
      <ProjectDeliveryDetails details={details} />
    </div>
    <ProjectTechnicalDetails details={details} technologies={technologies} />
  </div>;
}
