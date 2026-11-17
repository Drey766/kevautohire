// Option lists shared by the forms and the API. No ID, licence or passport fields anywhere.
export const AIRPORTS = ["JKIA", "Wilson Airport", "Other"] as const;
export const PURPOSES = ["Business", "Wedding", "VIP event", "Weekend escape", "Other"] as const;
export const DIRECTIONS = [
  { value: "pickup", label: "Pickup from airport" },
  { value: "dropoff", label: "Drop-off to airport" },
] as const;
export const NOTES_MAX = 500;
export const MESSAGE_MAX = 600;
export const MAX_WEDDING_CARS = 10;
/** Forms submitted faster than this are treated as automated. */
export const MIN_SUBMIT_MS = 2500;
