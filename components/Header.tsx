import { ArrowRight } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { SITE_NAME } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <header>
      <div className="page-shell flex h-20 items-center justify-between gap-3 sm:h-24 sm:gap-6 lg:px-12">
        <a
          href="#top"
          className="flex min-h-11 items-center font-serif text-xl font-normal leading-none tracking-[-0.03em] text-ink sm:text-[1.75rem]"
          aria-label={dict.header.homeLabel}
        >
          {SITE_NAME}
        </a>
        <div className="flex items-center gap-2 sm:gap-6">
          <LanguageSwitcher lang={lang} label={dict.header.languageLabel} />
          <a href="#demo" className="button-primary !px-3.5 !text-sm sm:!px-6 sm:!text-[15px]">
            {dict.header.cta}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" className="hidden sm:block" />
          </a>
        </div>
      </div>
    </header>
  );
}
