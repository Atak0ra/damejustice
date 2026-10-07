import DemoForm from "./DemoForm";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function DemoSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section id="demo" className="scroll-mt-8 border-t border-line py-20 sm:py-28">
      <div className="page-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-12">
        <div>
          <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.03em] text-ink text-balance sm:text-5xl">
            {dict.demo.title}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-graphite">{dict.demo.text}</p>
        </div>
        <div className="rounded-[10px] border border-line bg-white p-6 shadow-[0_24px_60px_-30px_rgba(20,24,31,0.2)] sm:p-8">
          <DemoForm lang={lang} t={dict.form} />
        </div>
      </div>
    </section>
  );
}
