
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const berita = [
  {
    kategori: "UMKM",
    tanggal: "Informasi UMKM",
    judul: "Kenali Potensi Produk Kreatif Lokal Kabupaten Ende",
    ringkasan:
      "Temukan beragam produk lokal, mulai dari tenun ikat, kerajinan tangan, hingga kuliner khas yang menjadi potensi ekonomi kreatif masyarakat Ende.",
    gambar: "",
    labelGambar: "Produk Kreatif Ende",
  },
  {
    kategori: "Kerajinan",
    tanggal: "Inspirasi Produk",
    judul: "Tenun Ikat Ende, Warisan Budaya yang Bernilai Ekonomi",
    ringkasan:
      "Kerajinan tenun ikat memiliki nilai budaya sekaligus peluang untuk dikembangkan melalui pemasaran digital.",
    gambar: "",
    labelGambar: "Tenun Ikat",
  },
  {
    kategori: "Kuliner",
    tanggal: "Inspirasi Usaha",
    judul: "Peluang Kuliner Lokal untuk Menjangkau Pasar Lebih Luas",
    ringkasan:
      "Kemasan yang menarik, informasi produk yang jelas, dan pemasaran digital dapat membantu usaha kuliner dikenal calon pelanggan.",
    gambar: "",
    labelGambar: "Kuliner Lokal",
  },
  {
    kategori: "Promosi",
    tanggal: "Panduan Promosi",
    judul: "Cara Memperkenalkan Produk UMKM melalui Marketplace",
    ringkasan:
      "Pelajari cara menampilkan foto produk, menulis deskripsi yang menarik, serta mencantumkan kontak usaha agar mudah ditemukan pembeli.",
    gambar: "",
    labelGambar: "Promosi UMKM",
  },
  {
    kategori: "Desa Kreatif",
    tanggal: "Potensi Daerah",
    judul: "Mengangkat Potensi Desa melalui Produk Kreatif",
    ringkasan:
      "Produk dan keterampilan masyarakat desa dapat menjadi peluang usaha ketika diperkenalkan dengan informasi yang tepat.",
    gambar: "",
    labelGambar: "Desa Kreatif",
  },
  {
    kategori: "UMKM",
    tanggal: "Tips Usaha",
    judul: "Tips Membuat Profil Usaha yang Menarik bagi Pembeli",
    ringkasan:
      "Gunakan nama usaha yang jelas, foto produk yang baik, deskripsi singkat, dan nomor kontak yang aktif.",
    gambar: "",
    labelGambar: "Tips UMKM",
  },
];

const kategoriBerita = [
  "Semua",
  "UMKM",
  "Kerajinan",
  "Kuliner",
  "Promosi",
  "Desa Kreatif",
];

export default function BeritaPage() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [kataKunci, setKataKunci] = useState("");

  const hasilBerita = useMemo(() => {
    const kata = kataKunci.trim().toLowerCase();

    return berita.filter((item) => {
      const sesuaiKategori =
        kategoriAktif === "Semua" ||
        item.kategori === kategoriAktif;

      const sesuaiPencarian =
        !kata ||
        `${item.judul} ${item.ringkasan} ${item.kategori}`
          .toLowerCase()
          .includes(kata);

      return sesuaiKategori && sesuaiPencarian;
    });
  }, [kategoriAktif, kataKunci]);

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <section className="border-b-4 border-red-900 bg-blue-950 px-4 py-14 text-white md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            Ende Marketplace
          </p>

          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            Berita, Inspirasi, dan Promosi UMKM
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-blue-100">
            Ikuti informasi seputar produk kreatif, potensi usaha,
            kerajinan, kuliner, dan promosi ekonomi kreatif
            Kabupaten Ende.
          </p>

          <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="search"
              value={kataKunci}
              onChange={(event) => setKataKunci(event.target.value)}
              placeholder="Cari berita atau informasi..."
              aria-label="Cari berita"
              className="min-w-0 flex-1 rounded-lg bg-white px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-amber-300"
            />

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("daftar-berita")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-lg bg-red-900 px-6 py-3 font-semibold text-white hover:bg-red-800"
            >
              Cari Berita
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-900">
            Informasi dan inspirasi
          </p>
          <h2 className="mt-2 text-2xl font-bold text-blue-950 md:text-3xl">
            Jelajahi Berita
          </h2>
          <p className="mt-2 text-gray-600">
            Pilih topik yang ingin Anda baca.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {kategoriBerita.map((kategori) => (
            <button
              key={kategori}
              type="button"
              onClick={() => setKategoriAktif(kategori)}
              aria-pressed={kategoriAktif === kategori}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                kategoriAktif === kategori
                  ? "border-blue-950 bg-blue-950 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-blue-950"
              }`}
            >
              {kategori}
            </button>
          ))}
        </div>

        <div
          id="daftar-berita"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {hasilBerita.map((item, index) => (
            <article
              key={item.judul}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-48 items-center justify-center bg-blue-950 p-6 text-center">
                <div>
                  <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-300">
                    {item.kategori}
                  </span>
                  <p className="mt-4 text-xl font-bold text-white">
                    {item.labelGambar}
                  </p>
                  <p className="mt-2 text-sm text-blue-200">
                    Marketplace Ekonomi Kreatif Ende
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-medium text-red-800">
                  {item.tanggal}
                </p>

                <h3 className="mt-3 text-lg font-bold leading-snug text-blue-950">
                  {item.judul}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
                  {item.ringkasan}
                </p>

                <div className="mt-5 border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-500">
                    Informasi umum • Artikel {index + 1}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {hasilBerita.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
            <h3 className="font-semibold text-blue-950">
              Berita tidak ditemukan
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Coba kata kunci atau kategori yang berbeda.
            </p>
            <button
              type="button"
              onClick={() => {
                setKataKunci("");
                setKategoriAktif("Semua");
              }}
              className="mt-4 rounded-lg bg-blue-950 px-4 py-2 text-sm font-semibold text-white"
            >
              Reset pencarian
            </button>
          </div>
        )}
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-4">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-9">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-900">
            Untuk pelaku usaha
          </p>

          <h2 className="mt-3 text-2xl font-bold text-blue-950">
            Ingin memperkenalkan usaha Anda?
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-gray-700">
            Daftarkan usaha Anda melalui Ende Marketplace agar
            informasi usaha dan produk kreatif dapat dipersiapkan
            untuk ditampilkan di etalase digital.
          </p>

          <Link
            href="/daftar-umkm"
            className="mt-6 inline-flex rounded-lg bg-red-900 px-5 py-3 font-semibold text-white transition hover:bg-red-800"
          >
            Daftar UMKM
          </Link>
        </div>
      </section>
    </main>
  );
}

