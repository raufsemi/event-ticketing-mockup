import type { EventSlug } from "./events";
import type { PhotoKey } from "./photos";

// Example upcoming events with tickets. All names, dates and prices are placeholders.

export type Tier = {
  id: string;
  name: string;
  price: number; // RM
  note: string;
  left?: number;
  soldOut?: boolean;
};

export type Listing = {
  id: string;
  type: EventSlug;
  /** Cover photo, see lib/photos.ts. */
  photo: PhotoKey;
  title: string;
  date: string;
  day: string;
  month: string;
  time: string;
  venue: string;
  city: string;
  /** Venue position for the map. Right-click a place in Google Maps to copy these. */
  lat?: number;
  lng?: number;
  description: string;
  highlights: string[];
  tiers: Tier[];
  badge?: "Selling fast" | "New" | "Few seats left";
  featured?: boolean;
};

export const listings: Listing[] = [
  {
    id: "kl-night-run-2026",
    photo: "kl-night-run",
    type: "running",
    title: "KL Night Run 2026",
    date: "Sat, 12 Dec 2026",
    day: "12",
    month: "Dec",
    time: "8:00 PM",
    venue: "Dataran Merdeka",
    city: "Kuala Lumpur",
    lat: 3.1478,
    lng: 101.6937,
    description:
      "Run the city after dark on a closed-road route through the heart of KL. Glow sticks at every kilometre, a DJ at the finish line and a medal that lights up.",
    highlights: [
      "Closed-road city route",
      "Chip timing and live results",
      "Glow-in-the-dark finisher medal",
      "Post-run street party",
    ],
    tiers: [
      { id: "5k", name: "5K Fun Run", price: 69, note: "Race tee, bib, medal" },
      {
        id: "10k",
        name: "10K Run",
        price: 89,
        note: "Race tee, bib, medal, chip timing",
      },
      {
        id: "21k",
        name: "21K Half Marathon",
        price: 129,
        note: "Full kit, chip timing, finisher tee",
        left: 42,
      },
    ],
    badge: "Selling fast",
    featured: true,
  },
  {
    id: "midnight-pulse-festival-2026",
    photo: "midnight-pulse",
    type: "concerts",
    title: "Midnight Pulse Festival 2026",
    date: "Sat, 19 Dec 2026",
    day: "19",
    month: "Dec",
    time: "6:00 PM",
    venue: "Festival Grounds",
    city: "Sepang, Selangor",
    lat: 2.7608, // approximate: Sepang circuit area
    lng: 101.7381,
    description:
      "Two stages, eight acts and one very long night. The year's biggest outdoor music festival returns with a bigger main stage and a new late-night arena.",
    highlights: [
      "2 stages, 8 artists",
      "Food truck village",
      "Free shuttle from KLIA Transit",
      "Lockers and charging stations",
    ],
    tiers: [
      {
        id: "early",
        name: "Early Bird",
        price: 148,
        note: "General admission",
        soldOut: true,
      },
      {
        id: "ga",
        name: "General Admission",
        price: 188,
        note: "Standing, all stages",
      },
      {
        id: "vip",
        name: "VIP",
        price: 388,
        note: "Front pen, VIP lounge, express entry",
        left: 60,
      },
    ],
    badge: "Selling fast",
    featured: true,
  },
  {
    id: "ramadan-buffet-2027",
    photo: "ramadan-buffet",
    type: "bazaar-buffet",
    title: "Bazaar@Buffet Ramadan 2027",
    date: "12 Feb – 8 Mar 2027",
    day: "12",
    month: "Feb",
    time: "6:30 PM daily",
    venue: "Dataran Glow",
    city: "Petaling Jaya",
    lat: 3.1073, // approximate: central PJ
    lng: 101.6067,
    description:
      "A buka puasa buffet with over 150 dishes, right beside a 120-stall Ramadan bazaar. Pick your date at the door, the pass is valid any evening of the month.",
    highlights: [
      "150+ dishes, live cooking stations",
      "120 bazaar stalls next door",
      "Surau and ample parking",
      "Valid any evening in Ramadan",
    ],
    tiers: [
      { id: "adult", name: "Adult", price: 79, note: "Ages 13 and above" },
      { id: "child", name: "Child", price: 39, note: "Ages 4–12" },
      { id: "senior", name: "Senior", price: 59, note: "Ages 60 and above" },
    ],
    badge: "New",
    featured: true,
  },
  {
    id: "hope-gala-dinner-2026",
    photo: "hope-gala",
    type: "charity",
    title: "Hope Gala Dinner 2026",
    date: "Sat, 5 Dec 2026",
    day: "5",
    month: "Dec",
    time: "7:30 PM",
    venue: "Grand Ballroom, [Hotel Name]",
    city: "Kuala Lumpur",
    lat: 3.1579, // approximate: KLCC, update when the hotel is confirmed
    lng: 101.7116,
    description:
      "A black-tie evening raising funds for children's education. Every seat funds a year of school supplies for one child. Dinner, live auction and performances.",
    highlights: [
      "5-course dinner",
      "Live charity auction",
      "Tax-exempt receipts",
      "100% of net proceeds donated",
    ],
    tiers: [
      {
        id: "seat",
        name: "Single Seat",
        price: 350,
        note: "One seat at a shared table",
      },
      {
        id: "table",
        name: "Table of 10",
        price: 3200,
        note: "Private table, name on screen",
      },
      {
        id: "gold",
        name: "Gold Sponsor Table",
        price: 10000,
        note: "Front table, logo on stage backdrop",
        left: 3,
      },
    ],
    badge: "Few seats left",
    featured: true,
  },
  {
    id: "jb-street-food-festival",
    photo: "jb-street-food",
    type: "bazaar-buffet",
    title: "Street Food Festival JB",
    date: "27 – 29 Nov 2026",
    day: "27",
    month: "Nov",
    time: "4:00 PM – 12:00 AM",
    venue: "Waterfront Park",
    city: "Johor Bahru",
    lat: 1.4594, // approximate: JB city waterfront
    lng: 103.7634,
    description:
      "Three nights of street food from across Malaysia and the region, with live bands and a night market. Entry is free, food passes save you money and queue time.",
    highlights: [
      "80 food stalls",
      "Live bands nightly",
      "Cashless food pass",
      "Family zone",
    ],
    tiers: [
      { id: "food", name: "Food Pass", price: 30, note: "RM35 food credit" },
      {
        id: "weekend",
        name: "Weekend Food Pass",
        price: 80,
        note: "RM100 credit, all 3 nights",
      },
    ],
  },
  {
    id: "putrajaya-sunrise-half",
    photo: "putrajaya-half",
    type: "running",
    title: "Putrajaya Sunrise Half Marathon",
    date: "Sun, 17 Jan 2027",
    day: "17",
    month: "Jan",
    time: "5:00 AM",
    venue: "Presint 2",
    city: "Putrajaya",
    lat: 2.934, // approximate: central Putrajaya
    lng: 101.693,
    description:
      "A flat, fast course around the lake, timed so you cross the bridges at sunrise. A good one for chasing a personal best.",
    highlights: [
      "Flat, fast course",
      "Pacers every 15 minutes",
      "Hydration every 2.5 km",
      "Finisher tee and medal",
    ],
    tiers: [
      {
        id: "10k",
        name: "10K",
        price: 99,
        note: "Bib, tee, medal, chip timing",
      },
      {
        id: "21k",
        name: "21K",
        price: 139,
        note: "Bib, tee, medal, chip timing",
      },
    ],
    badge: "New",
  },
  {
    id: "unplugged-under-the-stars",
    photo: "unplugged",
    type: "concerts",
    title: "Unplugged Under the Stars",
    date: "Sat, 23 Jan 2027",
    day: "23",
    month: "Jan",
    time: "8:00 PM",
    venue: "Outdoor Amphitheatre",
    city: "Genting Highlands",
    lat: 3.4237,
    lng: 101.7932,
    description:
      "An acoustic night in the cool hill air. Bring a jacket, grab a spot on the lawn and enjoy four sets under the stars.",
    highlights: [
      "4 acoustic sets",
      "Lawn and seated areas",
      "Hot drinks bar",
      "Shuttle from Gohtong Jaya",
    ],
    tiers: [
      {
        id: "lawn",
        name: "Lawn",
        price: 128,
        note: "Free seating on the lawn",
      },
      {
        id: "seat",
        name: "Reserved Seat",
        price: 228,
        note: "Numbered seat, front sections",
      },
    ],
  },
  {
    id: "charity-family-carnival",
    photo: "family-carnival",
    type: "charity",
    title: "Charity Family Carnival",
    date: "Sun, 13 Dec 2026",
    day: "13",
    month: "Dec",
    time: "9:00 AM – 5:00 PM",
    venue: "Esplanade",
    city: "George Town, Penang",
    lat: 5.4206,
    lng: 100.3436,
    description:
      "A day out for the whole family with games, food and performances. Ticket sales go to [Partner NGO]'s community kitchen programme.",
    highlights: [
      "Kids' games and rides",
      "Food stalls",
      "Stage performances",
      "Proceeds to community kitchens",
    ],
    tiers: [
      { id: "adult", name: "Adult", price: 15, note: "Ages 13 and above" },
      {
        id: "child",
        name: "Child",
        price: 10,
        note: "Ages 3–12, under 3 free",
      },
      {
        id: "family",
        name: "Family Pack",
        price: 40,
        note: "2 adults + 2 children",
      },
    ],
  },
];

export const BOOKING_FEE = 2; // RM per ticket

export function getListing(id: string) {
  return listings.find((l) => l.id === id);
}

export function fromPrice(l: Listing) {
  const open = l.tiers.filter((t) => !t.soldOut);
  return Math.min(...(open.length ? open : l.tiers).map((t) => t.price));
}

export { rm } from "./format";

export const ctaLabel = (l: Listing) =>
  l.type === "running" ? "Register Now" : "Buy Tickets";
