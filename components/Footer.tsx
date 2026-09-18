export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-codex-navy text-vellum/70">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="font-caslon text-sm text-vellum">
            Dame <span className="text-seal-red">Justice</span>
          </p>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="/mentions-legales" className="hover:text-vellum">
              Mentions légales
            </a>
            <a href="/confidentialite" className="hover:text-vellum">
              Confidentialité
            </a>
            <a
              href="https://compeel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-vellum"
            >
              Un produit du studio Compeel
            </a>
          </nav>
        </div>

        <p className="mt-6 text-xs text-vellum/50">
          © {year} Dame Justice. Les informations fournies ne constituent pas
          un conseil juridique.
        </p>
      </div>
    </footer>
  );
}
