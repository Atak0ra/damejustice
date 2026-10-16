import Image from "next/image";
import { ArrowRight, Plug, Search, ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const icons = [ShieldCheck, Plug, Search];

export default function OnPremiseSection({ dict }: { dict: Dictionary }) {
  const t = dict.onPremise;
  return (
    <section id="securite" className="scroll-mt-8 border-t border-line py-20 sm:py-28">
      <div className="page-shell lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[13px] uppercase tracking-[0.2em] text-brass-deep">{t.kicker}</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.02] tracking-[-0.03em] text-ink text-balance sm:text-5xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-graphite text-balance">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:mt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <figure className="flex flex-col items-center">
            <div className="relative w-full max-w-md rounded-[10px] border border-line bg-white px-6 py-10 shadow-[0_24px_60px_-30px_rgba(20,24,31,0.2)] sm:px-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-1/2 h-2/3 -translate-y-1/2 rounded-full bg-brass/20 blur-3xl"
              />
              <Image
                src="/damejustice-box-gold.png"
                alt={t.imageAlt}
                width={1500}
                height={1500}
                sizes="(min-width: 1024px) 400px, 80vw"
                className="relative mx-auto h-auto w-full mix-blend-multiply"
              />
            </div>
            <figcaption className="mt-8 max-w-sm border-t border-brass/50 pt-5 text-center text-[15px] leading-[1.65] text-ink/80">
              {t.note}
            </figcaption>
          </figure>

          <ul className="grid gap-4">
            {t.cards.map((card, i) => {
              const Icon = icons[i];
              return (
                <li key={card.title} className="flex gap-5 rounded-[10px] border border-line bg-white p-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-[3px] bg-paper text-brass-deep">
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl tracking-[-0.01em] text-ink">{card.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-graphite">{card.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-12 flex justify-center">
          <a href="#demo" className="button-primary">
            {t.cta}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
