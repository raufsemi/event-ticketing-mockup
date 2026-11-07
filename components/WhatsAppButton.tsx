"use client";

import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./BrandIcons";

/** Floating WhatsApp chat button, rendered once in the root layout. */
export default function WhatsAppButton() {
  // Sits above the mobile tab bar, or the checkout bar on event pages (same height).
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`group fixed right-4 z-50 bottom-[calc(5rem+env(safe-area-inset-bottom))] lg:bottom-6 flex items-center gap-2 rounded-full bg-whatsapp p-3 text-ink sm:p-3.5 shadow-lg shadow-black/20 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-xl sm:right-6`}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp opacity-25 motion-reduce:hidden" />
      <WhatsAppIcon className="size-6 sm:size-7" />
      <span className="hidden pr-1 text-sm font-semibold sm:group-hover:inline">Chat with us</span>
    </a>
  );
}
