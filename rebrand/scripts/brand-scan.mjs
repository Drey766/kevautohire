#!/usr/bin/env node
// Finds leftovers of the OLD brand after a rebrand. No dependencies.
// Usage: node rebrand/scripts/brand-scan.mjs --terms "AV Properties,906 493 2539,639064932539" [--config src/config/brand.ts]
// Scans src/, public/ (text files), docs/, README.md, CLAUDE.md, next.config.*, package.json, app manifest.
// Also reports hex colours outside the config file. Exits 1 if anything is found.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const a = process.argv.slice(2);
const get = (k) => { const i = a.indexOf(k); return i >= 0 ? a[i + 1] : null; };
const terms = (get("--terms") || "").split(",").map((s) => s.trim()).filter(Boolean);
const config = get("--config") || ["src/config/brand.ts", "src/config/business.ts"].find(existsSync);
if (!terms.length) { console.error('Pass --terms "Old Name,old phone,old domain,..."'); process.exit(2); }

const TEXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".css", ".md", ".mdx", ".html", ".svg", ".txt", ".webmanifest", ".xml"]);
const SKIP = new Set(["node_modules", ".next", ".git", "data-raw", "rebrand", ".vercel"]);
const roots = ["src", "public", "docs", "README.md", "CLAUDE.md", "package.json", "next.config.js", "next.config.mjs", "next.config.ts"].filter(existsSync);
const files = [];
const walk = (p) => {
  const s = statSync(p);
  if (s.isDirectory()) { for (const f of readdirSync(p)) if (!SKIP.has(f)) walk(join(p, f)); }
  else if (TEXT.has(extname(p).toLowerCase())) files.push(p);
};
roots.forEach(walk);

let hits = 0;
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// match phone numbers with or without spaces/dashes
const pat = (t) => /\d/.test(t) ? new RegExp(t.replace(/[\s-]/g, "").split("").map(esc).join("[\\s-]?"), "i") : new RegExp(esc(t), "i");
const pats = terms.map((t) => [t, pat(t)]);
console.log(`\nOld-brand terms in ${files.length} files:`);
for (const f of files) {
  const lines = readFileSync(f, "utf8").split("\n");
  lines.forEach((l, i) => { for (const [t, re] of pats) if (re.test(l)) { hits++; console.log(`  ${f}:${i + 1}  [${t}]  ${l.trim().slice(0, 110)}`); } });
}
console.log(hits ? "" : "  none ✔");

let hexHits = 0;
console.log(`Hex colours outside ${config ?? "(no config found)"} (src/ only; SVG brand files excluded):`);
for (const f of files) {
  if (!f.startsWith("src") || f === config || f.endsWith(".svg") || f.endsWith(".json")) continue;
  readFileSync(f, "utf8").split("\n").forEach((l, i) => {
    if (/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![\w-])/.test(l) && !/^\s*(\/\/|\*)/.test(l)) { hexHits++; console.log(`  ${f}:${i + 1}  ${l.trim().slice(0, 110)}`); }
  });
}
console.log(hexHits ? "" : "  none ✔");
console.log(`\nTotal: ${hits} old-brand hits, ${hexHits} stray hex codes.\n`);
process.exit(hits || hexHits ? 1 : 0);
