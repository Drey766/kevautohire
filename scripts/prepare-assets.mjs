// scripts/prepare-assets.mjs
// Generates icons + share image from assets/imtalii-logo.svg and copies iMtalii's own photos.
//   npm install --save-dev sharp
//   node scripts/prepare-assets.mjs
// Outputs: public/brand/{imtalii-logo.svg, emblem.png, favicon-256.png, apple-touch-icon.png, og-image.jpg}
//          public/fleet/im-001/prado-wedding-convoy.jpg
// Colours come from src/config/brand.ts when it exists.
import sharp from "sharp";
import { mkdir, readFile, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const LOGO = "assets/imtalii-logo.svg";
if (!existsSync(LOGO)) { console.error(`\n✖ Missing ${LOGO}\n`); process.exit(1); }
let C = { purple: "#6A00BC", aubergine: "#1A0B2E", lavender: "#C9B6EC", goldFrom: "#D0802F", goldTo: "#F7C35F", white: "#FFFFFF" };
if (existsSync("src/config/brand.ts")) {
  const t = await readFile("src/config/brand.ts", "utf8");
  for (const k of Object.keys(C)) { const m = t.match(new RegExp(`\\b${k}:\\s*"(#[0-9A-Fa-f]{6})"`)); if (m) C[k] = m[1]; }
}
await mkdir("public/brand", { recursive: true });
await mkdir("public/fleet/im-001", { recursive: true });
await copyFile(LOGO, "public/brand/imtalii-logo.svg");
if (existsSync("assets/own-photos/prado-wedding-convoy.jpg"))
  await copyFile("assets/own-photos/prado-wedding-convoy.jpg", "public/fleet/im-001/prado-wedding-convoy.jpg");

const raw = await readFile(LOGO, "utf8");
const paint = (tagline) => Buffer.from(raw
  .replace(/var\(--logo-gold-from, #[0-9A-Fa-f]{6}\)/, C.goldFrom)
  .replace(/var\(--logo-gold-to, #[0-9A-Fa-f]{6}\)/, C.goldTo)
  .replace(/var\(--logo-tagline, #[0-9A-Fa-f]{6}\)/, tagline));
const full = await sharp(paint(C.white), { density: 600 }).resize({ width: 1600 }).png().toBuffer();
const fm = await sharp(full).metadata();

// Emblem = the ringed "i" (left ~19% of the wordmark, top ~70%). Two steps: sharp trims before extracting otherwise.
const emblemArea = await sharp(full).extract({ left: 0, top: 0, width: Math.round(fm.width * 0.19), height: Math.round(fm.height * 0.70) }).png().toBuffer();
const emblem = await sharp(emblemArea).trim({ threshold: 1 }).png().toBuffer();
await sharp(emblem).toFile("public/brand/emblem.png");

const tile = async (size, inner, file) => sharp({ create: { width: size, height: size, channels: 4, background: C.aubergine } })
  .composite([{ input: await sharp(emblem).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer(), gravity: "centre" }])
  .png().toFile(file);
await tile(256, 200, "public/brand/favicon-256.png");
await tile(180, 136, "public/brand/apple-touch-icon.png");

// OG: aubergine with a soft purple glow and a thin gold ring, logo centred
const glow = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs>
  <radialGradient id="g" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="${C.purple}" stop-opacity="0.85"/><stop offset="1" stop-color="${C.aubergine}" stop-opacity="0"/></radialGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/><circle cx="600" cy="300" r="250" fill="none" stroke="${C.goldTo}" stroke-opacity="0.35" stroke-width="1.5"/></svg>`);
const logo = await sharp(paint(C.white), { density: 600 }).resize({ width: 620 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: C.aubergine } })
  .composite([{ input: glow }, { input: logo, gravity: "centre" }]).jpeg({ quality: 90 }).toFile("public/brand/og-image.jpg");
console.log("✔ Wrote public/brand/{imtalii-logo.svg, emblem.png, favicon-256.png, apple-touch-icon.png, og-image.jpg} and public/fleet/im-001/");
