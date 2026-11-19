
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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

export default function DetailBeritaPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [artikel, setArtikel] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadArtikel() {
      try {
        const supabase = createClient();

        const { data, error } = await supabase
          .from("berita")
          .select("id, judul, isi, foto_url, created_at")
          .eq("status", "terbit")
          .order("created_at", { ascending: false });

        if (error) throw error;

        const ditemukan = (data || []).find(
          (item) => buatSlug(item.judul) === slug
        );

        setArtikel(ditemukan || null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Gagal memuat berita."
        );
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      void loadArtikel();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-20 text-center">
        Memuat berita...
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-20 text-center">
        <p className="text-red-700">Gagal memuat berita: {error}</p>
        <Link href="/berita" className="mt-4 inline-block text-red-900 underline">
          Kembali ke Berita
        </Link>
      </main>
    );
  }

  if (!artikel) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-blue-950">
          Berita tidak ditemukan
        </h1>
        <Link href="/berita" className="mt-4 inline-block text-red-900 underline">
          Kembali ke Berita
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <article className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm md:p-10">
        <Link
          href="/berita"
          className="font-semibold text-red-900 hover:underline"
        >
          ← Kembali ke Berita
        </Link>

        <p className="mt-8 text-sm font-semibold text-red-800">
          Informasi dan Promosi •{" "}
          {new Date(artikel.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <h1 className="mt-4 text-3xl font-bold leading-tight text-blue-950 md:text-4xl">
          {artikel.judul}
        </h1>

        {artikel.foto_url && (
          <img
            src={artikel.foto_url}
            alt={artikel.judul}
            className="mt-8 max-h-[500px] w-full rounded-xl object-cover"
          />
        )}

        <div className="mt-8 whitespace-pre-line text-base leading-8 text-gray-700">
          {artikel.isi}
        </div>

        <div className="mt-10 border-t pt-6">
          <Link
            href="/berita"
            className="inline-flex rounded-lg bg-red-900 px-5 py-3 font-semibold text-white hover:bg-red-800"
          >
            Lihat Berita Lainnya
          </Link>
        </div>
      </article>
    </main>
  );
}
