---
name: audit-content
description: Audit the iMtalii site against the guardrails in CLAUDE.md (sample-fleet safeguards, no invented policies or claims, contrast, privacy). Use before launch or after content changes.
---

Audit against `CLAUDE.md` and `docs/BRIEF.md` §2. When the user invokes this directly, **report only**. During the unattended Phase 8, fix every failure and re-run the checks.

Search with Grep or `git grep` over `src/`, `public/`, `README.md` and `next.config.*`. Report hits as `file:line` with a verdict and reason.

1. **Source leakage**: "Luxury Car Hire", "luxurycarhire" (allowed only in image URLs and `next.config`), "near me", "agency in Nairobi", and any `data-raw` import.
2. **Ratings and reviews**: "/5", "reviews", "rating", "stars", testimonials anywhere.
3. **Feature accuracy** in `fleet.json`: "xDrive" outside BMW, "Quattro" outside Audi, "4MATIC" outside Mercedes, "Harman Kardon", "Bang & Olufsen", "Burmester", "Mark Levinson" or "Bowers & Wilkins" on the wrong brand, "Professional Chauffeur" listed as a car feature.
4. **Copied text**: compare each sample `description` with `data-raw/car-notes.json` (read for checking only) and flag any run of 8 or more identical words.
5. **Data integrity**: 29 cars; IM-001 is still `contentStatus: "confirmed"`, `rateOnRequest: true`, `sample: false`; every sample has a summary, description, features and idealFor; refs, rates, specs and images are unchanged versus the Phase 1 commit.
6. **Demo safeguards** (`NEXT_PUBLIC_DEMO_MODE=true`): DemoNotice site-wide; Sample tags (and the iMtalii Fleet tag on IM-001); noindex; robots disallow; no sample cars in the sitemap; no Product or Offer JSON-LD.
7. **Superlatives**: best, cheapest, "#1", number one, leading, top-rated, unbeatable, "lowest price", guaranteed, "most luxurious".
8. **Invented policies and offers**: deposit, insurance, mileage, "km", "unlimited", minimum age, cancellation, refund, discount, "% off", "free", delivery fee amounts, waiting time ("minutes"), "meet and greet" or name boards promised as standard, decoration packages or prices, payment methods stated as fact.
9. **Invented facts**: years in business, founding year, customers served, branches, partner hotels or airlines, people's names.
10. **ID collection**: no fields or text asking for ID, licence or passport **numbers**.
11. **Hex colours outside `src/config/brand.ts`** (the logo SVG uses CSS variables; `prepare-assets.mjs` may keep its defaults).
12. **Hardcoded brand data** in components: "iMtalii", "Imtalii", "721 621", "737 963", "imtaliiofficial", "Bruce House", the quoted lines.
13. **Contrast**: no gold text on white or lavenderMist; no purple text on aubergine (lavender instead); buttons: white on purple, aubergine on gold (gold buttons only on dark).
14. **Empty values hidden**: hours, map, socials, foundedYear, About experience and team; `openingHours` absent from JSON-LD unless real.
15. **Privacy**: `/api/booking` never logs bodies or personal data; returns `ok: false` when not configured; forms show the fallback and never a false success; WhatsApp prefills contain no phone or email; `localStorage` only for compare (and recently viewed), in effects, with try/catch.
16. **Estimates**: always with `legal.estimateNotice`; none for IM-001 or airport transfers; `rentalDays` rounds up with a minimum of 1; date validation is enforced client- and server-side.
17. **Images**: SmartImage with fallback everywhere; `remotePatterns` only `luxurycarhire.co.ke`; IM-001 uses the local own photo; meaningful alt text.
18. **Motion**: everything respects `prefers-reduced-motion`.
19. **Next.js gotchas**: `useSearchParams` only inside `<Suspense>`; `"use client"` where needed; unique keys; ARIA tabs on the booking console; no hydration warnings.
20. **Emoji and exclamation marks** in UI copy.

Finish with a table (item, PASS or FAIL, hits), fixes ordered by importance, and the results of `npm run lint` and `npm run build`.
