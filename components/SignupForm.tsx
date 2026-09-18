"use client";

import { FormEvent, useEffect, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    try {
      const prefill = window.localStorage.getItem("damejustice_prefill_email");
      if (prefill) {
        setEmail(prefill);
        window.localStorage.removeItem("damejustice_prefill_email");
      }
    } catch {
      // stockage indisponible, formulaire vide par défaut
    }
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, organisation: org }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div id="inscription" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-prose">
          <p className="font-plex-mono text-sm text-seal-red">Demande reçue</p>
          <h2 className="mt-3 font-caslon text-3xl text-ink">
            Votre demande d&apos;accès a bien été enregistrée.
          </h2>
          <p className="mt-4 leading-relaxed text-slate">
            Nous examinons les demandes par ordre d&apos;arrivée et revenons
            vers vous par email dès qu&apos;une place s&apos;ouvre dans la
            bêta.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section id="inscription" className="border-b border-codex-navy/15">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1fr]">
          <div>
            <h2 className="font-caslon text-3xl text-ink md:text-4xl">
              Demander un accès
            </h2>
            <p className="mt-4 max-w-prose leading-relaxed text-slate">
              La bêta est ouverte aux avocats, juristes d&apos;entreprise,
              chercheurs et universitaires. Chaque demande est examinée
              individuellement.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md space-y-6">
            <div>
              <label htmlFor="inscription-name" className="text-sm text-slate">
                Nom
              </label>
              <input
                id="inscription-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border-0 border-b border-ink/30 bg-transparent px-1 py-2 text-ink focus:border-seal-red"
              />
            </div>

            <div>
              <label htmlFor="inscription-email" className="text-sm text-slate">
                Email professionnel
              </label>
              <input
                id="inscription-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border-0 border-b border-ink/30 bg-transparent px-1 py-2 text-ink focus:border-seal-red"
              />
            </div>

            <div>
              <label htmlFor="inscription-org" className="text-sm text-slate">
                Profession / Organisation
              </label>
              <input
                id="inscription-org"
                type="text"
                required
                placeholder="Avocat, cabinet Dupont & Associés"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="mt-1 w-full border-0 border-b border-ink/30 bg-transparent px-1 py-2 text-ink placeholder:text-slate/50 focus:border-seal-red"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-seal-red px-5 py-3 text-sm text-vellum transition-colors hover:bg-ink disabled:opacity-60"
            >
              {status === "loading" ? "Envoi en cours…" : "Envoyer la demande"}
            </button>

            {status === "error" && (
              <p className="text-sm text-seal-red">
                L&apos;envoi a échoué. Vérifiez votre connexion et réessayez.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
