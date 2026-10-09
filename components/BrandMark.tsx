import Image from "next/image";
import { cn } from "@/lib/utils";

export type BrandMarkProps = {
  theme?: "dark" | "light";
  size?: number;
  className?: string;
};

// Decorative beside the Cyril AI wordmark or inside an already named brand link.
// The caller selects the surface theme; browser preference does not switch the site.
export default function BrandMark({
  theme = "dark",
  size = 40,
  className,
}: BrandMarkProps) {
  return (
    <Image
      src={theme === "light" ? "/brand/cyril-ai-logo-light.webp" : "/brand/cyril-ai-logo-dark.webp"}
      width={size}
      height={size}
      sizes={`${size}px`}
      alt=""
      aria-hidden="true"
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
