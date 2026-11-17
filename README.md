# Kev Auto Hire website

The website for Kev Auto Hire, Nairobi: chauffeur-driven car hire with premium 7-seaters for weddings, road trips, airport transfers, corporate travel and family trips, in Nairobi and beyond.

Built with Next.js (App Router), TypeScript and Tailwind. There is no database, login, payment or admin area. Bookings are requests that Kev Auto Hire confirms by WhatsApp, phone or email.

> **This is a preview.** All 28 cars, their photos and their rates are samples taken from another Nairobi company's public website, used only to show the design. None of them is Kev Auto Hire's own vehicle. While `NEXT_PUBLIC_DEMO_MODE` is on, those cars are tagged "Sample", their pages are kept out of search results and the sitemap, and the Terms page explains they are illustrative. Replace the samples as soon as possible (see the checklist below).

## Run it

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run lint
npm run build
```

New logo file: `node rebrand/scripts/logo-prep.mjs <logo>` regenerates `public/brand/` (logo cut-out, favicon, Apple icon, share image). Copy `favicon-256.png`, `apple-touch-icon.png` and `og-image.jpg` into `src/app/` as `icon.png`, `apple-icon.png` and `opengraph-image.jpg`.

## Environment

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Sends booking emails through Resend. |
| `BOOKING_EMAIL_TO` | Where requests are delivered. Gmail works here. Empty until Kev Auto Hire gives an email address. |
| `BOOKING_FROM_EMAIL` | The sender, for example `bookings@yourdomain.co.ke`. Must be on a domain verified in Resend. Gmail cannot be used. |
| `NEXT_PUBLIC_SITE_URL` | The live URL, used for canonical links, link previews and the sitemap. Optional on Vercel: production uses `brand.siteUrl` when set, otherwise the Vercel production address; previews use their own address. A `localhost` value is ignored on Vercel. |
| `NEXT_PUBLIC_DEMO_MODE` | On unless set to exactly `false`. Controls the Sample tags, noindex on sample car pages, and leaving sample cars out of the sitemap. |
| `NEXT_PUBLIC_SHOW_DRAFT_FLAGS` | `true` shows "Draft" badges on unconfirmed copy. |
| `WHATSAPP_API_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TEMPLATE_NAME`, `OWNER_WHATSAPP_NUMBER` | Optional WhatsApp Cloud API alert to the owner (254721569063). It carries the request type only. |

Until the three email settings are filled in, every form shows the WhatsApp and Call fallback. A form never claims success unless the email was really sent.

## Deploy (as a new Vercel project)

1. Create a **new** GitHub repository for this folder and push it (this folder was copied from another client's site; never push it to that client's repository).
2. In Vercel, **Add New → Project**, import the new repository. Framework: Next.js (detected).
3. Add the environment variables above (at least `NEXT_PUBLIC_DEMO_MODE=true` and `NEXT_PUBLIC_SHOW_DRAFT_FLAGS=true` for the preview). `NEXT_PUBLIC_` values are fixed at build time, so redeploy after changing them.
4. Deploy, then check the favicon and link preview (browsers cache favicons: use a private window).
5. When a domain is chosen, add it in Vercel and set `siteUrl` in `src/config/brand.ts` (or `NEXT_PUBLIC_SITE_URL`).

## Editing content

Everything fixed lives in **`src/config/brand.ts`**: name, contacts, the client's own words, labels, legal wording, colours and fonts. Leaving a value empty hides it (email, address, hours, map link, social links, hero photo).

| To change | Edit |
|---|---|
| Cars | `src/data/fleet.json` |
| Services | `src/data/services.json` |
| Steps | `src/data/steps.json` |
| Requirements | `src/data/requirements.json` |
| FAQs | `src/data/faqs.json` |
| Blog posts | `src/data/blog.json` (HTML; end each with the `articleNotice` wording) |

**Adding a vehicle:** put photos in `public/fleet/<ref>/` and list them in `images` as `/fleet/<ref>/photo.jpg`, with the best shot first. Set `dailyRateKes`, or set it to `null` with `rateOnRequest: true`. `featured: true` adds it to the Home rail. `driveOptions` is `["chauffeur"]` (add `"self-drive"` only if Kev Auto Hire confirms it; the forms and filters then offer it automatically). Real vehicles need `sample: false` and `contentStatus: "confirmed"`.

**Photos:** the hero, occasion tiles, service pages, About panel and blog covers use Pexels stock photos from `public/photos/`, set in `brand.photos` (`brand.ts`). Replace a file with the client's own photo (same name), or set a path to `""` to show the logo's swoosh instead. Credits and the replacement plan: `docs/PHOTOS.md`.

Content marked `status: "draft"` shows a badge while draft flags are on. Change it to `"confirmed"` once Kev Auto Hire has approved it.

## Before this goes live

### Replace
- [ ] Replace the 28 sample cars, photos and rates with Kev Auto Hire's real 7-seaters
- [ ] Remove the sample-photo host from `images.remotePatterns` and the `imgOptTimeoutInSeconds` setting in `next.config.ts`
- [ ] Set `NEXT_PUBLIC_DEMO_MODE=false`

### Kev Auto Hire to provide
- [ ] Photos of their own vehicles and drivers (hero, Weddings, About)
- [ ] An official vector logo (SVG or PDF); the current one is a 150px image
- [ ] An email address for bookings
- [ ] Office address or base, map pin and hours, if they want them shown
- [ ] Website domain; Facebook and TikTok links, if any

### Kev Auto Hire to confirm
- [ ] Whether self-drive is offered (hidden for now)
- [ ] Airports served, and how airport pickups and flight delays work
- [ ] Wedding extras (for example decoration), if any
- [ ] Requirements, what rates include, payment methods
- [ ] Vehicle classes that suit their fleet (the current five fit the sample cars)

### Review and switch on
- [ ] Review all draft copy: About, mission, vision, values, services, steps, FAQs and blog posts
- [ ] Review the privacy notice under the Data Protection Act, 2019
- [ ] Verify an email sending domain in Resend, then send a test request of each kind
- [ ] Set `NEXT_PUBLIC_SHOW_DRAFT_FLAGS=false`

### Noted
- Blog post dates are placeholders. Set real dates before publishing.
- Rate limiting on the form endpoint is per server instance, so it is best effort.
- The site is open to search engines while in demo mode (only sample car pages are noindexed). Since every car is currently a sample, consider keeping the preview private until the real fleet is in.

## Photography wishlist
- Each vehicle: front three-quarter, interior (all seven seats), rear with the boot open
- A driver at the vehicle door
- A wedding pickup
- An airport pickup
- A road trip outside Nairobi

## QA checklist
- [ ] Each page at 375px and 1280px, with no sideways scrolling
- [ ] Sticky mobile bar: Call dials 0721 569 063; on car pages it reads "Book this car"
- [ ] Filters update the URL, and work in the mobile sheet
- [ ] Dates from the Home console carry through to fleet estimates, the car page and the form
- [ ] No past pick-ups, and the end after the pick-up, in Nairobi time
- [ ] Each of the four forms: real email received; with keys removed, the fallback shows
- [ ] No ID, licence or passport number fields
- [ ] Keyboard: tabs with arrow keys, filters, sheets and lightbox; Escape closes
- [ ] Reduced motion switched on: nothing animates
- [ ] With demo mode off: no tags, sample pages indexable, sitemap complete

## Personality checklist
- [ ] Hero: night with the green swoosh (or their photo), "Travel in comfort. Arrive in style." in Marcellus, frosted console, promise strip beneath
- [ ] Occasions: four asymmetric tiles under "Your journey, our priority."
- [ ] Promise strip: six accent-ringed chips on night
- [ ] Airport and corporate travel split with the arrival line
- [ ] Rhythm: white, mist and night alternate; never three similar in a row
- [ ] Details: ringed rate badge, Marcellus car names, styled date inputs, soft focus on dark and green on light, the 404 line
- [ ] Accent green is never text on white or mist; primary green is never text on night
- [ ] Clean, premium and bold, never busy
