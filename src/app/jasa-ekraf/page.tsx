import Link from "next/link";


export const metadata = {
  title: "Jasa Ekonomi Kreatif | Ende Marketplace",
  description:
    "Temukan dan daftarkan jasa ekonomi kreatif Kabupaten Ende melalui Marketplace resmi yang dikelola oleh Dinas Pariwisata Kabupaten Ende.",
};

const kategori = [
  "Dekorasi",
  "Sound System",
  "Penyanyi dan Band",
  "MC dan Pembawa Acara",
  "Fotografi dan Videografi",
  "Sanggar Seni dan Tarian",
  "Make Up Artist",
  "Catering",
  "Percetakan",
  "Fashion dan Desain",
  "Kerajinan Tangan",
  "Jasa Kreatif Lainnya",
];

// GANTI dengan nomor WhatsApp Admin Dinas Pariwisata
// Gunakan format 62, tanpa tanda + atau angka 0 di depan.
const NOMOR_ADMIN = "6281234567890";

export default function JasaEkrafPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-emerald-900 via-emerald-700 to-green-600 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-200">
            Ende Marketplace
          </p>

          <h1 className="mb-5 text-3xl font-extrabold md:text-5xl">
            Jasa Ekonomi Kreatif
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-green-50 md:text-lg">
            Temukan berbagai penyedia jasa ekonomi kreatif
            di Kabupaten Ende. Promosikan keahlian, kreativitas,
            dan usaha Anda agar dikenal lebih luas oleh masyarakat.
          </p>

          <a
            href="#daftar"
            className="mt-8 inline-block rounded-xl bg-white px-7 py-4 font-bold text-emerald-800 shadow-lg transition hover:bg-green-50"
          >
            + Daftarkan Jasa Saya
          </a>
        </div>
      </section>

      {/* KATEGORI JASA */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Kategori Jasa
          </h2>

          <p className="mt-2 text-gray-600">
            Pilih bidang jasa ekonomi kreatif yang tersedia
            di Kabupaten Ende.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {kategori.map((item, index) => (
            <div
              key={item}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-500 hover:shadow-md"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 font-bold text-green-800">
                {String(index + 1).padStart(2, "0")}
              </div>

              <h3 className="font-semibold text-gray-800">
                {item}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* INFORMASI PENDAFTARAN */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <h2 className="mb-2 text-lg font-bold text-green-900">
            Peluang Promosi Usaha Anda
          </h2>

          <p className="text-sm leading-relaxed text-green-800">
            Pelaku usaha dan kelompok ekonomi kreatif
            Kabupaten Ende dapat mendaftarkan jasa mereka
            melalui formulir ini. Data akan diperiksa oleh
            Admin Dinas Pariwisata Kabupaten Ende sebelum
            ditampilkan pada Marketplace.
          </p>
        </div>
      </section>

      {/* FORMULIR PENDAFTARAN */}
      <section
        id="daftar"
        className="mx-auto max-w-3xl px-6 pb-20"
      >
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
          <div className="bg-emerald-800 p-7 text-white">
            <h2 className="text-2xl font-bold">
              Formulir Pendaftaran Jasa
            </h2>

            <p className="mt-2 text-sm text-green-100">
              Lengkapi informasi usaha atau jasa Anda dengan benar.
            </p>
          </div>

          <form
            action={`https://wa.me/${NOMOR_ADMIN}`}
            method="get"
            target="_blank"
            className="space-y-5 p-6 md:p-8"
          >
            {/* NAMA PEMILIK */}
            <div>
              <label
                htmlFor="nama"
                className="mb-2 block font-semibold text-gray-700"
              >
                Nama Pemilik / Penyedia Jasa *
              </label>

              <input
                id="nama"
                name="text"
                type="text"
                required
                placeholder="Masukkan nama lengkap"
                className="w-full rounded-xl border border-gray-300 p-3 text-gray-800 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* NAMA USAHA */}
            <div>
              <label
                htmlFor="usaha"
                className="mb-2 block font-semibold text-gray-700"
              >
                Nama Usaha / Kelompok *
              </label>

              <input
                id="usaha"
                name="nama_usaha"
                type="text"
                required
                placeholder="Masukkan nama usaha atau kelompok"
                className="w-full rounded-xl border border-gray-300 p-3 text-gray-800 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* KATEGORI */}
            <div>
              <label
                htmlFor="kategori"
                className="mb-2 block font-semibold text-gray-700"
              >
                Kategori Jasa *
              </label>

              <select
                id="kategori"
                name="kategori"
                required
                defaultValue=""
                className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-800 outline-none focus:border-green-600"
              >
                <option value="" disabled>
                  Pilih kategori jasa
                </option>

                {kategori.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* WHATSAPP */}
            <div>
              <label
                htmlFor="whatsapp"
                className="mb-2 block font-semibold text-gray-700"
              >
                Nomor WhatsApp Penyedia Jasa *
              </label>

              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                required
                placeholder="Contoh: 081234567890"
                className="w-full rounded-xl border border-gray-300 p-3 text-gray-800 outline-none focus:border-green-600"
              />
            </div>

            {/* ALAMAT */}
            <div>
              <label
                htmlFor="alamat"
                className="mb-2 block font-semibold text-gray-700"
              >
                Alamat / Kecamatan *
              </label>

              <input
                id="alamat"
                name="alamat"
                type="text"
                required
                placeholder="Contoh: Kecamatan Ende Tengah"
                className="w-full rounded-xl border border-gray-300 p-3 text-gray-800 outline-none focus:border-green-600"
              />
            </div>

            {/* DESKRIPSI */}
            <div>
              <label
                htmlFor="deskripsi"
                className="mb-2 block font-semibold text-gray-700"
              >
                Deskripsi Jasa *
              </label>

              <textarea
                id="deskripsi"
                name="deskripsi"
                rows={5}
                required
                placeholder="Jelaskan jasa, keahlian, dan layanan yang ditawarkan..."
                className="w-full rounded-xl border border-gray-300 p-3 text-gray-800 outline-none focus:border-green-600"
              />
            </div>

            {/* TOMBOL KIRIM */}
            <button
              type="submit"
              className="w-full rounded-xl bg-green-700 px-6 py-4 font-bold text-white shadow-md transition hover:bg-green-800"
            >
              Daftarkan Jasa Sekarang
            </button>

            <p className="text-center text-xs leading-relaxed text-gray-500">
              Dengan mengirimkan formulir ini, Anda menyetujui
              pemeriksaan data oleh Admin Dinas Pariwisata
              Kabupaten Ende sebelum jasa ditampilkan di website.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 px-6 py-8 text-center text-white">
        <h3 className="font-bold">
          Ende Marketplace
        </h3>

        <p className="mt-2 text-sm text-gray-300">
          Dikelola oleh Dinas Pariwisata Kabupaten Ende
        </p>

        <p className="mt-3 text-xs text-gray-500">
          © {new Date().getFullYear()} Ende Marketplace.
          Hak Cipta Dilindungi.
        </p>
      </footer>
    </main>
  );
}
