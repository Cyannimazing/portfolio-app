export const logoFilmFps = 60;
export const logoFilmFrames = 408;
export const logoFilmDuration = logoFilmFrames / logoFilmFps * 1000;
export const logoShineStart = 4.1;
export const logoShineEnd = 5.6;
export const logoFilmHoldStart = logoShineEnd;

// Solid bounds of the original mark in its 1254px source canvas. The faint
// antialiasing outside these bounds remains in the unmodified image cutouts.
export const logoSymbol = { centerX: 629, centerY: 627, width: 880, height: 922 };

export function logoProgress(time: number, start: number, end: number) {
  const value = Math.min(1, Math.max(0, (time - start) / (end - start)));
  return value * value * value * (value * (value * 6 - 15) + 10);
}

export const logoAssemblyEnd = 2.65;

export type LogoFilmPart = {
  part: number;
  role: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  pivotX: number;
  pivotY: number;
};

export function getLogoPartPose(time: number, part: LogoFilmPart) {
  // One shared turn keeps the curves related, like an opening aperture. Only
  // their radial separation changes, so their paths never tumble through one
  // another. At the endpoint every image returns to its exact source pose.
  const remaining = Math.max(0, 1 - Math.max(0, time) / logoAssemblyEnd);
  const rotation = -135 * remaining ** 3;
  const angle = rotation * Math.PI / 180;
  const separation = 1 + .55 * (1 - logoProgress(time, .35, logoAssemblyEnd));
  const dx = (part.pivotX - logoSymbol.centerX) * separation;
  const dy = (part.pivotY - logoSymbol.centerY) * separation;
  return {
    x: logoSymbol.centerX + dx * Math.cos(angle) - dy * Math.sin(angle) - part.pivotX,
    y: logoSymbol.centerY + dx * Math.sin(angle) + dy * Math.cos(angle) - part.pivotY,
    rotation,
    opacity: logoProgress(time, 0, .24),
  };
}

// Fit the complete moving cutouts, rather than only the joined symbol. This
// includes the pointed tips at every turn on narrow and short viewports.
export function getLogoAssemblyBounds(parts: LogoFilmPart[]) {
  let x = 0;
  let y = 0;
  const assemblyFrames = Math.ceil(logoAssemblyEnd * logoFilmFps);
  for (let frame = 0; frame <= assemblyFrames; frame++) {
    const time = frame / logoFilmFps;
    for (const part of parts) {
      const pose = getLogoPartPose(time, part);
      if (pose.opacity === 0) continue;
      const angle = pose.rotation * Math.PI / 180;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      for (const xx of [part.x, part.x + part.width]) for (const yy of [part.y, part.y + part.height]) {
        const dx = xx - part.pivotX;
        const dy = yy - part.pivotY;
        x = Math.max(x, Math.abs(part.pivotX + pose.x + dx * cosine - dy * sine - logoSymbol.centerX));
        y = Math.max(y, Math.abs(part.pivotY + pose.y + dx * sine + dy * cosine - logoSymbol.centerY));
      }
    }
  }
  return { x, y };
}

export function getLogoFilmLayout(width: number, height: number, bounds = { x: 920, y: 920 }) {
  const fontSize = Math.min(56, width * .125, height * .14);
  const markHeight = Math.min(316, (width - 48) * logoSymbol.height / (2 * bounds.x), (height - 64) * logoSymbol.height / (2 * bounds.y));
  const finalMarkHeight = Math.min(236, width * .59, height * .44);
  const gap = Math.min(24, Math.max(16, width * .035));
  const finalMarkCenterY = (height - gap - fontSize * 1.15) / 2;
  return {
    markHeight,
    markCenterY: height / 2,
    finalMarkHeight,
    finalMarkCenterY,
    fontSize,
    textTop: finalMarkCenterY + finalMarkHeight / 2 + gap,
  };
}
