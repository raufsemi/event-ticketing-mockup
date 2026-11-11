// Company-wide details. Change these in one place.
export const site = {
  name: "Sorak",
  tagline: "Events that move people.",
  phoneDisplay: "+60 12-345 6789",
  whatsapp: "60123456789",
  email: "hello@yourcompany.my",
  address: [
    "Level 8, Menara Placeholder",
    "Jalan Contoh, 50450 Kuala Lumpur",
    "Malaysia",
  ],
  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/",
  },
};

export const whatsappLink = (text = "Hi! I'd like to plan an event.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

/** Labelled placeholder image from placehold.co (PNG so next/image can optimise it). */
export function ph(
  w: number,
  h: number,
  label: string,
  bg = "E4E9E1",
  fg = "5B6660",
) {
  return `https://placehold.co/${w}x${h}/${bg}/${fg}/png?text=${encodeURIComponent(label)}`;
}
