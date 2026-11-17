# Progress log

Claude: update this after every piece of work. If you were compacted, read this first.

## History
- [x] Original build: 9 phases for an earlier client (see git history before the rebrand commit).
- [x] **Rebrand to Kev Auto Hire** (2026-11-17, branch `rebrand/kev-auto-hire`). Details: `rebrand/REPORT.md`.

## Rebrand notes
New logo (PNG from the client's 150px JPG, on a white disc on dark), colours from the logo (black and green), all copy rewritten in Kev Auto Hire's voice (their quotes confirmed, everything else draft), services reshaped around their posts (Airport Transfers, Chauffeur-Driven Hire, Weddings, Corporate Travel, Family Trips & Road Trips). Self-drive, 24/7, delivery, office, email and wedding decoration removed (not confirmed). The earlier client's own car and photos removed; the 28 samples kept (refs KA-002 to KA-029), chauffeur-only. Lint and build pass. Visual check done at 375 and 1280 (Home, a car page, Contact).

## Photos
Photos live in `public/photos/` (set in `brand.photos`; credits and notes in `docs/PHOTOS.md`). **Supplied by the owner:** the home hero (a row of minivans) and the Weddings photo (a van dressed in roses; its number plate is visible). **Kenyan Pexels stock** (Nairobi skyline, a man in a suit on a Nairobi street, the Nairobi expressway, a Kenyan dirt road, a Maasai Mara sunset) fills Airport, Corporate, Chauffeur, Family and About until their own photos arrive. Visual check done at 375 and 1280. Fixed the About panel clipping the logo on phones and loaded the navbar logo eagerly.

## Open questions (for Kev Auto Hire — also in the README checklist)
- Their real vehicles (models, seats, photos, rates). The site currently shows only samples.
- More of their own photos (drivers, airport pickup, corporate booking, road trip), to replace the Kenyan Pexels stand-ins (`docs/PHOTOS.md`).
- An official vector logo (the current one is a 150px image, shown no taller than 75px).
- Email address (for bookings and the privacy and terms pages), office address or pick-up base, map pin, hours, website domain, Facebook and TikTok.
- Do they offer self-drive? (Hidden; the code still supports it.)
- Airports served; how airport pickups and delays work; wedding extras such as decoration.
- Requirements, what rates include, payment methods.
- **Demo mode safeguards:** the earlier build kept the site indexable and showed no site-wide notice (only sample car pages are noindexed and tagged). Now that *every* car is a sample, consider a site-wide demo notice and site-wide noindex until the real fleet is in (CLAUDE.md guardrail 5).
- Blog post dates are placeholders (build date).

## Blocked
Nothing blocked. Sample photos load from a slow third-party host, so cards can show the logo fallback until the image cache warms up.
