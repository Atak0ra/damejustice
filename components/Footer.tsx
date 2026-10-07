import { COMPANY_NAME, COMPANY_URL, SITE_NAME } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const linkClass = "inline-flex min-h-11 items-center hover:text-ink";

export default function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { footer } = dict;

  return (
    <footer className="border-t border-line">
      <div className="page-shell flex flex-col gap-4 py-10 text-sm text-graphite md:flex-row md:items-center md:justify-between lg:px-12">
        <p>
          © {new Date().getFullYear()} {SITE_NAME}. {footer.productBefore}
          <a
            href={COMPANY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-ink"
          >
            {COMPANY_NAME}
          </a>
          {footer.productAfter}
        </p>
        <ul className="flex flex-wrap items-center gap-x-6">
          <li>
            <a href={`/${lang}#demo`} className={linkClass}>
              {footer.contact}
            </a>
          </li>
          <li>
            <a href={`/${lang}/mentions-legales`} className={linkClass}>
              {footer.legal}
            </a>
          </li>
          <li>
            <a href={`/${lang}/confidentialite`} className={linkClass}>
              {footer.privacy}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
