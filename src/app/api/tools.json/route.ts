import { getAllDocs, sectionTitle } from "@/lib/docs";
import { editUrl, site } from "@/lib/site";

// Gerado no build como /api/tools.json, para outras aplicações consumirem o Hub.
export const dynamic = "force-static";

export function GET() {
  const tools = getAllDocs()
    .filter((doc) => doc.slug.length > 0)
    .map((doc) => ({
      title: doc.title,
      description: doc.description ?? null,
      section: doc.slug.length > 1 ? sectionTitle(doc.slug[0]) : null,
      path: `/${doc.slug.join("/")}`,
      source: `${site.repo}/blob/${site.branch}/${site.contentDir}/${doc.filePath}`,
      edit: editUrl(doc.filePath),
    }));

  return Response.json({ name: site.name, count: tools.length, tools });
}
