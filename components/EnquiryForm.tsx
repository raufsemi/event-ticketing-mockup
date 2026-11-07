"use client";

import { Suspense, useCallback, useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Send } from "lucide-react";
import { accentVars, events, getEvent, isEventSlug, type EventSlug } from "@/lib/events";

/**
 * Reads ?type=running (or the #contact?type=running form) and reports it up.
 * Kept in its own Suspense boundary so the rest of the form prerenders statically.
 */
function TypeFromUrl({ onType }: { onType: (slug: EventSlug, vendor: boolean) => void }) {
  const params = useSearchParams();

  useEffect(() => {
    const read = () => {
      const hashQuery = window.location.hash.split("?")[1] ?? "";
      const hashParams = new URLSearchParams(hashQuery);
      const type = params.get("type") ?? hashParams.get("type");
      const vendor = (params.get("enquiry") ?? hashParams.get("enquiry")) === "vendor";
      if (isEventSlug(type)) onType(type, vendor);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [params, onType]);

  return null;
}

const input =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted/60 transition outline-none focus:border-(--accent,var(--color-brand-deep)) focus:ring-4 focus:ring-(--accent,var(--color-brand))/15";

function Field({ label, htmlFor, children, hint }: { label: string; htmlFor: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export default function EnquiryForm() {
  const [type, setType] = useState<EventSlug | "">("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const selected = type ? getEvent(type) : undefined;

  // Stable identity so the URL reader only re-runs when the URL changes,
  // not after every keystroke (which would undo a manual dropdown change).
  const handleType = useCallback((slug: EventSlug, vendor: boolean) => {
    setType(slug);
    if (vendor) setMessage((m) => m || "I'd like to join as a vendor. My food / product is: ");
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // UI only for now: no backend yet.
    setSent(true);
  };

  const reset = () => {
    setSent(false);
    setType("");
    setMessage("");
  };

  return (
    <div style={selected ? accentVars(selected) : undefined} className="relative">
      <Suspense fallback={null}>
        <TypeFromUrl onType={handleType} />
      </Suspense>

      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[28rem] flex-col items-center justify-center rounded-3xl bg-white p-8 text-center ring-1 ring-line"
            role="status"
          >
            <span className="grid size-16 place-items-center rounded-full bg-brand/15 text-brand-ink">
              <CheckCircle2 className="size-8" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-ink">Thanks, we&apos;ve got it.</h3>
            <p className="mt-2 max-w-sm text-muted">
              Our team will reply within one working day. For anything urgent, tap the WhatsApp button.
            </p>
            <button type="button" onClick={reset} className="mt-6 text-sm font-semibold text-brand-ink underline-offset-4 hover:underline">
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            onSubmit={onSubmit}
            className="grid gap-5 rounded-3xl bg-white p-6 shadow-[0_24px_60px_-30px_rgba(15,26,18,0.35)] ring-1 ring-line sm:grid-cols-2 sm:p-8"
          >
            <Field label="Full name" htmlFor="name">
              <input id="name" name="name" required autoComplete="name" placeholder="Your name" className={input} />
            </Field>
            <Field label="Phone number" htmlFor="phone">
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                placeholder="012-345 6789"
                className={input}
              />
            </Field>
            <Field label="Email" htmlFor="email">
              <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={input} />
            </Field>
            <Field label="Event type" htmlFor="type">
              <div className="relative">
              <select
                id="type"
                name="type"
                required
                value={type}
                onChange={(e) => setType(e.target.value as EventSlug)}
                className={`${input} appearance-none pr-10`}
              >
                <option value="" disabled>
                  Choose one
                </option>
                {events.map((e) => (
                  <option key={e.slug} value={e.slug}>
                    {e.name}
                  </option>
                ))}
              </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-muted" aria-hidden />
              </div>
            </Field>
            <Field label="Estimated pax" htmlFor="pax">
              <input id="pax" name="pax" type="number" min={1} inputMode="numeric" placeholder="e.g. 500" className={input} />
            </Field>
            <Field label="Event date" htmlFor="date" hint="A rough date is fine.">
              <input id="date" name="date" type="date" className={input} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Tell us about your event" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Location, budget range, anything you already have in mind."
                  className={`${input} resize-y`}
                />
              </Field>
            </div>
            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted">We reply within one working day.</p>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-(--accent-btn,var(--color-brand)) px-7 py-3.5 font-semibold text-(--accent-on,var(--color-ink)) transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
              >
                <Send className="size-4" />
                {selected ? `Send ${selected.name} Enquiry` : "Send Enquiry"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
