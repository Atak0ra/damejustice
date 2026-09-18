import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const { RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !RESEND_TO_EMAIL) {
    return NextResponse.json({ error: "Configuration email manquante" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const organisation = typeof body?.organisation === "string" ? body.organisation.trim() : "";

  if (!name || !EMAIL_RE.test(email) || !organisation) {
    return NextResponse.json({ error: "Champs invalides" }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [RESEND_TO_EMAIL],
      reply_to: email,
      subject: `Nouvelle demande d'accès bêta : ${name}`,
      text: `Nom : ${name}\nEmail : ${email}\nProfession / Organisation : ${organisation}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Échec de l'envoi" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
