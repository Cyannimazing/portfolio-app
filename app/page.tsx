import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="relative bg-[#080808]">

      <Hero />
      <Services />
    </main>
  );
}
