import { ArrowRight } from "lucide-react";
import ProductPreview from "./ProductPreview";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function Hero({ dict }: { dict: Dictionary }) {
  const { hero } = dict;
  return (
    <section id="top" className="pb-20 sm:pb-28">
      <div className="page-shell flex flex-col items-center pt-10 text-center sm:pt-14">
        <h1 className="font-serif text-[3rem] font-normal leading-[0.95] tracking-[-0.035em] text-ink sm:text-[4.5rem] lg:text-[5.5rem]">
          {hero.titleLine1} <br className="hidden sm:inline" />
          {hero.titleLine2}
        </h1>

        <ul className="mt-9 flex flex-col items-center gap-2 text-[13px] uppercase tracking-[0.2em] text-graphite sm:mt-10 sm:flex-row sm:gap-0">
          {hero.promises.map((item) => (
            <li
              key={item}
              className="sm:border-l sm:border-graphite/60 sm:px-7 sm:leading-none sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0"
            >
              {item}
            </li>
          ))}
        </ul>

        <a href="#demo" className="button-primary mt-9">
          {hero.cta}
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>

      <div className="page-shell mt-14 sm:mt-16">
        <ProductPreview dict={dict} />
      </div>
    </section>
  );
}
