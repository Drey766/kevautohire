export type CarClass = "premium-comfort" | "executive" | "vip-flagship" | "luxury-suv" | "safari-4x4";
export type DriveOption = "self-drive" | "chauffeur";

export interface Car {
  ref: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  class: CarClass;
  bodyType: "Sedan" | "SUV";
  seats: number | null;
  driveOptions: DriveOption[];
  dailyRateKes: number | null;
  rateOnRequest: boolean;
  images: string[];
  summary: string;
  description: string;
  features: string[];
  idealFor: string[];
  featured: boolean;
  sample: boolean;
  contentStatus: "sample" | "confirmed";
  note?: string;
}

export interface FleetFile {
  meta: { currency: "KES"; rateUnit: "day"; count: number; source: string };
  cars: Car[];
}

export type FormKind = "booking" | "airport" | "wedding" | "general";
export type ContentStatus = "draft" | "confirmed";

export interface Service {
  slug: string;
  title: string;
  nameStatus: ContentStatus;
  eyebrow: string;
  quote: string | null;
  summary: string;
  body: string[];
  classes: CarClass[];
  formKind: FormKind;
  faqs: { q: string; a: string }[];
  image: string | null;
  status: ContentStatus;
}

export interface Step {
  index: string;
  title: string;
  text: string;
  status: ContentStatus;
}

export interface FAQ {
  id: string;
  q: string;
  a: string;
  status: ContentStatus;
}

export interface RequirementGroup {
  id: string;
  title: string;
  items: string[];
  status: ContentStatus;
}

export type BlogCategory = "Airport & Business Travel" | "Weddings & Events" | "Choosing a Car" | "Road Trips";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  coverRef: string | null;
  author_name: string;
  read_time: number;
  created_at: string;
  published: boolean;
  status: ContentStatus;
}
