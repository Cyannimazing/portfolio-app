import type { Metadata } from "next";
import WorksClient from "./WorksClient";

export const metadata: Metadata = {
  title: "Works",
  description:
    "Selected projects and case studies by Cyril Jian Narvasa, from multi-tenant SaaS platforms to mobile and desktop apps.",
  alternates: { canonical: "/works" },
};

export default function Page() {
  return <WorksClient />;
}
