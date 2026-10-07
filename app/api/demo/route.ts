import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/site";
import { DEFAULT_LOCALE, hasLocale, type Locale } from "@/lib/i18n";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SIZES = ["1-10", "11-50", "51-200", "200+"];

const MESSAGES: Record<Locale, Record<"required" | "tooLong" | "email" | "size" | "notConfigured" | "send", string>> = {
  fr: {
    required: "Merci de remplir tous les champs obligatoires.",
    tooLong: "Un champ dépasse la longueur autorisée.",
    email: "Adresse email invalide.",
    size: "Taille de structure invalide.",
    notConfigured: "Formulaire non configuré.",
    send: "Envoi impossible pour le moment.",
  },
  en: {
    required: "Please fill in all required fields.",
    tooLong: "A field exceeds the allowed length.",
    email: "Invalid email address.",
    size: "Invalid organization size.",
    notConfigured: "Form not configured.",
    send: "Unable to send right now.",
  },
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const field = (body: unknown, key: string) => {
  const value = (body as Record<string, unknown> | null)?.[key];
  return typeof value === "string" ? value.trim() : "";
};

// Retire les retours à la ligne pour empêcher l'injection d'en-têtes dans l'objet.
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ");

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  // Champ piège invisible : un humain ne le remplit jamais. On répond OK sans rien envoyer.
  if (field(body, "website")) {
    return NextResponse.json({ ok: true });
  }

  const langField = field(body, "lang");
  const lang: Locale = hasLocale(langField) ? langField : DEFAULT_LOCALE;
  const m = MESSAGES[lang];

  const firstName = field(body, "firstName");
  const lastName = field(body, "lastName");
  const organization = field(body, "organization");
  const email = field(body, "email");
  const size = field(body, "size");
  const message = field(body, "message");

  if (!firstName || !lastName || !organization || !email) {
    return NextResponse.json({ error: m.required }, { status: 400 });
  }
  if ([firstName, lastName, organization, email, size].some((value) => value.length > 200) || message.length > 2000) {
    return NextResponse.json({ error: m.tooLong }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: m.email }, { status: 400 });
  }
  if (size && !SIZES.includes(size)) {
    return NextResponse.json({ error: m.size }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: m.notConfigured }, { status: 500 });
  }

  const rows: [string, string][] = [
    ["Prénom", firstName],
    ["Nom", lastName],
    ["Cabinet / Organisation", organization],
    ["Email", email],
    ["Taille de la structure", size || "Non précisée"],
    ["Message", message || "—"],
    ["Langue du visiteur", lang.toUpperCase()],
  ];

  const title = "Nouvelle demande de démonstration DameJustice";

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "DameJustice <onboarding@resend.dev>",
      to: process.env.RESEND_TO_EMAIL ?? CONTACT_EMAIL,
      replyTo: email,
      subject: oneLine(`Demande de démo DameJustice · ${organization} · ${firstName} ${lastName}`),
      text: `${title}\n\n${rows.map(([label, value]) => `${label} : ${value}`).join("\n")}`,
      html: `<h2>${title}</h2><table cellpadding="6" style="border-collapse:collapse">${rows
        .map(
          ([label, value]) =>
            `<tr><td valign="top"><strong>${label}</strong></td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
        )
        .join("")}</table>`,
    });

    if (error) {
      return NextResponse.json({ error: m.send }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: m.send }, { status: 500 });
  }
}
