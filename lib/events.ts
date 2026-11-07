import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Building2,
  Camera,
  ClipboardList,
  Droplets,
  Footprints,
  HandCoins,
  HandHeart,
  Headphones,
  HeartHandshake,
  Lightbulb,
  MapPinned,
  Medal,
  Megaphone,
  MicVocal,
  Music2,
  PlugZap,
  Presentation,
  Route,
  Shirt,
  ShieldCheck,
  Speaker,
  Stethoscope,
  Store,
  Tent,
  Ticket,
  Timer,
  TrafficCone,
  Trash2,
  Users,
  Utensils,
} from "lucide-react";
import { ph } from "./site";
import type { PhotoKey } from "./photos";

export type EventSlug = "running" | "bazaar-buffet" | "charity" | "concerts";

export type Provide = { title: string; desc: string; icon: LucideIcon };
export type PastEvent = {
  name: string;
  date: string;
  venue: string;
  pax: string;
};

export type EventType = {
  slug: EventSlug;
  name: string;
  icon: LucideIcon;
  /** Cover photo, see lib/photos.ts. */
  photo: PhotoKey;
  /** One-liner used on cards. */
  summary: string;
  headline: string;
  description: string;
  examples: string[];
  colors: {
    /** Decorative fills, glows, icon chips. */
    accent: string;
    /** Accent used for text on light backgrounds (AA contrast). */
    ink: string;
    /** Button fill and the text colour that sits on it. */
    button: string;
    onButton: string;
    /** placehold.co background / foreground for this type's images. */
    phBg: string;
    phFg: string;
  };
  dark?: boolean;
  provides: Provide[];
  pastEvents: PastEvent[];
  gallery: string[];
};

