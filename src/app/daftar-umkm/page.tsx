
"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

const kategoriUMKM = [
  "Kuliner dan Makanan",
  "Kerajinan Tangan",
  "Tenun dan Fashion",
  "Pertanian dan Perkebunan",
  "Peternakan dan Perikanan",
  "Perdagangan",
  "Produk Olahan",
  "Kecantikan dan Perawatan",
  "Oleh-oleh Khas Ende",
  "Lainnya",
];

const kategoriEkraf = [
  "Desain Grafis",
  "Fotografi dan Videografi",
  "Musik dan Hiburan",
  "Kreator Konten",
  "Jasa Digital dan IT",
  "Dekorasi dan Event",
  "Arsitektur dan Desain Interior",
  "Fashion dan Desain Produk",
  "Periklanan dan Branding",
  "Seni dan Kerajinan",
  "Lainnya",
];

export default function DaftarPage() {
  const [jenis, setJenis] = useState("umkm");
  const [kategori, setKategori] = useState("");
  const [nama, setNama] = useState("");
  const [namaUsaha, setNamaUsaha] = useState("");
  const [telepon, setTelepon] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [website, setWebsite] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  const daftarKategori = jenis === "umkm" ? kategoriUMKM : kategoriEkraf;

  function gantiJenis(value: string) {
    setJenis(value);
    setKategori("");
    setPesan("");
  }

  
async function kirimPendaftaran(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (!kategori) {
    setPesan("Silakan pilih kategori terlebih dahulu.");
    return;
  }

  setLoading(true);
  setPesan("");

  try {
    const supabase = createClient();

    const dataUMKM = {
      nama_usaha: namaUsaha.trim(),
      pemilik: nama.trim(),
      kategori,
      deskripsi: deskripsi.trim() || null,
      alamat: alamat.trim(),
      nomor_hp: telepon.trim(),
      status: "menunggu",
    };

    const dataEkraf = {
      nama_jasa: namaUsaha.trim(),
      penyedia: nama.trim(),
      kategori,
      deskripsi: deskripsi.trim() || null,
      nomor_hp: telepon.trim(),
    };

    const { error } = jenis === "umkm"
      ? await supabase.from("umkm").insert(dataUMKM)
      : await supabase.from("jasa_kreatif").insert(dataEkraf);

    if (error) {
      setPesan("Gagal menyimpan: " + error.message);
      return;
    }

    setPesan("Pendaftaran berhasil disimpan ke database!");

    setKategori("");
    setNama("");
    setNamaUsaha("");
    setTelepon("");
    setEmail("");
    setAlamat("");
    setDeskripsi("");
    setWebsite("");
    setFile(null);

  } catch (error) {
    console.error(error);
    setPesan("Terjadi kesalahan saat menyimpan pendaftaran.");
  } finally {
    setLoading(false);
  }
}


  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <section className="bg-gradient-to-br from-emerald-900 to-green-600 px-5 py-12 text-white md:py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-100">
            Ende Marketplace
          </p>
          <h1 className="mt-3 text-3xl font-bold md:text-5xl">
            Daftar Bersama Kami
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-green-50">
            Daftarkan usaha atau layanan kreatif Anda agar lebih mudah
            dikenal melalui Ende Marketplace.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-10 md:py-14">
        <form
          onSubmit={kirimPendaftaran}
          className="space-y-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-8"
        >
          <div>
            <h2 className="text-xl font-bold">1. Pilih Jenis Pendaftaran</h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Pilih jenis yang paling sesuai dengan kegiatan Anda.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => gantiJenis("umkm")}
                aria-pressed={jenis === "umkm"}
                className={`rounded-xl border-2 p-5 text-left transition ${
                  jenis === "umkm"
                    ? "border-emerald-600 bg-emerald-50"
                    : "border-gray-200 hover:border-emerald-300"
                }`}
              >
                <span className="text-3xl">🏪</span>
                <span className="mt-3 block font-bold">Daftar UMKM</span>
                <span className="mt-2 block text-sm leading-6 text-gray-600">
                  Untuk usaha produk, makanan, kerajinan, perdagangan,
                  dan produk lokal lainnya.
                </span>
                <span className="mt-3 block text-sm font-semibold text-emerald-700">
                  {jenis === "umkm" ? "✓ Dipilih" : "Pilih UMKM"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => gantiJenis("ekraf")}
                aria-pressed={jenis === "ekraf"}
                className={`rounded-xl border-2 p-5 text-left transition ${
                  jenis === "ekraf"
                    ? "border-emerald-600 bg-emerald-50"
                    : "border-gray-200 hover:border-emerald-300"
                }`}
              >
                <span className="text-3xl">🎨</span>
                <span className="mt-3 block font-bold">
                  Daftar Jasa Ekraf
                </span>
                <span className="mt-2 block text-sm leading-6 text-gray-600">
                  Untuk penyedia jasa kreatif seperti desain, fotografi,
                  musik, teknologi, dan layanan kreatif lainnya.
                </span>
                <span className="mt-3 block text-sm font-semibold text-emerald-700">
                  {jenis === "ekraf" ? "✓ Dipilih" : "Pilih Jasa Ekraf"}
                </span>
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-7">
            <h2 className="text-xl font-bold">2. Kategori dan Informasi Usaha</h2>

            <div className="mt-5 space-y-5">
              <div>
                <label htmlFor="kategori" className="mb-2 block text-sm font-medium">
                  Kategori {jenis === "umkm" ? "UMKM" : "Jasa Ekraf"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="kategori"
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="">-- Pilih kategori --</option>
                  {daftarKategori.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="namaUsaha" className="mb-2 block text-sm font-medium">
                  {jenis === "umkm" ? "Nama Usaha" : "Nama Jasa atau Studio"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="namaUsaha"
                  value={namaUsaha}
                  onChange={(e) => setNamaUsaha(e.target.value)}
                  required
                  placeholder={
                    jenis === "umkm"
                      ? "Contoh: Tenun Flores"
                      : "Contoh: Studio Kreatif Ende"
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label htmlFor="deskripsi" className="mb-2 block text-sm font-medium">
                  Deskripsi {jenis === "umkm" ? "Usaha" : "Jasa"}
                </label>
                <textarea
                  id="deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows={4}
                  placeholder="Jelaskan usaha, produk, layanan, atau keunggulan Anda..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label htmlFor="website" className="mb-2 block text-sm font-medium">
                  Website atau Media Sosial (opsional)
                </label>
                <input
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Contoh: https://instagram.com/akunusaha"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-7">
            <h2 className="text-xl font-bold">3. Data Pemilik atau Penyedia Jasa</h2>

            <div className="mt-5 space-y-5">
              <div>
                <label htmlFor="nama" className="mb-2 block text-sm font-medium">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  id="nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Masukkan nama lengkap"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="telepon" className="mb-2 block text-sm font-medium">
                    Nomor WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="telepon"
                    type="tel"
                    value={telepon}
                    onChange={(e) => setTelepon(e.target.value)}
                    required
                    autoComplete="tel"
                    placeholder="08xxxxxxxxxx"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email (opsional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="nama@email.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="alamat" className="mb-2 block text-sm font-medium">
                  Alamat Usaha atau Domisili{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="alamat"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  required
                  rows={3}
                  placeholder="Desa atau kelurahan, kecamatan, Kabupaten Ende..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label htmlFor="file" className="mb-2 block text-sm font-medium">
                  Foto Produk atau Portofolio (opsional)
                </label>
                <input
                  id="file"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:font-medium file:text-emerald-800"
                />
                <p className="mt-2 text-xs text-gray-500">
                  {file ? `File dipilih: ${file.name}` : "Format gambar atau PDF."}
                  {" "}File belum diunggah ke server.
                </p>
              </div>
            </div>
          </div>

          {pesan && (
            <div
              role="status"
              className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"
            >
              {pesan}
            </div>
          )}

          <div className="border-t border-gray-100 pt-6">
            <button
  type="submit"
  disabled={loading}
  className="w-full rounded-lg bg-emerald-700 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
>
  {loading ? "Mengirim..." : "Kirim Pendaftaran"}
</button>

            <p className="mt-4 text-center text-xs leading-5 text-gray-500">
              Dengan mendaftar, Anda menyatakan bahwa informasi yang
              diberikan adalah benar.
            </p>

            <div className="mt-5 text-center text-sm">
              <Link href="/" className="font-medium text-emerald-700 hover:underline">
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

