import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Cyril Jian Narvasa. Have a project in mind or want to book a call? Let's build something together.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <ContactClient />;
}