export const events: EventType[] = [
  {
    slug: "running",
    photo: "type-running",
    name: "Running",
    icon: Footprints,
    summary:
      "Fun runs, marathons, themed and corporate runs, from route to finish line.",
    headline: "Race days that run on time.",
    description:
      "From a 5K fun run in the park to a full city marathon, we handle the whole race: the route, the permits, the kits, the timing and the finisher zone. Your runners get a smooth start line and a finish worth the medal.",
    examples: ["Fun runs", "Marathons", "Themed runs", "Corporate runs"],
    colors: {
      accent: "#F97316",
      ink: "#C2410C",
      button: "#F97316",
      onButton: "#0F1A12",
      phBg: "FED7AA",
      phFg: "9A3412",
    },
    provides: [
      {
        title: "Route planning",
        desc: "Certified distances, scenic routes and safe U-turn points.",
        icon: Route,
      },
      {
        title: "Permits & traffic control",
        desc: "Police, council and road closure approvals handled.",
        icon: TrafficCone,
      },
      {
        title: "Race kits",
        desc: "Bibs, event tees and finisher medals, designed and packed.",
        icon: Shirt,
      },
      {
        title: "Timing system",
        desc: "Chip timing with live results and e-certificates.",
        icon: Timer,
      },
      {
        title: "Hydration stations",
        desc: "Water and isotonic points spaced along the route.",
        icon: Droplets,
      },
      {
        title: "Medical team",
        desc: "Paramedics, ambulances and first-aid points on standby.",
        icon: Stethoscope,
      },
      {
        title: "Finisher zone",
        desc: "Medal handout, refreshments, photo walls and recovery area.",
        icon: Medal,
      },
      {
        title: "Online registration",
        desc: "Branded sign-up page with payments and kit collection slots.",
        icon: ClipboardList,
      },
    ],
    pastEvents: [
      {
        name: "City Night Run 2025",
        date: "Sep 2025",
        venue: "Kuala Lumpur",
        pax: "8,000 runners",
      },
      {
        name: "Corporate Wellness Run",
        date: "Jun 2025",
        venue: "Putrajaya",
        pax: "2,500 runners",
      },
      {
        name: "Neon Glow 5K",
        date: "Mar 2025",
        venue: "Shah Alam",
        pax: "4,200 runners",
      },
      {
        name: "Hills Half Marathon",
        date: "Nov 2024",
        venue: "Bukit Jalil",
        pax: "6,000 runners",
      },
    ],
    gallery: [
      "Flag-off Photo",
      "Runners on Route",
      "Hydration Station",
      "Finisher Zone",
      "Medal Close-up",
      "Podium Photo",
    ],
  },
  {
    slug: "bazaar-buffet",
    photo: "type-bazaar",
    name: "Bazaar@Buffet",
    icon: Utensils,
    summary:
      "Food bazaars, Ramadan markets and buffet-style festivals people queue for.",
    headline: "Food crowds, beautifully organised.",
    description:
      "Ramadan bazaars, food festivals and community markets live or die on layout, vendors and crowd flow. We plan the site, recruit and manage the vendors, power and light every booth, and keep the place clean from first customer to last.",
    examples: [
      "Ramadan bazaars",
      "Food festivals",
      "Community markets",
      "Buffet events",
    ],
    colors: {
      accent: "#EAB308",
      ink: "#A16207",
      button: "#EAB308",
      onButton: "#0F1A12",
      phBg: "FEF08A",
      phFg: "854D0E",
    },
    provides: [
      {
        title: "Site layout & booth planning",
        desc: "Booth grids, dining areas and walkways drawn to scale.",
        icon: MapPinned,
      },
      {
        title: "Vendor recruitment",
        desc: "Curated vendor mix, contracts, payments and briefings.",
        icon: Store,
      },
      {
        title: "Canopies",
        desc: "Uniform canopies and tables in sizes that suit each vendor.",
        icon: Tent,
      },
      {
        title: "Electrical & lighting",
        desc: "Licensed wiring, power points per booth and night lighting.",
        icon: PlugZap,
      },
      {
        title: "Cleanliness & waste",
        desc: "Cleaning crew, bins, grease traps and recycling points.",
        icon: Trash2,
      },
      {
        title: "Crowd flow",
        desc: "Entry points, queue lanes and marshals at peak hours.",
        icon: Users,
      },
      {
        title: "Promotion",
        desc: "Social campaigns, influencer visits and on-site signage.",
        icon: Megaphone,
      },
    ],
    pastEvents: [
      {
        name: "Ramadan Bazaar 2025",
        date: "Mar 2025",
        venue: "Petaling Jaya",
        pax: "120 vendors",
      },
      {
        name: "Street Food Festival",
        date: "Dec 2024",
        venue: "Johor Bahru",
        pax: "35,000 visitors",
      },
      {
        name: "Weekend Community Market",
        date: "Monthly",
        venue: "Subang Jaya",
        pax: "60 vendors",
      },
      {
        name: "Grand Buffet Carnival",
        date: "Aug 2024",
        venue: "Melaka",
        pax: "18,000 visitors",
      },
    ],
    gallery: [
      "Bazaar Aisle at Dusk",
      "Food Stall Close-up",
      "Canopy Rows",
      "Dining Area",
      "Vendor at Work",
      "Night Lighting",
    ],
  },
  {
    slug: "charity",
    photo: "type-charity",
    name: "Charity",
    icon: HandHeart,
    summary:
      "Charity dinners, fundraisers and community programmes that raise more.",
    headline: "Events that give back.",
    description:
      "A good charity event makes the cause feel close. We shape the fundraising idea, set up the venue and stage, look after your sponsors, and run the programme so guests stay moved and keep giving.",
    examples: ["Charity dinners", "Fundraising events", "Community programmes"],
    colors: {
      accent: "#E11D48",
      ink: "#BE123C",
      button: "#E11D48",
      onButton: "#FFFFFF",
      phBg: "FECDD3",
      phFg: "9F1239",
    },
    provides: [
      {
        title: "Fundraising concept",
        desc: "Event format, ticket tiers and giving moments that convert.",
        icon: Lightbulb,
      },
      {
        title: "Venue & stage setup",
        desc: "Ballroom or open-air setups, staging, AV and décor.",
        icon: Building2,
      },
      {
        title: "Sponsor management",
        desc: "Packages, sponsor visibility and post-event reports.",
        icon: HeartHandshake,
      },
      {
        title: "Donation collection",
        desc: "QR, online and on-site pledges with clear tracking.",
        icon: HandCoins,
      },
      {
        title: "MC & programme flow",
        desc: "Run-of-show, MC scripts and timed stage cues.",
        icon: Presentation,
      },
      {
        title: "Media coverage",
        desc: "Press invites, photo and video, and social highlights.",
        icon: Camera,
      },
    ],
    pastEvents: [
      {
        name: "Hope Gala Dinner",
        date: "Oct 2025",
        venue: "Kuala Lumpur",
        pax: "800 guests",
      },
      {
        name: "Back-to-School Drive",
        date: "Jan 2025",
        venue: "Klang",
        pax: "1,200 students",
      },
      {
        name: "Charity Run & Carnival",
        date: "Jul 2024",
        venue: "Penang",
        pax: "3,000 attendees",
      },
      {
        name: "Community Iftar Programme",
        date: "Mar 2024",
        venue: "Selangor",
        pax: "2,000 guests",
      },
    ],
    gallery: [
      "Gala Dinner Ballroom",
      "Donation Cheque Handover",
      "Stage Programme",
      "Volunteers Group Photo",
      "Sponsor Wall",
      "Community Programme",
    ],
  },
  {
    slug: "concerts",
    photo: "type-concerts",
    name: "Concerts",
    icon: Music2,
    summary:
      "Concerts, live shows and festivals with the full production behind them.",
    headline: "Lights up. Crowd ready.",
    description:
      "Big stages need tight production. We bring the stage, sound and lighting, look after the artists, sell the tickets and keep the crowd safe, so the only thing your audience remembers is the show.",
    examples: ["Concerts", "Live shows", "Music festivals"],
    colors: {
      accent: "#8B5CF6",
      ink: "#6D28D9",
      button: "#7C3AED",
      onButton: "#FFFFFF",
      phBg: "2E1065",
      phFg: "C4B5FD",
    },
    dark: true,
    provides: [
      {
        title: "Stage, sound & lighting",
        desc: "Stage builds, line arrays and full lighting design.",
        icon: Speaker,
      },
      {
        title: "Artist management",
        desc: "Bookings, riders, transport and green rooms.",
        icon: MicVocal,
      },
      {
        title: "Ticketing",
        desc: "Online sales, tiers, e-tickets and gate scanning.",
        icon: Ticket,
      },
      {
        title: "Security & crowd control",
        desc: "Barricades, trained crew and emergency plans.",
        icon: ShieldCheck,
      },
      {
        title: "Backstage operations",
        desc: "Stage managers, changeovers and run-of-show cues.",
        icon: Headphones,
      },
      {
        title: "Permits",
        desc: "PUSPAL, council and police approvals, filed on time.",
        icon: BadgeCheck,
      },
    ],
    pastEvents: [
      {
        name: "Midnight Pulse Festival",
        date: "Aug 2025",
        venue: "Sepang",
        pax: "25,000 fans",
      },
      {
        name: "Unplugged Under the Stars",
        date: "May 2025",
        venue: "Genting Highlands",
        pax: "4,000 fans",
      },
      {
        name: "Campus Live Tour",
        date: "Feb 2025",
        venue: "5 universities",
        pax: "12,000 fans",
      },
      {
        name: "New Year Countdown Show",
        date: "Dec 2024",
        venue: "Kuala Lumpur",
        pax: "30,000 fans",
      },
    ],
    gallery: [
      "Main Stage Wide Shot",
      "Crowd with Lights",
      "Artist on Stage",
      "Lighting Rig",
      "Backstage Crew",
      "Festival Grounds",
    ],
  },
];

