import Link from "next/link";
export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl text-navy">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-ink/70">Alamat yang Anda buka tidak ada atau sudah dipindahkan.</p>
      <Link href="/produk" className="mt-6 inline-block rounded bg-navy px-5 py-2 text-white">Lihat semua produk</Link>
    </section>
  );
}
