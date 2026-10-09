import { IconDatabase, IconLayersIntersect, IconUsers } from "@tabler/icons-react";
import styles from "./ProjectPlaceholder.module.css";

export default function ProjectPlaceholder({ name = "Cynergy", className = "" }: { name?: string; className?: string }) {
  return <div className={`${styles.placeholder} ${className}`} role="img" aria-label={`${name} project preview coming soon`}>
    <span className={styles.orbit} aria-hidden="true" />
    <div className={styles.identity}><span className={styles.mark}><IconLayersIntersect size={36} stroke={1.3} aria-hidden="true" /></span><strong>{name}</strong><span>BUSINESS, CONNECTED.</span></div>
    <div className={styles.modules} aria-hidden="true"><span><IconDatabase size={17} />Licensing</span><span><IconUsers size={17} />Teams</span><span><IconLayersIntersect size={17} />POS</span></div>
    <small>Project preview coming soon</small>
  </div>;
}
