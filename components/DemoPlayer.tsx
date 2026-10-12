"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  FileText,
  Folder,
  Library,
  LoaderCircle,
  Paperclip,
  Pause,
  Play,
  Search,
  Star,
  type LucideIcon,
} from "lucide-react";
import { SITE_NAME } from "@/lib/site";
import { FINAL_T, LIBRARY_DOCS, T, TICK_MS, frameAt } from "@/lib/demoTimeline";
import type { Dictionary } from "@/app/[lang]/dictionaries";

// Démo animée du produit. Données entièrement fictives.

type Preview = Dictionary["preview"];

const MENU: { key: keyof Preview["menu"]; icon: LucideIcon }[] = [
  { key: "search", icon: Search },
  { key: "documents", icon: Library },
  { key: "cases", icon: Folder },
  { key: "favorites", icon: Star },
];

export default function DemoPlayer({ preview }: { preview: Preview }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const [inView, setInView] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  // Mouvement réduit : pas de lecture automatique, image finale + bouton Lancer.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (!query.matches) return;
      setUserPaused(true);
      setT(FINAL_T);
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.1,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const playing = inView && !userPaused;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setT((prev) => (prev + TICK_MS >= T.end ? 0 : prev + TICK_MS)), TICK_MS);
    return () => clearInterval(id);
  }, [playing]);

  const f = frameAt(t, preview.question.length, preview.answer.length);
  const hasTyped = f.typedChars > 0;
  const files = preview.sources.map((s) => s.file);

  return (
    <div ref={rootRef}>
      <div
        aria-hidden="true"
        className="relative flex h-[42rem] overflow-hidden rounded-[10px] border border-line bg-[#FCFCFB] sm:h-[40rem]"
      >
        <aside className="hidden w-52 shrink-0 flex-col border-r border-line bg-sidebar px-3.5 pb-4 pt-5 md:flex lg:w-60">
          <p className="px-2 font-serif text-xl tracking-[-0.03em] text-ink">{SITE_NAME}</p>
          <ul className="mt-5 space-y-1">
            {MENU.map(({ key, icon: Icon }) => {
              const active = key === "search";
              return (
                <li
                  key={key}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] ${
                    active ? "bg-white text-ink shadow-[0_1px_2px_rgba(20,24,31,0.06)]" : "text-graphite"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.4} />
                  <span className="flex-1">{preview.menu[key]}</span>
                  {key === "documents" && (
                    <span className="text-[10px] tabular-nums text-stone">
                      {f.libraryDocs} · {f.libraryMb} Mo
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="mt-7 px-3 text-[10px] uppercase tracking-[0.12em] text-stone">{preview.recent}</p>
          <div className="mt-3 px-3 leading-tight">
            <p className="text-[13px] text-ink">{preview.recentItem}</p>
            <p className="mt-0.5 text-[10px] text-stone">{preview.recentAgo}</p>
          </div>

          <div className="mt-auto">
            <p
              className={`mb-3 flex items-center gap-2 border-t border-line px-2 pt-3 text-[11px] tabular-nums text-graphite transition-opacity duration-500 ${
                f.processing ? "opacity-100" : "opacity-0"
              }`}
            >
              <LoaderCircle size={13} strokeWidth={1.5} className="shrink-0 animate-spin" />
              <span className="truncate">{preview.processing.replace("{n}", String(f.libraryDocs))}</span>
            </p>
            <div className="flex items-center gap-3 rounded-md border border-line bg-white px-2.5 py-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[10px] text-white">
                AC
              </span>
              <span className="leading-tight">
                <span className="block text-[12px] text-ink">{preview.userName}</span>
                <span className="block text-[10px] text-stone">{preview.userRole}</span>
              </span>
            </div>
          </div>
        </aside>

        <div
          className={`relative min-w-0 flex-1 transition-opacity duration-500 ${
            f.fading ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="absolute right-4 top-4 flex items-center gap-2 text-[11px] text-graphite sm:right-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
            {preview.connected}
          </p>

          {/* Accueil : dépôt du corpus puis saisie de la question */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center px-5 transition-opacity duration-500 sm:px-10 ${
              f.showResults ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex min-h-[4.5rem] flex-wrap content-end justify-center gap-2 pb-5">
              {files.map((file, i) => (
                <span
                  key={file}
                  className={`flex items-center gap-2 rounded-md border border-line bg-white px-3 py-1.5 text-[11px] text-ink transition-all duration-500 ${
                    f.chipsOut
                      ? "translate-x-[-6rem] opacity-0"
                      : i < f.chipsVisible
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-3 opacity-0"
                  }`}
                >
                  <FileText size={14} strokeWidth={1.3} className="text-graphite" />
                  {file}
                </span>
              ))}
            </div>

            <h3 className="max-w-[34rem] text-center font-serif text-[1.45rem] leading-tight tracking-[-0.02em] text-ink sm:text-[1.75rem]">
              {preview.homeTitle}
            </h3>
            <p className="mt-3 max-w-[22rem] text-center text-[12px] leading-relaxed text-graphite">
              {preview.homeSubtitle}
            </p>

            <div className="mt-7 flex w-full max-w-[34rem] items-center gap-3 rounded-full border border-line bg-white py-2 pl-4 pr-2 text-[13px] shadow-[0_2px_10px_-4px_rgba(20,24,31,0.12)]">
              <Search size={15} strokeWidth={1.4} className="shrink-0 text-graphite" />
              <span className="min-h-[2.6em] min-w-0 flex-1 py-0.5 text-left leading-snug">
                {hasTyped ? (
                  <span className="text-ink">{preview.question.slice(0, f.typedChars)}</span>
                ) : (
                  <span className="text-stone">{preview.placeholder}</span>
                )}
                {f.caret && (
                  <span className="ml-px inline-block h-[1.05em] w-px translate-y-[0.15em] animate-blink bg-ink" />
                )}
              </span>
              <Paperclip size={15} strokeWidth={1.4} className="shrink-0 text-graphite" />
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                  hasTyped ? "bg-ink text-white" : "bg-black/[0.08] text-white"
                } ${f.sending ? "scale-90" : "scale-100"}`}
              >
                <ArrowRight size={14} strokeWidth={1.6} />
              </span>
            </div>
          </div>

          {/* Résultat : question, recherche, réponse en continu, sources */}
          <div
            className={`absolute inset-0 overflow-hidden px-5 pb-6 pt-14 transition-opacity duration-500 sm:px-8 lg:px-12 ${
              f.showResults ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mx-auto max-w-[44rem]">
              <div className="flex items-center justify-between gap-3 rounded-md border border-line bg-white py-1.5 pl-4 pr-1.5 text-[13px] text-ink">
                <span className="min-w-0 py-1.5 leading-snug">{preview.question}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/[0.06]">
                  <ArrowRight size={14} strokeWidth={1.5} />
                </span>
              </div>

              <div className="relative mt-5 rounded-lg border border-line/70 bg-white px-5 pb-5 pt-6 sm:px-7">
                {f.searching && (
                  <p className="flex items-center gap-2.5 text-[12px] text-graphite">
                    <LoaderCircle size={14} strokeWidth={1.5} className="animate-spin" />
                    {preview.searching.replace("{n}", String(LIBRARY_DOCS))}
                  </p>
                )}
                {f.answerChars > 0 && (
                  <p className="text-[13px] leading-[1.75] text-ink">
                    {preview.answer.slice(0, f.answerChars)}
                  </p>
                )}

                <div
                  className={`transition-opacity duration-500 ${
                    f.sourcesVisible > 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="mb-2.5 mt-7 text-xs text-ink">{preview.sourcesLabel}</p>
                  <ul className="divide-y divide-line rounded-md border border-line">
                    {preview.sources.map(({ file, page }, i) => (
                      <li
                        key={file}
                        className={`flex items-center gap-3 px-4 py-3 transition-all duration-500 sm:gap-4 ${
                          i < f.sourcesVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                        }`}
                      >
                        <FileText size={20} strokeWidth={1.2} className="shrink-0 text-graphite" />
                        <span className="min-w-0 flex-1 leading-tight">
                          <span className="block truncate text-xs text-ink">{file}</span>
                          <span className="mt-1 block text-[10px] text-stone">{preview.caseName}</span>
                        </span>
                        <span className="text-[11px] text-stone">{page}</span>
                        <ExternalLink size={15} strokeWidth={1.3} className="ml-2 shrink-0 text-graphite sm:ml-6" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={() => {
            if (userPaused && t === FINAL_T) setT(0);
            setUserPaused((p) => !p);
          }}
          className="inline-flex min-h-9 items-center gap-2 rounded-[3px] px-3 text-[12px] text-graphite transition-colors hover:text-ink"
        >
          {userPaused ? <Play size={13} strokeWidth={1.5} /> : <Pause size={13} strokeWidth={1.5} />}
          {userPaused ? preview.play : preview.pause}
        </button>
      </div>
    </div>
  );
}
