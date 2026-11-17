# Rebrand report: iMtalii Car Rentals → Kev Auto Hire

Date: 2026-11-17 · Depth: **skin** · Branch: `rebrand/kev-auto-hire`

The folder had no git repository, so one was created with a `chore: pre-rebrand snapshot` commit of the untouched site before any change. Lint and build pass. The leftover scan finds **0** old-brand hits and **0** stray hex codes (see "Scan exceptions").

## What changed

### Logo
- Source: `rebrand/753522139_…n.jpg` (150×150 JPG on white), also saved as `assets/logo-original.jpg`.
- `logo-prep.mjs` made a clean transparent cut-out (`public/brand/logo.png`, `logo@2x.png`), the favicon (`src/app/icon.png`), the Apple icon and the 1200×630 share image (`src/app/opengraph-image.jpg`).
- **Interim, raster only.** A vector rebuild was tried (potrace, per-colour masks at 12×) and rejected: the thin van lines wobbled, "HIRE" broke up and the tagline was unreadable. The logo is mostly black, so on dark backgrounds `<Logo />` places the PNG on a **white disc** with a fine green ring, which suits the round emblem. It is shown at most 75px tall (52px in the navbar, 72px in the footer).
- Removed: the old traced SVG logo, emblem, the old client's convoy photo (used in the hero, Weddings, VIP and About), `scripts/prepare-assets.mjs` (hard-wired to the old logo; the README now points to `rebrand/scripts/logo-prep.mjs`), and `START-HERE.md` (the old client's build-kit instructions).

### Colours (from the logo: black `#121415`, green `#6D9B33`)
Tokens were renamed from palette names to semantic names everywhere (config, CSS variables, Tailwind theme, components): purple → `primary`, aubergine → `night`, lavender → `soft`, lavenderMist → `mist`, slate → `body`, gold → `accent`. `GoldRing` became `AccentRing`, `.gold-ring` → `.accent-ring`, `.btn-gold` → `.btn-accent`.

| Token | Before | After | Role |
|---|---|---|---|
| primary | `#6A00BC` purple | `#2E6B1F` deep green | buttons (white text), links and eyebrows on light |
| primaryDeep | `#4E008C` | `#245818` | hover, chips |
| night | `#1A0B2E` aubergine | `#101513` logo black | dark sections, footer, hero |
| nightRaised | `#2E1450` | `#1C2420` | panels on dark |
| soft | `#C9B6EC` lavender | `#C9D6CC` | text on dark, soft fills |
| mist | `#EEE8F8` | `#F1F6EE` | light sections |
| ink | `#120A1F` | `#111614` | headings |
| body | `#5B5468` | `#4F5853` | body text |
| line | `#E6E0F0` | `#E1E8E0` | borders |
| accent | `#E0A84A` gold | `#6FAE34` logo green | rings, numerals, eyebrows on dark, accent button |
| accentFrom / accentTo | `#D0802F` / `#F7C35F` | `#5E9A2C` / `#8CC63F` | swoosh gradient, accent hover |
| accentText | — | `#528126` | accent-coloured text on white (4.64) |

**Contrast (all text pairs AA or better):**

| Pair | Ratio |
|---|---|
| ink on white / mist | 18.28 / 16.68 |
| body on white / mist | 7.36 / 6.71 |
| primary on white / mist (and white on primary) | 6.48 / 5.91 |
| primaryDeep on mist (chips, draft badge) | 7.71 |
| white / soft on night | 18.44 / 12.27 |
| soft on nightRaised | 10.57 |
| accent on night / nightRaised; night on accent | 6.83 / 5.88; 6.83 |
| ❌ accent on white / mist | ~2.7: never text (hairlines, rings and the ribbon only) |
| ❌ primary on night | 2.8: never text (use soft or accent) |

The rules are written into `CLAUDE.md` and `docs/BRIEF.md` §5.

