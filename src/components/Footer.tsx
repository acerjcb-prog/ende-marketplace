import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-navy text-white">
      <div className="motif-tenun-tipis" aria-hidden />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-xl">Marketplace Ekonomi Kreatif Ende</p>
          <p className="mt-2 text-sm text-white/75">Etalase digital produk kreatif UMKM Kabupaten Ende. Dikelola oleh Dinas Pariwisata Kabupaten Ende, Provinsi Nusa Tenggara Timur.</p>
        </div>
        <div>
          <p className="font-medium">Tautan</p>
          <ul className="mt-2 space-y-1 text-sm text-white/75">
            <li><Link href="/produk" className="hover:text-white">Produk UMKM</Link></li>
            <li><Link href="/cara-berbelanja" className="hover:text-white">Cara Berbelanja</Link></li>
            <li><Link href="/daftar-umkm" className="hover:text-white">Daftar UMKM</Link></li>
            <li><Link href="/kebijakan-privasi" className="hover:text-white">Kebijakan Privasi</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-medium">Kontak Dinas Pariwisata</p>
          {/* GANTI: isi alamat, telepon, dan email resmi di sini atau lewat Pengaturan Website (Tahap 5) */}
          <p className="mt-2 text-sm text-white/75">Alamat, telepon, dan email resmi akan diisi oleh admin. Belum tersedia.</p>
        </div>
      </div>
      <p className="border-t border-white/15 py-4 text-center text-xs text-white/60">Versi pengembangan. Data yang tampil adalah data DEMO, bukan data resmi Pemerintah Kabupaten Ende.</p>
    </footer>
  );
}
