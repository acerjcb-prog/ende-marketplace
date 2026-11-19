
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

type NewsArticle = {
  id: string;
  judul: string;
  isi: string;
  foto_url: string | null;
  created_at: string;
};

function buatSlug(judul: string) {
  return judul
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function BeritaPage() {
  const [berita, setBerita] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [pesanError, setPesanError] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [kataKunci, setKataKunci] = useState("");

  useEffect(() => {
    async function loadBerita() {
      try {
        const supabase = createClient();

        const { data, error } = await supabase
          .from("berita")
          .select("id, judul, isi, foto_url, created_at")
          .eq("status", "terbit")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setBerita(data || []);
      } catch (error) {
        setPesanError(
          error instanceof Error
            ? error.message
            : "Gagal memuat berita."
        );
      } finally {
        setLoading(false);
      }
    }

    void loadBerita();
  }, []);

  const kategoriBerita = [
    "Semua",
    "UMKM",
    "Kerajinan",
    "Kuliner",
    "Promosi",
    "Desa Kreatif",
  ];

  const hasilBerita = useMemo(() => {
    const kata = kataKunci.trim().toLowerCase();

    return berita.filter((item) => {
      const sesuaiKategori =
        kategoriAktif === "Semua" || kategoriAktif === "UMKM";

      const sesuaiPencarian =
        !kata ||
        `${item.judul} ${item.isi}`.toLowerCase().includes(kata);

      return sesuaiKategori && sesuaiPencarian;
    });
  }, [berita, kategoriAktif, kataKunci]);

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
            kerajinan, kuliner, dan promosi ekonomi kreatif Kabupaten Ende.
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
              onClick={() =>
                document
                  .getElementById("daftar-berita")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
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
            Berita terbaru dari pengelola Marketplace Ekonomi Kreatif Ende.
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
          {loading ? (
            <p className="text-gray-600">Memuat berita...</p>
          ) : pesanError ? (
            <p className="text-red-700">Gagal memuat berita: {pesanError}</p>
          ) : (
            hasilBerita.map((item) => (
              <article
                key={item.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {item.foto_url ? (
                  <img
                    src={item.foto_url}
                    alt={item.judul}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-blue-950 p-6 text-center text-xl font-bold text-white">
                    Marketplace Ekonomi Kreatif Ende
                  </div>
                )}

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-medium text-red-800">
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  <Link
                    href={`/berita/${buatSlug(item.judul)}`}
                    className="mt-3 text-lg font-bold leading-snug text-blue-950 hover:text-red-800"
                  >
                    {item.judul}
                  </Link>

                  <p className="mt-3 flex-1 whitespace-pre-line text-sm leading-6 text-gray-600">
                    {item.isi.length > 180
                      ? `${item.isi.slice(0, 180)}...`
                      : item.isi}
                  </p>

                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <Link
                      href={`/berita/${buatSlug(item.judul)}`}
                      className="text-sm font-semibold text-red-900 hover:underline"
                    >
                      Baca selengkapnya →
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {!loading && !pesanError && hasilBerita.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
            <h3 className="font-semibold text-blue-950">
              Berita tidak ditemukan
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Belum ada berita terbit atau berita sesuai pencarian.
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
            Daftarkan usaha Anda melalui Ende Marketplace agar informasi
            usaha dan produk kreatif dapat dipersiapkan untuk ditampilkan
            di etalase digital.
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
