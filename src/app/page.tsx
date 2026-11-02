import Link from "next/link";
import { MapPin, Search, Layers, Hammer, UtensilsCrossed, Shirt, Package, Sparkles } from "lucide-react";
import { categories, villages, news, umkmList } from "@/lib/demo-data";
import { featuredProducts, featuredUmkm } from "@/lib/catalog";
import { formatTanggal } from "@/lib/format";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";

const icons = [Layers, Hammer, UtensilsCrossed, Shirt, Package, Sparkles];

export default function HomePage() {
  return (
    <>
      
<section className="relative isolate overflow-hidden bg-navy">
  <div className="absolute inset-0 z-0">
    <iframe
      src="https://www.youtube.com/embed/727dwsLCG2U?autoplay=1&mute=1&loop=1&playlist=727dwsLCG2U&controls=0&playsinline=1&rel=0"
      title="Video latar Ende Marketplace"
      allow="autoplay; encrypted-media; picture-in-picture"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
      tabIndex={-1}
    />
  </div>

  <div className="absolute inset-0 z-10 bg-navy/65" />

  <div className="relative z-20 mx-auto flex min-h-[520px] max-w-6xl flex-col justify-center px-4 py-16 md:min-h-[620px] md:py-24">
    <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/90">
      Marketplace Ekonomi Kreatif Ende
    </p>

    <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-white md:text-6xl">
      Jelajahi Produk Kreatif Lokal Ende
    </h1>

    <p className="mt-5 max-w-xl text-base text-white/90 md:text-lg">
      Temukan produk unggulan, kerajinan, tenun ikat, kuliner,
      dan karya kreatif masyarakat Kabupaten Ende.
    </p>

    <form action="/produk" role="search" className="mt-8 flex max-w-xl overflow-hidden rounded-lg bg-white">
      <label htmlFor="cari-hero" className="sr-only">
        Cari produk
      </label>
      <input
        id="cari-hero"
        name="q"
        placeholder="Cari tenun, kopi, anyaman…"
        className="min-w-0 flex-1 px-4 py-3 text-sm text-gray-900"
      />
      <button type="submit" className="bg-tanah px-5 text-sm font-medium text-white hover:bg-tanah/90">
        Cari
      </button>
    </form>

    <div className="mt-6 flex flex-wrap gap-3">
      <Link href="/produk" className="rounded bg-white px-6 py-3 text-sm font-semibold text-navy hover:bg-tanah-50">
        Jelajahi Produk
      </Link>
      <Link href="/daftar-umkm" className="rounded bg-marun px-6 py-3 text-sm font-semibold text-white hover:bg-marun-700">
        Daftarkan UMKM
      </Link>
    </div>
  </div>
</section>


      <section className="mx-auto max-w-6xl px-4 pt-14" aria-labelledby="h-kategori">
        <h2 id="h-kategori" className="font-display text-2xl text-navy">Kategori produk</h2>
        <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c, i) => {
            const Icon = icons[i] ?? Sparkles;
            return (
              <li key={c.slug}>
                <Link href={`/kategori/${c.slug}`} className="flex h-full flex-col items-center gap-2 rounded-md border border-tanah-100 bg-tanah-50 p-4 text-center text-sm font-medium text-navy hover:border-marun">
                  <Icon size={26} className="text-marun" aria-hidden /> {c.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-14" aria-labelledby="h-produk">
        <div className="flex items-end justify-between">
          <h2 id="h-produk" className="font-display text-2xl text-navy">Produk unggulan</h2>
          <Link href="/produk" className="text-sm font-medium text-marun underline">Lihat semua produk</Link>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts().map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-14" aria-labelledby="h-umkm">
        <h2 id="h-umkm" className="font-display text-2xl text-navy">UMKM unggulan</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {featuredUmkm().map((u) => (
            <article key={u.slug} className="overflow-hidden rounded-md border border-tanah-100">
              <div className="aspect-[16/7]"><ProductImage alt={u.name} /></div>
              <div className="p-4">
                <h3 className="font-display text-lg text-navy">{u.name}</h3>
                <p className="text-sm text-marun">{categories.find((c) => c.slug === u.categorySlug)?.name}</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-ink/60"><MapPin size={14} aria-hidden /> {u.kecamatan}</p>
                <p className="mt-2 text-sm text-ink/80">{u.description}</p>
                <Link href="/umkm" className="mt-3 inline-block text-sm font-medium text-navy underline">Lihat profil usaha</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-tanah-50 py-12" aria-labelledby="h-desa">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="h-desa" className="font-display text-2xl text-navy">Desa kreatif</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {villages.map((v) => (
              <Link key={v.slug} href="/desa-kreatif" className="rounded-md border-l-4 border-marun bg-white p-4 hover:shadow">
                <h3 className="font-display text-lg text-navy">{v.name}</h3>
                <p className="text-sm text-ink/60">Kecamatan {v.kecamatan}</p>
                <p className="mt-2 text-sm">{v.potensi}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-14" aria-labelledby="h-berita">
        <div className="flex items-end justify-between">
          <h2 id="h-berita" className="font-display text-2xl text-navy">Berita dan kegiatan</h2>
          <Link href="/berita" className="text-sm font-medium text-marun underline">Semua berita</Link>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {news.map((n) => (
            <article key={n.slug} className="rounded-md border border-tanah-100 p-4">
              <p className="text-xs text-ink/60">{n.tag}, {formatTanggal(n.date)}</p>
              <h3 className="mt-1 font-display text-lg text-navy">{n.title}</h3>
              <p className="mt-2 text-sm text-ink/80">{n.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
      <p className="sr-only">{umkmList.length} UMKM demo</p>
    </>
  );
}
