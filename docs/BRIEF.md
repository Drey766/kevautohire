# PROJECT BRIEF — Luxury Car Rental Website
## For: iMtalii Car Rentals (Nairobi CBD, Kenya)

> Full spec for Claude Code. Always-loaded rules: `CLAUDE.md`. Build order: `docs/PHASES.md`. Progress log: `docs/PROGRESS.md`. If anything here conflicts with CLAUDE.md's guardrails, **the guardrails win**.

**iMtalii Car Rentals** rents **luxury cars for airport transfers, chauffeur services and self-drive**, from Nairobi CBD. Their signature is a **Land Cruiser Prado TX fleet for weddings, VIP events and executive transfers**. The website must feel **luxurious, posh, premium and clean**, in their **royal purple, lavender and white**, with the logo's gold as a precious accent. Its jobs are to make every visitor feel they're arriving somewhere special, show the fleet with real filters, explain each service clearly, and turn interest into a booking request (WhatsApp, call or form) in under a minute.

**What the client has told us (confirmed):**
- Bio: "Luxury cars for airport transfers, chauffeur services, and self-drive. Ride in style from Nairobi CBD. Bruce House Standard Street, Moi, Nairobi Area, Kenya 00200."
- Address: **Bruce House, Standard Street, Nairobi CBD** (P.O. code 00200).
- Call/WhatsApp: **+254 721 621 888** and **0737 963 950** (both numbers, both channels).
- Email: **imtaliiofficial@gmail.com** (from their post).
- Fleet: **Luxury Land Cruiser Prado TX fleet for weddings, VIP events and executive transfers**. Wedding cars are "dressed in wedding glam".
- Repeated promises in every post: **Luxury & Comfort · Ready for Any Terrain · 24/7 support · Premium Fleet · Chauffeur Services · Executive Comfort · Nationwide delivery available.**
- Their voice (quote faithfully; drop the emoji):
  > "Unforgettable Moments Deserve Flawless Rides." · "Arrive with Prestige. Ride with Imtalii." · "Make your grand entrance unforgettable. The journey starts with us."
  > "Where Luxury Meets Business. Seal every deal in style with Imtalii." · "Whether it's an airport pickup, high-stakes meeting, or executive transfer: arrive composed, ride in comfort, and leave an impression that lasts."
  > "Elegance in Every Arrival." · "Make your big day unforgettable with Imtalii's luxury fleet dressed in wedding glam. Arrive in style, leave in memories."
  > "Why blend in when you were born to stand out?" · "It's more than just a ride. It's an experience of elegance, power, and prestige." · "Whether it's for a weekend escape, a business meeting, or just because you deserve it, rent the car that turns heads." · "Luxury is no longer a dream. It's a drive away."
  > "Book now · Drive premium · Arrive iconic."

Unknown, so empty and hidden, or draft: hours (beyond "24/7 support"), socials, team, founding year, the real fleet beyond the Prado TX, rates, deposit, insurance, mileage, age rules, delivery fees, meet-and-greet details, wedding decoration options and pricing.

**Source files**
- `assets/imtalii-logo.svg`: the logo **traced** from the 150px original (gold gradient "imtalii" with the ring emblem redrawn, and "CAR RENTALS"). Colours via `--logo-gold-from`, `--logo-gold-to` and `--logo-tagline`. `assets/logo-original.jpg` and `assets/post-reference.png` are the originals.
- `assets/own-photos/prado-wedding-convoy.jpg`: **iMtalii's own** wedding convoy image, cropped from their post. It's the hero and weddings image and IM-001's photo.
- `src/data/fleet.json`: **29 cars**. IM-001 (their Prado TX) is confirmed; IM-002 to IM-029 are samples (§12).
- `data-raw/car-notes.json`: source text and feature lists, **for paraphrasing only**. Git-ignored, never imported.
- Run `node scripts/prepare-assets.mjs`.

---

## 1. WHAT MAKES THIS SITE DIFFERENT
- No cart, payment, auth, admin or database. JSON-first. Bookings are **requests** confirmed by iMtalii.
- **Design "Grand Arrival"** (§5): a deep aubergine night, royal purple, lavender light and crisp white, with the logo's gold used sparingly like jewellery. Motifs come from the brand: the **gold ring** (logo emblem), the **arrival line** (the flight path from their post), the **ribbon** (wedding cars) and **lavender glow** (their post skies).
- **Signature features:**
  1. **Hero booking console** with three service tabs: **Self-Drive · Chauffeur · Airport Transfer**, each with the right fields.
  2. **Airport Transfer request** with flight details (airport, flight number, arrival or departure time, passengers, luggage, destination).
  3. **Occasions**: Weddings · VIP Events · Business & Executive · Weekend Escapes, each built from their own posts, with a **wedding request** (date, venue, number of cars, wedding glam yes/no).
  4. **Fleet** with five luxury classes and real filters, **Compare** (up to 3), and car pages with gallery, features, a gold-ring rate badge and a **live estimate**.
  5. **Their promises as a signature strip**: 24/7 support · Nationwide delivery · Premium fleet · Chauffeur services · Ready for any terrain.
