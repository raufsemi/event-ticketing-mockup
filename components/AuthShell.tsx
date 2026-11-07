import { CalendarCheck2, QrCode, Ticket } from "lucide-react";

const perks = [
  { icon: Ticket, title: "All your tickets in one place", desc: "Every booking saved to your account, ready at the gate." },
  { icon: QrCode, title: "Instant e-tickets", desc: "Scan straight from your phone. No printing, no queues." },
  { icon: CalendarCheck2, title: "Plan your own events", desc: "Send enquiries and track quotes from your dashboard." },
];

/** Split layout shared by the login and register pages. */
export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100dvh-4rem)] lg:grid-cols-2">
      <section className="flex items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
        <div className="w-full max-w-md">
          <p className="text-sm font-semibold tracking-[0.14em] text-brand-ink uppercase">{eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{title}</h1>
          <p className="mt-3 text-muted">{subtitle}</p>
          <div className="mt-8 rounded-3xl bg-white p-6 shadow-[0_24px_60px_-30px_rgba(15,26,18,0.35)] ring-1 ring-line sm:p-8">
            {children}
          </div>
        </div>
      </section>

      <aside className="relative isolate hidden overflow-hidden bg-ink text-white lg:flex lg:items-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-24 size-[28rem] rounded-full bg-brand/25 blur-3xl" />
          <div className="absolute -right-24 bottom-0 size-[24rem] rounded-full bg-[#8B5CF6]/25 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        </div>
        <div className="mx-auto max-w-lg px-12 py-16">
          <p className="font-display text-4xl leading-tight font-extrabold tracking-tight text-balance">
            Your events, your tickets<span className="text-brand">.</span> One account.
          </p>
          <ul className="mt-10 space-y-6">
            {perks.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/8 text-brand ring-1 ring-white/15">
                  <p.icon className="size-5" />
                </span>
                <span>
                  <span className="block font-semibold">{p.title}</span>
                  <span className="mt-0.5 block text-sm text-white/65">{p.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
