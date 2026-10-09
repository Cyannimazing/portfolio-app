import { llmsFullContent } from "@/lib/crawler-content";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullContent(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
