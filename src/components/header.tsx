import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { GithubIcon } from "./github-icon";
import { ThemeToggle } from "./theme-toggle";

type HeaderProps = {
  menuOpen: boolean;
  onToggleMenu: () => void;
};

export function Header({ menuOpen, onToggleMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4">
        <button
          type="button"
          onClick={onToggleMenu}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="sidebar"
          className="-ml-2 rounded-md p-2 text-zinc-600 hover:bg-zinc-100 lg:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link href="/" className="truncate font-semibold tracking-tight">
          {site.name}
        </Link>

        <div className="ml-auto flex items-center gap-1">
          <a
            href={site.repo}
            target="_blank"
            rel="noreferrer"
            aria-label="Repositório no GitHub"
            className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
