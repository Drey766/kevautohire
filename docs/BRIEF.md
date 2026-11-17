# PROJECT BRIEF — Chauffeur-Driven Car Hire Website
## For: Kev Auto Hire (Nairobi, Kenya)

> Spec for Claude Code. Always-loaded rules: `CLAUDE.md`. Progress log: `docs/PROGRESS.md`. Rebrand record: `rebrand/REPORT.md`. If anything here conflicts with CLAUDE.md's guardrails, **the guardrails win**.

**Kev Auto Hire** ("Kev Auto") offers **chauffeur-driven car hire with premium 7-seaters** from Nairobi, serving **Nairobi and beyond**, countrywide: **weddings, road trips, airport transfers, corporate travel, family trips and special occasions**. The website must feel **clean, premium and bold**, in the logo's **black and green** with white. Its jobs: show the service and fleet clearly, explain each service, and turn interest into a booking request (WhatsApp, call or form) in under a minute.

**What the client has told us (confirmed):**
- Bio: "Car Rental · Premium 7 Seaters Car Hire · Nairobi & Beyond · Chauffeur-Driven: Weddings, Road Trips, Airport Transfers · Call or WhatsApp: 0721 569 063" (emoji dropped).
- Call, text and WhatsApp: **0721 569 063**. Instagram: **https://www.instagram.com/kev_auto_hire/**.
- They serve clients **countrywide**.
- Their voice (quote faithfully; drop the emoji and exclamation marks):
  > "Your journey, our priority." · "Enjoy comfortable, reliable and hassle-free chauffeur-driven rides with Kev Auto Hire." · "Whether it's airport transfers, corporate travel, family trips or special occasions, we provide professional drivers and quality service to make every journey seamless."
  > "Travel in Comfort. Arrive in Style." · "Wherever you're headed, travel in comfort and style." · "Our chauffeur driven 7-seater vans are perfect for weddings, airport transfers, business trips, and family travel." · "Book today and let us handle the journey." · "Book your next ride with us today."
  > Logo tagline: "Drive Comfort. Arrive in Style."

Unknown, so empty and hidden, or draft: email, office address, map, hours, website domain, licence or registration, other socials, team, founding year, their real vehicles, photos and rates, self-drive, deposit, insurance, mileage, age rules, waiting time, meet-and-greet, wedding decoration, payment methods.

**Source files**
- `assets/logo-original.jpg` (150×150, white background): the client's logo. `public/brand/logo.png` and `logo@2x.png` are the transparent cut-outs; the favicon, Apple icon and share image are made from it by `rebrand/scripts/logo-prep.mjs`.
- `src/data/fleet.json`: **28 sample cars** (KA-002 to KA-029). None is Kev Auto Hire's own vehicle.
- `data-raw/car-notes.json`: source text, **for paraphrasing only**. Git-ignored, never imported.

---

## 1. WHAT MAKES THIS SITE DIFFERENT
- No cart, payment, auth, admin or database. JSON-first. Bookings are **requests** confirmed by Kev Auto Hire.
- **Design** (§5): the logo's black as a night sky with soft green light, crisp white and mist pages for browsing, the logo's green as the accent. Motifs from the logo: the **accent ring** (its round emblem) and the **swoosh** (its sweeping green arc); plus the **arrival line** (airport) and the **ribbon** (weddings).
- **Signature features:**
  1. **Hero booking console** with two tabs: **Chauffeur-Driven · Airport Transfer**.
  2. **Airport Transfer request** with flight details (airport, flight number, date and time, passengers, luggage, area).
  3. **Occasions**: Weddings · Airport Transfers · Corporate Travel · Family Trips & Road Trips, each with their own words, and a **wedding request** (date, venue, number of vehicles, preferred vehicle, timings).
  4. **Fleet** with classes and real filters, **Compare** (up to 3), and car pages with gallery, features, a ringed rate badge and a **live estimate**.
  5. **Their promises as a strip**: Premium 7-Seaters · Chauffeur-Driven · Professional Drivers · Comfortable & Reliable · Hassle-Free · Nairobi & Beyond.
- Pages: Home, Fleet (+ car), Compare, Services (+ detail: Airport Transfers, Chauffeur-Driven Hire, Weddings, Corporate Travel, Family Trips & Road Trips), How It Works, Requirements & FAQs, About, Blog (+ post), Book, Contact, Privacy, Terms, 404.

---