- Pages: Home, Fleet (+ car), Compare, Services (+ detail: Airport Transfers, Chauffeur Services, Self-Drive, Weddings, VIP & Executive), Occasions (on Home and in Services), How It Works, Requirements & FAQs, About, Blog (+ post), Book, Contact, Privacy, Terms, 404.

---

## 2. ⚠️ ACCURACY & FAIRNESS GUARDRAILS (non-negotiable)
1. **Never invent facts about iMtalii**: no founding year, experience, customer counts, ratings, awards, team, branches, partner hotels or airlines, celebrity clients, or fleet-size claims. Unknown = empty, and **the UI hides empty things**.
2. **No testimonials, reviews or star ratings.** (The source data had ratings like "4.6/5 from 80 reviews". Never use them.)
3. **No unverifiable superlatives** ("best", "#1", "cheapest", "top-rated", "Kenya's leading"). Their own phrases are allowed: "Premium Fleet", "Executive Comfort", "Arrive with Prestige", "Luxury & Comfort".
4. **No invented policies or offers**: deposit, insurance, mileage, fuel, minimum age, cancellation, delivery fees, meet-and-greet signage, waiting time, child seats, decoration options or prices, airport parking. Write general, draft wording ("We'll confirm the details and your quote when you book"). **Never state an amount, percentage, time limit or inclusion.** "24/7 support" and "nationwide delivery" are confirmed and can be stated plainly; the details (fees, areas) are not.
5. **The fleet beyond the Prado TX is a sample** from another company's public site. With `NEXT_PUBLIC_DEMO_MODE === "true"`: a slim site-wide notice ("Preview site. Except for our Prado TX fleet, cars, photos and rates shown are illustrative samples."), a "Sample" tag on sample cards and pages, an "iMtalii Fleet" tag on IM-001, **noindex everywhere**, robots disallow, no Product or Offer JSON-LD, and no sample cars in the sitemap. **Never show the source company's name or links.** **Rewrite every description in your own words** (§12). The source **feature lists are unreliable** (for example "xDrive" and "Harman Kardon" listed on an Audi): keep only features that are clearly correct for that model, otherwise leave them out.
6. **Rates are indicative.** Show "from KES X / day". IM-001 shows "Rate on request". Estimates carry `legal.estimateNotice`.
7. **Privacy**: forms email the request or hand off to WhatsApp and store nothing. **Never ask for ID, licence or passport numbers.** Flight numbers are fine (needed for transfers). No analytics. Compare lives in `localStorage`. The privacy page cites the **Data Protection Act, 2019** and the **ODPC**.
8. **Drafts flagged**: everything except the confirmed facts → `status: "draft"` → `<DraftBadge />` only when `NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true"`.
9. No emoji and no exclamation marks in UI copy.
10. **Name styling**: the logo reads "imtalii", their posts say "Imtalii", and we use **"iMtalii"** in copy (`brand.name`). The README asks them to confirm.

---