export const eventSlugs = events.map((e) => e.slug);

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function isEventSlug(
  value: string | null | undefined,
): value is EventSlug {
  return !!value && eventSlugs.includes(value as EventSlug);
}

export function eventImage(e: EventType, w: number, h: number, label: string) {
  return ph(w, h, label, e.colors.phBg, e.colors.phFg);
}

/* Page extras --------------------------------------------------------- */

export const raceDayTimeline = [
  {
    time: "4:30 AM",
    title: "Assembly & warm-up",
    desc: "Runners gather, bag drop opens, group warm-up on stage.",
  },
  {
    time: "5:30 AM",
    title: "Flag-off",
    desc: "Waves released by category, longest distance first.",
  },
  {
    time: "6:30 AM",
    title: "Fun run start",
    desc: "5K and family runners hit the route.",
  },
  {
    time: "7:15 AM",
    title: "First finishers",
    desc: "Timing mats record splits, live results go online.",
  },
  {
    time: "8:00 AM",
    title: "Finisher zone",
    desc: "Medals, refreshments, recovery and photo walls.",
  },
  {
    time: "10:00 AM",
    title: "Prize giving",
    desc: "Podium ceremony, lucky draws and closing.",
  },
];

export const raceKit = ["Finisher Medal", "Race Tee", "Race Bib", "Goodie Bag"];

