"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavSection } from "@/lib/types";

type SidebarProps = {
  sections: NavSection[];
  onNavigate?: () => void;
};

export function Sidebar({ sections, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentação" className="space-y-6">
      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {section.title}
          </h2>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "block rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                        : "block rounded-md px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    }
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
