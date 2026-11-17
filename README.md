# iMtalii Car Rentals website

The website for iMtalii Car Rentals, Bruce House, Standard Street, Nairobi CBD: airport transfers, chauffeur services and self-drive, with a Land Cruiser Prado TX fleet for weddings, VIP events and executive transfers.

Built with Next.js (App Router), TypeScript and Tailwind. There is no database, login, payment or admin area. Bookings are requests that iMtalii confirms by email, WhatsApp or phone.

> **This is a preview.** Apart from the Prado TX (IM-001), the 28 cars, their photos and their rates are samples taken from another Nairobi company's public website, used only to show the design. While `NEXT_PUBLIC_DEMO_MODE` is on, those cars are tagged "Sample", their pages are kept out of search results and the sitemap, and the Terms page explains they are illustrative. The rest of the site is open to search engines and link previews. Replace the samples as soon as possible (see the checklist below).

## Run it

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run lint
npm run build
node scripts/prepare-assets.mjs   # regenerate icons and share image from assets/
```

## Environment

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Sends booking emails through Resend. |
| `BOOKING_EMAIL_TO` | Where requests are delivered. Gmail works here. |
| `BOOKING_FROM_EMAIL` | The sender, for example `bookings@yourdomain.co.ke`. Must be on a domain verified in Resend. Gmail cannot be used. |
| `NEXT_PUBLIC_SITE_URL` | The live URL, used for canonical links, link previews and the sitemap. Optional on Vercel: production falls back to `brand.siteUrl` (https://imtalii.vercel.app) and previews use their own address. A `localhost` value is ignored on Vercel. |
| `NEXT_PUBLIC_DEMO_MODE` | On unless set to exactly `false`. Controls the Sample tags, noindex on sample car pages, and leaving sample cars out of the sitemap. The site itself is always crawlable. |
| `NEXT_PUBLIC_SHOW_DRAFT_FLAGS` | `true` shows "Draft" badges on unconfirmed copy. |
| `WHATSAPP_API_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TEMPLATE_NAME`, `OWNER_WHATSAPP_NUMBER` | Optional WhatsApp Cloud API alert to the owner. It carries the request type only. |

Until the three email settings are filled in, every form shows the WhatsApp and Call fallback. A form never claims success unless the email was really sent.

## Deploy

Any host that runs Next.js works, for example Vercel. Add the variables above in the host's settings, and note that the `NEXT_PUBLIC_` values are fixed at build time, so redeploy after changing them.

## Editing content

Everything fixed lives in **`src/config/brand.ts`**: name, contacts, the client's own words, labels, legal wording, colours and fonts. Leaving a value empty hides it (hours, map link, social links).

| To change | Edit |
|---|---|
| Cars | `src/data/fleet.json` |
| Services | `src/data/services.json` |
| Steps | `src/data/steps.json` |
| Requirements | `src/data/requirements.json` |
| FAQs | `src/data/faqs.json` |
| Blog posts | `src/data/blog.json` (HTML; end each with the `articleNotice` wording) |

**Adding or editing a car:** put photos in `public/fleet/<ref>/` and list them in `images` as `/fleet/<ref>/photo.jpg`, with the best shot first. Set `dailyRateKes`, or set it to `null` with `rateOnRequest: true`. `featured: true` adds a car to the Home rail. `driveOptions` takes `"self-drive"`, `"chauffeur"` or both. Real cars need `sample: false` and `contentStatus: "confirmed"`.

Content marked `status: "draft"` shows a badge while draft flags are on. Change it to `"confirmed"` once iMtalii has approved it.

## Before this goes live

### Replace
- [ ] Replace the 28 sample cars, photos and rates with iMtalii's real fleet
- [ ] Add a rate, seat count and more photos for the Prado TX, and confirm whether it is offered as self-drive
- [ ] Remove the sample-photo host from `images.remotePatterns` and the `imgOptTimeoutInSeconds` setting in `next.config.ts`
- [ ] Set `NEXT_PUBLIC_DEMO_MODE=false`

### iMtalii to provide
- [ ] Instagram, Facebook and TikTok links
- [ ] A map pin for Bruce House
- [ ] An official vector logo (the current one is traced from a 150px image)
- [ ] More of their own photos (see the wishlist)

### iMtalii to confirm
- [ ] Name styling: iMtalii or Imtalii
- [ ] Hours, beyond 24/7 support
- [ ] Which number is primary for WhatsApp (currently +254 721 621 888)
- [ ] Airport transfer details: airports served, meet and greet, waiting
- [ ] Wedding glam options
- [ ] Delivery fees and areas
- [ ] Requirements: licence, ID, deposit, age
- [ ] What is included in rates
- [ ] Payment methods

### Review and switch on
- [ ] Review all draft copy: About, mission, vision, values, services, steps, FAQs and blog posts
- [ ] Review the privacy notice under the Data Protection Act, 2019
- [ ] Verify an email sending domain in Resend (Gmail can receive requests, but it cannot be a verified sender), then send a test request of each kind
- [ ] Set `NEXT_PUBLIC_SHOW_DRAFT_FLAGS=false`
- [ ] If the site moves to its own domain, update `siteUrl` in `src/config/brand.ts` (or set `NEXT_PUBLIC_SITE_URL`)

### Noted during the build
- Blog posts carry the build date as a placeholder. Set real dates before publishing.
- Rate limiting on the form endpoint is per server instance, so it is best effort.

## Photography wishlist
- Each car: front three-quarter, interior, rear
- A chauffeur at the car door
- Wedding glam detail: ribbons and flowers, close up
- An airport pickup
- Higher-resolution versions of the convoy photo (the current one is 817 pixels wide and is used large on Home)

## QA checklist
- [ ] Each page at 375px and 1280px, with no sideways scrolling
- [ ] Sticky mobile bar: Call opens the two-number sheet; on car pages it reads "Book this car"
- [ ] Filters update the URL, and work in the mobile sheet
- [ ] Dates from the Home console carry through to fleet estimates, the car page and the form
- [ ] No past pick-ups, and return after pick-up, in Nairobi time
- [ ] Each of the four forms: real email received; with keys removed, the fallback shows
- [ ] No ID, licence or passport number fields
- [ ] Keyboard: tabs with arrow keys, filters, sheets and lightbox; Escape closes
- [ ] Reduced motion switched on: nothing animates
- [ ] With demo mode off: no notice, no tags, indexable, sitemap complete

## Personality checklist
- [ ] Hero: convoy photo, aubergine and purple glow, "Arrive with prestige." in Marcellus, frosted console, promise strip beneath
- [ ] Occasions: four large asymmetric tiles, each with their own words
- [ ] Promise strip: seven gold-ringed chips on aubergine
- [ ] "Where Luxury Meets Business" split with the arrival line
- [ ] Rhythm: white, lavender mist and aubergine alternate; never three similar in a row
- [ ] Details: gold-ring rate badge, Marcellus car names, styled date inputs, lavender focus on dark and purple on light, the 404 line
- [ ] Gold is never text on white or mist; purple is never text on aubergine
- [ ] Calm and luxurious, never busy
