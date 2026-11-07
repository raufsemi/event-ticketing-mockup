import Form from "next/form";
import { Search } from "lucide-react";

/** Search box that sends people to /events?q=… (works without JavaScript). */
export default function HeroSearch() {
  return (
    <Form action="/events" className="relative flex items-center rounded-2xl bg-white p-1.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
      <label htmlFor="hero-q" className="sr-only">
        Search events
      </label>
      <Search aria-hidden className="pointer-events-none absolute left-4 size-5 text-muted" />
      <input
        id="hero-q"
        name="q"
        type="search"
        enterKeyHint="search"
        placeholder="Search events, venues or cities"
        className="min-w-0 flex-1 bg-transparent py-3 pr-2 pl-10 text-base text-ink placeholder:text-muted outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      <button
        type="submit"
        className="shrink-0 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-ink transition hover:bg-brand-deep hover:text-white sm:px-6"
      >
        Search
      </button>
    </Form>
  );
}
