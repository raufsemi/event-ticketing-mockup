import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { events } from "@/lib/events";
import { site, whatsappLink } from "@/lib/site";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "./BrandIcons";

const socials = [
  { href: site.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.socials.tiktok, label: "TikTok", Icon: TikTokIcon },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-brand font-display text-sm font-extrabold text-ink">
              EV
            </span>
            <span className="font-display font-extrabold tracking-tight">
              {site.name}
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            {site.tagline} Running events, food bazaars, charity programmes and
            concerts across Malaysia.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-11 place-items-center rounded-full bg-white/8 text-white/80 ring-1 ring-white/10 transition hover:bg-white/15 hover:text-white"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Event Types</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/65">
            {events.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/${e.slug}`}
                  className="transition hover:text-white"
                >
                  {e.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Company</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/65">
            <li>
              <Link href="/events" className="transition hover:text-white">
                Events & Tickets
              </Link>
            </li>
            <li>
              <Link href="/#work" className="transition hover:text-white">
                Our Work
              </Link>
            </li>
            <li>
              <Link href="/#why" className="transition hover:text-white">
                Why Choose Us
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="transition hover:text-white">
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Visit or Call</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/65">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
              <address className="not-italic">
                {site.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </li>
            <li className="flex gap-3">
              <Phone className="size-4 shrink-0 text-brand" />
              <a href={`tel:+${site.whatsapp}`} className="hover:text-white">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="size-4 shrink-0 text-brand" />
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-ink transition hover:brightness-95"
          >
            <WhatsAppIcon className="size-5" />
            WhatsApp Us
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p>Mockup for review. Images and figures are placeholders.</p>
        </div>
      </div>
    </footer>
  );
}
