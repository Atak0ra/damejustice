"use client";

import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-[4px] border border-line bg-paper px-3 py-3 text-base text-ink placeholder:text-stone focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass";
const labelClass = "mb-2 block text-sm text-graphite";

export default function DemoForm({ lang, t }: { lang: Locale; t: Dictionary["form"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [sentTo, setSentTo] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(result.error ?? t.genericError);
        setStatus("error");
        return;
      }

      setSentTo(String(data.email ?? ""));
      setStatus("success");
    } catch {
      setErrorMessage(t.networkError);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-xl border border-brass/40 bg-brass/10 p-7">
        <p className="mb-2 font-serif text-2xl text-ink">{t.successTitle}</p>
        <p className="text-base leading-relaxed text-graphite">
          {t.successBefore}
          {sentTo ? `${t.successTo}${sentTo}` : ""}
          {t.successAfter}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label={t.ariaLabel}
      aria-busy={status === "loading"}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="demo-firstName" className={labelClass}>{t.firstName}</label>
          <input id="demo-firstName" name="firstName" type="text" autoComplete="given-name" required maxLength={200} className={inputClass} />
        </div>
        <div>
          <label htmlFor="demo-lastName" className={labelClass}>{t.lastName}</label>
          <input id="demo-lastName" name="lastName" type="text" autoComplete="family-name" required maxLength={200} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="demo-organization" className={labelClass}>{t.organization}</label>
        <input id="demo-organization" name="organization" type="text" autoComplete="organization" required maxLength={200} className={inputClass} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="demo-email" className={labelClass}>{t.email}</label>
          <input id="demo-email" name="email" type="email" autoComplete="email" required maxLength={200} className={inputClass} />
        </div>
        <div>
          <label htmlFor="demo-size" className={labelClass}>{t.size}</label>
          <select id="demo-size" name="size" defaultValue="" className={inputClass}>
            {t.sizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="demo-message" className={labelClass}>{t.message}</label>
        <textarea id="demo-message" name="message" rows={4} maxLength={2000} className={inputClass} />
      </div>

      {/* Champ piège anti-spam : invisible pour les humains. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="demo-website">{t.honeypot}</label>
        <input id="demo-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-xs leading-relaxed text-graphite">
        {t.privacyBefore}
        <a href={`/${lang}/confidentialite`} className="underline underline-offset-4 hover:text-ink">
          {t.privacyLink}
        </a>
        {t.privacyAfter}
      </p>

      {status === "error" && (
        <p role="alert" className="border-l-2 border-[#B4452F] pl-3 text-base text-ink">
          {errorMessage}
        </p>
      )}

      <button type="submit" disabled={status === "loading"} className="button-primary w-full sm:w-auto">
        <Send size={16} strokeWidth={1.5} aria-hidden="true" />
        {status === "loading" ? t.sending : t.submit}
      </button>
    </form>
  );
}
