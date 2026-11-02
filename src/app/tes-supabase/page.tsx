"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function TesSupabasePage() {
  const [hasil, setHasil] = useState("Memeriksa koneksi...");

  useEffect(() => {
    async function cekKoneksi() {
      const supabase = createClient();

      const { error } = await supabase
        .from("umkm")
        .select("id")
        .limit(1);

      if (error) {
        setHasil("Koneksi belum berhasil: " + error.message);
      } else {
        setHasil("Koneksi Supabase berhasil!");
      }
    }

    cekKoneksi();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Tes Supabase Ende Marketplace</h1>
      <p className="mt-4">{hasil}</p>
    </main>
  );
}