export const boothLegend = [
  { label: "Food booths", desc: "3m x 3m canopies with power" },
  { label: "Dining zone", desc: "Shaded seating near the middle" },
  { label: "Entry & exit", desc: "Separate lanes for smooth flow" },
  { label: "Services", desc: "Surau, wash points and waste station" },
];

export const impactStats = [
  {
    value: 2.4,
    prefix: "RM ",
    suffix: "M",
    decimals: 1,
    label: "Funds raised",
  },
  { value: 18000, suffix: "+", label: "Beneficiaries helped" },
  { value: 45, label: "NGO partners" },
  { value: 60, suffix: "+", label: "Charity events" },
];

export const lineup = {
  headliners: ["Neon Monsoon", "Velvet Durian"],
  main: [
    "The Kopi Collective",
    "Luna Arcade",
    "Static Orchid",
    "Midnight Mamak",
  ],
  support: [
    "Echo Lane",
    "Sunday Satay Club",
    "Glasshouse",
    "Ria & The Rumours",
    "Paper Lanterns",
    "Kid Kampung",
  ],
};

/* Homepage content ---------------------------------------------------- */

export const portfolio: {
  slug: EventSlug;
  title: string;
  meta: string;
  photo: PhotoKey;
}[] = [
  {
    slug: "running",
    title: "City Night Run",
    meta: "Kuala Lumpur · 8,000 runners",
    photo: "past-city-night-run",
  },
  {
    slug: "concerts",
    title: "Midnight Pulse Festival",
    meta: "Sepang · 25,000 fans",
    photo: "past-festival",
  },
  {
    slug: "bazaar-buffet",
    title: "Ramadan Bazaar",
    meta: "Petaling Jaya · 120 vendors",
    photo: "past-ramadan-bazaar",
  },
  {
    slug: "charity",
    title: "Hope Gala Dinner",
    meta: "Kuala Lumpur · 800 guests",
    photo: "past-gala",
  },
  {
    slug: "running",
    title: "Neon Glow 5K",
    meta: "Shah Alam · 4,200 runners",
    photo: "putrajaya-half",
  },
  {
    slug: "bazaar-buffet",
    title: "Street Food Festival",
    meta: "Johor Bahru · 35,000 visitors",
    photo: "past-street-food",
  },
  {
    slug: "charity",
    title: "Back-to-School Drive",
    meta: "Klang · 1,200 students",
    photo: "past-school-drive",
  },
  {
    slug: "concerts",
    title: "New Year Countdown",
    meta: "Kuala Lumpur · 30,000 fans",
    photo: "past-countdown",
  },
];

export const testimonials = [
  {
    quote:
      "Our corporate run had 2,500 staff and not one complaint about kit collection. The team sorted permits we didn't even know we needed.",
    name: "Client Name",
    role: "HR Director, [Client Company]",
  },
  {
    quote:
      "Every vendor had power, every aisle stayed clean, and the crowd kept moving even at buka puasa. We'll be back next Ramadan.",
    name: "Client Name",
    role: "Bazaar Organiser, [Client Company]",
  },
  {
    quote:
      "The gala raised more than our target. They found the sponsors, ran the stage and sent us a full report a week later.",
    name: "Client Name",
    role: "Chairperson, [Partner NGO]",
  },
  {
    quote:
      "Sound was perfect, changeovers were fast and the crowd felt safe all night. Felt like working with a touring crew.",
    name: "Client Name",
    role: "Promoter, [Client Company]",
  },
];

export const stats = [
  { value: 350, suffix: "+", label: "Events delivered" },
  { value: 500, suffix: "K+", label: "Participants & attendees" },
  { value: 120, suffix: "+", label: "Clients served" },
  { value: 12, label: "Years of experience" },
];

/** CSS variables so components can use bg-(--accent), text-(--accent-ink) etc. */
export function accentVars(e: EventType) {
  return {
    "--accent": e.colors.accent,
    "--accent-ink": e.colors.ink,
    "--accent-btn": e.colors.button,
    "--accent-on": e.colors.onButton,
  } as React.CSSProperties;
}
