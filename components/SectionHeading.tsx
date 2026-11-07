import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
};

export default function SectionHeading({ eyebrow, title, subtitle, align = "left", dark, className = "" }: Props) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-[0.14em] ${
            dark ? "text-(--accent-ink,var(--color-brand))" : "text-(--accent-ink,var(--color-brand-ink))"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed text-pretty sm:text-lg ${dark ? "text-white/70" : "text-muted"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
