import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Newsreader, Inter } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { LOCALES, DEFAULT_LOCALE, hasLocale } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";
import "../globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { meta } = await getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: meta.title, template: `%s · ${SITE_NAME}` },
    description: meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { fr: "/fr", en: "/en", "x-default": `/${DEFAULT_LOCALE}` },
    },
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      siteName: SITE_NAME,
      title: meta.title,
      description: meta.description,
      url: `/${lang}`,
    },
    twitter: { card: "summary", title: meta.title, description: meta.description },
  };
}

export const viewport: Viewport = {
  themeColor: "#F7F6F2",
  colorScheme: "light",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { meta } = await getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "On-premise",
    description: meta.description,
    url: `${SITE_URL}/${lang}`,
    inLanguage: lang,
  };

  return (
    <html lang={lang} className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[3px] focus:bg-brass focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          {meta.skipLink}
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
