
"use client";

import { useState } from "react";
import Link from "next/link";

const desa = [
  {
    nama: "Desa Wisata dan Budaya",
    kategori: "Wisata & Budaya",
    deskripsi:
      "Kenali potensi budaya, tradisi, dan pengalaman lokal yang dapat dikembangkan menjadi daya tarik wisata.",
    simbol: "🏡",
  },
  {
    nama: "Sentra Tenun Ikat",
    kategori: "Kerajinan",
    deskripsi:
      "Jelajahi peluang pengembangan kain tenun ikat, keterampilan pengrajin, dan produk berbasis warisan budaya.",
    simbol: "🧵",
  },
  {
    nama: "Kuliner Khas Daerah",
    kategori: "Kuliner",
    deskripsi:
      "Temukan potensi makanan khas, olahan pangan lokal, dan usaha kuliner dari masyarakat desa.",
    simbol: "🍲",
  },
  {
    nama: "Kerajinan Lokal",
    kategori: "Kerajinan",
    deskripsi:
      "Perkenalkan produk kerajinan tangan dan karya kreatif masyarakat yang berpotensi dipasarkan lebih luas.",
    simbol: "🧺",
  },
  {
    nama: "Produk Pertanian dan Olahan",
    kategori: "Produk Lokal",
    deskripsi:
      "Kembangkan nilai tambah hasil pertanian melalui pengolahan, pengemasan, dan pemasaran produk lokal.",
    simbol: "🌿",
  },
  {
    nama: "Komunitas Kreatif Desa",
    kategori: "Komunitas",
    deskripsi:
      "Dorong kolaborasi masyarakat, pelaku UMKM, dan komunitas untuk menciptakan peluang ekonomi kreatif.",
    simbol: "🤝",
  },
];

const kategori = [
  "Semua",
  "Wisata & Budaya",
  "Kerajinan",
  "Kuliner",
  "Produk Lokal",
  "Komunitas",
];

export default function DesaKreatifPage() {
  const [pilihan, setPilihan] = useState("Semua");
  const [pencarian, setPencarian] = useState("");

  const hasil = desa.filter((item) => {
    const cocokKategori =
      pilihan === "Semua" || item.kategori === pilihan;

    const kata = pencarian.trim().toLowerCase();
    const cocokKata =
      !kata ||
      `${item.nama} ${item.deskripsi} ${item.kategori}`
        .toLowerCase()
        .includes(kata);

    return cocokKategori && cocokKata;
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <section className="border-b-4 border-red-900 bg-blue-950 px-4 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            Ende Marketplace
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Desa Kreatif, Potensi Lokal, Masa Depan Bersama
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 md:text-lg">
            Ruang untuk mengenalkan potensi desa, budaya,
            kerajinan, kuliner, dan kreativitas masyarakat
            Kabupaten Ende kepada khalayak yang lebih luas.
          </p>

          <a
            href="#jelajahi"
            className="mt-8 inline-flex rounded-lg bg-red-900 px-6 py-3 font-semibold text-white hover:bg-red-800"
          >
            Jelajahi Potensi Desa
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-900">
            Mengenal potensi daerah
          </p>

          <h2 className="mt-2 text-2xl font-bold text-blue-950 md:text-3xl">
            Kreativitas Tumbuh dari Desa
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Setiap desa memiliki karakter, keterampilan, dan
            sumber daya yang dapat menjadi kekuatan ekonomi.
            Melalui promosi digital, potensi tersebut dapat
            diperkenalkan dan dikembangkan secara berkelanjutan.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <span className="text-3xl">🎨</span>
            <h3 className="mt-3 font-bold text-blue-950">
              Budaya dan Kreativitas
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Mengangkat karya dan tradisi lokal.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <span className="text-3xl">🛍️</span>
            <h3 className="mt-3 font-bold text-blue-950">
              Produk Unggulan
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Membantu memperkenalkan produk masyarakat.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <span className="text-3xl">🌱</span>
            <h3 className="mt-3 font-bold text-blue-950">
              Ekonomi Berkelanjutan
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Membuka peluang kolaborasi dan usaha.
            </p>
          </div>
        </div>
      </section>

      <section id="jelajahi" className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-red-900">
              Direktori potensi
            </p>
            <h2 className="mt-2 text-2xl font-bold text-blue-950 md:text-3xl">
              Jelajahi Potensi Kreatif
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-gray-600">
            Pilih kategori atau cari topik yang ingin Anda
            jelajahi.
          </p>
        </div>

        <div className="mt-6">
          <label htmlFor="cari-desa" className="sr-only">
            Cari potensi desa
          </label>
          <input
            id="cari-desa"
            type="search"
            value={pencarian}
            onChange={(event) => setPencarian(event.target.value)}
            placeholder="Cari kerajinan, kuliner, budaya..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {kategori.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPilihan(item)}
              aria-pressed={pilihan === item}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${
                pilihan === item
                  ? "border-blue-950 bg-blue-950 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-blue-950"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((item) => (
            <article
              key={item.nama}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl">
                {item.simbol}
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-red-900">
                {item.kategori}
              </p>

              <h3 className="mt-2 text-xl font-bold text-blue-950">
                {item.nama}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {item.deskripsi}
              </p>
            </article>
          ))}
        </div>

        {hasil.length === 0 && (
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-8 text-center">
            <p className="font-semibold text-blue-950">
              Potensi tidak ditemukan
            </p>
            <button
              type="button"
              onClick={() => {
                setPencarian("");
                setPilihan("Semua");
              }}
              className="mt-3 text-sm font-semibold text-red-900 underline"
            >
              Tampilkan semua kategori
            </button>
          </div>
        )}
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4">
        <div className="rounded-2xl bg-blue-950 p-7 text-white md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">
            Mari berkolaborasi
          </p>

          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            Punya produk atau potensi kreatif dari desa?
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-blue-100">
            Kenalkan usaha Anda melalui Ende Marketplace
            dan bantu memperluas jangkauan produk kreatif lokal.
          </p>

          <Link
            href="/daftar-umkm"
            className="mt-6 inline-flex rounded-lg bg-red-900 px-5 py-3 font-semibold text-white hover:bg-red-800"
          >
            Daftarkan UMKM
          </Link>
        </div>
      </section>
    </main>
  );
}

