import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Pencil } from "lucide-react";
import { getHeadings } from "@/lib/docs";
import { editUrl } from "@/lib/site";
import type { Doc } from "@/lib/types";

// Converte links relativos para outros .md em rotas do site,
// para que funcionem tanto no GitHub quanto aqui.
function resolveHref(href: string, filePath: string) {
  if (/^([a-z]+:|#|\/)/i.test(href)) return href;
  const [target, hash] = href.split("#");
  if (!target.endsWith(".md")) return href;

  const resolved = path.posix.join(path.posix.dirname(filePath), target).replace(/\.md$/, "");
  const route = resolved === "index" || resolved === "README" ? "/" : `/${resolved}`;
  return hash ? `${route}#${hash}` : route;
}

export function Markdown({ doc }: { doc: Doc }) {
  const headings = getHeadings(doc.content);

  return (
    <div className="mx-auto flex max-w-5xl gap-10">
      <article className="min-w-0 max-w-3xl flex-1">
        <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:inline prose-img:my-0 prose-pre:bg-zinc-900 prose-table:text-sm">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
            components={{
              a: ({ href = "", children }) => {
                const url = resolveHref(href, doc.filePath);
                if (url.startsWith("/")) return <Link href={url}>{children}</Link>;
                if (url.startsWith("#")) return <a href={url}>{children}</a>;
                return (
                  <a href={url} target="_blank" rel="noreferrer">
                    {children}
                  </a>
                );
              },
              table: ({ children }) => (
                <div className="overflow-x-auto">
                  <table>{children}</table>
                </div>
              ),
            }}
          >
            {doc.content}
          </ReactMarkdown>
        </div>

        <footer className="mt-12 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <a
            href={editUrl(doc.filePath)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <Pencil className="h-4 w-4" />
            Editar no GitHub
          </a>
        </footer>
      </article>

      {headings.length > 1 && (
        <aside className="hidden w-56 shrink-0 xl:block">
          <nav aria-label="Nesta página" className="sticky top-24">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Nesta página
            </h2>
            <ul className="space-y-2 border-l border-zinc-200 text-sm dark:border-zinc-800">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className="-ml-px block border-l border-transparent pl-3 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
    </div>
  );
}
