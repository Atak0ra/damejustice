import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dict={dict} />
      <main id="contenu">
        <Hero dict={dict} />
        <DemoSection lang={lang} dict={dict} />
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
