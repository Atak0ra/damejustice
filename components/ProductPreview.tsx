import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  FileText,
  Folder,
  ListFilter,
  Search,
  Star,
  type LucideIcon,
} from "lucide-react";
import { SITE_NAME } from "@/lib/site";
import type { Dictionary } from "@/app/[lang]/dictionaries";

// Maquette illustrative en HTML : données entièrement fictives.

const MENU_ICONS: { key: "search" | "documents" | "cases" | "favorites"; icon: LucideIcon }[] = [
  { key: "search", icon: Search },
  { key: "documents", icon: FileText },
  { key: "cases", icon: Folder },
  { key: "favorites", icon: Star },
];

export default function ProductPreview({ dict }: { dict: Dictionary }) {
  const { preview } = dict;
  return (
    <figure className="mx-auto max-w-[72rem]">
      <div className="rounded-[14px] border border-line bg-white/60 p-1.5 shadow-[0_40px_90px_-30px_rgba(20,24,31,0.25),0_8px_24px_-12px_rgba(20,24,31,0.12)] sm:p-2">
        <div
          aria-hidden="true"
          className="flex min-h-[34rem] overflow-hidden rounded-[10px] border border-line bg-[#FCFCFB] sm:min-h-[40rem]"
        >
          <aside className="hidden w-52 shrink-0 flex-col border-r border-line bg-sidebar px-3.5 pb-5 pt-5 md:flex lg:w-60">
            <p className="px-2 font-serif text-xl tracking-[-0.03em] text-ink">{SITE_NAME}</p>
            <hr className="mx-2 mt-4 border-line" />
            <ul className="mt-8 space-y-1">
              {MENU_ICONS.map(({ key, icon: Icon }) => {
                const active = key === "search";
                const label = preview.menu[key];
                return (
                <li
                  key={label}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] ${
                    active ? "bg-black/[0.05] text-ink" : "text-graphite"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.4} />
                  {label}
                </li>
                );
              })}
            </ul>
            <div className="mt-auto flex items-center gap-3 px-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.06] text-xs text-ink">
                AC
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] text-ink">{preview.userName}</span>
                <span className="block text-[11px] text-stone">{preview.userRole}</span>
              </span>
            </div>
          </aside>

          <div className="min-w-0 flex-1 px-4 pb-8 pt-5 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between md:justify-end">
              <p className="font-serif text-lg tracking-[-0.03em] text-ink md:hidden">{SITE_NAME}</p>
              <p className="flex items-center gap-2 text-[11px] text-graphite">
                <ListFilter size={13} strokeWidth={1.4} />
                {preview.filter}
                <ChevronDown size={13} strokeWidth={1.4} />
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-[44rem] sm:mt-14">
              <div className="flex items-center justify-between gap-3 rounded-md border border-line bg-white py-1.5 pl-4 pr-1.5 text-[13px] text-ink">
                <span className="min-w-0 py-1.5 leading-snug">{preview.question}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/[0.06]">
                  <ArrowRight size={14} strokeWidth={1.5} />
                </span>
              </div>

              <div className="mt-5 rounded-lg border border-line/70 bg-white px-5 pb-5 pt-6 sm:px-7">
                <p className="text-[13px] leading-[1.75] text-ink">
                  {preview.answer}
                </p>

                <p className="mb-2.5 mt-8 text-xs text-ink">{preview.sourcesLabel}</p>
                <ul className="divide-y divide-line rounded-md border border-line">
                  {preview.sources.map(({ file, page }) => (
                    <li key={file} className="flex items-center gap-3 px-4 py-3 sm:gap-4">
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
      <figcaption className="sr-only">
        {preview.caption}
      </figcaption>
    </figure>
  );
}
