import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { sectionTitles, site } from "./site";
import type { Doc, Heading, NavSection } from "./types";

const contentRoot = path.join(process.cwd(), site.contentDir);

function walk(dir: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(full);
      return entry.name.endsWith(".md") ? [full] : [];
    })
    .sort();
}

function humanize(name: string) {
  const text = name.replace(/[-_]+/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Remove emojis e símbolos do início ("☁️ Cloud" -> "Cloud").
function cleanTitle(title: string) {
  return title.replace(/^[^\p{L}\p{N}]+/u, "").trim();
}

// Tira a marcação inline de um título, como o rehype-slug enxerga o texto.
function plainText(markdown: string) {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*\*|__|`/g, "");
}

function readDoc(file: string): Doc {
  const filePath = path.relative(contentRoot, file).split(path.sep).join("/");
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const slug = filePath === "index.md" ? [] : filePath.replace(/\.md$/, "").split("/");
  const h1 = content.match(/^#\s+(.+)$/m)?.[1];
  const title = cleanTitle(data.title ?? (h1 ? plainText(h1) : humanize(slug.at(-1) ?? site.name)));

  return { slug, title, description: data.description, order: data.order, content, filePath };
}

export function getAllDocs(): Doc[] {
  return walk(contentRoot)
    .map(readDoc)
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
}

export function getDocBySlug(slug: string[]): Doc | undefined {
  const key = slug.join("/");
  return getAllDocs().find((doc) => doc.slug.join("/") === key);
}

// Títulos de nível 2 para o índice "Nesta página". Os ids seguem a mesma regra
// do rehype-slug, que numera títulos repetidos contando todos os níveis.
export function getHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inCode = false;

  for (const line of content.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) inCode = !inCode;
    if (inCode) continue;
    const match = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;
    const text = plainText(match[2]);
    const id = slugger.slug(text);
    if (match[1].length === 2) headings.push({ id, text: cleanTitle(text) });
  }

  return headings;
}

export function sectionTitle(folder: string) {
  return sectionTitles[folder] ?? humanize(folder);
}

export function getNavigation(): NavSection[] {
  const sections: NavSection[] = [];

  for (const doc of getAllDocs()) {
    if (doc.slug.length === 0) continue;
    const folder = doc.slug.length > 1 ? doc.slug[0] : "";
    const title = folder ? sectionTitle(folder) : "Outros";
    let section = sections.find((s) => s.title === title);
    if (!section) {
      section = { title, items: [] };
      sections.push(section);
    }
    section.items.push({ title: doc.title, href: `/${doc.slug.join("/")}` });
  }

  const known = Object.values(sectionTitles);
  const rank = (title: string) => {
    const i = known.indexOf(title);
    return i === -1 ? known.length : i;
  };
  sections.sort((a, b) => rank(a.title) - rank(b.title));

  return [{ title: "Visão geral", items: [{ title: "Início", href: "/" }] }, ...sections];
}
