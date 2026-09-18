"use client";

import { FormEvent, useState } from "react";
import BalanceIcon from "@/components/BalanceIcon";

const SOURCES = ["Code civil togolais"];

export default function Hero() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    try {
      window.localStorage.setItem("damejustice_prefill_email", trimmed);
    } catch {
      // stockage indisponible, on continue sans pré-remplissage
    }
    document.getElementById("inscription")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="top" className="border-b border-codex-navy/15">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-28">
        <div>
          <BalanceIcon animate className="h-14 w-14 text-seal-red" />

          <span className="mt-6 inline-block border border-seal-red/60 px-3 py-1 text-sm text-seal-red">
            Bêta fermée. Réservée aux professionnels du droit
          </span>

          <h1 className="mt-8 font-caslon text-4xl leading-[1.15] text-ink md:text-5xl">
            Le droit togolais, interrogé sans jamais être inventé.
          </h1>

          <p className="mt-6 max-w-prose text-base leading-relaxed text-slate md:text-lg">
            Dame Justice indexe le droit togolais et les actes uniformes
            OHADA qui s&apos;appliquent au Togo, puis répond en citant
            précisément la source et son rang dans la hiérarchie des normes.
            Jamais une approximation.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="hero-email" className="sr-only">
              Adresse email professionnelle
            </label>
            <input
              id="hero-email"
              type="email"
              required
              placeholder="vous@cabinet.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-0 border-b border-ink/30 bg-transparent px-1 py-2 text-ink placeholder:text-slate/60 focus:border-seal-red"
            />
            <button
              type="submit"
              className="whitespace-nowrap bg-seal-red px-5 py-2.5 text-sm text-vellum transition-colors hover:bg-ink"
            >
              Rejoindre la bêta
            </button>
          </form>
        </div>

        <div className="border-l border-codex-navy/20 pl-6 md:pt-2">
          <p className="text-sm text-slate">Corpus déjà indexé</p>
          <ul className="mt-4 space-y-3">
            {SOURCES.map((source) => (
              <li
                key={source}
                className="border-b border-codex-navy/10 pb-3 font-plex text-sm text-ink"
              >
                {source}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
