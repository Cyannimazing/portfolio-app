import ContactClient from "./ContactClient";
import { serviceCategories } from "@/lib/service-categories";
import StructuredData from "@/components/StructuredData";
import { pageMetadata, publicPages } from "@/lib/seo";
import { contactStructuredData } from "@/lib/structured-data";

export const metadata = pageMetadata(publicPages[4]);

export default async function Page({ searchParams }: { searchParams: Promise<{ service?: string | string[] }> }) {
  const { service: selected } = await searchParams;
  const service = serviceCategories.find(item => item.id === selected);
  return <><StructuredData id="page-identity" data={contactStructuredData(publicPages[4].description)} /><ContactClient key={service?.id ?? "general"} initialService={service?.name ?? ""} /></>;
}
