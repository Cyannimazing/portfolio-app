import type { ReactNode } from "react";
import styles from "@/components/Services.module.css";

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <div className={styles.shell} data-studio-shell>{children}</div>;
}
