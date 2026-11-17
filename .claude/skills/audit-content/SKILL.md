---
name: audit-content
description: Audit the Kev Auto Hire site against the guardrails in CLAUDE.md (sample-fleet safeguards, no invented policies or claims, contrast, privacy). Use before launch or after content changes.
---

Audit against `CLAUDE.md` and `docs/BRIEF.md` §2. When the user invokes this directly, **report only**. When asked to fix, fix every failure and re-run the checks.

Search with Grep or `git grep` over `src/`, `public/`, `README.md` and `next.config.*`. Report hits as `file:line` with a verdict and reason.

1. **Source leakage**: "Luxury Car Hire", "luxurycarhire" (allowed only in image URLs and `next.config`), "near me", "agency in Nairobi", and any `data-raw` import.
2. **Ratings and reviews**: "/5", "reviews", "rating", "stars", testimonials anywhere.
3. **Feature accuracy** in `fleet.json`: "xDrive" outside BMW, "Quattro" outside Audi, "4MATIC" outside Mercedes, "Harman Kardon", "Bang & Olufsen", "Burmester", "Mark Levinson" or "Bowers & Wilkins" on the wrong brand, "Professional Chauffeur" listed as a car feature.
4. **Copied text**: compare each sample `description` with `data-raw/car-notes.json` (read for checking only) and flag any run of 8 or more identical words.
5. **Data integrity**: 28 sample cars (KA-002 to KA-029, all `sample: true`, `driveOptions: ["chauffeur"]`) plus any real Kev Auto Hire vehicles (`sample: false`, `contentStatus: "confirmed"`); every car has a summary, description, features and idealFor; no description offers self-drive.
6. **Demo safeguards** (`NEXT_PUBLIC_DEMO_MODE=true`): Sample tags on every sample card and page (and the "Kev Auto Fleet" tag on real vehicles); noindex on sample car pages; no sample cars in the sitemap; no Product or Offer JSON-LD; Terms explains the samples. Flag that there is no site-wide notice or site-wide noindex (open question in PROGRESS.md).
7. **Superlatives**: best, cheapest, "#1", number one, leading, top-rated, unbeatable, "lowest price", guaranteed, "most luxurious".
8. **Invented policies and offers**: deposit, insurance, mileage, "km", "unlimited", minimum age, cancellation, refund, discount, "% off", "free", delivery fee amounts, waiting time ("minutes"), "meet and greet" or name boards promised as standard, decoration packages or prices, payment methods stated as fact. Also "24/7", "delivery", "self-drive" offered as a service, "wedding glam" or decoration.
9. **Invented facts**: years in business, founding year, customers served, branches, partner hotels or airlines, people's names.
10. **ID collection**: no fields or text asking for ID, licence or passport **numbers**.
11. **Hex colours outside `src/config/brand.ts`** (run `node rebrand/scripts/brand-scan.mjs --terms "$(paste -sd, rebrand/old-terms.txt)"`, which also finds old-brand leftovers).
12. **Hardcoded brand data** in components: "Kev Auto Hire", "0721 569 063", "721569063", "kev_auto_hire" and the quoted lines belong in `brand.ts` only. Also no leftovers from the earlier client (`rebrand/old-terms.txt`).
13. **Contrast**: no accent-green text on white or mist (use primary or accentText); no primary text on night (soft or accent instead); buttons: white on primary, night on accent (accent buttons only on dark). Check with `node rebrand/scripts/contrast.mjs --config src/config/brand.ts`.
14. **Empty values hidden**: email, address, map, hours, socials, foundedYear, heroImage, About experience and team; `openingHours`, `email` and `streetAddress` absent from JSON-LD unless real.
15. **Privacy**: `/api/booking` never logs bodies or personal data; returns `ok: false` when not configured; forms show the fallback and never a false success; WhatsApp prefills contain no phone or email; `localStorage` only for compare (and recently viewed), in effects, with try/catch.
16. **Estimates**: always with `legal.estimateNotice`; none for rate-on-request cars or airport transfers; `rentalDays` rounds up with a minimum of 1; date validation is enforced client- and server-side.
17. **Images**: SmartImage with fallback everywhere; `remotePatterns` only `luxurycarhire.co.ke`; real vehicles use local photos; the logo is never shown taller than 75px; meaningful alt text.
18. **Motion**: everything respects `prefers-reduced-motion`.
19. **Next.js gotchas**: `useSearchParams` only inside `<Suspense>`; `"use client"` where needed; unique keys; ARIA tabs on the booking console; no hydration warnings.
20. **Emoji and exclamation marks** in UI copy.

Finish with a table (item, PASS or FAIL, hits), fixes ordered by importance, and the results of `npm run lint` and `npm run build`.
