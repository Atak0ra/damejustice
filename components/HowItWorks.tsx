const STEPS = [
  {
    number: "Art. 01",
    title: "Indexation des textes",
    body: "Codes, actes uniformes OHADA, jurisprudences et journaux officiels sont ingérés et structurés avec leurs métadonnées : juridiction, date, branche du droit et rang dans la hiérarchie des normes.",
  },
  {
    number: "Art. 02",
    title: "Recherche sémantique ciblée",
    body: "La recherche s'appuie sur des représentations entraînées au vocabulaire juridique et filtre par juridiction, matière et rang normatif. Pas une recherche par mots-clés génériques.",
  },
  {
    number: "Art. 03",
    title: "Réponse sourcée et vérifiée",
    body: "Chaque réponse est générée exclusivement à partir des passages retrouvés, avec citation précise de l'article et du paragraphe. Une passe de vérification contrôle les citations avant affichage.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-b border-codex-navy/15">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2 className="font-caslon text-3xl text-ink md:text-4xl">Comment ça marche</h2>

        <div className="mt-12 divide-y divide-codex-navy/15 border-t border-codex-navy/15">
          {STEPS.map((step) => (
            <div key={step.number} className="grid gap-2 py-8 md:grid-cols-[8rem_1fr] md:gap-8">
              <p className="font-plex-mono text-sm text-seal-red">{step.number}</p>
              <div className="max-w-prose">
                <h3 className="font-caslon text-xl text-ink">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-slate">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
