import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { sectionTitles, site } from "./site";
import type { Doc, NavSection } from "./types";

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

function readDoc(file: string): Doc {
  const filePath = path.relative(contentRoot, file).split(path.sep).join("/");
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const slug = filePath === "index.md" ? [] : filePath.replace(/\.md$/, "").split("/");
  const h1 = content.match(/^#\s+(.+)$/m)?.[1];
  const title = cleanTitle(data.title ?? h1 ?? humanize(slug.at(-1) ?? site.name));

  return { slug, title, description: data.description, content, filePath };
}

export function getAllDocs(): Doc[] {
  return walk(contentRoot).map(readDoc);
}

export function getDocBySlug(slug: string[]): Doc | undefined {
  const key = slug.join("/");
  return getAllDocs().find((doc) => doc.slug.join("/") === key);
}

export function sectionTitle(folder: string) {
  return sectionTitles[folder] ?? humanize(folder);
}

export function getNavigation(): NavSection[] {
  const docs = getAllDocs();
  const sections: NavSection[] = [
    { title: "Visão geral", items: [{ title: "Início", href: "/" }] },
  ];

  for (const doc of docs) {
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

  return sections;
}