### Fonts and motifs (skin depth)
- Fonts unchanged: Marcellus (display) and Outfit (body).
- The gold ring motif became the **accent ring**; the logo also has a ring, so it still fits.
- New **`Swoosh`** motif from the logo's sweeping green arc. It replaces the missing photos in the hero, the service heroes, the Weddings tile and the About panel. The hero shows a photo again as soon as `brand.heroImage` is set.
- The arrival line (airport) and the ribbon (weddings) are kept.

### Copy and content
- `brand.ts` rewritten: name "Kev Auto Hire", short name "Kev Auto", one phone (0721 569 063, call and WhatsApp), Instagram, `servesCountrywide`. Email, address, hours, map, domain and other socials are empty, and the UI hides them (Contact, footer, privacy, terms, JSON-LD).
- **Their own words are used as confirmed quotes** (emoji and the exclamation mark dropped): "Travel in Comfort. Arrive in Style." (hero), "Your journey, our priority.", "Enjoy comfortable, reliable and hassle-free chauffeur-driven rides with Kev Auto Hire.", "Whether it's airport transfers, corporate travel…", "Wherever you're headed…", "Our chauffeur driven 7-seater vans…", "Book today and let us handle the journey.", "Book your next ride with us today." and the logo's tagline. Everything else is new **draft** copy (About, mission, vision, values, service bodies, steps, requirements, FAQs, micro-copy, 404).
- **Services** reshaped around their posts: Airport Transfers, Chauffeur-Driven Hire, Weddings, Corporate Travel (`/services/corporate-travel`, was VIP & Executive), Family Trips & Road Trips (`/services/family-road-trips`, was Self-Drive).
- Home sections renamed to match: `LuxuryMeetsBusiness` → `BusinessTravel`, `StandOutBand` → `TaglineBand`. The promise strip has their six promises.
- **Booking flow** is chauffeur-only: the self-drive tabs and options are gone, "Return" is now "Until", the pick-up choices are "Pick me up (tell us the area)" or "Airport" (the old office option is gone), the booking purposes are their own occasions, the wedding form no longer offers "wedding glam" decoration or defaults to the old client's car, and Call dials the single number directly (the chooser sheet appears only with two or more numbers).
- Blog: same industry and country, so 5 posts are kept with names and CTAs updated and the old client's own-fleet claims replaced. The "Self-Drive or Chauffeur" post was removed (self-drive is not a confirmed service).
- Metadata, title template, JSON-LD (now with Instagram `sameAs`; no empty email or street), OG image, `package.json` name, compare `localStorage` key, `.env.example` and `.env.local` (`BOOKING_EMAIL_TO` emptied, `OWNER_WHATSAPP_NUMBER=254721569063`; both pointed at the old client before), README, `CLAUDE.md`, `docs/BRIEF.md`, `docs/PROGRESS.md`, `docs/PHASES.md`, `assets/README.md`, the `audit-content` skill and `.claude/settings.json` (two obsolete allow rules removed).
- Unchanged: currency (KES, same as "Ksh"), `lang="en-KE"`, the Data Protection Act, 2019 and ODPC.

