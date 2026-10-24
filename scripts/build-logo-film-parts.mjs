/** Extract original logo pixels for the splash: node scripts/build-logo-film-parts.mjs */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(root, "public/brand/intro");
const padding = 2;
const roles = ["left", "top", "cyan"];

function neighbours(index, width, height, visit) {
  const x = index % width;
  const y = Math.floor(index / width);
  for (let yy = Math.max(0, y - 1); yy <= Math.min(height - 1, y + 1); yy++) {
    for (let xx = Math.max(0, x - 1); xx <= Math.min(width - 1, x + 1); xx++) visit(yy * width + xx);
  }
}

function identifyCurves(rgba, width, height) {
  const pixels = width * height;
  const visited = new Uint8Array(pixels);
  const queue = new Uint32Array(pixels);
  const components = [];
  // Solid pixels identify the three bodies. The final extraction includes ALL
  // alpha>=1 pixels, including the faint compression bridges between bodies.
  for (let index = 0; index < pixels; index++) {
    if (visited[index] || rgba[index * 4 + 3] < 128) continue;
    let head = 0;
    let tail = 1;
    queue[0] = index;
    visited[index] = 1;
    while (head < tail) neighbours(queue[head++], width, height, (next) => {
      if (!visited[next] && rgba[next * 4 + 3] >= 128) {
        visited[next] = 1;
        queue[tail++] = next;
      }
    });
    components.push(queue.slice(0, tail));
  }
  components.sort((a, b) => b.length - a.length);
  if (components.length < 3 || components[2].length < 10000) throw new Error("The source must contain three distinct logo bodies");
  const owners = new Uint8Array(pixels);
  let head = 0;
  let tail = 0;
  // In both approved originals the left, top and cyan bodies have descending
  // areas. Grow their nearest-body regions to retain edge pixels and AA islands.
  for (let part = 0; part < 3; part++) for (const index of components[part]) {
    owners[index] = part + 1;
    queue[tail++] = index;
  }
  while (head < tail) {
    const index = queue[head++];
    neighbours(index, width, height, (next) => {
      if (!owners[next]) {
        owners[next] = owners[index];
        queue[tail++] = next;
      }
    });
  }
  return owners;
}

await fs.mkdir(outputDirectory, { recursive: true });
const metadata = { version: 1, width: 1254, height: 1254, padding, themes: {} };
const report = [];
for (const theme of ["dark", "light"]) {
  const sourcePath = path.join(root, `public/brand/cyril-ai-logo-${theme}.webp`);
  const { data: original, info } = await sharp(sourcePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  if (width !== metadata.width || height !== metadata.height) throw new Error("Unexpected logo dimensions");
  const owners = identifyCurves(original, width, height);
  const parts = [];
  const reconstructed = Buffer.alloc(original.length);
  for (let part = 1; part <= 3; part++) {
    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;
    let alphaWeight = 0;
    let weightedX = 0;
    let weightedY = 0;
    for (let index = 0; index < owners.length; index++) {
      if (owners[index] !== part || original[index * 4 + 3] === 0) continue;
      const x = index % width;
      const y = Math.floor(index / width);
      const alpha = original[index * 4 + 3];
      alphaWeight += alpha;
      weightedX += (x + 0.5) * alpha;
      weightedY += (y + 0.5) * alpha;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
    const x = Math.max(0, minX - padding);
    const y = Math.max(0, minY - padding);
    const partWidth = Math.min(width - 1, maxX + padding) - x + 1;
    const partHeight = Math.min(height - 1, maxY + padding) - y + 1;
    const cutout = Buffer.alloc(partWidth * partHeight * 4);
    for (let yy = 0; yy < partHeight; yy++) for (let xx = 0; xx < partWidth; xx++) {
      const index = (y + yy) * width + x + xx;
      if (owners[index] === part && original[index * 4 + 3] > 0) original.copy(cutout, (yy * partWidth + xx) * 4, index * 4, index * 4 + 4);
    }
    const src = `/brand/intro/part-${part}-${theme}.webp`;
    const outputPath = path.join(root, "public", src.slice(1));
    await sharp(cutout, { raw: { width: partWidth, height: partHeight, channels: 4 } }).webp({ lossless: true, quality: 100, alphaQuality: 100, effort: 6 }).toFile(outputPath);
    const decoded = await sharp(outputPath).ensureAlpha().raw().toBuffer();
    for (let yy = 0; yy < partHeight; yy++) for (let xx = 0; xx < partWidth; xx++) {
      const from = (yy * partWidth + xx) * 4;
      if (decoded[from + 3] > 0) decoded.copy(reconstructed, ((y + yy) * width + x + xx) * 4, from, from + 4);
    }
    parts.push({ part, role: roles[part - 1], src, x, y, width: partWidth, height: partHeight, pivotX: weightedX / alphaWeight, pivotY: weightedY / alphaWeight });
  }
  let changedVisibleChannels = 0;
  let changedAlphaPixels = 0;
  let hiddenRgbPixels = 0;
  for (let index = 0; index < width * height; index++) {
    const offset = index * 4;
    if (original[offset + 3] !== reconstructed[offset + 3]) changedAlphaPixels++;
    if (original[offset + 3] > 0) for (let channel = 0; channel < 4; channel++) {
      if (original[offset + channel] !== reconstructed[offset + channel]) changedVisibleChannels++;
    }
    else if (original[offset] || original[offset + 1] || original[offset + 2]) hiddenRgbPixels++;
  }
  if (changedVisibleChannels || changedAlphaPixels) throw new Error(`Non-exact ${theme} reconstruction`);
  metadata.themes[theme] = parts;
  report.push({ theme, changedVisibleChannels, changedAlphaPixels, hiddenRgbPixels, parts: await Promise.all(parts.map(async (part) => ({ ...part, bytes: (await fs.stat(path.join(root, "public", part.src.slice(1)))).size }))) });
}
await fs.writeFile(path.join(root, "lib/logo-film-parts.json"), `${JSON.stringify(metadata, null, 2)}\n`);
console.log(JSON.stringify({ exactVisibleRgba: true, note: "RGB beneath alpha=0 is discarded because it has no visible contribution", themes: report }, null, 2));
