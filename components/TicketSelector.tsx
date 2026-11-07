"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check,
  CreditCard,
  Landmark,
  Lock,
  Minus,
  Plus,
  QrCode,
  Wallet,
  X,
} from "lucide-react";
import { accentVars, getEvent } from "@/lib/events";
import { BOOKING_FEE, ctaLabel, getListing, rm } from "@/lib/listings";
import { ph } from "@/lib/site";

const MAX_PER_TIER = 10;

const payments = [
  { id: "fpx", label: "FPX online banking", icon: Landmark },
  { id: "card", label: "Credit or debit card", icon: CreditCard },
  { id: "ewallet", label: "E-wallet", icon: Wallet },
  { id: "duitnow", label: "DuitNow QR", icon: QrCode },
];

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-muted/60 focus:border-(--accent) focus:ring-4 focus:ring-(--accent)/15";

const label = "mb-1.5 block text-sm font-medium text-ink";

type Step = "closed" | "details" | "done";

export default function TicketSelector({ listingId }: { listingId: string }) {
  const l = getListing(listingId);
  const e = l ? getEvent(l.type) : undefined;

  const [qty, setQty] = useState<Record<string, number>>({});
  const [step, setStep] = useState<Step>("closed");
  const [order, setOrder] = useState("");
  const [payment, setPayment] = useState("fpx");
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Lock page scroll (without layout shift) and handle Escape while checkout is open.
  useEffect(() => {
    if (step === "closed") return;
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = "hidden";
    body.style.paddingRight = `${scrollbar}px`;

    const onKey = (ev: KeyboardEvent) => {
      if (ev.key !== "Escape") return;
      if (step === "done") finish();
      else setStep("closed");
    };
    document.addEventListener("keydown", onKey);

    return () => {
      body.style.overflow = "";
      body.style.paddingRight = "";
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  if (!l || !e) return null;

  const lines = l.tiers
    .filter((t) => (qty[t.id] ?? 0) > 0)
    .map((t) => ({ ...t, n: qty[t.id] }));
  const count = lines.reduce((s, t) => s + t.n, 0);
  const subtotal = lines.reduce((s, t) => s + t.n * t.price, 0);
  const fee = count * BOOKING_FEE;
  const total = subtotal + fee;
  const ticketWord = count === 1 ? "ticket" : "tickets";

  const change = (id: string, d: number) =>
    setQty((q) => ({
      ...q,
      [id]: Math.min(MAX_PER_TIER, Math.max(0, (q[id] ?? 0) + d)),
    }));

  const pay = (ev: FormEvent) => {
    ev.preventDefault();
    // Mock payment: no backend. Just make an order number and show the e-ticket.
    setOrder(`EV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    setStep("done");
  };

  function finish() {
    setStep("closed");
    setQty({});
  }

  const close = () => (step === "done" ? finish() : setStep("closed"));

  const sheet = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { y: 48, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 48, opacity: 0 },
      };

  return (
    <div style={accentVars(e)}>
      {/* ───────── Ticket tiers ───────── */}
      <div
        id="tickets"
        className="rounded-3xl border border-line bg-white p-5 sm:p-7"
      >
        <h2 className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
          {l.type === "running"
            ? "Choose your category"
            : "Choose your tickets"}
        </h2>

        <ul className="mt-6 space-y-3">
          {l.tiers.map((t) => {
            const n = qty[t.id] ?? 0;
            const selected = n > 0;
            return (
              <li
                key={t.id}
                className={`flex items-center gap-4 rounded-2xl border p-4 transition-colors sm:p-5 ${
                  t.soldOut
                    ? "border-line bg-canvas"
                    : selected
                      ? "border-(--accent) bg-(--accent)/5"
                      : "border-line"
                }`}
              >
                <div
                  className={`min-w-0 flex-1 ${t.soldOut ? "opacity-50" : ""}`}
                >
                  <p className="font-semibold text-ink">{t.name}</p>
                  {t.note && (
                    <p className="mt-0.5 text-sm/snug text-muted">{t.note}</p>
                  )}
                  <p className="mt-2 flex flex-wrap items-baseline gap-x-2.5">
                    <span className="font-display text-lg font-extrabold text-ink tabular-nums">
                      {rm(t.price)}
                    </span>
                    {t.left && !t.soldOut && (
                      <span className="text-xs font-semibold text-rose-700">
                        Only {t.left} left
                      </span>
                    )}
                  </p>
                </div>

                {t.soldOut ? (
                  <span className="shrink-0 text-sm font-medium text-muted">
                    Sold out
                  </span>
                ) : (
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => change(t.id, -1)}
                      disabled={n === 0}
                      aria-label={`Remove one ${t.name}`}
                      className="grid size-10 place-items-center rounded-full border border-line text-ink transition enabled:hover:border-ink disabled:opacity-30"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span
                      className="w-8 text-center font-semibold text-ink tabular-nums"
                      aria-live="polite"
                    >
                      {n}
                    </span>
                    <button
                      type="button"
                      onClick={() => change(t.id, 1)}
                      disabled={n >= MAX_PER_TIER}
                      aria-label={`Add one ${t.name}`}
                      className="grid size-10 place-items-center rounded-full bg-(--accent-btn) text-(--accent-on) transition enabled:hover:brightness-95 disabled:opacity-30"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <dl className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
          <div className="flex justify-between text-muted">
            <dt>
              Subtotal ({count} {ticketWord})
            </dt>
            <dd className="tabular-nums">{rm(subtotal)}</dd>
          </div>
          <div className="flex justify-between text-muted">
            <dt>Booking fee</dt>
            <dd className="tabular-nums">{rm(fee)}</dd>
          </div>
          <div className="flex justify-between pt-2 font-display text-lg font-extrabold text-ink">
            <dt>Total</dt>
            <dd className="tabular-nums">{rm(total)}</dd>
          </div>
        </dl>

        <button
          type="button"
          disabled={count === 0}
          onClick={() => setStep("details")}
          className="mt-6 hidden w-full items-center justify-center rounded-full bg-(--accent-btn) px-6 py-4 font-semibold text-(--accent-on) transition enabled:hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40 lg:flex"
        >
          {count === 0
            ? "Select tickets to continue"
            : `${ctaLabel(l)}, ${rm(total)}`}
        </button>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
          <Lock aria-hidden className="size-3.5" />
          Secure checkout. E-tickets sent instantly.
        </p>
      </div>

      {/* Spacer so the mobile bar never covers page content */}
      {count > 0 && <div aria-hidden className="h-24 lg:hidden" />}

      {mounted &&
        createPortal(
          <div style={accentVars(e)}>
            {/* ───────── Mobile checkout bar ───────── */}
            <AnimatePresence>
              {count > 0 && step === "closed" && (
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.25,
                    ease: "easeOut",
                  }}
                  className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-5 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
                >
                  <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-muted">
                        {count} {ticketWord}
                      </p>
                      <p className="font-display text-xl font-extrabold text-ink tabular-nums">
                        {rm(total)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep("details")}
                      className="rounded-full bg-(--accent-btn) px-7 py-3.5 font-semibold text-(--accent-on)"
                    >
                      Checkout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ───────── Checkout dialog ───────── */}
            <AnimatePresence>
              {step !== "closed" && (
                <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
                  <motion.div
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={close}
                    className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
                  />

                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="checkout-title"
                    {...sheet}
                    transition={
                      reduceMotion
                        ? { duration: 0.15 }
                        : { type: "spring", damping: 30, stiffness: 320 }
                    }
                    className={`relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[min(88dvh,52rem)] sm:rounded-3xl ${
                      step === "done"
                        ? "sm:max-w-md"
                        : "sm:max-w-xl lg:max-w-4xl"
                    }`}
                  >
                    {step === "details" ? (
                      <form
                        onSubmit={pay}
                        className="flex min-h-0 flex-1 flex-col"
                      >
                        {/* Header */}
                        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
                          <div className="min-w-0">
                            <h2
                              id="checkout-title"
                              className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl"
                            >
                              Checkout
                            </h2>
                            <p className="mt-0.5 truncate text-sm text-muted">
                              {l.title}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={close}
                            aria-label="Close checkout"
                            className="-mr-2 grid size-10 shrink-0 place-items-center rounded-full text-muted transition hover:bg-tint hover:text-ink"
                          >
                            <X className="size-5" />
                          </button>
                        </header>

                        {/* Scrollable body */}
                        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                          <div className="lg:grid lg:min-h-full lg:grid-cols-[20rem_1fr]">
                            {/* Order summary */}
                            <aside className="border-b border-line bg-canvas px-6 py-6 sm:px-8 lg:border-r lg:border-b-0 lg:py-8">
                              <p className="font-semibold text-ink">
                                {l.title}
                              </p>
                              <p className="mt-1 text-sm text-muted">
                                {l.date}, {l.time}
                              </p>
                              <p className="text-sm text-muted">
                                {l.venue}, {l.city}
                              </p>

                              <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm">
                                {lines.map((t) => (
                                  <li
                                    key={t.id}
                                    className="flex justify-between gap-4"
                                  >
                                    <span className="text-ink">
                                      {t.n} × {t.name}
                                    </span>
                                    <span className="shrink-0 text-muted tabular-nums">
                                      {rm(t.n * t.price)}
                                    </span>
                                  </li>
                                ))}
                                <li className="flex justify-between gap-4 text-muted">
                                  <span>Booking fee</span>
                                  <span className="tabular-nums">
                                    {rm(fee)}
                                  </span>
                                </li>
                                <li className="flex justify-between gap-4 border-t border-line pt-3 font-semibold text-ink">
                                  <span>Total</span>
                                  <span className="tabular-nums">
                                    {rm(total)}
                                  </span>
                                </li>
                              </ul>
                            </aside>

                            {/* Form */}
                            <div className="space-y-8 px-6 py-6 sm:px-8 lg:py-8">
                              <fieldset className="space-y-4">
                                <legend className="mb-4 font-semibold text-ink">
                                  {l.type === "running"
                                    ? "Runner details"
                                    : "Your details"}
                                </legend>
                                <div>
                                  <label htmlFor="co-name" className={label}>
                                    Full name
                                  </label>
                                  <input
                                    id="co-name"
                                    required
                                    autoComplete="name"
                                    autoFocus
                                    className={field}
                                    placeholder="As per IC"
                                  />
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                  <div>
                                    <label htmlFor="co-email" className={label}>
                                      Email
                                    </label>
                                    <input
                                      id="co-email"
                                      type="email"
                                      required
                                      autoComplete="email"
                                      className={field}
                                      placeholder="you@example.com"
                                    />
                                  </div>
                                  <div>
                                    <label htmlFor="co-phone" className={label}>
                                      Phone
                                    </label>
                                    <input
                                      id="co-phone"
                                      type="tel"
                                      required
                                      autoComplete="tel"
                                      className={field}
                                      placeholder="012-345 6789"
                                    />
                                  </div>
                                </div>
                                <p className="text-xs text-muted">
                                  Your e-tickets are sent to this email.
                                </p>
                              </fieldset>

                              <fieldset>
                                <legend className="mb-4 font-semibold text-ink">
                                  Payment method
                                </legend>
                                <div className="grid gap-2 sm:grid-cols-2">
                                  {payments.map((p) => {
                                    const active = payment === p.id;
                                    return (
                                      <label
                                        key={p.id}
                                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-medium transition has-focus-visible:ring-4 has-focus-visible:ring-(--accent)/20 ${
                                          active
                                            ? "border-(--accent) bg-(--accent)/5 text-ink"
                                            : "border-line text-muted hover:border-ink/30 hover:text-ink"
                                        }`}
                                      >
                                        <input
                                          type="radio"
                                          name="payment"
                                          value={p.id}
                                          checked={active}
                                          onChange={() => setPayment(p.id)}
                                          className="sr-only"
                                        />
                                        <p.icon
                                          aria-hidden
                                          className="size-5 shrink-0"
                                        />
                                        <span className="flex-1">
                                          {p.label}
                                        </span>
                                        <span
                                          aria-hidden
                                          className={`grid size-4.5 shrink-0 place-items-center rounded-full border transition ${
                                            active
                                              ? "border-(--accent) bg-(--accent)"
                                              : "border-line"
                                          }`}
                                        >
                                          {active && (
                                            <span className="size-1.5 rounded-full bg-white" />
                                          )}
                                        </span>
                                      </label>
                                    );
                                  })}
                                </div>
                              </fieldset>
                            </div>
                          </div>
                        </div>

                        {/* Sticky footer: always visible, never drowned */}
                        <footer className="shrink-0 border-t border-line bg-white px-6 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-8 sm:pb-5">
                          <div className="flex items-center justify-between gap-4">
                            <div className="lg:hidden">
                              <p className="text-xs text-muted">
                                {count} {ticketWord}
                              </p>
                              <p className="font-display text-lg font-extrabold text-ink tabular-nums">
                                {rm(total)}
                              </p>
                            </div>
                            <p className="hidden text-xs text-muted lg:block">
                              Demo only. No payment is taken.
                            </p>
                            <button
                              type="submit"
                              className="inline-flex items-center justify-center gap-2 rounded-full bg-(--accent-btn) px-7 py-3.5 font-semibold text-(--accent-on) transition hover:brightness-95 lg:px-10"
                            >
                              <Lock aria-hidden className="size-4" />
                              Pay {rm(total)}
                            </button>
                          </div>
                        </footer>
                      </form>
                    ) : (
                      <>
                        {/* Success */}
                        <div
                          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pt-8 pb-6 sm:px-8"
                          role="status"
                        >
                          <div className="text-center">
                            <span className="mx-auto grid size-12 place-items-center rounded-full bg-(--accent) text-(--accent-on)">
                              <Check
                                aria-hidden
                                className="size-6"
                                strokeWidth={2.5}
                              />
                            </span>
                            <h2
                              id="checkout-title"
                              className="mt-5 font-display text-2xl font-extrabold tracking-tight text-ink"
                            >
                              You’re going!
                            </h2>
                            <p className="mt-1.5 text-sm text-muted">
                              Your e-tickets have been sent to your email.
                            </p>
                          </div>

                          {/* E-ticket */}
                          <div className="mt-8 overflow-hidden rounded-2xl border border-line">
                            <div className="bg-(--accent) px-5 py-5 text-(--accent-on)">
                              <p className="text-xs font-medium opacity-80">
                                Order {order}
                              </p>
                              <p className="mt-1.5 font-display text-xl/tight font-extrabold">
                                {l.title}
                              </p>
                              <p className="mt-2 text-sm opacity-90">
                                {l.date}, {l.time}
                              </p>
                              <p className="text-sm opacity-90">
                                {l.venue}, {l.city}
                              </p>
                            </div>
                            <div className="flex items-center gap-5 border-t-2 border-dashed border-line p-5">
                              <Image
                                src={ph(240, 240, "QR Ticket")}
                                alt="QR code for your e-ticket"
                                width={104}
                                height={104}
                                className="size-26 shrink-0 rounded-lg"
                              />
                              <ul className="min-w-0 space-y-1 text-sm">
                                {lines.map((t) => (
                                  <li
                                    key={t.id}
                                    className="font-semibold text-ink"
                                  >
                                    {t.n} × {t.name}
                                  </li>
                                ))}
                                <li className="pt-1 text-muted">
                                  Paid {rm(total)}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <footer className="flex shrink-0 flex-col gap-2 border-t border-line px-6 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:flex-row sm:px-8 sm:pb-5">
                          <button
                            type="button"
                            onClick={finish}
                            className="flex-1 rounded-full bg-ink px-6 py-3.5 font-semibold text-white transition hover:bg-ink-soft"
                          >
                            Done
                          </button>
                          <Link
                            href="/events"
                            onClick={finish}
                            className="flex-1 rounded-full px-6 py-3.5 text-center font-semibold text-ink ring-1 ring-line transition hover:bg-tint"
                          >
                            More events
                          </Link>
                        </footer>
                      </>
                    )}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </div>
  );
}
