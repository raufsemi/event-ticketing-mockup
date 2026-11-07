import type { EventSlug } from "./events";

// Stock photos from Unsplash (free under the Unsplash License, no attribution required).
// Files live in /public/images/events. Swap any of these for your own event photos:
// drop the new file in that folder and change `src`.

type Photo = { src: string; alt: string; source: string };

const p = (file: string, alt: string, id: string): Photo => ({
  src: `/images/events/${file}.jpg`,
  alt,
  source: `https://unsplash.com/photos/${id}`,
});

export const photos = {
  // Ticket listings
  "kl-night-run": p(
    "kl-night-run",
    "Runner sprinting down a city street at night",
    "Ayd1dEmSSjU",
  ),
  "midnight-pulse": p(
    "midnight-pulse",
    "Festival crowd cheering under bright stage lights",
    "Ke6Pr-9A2ac",
  ),
  "ramadan-buffet": p(
    "ramadan-buffet",
    "Satay and grilled meat smoking on a Ramadan bazaar stall",
    "2BD2uOTUpvo",
  ),
  "hope-gala": p(
    "hope-gala",
    "Banquet hall set with round tables and chandeliers",
    "cQxEJoQZ_-E",
  ),
  "jb-street-food": p(
    "jb-street-food",
    "Satay skewers on a busy night market stall",
    "ZHc1zGwH4W0",
  ),
  "putrajaya-half": p(
    "putrajaya-half",
    "Runners filling a city road during a marathon",
    "8pNsZRjxtnw",
  ),
  unplugged: p(
    "unplugged",
    "Band performing on a stage bathed in warm light",
    "o7wPTlBgQ98",
  ),
  "family-carnival": p(
    "family-carnival",
    "Family walking hand in hand through a carnival",
    "1crlq0g5I_g",
  ),

  // Event type covers
  "type-running": p(
    "type-running",
    "Large field of runners on a city marathon route",
    "Xy751Fwc1OY",
  ),
  "type-bazaar": p(
    "type-bazaar",
    "Crowds at a night market lined with food stalls",
    "3SxghfyVLIc",
  ),
  "type-charity": p(
    "type-charity",
    "Volunteers packing food donations",
    "3k3l2brxmwQ",
  ),
  "type-concerts": p(
    "type-concerts",
    "Confetti falling over a concert crowd",
    "A8edFHZtMxE",
  ),

  // Past events
  "past-city-night-run": p(
    "past-city-night-run",
    "Runners on a lit path at night below city towers",
    "7BlfHlujv2c",
  ),
  "past-festival": p(
    "past-festival",
    "Concert crowd facing a stage lit in blue",
    "V-pSsJdyHs4",
  ),
  "past-ramadan-bazaar": p(
    "past-ramadan-bazaar",
    "Vendor preparing steamed kuih at a Ramadan bazaar",
    "g6BjS-FXrkQ",
  ),
  "past-gala": p(
    "past-gala",
    "Long dinner tables set for a gala evening",
    "j9JLxuhiYbY",
  ),
  "past-street-food": p(
    "past-street-food",
    "Food trucks and diners at an evening street food market",
    "Ds0BojS1_U8",
  ),
  "past-school-drive": p(
    "past-school-drive",
    "Volunteers sorting boxes at a donation drive",
    "y3ZY6qFln_g",
  ),
  "past-countdown": p(
    "past-countdown",
    "Fireworks bursting over a crowd at a countdown",
    "lFMNlflDdow",
  ),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/** Every photo for one event type, for the type page galleries. */
export const photosByType: Record<EventSlug, PhotoKey[]> = {
  running: [
    "type-running",
    "kl-night-run",
    "putrajaya-half",
    "past-city-night-run",
  ],
  "bazaar-buffet": [
    "type-bazaar",
    "ramadan-buffet",
    "jb-street-food",
    "past-ramadan-bazaar",
    "past-street-food",
  ],
  charity: [
    "type-charity",
    "hope-gala",
    "family-carnival",
    "past-gala",
    "past-school-drive",
  ],
  concerts: [
    "type-concerts",
    "midnight-pulse",
    "unplugged",
    "past-festival",
    "past-countdown",
  ],
};
