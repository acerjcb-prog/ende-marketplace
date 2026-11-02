import { categories, kecamatanList } from "@/lib/demo-data";
import { queryProducts, type CatalogQuery } from "@/lib/catalog";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

export type RawParams = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const num = (v?: string) => (v && !Number.isNaN(Number(v)) && Number(v) >= 0 ? Number(v) : undefined);

export function parseParams(sp: RawParams, fixedCategory?: string): CatalogQuery & { raw: Record<string, string | undefined> } {
  const raw = { q: one(sp.q), kategori: fixedCategory ?? one(sp.kategori), kecamatan: one(sp.kecamatan), min: one(sp.min), max: one(sp.max), urut: one(sp.urut) };
  const urut = raw.urut === "termurah" || raw.urut === "termahal" ? raw.urut : "terbaru";
  return { q: raw.q, kategori: raw.kategori, kecamatan: raw.kecamatan, min: num(raw.min), max: num(raw.max), urut, halaman: num(one(sp.halaman)), raw };
}

export default function CatalogView({ sp, fixedCategory, action }: { sp: RawParams; fixedCategory?: string; action: string }) {
  const q = parseParams(sp, fixedCategory);
  const { items, total, page, totalPages } = queryProducts(q);
  const field = "w-full rounded border border-tanah-100 bg-white px-3 py-2 text-sm";
  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <form action={action} className="h-fit space-y-4 rounded-md border border-tanah-100 bg-tanah-50 p-4">
        <div><label htmlFor="q" className="mb-1 block text-sm font-medium">Kata kunci</label><input id="q" name="q" defaultValue={q.raw.q} className={field} /></div>
        {!fixedCategory && (
          <div><label htmlFor="kategori" className="mb-1 block text-sm font-medium">Kategori</label>
            <select id="kategori" name="kategori" defaultValue={q.raw.kategori ?? ""} className={field}>
              <option value="">Semua kategori</option>
              {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select></div>
        )}
        <div><label htmlFor="kecamatan" className="mb-1 block text-sm font-medium">Lokasi penjual</label>
          <select id="kecamatan" name="kecamatan" defaultValue={q.raw.kecamatan ?? ""} className={field}>
            <option value="">Semua kecamatan</option>
            {kecamatanList.map((k) => <option key={k}>{k}</option>)}
          </select></div>
        <div className="grid grid-cols-2 gap-2">
          <div><label htmlFor="min" className="mb-1 block text-sm font-medium">Harga min (Rp)</label><input id="min" name="min" type="number" min={0} defaultValue={q.raw.min} className={field} /></div>
          <div><label htmlFor="max" className="mb-1 block text-sm font-medium">Harga maks (Rp)</label><input id="max" name="max" type="number" min={0} defaultValue={q.raw.max} className={field} /></div>
        </div>
        <div><label htmlFor="urut" className="mb-1 block text-sm font-medium">Urutkan</label>
          <select id="urut" name="urut" defaultValue={q.urut} className={field}>
            <option value="terbaru">Produk terbaru</option>
            <option value="termurah">Harga terendah</option>
            <option value="termahal">Harga tertinggi</option>
          </select></div>
        <button className="w-full rounded bg-navy py-2 text-sm font-medium text-white hover:bg-navy-700">Terapkan filter</button>
        <a href={action} className="block text-center text-sm text-marun underline">Atur ulang</a>
      </form>
      <div>
        <p className="mb-4 text-sm text-ink/70" aria-live="polite">{total} produk ditemukan</p>
        {items.length === 0 ? (
          <div className="rounded-md border border-dashed border-tanah p-10 text-center">
            <p className="font-display text-xl text-navy">Tidak ada produk yang cocok</p>
            <p className="mt-1 text-sm text-ink/70">Ubah kata kunci atau longgarkan filter harga dan lokasi.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{items.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
        )}
        <Pagination basePath={action} page={page} totalPages={totalPages} params={{ ...q.raw, kategori: fixedCategory ? undefined : q.raw.kategori }} />
      </div>
    </div>
  );
}
