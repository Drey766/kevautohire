// =====================================================
// BRAND CONFIGURATION — SINGLE SOURCE OF TRUTH
// Edit ONLY this file for company details, contact info, colours,
// fonts or fixed wording. Empty = not provided → hidden.
// =====================================================
export const brand = {
  name: "Kev Auto Hire",
  shortName: "Kev Auto",
  fullName: "Kev Auto Hire",
  descriptor: "Chauffeur-Driven Car Hire",
  siteUrl: "", // live address: unknown until a domain is chosen (canonical links fall back to the deployment URL)
  city: "Nairobi",
  country: "Kenya",
  foundedYear: null as number | null,

  phones: [{ display: "0721 569 063", href: "tel:+254721569063", whatsapp: "254721569063" }],
  whatsappUrl: "https://wa.me/254721569063",
  email: "",
  address: { building: "", street: "", area: "", postalCode: "", country: "Kenya" },
  hours: "",
  servesCountrywide: true, // confirmed: "Nairobi & beyond", they serve countrywide
  mapUrl: "",
  social: { instagram: "https://www.instagram.com/kev_auto_hire/", facebook: "", tiktok: "", x: "" },
  /**
   * Stock photos (Pexels, free to use) standing in until Kev Auto Hire's own photos arrive; see docs/PHOTOS.md.
   * Empty → that spot is drawn with the logo's swoosh instead. Swap a file in public/photos/ to replace it.
   */
  photos: {
    hero: "/photos/hero-fleet.jpg",
    weddings: "/photos/wedding-fleet.jpg",
    airport: "/photos/airport-nairobi.jpg",
    corporate: "/photos/corporate-nairobi.jpg",
    chauffeur: "/photos/chauffeur-nairobi.jpg",
    roadTrip: "/photos/road-trip.jpg",
    about: "/photos/about.jpg",
  },

  // ── CLIENT'S OWN WORDS (confirmed; emoji and exclamation marks dropped) ──
  voice: {
    tagline: "Drive Comfort. Arrive in Style.", // from the logo
    comfortStyle: "Travel in Comfort. Arrive in Style.",
    priority: "Your journey, our priority.",
    premiumSeaters: "Premium 7 Seaters Car Hire",
    reach: "Nairobi & Beyond",
    chauffeurLine: "Chauffeur-Driven: Weddings, Road Trips, Airport Transfers",
    enjoy: "Enjoy comfortable, reliable and hassle-free chauffeur-driven rides with Kev Auto Hire.",
    whether: "Whether it's airport transfers, corporate travel, family trips or special occasions, we provide professional drivers and quality service to make every journey seamless.",
    wherever: "Wherever you're headed, travel in comfort and style.",
    vans: "Our chauffeur driven 7-seater vans are perfect for weddings, airport transfers, business trips, and family travel.",
    handle: "Book today and let us handle the journey.",
    bookNext: "Book your next ride with us today.",
    trio: ["Book today", "Travel in comfort", "Arrive in style"],
    promises: ["Premium 7-Seaters", "Chauffeur-Driven", "Professional Drivers", "Comfortable & Reliable", "Hassle-Free", "Nairobi & Beyond"],
  },
  services: ["Airport Transfers", "Chauffeur-Driven Hire", "Weddings", "Corporate Travel", "Family Trips & Road Trips"], // from their posts
  occasions: ["Weddings", "Road Trips", "Airport Transfers", "Corporate Travel", "Family Trips", "Special Occasions"], // from their posts

  // ── NAVIGATION ──
  nav: [
    { label: "Fleet", href: "/fleet" },
    { label: "Services", href: "/services" },
    { label: "Weddings", href: "/services/weddings" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  // ── FLEET CLASSES (draft descriptions; the fleet shown is a sample) ──
  classes: {
    "premium-comfort": { label: "Premium Comfort", line: "Easy, comfortable cars for the city and beyond." },
    executive: { label: "Executive", line: "Polished sedans for corporate travel." },
    "vip-flagship": { label: "VIP Flagship", line: "Room to work, or simply rest, on the way." },
    "luxury-suv": { label: "Luxury SUV", line: "Height, space and quiet comfort." },
    "safari-4x4": { label: "Safari & 4x4", line: "For road trips beyond the tarmac." },
  },

  // ── ABOUT (draft) ──
  about: {
    who: "Kev Auto Hire is a chauffeur-driven car hire service in Nairobi. We offer premium 7-seaters with professional drivers for weddings, road trips, airport transfers, corporate travel, family trips and special occasions, in Nairobi and beyond.",
    mission: "To make every journey seamless, with comfortable vehicles, professional drivers and quality service.",
    vision: "Comfortable, stylish travel for every group, wherever in Kenya the road leads.",
    values: [
      { name: "Comfort", text: "Room for everyone, and a ride that feels easy from the first kilometre." },
      { name: "Reliability", text: "When we confirm a booking, you can plan your day around it." },
      { name: "Professionalism", text: "Courteous drivers who know the road and respect your time." },
      { name: "Ease", text: "One request, and we handle the journey from there." },
    ],
    team: [] as { name: string; role: string }[],
    experience: "",
  },

  // ── MICRO-COPY (draft) ──
  copy: {
    heroEyebrow: "Premium 7-seater car hire · Nairobi & beyond",
    heroHeadline: "Travel in comfort. Arrive in style.",
    heroSubtext: "Chauffeur-driven 7-seaters for weddings, road trips, airport transfers, corporate travel and family trips.",
    bookCta: "Request a Booking",
    fleetCta: "Explore the Fleet",
    whatsappCta: "Book on WhatsApp",
    callCta: "Call Us",
    whatsappPrefill: "Hello Kev Auto Hire, I'd like to book a ride.",
    formSuccess: "Request received. We'll confirm availability and your quote shortly.",
    formFallback: "We couldn't send your request online just now. Please book on WhatsApp or call us.",
    demoNotice: "Preview site. Cars, photos and rates shown are illustrative samples.",
    sampleTag: "Sample",
    ownFleetTag: "Kev Auto Fleet",
    draftBadge: "Draft",
    rateOnRequest: "Rate on request",
    quoteOnRequest: "Quote on request",
    logoAlt: "Kev Auto Hire",
    heroPhotoAlt: "A row of parked minivans in blue, white, black and red",
    coverageNote: "Chauffeur-driven trips in Nairobi and beyond. We serve clients countrywide.",
    notFoundTitle: "This road doesn't go anywhere.",
    notFoundBody: "Let us get you back on the journey.",
    finalCtaTitle: "Book your next ride with us today.",
    pickupOption: "Pick me up (tell us the area)",
    airportOption: "Airport",
  },

  legal: {
    estimateNotice: "Indicative estimate. Your final quote, including the chauffeur and route, is confirmed by Kev Auto Hire when you book.",
    estimateSmallPrint: "Part days count as a full day in estimates; final terms confirmed by Kev Auto Hire.",
    rateNote: "Rates shown are per day and indicative. Availability is confirmed at booking.",
    formNotice: "No ID or licence numbers needed here. We'll take care of the details when we confirm your booking.",
    articleNotice: "General information only. Requirements change; check with Kev Auto Hire or the relevant authority before you travel.",
    privacyLaw: "Data Protection Act, 2019",
    privacyRegulator: "Office of the Data Protection Commissioner (ODPC)",
  },

  seo: {
    titleTemplate: "%s | Kev Auto Hire Nairobi",
    defaultTitle: "Kev Auto Hire | Chauffeur-Driven 7-Seater Car Hire, Nairobi",
    description: "Chauffeur-driven 7-seater car hire in Nairobi and beyond: weddings, road trips, airport transfers, corporate travel and family trips.",
  },

  // From the logo: its black and green, made text-safe (see CLAUDE.md for which colour may be text on which background).
  colors: {
    primary: "#2E6B1F", // deep logo green: primary buttons (white text), links and eyebrows on light
    primaryDeep: "#245818", // hover/pressed
    night: "#101513", // logo black: night sections, footer, hero
    nightRaised: "#1C2420", // cards/panels on dark
    soft: "#C9D6CC", // text on dark (12.3:1 on night), soft fills on light
    mist: "#F1F6EE", // light section background
    white: "#FFFFFF",
    ink: "#111614", // headings on light
    body: "#4F5853", // body text on light (7.4:1 on white, 6.7:1 on mist)
    line: "#E1E8E0",
    accent: "#6FAE34", // logo green: rings, hairlines, numerals and small text ON DARK only
    accentFrom: "#5E9A2C", // logo swoosh gradient start
    accentTo: "#8CC63F", // logo swoosh gradient end, accent button hover
    accentText: "#528126", // accent made text-safe on white (4.6:1)
  },
  fonts: { display: "Marcellus", body: "Outfit" },
} as const;
export type Brand = typeof brand;
