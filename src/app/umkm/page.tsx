
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";


const kategoriUMKM = [
  "Semua",
  "Kerajinan",
  "Kuliner",
  "Makanan",
  "Fashion",
  "Lainnya",
];
type UMKM = {
  id: string;
  nama_usaha: string;
  kategori: string;
  alamat: string | null;
  deskripsi: string | null;
};
export default function ProfilUMKMPage() {
  const [daftarUMKM, setDaftarUMKM] = useState<UMKM[]>([]);
const [kataKunci, setKataKunci] = useState("");
const [kategoriAktif, setKategoriAktif] = useState("Semua");
const [loading, setLoading] = useState(true);
const [pesan, setPesan] = useState("");

useEffect(() => {
  
async function ambilUMKM() {
  try {
    setLoading(true);
    setPesan("");

    const supabase = createClient();

    const { data, error } = await supabase
      .from("umkm")
      .select("id, nama_usaha, kategori, alamat, deskripsi")
      .eq("status", "disetujui")
      .order("created_at", { ascending: false });

    if (error) {
      setPesan("Gagal mengambil data UMKM: " + error.message);
    } else {
      setDaftarUMKM(data ?? []);
    }
  } catch (error) {
    setPesan(
      "Terjadi kesalahan: " +
        (error instanceof Error ? error.message : String(error))
    );
  } finally {
    setLoading(false);
  }
}


  ambilUMKM();
}, []);

const hasilFilter = daftarUMKM.filter((umkm) => {
  const cocokNama =
    umkm.nama_usaha.toLowerCase().includes(kataKunci.toLowerCase()) ||
    (umkm.alamat ?? "").toLowerCase().includes(kataKunci.toLowerCase()) ||
    (umkm.deskripsi ?? "").toLowerCase().includes(kataKunci.toLowerCase());

  const cocokKategori =
    kategoriAktif === "Semua" || umkm.kategori === kategoriAktif;

  return cocokNama && cocokKategori;
});

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <section className="bg-gradient-to-r from-emerald-800 to-green-600 px-5 py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-100">
            Ende Marketplace
          </p>

          <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            Kenali Pelaku UMKM Lokal Ende
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-green-50 md:text-lg">
            Temukan profil usaha, produk unggulan, dan kreativitas pelaku
            UMKM lokal dalam satu tempat.
          </p>

          <Link
            href="/daftar-umkm"
            className="mt-7 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-emerald-800 transition hover:bg-green-50"
          >
            Daftarkan Usaha
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold md:text-3xl">
            Direktori UMKM
          </h2>
          <p className="mt-2 text-gray-600">
            Jelajahi berbagai kategori usaha lokal.
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="cari-umkm" className="mb-2 block font-medium">
            Cari nama usaha atau lokasi
          </label>
          <input
            id="cari-umkm"
            type="search"
            value={kataKunci}
            onChange={(e) => setKataKunci(e.target.value)}
            placeholder="Contoh: tenun, kopi, Ende..."
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {kategoriUMKM.map((kategori) => (
            <button
              key={kategori}
              type="button"
              onClick={() => setKategoriAktif(kategori)}
              aria-pressed={kategoriAktif === kategori}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                kategoriAktif === kategori
                  ? "bg-emerald-700 text-white"
                  : "border border-gray-300 bg-white text-gray-700 hover:border-emerald-600 hover:text-emerald-700"
              }`}
            >
              {kategori}
            </button>
          ))}
        </div>

        <p className="mb-5 text-sm text-gray-500">
          Menampilkan {hasilFilter.length} profil usaha
        </p>

        {loading ? (
  <p className="py-10 text-center text-gray-500">
    Memuat data UMKM...
  </p>
) : pesan ? (
  <p className="py-10 text-center text-red-600">
    {pesan}
  </p>
) : hasilFilter.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hasilFilter.map((umkm) => (
              <article
              key={umkm.id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-emerald-100 to-green-200">
                  <span className="text-4xl font-bold text-emerald-800">
                  {umkm.nama_usaha.slice(0, 2).toUpperCase()}
                  </span>
                </div>

                <div className="p-6">
                  <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                    {umkm.kategori}
                  </span>

                  <h3 className="mt-3 text-xl font-bold">{umkm.nama_usaha}</h3>

                  <p className="mt-2 text-sm text-gray-500">
                    📍 {umkm.alamat || "Kabupaten Ende"}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {umkm.deskripsi}
                  </p>

                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-400">
                      Contoh profil — informasi usaha perlu diverifikasi
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
            <h3 className="text-lg font-semibold">
              UMKM tidak ditemukan
            </h3>
            <p className="mt-2 text-gray-500">
              Coba kata kunci lain atau pilih kategori berbeda.
            </p>
            <button
              type="button"
              onClick={() => {
                setKataKunci("");
                setKategoriAktif("Semua");
              }}
              className="mt-4 font-semibold text-emerald-700 hover:underline"
            >
              Reset pencarian
            </button>
          </div>
        )}
      </section>

      <section className="bg-emerald-50 px-5 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold">
            Punya usaha di Kabupaten Ende?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-600">
            Bergabunglah dengan Ende Marketplace agar usaha dan produk
            lokal Anda dapat dikenal lebih luas.
          </p>
          <Link
            href="/daftar-umkm"
            className="mt-6 inline-block rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
          >
            Daftar UMKM Sekarang
          </Link>
        </div>
      </section>
    </main>
  );
}