## 3. BRAND CONFIG — single source of truth
```typescript
// src/config/brand.ts
// =====================================================
// BRAND CONFIGURATION — SINGLE SOURCE OF TRUTH
// Edit ONLY this file for company details, contact info, colours,
// fonts or fixed wording. Empty = not provided → hidden.
// =====================================================
export const brand = {
  name: "iMtalii",
  fullName: "iMtalii Car Rentals",
  descriptor: "Luxury Car Rentals",
  city: "Nairobi",
  country: "Kenya",
  foundedYear: null as number | null,

  phones: [
    { display: "+254 721 621 888", href: "tel:+254721621888", whatsapp: "254721621888" },
    { display: "0737 963 950", href: "tel:+254737963950", whatsapp: "254737963950" },
  ],
  whatsappUrl: "https://wa.me/254721621888",
  email: "imtaliiofficial@gmail.com",
  address: { building: "Bruce House", street: "Standard Street", area: "Nairobi CBD", postalCode: "00200", country: "Kenya" },
  hours: "",                     // only "24/7 support" is confirmed
  support247: true,
  nationwideDelivery: true,
  mapUrl: "",
  social: { instagram: "", facebook: "", tiktok: "", x: "" },

  // ── CLIENT'S OWN WORDS (confirmed) ──
  voice: {
    unforgettable: "Unforgettable Moments Deserve Flawless Rides",
    prestige: "Arrive with Prestige. Ride with iMtalii.",
    grandEntrance: "Make your grand entrance unforgettable. The journey starts with us.",
    business: "Where Luxury Meets Business.",
    sealTheDeal: "Seal every deal in style with iMtalii.",
    composed: "Arrive composed, ride in comfort, and leave an impression that lasts.",
    elegance: "Elegance in Every Arrival",
    weddingGlam: "Make your big day unforgettable with iMtalii's luxury fleet dressed in wedding glam. Arrive in style, leave in memories.",
    standOut: "Why blend in when you were born to stand out?",
    experience: "It's more than just a ride. It's an experience of elegance, power, and prestige.",
    driveAway: "Luxury is no longer a dream. It's a drive away.",
    trio: ["Book now", "Drive premium", "Arrive iconic"],
    promises: ["Luxury & Comfort", "Ready for Any Terrain", "24/7 Support", "Premium Fleet", "Chauffeur Services", "Executive Comfort", "Nationwide Delivery"],
  },
  services: ["Airport Transfers", "Chauffeur Services", "Self-Drive"],   // confirmed core
  occasions: ["Weddings", "VIP Events", "Executive Transfers", "Business Meetings", "Weekend Escapes"], // from their posts

  // ── MICRO-COPY (draft) ──
  copy: {
    heroEyebrow: "Luxury car rentals · Nairobi CBD",
    heroHeadline: "Arrive with prestige.",
    heroSubtext: "Luxury cars for airport transfers, chauffeur services and self-drive, with 24/7 support and nationwide delivery.",
    bookCta: "Request a Booking",
    fleetCta: "Explore the Fleet",
    whatsappCta: "Book on WhatsApp",
    callCta: "Call Us",
    whatsappPrefill: "Hello iMtalii, I'd like to book a ride.",
    formSuccess: "Request received. We'll confirm availability and your quote shortly.",
    formFallback: "We couldn't send your request online just now. Please book on WhatsApp or call us. We're available 24/7.",
    demoNotice: "Preview site. Except for our Prado TX fleet, cars, photos and rates shown are illustrative samples.",
  },

  legal: {
    estimateNotice: "Indicative estimate. Your final quote, including any delivery or chauffeur arrangements, is confirmed by iMtalii when you book.",
    rateNote: "Rates shown are per day and indicative. Availability is confirmed at booking.",
    formNotice: "No ID or licence numbers needed here. We'll take care of the details when we confirm your booking.",
    articleNotice: "General information only. Requirements change; check with iMtalii or the relevant authority before you travel.",
    privacyLaw: "Data Protection Act, 2019",
    privacyRegulator: "Office of the Data Protection Commissioner (ODPC)",
  },

  colors: {
    purple: "#6A00BC",         // brand purple (their Book Now button): primary buttons (white text), links on light
    purpleDeep: "#4E008C",     // hover/pressed
    aubergine: "#1A0B2E",      // deep night sections, footer, hero overlay
    aubergineRaised: "#2E1450",// cards/panels on dark
    lavender: "#C9B6EC",       // text and accents on dark (10:1 on aubergine), soft highlight fills on light
    lavenderMist: "#EEE8F8",   // light section background (their post panels)
    white: "#FFFFFF",
    ink: "#120A1F",            // headings on light
    slate: "#5B5468",          // body text on light (7.2:1 on white, 6.0:1 on lavenderMist)
    line: "#E6E0F0",
    gold: "#E0A84A",           // logo gold, solid: rings, hairlines, numerals and small text ON DARK only
    goldFrom: "#D0802F",       // logo gradient start
    goldTo: "#F7C35F",         // logo gradient end
  },
  fonts: { display: "Marcellus", body: "Outfit" },
} as const;
export type Brand = typeof brand;
```

---

## 4. IDENTITY & VOICE
**Logo:** a rounded, friendly lowercase "imtalii" in a warm **orange-to-gold gradient**, with the dot of the "i" replaced by a **gold ring emblem**, and "CAR RENTALS" in clean caps below. Build `<Logo variant="full|wordmark|emblem" tone="dark|light" />` by inlining the SVG: on dark, the tagline is white; on light, the tagline is `ink` or `purple` (the gold wordmark stays). Show it at 40–52px tall in the navbar.

**Voice:** polished, warm and aspirational: *prestige, elegance, composure, arrival, impression*. Short, confident lines (their own style: "Book now · Drive premium · Arrive iconic"). Never pushy, never hype.

