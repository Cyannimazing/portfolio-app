import Hero from "@/components/Hero";
import StructuredData from "@/components/StructuredData";
import { pageMetadata, publicPages } from "@/lib/seo";
import { pageStructuredData } from "@/lib/structured-data";

export const metadata = pageMetadata(publicPages[0]);

export default function Home() {
  return (
    <main className="studio-home">
      <StructuredData id="page-identity" data={pageStructuredData("/", publicPages[0].title, publicPages[0].description)} />
      <Hero />
    </main>
  );
}
