// =====================================================
// BRAND CONFIGURATION — SINGLE SOURCE OF TRUTH
// Edit ONLY this file for company details, contact info, colours,
// fonts or fixed wording. Empty = not provided → hidden.
// =====================================================
export const brand = {
  name: "iMtalii",
  fullName: "iMtalii Car Rentals",
  descriptor: "Luxury Car Rentals",
  siteUrl: "https://imtalii.vercel.app", // live address: canonical links and link previews
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
  hours: "", // only "24/7 support" is confirmed
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
    wherever: "Whether it's an airport pickup, high-stakes meeting, or executive transfer: arrive composed, ride in comfort, and leave an impression that lasts.",
    composed: "Arrive composed, ride in comfort, and leave an impression that lasts.",
    elegance: "Elegance in Every Arrival",
    weddingGlam: "Make your big day unforgettable with iMtalii's luxury fleet dressed in wedding glam. Arrive in style, leave in memories.",
    standOut: "Why blend in when you were born to stand out?",
    experience: "It's more than just a ride. It's an experience of elegance, power, and prestige.",
    weekend: "Whether it's for a weekend escape, a business meeting, or just because you deserve it, rent the car that turns heads.",
    driveAway: "Luxury is no longer a dream. It's a drive away.",
    fleetLine: "Luxury Land Cruiser Prado TX fleet for weddings, VIP events and executive transfers.",
    bio: "Luxury cars for airport transfers, chauffeur services, and self-drive. Ride in style from Nairobi CBD.",
    trio: ["Book now", "Drive premium", "Arrive iconic"],
    promises: ["Luxury & Comfort", "Ready for Any Terrain", "24/7 Support", "Premium Fleet", "Chauffeur Services", "Executive Comfort", "Nationwide Delivery"],
  },
  services: ["Airport Transfers", "Chauffeur Services", "Self-Drive"], // confirmed core
  occasions: ["Weddings", "VIP Events", "Executive Transfers", "Business Meetings", "Weekend Escapes"], // from their posts

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

  // ── FLEET CLASSES (draft descriptions) ──
  classes: {
    "premium-comfort": { label: "Premium Comfort", line: "Easy, composed cars for the city and beyond." },
    executive: { label: "Executive", line: "Polished sedans for the meetings that matter." },
    "vip-flagship": { label: "VIP Flagship", line: "The rear seat is the point." },
    "luxury-suv": { label: "Luxury SUV", line: "Height, presence and quiet comfort." },
    "safari-4x4": { label: "Safari & 4x4", line: "Ready for any terrain." },
  },

  // ── ABOUT (draft) ──
  about: {
    who: "iMtalii is a luxury car rental at Bruce House, Standard Street, in Nairobi CBD. We offer airport transfers, chauffeur services and self-drive, and we are known for a Land Cruiser Prado TX fleet for weddings, VIP events and executive transfers.",
    mission: "To make every arrival flawless, with premium cars, composed chauffeurs and support around the clock.",
    vision: "To be Nairobi's name for arriving in style.",
    values: [
      { name: "Prestige", text: "Every car and every arrival should feel like an occasion." },
      { name: "Comfort", text: "The journey matters as much as the destination." },
      { name: "Reliability", text: "When we confirm a booking, you can plan your day around it." },
      { name: "Discretion", text: "Your plans and your details stay private." },
    ],
    team: [] as { name: string; role: string }[],
    experience: "",
  },

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
    sampleTag: "Sample",
    ownFleetTag: "iMtalii Fleet",
    draftBadge: "Draft",
    rateOnRequest: "Rate on request",
    quoteOnRequest: "Quote on request",
    logoAlt: "iMtalii Car Rentals",
    photoAlt: "iMtalii's Land Cruiser Prado TX convoy dressed in wedding ribbons on a lakeside road",
    support247Note: "24/7 support, whenever you need us.",
    deliveryNote: "Nationwide delivery available. Fees and areas are confirmed when you book.",
    notFoundTitle: "This road isn't on our route.",
    notFoundBody: "Let's get you back in style.",
    finalCtaTitle: "Your arrival starts here.",
    officeOption: "Bruce House office",
    deliverOption: "Deliver to me",
    airportOption: "Airport",
  },

  legal: {
    estimateNotice: "Indicative estimate. Your final quote, including any delivery or chauffeur arrangements, is confirmed by iMtalii when you book.",
    estimateSmallPrint: "Part days count as a full day in estimates; final terms confirmed by iMtalii.",
    rateNote: "Rates shown are per day and indicative. Availability is confirmed at booking.",
    formNotice: "No ID or licence numbers needed here. We'll take care of the details when we confirm your booking.",
    articleNotice: "General information only. Requirements change; check with iMtalii or the relevant authority before you travel.",
    privacyLaw: "Data Protection Act, 2019",
    privacyRegulator: "Office of the Data Protection Commissioner (ODPC)",
  },

  seo: {
    titleTemplate: "%s | iMtalii Luxury Car Rentals Nairobi",
    defaultTitle: "iMtalii Luxury Car Rentals Nairobi",
    description: "Luxury car rentals in Nairobi: airport transfers, chauffeur services and self-drive, with a Prado TX fleet for weddings and VIP events.",
    openingNote: "Bruce House, Standard Street, Nairobi CBD",
  },

  colors: {
    purple: "#6A00BC", // brand purple (their Book Now button): primary buttons (white text), links on light
    purpleDeep: "#4E008C", // hover/pressed
    aubergine: "#1A0B2E", // deep night sections, footer, hero overlay
    aubergineRaised: "#2E1450", // cards/panels on dark
    lavender: "#C9B6EC", // text and accents on dark (10:1 on aubergine), soft highlight fills on light
    lavenderMist: "#EEE8F8", // light section background (their post panels)
    white: "#FFFFFF",
    ink: "#120A1F", // headings on light
    slate: "#5B5468", // body text on light (7.2:1 on white, 6.0:1 on lavenderMist)
    line: "#E6E0F0",
    gold: "#E0A84A", // logo gold, solid: rings, hairlines, numerals and small text ON DARK only
    goldFrom: "#D0802F", // logo gradient start
    goldTo: "#F7C35F", // logo gradient end
  },
  fonts: { display: "Marcellus", body: "Outfit" },
} as const;
export type Brand = typeof brand;
