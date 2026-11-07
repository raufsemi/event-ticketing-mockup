/**
 * Malaysia's 13 states and 3 federal territories.
 * `cities` is used to place a listing in a state from its `city` field.
 * Add a city here if one of your listings isn't being picked up.
 */
export type MyState = {
  slug: string;
  name: string;
  /** Local file in /public/flags. */
  flag: string;
  cities: string[];
};

export const states: MyState[] = [
  {
    slug: "johor",
    name: "Johor",
    cities: [
      "Johor Bahru",
      "JB",
      "Iskandar Puteri",
      "Batu Pahat",
      "Muar",
      "Kluang",
      "Desaru",
    ],
  },
  {
    slug: "kedah",
    name: "Kedah",
    cities: ["Alor Setar", "Langkawi", "Sungai Petani", "Kulim"],
  },
  { slug: "kelantan", name: "Kelantan", cities: ["Kota Bharu"] },
  {
    slug: "kuala-lumpur",
    name: "Kuala Lumpur",
    cities: [
      "Kuala Lumpur",
      "KL",
      "Bukit Jalil",
      "Cheras",
      "Bangsar",
      "Setapak",
    ],
  },
  { slug: "labuan", name: "Labuan", cities: ["Labuan", "Victoria"] },
  {
    slug: "melaka",
    name: "Melaka",
    cities: ["Melaka", "Malacca", "Alor Gajah", "Jasin"],
  },
  {
    slug: "negeri-sembilan",
    name: "Negeri Sembilan",
    cities: ["Seremban", "Port Dickson", "Nilai"],
  },
  {
    slug: "pahang",
    name: "Pahang",
    cities: [
      "Kuantan",
      "Genting Highlands",
      "Cameron Highlands",
      "Bentong",
      "Temerloh",
    ],
  },
  {
    slug: "penang",
    name: "Penang",
    cities: [
      "Penang",
      "Pulau Pinang",
      "George Town",
      "Georgetown",
      "Butterworth",
      "Bayan Lepas",
      "Batu Ferringhi",
    ],
  },
  {
    slug: "perak",
    name: "Perak",
    cities: ["Ipoh", "Taiping", "Teluk Intan", "Lumut", "Kampar"],
  },
  { slug: "perlis", name: "Perlis", cities: ["Kangar", "Arau"] },
  { slug: "putrajaya", name: "Putrajaya", cities: ["Putrajaya"] },
  {
    slug: "sabah",
    name: "Sabah",
    cities: ["Kota Kinabalu", "KK", "Sandakan", "Tawau", "Lahad Datu"],
  },
  {
    slug: "sarawak",
    name: "Sarawak",
    cities: ["Kuching", "Miri", "Sibu", "Bintulu"],
  },
  {
    slug: "selangor",
    name: "Selangor",
    cities: [
      "Shah Alam",
      "Petaling Jaya",
      "PJ",
      "Subang Jaya",
      "Klang",
      "Sepang",
      "Cyberjaya",
      "Puchong",
      "Kajang",
      "Bangi",
      "Rawang",
    ],
  },
  {
    slug: "terengganu",
    name: "Terengganu",
    cities: ["Kuala Terengganu", "Kemaman", "Dungun"],
  },
].map((s) => ({ ...s, flag: `/flags/${s.slug}.svg` }));

const norm = (s: string) => s.trim().toLowerCase();

/**
 * The state a city belongs to, or undefined if it isn't listed above.
 * Short codes like "KL" only match exactly, so "Klang" never lands in Kuala Lumpur.
 */
export function stateOf(city: string): MyState | undefined {
  const c = norm(city);
  return states.find(
    (s) =>
      norm(s.name) === c ||
      s.cities.some(
        (x) => c === norm(x) || (x.length > 3 && c.includes(norm(x))),
      ),
  );
}

export const getState = (slug: string) => states.find((s) => s.slug === slug);
