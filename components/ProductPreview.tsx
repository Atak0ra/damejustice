import DemoPlayer from "./DemoPlayer";
import type { Dictionary } from "@/app/[lang]/dictionaries";

// Démo illustrative animée : données entièrement fictives.
// La légende (sr-only) porte la question, la réponse et les sources pour les
// lecteurs d'écran et les moteurs de recherche, l'animation étant aria-hidden.

export default function ProductPreview({ dict }: { dict: Dictionary }) {
  const { preview } = dict;
  return (
    <figure className="mx-auto max-w-[72rem]">
      <div className="rounded-[14px] border border-line bg-white/60 p-1.5 shadow-[0_40px_90px_-30px_rgba(20,24,31,0.25),0_8px_24px_-12px_rgba(20,24,31,0.12)] sm:p-2">
        <DemoPlayer preview={preview} />
      </div>
      <figcaption className="sr-only">
        {preview.caption} {preview.question} {preview.answer}
      </figcaption>
    </figure>
  );
}
