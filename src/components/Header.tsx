
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { categories } from "@/lib/demo-data";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/produk", label: "Produk UMKM" },
];

const links2 = [
  { href: "/desa-kreatif", label: "Desa Kreatif" },
  { href: "/jasa-ekraf", label: "Jasa Ekraf" },
  { href: "/umkm", label: "Profil UMKM" },
  { href: "/berita", label: "Berita dan Promosi" },
  { href: "/cara-berbelanja", label: "Cara Berbelanja" },
  { href: "/tentang-kami", label: "Tentang Kami" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [siteName, setSiteName] = useState("Marketplace Ekonomi Kreatif Ende");
  const [tagline, setTagline] = useState(
    "Dikelola oleh Dinas Pariwisata Kabupaten Ende"
  );
  const [navColor, setNavColor] = useState("#142b4a");
  useEffect(() => {
    async function loadSiteSettings() {
      const supabase = createClient();

      const { data } = await supabase
        .from("site_settings")
        .select("settings")
        .eq("id", "global")
        .maybeSingle();

      if (data?.settings) {
        setLogoUrl(data.settings.logoUrl || "");
        setSiteName(data.settings.siteName || "Marketplace Ekonomi Kreatif Ende");
        setTagline(
          data.settings.tagline ||
            "Dikelola oleh Dinas Pariwisata Kabupaten Ende"
        );
        setNavColor(data.settings.secondaryColor || "#142b4a");
      }
    }

    loadSiteSettings();
  }, []);

  const linkCls =
    "rounded px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10";

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Marketplace Ekonomi Kreatif Ende, beranda"
        >
          {logoUrl ? (
  <img
    src={logoUrl}
    alt="Logo resmi"
    className="h-11 w-11 shrink-0 rounded object-contain"
  />
) : (
  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-dashed border-tanah text-center text-[10px] leading-tight text-tanah">
    Logo
    <br />
    resmi
  </div>
)}

<div className="leading-tight">
  <p className="font-display text-lg font-semibold text-navy">
    {siteName}
  </p>
  <p className="hidden text-xs text-ink/60 sm:block">
    {tagline}
  </p>
</div>
        </Link>

        {/* Pencarian desktop */}
        <form
          action="/produk"
          method="get"
          role="search"
          className="ml-auto hidden max-w-sm flex-1 md:block"
        >
          <label htmlFor="cari-header" className="sr-only">
            Cari produk, UMKM, atau jasa kreatif
          </label>

          <div className="relative">
            <input
              id="cari-header"
              name="q"
              type="search"
              placeholder="Cari produk, UMKM, atau jasa kreatif..."
              className="w-full rounded border border-tanah-100 py-2 pl-3 pr-10 text-sm"
            />

            <button
              type="submit"
              aria-label="Cari"
              className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-navy"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/login"
            className="rounded border border-navy px-4 py-2 text-sm font-medium text-navy hover:bg-navy-50"
          >
            Login
          </Link>

          <Link
            href="/daftar-umkm"
            className="rounded bg-marun px-4 py-2 text-sm font-medium text-white hover:bg-marun-700"
          >
            Daftar
          </Link>
        </div>

        <button
          type="button"
          className="ml-auto rounded p-2 text-navy lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div className="motif-tenun-tipis" aria-hidden="true" />

      <nav
  aria-label="Navigasi utama"
  className={`${open ? "block" : "hidden"} lg:block`}
  style={{ backgroundColor: navColor }}
>
        <ul className="mx-auto flex max-w-6xl flex-col px-2 py-1 lg:flex-row lg:flex-wrap lg:items-center">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block ${linkCls}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="relative">
            <details className="group">
              <summary
                className={`flex cursor-pointer list-none items-center gap-1 ${linkCls}`}
              >
                Kategori
                <ChevronDown size={14} aria-hidden="true" />
              </summary>

              <ul className="bg-navy-700 lg:absolute lg:left-0 lg:top-full lg:z-10 lg:w-60 lg:rounded-b lg:shadow-lg">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/kategori/${category.slug}`}
                      className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>

          {links2.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block ${linkCls}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="mt-2 flex gap-2 px-3 pb-2 lg:hidden">
            <Link
              href="/login"
              className="rounded border border-white/60 px-4 py-2 text-sm text-white"
            >
              Login
            </Link>

            <Link
              href="/daftar-umkm"
              className="rounded bg-marun px-4 py-2 text-sm text-white"
            >
              Daftar
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
