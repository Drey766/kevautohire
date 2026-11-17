# iMtalii Car Rentals — website

A luxury car rental website for **iMtalii Car Rentals**, Bruce House, Standard Street, Nairobi CBD: **airport transfers, chauffeur services and self-drive**, known for a **Land Cruiser Prado TX fleet for weddings, VIP events and executive transfers**. It must feel **luxurious, posh, premium and clean**, in royal purple, lavender and white with gold accents. Bookings are **requests** (no online payment). Call/WhatsApp: +254 721 621 888 · 0737 963 950.

Full spec: `docs/BRIEF.md`. Build order: `docs/PHASES.md`. **Progress log: `docs/PROGRESS.md`** (read it first, update it after every phase).

## Working mode: run unattended
- Run **all phases in `docs/PHASES.md` in order without waiting for me**. Don't ask questions the brief answers.
- Anything unanswered: the **conservative option** (empty and hidden, or draft), logged under "Open questions" in `docs/PROGRESS.md`; keep going.
- After each phase: `npm run lint` and `npm run build` pass → **one git commit** → tick it in `docs/PROGRESS.md` (2–3 lines) → next phase.
- **If compacted or lost**, re-read this file, `docs/PROGRESS.md` and the current phase first.
- An error that survives 3 honest attempts: log it under "Blocked", skip that item, continue.
- **Never** `git push`, deploy, delete `.git`, or install global packages. Stay inside this folder.
- **Visual checks:** if Playwright or Chrome DevTools MCP tools are available, use them as PHASES describes. If not, don't install them; review the markup and note "visual check skipped". If a frontend-design skill is available, follow it.

## Stack and commands
- Next.js App Router (latest stable), TypeScript, Tailwind, `zod`, `resend`, `lucide-react`. No database, auth, payments, admin, or carousel/animation/date libraries.
- After scaffolding, follow `AGENTS.md` (check `node_modules/next/dist/docs/` when unsure about a Next.js API).
- `npm run dev` · `npm run lint` · `npm run build` · `node scripts/prepare-assets.mjs`.

## Single source of truth
- `src/config/brand.ts` holds name, contacts, the client's own words, services, copy, legal wording, **colours** and fonts. **No hex codes outside `brand.ts`** (CSS variables → Tailwind theme; the logo SVG uses `--logo-gold-from`, `--logo-gold-to` and `--logo-tagline`).
- `src/data/fleet.json` is provided (29 cars). **IM-001 = iMtalii's own Prado TX (confirmed, rate on request).** IM-002 to IM-029 are samples.
- `data-raw/car-notes.json` is only for paraphrasing in Phase 2. Never import it; keep it git-ignored.

## Guardrails (non-negotiable — full text in BRIEF §2)
1. **Never invent facts about iMtalii**: no founding year, customer counts, ratings, team, branches, partners or fleet-size claims. Unknown = empty, and **the UI hides empty things**.
2. **No testimonials, reviews or star ratings** (ignore the source data's ratings).
3. **No "best", "#1", "cheapest" or "leading".** Their own phrases are fine ("Premium Fleet", "Arrive with Prestige").
4. **No invented policies or offers**: no deposit, insurance, mileage, age, cancellation, delivery-fee, waiting-time, meet-and-greet or decoration details or amounts. "24/7 support" and "nationwide delivery" are confirmed (state them, without details).
5. **Sample cars** come from another company's public site. With `NEXT_PUBLIC_DEMO_MODE=true`: site-wide notice, "Sample" tags (IM-001 gets "iMtalii Fleet"), **noindex everywhere**, robots disallow, no Product or Offer JSON-LD, no sample cars in the sitemap. **Never show the source company's name or links.** Rewrite descriptions; keep only features clearly correct for each model.
6. **Rates and estimates are indicative** (`legal.estimateNotice`); IM-001 and airport transfers are "quote on request".
7. **Privacy**: forms email or hand off to WhatsApp and store nothing; **never ask for ID, licence or passport numbers**; no analytics; compare lives in `localStorage`. Cite the Data Protection Act, 2019 and the ODPC.
8. **Drafts flagged** (`status: "draft"` + `<DraftBadge />` when `NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true"`). Their quoted words are confirmed.
9. No emoji, no exclamation marks. The brand is written **"iMtalii"** in copy (`brand.name`).

## Design essentials — "Grand Arrival" (BRIEF §5–6)
- Aubergine `#1A0B2E` night sections with purple and lavender glows, **purple `#6A00BC`** for primary buttons (white text) and links on light, **lavender `#C9B6EC`** for text and accents on dark, **lavender mist `#EEE8F8`** and white for light sections, and the logo's **gold `#E0A84A`** as jewellery (rings, hairlines, numerals).
- **Gold is never text on white or lavender mist; purple is never text on aubergine** (use lavender there).
- **Marcellus** (display) + **Outfit** (body, tabular numerals).
- Motifs: **gold ring** (logo emblem), **arrival line** (flight path), **ribbon** (weddings), lavender glow, frosted glass booking console.
- **The personality mandate (BRIEF §6) is required.** Everything respects `prefers-reduced-motion`.
- Mobile-first: sticky bar (Call (chooser for both numbers) · WhatsApp · Fleet/Book this car · Book), tap targets ≥ 44px, check at 375px; filters in a bottom sheet.

## Next.js gotchas that have bitten before
- `"use client"` for hooks and handlers; keep pages server-side.
- `useSearchParams()` inside `<Suspense>` (fleet filters, book and contact pre-fills).
- `localStorage` only in effects, wrapped in try/catch, no hydration mismatch.
- Unique, stable keys. `generateStaticParams` + `notFound()`. `params` is async.
- Dates in Africa/Nairobi time; no past pick-ups; return after pick-up.
- `create-next-app` refuses non-empty folders: scaffold into `imtalii-scaffold/` and **merge** into the existing `src/` (Phase 1).
- Only `luxurycarhire.co.ke` in `images.remotePatterns`.
- `.npmrc` with `legacy-peer-deps=true` only if install fails with `ERESOLVE`.
