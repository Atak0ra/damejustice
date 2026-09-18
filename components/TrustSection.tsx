const PRINCIPLES = [
  {
    title: "Ancrage documentaire strict",
    body: "Aucune réponse n'est générée au-delà des passages effectivement retrouvés dans le corpus indexé.",
  },
  {
    title: "Hiérarchie des normes respectée",
    body: "Traités, lois et règlements sont pondérés selon leur rang, jamais traités comme des sources interchangeables.",
  },
  {
    title: "Traçabilité intégrale",
    body: "Chaque affirmation renvoie à un article et un paragraphe précis, consultable en un clic.",
  },
  {
    title: "Revue par juristes",
    body: "La terminologie et le pipeline de restitution sont validés par des juristes praticiens, pas seulement par des ingénieurs.",
  },
];

export default function TrustSection() {
  return (
    <section className="border-b border-codex-navy/15 bg-codex-navy text-vellum">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2 className="font-caslon text-3xl md:text-4xl">
          Pourquoi nos algorithmes respectent le droit
        </h2>

        <div className="mt-14 grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="border-l border-vellum/25 pl-5">
                <h3 className="font-plex text-base font-medium">{p.title}</h3>
                <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-vellum/70">
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          <div className="border border-vellum/20 bg-ink/20 p-6 md:p-8">
            <p className="text-sm text-vellum/60">Requête</p>
            <p className="mt-2 font-plex text-base">
              Quel délai pour introduire un recours en cassation devant la CCJA ?
            </p>

            <p className="mt-6 text-sm text-vellum/60">Réponse</p>
            <p className="mt-2 leading-relaxed text-vellum/90">
              Le pourvoi doit être formé dans un délai de deux mois à compter
              de la signification de la décision attaquée
              <sup className="ml-0.5 text-seal-red">[1]</sup>.
            </p>

            <div className="mt-6 border-t border-vellum/20 pt-4">
              <p className="font-plex-mono text-xs text-vellum/60">
                [1] Art. 28, Règlement de procédure CCJA, Journal Officiel OHADA
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
