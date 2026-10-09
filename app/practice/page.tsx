import PracticeClient from "./PracticeClient";
import StructuredData from "@/components/StructuredData";
import { pageMetadata, publicPages } from "@/lib/seo";
import { aboutStructuredData } from "@/lib/structured-data";

export const metadata = pageMetadata(publicPages[3]);

export default function Page() {
  return <><StructuredData id="page-identity" data={aboutStructuredData(publicPages[3].description)} /><PracticeClient /></>;
}