## 2. ⚠️ ACCURACY & FAIRNESS GUARDRAILS (non-negotiable)
1. **Never invent facts about Kev Auto Hire**: no founding year, experience, customer counts, ratings, awards, team, branches, office, partner hotels or airlines, or fleet-size claims. Unknown = empty, and **the UI hides empty things**.
2. **No testimonials, reviews or star ratings.**
3. **No unverifiable superlatives** ("best", "#1", "cheapest", "top-rated", "Kenya's leading"). Their own phrases are allowed.
4. **No invented policies or offers**: deposit, insurance, mileage, fuel, minimum age, cancellation, waiting time, meet-and-greet signage, child seats, decoration, 24/7 availability, delivery. Write general, draft wording ("We'll confirm the details and your quote when you book"). **Never state an amount, percentage, time limit or inclusion.** Confirmed and stateable: chauffeur-driven, professional drivers, 7-seaters, Nairobi and beyond, countrywide.
5. **The fleet is a sample** from another company's public site. With `NEXT_PUBLIC_DEMO_MODE === "true"`: a "Sample" tag on sample cards and pages, noindex on sample car pages, no Product or Offer JSON-LD, no sample cars in the sitemap, and the Terms page explains it. **Never show the source company's name or links.** Descriptions are rewritten and chauffeur-only; features only where clearly correct for the model.
6. **Rates are indicative.** "from KES X / day". Estimates carry `legal.estimateNotice`. Airport transfers are quote on request.
7. **Privacy**: forms email the request or hand off to WhatsApp and store nothing. **Never ask for ID, licence or passport numbers.** Flight numbers are fine. No analytics. Compare lives in `localStorage`. The privacy page cites the **Data Protection Act, 2019** and the **ODPC**.
8. **Drafts flagged**: everything except the confirmed facts → `status: "draft"` → `<DraftBadge />` only when `NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true"`.
9. No emoji and no exclamation marks in UI copy.
10. **Name styling**: "Kev Auto Hire" in copy (`brand.name`), "Kev Auto" as the short name (`brand.shortName`).

---

## 3. BRAND CONFIG — single source of truth
`src/config/brand.ts` holds identity (`name`, `shortName`, `fullName`, `descriptor`), contact (`phones`, `whatsappUrl`, `email` empty, `address` empty, `social.instagram`), `servesCountrywide`, `photos` (Pexels stock stand-ins; empty path = swoosh fallback), `voice` (their words, confirmed), `services`, `occasions`, `nav`, fleet `classes`, `about` (draft), `copy` (draft micro-copy), `legal`, `seo`, `colors` and `fonts`. Edit there, not in components.

---

## 4. IDENTITY & VOICE
**Logo:** a round emblem: a sweeping green arc over a black 7-seater van silhouette, "KEV" in bold black italic caps with a green K stroke, "AUTO HIRE" (HIRE in green), and the tagline "DRIVE COMFORT. ARRIVE IN STYLE." It exists only as a 150px raster, so `<Logo />` shows it at most 75px tall; on dark backgrounds it sits on a white disc. Ask for the vector.

**Voice:** warm, reliable and easy: *comfort, style, journey, seamless, hassle-free, professional*. Short, clear lines ("Your journey, our priority."). Never pushy, never hype.

---

## 5. DESIGN SYSTEM
### Concept
A comfortable, well-kept vehicle waiting in the evening: deep black-green **night** sections lit with soft **green glows**, bright **white and mist** pages for browsing, and the logo's **green** as the accent: rings, hairlines, numerals and the accent button. Clean, premium and bold.

### Colour rules (WCAG-checked with `rebrand/scripts/contrast.mjs`)
| Pairing | Contrast | Use |
|---|---|---|
| Ink on white / mist | 18.28 / 16.68 | headings |
| Body on white / mist | 7.36 / 6.71 | body |
| **Primary on white / mist** | 6.48 / 5.91 | links, eyebrows, prices on light |
| **White on primary** | 6.48 | primary buttons |
| Primary-deep on mist | 7.71 | chips, draft badge |
| White / soft on night | 18.44 / 12.27 | text on dark |
| Soft on night-raised | 10.57 | text on dark panels |
| Accent on night / night-raised | 6.83 / 5.88 | eyebrows, numerals, rings and small text on dark |
| Night on accent | 6.83 | accent button (on dark) |
| accentText on white | 4.64 | the only accent-coloured text allowed on light |
| ❌ **Accent on white / mist** (2.7) | | **never as text**; on light, accent is only hairlines, the ribbon and rings |
| ❌ **Primary on night** (2.8) | | never text on dark; use soft or accent |

### Typography
- **Marcellus** (display): headlines, car names and section titles.
- **Outfit** (body/UI, 300–600), tabular numerals for rates.
- Eyebrows: Outfit 500, uppercase, tracking 0.24em.

