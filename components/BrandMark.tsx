import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type BrandMarkProps = {
  theme?: "dark" | "light";
  size?: number;
  className?: string;
};

// A decorative background beside the wordmark or inside an already named link.
// The caller selects the surface theme; browser preference does not switch the site.
export default function BrandMark({
  theme = "dark",
  size = 40,
  className,
}: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      data-brand-mark
      style={{ "--brand-mark-size": `${size}px`, backgroundImage: `url("/brand/cyril-ai-logo-${theme}.webp")` } as CSSProperties}
      className={cn("inline-block size-[var(--brand-mark-size)] shrink-0 bg-contain bg-center bg-no-repeat", className)}
    />
  );
}