### Data
- **Removed IM-001**, the old client's own Prado TX (real, confirmed), and its photo.
- The 28 samples stay samples, with every safeguard intact. Refs were renamed `IM-0xx` → `KA-0xx` (the old prefix was the old client's initials), `driveOptions` set to chauffeur only, and the 9 descriptions that offered self-drive were reworded, along with one summary and one "CBD" reference. `meta` updated.

## Removed (not confirmed for Kev Auto Hire)
Self-drive service, page and tab · 24/7 support · nationwide delivery and delivery fees · office pick-up · wedding glam decoration · the old client's Prado TX fleet, photo and claims · the VIP Events tile and page · two phone numbers' chooser · the email and address shown everywhere.

## Scan exceptions (intentional)
`brand-scan.mjs` with the full `rebrand/old-terms.txt` still reports 17 hits, all for the generic terms "self-drive" and "24/7":
- **Dormant self-drive support in code** (`DriveOption` type, labels, filter, spec row, compare, API check). No vehicle offers self-drive, so nothing renders. It is kept so the option can be switched on by adding `"self-drive"` to a vehicle's `driveOptions` if Kev Auto Hire confirms it.
- **Docs** (`CLAUDE.md`, `docs/BRIEF.md`, `docs/PROGRESS.md`, `README.md`) name self-drive and 24/7 as *unconfirmed* so future work doesn't add them.

Without those two generic terms the scan reports **0 hits**. "Land Cruiser Prado" was dropped from the term list because a sample car (KA-020) is that model.

Tool fix: `brand-scan.mjs` compared paths with `/` and so flagged `brand.ts` itself on Windows; it now normalises backslashes.

## Verification
- `brand-scan.mjs`: 0 old-brand hits (with the exceptions above), 0 stray hex codes.
- `contrast.mjs`: no text pair below AA.
- `npm run lint` clean; `npm run build` passes (58 pages).
- Playwright at 1280×800 and 375×812: Home, a car page (`/fleet/toyota-rav4`) and Contact. No horizontal overflow at 375px. The logo disc, hero swoosh, promise strip, occasions, booking card (chauffeur-only, pick-up area), Contact (one number, Instagram, no empty rows) and footer all render correctly. The only console error is a hydration note caused by Playwright's own screenshot caret style, not by the site.
- `audit-content` grep checks: ratings, superlatives, invented policies, invented facts, ID fields, emoji and exclamation marks: no real hits (only false positives such as Tailwind `leading-*`, "hassle-free", "Preview").

## Open questions for Kev Auto Hire
1. **Logo:** an official vector (SVG or PDF). The current one is 150px, so it can't be shown larger than 75px.
2. **Their vehicles:** models, seat counts, photos and rates. The fleet is currently 100% samples from another company.
3. **Photos** for the home hero, Weddings and About (set `brand.heroImage`).
4. **Email** for bookings (needed for the form emails and the privacy notice), office or base address, hours, domain, Facebook and TikTok.
5. **Self-drive:** offered or not?
6. Airports served and how pickups and delays work; wedding extras; requirements; what rates include; payment methods.
7. **Copy to confirm:** all draft copy (About, mission, vision, values, services, steps, FAQs, the 5 blog posts and their dates).
8. **Demo safeguards:** the old build deliberately kept the site indexable, with no site-wide notice and noindex only on sample car pages. Now that every car is a sample, consider a site-wide notice and site-wide noindex, or keep the preview link private, until the real fleet is in.
9. Vehicle classes: the five luxury classes suit the sample cars; Kev Auto Hire's 7-seaters may need different ones.

## Deploy as a new Vercel project
1. This folder now has its own git repository (`master` holds the pre-rebrand snapshot; the rebrand is on `rebrand/kev-auto-hire`). Merge or keep the branch, then create a **new** GitHub repository and push to it. Never push to the old client's repository.
2. Vercel → Add New → Project → import the new repository (Next.js is detected).
3. Environment variables: `NEXT_PUBLIC_DEMO_MODE=true`, `NEXT_PUBLIC_SHOW_DRAFT_FLAGS=true`, and later `RESEND_API_KEY`, `BOOKING_EMAIL_TO`, `BOOKING_FROM_EMAIL` (sender on a verified domain), optionally the WhatsApp alert variables with `OWNER_WHATSAPP_NUMBER=254721569063`.
4. Deploy. Check the favicon and link preview in a private window (browsers cache favicons).
5. When a domain is chosen: add it in Vercel and set `siteUrl` in `src/config/brand.ts`.

Not touched: `imtalii-claude-code-kit.zip` and `rebrand-dropin(1).zip` in the project root (git-ignored, the old client's build kit and the rebrand kit). Delete them yourself if you no longer need them.
