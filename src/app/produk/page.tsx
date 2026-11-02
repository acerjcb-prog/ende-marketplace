import CatalogView, { type RawParams } from "@/components/CatalogView";

export const metadata = { title: "Produk UMKM" };

export default function ProdukPage({ searchParams }: { searchParams: RawParams }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 font-display text-3xl text-navy">Produk UMKM</h1>
      <CatalogView sp={searchParams} action="/produk" />
    </div>
  );
}
