import type { ReactNode } from "react";
import styles from "./Works.module.css";

export default function WorksLayout({ children }: { children: ReactNode }) {
  return <div className={styles.shell}>{children}</div>;
}
