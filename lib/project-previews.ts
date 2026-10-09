// Live previews use embeddable public pages. Missing URLs represent apps that
// cannot be embedded or have no public preview. Their fallback is an
// actual captured interface, never a generated mockup or invented recording.
export type ProjectPreview = { url?: string; label: string };
export const projectPreviews: Record<number, ProjectPreview> = {
  21: { url: "https://www.beautifulblessedesthetics.com/", label: "beautifulblessedesthetics.com" },
  1: { url: "https://cynergy.cloud/", label: "cynergy.cloud" },
  8: { url: "https://www.rivertaxes.com/", label: "rivertaxes.com" },
  3: { label: "SPOS local dashboard" },
  4: { url: "/", label: "Cyril AI portfolio" },
  5: { label: "viviour.com" },
  6: { url: "https://www.martichstudios.com/", label: "martichstudios.com" },
  7: { url: "https://www.fermacoffeeco.com/", label: "fermacoffeeco.com" },
  9: { url: "https://www.lowrieroofing.com/", label: "lowrieroofing.com" },
  10: { url: "https://www.masterbuiltroofing.com/", label: "masterbuiltroofing.com" },
  11: { url: "https://www.northforgexteriors.com/", label: "northforgexteriors.com" },
  12: { url: "https://www.luxuryleatherrestoration.com/", label: "luxuryleatherrestoration.com" },
  13: { url: "https://www.kevintravishomes.com/", label: "kevintravishomes.com" },
  14: { url: "https://sergio-garcia-zeta.vercel.app/", label: "sergio-garcia-zeta.vercel.app" },
  15: { url: "https://www.tmbtx.com/", label: "tmbtx.com" },
  16: { url: "https://wudr.vercel.app/", label: "wudr.vercel.app" },
  17: { url: "https://www.zenergy.solar/", label: "zenergy.solar" },
  2: { label: "Obiyen" },
  19: { label: "CacaoCare web and mobile" },
  20: { label: "Faculty Scheduling desktop application" },
};

// Every fallback is a real website/app screenshot saved as WebP.
export const projectPreviewPosters: Partial<Record<number, string>> = {
  21: "/projects/previews/beautiful-blessed-poster.webp",
  1: "/projects/previews/cynergy-poster.webp",
  8: "/projects/previews/river-taxes-poster.webp",
  3: "/projects/previews/spos-local-poster.webp",
  4: "/projects/previews/developer-portfolio-poster.webp",
  5: "/projects/previews/viviour-poster.webp",
  6: "/projects/previews/martich-studios-poster.webp",
  7: "/projects/previews/ferma-coffee-co-poster.webp",
  9: "/projects/previews/lowrie-roofing-poster.webp",
  10: "/projects/previews/masterbuilt-roofing-poster.webp",
  11: "/projects/previews/northforge-exteriors-poster.webp",
  12: "/projects/previews/luxury-leather-restoration-poster.webp",
  13: "/projects/previews/kevin-travis-homes-poster.webp",
  14: "/projects/previews/sergio-garcia-poster.webp",
  15: "/projects/previews/tmbtx-poster.webp",
  16: "/projects/previews/wudr-poster.webp",
  17: "/projects/previews/zenergy-solar-poster.webp",
  2: "/projects/obiyen_dashboard_main.webp",
  19: "/projects/cacao_main_image.webp",
  20: "/projects/main_image1.webp",
};
