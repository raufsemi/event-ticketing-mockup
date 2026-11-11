import type { Metadata } from "next";
import { listings } from "@/lib/listings";
import EventsBrowser from "@/components/EventsBrowser";

export const metadata: Metadata = {
  title: "Upcoming Events & Tickets",
  description:
    "Buy tickets for upcoming runs, food festivals, charity events and concerts in Malaysia.",
};

export default function EventsPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-5 pt-16 pb-14 sm:px-6 sm:pt-24 sm:pb-20 lg:px-8">
          <h1 className="max-w-3xl font-display text-5xl/[1.02] font-extrabold tracking-tight text-balance sm:text-6xl/[1.02]">
            Upcoming events
          </h1>
          <p className="mt-6 max-w-xl text-lg/relaxed text-pretty text-white/65">
            {listings.length} events across Malaysia. Pick one, choose your
            tickets and get your e-ticket straight away.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <EventsBrowser />
      </div>
    </>
  );
}
