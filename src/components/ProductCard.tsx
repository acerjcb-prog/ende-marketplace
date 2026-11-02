import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Product } from "@/lib/demo-data";
import { getUmkm } from "@/lib/catalog";
import { formatRupiah } from "@/lib/format";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  const umkm = getUmkm(product.umkmSlug);
  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-tanah-100 bg-white transition-colors hover:border-tanah">
      <Link href={`/produk/${product.slug}`} className="block aspect-[4/3] overflow-hidden">
        <ProductImage src={product.images[0]} alt={product.name} />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-lg leading-snug text-navy">
          <Link href={`/produk/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="text-lg font-semibold text-marun">{formatRupiah(product.price)}</p>
        <p className="text-sm text-ink/80">{umkm?.name}</p>
        <p className="flex items-center gap-1 text-sm text-ink/60">
          <MapPin size={14} aria-hidden /> {umkm?.kecamatan}
        </p>
        <Link href={`/produk/${product.slug}`} className="mt-auto inline-block rounded bg-navy px-4 py-2 text-center text-sm font-medium text-white hover:bg-navy-700">
          Lihat detail
        </Link>
      </div>
    </article>
  );
}
