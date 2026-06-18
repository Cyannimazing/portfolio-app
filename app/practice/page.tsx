import type { Metadata } from "next";
import PracticeClient from "./PracticeClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Cyril Jian Narvasa, a full-stack developer. Mission, vision, core values, tech stack, and experience.",
  alternates: { canonical: "/practice" },
};

export default function Page() {
  return <PracticeClient />;
}
