import { notFound } from "next/navigation";
import CatalogView, { type RawParams } from "@/components/CatalogView";
import { getCategory } from "@/lib/catalog";

export default function KategoriPage({ params, searchParams }: { params: { slug: string }; searchParams: RawParams }) {
  const cat = getCategory(params.slug);
  if (!cat) notFound();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl text-navy">{cat.name}</h1>
      <p className="mb-6 mt-1 text-ink/70">{cat.description}</p>
      <CatalogView sp={searchParams} fixedCategory={cat.slug} action={`/kategori/${cat.slug}`} />
    </div>
  );
}
