"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function FooterVisibility({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return pathname === "/" || pathname === "/works" || pathname.startsWith("/works/") || pathname === "/services" || pathname === "/practice" || pathname === "/contact" ? null : children;
}
