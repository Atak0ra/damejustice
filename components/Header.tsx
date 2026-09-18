import BalanceIcon from "@/components/BalanceIcon";

export default function Header() {
  return (
    <header className="border-b border-codex-navy/15">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#top" className="flex items-center gap-2 font-caslon text-lg tracking-tight text-ink">
          <BalanceIcon className="h-5 w-5" />
          Dame <span className="text-seal-red">Justice</span>
        </a>
        <a
          href="#inscription"
          className="border border-seal-red px-4 py-2 text-sm text-seal-red transition-colors hover:bg-seal-red hover:text-vellum"
        >
          Demander un accès Bêta
        </a>
      </div>
    </header>
  );
}
