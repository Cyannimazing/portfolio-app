# Aceternity component sources

Installed from the official registry with:

```sh
npx shadcn@latest add @aceternity/bento-grid @aceternity/sidebar @aceternity/animated-modal @aceternity/3d-card @aceternity/carousel @aceternity/infinite-moving-cards @aceternity/flip-words @aceternity/hover-border-gradient @aceternity/glowing-effect --yes --overwrite
```

Production adaptations retain official component roles while applying the portfolio theme, responsive dimensions, typed props, focus management, pause/reduced-motion settings and the required automatic carousel without navigation buttons. Components live in `components/ui/`.

- [Bento Grid](https://ui.aceternity.com/components/bento-grid): hero card layout; omit empty optional text blocks when the custom header supplies the content.
- [Sidebar](https://ui.aceternity.com/components/sidebar): fixed desktop identity and portal-based mobile navigation.
- [Animated Modal](https://ui.aceternity.com/components/animated-modal): service, project, toolbox and education details.
- [3D Card](https://ui.aceternity.com/components/3d-card-effect): restrained pointer depth on project previews.
- [Carousel](https://ui.aceternity.com/components/carousel): automatic featured-project track; no manual slide controls.
- [Infinite Moving Cards](https://ui.aceternity.com/components/infinite-moving-cards): complete tool icon marquee.
- [Flip Words](https://ui.aceternity.com/components/flip-words): supporting specialization text.
- [Hover Border Gradient](https://ui.aceternity.com/components/hover-border-gradient): interactive CTA borders contained within their shape.
- [Glowing Effect](https://ui.aceternity.com/components/glowing-effect): cyan edge response on bento cards.

Shared motion values live in `lib/studio-motion.ts` and the `studioReveal` keyframes in `app/globals.css`; panel radii, control radii and tag radii use shared theme tokens.
