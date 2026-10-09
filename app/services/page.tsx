import Services from "@/components/Services";
import StructuredData from "@/components/StructuredData";
import { pageMetadata, publicPages } from "@/lib/seo";
import { servicesStructuredData } from "@/lib/structured-data";

export const metadata = pageMetadata(publicPages[2]);

export default function ServicesPage() {
  return <><StructuredData id="page-identity" data={servicesStructuredData(publicPages[2].description)} /><Services /></>;
}
