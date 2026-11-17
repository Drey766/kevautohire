#!/usr/bin/env node
// WCAG contrast checker + safe-variant finder. No dependencies.
// Usage:
//   node rebrand/scripts/contrast.mjs "#004856" "#C9A45C" "#FAF7F1" "#FFFFFF"
//   node rebrand/scripts/contrast.mjs --config src/config/brand.ts     (reads every "name: '#hex'" pair)
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
let colors = [];
if (args[0] === "--config") {
  const t = readFileSync(args[1], "utf8");
  for (const m of t.matchAll(/(\w+):\s*["'](#[0-9A-Fa-f]{6})["']/g)) colors.push([m[1], m[2].toUpperCase()]);
} else {
  colors = args.map((h, i) => [`c${i + 1}`, h.toUpperCase()]);
}
if (colors.length < 2) { console.error("Give at least two #RRGGBB colours, or --config <file>."); process.exit(1); }

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lum = (h) => {
  const [r, g, b] = rgb(h).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const hex = (c) => "#" + c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("").toUpperCase();
const mix = (h, target, t) => { const a = rgb(h), b = rgb(target); return hex(a.map((v, i) => v + (b[i] - v) * t)); };
function safeOn(fg, bg, min = 4.5) {
  if (ratio(fg, bg) >= min) return fg;
  const toward = lum(bg) > 0.4 ? "#000000" : "#FFFFFF";
  for (let t = 0.02; t <= 1; t += 0.02) { const c = mix(fg, toward, t); if (ratio(c, bg) >= min) return c; }
  return toward;
}

console.log("\nPAIR CONTRAST (AA: 4.5 normal text, 3.0 large text ≥24px or bold ≥18.66px, UI parts)\n");
for (const [n1, h1] of colors) for (const [n2, h2] of colors) {
  if (n1 >= n2) continue;
  const r = ratio(h1, h2);
  const v = r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "large/UI only" : "decorative only";
  console.log(`${n1.padEnd(14)} ${h1}  vs  ${n2.padEnd(14)} ${h2}  ${r.toFixed(2).padStart(5)}  ${v}`);
}
console.log("\nTEXT-SAFE VARIANTS (closest shade reaching 4.5:1)\n");
const lights = colors.filter(([, h]) => lum(h) > 0.6), darks = colors.filter(([, h]) => lum(h) < 0.15);
for (const [n, h] of colors) {
  const outs = [];
  for (const [bn, bh] of [...lights, ...darks]) if (bn !== n) {
    const s = safeOn(h, bh); if (s !== h) outs.push(`on ${bn}: ${s} (${ratio(s, bh).toFixed(2)})`);
  }
  if (outs.length) console.log(`${n.padEnd(14)} ${h}  →  ${outs.join("  |  ")}`);
}
console.log("");
