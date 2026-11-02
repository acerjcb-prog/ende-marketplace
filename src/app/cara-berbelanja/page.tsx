
import Link from "next/link";

export const metadata = {
  title: "Cara Berbelanja | Ende Marketplace",
  description:
    "Panduan berbelanja produk UMKM lokal melalui Ende Marketplace.",
};

const langkah = [
  {
    nomor: "01",
    ikon: "🔎",
    judul: "Cari Produk",
    deskripsi:
      "Jelajahi katalog dan profil UMKM untuk menemukan produk lokal yang Anda inginkan.",
  },
  {
    nomor: "02",
    ikon: "🛍️",
    judul: "Pilih Produk",
    deskripsi:
      "Periksa informasi produk, harga, variasi, dan ketersediaan. Hubungi penjual untuk memastikan detail pesanan.",
  },
  {
    nomor: "03",
    ikon: "💬",
    judul: "Hubungi Penjual",
    deskripsi:
      "Tanyakan cara pemesanan, jumlah produk, biaya pengiriman, serta metode pembayaran yang tersedia.",
  },
  {
    nomor: "04",
    ikon: "💳",
    judul: "Lakukan Pembayaran",
    deskripsi:
      "Lakukan pembayaran sesuai kesepakatan dengan penjual. Simpan bukti pembayaran jika diperlukan.",
  },
  {
    nomor: "05",
    ikon: "📦",
    judul: "Terima Pesanan",
    deskripsi:
      "Sepakati metode pengambilan atau pengiriman, lalu konfirmasikan pesanan setelah diterima.",
  },
];

const tips = [
  "Periksa informasi produk dan harga sebelum memesan.",
  "Pastikan nomor kontak penjual benar dan dapat dihubungi.",
  "Konfirmasikan ongkos kirim serta perkiraan waktu pengiriman.",
  "Simpan bukti komunikasi dan pembayaran.",
  "Jangan membagikan PIN, kata sandi, atau kode OTP kepada siapa pun.",
];

export default function CaraBerbelanjaPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-900 to-green-600 px-5 py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-100">
            Ende Marketplace
          </p>

          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            Belanja Produk Lokal Jadi Lebih Mudah
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-green-50 md:text-lg">
            Ikuti panduan sederhana untuk mengenal produk, menghubungi
            pelaku UMKM, dan melakukan pemesanan dengan lebih nyaman.
          </p>

          <Link
            href="/profil-umkm"
            className="mt-7 inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-emerald-800 transition hover:bg-green-50"
          >
            Jelajahi Profil UMKM
          </Link>
        </div>
      </section>

      {/* Langkah belanja */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            5 Langkah Berbelanja
          </h2>
          <p className="mt-3 leading-7 text-gray-600">
            Mulai dari mencari produk sampai menerima pesanan Anda.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {langkah.map((item) => (
            <article
              key={item.nomor}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                  {item.ikon}
                </span>
                <span className="text-2xl font-bold text-emerald-700">
                  {item.nomor}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold">{item.judul}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                {item.deskripsi}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="border-y border-gray-100 bg-white px-5 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-semibold text-emerald-700">
              Belanja dengan nyaman
            </p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
              Tips Aman Berbelanja
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              Pastikan detail pesanan jelas sebelum melakukan pembayaran.
              Komunikasikan langsung dengan penjual untuk menghindari
              kesalahpahaman.
            </p>
          </div>

          <div className="space-y-4">
            {tips.map((tip, index) => (
              <div key={tip} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                  {index + 1}
                </span>
                <p className="leading-6 text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-5 py-14 md:py-16">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          Pertanyaan Umum
        </h2>

        <div className="mt-8 space-y-4">
          <details className="group rounded-xl border border-gray-200 bg-white p-5">
            <summary className="cursor-pointer font-semibold">
              Bagaimana cara memesan produk?
            </summary>
            <p className="mt-3 leading-7 text-gray-600">
              Cari UMKM melalui halaman profil, lalu hubungi penjual untuk
              menanyakan ketersediaan produk dan proses pemesanan.
            </p>
          </details>

          <details className="group rounded-xl border border-gray-200 bg-white p-5">
            <summary className="cursor-pointer font-semibold">
              Bagaimana cara mengetahui ongkos kirim?
            </summary>
            <p className="mt-3 leading-7 text-gray-600">
              Tanyakan langsung kepada penjual mengenai pilihan pengiriman,
              biaya, dan estimasi waktu sampai.
            </p>
          </details>

          <details className="group rounded-xl border border-gray-200 bg-white p-5">
            <summary className="cursor-pointer font-semibold">
              Metode pembayaran apa yang tersedia?
            </summary>
            <p className="mt-3 leading-7 text-gray-600">
              Konfirmasikan metode pembayaran yang diterima oleh penjual
              sebelum menyelesaikan pesanan.
            </p>
          </details>

          <details className="group rounded-xl border border-gray-200 bg-white p-5">
            <summary className="cursor-pointer font-semibold">
              Apakah pesanan bisa dikembalikan?
            </summary>
            <p className="mt-3 leading-7 text-gray-600">
              Tanyakan kebijakan pengembalian atau penukaran kepada penjual
              sebelum membeli, terutama untuk produk yang mudah rusak atau
              dibuat berdasarkan pesanan.
            </p>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-800 px-5 py-12 text-center text-white">
        <h2 className="text-2xl font-bold">
          Siap Mendukung UMKM Lokal Ende?
        </h2>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-emerald-50">
          Temukan berbagai usaha lokal dan mulai jelajahi produk unggulan
          dari pelaku UMKM.
        </p>

        <Link
          href="/profil-umkm"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-emerald-800 transition hover:bg-green-50"
        >
          Lihat Profil UMKM
        </Link>
      </section>
    </main>
  );
}
