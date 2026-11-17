# Brand assets

- `logo-original.jpg` (150×150): the logo as posted, on a mock-up charcoal background.
- `post-reference.png`: their wedding convoy post (the colour reference).
- `imtalii-logo.svg`: the logo **traced into a vector**: the gold gradient "imtalii" wordmark, the ring emblem (redrawn as a clean circle; its tiny inner detail was unreadable in the original), and "CAR RENTALS". Colours come from CSS variables `--logo-gold-from`, `--logo-gold-to` and `--logo-tagline` (white on dark, ink or purple on light).
- `own-photos/prado-wedding-convoy.jpg`: **iMtalii's own** image, cropped from their post (no text). It's used for the hero, Weddings and IM-001.

`node scripts/prepare-assets.mjs` copies these into `public/` and makes the ringed-"i" favicon, the Apple icon and the share image.

**Ask iMtalii for their official vector logo and more of their own car photos.** Replace the files here when they arrive.
