"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { NavSection } from "@/lib/types";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

type DocsShellProps = {
  sections: NavSection[];
  children: React.ReactNode;
};

export function DocsShell({ sections, children }: DocsShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />

      <div className="mx-auto flex max-w-7xl">
        {menuOpen && (
          <div
            className="fixed inset-0 top-14 z-30 bg-zinc-950/40 lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        <aside
          id="sidebar"
          className={`fixed inset-y-0 left-0 top-14 z-30 w-72 overflow-y-auto border-r border-zinc-200 bg-white px-4 py-6 transition-transform dark:border-zinc-800 dark:bg-zinc-950 lg:sticky lg:h-[calc(100vh-3.5rem)] lg:w-64 lg:shrink-0 lg:translate-x-0 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar sections={sections} onNavigate={() => setMenuOpen(false)} />
        </aside>

        <main className="min-w-0 flex-1 px-4 py-10 sm:px-8 lg:px-12">{children}</main>
      </div>
    </>
  );
}
