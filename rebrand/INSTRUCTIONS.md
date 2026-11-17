# Rebrand this site

> Run with: "Read rebrand/INSTRUCTIONS.md and follow it to rebrand this site."

You are rebranding the site in the current folder for a **new business**. The goal is a site that looks and reads as if it had been built for the new client from day one, with **zero leftovers** of the old brand, and with all of the old site's guardrails (no invented facts, drafts flagged, sample listings safeguarded) still in force.

The `rebrand/` folder in this project contains:
- `REBRAND.md`: the intake form, filled in by the user
- `INSTRUCTIONS.md`: this file
- `scripts/logo-prep.mjs`: logo → transparent PNGs, favicon, Apple icon, OG image, palette (needs `sharp` in the project)
- `scripts/contrast.mjs`: WCAG contrast table and text-safe colour variants
- `scripts/brand-scan.mjs`: finds old-brand leftovers and stray hex codes (exit 1 if any)

Run the scripts from the **project root** with `node rebrand/scripts/<name>.mjs …`.

Mode: `depth` in `rebrand/REBRAND.md`: `skin` (default: logo, colours, text, metadata) or `full` (also fonts, signature motifs and section styling).

---

## 0. Safety first
1. `git status` must be clean. If it isn't, commit the current state as `chore: pre-rebrand snapshot`.
2. If this folder is a **live client's site**, stop and tell the user to copy the folder first (a new client gets a new folder, repo and Vercel project). Otherwise create a branch: `git switch -c rebrand/<new-slug>`.
3. Keep the rebrand tools out of the build and lint: add `rebrand/**` to the ESLint ignores (for example the `ignores` array in `eslint.config.mjs`) and make sure nothing in `src/` imports from `rebrand/`.

## 1. Intake
1. If `rebrand/REBRAND.md` still has an empty "Business name", or there is no logo file in `rebrand/`, tell the user what's missing and **stop**.
2. Read `rebrand/REBRAND.md` fully. Find the logo file in `rebrand/` (SVG preferred).
3. Read the project's `CLAUDE.md`, `docs/BRIEF.md` (if present) and the brand config (`src/config/brand.ts` or `src/config/business.ts`), to learn the current brand, the token names and the guardrails.
4. **Facts rule:** the only facts about the new business are those in `REBRAND.md`. Don't carry over any fact about the old business, and don't invent new ones. Unknown values stay empty and hidden.

## 2. Inventory the old brand
Build the old-terms list and save it to `rebrand/old-terms.txt`, one per line: old full name, short name, abbreviations, every phone format (local, international, digits only), WhatsApp number, email and domain, social handles, owner or team names, taglines, quoted client lines, registration numbers, street, city and area names that belonged to the old business, plus anything in `REBRAND.md` → "Extra old terms". Then run a baseline scan:
`node rebrand/scripts/brand-scan.mjs --terms "<comma-separated old terms>"`
Keep the output; it's your checklist.

## 3. Logo
1. Make sure `sharp` is a devDependency (`npm install --save-dev sharp`).
2. `node rebrand/scripts/logo-prep.mjs rebrand/<logo file>` (add `--bg none` if the logo is already transparent; `--bg "#RRGGBB"` to force the background colour to remove).
3. **Look at** `public/brand/logo@2x.png`, `favicon-256.png` and `og-image.jpg`. If the cut-out has halos, re-run with a different `--bg`, or keep the logo on its original background colour.
4. **Small raster logo** (the script warns): prefer asking the client for an SVG. If the logo is **simple and flat** (1–3 solid colours, geometric), you may rebuild it as a clean SVG: either trace it (`npm i -D potrace` → trace each colour mask separately at 8–12× upscale), or redraw simple geometry from measured pixel coordinates. Compare it side by side with the original before using it, and note "interim rebuilt logo" in the report.
5. Wire it in: replace the old logo component(s) (for example `Logo`, `AvMark`, `Wordmark`, `BuildingIcon`) with ones for the new logo. Inline SVG paths if you have an SVG; otherwise use `next/image` with the PNGs and an explicit display height that respects the warning. Update `src/app/icon.png`, `apple-icon.png` and `opengraph-image.jpg` from `public/brand/`.
6. Delete old brand files (old SVGs and PNGs in `public/brand/` and `assets/`, and the old `scripts/prepare-assets.mjs` if it is hard-wired to the old logo; update it, or remove it and mention that in the README).

