# Build phases (unattended run)

Run every phase in order, back to back. End of each phase: `npm run lint` and `npm run build` pass → one commit (`Phase N: <name>`) → tick it in `docs/PROGRESS.md` with a short note → continue. Read the BRIEF sections listed before each phase. If compacted, re-read `CLAUDE.md` and `docs/PROGRESS.md` first.

**Visual check (Phases 4–7 and 9):** if Playwright or Chrome DevTools MCP tools are available, start `npm run dev`, open each page built in the phase, take **viewport** screenshots (not full-page) at 375×812 and 1280×800, look at them critically, and fix layout, spacing, contrast and overflow before committing. Stop the dev server afterwards. Otherwise review the markup and note "visual check skipped" in PROGRESS.md.

---

## Phase 1 — Foundation
**Read:** BRIEF §3, §4, §5, §7, §9, §11, §13, §14, §15.
1. `git init` if there's no `.git` folder.
2. `npx create-next-app@latest imtalii-scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --disable-git --yes`. Move everything (including `.gitignore`) up; **merge** the scaffold's `src/app/` into the existing `src/` (which already has `src/data/fleet.json`); delete `imtalii-scaffold/`. Never overwrite `CLAUDE.md`, `START-HERE.md`, `docs/`, `assets/`, `scripts/`, `src/data/`, `data-raw/` or `.claude/`. Read `AGENTS.md`.
3. Make sure `.gitignore` contains `data-raw/`.
4. `npm install zod resend lucide-react`; `npm install --save-dev sharp`.
5. `src/config/brand.ts` (BRIEF §3), then `node scripts/prepare-assets.mjs`. Copy `public/brand/favicon-256.png` → `src/app/icon.png`, `apple-touch-icon.png` → `src/app/apple-icon.png`, `og-image.jpg` → `src/app/opengraph-image.jpg`; remove the scaffold `favicon.ico` if it conflicts.
6. Types (§12), `src/lib/data.ts` (typed loader), `src/lib/format.ts`, `src/lib/booking.ts` (§9).
7. Fonts: Marcellus and Outfit via `next/font/google`. CSS variables from `brand.colors` → Tailwind theme. `globals.css` components (§5).
8. Brand components: Logo (inline `assets/imtalii-logo.svg`; variants full, wordmark, emblem; tones dark and light), GoldRing, ArrivalLine, Ribbon, Glow. UI: SmartImage (remote → aubergine fallback), DraftBadge, SampleTag, OwnFleetTag, Reveal plus `useReveal`.
9. Layout: skip link, Navbar (transparent over the hero → white on scroll), MobileMenu, Footer, MobileActionBar with CallSheet, WhatsAppPill, DemoNotice, `AutoRental` JSON-LD, metadata (noindex in demo mode). A placeholder home page.
10. `next.config`: `images.remotePatterns` for `luxurycarhire.co.ke` only. `.env.example`.

## Phase 2 — Car content (IM-001 plus 28 samples)
**Read:** BRIEF §2 (guardrails 2, 5, 6), §12 (Phase 2 rules).
IM-001: write its `description` from their own posts only. IM-002 to IM-029: fill `summary`, `description`, `features` (curated) and `idealFor` from `data-raw/car-notes.json`, in batches of 10, saving after each batch and ticking the tracker. Don't change other fields.
**Check:** search the descriptions for "Luxury Car Hire", "luxurycarhire", "near me", "review", "/5", "KES", "only KES", "agency", and wrong-brand features ("xDrive" outside BMW, "Quattro" outside Audi, "4MATIC" outside Mercedes, "Harman Kardon" or "Bang & Olufsen" on the wrong brand), and fix every hit.

## Phase 3 — Supporting content
**Read:** BRIEF §2, §8 (Services, How It Works, Requirements, About), §12.
Write `services.json` (5), `steps.json`, `requirements.json`, `faqs.json` (10), then `blog.json` (6 posts).
**Check:** no amounts, time limits, inclusions, discounts, superlatives or invented facts; all draft (service names confirmed); posts end with `articleNotice`.

## Phase 4 — Home
**Read:** BRIEF §5, §6, §8 (Home), §9.
All Home sections, meeting the personality mandate: the hero with their convoy photo, glow and the frosted BookingConsole (tabs Self-Drive · Chauffeur · Airport Transfer, proper ARIA tabs, routing to `/fleet?…` or `/book?service=airport…`); promise strip; occasions; featured rail; class tiles; services trio; luxury meets business; how it works preview; stand out band; blog preview; final CTA. Visual check.

## Phase 5 — Fleet, car pages, Compare
**Read:** BRIEF §8 (Fleet, Compare), §9, §11.
`/fleet` (URL-synced, debounced filters inside `<Suspense>`; mobile bottom sheet; sorting; estimates with dates; empty state; CompareTray), `/fleet/[slug]` (gallery and lightbox, RateBadge, specs, features, BookingCard with EstimatePanel, similar cars; IM-001 "Rate on request"), `/compare`. Visual check.

## Phase 6 — Services, How It Works, Requirements & FAQs, About
**Read:** BRIEF §8.
`/services` and the 5 detail pages (with their forms as UI), `/how-it-works` (stepper on the ArrivalLine), `/requirements`, `/about`. Sections without real data are omitted. Visual check.

## Phase 7 — Book, Blog, Contact, API, legal, SEO
**Read:** BRIEF §8, §10, §11.
`/book` (service tabs, pre-filled from query params inside `<Suspense>`), `/api/booking` (all four kinds: zod, honeypot, timing, rate limit, Resend, fallback, no storing or logging), wire every form, `/blog` and posts, `/contact`, `/privacy`, `/terms`, the 404, `sitemap.ts` (no samples in demo mode), `robots.ts` (disallow in demo mode).
**Check:** with no email keys, every form shows the WhatsApp and Call fallback and never a false success. Test by calling the API on the dev server for each kind. Test the date validation. Visual check.

## Phase 8 — Audit
Run every check in `.claude/skills/audit-content/SKILL.md` and **fix every failure** (in this unattended run you may edit to fix). Commit.

## Phase 9 — Polish, QA, README
1. **Personality review**: go through BRIEF §6 point by point, name the component that delivers each, and improve anything plain. With browser tools, screenshot Home, Fleet (filters on mobile), a sample car page, IM-001, Weddings, Airport Transfers and Book at both sizes, and refine. Make sure it feels luxurious and calm, not busy.
2. Accessibility: keyboard (tabs, filters, sheets, date inputs), focus, labels, contrast (no gold text on light, no purple text on aubergine), headings, reduced motion. Run a Lighthouse accessibility pass with Chrome DevTools MCP if available.
3. Write `README.md` (BRIEF §16), including everything under "Open questions".
4. Final `npm run lint` and `npm run build`, then commit.
5. Short report: built, sample or draft, blocked, and what iMtalii needs to provide.
