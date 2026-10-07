import { LOCALES, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ lang, label }: { lang: Locale; label: string }) {
  return (
    <nav aria-label={label}>
      <ul className="flex items-center text-[13px] uppercase tracking-[0.14em]">
        {LOCALES.map((locale, index) => (
          <li key={locale} className={index > 0 ? "ml-2 border-l border-line pl-2" : undefined}>
            <a
              href={`/${locale}`}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === lang ? "true" : undefined}
              className={`inline-flex min-h-11 items-center px-1 transition-colors hover:text-ink ${
                locale === lang ? "text-ink" : "text-stone"
              }`}
            >
              {locale}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
