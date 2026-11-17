#!/usr/bin/env node
// Prepares a new logo for the site and suggests a palette.
// Usage (from the project root):
//   node rebrand/scripts/logo-prep.mjs rebrand/logo.png [--bg auto|none|#RRGGBB] [--name brand]
// Needs sharp in the project (npm i -D sharp).
// Outputs public/brand/: logo.svg (if input is SVG) or logo.png + logo@2x.png (transparent),
//   logo-on-dark.png, favicon-256.png, apple-touch-icon.png, og-image.jpg, palette.json
import { createRequire } from "node:module";
import { join } from "node:path";
// Load sharp from the PROJECT being rebranded (this script lives in the skill folder).
let sharp;
try { sharp = createRequire(join(process.cwd(), "package.json"))("sharp"); }
catch { console.error("✖ sharp isn't installed in this project. Run: npm install --save-dev sharp"); process.exit(1); }
import { mkdir, copyFile, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname } from "node:path";

const a = process.argv.slice(2);
const input = a[0];
const opt = (k, d) => { const i = a.indexOf(k); return i >= 0 ? a[i + 1] : d; };
if (!input || !existsSync(input)) { console.error("Usage: logo-prep.mjs <logo file> [--bg auto|none|#hex]"); process.exit(1); }
const out = "public/brand";
await mkdir(out, { recursive: true });
const isSvg = extname(input).toLowerCase() === ".svg";
const hex = (r, g, b) => "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();

// 1. Rasterise / load
let img = isSvg ? sharp(await readFile(input), { density: 600 }) : sharp(input);
const meta = await img.metadata();
const { data, info } = await img.clone().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height;
const px = (x, y) => { const i = (y * W + x) * 4; return [data[i], data[i + 1], data[i + 2], data[i + 3]]; };

// 2. Background detection from the four corners
const corners = [px(0, 0), px(W - 1, 0), px(0, H - 1), px(W - 1, H - 1)];
const opaqueCorners = corners.filter((c) => c[3] > 200);
const close = (p, q, tol = 18) => Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) + Math.abs(p[2] - q[2]) <= tol * 3;
let bgMode = opt("--bg", "auto");
let bg = null;
if (bgMode === "auto" && opaqueCorners.length === 4 && corners.every((c) => close(c, corners[0]))) bg = corners[0];
else if (bgMode.startsWith("#")) bg = [1, 3, 5].map((i) => parseInt(bgMode.slice(i, i + 2), 16)).concat(255);

// 3. Remove solid background → alpha by distance from bg colour (with un-matting)
let rgba = Buffer.from(data);
if (bg && bgMode !== "none") {
  for (let i = 0; i < rgba.length; i += 4) {
    const d = Math.max(Math.abs(rgba[i] - bg[0]), Math.abs(rgba[i + 1] - bg[1]), Math.abs(rgba[i + 2] - bg[2]));
    const al = d < 24 ? 0 : Math.min(255, (d - 24) * 4);
    const f = al / 255;
    for (let k = 0; k < 3; k++) rgba[i + k] = f > 0 ? Math.max(0, Math.min(255, Math.round((rgba[i + k] - (1 - f) * bg[k]) / f))) : 0;
    rgba[i + 3] = Math.min(rgba[i + 3], al);
  }
}
let mark = sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).png();
mark = sharp(await mark.toBuffer()).trim({ threshold: 1 });
const markBuf = await mark.png().toBuffer();
const mm = await sharp(markBuf).metadata();

// 4. Palette: most common non-background, opaque colours (bucketed)
const buckets = new Map();
for (let i = 0; i < rgba.length; i += 4) {
  if (rgba[i + 3] < 200) continue;
  const k = [rgba[i] >> 3, rgba[i + 1] >> 3, rgba[i + 2] >> 3].join(",");
  const b = buckets.get(k) || { n: 0, r: 0, g: 0, b: 0 };
  b.n++; b.r += rgba[i]; b.g += rgba[i + 1]; b.b += rgba[i + 2]; buckets.set(k, b);
}
const palette = [...buckets.values()].sort((p, q) => q.n - p.n)
  .map((b) => ({ hex: hex(Math.round(b.r / b.n), Math.round(b.g / b.n), Math.round(b.b / b.n)), share: b.n }))
  .reduce((acc, c) => { if (!acc.some((x) => close([1,3,5].map(i=>parseInt(x.hex.slice(i,i+2),16)), [1,3,5].map(i=>parseInt(c.hex.slice(i,i+2),16)), 28))) acc.push(c); return acc; }, [])
  .slice(0, 6);
const total = palette.reduce((s, c) => s + c.share, 0);
const pal = { background: bg ? hex(bg[0], bg[1], bg[2]) : null, colors: palette.map((c) => ({ hex: c.hex, percent: +(100 * c.share / total).toFixed(1) })) };

// 5. Outputs
if (isSvg) await copyFile(input, `${out}/logo.svg`);
await sharp(markBuf).png().toFile(`${out}/logo.png`);
const up = Math.min(2, 1200 / Math.max(mm.width, mm.height));
await sharp(markBuf).resize(Math.round(mm.width * Math.max(1, up))).png().toFile(`${out}/logo@2x.png`);
const dark = opt("--dark", pal.colors.find((c) => { const v = parseInt(c.hex.slice(1), 16); const r = v >> 16, g = (v >> 8) & 255, b = v & 255; return 0.2126*r+0.7152*g+0.0722*b < 70; })?.hex || "#111111");
const tile = async (size, inner, file, bgc) => sharp({ create: { width: size, height: size, channels: 4, background: bgc } })
  .composite([{ input: await sharp(markBuf).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer(), gravity: "centre" }]).png().toFile(file);
const tileBg = bg ? hex(bg[0], bg[1], bg[2]) : "#FFFFFF";
await tile(256, 200, `${out}/favicon-256.png`, tileBg);
await tile(180, 140, `${out}/apple-touch-icon.png`, tileBg);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: tileBg } })
  .composite([{ input: await sharp(markBuf).resize(720, 400, { fit: "inside" }).toBuffer(), gravity: "centre" }]).jpeg({ quality: 90 }).toFile(`${out}/og-image.jpg`);
await writeFile(`${out}/palette.json`, JSON.stringify(pal, null, 2));

const small = Math.max(meta.width, meta.height) < 400;
console.log(`✔ ${isSvg ? "SVG" : "Raster"} logo ${meta.width}x${meta.height}; mark trimmed to ${mm.width}x${mm.height}`);
console.log(`  Background: ${pal.background ?? "none / transparent"}${bg ? " (removed)" : ""}`);
console.log(`  Palette: ${pal.colors.map((c) => `${c.hex} ${c.percent}%`).join(", ")}`);
console.log(`  Wrote ${out}/{${isSvg ? "logo.svg, " : ""}logo.png, logo@2x.png, favicon-256.png, apple-touch-icon.png, og-image.jpg, palette.json}`);
if (small && !isSvg) console.log(`  ⚠ Small raster logo: show it ≤ ${Math.round(Math.min(meta.width, meta.height) / 2)}px tall, and ask the client for an SVG. Simple flat logos can be rebuilt as SVG (see rebrand/INSTRUCTIONS.md step 3).`);
