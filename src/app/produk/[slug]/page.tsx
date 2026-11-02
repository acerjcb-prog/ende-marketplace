import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, MessageCircle, Store } from "lucide-react";
import { getProduct, getUmkm, getCategory } from "@/lib/catalog";
import { buildWhatsappLink, formatRupiah } from "@/lib/format";
import ProductImage from "@/components/ProductImage";

export default function DetailProduk({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const umkm = getUmkm(product.umkmSlug);
  const cat = getCategory(product.categorySlug);
  const wa = buildWhatsappLink(umkm?.whatsapp, product.name);
  const gallery = product.images.length ? product.images : [undefined, undefined, undefined];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav aria-label="Jejak halaman" className="mb-6 text-sm text-ink/60">
        <Link href="/produk" className="underline">Produk</Link> / {cat && <Link href={`/kategori/${cat.slug}`} className="underline">{cat.name}</Link>}
      </nav>
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-md"><ProductImage src={gallery[0]} alt={product.name} /></div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {gallery.slice(0, 3).map((g, i) => <div key={i} className="aspect-square overflow-hidden rounded"><ProductImage src={g} alt={`${product.name} foto ${i + 1}`} /></div>)}
          </div>
        </div>
        <div>
          <h1 className="font-display text-3xl text-navy">{product.name}</h1>
          <p className="mt-2 text-3xl font-semibold text-marun">{formatRupiah(product.price)}</p>
          <p className="mt-3 text-sm">Stok: <strong>{product.stock > 0 ? `${product.stock} tersedia` : "Habis"}</strong></p>
          <p className="mt-4 leading-relaxed text-ink/85">{product.description}</p>
          <div className="mt-6 rounded-md border border-tanah-100 bg-tanah-50 p-4">
            <p className="flex items-center gap-2 font-medium text-navy"><Store size={16} aria-hidden /> {umkm?.name}</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-ink/70"><MapPin size={14} aria-hidden /> {umkm?.desa}, Kecamatan {umkm?.kecamatan}</p>
          </div>
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded bg-marun px-6 py-3 font-medium text-white hover:bg-marun-700">
              <MessageCircle size={18} aria-hidden /> Hubungi Penjual
            </a>
          ) : (
            <div className="mt-6">
              <button disabled className="inline-flex cursor-not-allowed items-center gap-2 rounded bg-ink/20 px-6 py-3 font-medium text-ink/50">
                <MessageCircle size={18} aria-hidden /> Hubungi Penjual
              </button>
              <p className="mt-2 text-sm text-ink/60">Nomor WhatsApp penjual belum tersedia di profil UMKM ini.</p>
            </div>
          )}
          {/* Tahap lanjut: tombol "Tambah ke Keranjang" hanya muncul bila fitur transaksi diaktifkan di Pengaturan. */}
        </div>
      </div>
    </div>
  );
}
