
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [lihatPassword, setLihatPassword] = useState(false);
  const [pesan, setPesan] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setPesan(
      "Tampilan login sudah berfungsi, tetapi autentikasi akun belum dihubungkan ke server."
    );
  }

  return (
    <main className="min-h-[70vh] bg-gray-50 px-4 py-12 md:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg md:grid-cols-2">
        {/* Panel informasi */}
        <section className="relative overflow-hidden bg-blue-950 p-8 text-white md:p-10">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[24px] border-white/5" />
          <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full border-[30px] border-white/5" />

          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Ende Marketplace
            </p>

            <h1 className="mt-10 text-3xl font-bold leading-tight md:text-4xl">
              Selamat Datang Kembali!
            </h1>

            <p className="mt-5 leading-7 text-blue-100">
              Masuk ke akun Anda untuk mengelola usaha,
              mengenalkan produk lokal, dan menjangkau
              lebih banyak pelanggan di Kabupaten Ende.
            </p>

            <div className="mt-10 space-y-4 text-sm text-blue-100">
              <p>✓ Kenalkan produk kreatif lokal</p>
              <p>✓ Kelola informasi usaha Anda</p>
              <p>✓ Dukung UMKM dan ekonomi kreatif Ende</p>
            </div>

            <div className="mt-12 border-t border-white/20 pt-5 text-sm text-blue-200">
              Marketplace Ekonomi Kreatif Ende
            </div>
          </div>
        </section>

        {/* Form login */}
        <section className="p-6 md:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-950">
              Masuk ke Akun
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Masukkan email dan kata sandi untuk melanjutkan.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="nama@email.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Kata Sandi
              </label>

              <div className="flex overflow-hidden rounded-lg border border-gray-300 focus-within:border-blue-900 focus-within:ring-2 focus-within:ring-blue-100">
                <input
                  id="password"
                  name="password"
                  type={lihatPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Masukkan kata sandi"
                  className="min-w-0 flex-1 px-4 py-3 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setLihatPassword(!lihatPassword)}
                  className="px-3 text-sm font-medium text-blue-900 hover:bg-gray-50"
                  aria-label={
                    lihatPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }
                >
                  {lihatPassword ? "Sembunyikan" : "Lihat"}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/lupa-password"
                className="text-sm font-medium text-blue-900 hover:underline"
              >
                Lupa kata sandi?
              </Link>
            </div>

            {pesan && (
              <div
                role="status"
                className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900"
              >
                {pesan}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-red-900 px-5 py-3 font-semibold text-white transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            >
              Masuk
            </button>
          </form>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">
              BELUM PUNYA AKUN?
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <Link
            href="/daftar-umkm"
            className="block w-full rounded-lg border border-blue-950 px-5 py-3 text-center font-semibold text-blue-950 transition hover:bg-blue-50"
          >
            Daftar UMKM
          </Link>

          <p className="mt-6 text-center text-xs leading-5 text-gray-400">
            Dengan melanjutkan, pastikan informasi akun
            yang Anda masukkan benar.
          </p>
        </section>
      </div>
    </main>
  );
}

