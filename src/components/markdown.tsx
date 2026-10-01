import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Pencil } from "lucide-react";
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
  return (
    <article className="mx-auto max-w-3xl">
      <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:inline prose-img:my-0">
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
  );
}
