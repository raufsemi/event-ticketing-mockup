import Image from "next/image";
import { ph } from "@/lib/site";

type Props = {
  label: string;
  count?: number;
  prefix?: string;
  dark?: boolean;
};

/** Infinite-scrolling strip of placeholder logos. */
export default function LogoStrip({ label, count = 8, prefix = "Client Logo", dark }: Props) {
  const logos = Array.from({ length: count }, (_, i) => `${prefix} ${i + 1}`);
  const bg = dark ? "1C1C24" : "F1F6EE";
  const fg = dark ? "A1A1AA" : "5B6660";

  return (
    <div>
      <p className={`mb-8 text-center text-sm font-semibold ${dark ? "text-white/60" : "text-muted"}`}>{label}</p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {[...logos, ...logos].map((name, i) => (
            <li key={i} aria-hidden={i >= count}>
              <Image
                src={ph(320, 128, name, bg, fg)}
                alt={i < count ? name : ""}
                width={160}
                height={64}
                className="h-16 w-40 rounded-xl opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