### Motifs
1. **Accent ring** `<AccentRing />` (the logo's round emblem): thin double circles framing numerals, service icons, the rate badge and promise icons; a slow dashed ring as the loader.
2. **Swoosh** `<Swoosh />` (the logo's green arc): a large gradient sweep with a fine lower arc, the fallback backdrop for the hero, service heroes, the Weddings tile and the About panel when a photo path is empty.
3. **Arrival line** `<ArrivalLine />`: a fine dashed path with a tiny plane, for airport content and the How It Works stepper; draws in on scroll.
4. **Ribbon** `<Ribbon />`: a soft double curve, the divider on Weddings, Occasions and About.
5. **Green glow** `<Glow />`: radial primary and soft gradients on night.
6. **Frosted glass panels** for the booking console.

### Components (`globals.css`)
`.btn-primary` · `.btn-accent` (accent bg, night text, **on dark only**) · `.btn-ghost` · `.eyebrow` · `.display` · `.rate-badge` · `.card-car` · `.panel-glass` · `.logo-disc` · `.accent-ring` · `.section` · `.container-site` · `.input` / `.label` · `.prose-blog` · `.tag-sample` · `.tag-own` · `.badge-draft`. Radius 16px for cards, pill buttons. Shadows tinted from tokens, on hover only.

### Motion
Hero headline rises in; the arrival line draws on scroll; rings rotate slowly; cards lift 4px; the compare tray glides up. **All off under `prefers-reduced-motion`.** The hero photo (`brand.photos.hero`) has a slow Ken Burns zoom.

### Imagery
- No photos of Kev Auto Hire's own vehicles yet. The hero, Occasions tiles, service pages, About panel and blog covers use **Pexels stock photos** (`public/photos/`, set in `brand.photos`, credits in `docs/PHOTOS.md`) as decorative images (`alt=""`), never labelled as the company's fleet. With a path set to `""` the spot falls back to the swoosh and glow.
- Sample car photos load from the sample host (demo only; the only host in `images.remotePatterns`). `<SmartImage />` falls back to a night panel with the logo in an accent ring.

---

## 6. PERSONALITY MANDATE
1. **Hero**: night with the hero photo (stock for now, theirs once provided; swoosh if none), the eyebrow "Premium 7-seater car hire · Nairobi & beyond", **"Travel in comfort. Arrive in style."** in large Marcellus, `voice.enjoy` as the subhead, the **frosted booking console** (Chauffeur-Driven · Airport Transfer), and the promise strip beneath.
2. **Occasions**: four asymmetric tiles (Weddings, Airport Transfers, Corporate Travel, Family Trips & Road Trips) under "Your journey, our priority.", each with their own words where they exist.
3. **Promise strip**: their six promises as accent-ringed icon chips on night.
4. **Airport and corporate travel** split section with the arrival line.
5. **Tagline band**: "Drive Comfort. Arrive in Style." large on night.
6. Rhythm: alternate white, mist and night-glow sections. Never three similar in a row.
7. Details: the ringed rate badge, Marcellus car names, custom date and time inputs, a soft focus ring on dark and primary on light, a 404 that says "This road doesn't go anywhere. Let us get you back on the journey."
8. No default-Tailwind look: no generic three-icon cards on grey, no harsh shadows.

---

## 7. MOBILE-FIRST & CONTACT-FIRST
- Mobile first; check every page at **375px**.
- **Sticky mobile bar**: Call · WhatsApp · Fleet · Book (on car pages, "Book this car"), each ≥ 48px, on frosted night. With one number, Call dials directly; with two or more, it opens a chooser sheet.
- WhatsApp prefills: general ("Hello Kev Auto Hire, I'd like to book a ride."); per car; airport; wedding. **No phone or email in prefills.**
- Navbar: logo · Fleet · Services · Weddings · How It Works · About · Blog · Contact · Compare (count) · "Request a Booking". Transparent over the hero, white with blur after scroll.

---

## 8. PAGES
- **Home**: Hero → promise strip → occasions → featured vehicles rail → browse by class → "Three ways to ride" (Chauffeur-Driven Hire, Airport Transfers, Family Trips & Road Trips) → airport and corporate travel → how it works (preview) → tagline band → blog preview → final CTA ("Book your next ride with us today.").
- **Fleet** (`/fleet` + `/fleet/[slug]`): classes Premium Comfort · Executive · VIP Flagship · Luxury SUV · Safari & 4x4; URL-synced filters (Class, Brand, Body, Seats, Rate, Sort; Drive appears only when the fleet offers more than one way to ride); car pages with gallery, specs, description, features, "Ideal for", booking card (chauffeur-driven; pick-up area or airport; live estimate) and similar cars.
- **Compare** (`/compare`): up to 3 cars, `localStorage`.
- **Services**: `airport-transfers` (airport form), `chauffeur-services` (Chauffeur-Driven Hire, booking form), `weddings` (wedding form), `corporate-travel` (booking form, purpose preset), `family-road-trips` (booking form, purpose preset). Names confirmed from their posts; body copy draft. Mention "Nairobi and beyond / countrywide" where relevant.
- **How It Works**: stepper (draft): choose → request → we confirm availability and quote → we pick you up → enjoy the ride → arrive in style. Plus "Chauffeur-driven, every time" with what to tell us, and the airport flow.
- **Requirements & FAQs**: what to have ready per service (draft) and 10 FAQs (draft). No amounts or time limits.
- **About**: who we are, mission, vision, values (all draft), the promise strip, CTA. Team and experience only if provided.
- **Blog**: 5 posts (draft), categories Airport & Business Travel · Weddings & Events · Choosing a Car · Road Trips. `Article` JSON-LD.
- **Book** (`/book`): tabs Chauffeur-Driven · Airport · Wedding, pre-filled from `?car=&service=&from=&to=`.
- **Contact**: phone (call and WhatsApp), Instagram; email, address and map only when set; a general form; a FAQ teaser.
- **Privacy**, **Terms** (draft), custom 404, `sitemap.ts`, `robots.ts`.
- Footer: night with glow, logo on a disc, the tagline, promises, nav, phone, WhatsApp, "Nairobi & Beyond", Instagram, `legal.rateNote`, legal links.

---

## 9. ESTIMATES & DATES (`src/lib/booking.ts`)
`rentalDays(from, to)` rounded **up**, minimum 1 ("Part days count as a full day in estimates; final terms confirmed by Kev Auto Hire"). `estimate = dailyRateKes × days` + `legal.estimateNotice`. No estimate for airport transfers ("Quote on request"). No past pick-ups (Africa/Nairobi), end after pick-up.

## 10. FORMS & `/api/booking`
`kind: "booking" | "airport" | "wedding" | "general"`.
- **Booking**: car*, service (chauffeur), pick-up date and time*, until*, pick-up (my area* / airport), purpose (Corporate travel, Wedding, Family trip, Road trip, Special occasion, Other), passengers, name*, phone*, email, notes (≤ 500), consent.
- **Airport**: direction*, airport* (JKIA / Wilson Airport / Other), flight number (pickups), date and time*, passengers*, bags, area*, preferred class or car, name*, phone*, email, notes, consent.
- **Wedding**: date*, venue or area*, number of vehicles* (1–10), preferred vehicle, timing notes, name*, phone*, email, consent.
- **General**: name*, phone*, email, message (≤ 600), consent.
- zod, honeypot, minimum time-to-submit, best-effort rate limit, Resend email, `ok: false` fallback with WhatsApp and the phone number. **Never store or log bodies or personal data.** Never show success unless the email really sent.

## 11. SEO, A11Y, PERFORMANCE
Metadata per page (`%s | Kev Auto Hire Nairobi`), `lang="en-KE"`, OG image from the logo, `AutoRental` JSON-LD (name, telephone, Nairobi, KE, `areaServed: "Kenya"`, `sameAs` Instagram; email, street and hours only when set). WCAG AA; labelled inputs; keyboard-usable tabs, filters and sheets; reduced motion; `next/image` with `sizes`; fonts via `next/font`; `lucide-react`.

## 12. DATA
- `src/data/fleet.json`: `meta` (KES, per day, count 28, source note) and `cars` (ref `KA-0xx`, slug, name, brand, model, class, bodyType, seats, `driveOptions: ["chauffeur"]`, dailyRateKes, rateOnRequest, images, summary, description, features, idealFor, featured, `sample: true`, `contentStatus: "sample"`). Kev Auto Hire's real vehicles go in with `sample: false`, `contentStatus: "confirmed"` and photos in `public/fleet/<ref>/`.
- `services.json` (5), `steps.json` (6), `requirements.json` (4 groups), `faqs.json` (10), `blog.json` (5): all draft.
- Types in `src/types/index.ts`.

## 13. TECHNICAL RULES
- Next.js App Router; follow `AGENTS.md`; `params` is async. CSS variables from `brand.colors` → Tailwind theme (`@theme inline`). **No hex codes outside `brand.ts`**.
- `"use client"` only where needed; `useSearchParams` inside `<Suspense>`; `localStorage` in effects with try/catch; `generateStaticParams` + `notFound()`.
- Dependencies: `zod`, `resend`, `lucide-react`; dev `sharp` (logo and icon preparation).

## 14. ENVIRONMENT (`.env.example`)
```env
RESEND_API_KEY=
BOOKING_EMAIL_TO=
BOOKING_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_SHOW_DRAFT_FLAGS=true
WHATSAPP_API_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_TEMPLATE_NAME=
OWNER_WHATSAPP_NUMBER=254721569063
```
