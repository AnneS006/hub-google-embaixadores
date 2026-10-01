import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { getDocBySlug } from "@/lib/docs";

export default function HomePage() {
  const doc = getDocBySlug([]);
  if (!doc) notFound();

  return <Markdown doc={doc} />;
}
