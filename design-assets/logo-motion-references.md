# Logo introduction motion references

The introduction is a flat 2D brand film built from the approved logo's three original image cutouts. The user approved the coordinated orbit and centered composition. The curves make one shared partial turn while their radial separation closes into the exact symbol, then settle into a centered vertical stack with the Cyril AI name below. The user subsequently requested shine. A theme-aware sweep across both the symbol and the name has been added and checked in both themes. The orbit, composition and name reveal remain unchanged.

## Creative references

These links are general creative references for brand movement, composition and parts resolving into an identity. They are inspiration only. The embedded videos were not inspected frame by frame, and their timing or artwork is not reproduced here.

- [BUCK, Comfy Brand Refresh](https://buck.co/work/comfy-brand-refresh): inspiration for clear, confident brand movement.
- [Studio Dumbar, Modyfi](https://studiodumbar.com/work/modyfi): inspiration for motion based on an existing symbol.
- [BUCK Rebrand](https://buck.co/work/buck-rebrand): inspiration for separate parts resolving into one identity.

## Original artwork and prepared cutouts

The original transparent images remain unchanged:

- `public/brand/cyril-ai-logo-dark.webp`
- `public/brand/cyril-ai-logo-light.webp`

Each source uses a 1254 by 1254 pixel canvas. The film renders three prepared transparent WebP cutouts for the selected theme from `public/brand/intro/part-{1,2,3}-{dark,light}.webp`. Their roles are the left curve, top curve and cyan curve. They retain the source artwork and transparent edges rather than using redrawn outlines or generated 3D shapes.

`lib/logo-film-parts.json` records each cutout's source position, dimensions and pivot. Dark and Light have their own crop bounds and pivots. The film positions every cutout on the same source canvas and sets its local transform origin to `(pivotX - x, pivotY - y)`. Apply the shared display scale once and preserve fractional positions so the curves return to their original alignment. The metadata already includes two pixels of crop padding.

Run `node scripts/build-logo-film-parts.mjs` to regenerate the cutouts and metadata after an original image changes. The generator reconstructs each source from the exported pieces and checks that all visible color channels and alpha values remain unchanged.

## Choreography

The film lasts 6.8 seconds, with 408 frames at 60fps. The last frame is 407. Timing and paths live in `lib/logo-film-timing.ts`.

| Time | Movement |
| --- | --- |
| 0 to 0.24 seconds | All three curves fade in together, separated around the common symbol center. |
| 0 to 2.65 seconds | The curves make one coordinated turn from -135 to 0 degrees, slowing to their exact source orientations. |
| 0.35 to 2.65 seconds | Radial separation tightens from 1.55 to 1, returning every curve to its original source position. |
| 2.65 seconds | The exact symbol is assembled, with all piece movement complete. |
| 2.8 to 3.65 seconds | One shared transform adjusts the mark's size and vertical position into the centered final stack. Its horizontal center stays fixed. |
| 3.5 to 4.25 seconds | Cyril AI rises through a mask below the mark. |
| 4.1 to 5.6 seconds | One theme-aware cyan and silver shine moves across the symbol and the Cyril AI glyphs, then fades out. |
| 5.6 to 6.8 seconds | The complete identity holds cleanly for 1.2 seconds, with both shine overlays removed. |

The coordinated turn uses a cubic ease out, while radial separation follows the shared smooth progress function. All curves keep their source relationship to the common center rather than following independent fly-in paths. At 2.65 seconds, their offsets and rotations are exactly zero. They keep the same relative scale while assembling. There are no repeated turns, bouncing joins, changing letter spacing, trails, rings or artificial progress elements.

The shine follows one shared progress value from `logoShineStart` at 4.1 seconds to `logoShineEnd` at 5.6 seconds. Its opacity eases in and out. The symbol uses the matching original Dark or Light logo as an alpha mask. The name uses an exact duplicated Cyril AI glyph overlay, marked `aria-hidden`, with the same font, weight, spacing and placement as the underlying name. The gradient is clipped to the glyphs rather than their rectangular boxes, so the sweep crosses the letters without showing colored blocks around them.

Both themes use a bright silver center with colored edges. Dark uses cyan edges so the movement remains visible on the pale artwork. Light uses stronger teal edges mixed from the brand accent and shared text color. These are temporary overlays, not changes to the source images or base name colors. Both overlays are removed at 5.6 seconds, leaving the original logo and cyan AI wordmark unchanged for the final clean hold. Browser pixel comparisons confirmed that the shine changes the symbol and both words without painting rectangular backgrounds. The overlays disappear completely during the final hold.

## Responsive composition

`getLogoAssemblyBounds()` samples every animation frame through assembly and includes each crop's source position, radial offset and rotated corners. `getLogoFilmLayout()` uses those bounds to fit the whole movement with horizontal and vertical space on phones, short landscape screens and desktop. This avoids fitting only the final joined symbol while clipping the pointed tips during the shared turn.

The mark stays on the viewport's horizontal center. Its final size, the name size and the gap are responsive. The symbol and Cyril AI form one vertically centered stack, with the name below the mark. A `ResizeObserver` updates the Player's viewport dimensions. Both themes use their matching source cutouts and the shared theme background and text roles.

## Playback and readiness

`components/LogoIntro.tsx` dynamically loads `components/LogoFilm.tsx` for the opening introduction. The film uses Remotion Player and DOM image transforms. It does not load or render Three.js, WebGL, lights, cameras or generated geometry.

Remotion's `useCurrentFrame()` supplies the single animation clock. Piece position, shared rotation, radial separation, opacity, mark placement, both shine overlays and the name reveal are deterministic functions of that frame. There is no separate frame loop for the artwork.

The composition buffers while the three current-theme images decode and `document.fonts.ready` resolves. It releases the buffer and signals readiness on the next animation frame. The Player starts after readiness, and its ended event triggers the existing opening curtain. Normal internal navigation does not replay the film.

The Player pauses in hidden tabs and resumes only when it was meant to be playing. Loading, fallback and safety deadlines use `lib/visible-timeout.ts` to count visible time. A bounded loading timeout, image or font readiness failure, or playback error shows the original BrandMark fallback. Late readiness after dismissal is ignored so it cannot interrupt focus restoration.

Clicking anywhere continues immediately. Enter, Space and Escape remain available through the existing introduction control. `PageTransition` preserves focus restoration and releases inactive content when the curtain clears. Reduced motion bypasses the film, and the no-JavaScript styles keep the portfolio readable. There is no visible Skip button.

## Technical references

- [Remotion Player](https://www.remotion.dev/docs/player/player)
- [Remotion frame clock](https://www.remotion.dev/docs/use-current-frame)
- [Remotion buffering](https://www.remotion.dev/docs/use-buffer-state)
- [Motion animation](https://motion.dev/docs/react-animation), used for the existing fallback and curtain behavior