## 4. Colours
1. Start from `REBRAND.md` → Colours. If it says "from logo", use `public/brand/palette.json` (ignore near-white or near-black anti-aliasing shades), and design a full token set: primary, primaryDeep, primaryRaised, accent, accentText (text-safe on light), surface (light background), surfaceAlt, ink, body text, line, mutedOnDark.
2. **Token names**: if the existing names are tied to the old palette (`teal`, `navy`, `green`, `gold`), rename them to semantic names (`primary`, `accent`, …) **everywhere** (config, CSS variables, Tailwind theme, components). Do this as one deliberate find-and-replace and build right after. If the names are already semantic, just change the values.
3. Run `node rebrand/scripts/contrast.mjs --config <brand config>`. Use only AA pairs for text; use the script's text-safe variants for "accent on light" style needs. Write the resulting rules (which colour may be text on which background) into `CLAUDE.md` and the contrast table in `docs/BRIEF.md`.
4. Search for `rgba(`, `hsl(`, gradients and shadows tinted with the old colours, and convert them to the new tokens.

## 5. Text and content
1. **Brand config**: identity, contact, voice and quotes, services, micro-copy, legal wording, colours, fonts. Unknown → empty.
2. **Voice**: rewrite hero lines, CTAs, section intros, About (who we are, mission, vision, values), process steps, FAQs, service copy and the 404 in the new business's voice, using `REBRAND.md` → Bio and Voice samples. Mark all rewritten copy `status: "draft"` except the client's own quoted words.
3. **Blog/insights posts**: if the industry and country are the same, update names, CTAs and any brand mentions. If either changes, rewrite or replace the posts for the new context (keep the same guardrails: general information, no fees, rates or timelines).
4. **Industry or country change**: update currency (convert sample prices at the rate and date given in `REBRAND.md`, store the rate in data meta), phone formats, `lang` locale, privacy law and regulator references, licensing fields, place names (sample data relabelled generically, with no invented landmarks), and units.
5. **Listings and portfolio data**: remove anything that was a **real** item of the old client (for example a listing with `sample: false` or `contentStatus: "confirmed"`), unless `REBRAND.md` lists it under keep. Samples stay samples, with every demo safeguard intact.
6. **Everything else that names the brand**: metadata and title template, JSON-LD, OG alt text, `manifest`, `package.json` name, `.env.example` (owner WhatsApp, email to), README, `CLAUDE.md`, `docs/BRIEF.md` and `docs/PROGRESS.md` (so future sessions know the new brand), and alt text that mentions the old name.

## 6. Full mode only (`full`)
- **Fonts**: choose display and body fonts that suit the new logo and personality (or use the ones in `REBRAND.md`). Swap the `next/font` imports and `brand.fonts`; check headline sizes still fit at 375px.
- **Motifs**: signature motifs derived from the *old* logo (for example a balance rule, the AV sweep, floor stripes) must go or be replaced by a motif derived from the *new* logo. Re-check each "personality mandate" item in `docs/BRIEF.md` and rewrite that section for the new brand.
- Corner radius, shadow and button styles to match the new personality words.

## 7. Verify (all must pass)
1. `node rebrand/scripts/brand-scan.mjs --terms "<old terms>"` → **0 hits** (any intentional exception must be listed in the report with a reason).
2. Search the codebase for the old **motif and component names** if they no longer make sense (for example `AvMark`, `FloorStripes`, `teal`) and rename them.
3. `contrast.mjs` again; no text pair below AA.
4. `npm run lint` and `npm run build` pass.
5. If browser tools (Playwright or Chrome DevTools MCP) are available: run `npm run dev`, screenshot Home, a listing or service page and Contact at 375×812 and 1280×800, and fix anything that looks off (logo size, contrast, leftover colours, overflow). Check that the favicon and OG image are the new ones.
6. If the project has an audit checklist in `.claude/skills/` (`audit-content` or `audit-conduct`), run its checks too.

## 8. Finish
1. Commit: `rebrand: <old name> → <new name>`.
2. Write `rebrand/REPORT.md` covering: what changed (logo, colours with the contrast table, fonts, copy, data), anything removed, open questions for the new client (missing facts, logo quality, copy to confirm), and the steps to deploy as a **new** Vercel project.
3. Tell the user, in a few lines: the result, the before and after colours, any warnings (for example a small logo), and that browsers cache favicons (hard refresh, or check in a private window).
