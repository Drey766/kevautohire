# Kev Auto Hire — website

A chauffeur-driven car hire website for **Kev Auto Hire** ("Kev Auto"), Nairobi: **premium 7-seaters with professional drivers** for **weddings, road trips, airport transfers, corporate travel, family trips and special occasions**, in **Nairobi and beyond** (they serve clients countrywide). It must feel **clean, premium and bold**, in the logo's **black and green** with white. Bookings are **requests** (no online payment). Call, text or WhatsApp: **0721 569 063**. Instagram: @kev_auto_hire.

Full spec: `docs/BRIEF.md`. Progress log: `docs/PROGRESS.md` (read it first, update it after each piece of work). Rebrand record: `rebrand/REPORT.md`.

This site was rebranded on 2026-11-17 from an earlier client's build (see `rebrand/REPORT.md`). No fact about that earlier business applies here.

## Working mode
- Anything unanswered: the **conservative option** (empty and hidden, or draft), logged under "Open questions" in `docs/PROGRESS.md`; keep going.
- After a change: `npm run lint` and `npm run build` pass → one git commit → note it in `docs/PROGRESS.md`.
- **If compacted or lost**, re-read this file and `docs/PROGRESS.md` first.
- An error that survives 3 honest attempts: log it under "Blocked", skip that item, continue.
- **Never** `git push`, deploy, delete `.git`, or install global packages. Stay inside this folder.
- **Visual checks:** if Playwright or Chrome DevTools MCP tools are available, check 375×812 and 1280×800. If not, review the markup and note "visual check skipped".

## Stack and commands
- Next.js App Router, TypeScript, Tailwind, `zod`, `resend`, `lucide-react`. No database, auth, payments, admin, or carousel/animation/date libraries.
- Follow `AGENTS.md` (check `node_modules/next/dist/docs/` when unsure about a Next.js API).
- `npm run dev` · `npm run lint` · `npm run build`. New logo files: `node rebrand/scripts/logo-prep.mjs <logo>` (writes `public/brand/`), then copy the icons into `src/app/`.

## Single source of truth
- `src/config/brand.ts` holds name, contacts, the client's own words, services, copy, legal wording, **colours** and fonts. **No hex codes outside `brand.ts`** (CSS variables → Tailwind theme).
- `src/data/fleet.json`: **28 sample cars (KA-002 to KA-029). Kev Auto Hire's own fleet is not on the site yet.**
- `data-raw/car-notes.json` is only for paraphrasing sample text. Never import it; keep it git-ignored.

## Guardrails (non-negotiable — full text in BRIEF §2)
1. **Never invent facts about Kev Auto Hire**: no founding year, customer counts, ratings, team, branches, partners, office address, hours or fleet-size claims. Unknown = empty, and **the UI hides empty things** (email, address, map, hours are empty today).
2. **No testimonials, reviews or star ratings.**
3. **No "best", "#1", "cheapest" or "leading".** Their own phrases are fine ("Premium 7 Seaters Car Hire", "Your journey, our priority.", "Travel in Comfort. Arrive in Style.").
4. **No invented policies or offers**: no deposit, insurance, mileage, age, cancellation, waiting-time, meet-and-greet, decoration, 24/7 or delivery details or amounts. Confirmed: chauffeur-driven, professional drivers, 7-seaters, Nairobi and beyond / countrywide. **Self-drive is not confirmed** and is not offered on the site (the code still supports it, dormant).
5. **Sample cars** come from another company's public site. With `NEXT_PUBLIC_DEMO_MODE=true`: "Sample" tags, noindex on sample car pages, no Product or Offer JSON-LD, no sample cars in the sitemap, and the Terms page explains it. **Never show the source company's name or links.** (See the open question in `docs/PROGRESS.md` about a site-wide notice and site-wide noindex now that every car is a sample.)
6. **Rates and estimates are indicative** (`legal.estimateNotice`); airport transfers are "quote on request".
7. **Privacy**: forms email or hand off to WhatsApp and store nothing; **never ask for ID, licence or passport numbers**; no analytics; compare lives in `localStorage`. Cite the Data Protection Act, 2019 and the ODPC.
8. **Drafts flagged** (`status: "draft"` + `<DraftBadge />` when `NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true"`). Their quoted words (`brand.voice`) are confirmed.
9. No emoji, no exclamation marks. The brand is written **"Kev Auto Hire"** in copy (`brand.name`), "Kev Auto" as the short name.

## Design essentials (BRIEF §5–6)
- Night sections in the logo's **black `#101513`** with soft green glows; **deep green `#2E6B1F`** for primary buttons (white text) and links/eyebrows on light; **soft `#C9D6CC`** for text on dark; **mist `#F1F6EE`** and white for light sections; the logo's **green `#6FAE34`** (`accent`) for rings, hairlines, numerals, eyebrows on dark and the accent button (night text).
- **Colour rules (WCAG AA):** white on primary 6.5 · primary on white/mist 6.5/5.9 · ink on white/mist 18.3/16.7 · body on white/mist 7.4/6.7 · soft/white on night 12.3/18.4 · accent on night 6.8 · night on accent 6.8. **Accent is never text on white or mist** (2.7); use `accentText` `#528126` (4.6 on white) or primary. **Primary is never text on night** (use soft or accent).
- **Marcellus** (display) + **Outfit** (body, tabular numerals).
- Motifs: the **accent ring** (`AccentRing`, from the logo's round emblem), the **swoosh** (`Swoosh`, the logo's sweeping green arc, used where there is no photo), the **arrival line** (airport), the **ribbon** (weddings), green glow, frosted glass booking console.
- **Logo:** `public/brand/logo@2x.png` (from a 150px original). `<Logo />` shows it at most 75px tall; on dark it sits on a white disc. Replace it when the official vector arrives.
- Mobile-first: sticky bar (Call · WhatsApp · Fleet/Book this car · Book), tap targets ≥ 44px, check at 375px; filters in a bottom sheet. Everything respects `prefers-reduced-motion`.

## Next.js gotchas that have bitten before
- `"use client"` for hooks and handlers; keep pages server-side.
- `useSearchParams()` inside `<Suspense>` (fleet filters, book and contact pre-fills).
- `localStorage` only in effects, wrapped in try/catch, no hydration mismatch.
- Unique, stable keys. `generateStaticParams` + `notFound()`. `params` is async.
- Dates in Africa/Nairobi time; no past pick-ups; end after pick-up.
- Only `luxurycarhire.co.ke` in `images.remotePatterns` (sample photos; remove with the samples).
