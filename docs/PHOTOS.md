# Photos

These are **stock photos from [Pexels](https://www.pexels.com/license/)**, used as stand-ins until Kev Auto Hire's own photos arrive. The Pexels licence allows free commercial use without attribution (credit is appreciated, and the photos must not be resold as they are). They are local copies in `public/photos/`, resized to 1600px wide, so the site needs no extra image host.

**Except for the hero, they are mood images, not Kev Auto Hire's vehicles.** They show black sedans, a convertible and a safari vehicle, not 7-seater vans. They are used as decorative images (`alt=""`) and are never labelled as the company's fleet. Replace them with the client's own photos as soon as they exist: overwrite the file in `public/photos/` (same name) or change the path in `brand.photos` (`src/config/brand.ts`). Set a path to `""` to fall back to the logo's swoosh for that spot.

| File | Used for | Pexels page |
|---|---|---|
| `hero-fleet.jpg` | Home hero | **Supplied photo, not stock:** a row of parked minivans (blue, white, black, red). Provided for this project; confirm with Kev Auto Hire that it is theirs and that they are happy for it to be used. |
| `corporate.jpg` | Corporate Travel (tile and service page), blog cover | [photo 8425042](https://www.pexels.com/photo/man-opening-a-car-s-door-8425042/) (Pavel Danilyuk) |
| `chauffeur.jpg` | Chauffeur-Driven Hire (service page), blog cover | [photo 8425044](https://www.pexels.com/photo/man-opening-a-car-door-8425044/) (Pavel Danilyuk) |
| `airport.jpg` | Airport Transfers (tile and service page), blog cover | [photo 4173219](https://www.pexels.com/photo/stylish-man-with-suitcase-and-passport-walking-along-airport-corridor-4173219/) |
| `weddings.jpg` | Weddings (tile and service page), blog cover | [photo 31953145](https://www.pexels.com/photo/elegant-bride-and-groom-in-convertible-car-31953145/) |
| `road-trip.jpg` | Family Trips & Road Trips (tile and service page), blog cover | [photo 4404524](https://www.pexels.com/photo/a-safari-jeep-on-dirt-road-4404524/) |
| `about.jpg` | About page panel | [photo 28157155](https://www.pexels.com/photo/28157155/) |

The hero (`hero-fleet.jpg`) is the one real fleet photo. Photographer names for the stock photos are given only where the Pexels listing showed them; open the page for the rest.

## Not replaced on purpose
The sample **car photos** (cards, car pages, class tiles) stay as they are. A generic stock photo can't match a named model, and a "Toyota RAV4" card showing a different car would be misleading. They go away when the real fleet goes in.
