# Progress log

Claude: update this at the end of every phase. If you were compacted, read this first.

## Phases
- [x] Phase 1 — Foundation
- [x] Phase 2 — Car content (IM-001 + 28 samples)
- [x] Phase 3 — Supporting content
- [x] Phase 4 — Home
- [x] Phase 5 — Fleet, car pages, Compare
- [x] Phase 6 — Services, How It Works, Requirements & FAQs, About
- [x] Phase 7 — Book, Blog, Contact, API, legal, SEO
- [x] Phase 8 — Audit
- [x] Phase 9 — Polish, QA, README

## Phase 2 batch tracker
- [x] IM-001 (own Prado TX — description only)
- [x] IM-002 – IM-011
- [x] IM-012 – IM-021
- [x] IM-022 – IM-029

## Notes per phase (include "visual check done / skipped")

**Phase 1:** Next 16.4 scaffold merged (Cache Components on, as scaffolded). Brand config, theme variables, layout, nav, footer, mobile bar and brand components built. Demo mode is treated as on unless explicitly "false", so samples cannot be indexed by accident. Visual check not required this phase.

**Phase 2:** IM-001 description from their posts only (features left empty). IM-002 to IM-029 rewritten; features restricted to source items clearly right for each model. Automated checks clean.

**Phase 3:** Services, steps, requirements, FAQs and 6 blog posts written, all draft (service names marked confirmed via nameStatus). Checked for amounts, policies and superlatives.

**Phase 4:** Home built with all sections. Visual check done at 375 and 1280 (fixed hero contrast on phones, WhatsApp pill overlap, tab clipping, arrival line draw).

**Phase 5:** Fleet (URL-synced filters, mobile sheet, sorting, estimates, empty state, compare tray), car pages (gallery, lightbox, booking card, live estimate) and Compare. Visual check done at 375 and 1280. Sample photos load slowly from the source host in dev, and SmartImage shows its fallback when they time out.

**Phase 6:** Services and 5 detail pages (forms built in full, wired to the API in Phase 7), How It Works stepper, Requirements & FAQs, About. Empty About experience and team are hidden. Visual check done at 375 and 1280.

**Phase 7:** Book, Blog, Contact, /api/booking (zod, honeypot, timing, rate limit, Resend, optional WhatsApp alert, no logging), Privacy, Terms, 404, sitemap, robots. Tested all four kinds with no email keys (always ok:false with the WhatsApp and Call fallback), date validation, honeypot, timing and 404s. Visual check done.

**Phase 8:** All 20 audit checks run. Fixed: hardcoded address in Contact metadata, ratings-rule hit on two Mercedes descriptions, Sample tags missing on class tiles, heading order on /blog, booking card tabpanel. Everything else passed; remaining grep hits were false positives (for example Tailwind leading-*, "Preview", "frustrating").

**Phase 9:** Personality review by component: hero (Hero, BookingConsole), occasions (Occasions), promise strip (PromiseStrip), luxury meets business (LuxuryMeetsBusiness, ArrivalLine), rhythm (Home section order), details (RateBadge, Marcellus names, Field date inputs, focus variables, not-found). Lighthouse accessibility 100 on Home, Fleet, Book, a car page and Weddings. Keyboard tabs checked. Fixed /book overflow at 375, tap targets under 44px and generic link text. Production test found soft 404s on unknown slugs, so Cache Components (scaffold default, unused) was turned off and dynamicParams = false added: unknown slugs now return 404. README written. Visual check done.

## Open questions (for iMtalii — copy into the README checklist)

All of these are in the README checklist.
- Real fleet, photos and rates; Prado TX rate, seats and self-drive availability.
- Name styling (iMtalii or Imtalii); hours beyond 24/7 support; primary WhatsApp number.
- Airport details (airports, meet and greet, waiting); wedding glam options; delivery fees and areas.
- Requirements (licence, ID, deposit, age); what rates include; payment methods.
- Social links, Bruce House map pin, official vector logo, higher-resolution photos.
- A verified email sending domain, without which every form falls back to WhatsApp and Call.
- Blog post dates are placeholders (build date).

- IM-029 (C-Class) image URLs in fleet.json point at S-Class photos. Left unchanged (sample data); it goes away when the real fleet replaces samples.

## Blocked

Nothing blocked. Note: sample photos load from a slow third-party host, so some cards can show the emblem fallback until the image cache warms up. Reduced-motion is handled by a global CSS rule and was not exercised in a browser.
