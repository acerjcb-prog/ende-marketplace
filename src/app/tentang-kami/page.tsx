
import Link from "next/link";

export const metadata = {
  title: "Tentang Kami | Ende Marketplace",
  description:
    "Kenali Ende Marketplace, platform untuk memperkenalkan dan mendukung UMKM lokal.",
};

const nilaiKami = [
  {
    ikon: "🌱",
    judul: "Mendukung UMKM Lokal",
    deskripsi:
      "Membantu pelaku usaha lokal memperkenalkan produk dan potensi usahanya kepada masyarakat yang lebih luas.",
  },
  {
    ikon: "🤝",
    judul: "Membangun Koneksi",
    deskripsi:
      "Mendorong hubungan antara pelaku UMKM dan calon pelanggan melalui informasi usaha yang mudah ditemukan.",
  },
  {
    ikon: "🎨",
    judul: "Mengangkat Kreativitas",
    deskripsi:
      "Memperkenalkan produk, kerajinan, kuliner, dan kreativitas lokal yang menjadi bagian dari kekayaan Ende.",
  },
];

const misiKami = [
  "Menyediakan informasi profil UMKM lokal secara terstruktur.",
  "Membantu masyarakat menemukan produk dan usaha lokal.",
  "Mendorong promosi produk kreatif dan potensi desa.",
  "Mendukung pemanfaatan teknologi digital oleh pelaku UMKM.",
];

export default function TentangKamiPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-800 to-green-600 px-5 py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl">
          <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium">
            Mengenal Ende Marketplace
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Bersama Memajukan UMKM Lokal Ende
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-emerald-50 md:text-lg">
            Ende Marketplace merupakan platform digital yang dirancang
            untuk membantu masyarakat mengenal pelaku UMKM, menemukan
            produk lokal, dan menjelajahi potensi kreatif daerah.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/profil-umkm"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-emerald-900 transition hover:bg-emerald-50"
            >
              Jelajahi UMKM
            </Link>

            <Link
              href="/daftar-umkm"
              className="rounded-lg border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Daftarkan Usaha
            </Link>
          </div>
        </div>
      </section>

      {/* Tentang platform */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-20">
        <div>
          <p className="font-semibold uppercase tracking-widest text-emerald-700">
            Siapa Kami?
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
            Ruang Digital untuk Potensi Lokal
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Ende Marketplace hadir sebagai gagasan untuk mempertemukan
            potensi usaha lokal dengan peluang di dunia digital. Melalui
            direktori UMKM dan informasi usaha, platform ini diharapkan
            dapat memudahkan masyarakat menemukan produk lokal.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            Kami juga ingin mendukung pengenalan kerajinan, kuliner,
            produk kreatif, dan potensi desa agar semakin dikenal.
            Dengan pemanfaatan teknologi, usaha lokal memiliki kesempatan
            untuk menjangkau calon pelanggan secara lebih luas.
          </p>
        </div>

        <div className="rounded-3xl bg-emerald-50 p-8 md:p-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-700 text-3xl text-white">
            🌿
          </div>

          <h3 className="mt-6 text-2xl font-bold text-emerald-950">
            Dari Ende, untuk Potensi Lokal
          </h3>

          <p className="mt-4 leading-7 text-gray-600">
            Setiap usaha memiliki cerita dan setiap produk memiliki
            nilai. Ende Marketplace ingin menjadi salah satu ruang
            untuk memperkenalkan cerita tersebut kepada lebih banyak orang.
          </p>
        </div>
      </section>

      {/* Visi */}
      <section className="bg-gray-50 px-5 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm md:p-12">
            <p className="font-semibold uppercase tracking-widest text-emerald-700">
              Visi Kami
            </p>

            <h2 className="mt-4 text-2xl font-bold leading-relaxed md:text-4xl">
              Menjadi platform digital yang membantu memperkenalkan,
              menghubungkan, dan mendukung perkembangan UMKM serta
              potensi kreatif lokal Ende.
            </h2>

            <div className="mt-10 border-t border-gray-100 pt-8">
              <p className="font-semibold uppercase tracking-widest text-emerald-700">
                Misi Kami
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {misiKami.map((misi, index) => (
                  <div key={misi} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                      {index + 1}
                    </span>
                    <p className="leading-7 text-gray-600">{misi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai utama */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold uppercase tracking-widest text-emerald-700">
            Nilai Kami
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Apa yang Ingin Kami Dorong?
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Platform yang berorientasi pada pengenalan potensi lokal,
            kemudahan akses informasi, dan kolaborasi.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {nilaiKami.map((nilai) => (
            <article
              key={nilai.judul}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-3xl">
                {nilai.ikon}
              </div>

              <h3 className="mt-5 text-xl font-bold">{nilai.judul}</h3>

              <p className="mt-3 leading-7 text-gray-600">
                {nilai.deskripsi}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-900 px-5 py-16 text-center text-white md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold md:text-4xl">
            Mari Tumbuh Bersama UMKM Lokal
          </h2>

          <p className="mt-5 leading-8 text-emerald-100">
            Anda pelaku usaha atau ingin mengenal produk lokal? Mulailah
            menjelajahi direktori UMKM dan ikut mendukung potensi kreatif
            daerah.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/profil-umkm"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-emerald-900 transition hover:bg-emerald-50"
            >
              Lihat Profil UMKM
            </Link>

            <Link
              href="/daftar-umkm"
              className="rounded-lg border border-white/50 px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              Gabung sebagai UMKM
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