---

## 5. DESIGN SYSTEM — "Grand Arrival"
### Concept
The moment a beautiful car pulls up at night. Deep **aubergine** sections lit with **purple and lavender glows** (their posts' skies), bright **white and lavender-mist** pages for browsing, and the logo's **gold** used sparingly like jewellery: rings, hairlines and numerals. It should feel like a five-star hotel concierge, calm and precise.

### Colour rules (WCAG-checked)
| Pairing | Contrast | Use |
|---|---|---|
| Ink on white / lavenderMist | 19.3 / 17.3 | headings |
| Slate on white / lavenderMist | 7.21 / 6.02 | body |
| **Purple on white / lavenderMist** | 8.98 / 7.50 | links, eyebrows, prices on light |
| **White on purple** | 8.98 | primary buttons |
| Purple on lavender | 4.87 | soft badges and highlight chips (≥ 14px semibold) |
| White / lavender on aubergine | 18.6 / 10.06 | text on dark |
| Gold on aubergine | 8.72 | small gold text, numerals and rings on dark |
| Gold on purple | 4.22 | large text (≥ 24px) and decorative only |
| ❌ **Gold on white / lavenderMist** (2.13 / 1.91) | | **never as text**. On light, gold is only hairlines and the ring motif |
| ❌ **Purple on aubergine** (2.07) | | never text on dark; use lavender instead |

### Typography
- **Marcellus** (display; classical, engraved caps feel, luxurious with the rounded logo): headlines, car names and section titles. Generous tracking on all-caps eyebrows.
- **Outfit** (body/UI, 300–600; geometric and rounded, echoing the logo and post typography), with tabular numerals for rates.
- Eyebrows: Outfit 500, uppercase, tracking 0.24em.

### Motifs
1. **Gold ring** `<GoldRing />` (from the logo emblem): thin circles framing numerals (01, 02…), service icons, the rate badge on car pages and the 24/7 badge, plus a slow-rotating dashed ring as the loader.
2. **Arrival line** `<ArrivalLine />` (from the plane in their post): a fine dashed path with a tiny plane icon, used on the Airport Transfers section and page and the How It Works stepper. It draws itself in on scroll.
3. **Ribbon** `<Ribbon />` (the wedding cars): a soft curved line in lavender or gold used as the divider on Weddings and Occasions.
4. **Lavender glow**: radial purple and lavender gradients on aubergine (hero, CTA bands), like their post skies.
5. **Frosted glass panels** (backdrop blur on aubergine at 60%) for the booking console and floating cards.

### Components (`globals.css`)
`.btn-primary` (purple bg, white text) · `.btn-gold` (gold bg, aubergine text, **on dark only**) · `.btn-ghost` (white or lavender outline on dark; purple outline on light) · `.eyebrow` · `.display` · `.rate-badge` (gold ring + "KES 30,000 / day") · `.card-car` · `.panel-glass` · `.section` · `.container-site` (max-w-7xl) · `.input` / `.label` (min-h 48px, purple focus ring) · `.prose-blog` · `.tag-sample` · `.tag-own` · `.badge-draft`. Radius: 16px for cards, pill buttons. Shadows: soft purple-tinted (`rgba` from tokens), on hover only.

### Motion
Hero: their convoy image with a slow Ken Burns zoom (1 → 1.06) under the aubergine gradient, and the headline rising in. The arrival line draws on scroll. Gold rings rotate slowly. Cards lift 4px with the image scaling 1.04. The compare tray glides up. CSS plus a small `useReveal` hook; **all off under `prefers-reduced-motion`**. No animation or carousel libraries.

### Imagery
- **iMtalii's own photo** (`/fleet/im-001/prado-wedding-convoy.jpg`) leads the hero, Weddings and IM-001. It's already purple-toned, which suits the palette.
- Sample car photos load from `luxurycarhire.co.ke` (demo only; add only that host to `images.remotePatterns`), shown on a white or lavender-mist stage. `<SmartImage />` falls back to an aubergine panel with the gold ring and emblem.
- No stock clichés. The README photography wishlist asks for more of their own shots.

---

## 6. PERSONALITY MANDATE (required; Phase 9 checks it)
1. **Hero**: the convoy photo with aubergine and purple glow overlay, the eyebrow, **"Arrive with prestige."** in large Marcellus, `voice.unforgettable` as the subhead, the **frosted booking console** with the Self-Drive · Chauffeur · Airport Transfer tabs, and the promise strip beneath.
2. **Occasions**: four large, asymmetric tiles (Weddings with their photo, VIP Events, Business & Executive, Weekend Escapes), each with their own line (`voice.weddingGlam`, `voice.business`, `voice.standOut`…).
3. **Promise strip**: their seven promises as gold-ringed icon chips on aubergine.
4. **"Where luxury meets business"** split section for executive and airport clients, with the arrival line.
5. Rhythm: alternate white, lavenderMist and aubergine-glow sections. Never three similar in a row.
6. Details: the gold-ring rate badge, Marcellus car names, custom date and time inputs, a lavender focus ring on dark and purple on light, a 404 that says "This road isn't on our route. Let's get you back in style."
7. No default-Tailwind look: no generic three-icon cards on grey, no harsh shadows.

---

## 7. MOBILE-FIRST & CONTACT-FIRST
- Mobile first; check every page at **375px**.
- **Sticky mobile bar**: Call · WhatsApp · Fleet · Book (on car pages, "Book this car"), each ≥ 48px, on frosted aubergine. "Call" opens a sheet to choose between the two numbers.
- WhatsApp prefills: general; per car ("Hello iMtalii, I'd like the BMW X5 (IM-024) from 12 Dec 09:00 to 15 Dec 18:00, chauffeur-driven."); airport ("Airport pickup: KQ 101, JKIA, 12 Dec 06:30, 2 passengers, 3 bags, to Westlands."); wedding ("Wedding on 20 Dec, 3 cars, wedding glam."). **No phone or email in prefills.**
- Navbar: logo · Fleet · Services · Weddings · How It Works · About · Blog · Contact · Compare (count) · "Request a Booking" (purple; gold-outlined on the dark hero). Transparent over the hero, white with blur after scroll.

---

## 8. PAGES
### Home
Hero (§6.1) → promise strip → occasions (§6.2) → featured fleet rail (IM-001 first) → browse by class (5 tiles, each with "from KES X/day" and a count) → services (Airport Transfers, Chauffeur Services, Self-Drive) with gold-ring numerals → "Where luxury meets business" (§6.4) → how it works (preview) → `voice.standOut` band with `voice.driveAway` → blog preview → final CTA ("Book now · Drive premium · Arrive iconic") with Call (both numbers) and WhatsApp.

### Fleet (`/fleet` + `/fleet/[slug]`)
- **Classes**: Premium Comfort · Executive · VIP Flagship · Luxury SUV · Safari & 4x4.
- **Filters** (URL-synced, inside `<Suspense>`, debounced): Class · Brand (counts) · Body (Sedan, SUV) · Seats · Drive (Self-drive available, Chauffeur) · Daily rate range · Sort (Recommended, Rate ↑, Rate ↓). A mobile bottom sheet. Estimates on cards when dates come from the hero.
- **Car card**: image on a lavender-mist stage, Sample or iMtalii Fleet tag, class eyebrow, Marcellus name, spec icons, rate (or "Rate on request"), Details, + Compare.
- **Car page**: gallery (3 images where available) with lightbox; name; class; rate badge; specs; description; features (curated); "Ideal for" chips; the **booking card** (service tab Self-drive or Chauffeur where offered; dates and times; pick-up: Bruce House office / Deliver to me (area) / Airport; live estimate; Request booking / WhatsApp); similar cars. IM-001 shows "Rate on request" and links to Weddings and VIP.

### Compare (`/compare`)
Up to 3 cars, a spec and feature table with differences highlighted, rates, and Request buttons. State in `localStorage` (try/catch).

### Services (`/services` + `/services/[slug]`)
| slug | Title | status | Form |
|---|---|---|---|
| `airport-transfers` | Airport Transfers | **confirmed** service | Airport form (§10) |
| `chauffeur-services` | Chauffeur Services | **confirmed** | Booking form, chauffeur preset |
| `self-drive` | Self-Drive Hire | **confirmed** | Booking form, self-drive preset |
| `weddings` | Weddings | **confirmed** (their post) | Wedding form (§10) |
| `vip-executive` | VIP Events & Executive Transfers | **confirmed** (their posts) | Booking form, purpose preset |
Each detail page: hero (with their convoy photo for Weddings and VIP), their quoted line, what's involved (draft, general), suitable classes, how it works, FAQs, and its form. Mention **24/7 support** and **nationwide delivery** where relevant (confirmed), without fees or areas.

### How It Works (`/how-it-works`)
Stepper on the arrival line (draft): **Choose your car or service → Send your request → We confirm availability and your quote → Delivery or pick-up (Bruce House, delivery, or airport) → Enjoy the ride, with 24/7 support → Return or drop-off.** Plus self-drive vs chauffeur, "What to bring" (general: valid driving licence and ID or passport for self-drive; confirmed at booking), and the airport-transfer flow. No amounts or time limits.

### Requirements & FAQs (`/requirements`)
General requirements (draft) and 10 FAQs (draft): booking; self-drive vs chauffeur; airport pickups (flight details; delays handled by contacting us; no promised waiting time); weddings (wedding glam is available; details on request); nationwide delivery (available; fees and areas confirmed when you book); 24/7 support; what's included in the rate (confirmed in your quote); payment (confirmed at booking; no methods invented); extending a rental; travelling upcountry or off-road ("Ready for any terrain" fleet; specifics confirmed per car).

### About (`/about`)
Who we are (draft, from the bio and posts: a Nairobi CBD luxury car rental at Bruce House, Standard Street, offering airport transfers, chauffeur services and self-drive, known for a Prado TX fleet for weddings, VIP events and executive transfers) · Mission (draft: "To make every arrival flawless, with premium cars, composed chauffeurs and support around the clock.") · Vision (draft: "To be Nairobi's name for arriving in style.", which is not a superlative claim) · Values (draft): Prestige · Comfort · Reliability · Discretion · the promise strip · Experience and team **only if provided** · CTA.

### Blog (`/blog` + `/blog/[slug]`), Book (`/book`), Contact (`/contact`), Privacy, Terms, 404
- Blog categories: Airport & Business Travel · Weddings & Events · Choosing a Car · Road Trips. `Article` JSON-LD.
- `/book`: a standalone form with service tabs (Self-Drive · Chauffeur · Airport · Wedding), pre-filled from `?car=&service=&from=&to=`.
- `/contact`: both numbers (call and WhatsApp), email, Bruce House address (map only if `mapUrl` is set), the 24/7 support note, a general form, a FAQ teaser.
- `/privacy` (draft; DPA 2019 and ODPC), `/terms` (draft: rates indicative, bookings are requests, samples illustrative in demo mode), custom 404, `sitemap.ts` (no sample cars in demo mode; IM-001 allowed), `robots.ts` (disallow in demo mode).
- Footer: aubergine with lavender glow, logo, promise line, nav, both numbers, email, address, `legal.rateNote`, legal links.

---

## 9. ESTIMATES & DATES (`src/lib/booking.ts`)
`rentalDays(from, to)`: rounded **up**, minimum 1, with a small-print rule ("Part days count as a full day in estimates; final terms confirmed by iMtalii"). `estimate = dailyRateKes × days`, shown as "3 days × KES 30,000 = **KES 90,000**" + `legal.estimateNotice`. No estimate for IM-001 or airport transfers ("Quote on request"). Validation: no past pick-ups (Africa/Nairobi), return after pick-up. `formatKes`.

---

## 10. FORMS & `/api/booking`
`kind: "booking" | "airport" | "wedding" | "general"`.
- **Booking**: car*, service (self-drive or chauffeur, as the car allows), pick-up date and time*, return date and time*, pick-up (Bruce House office / Deliver to me: area / Airport), purpose (optional: Business, Wedding, VIP event, Weekend escape, Other), passengers, name*, phone*, email, notes (≤ 500), consent. Live estimate.
- **Airport**: direction (Pickup from airport / Drop-off to airport)*, airport* (JKIA / Wilson Airport / Other), flight number (optional for drop-offs), date and time*, passengers*, bags, pick-up or drop-off address area*, preferred class or car (optional), name*, phone*, email, notes, consent.
- **Wedding**: wedding date*, venue or area*, number of cars* (1–10), preferred car (default Prado TX), wedding glam decoration (yes/no), timing notes, name*, phone*, email, consent.
- **General**: name*, phone*, email, message (≤ 600), consent.
- `legal.formNotice` on every form. **No ID, licence or passport numbers.**
- zod, honeypot, minimum time-to-submit, best-effort rate limit, Resend email (subject `<Kind> request — <car/flight/date> — <name>`), `ok: false` fallback with WhatsApp (summary without contact details) and both phone numbers. **Never store or log bodies or personal data.** Optional WhatsApp Cloud API template alert to the owner. Never show success unless the email really sent.

---

## 11. SEO, A11Y, PERFORMANCE
Metadata per page (`%s | iMtalii Luxury Car Rentals Nairobi`), `lang="en-KE"`, OG image from the script, `AutoRental` JSON-LD (name, both telephones, email, address Bruce House, Standard Street, Nairobi, 00200, KE; `areaServed: "Kenya"`; `openingHours` only if real hours are given). **noindex in demo mode.** WCAG AA; labelled date, time and select inputs; keyboard-usable tabs (proper `role="tablist"`), filters and sheets; focus traps; reduced motion; `next/image` with `sizes`; fonts via `next/font`; `lucide-react`.

---

## 12. DATA
### `src/data/fleet.json` (provided)
```jsonc
{ "meta": { "currency": "KES", "rateUnit": "day", "count": 29, "source": "…" },
  "cars": [ { "ref": "IM-001", "slug": "toyota-land-cruiser-prado-tx", "name": "Toyota Land Cruiser Prado TX", "brand": "Toyota", "model": "Land Cruiser Prado TX",
    "class": "premium-comfort|executive|vip-flagship|luxury-suv|safari-4x4", "bodyType": "Sedan|SUV", "seats": 7 | null,
    "driveOptions": ["chauffeur","self-drive"], "dailyRateKes": 30000 | null, "rateOnRequest": false,
    "images": ["…"], "summary": "", "description": "", "features": [], "idealFor": [],
    "featured": true, "sample": true, "contentStatus": "sample|confirmed", "note": "…" } ] }
```
Mix: 7 Premium Comfort, 9 Executive, 4 VIP Flagship, 6 Luxury SUV, 3 Safari & 4x4 (including IM-001); 13 brands; KES 4,000 to 45,000 per day; 10 featured. Seats default to 5 (7 for the Q7, Discovery, Patrol and Prado), so treat them as typical values.

**IM-001 (their Prado TX) is confirmed.** Write only its `description` (from their own posts: weddings, VIP events, executive transfers, ready for any terrain, luxury and comfort, chauffeur services) and `features` (none invented; leave empty or use only what their posts say). Keep `rateOnRequest: true` and `seats: null`.

**Phase 2 rules for IM-002 to IM-029** (read `data-raw/car-notes.json` by ref):
- `summary`: one sentence, ≤ 130 characters.
- `description`: 2 short paragraphs (60–110 words) in iMtalii's voice (prestige, comfort, composure), **paraphrased**. No source company name, prices, ratings, reviews, "near me" or SEO phrases, or locations other than Nairobi in general.
- `features`: 5–8 items, **only those clearly correct for that model** from `featuresFromSource` (drop wrong-brand items such as "xDrive" or "Harman Kardon" on an Audi, "Quattro" on a non-Audi, "Professional Chauffeur" as a feature, and anything doubtful).
- `idealFor`: 2–4 from: Airport transfers, Executive transfers, Business meetings, Weddings, VIP events, Weekend escapes, City driving, Upcountry trips, Safari & rough roads.
- Don't change other fields. **Never import `data-raw/`.**

### Other data (Phase 3, all `status: "draft"` unless stated)
- `services.json` (5, §8; mark the service *names* as confirmed), `steps.json`, `requirements.json`, `faqs.json` (10).
- `blog.json`: 6 posts, 700–900 words, HTML, `coverRef` or null, each ending with `articleNotice`:
  1. **Arrive Composed: What to Expect from a Chauffeur-Driven Airport Transfer** (Airport & Business Travel)
  2. **Planning Your Wedding Cars: A Simple Timeline and Checklist** (Weddings & Events)
  3. **Self-Drive or Chauffeur: Choosing the Right Way to Ride** (Choosing a Car)
  4. **Executive Sedan or Luxury SUV? Matching the Car to the Occasion** (Choosing a Car)
  5. **Weekend Escapes from Nairobi: Travelling in Comfort** (Road Trips; general planning, no specific distances, times or road conditions)
  6. **Making an Impression: Luxury Cars for Business Meetings and VIP Guests** (Airport & Business Travel)

### Types (`src/types/index.ts`)
```typescript
export type CarClass = "premium-comfort" | "executive" | "vip-flagship" | "luxury-suv" | "safari-4x4";
export interface Car { ref: string; slug: string; name: string; brand: string; model: string; class: CarClass; bodyType: "Sedan" | "SUV";
  seats: number | null; driveOptions: ("self-drive" | "chauffeur")[]; dailyRateKes: number | null; rateOnRequest: boolean; images: string[];
  summary: string; description: string; features: string[]; idealFor: string[]; featured: boolean; sample: boolean;
  contentStatus: "sample" | "confirmed"; note?: string }
export interface FleetFile { meta: { currency: "KES"; rateUnit: "day"; count: number; source: string }; cars: Car[] }
export type FormKind = "booking" | "airport" | "wedding" | "general";
export interface Service { slug: string; title: string; eyebrow: string; quote: string | null; summary: string; body: string[]; classes: CarClass[]; formKind: FormKind; faqs: { q: string; a: string }[]; image: string | null; status: "draft" | "confirmed" }
export interface Step { index: string; title: string; text: string; status: "draft" | "confirmed" }
export interface FAQ { id: string; q: string; a: string; status: "draft" | "confirmed" }
export interface BlogPost { id: string; slug: string; title: string; excerpt: string; content: string; category: "Airport & Business Travel" | "Weddings & Events" | "Choosing a Car" | "Road Trips"; coverRef: string | null; author_name: string; read_time: number; created_at: string; published: boolean; status: "draft" | "confirmed" }
```

---

## 13. FILE STRUCTURE
```
src/config/brand.ts ⭐
src/app/{layout, page, globals.css, icon.png, apple-icon.png, opengraph-image.jpg}
src/app/{fleet/[slug], compare, services/[slug], how-it-works, requirements, about, blog/[slug], book, contact, privacy, terms}/page.tsx
src/app/{not-found.tsx, sitemap.ts, robots.ts, api/booking/route.ts}
src/components/brand/{Logo, GoldRing, ArrivalLine, Ribbon, Glow}.tsx
src/components/layout/{Navbar, MobileMenu, Footer, MobileActionBar, CallSheet, WhatsAppPill, DemoNotice}.tsx
src/components/home/{Hero, BookingConsole, PromiseStrip, Occasions, FeaturedRail, ClassTiles, ServicesTrio, LuxuryMeetsBusiness, HowItWorksPreview, StandOutBand, BlogPreview, FinalCta}.tsx
src/components/fleet/{FilterPanel, FilterSheet, CarCard, CarGallery, Lightbox, SpecRow, RateBadge, BookingCard, EstimatePanel, SimilarCars, CompareTray}.tsx
src/components/{compare, services, steps, faq, blog, forms, ui}/…
src/data/{fleet, services, steps, requirements, faqs, blog}.json
src/lib/{data, format, booking, filters, whatsapp, schema, useReveal}.ts
src/types/index.ts
public/brand/ and public/fleet/im-001/ (generated) · data-raw/ (git-ignored)
```

## 14. TECHNICAL RULES
- Next.js App Router, latest stable; follow `AGENTS.md`; `params` is async. CSS variables from `brand.colors` → Tailwind theme (`@theme inline`). **No hex codes outside `brand.ts`** (the logo SVG uses CSS variables; purple-tinted shadows use `color-mix()` or `rgb(from var(--color-purple) …)`).
- `"use client"` only where needed; `useSearchParams` inside `<Suspense>`; `localStorage` in effects with try/catch; unique keys; `generateStaticParams` + `notFound()`.
- Native date and time inputs, styled; compute in Africa/Nairobi time; no date libraries unless clearly needed (log why).
- `images.remotePatterns`: only `{ protocol: "https", hostname: "luxurycarhire.co.ke" }`.
- Dependencies: `zod`, `resend`, `lucide-react`; dev `sharp`.

## 15. ENVIRONMENT (`.env.example`)
```env
RESEND_API_KEY=
BOOKING_EMAIL_TO=imtaliiofficial@gmail.com
BOOKING_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_SHOW_DRAFT_FLAGS=true
WHATSAPP_API_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_TEMPLATE_NAME=
OWNER_WHATSAPP_NUMBER=254721621888
```

## 16. README
Setup and deploy; how to add or edit cars (photos in `public/fleet/<ref>/`; rates; featured; self-drive or chauffeur), services, posts and FAQs. **"Before this goes live" checklist for iMtalii:**
- **Replace the 28 sample cars, photos and rates** with iMtalii's real fleet; add rates and photos for the Prado TX; then set `NEXT_PUBLIC_DEMO_MODE=false`
- Provide: Instagram, Facebook and TikTok links, a map pin for Bruce House, an official vector logo, more of their own photos
- Confirm: name styling (iMtalii / Imtalii); hours (beyond 24/7 support); which number is primary for WhatsApp; airport transfer details (airports, meet and greet, waiting); wedding glam options; delivery fees and areas; requirements (licence, ID, deposit, age); what's included in rates; payment methods
- Review all draft copy (About, mission, vision, values, services, steps, FAQs, blog posts)
- Review the privacy notice under the Data Protection Act, 2019
- Verify an email sending domain (a Gmail address can receive but can't be a verified sender; `BOOKING_FROM_EMAIL` needs a domain they own)
- Set `NEXT_PUBLIC_SHOW_DRAFT_FLAGS=false`

Also include a photography wishlist (each car: front three-quarter, interior, rear; chauffeur at the door; wedding glam detail; airport pickup) and the QA and personality checklists.
