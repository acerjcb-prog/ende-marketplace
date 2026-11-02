/**
 * DATA DEMO. Seluruh isi berkas ini adalah contoh untuk pengembangan
 * dan BUKAN data resmi Pemerintah Kabupaten Ende. Nama usaha, harga, dan stok fiktif.
 * Nomor WhatsApp sengaja null; nomor asli berasal dari profil UMKM (Tahap 2-3).
 */
export const IS_DEMO = true;

export type Category = { slug: string; name: string; description: string };
export type Umkm = {
  slug: string; name: string; kecamatan: string; desa: string;
  categorySlug: string; description: string; whatsapp: string | null; featured: boolean;
};
export type Product = {
  slug: string; name: string; price: number; description: string;
  categorySlug: string; umkmSlug: string; stock: number; createdAt: string;
  views: number; featured: boolean; images: string[];
};
export type Village = { slug: string; name: string; kecamatan: string; potensi: string };
export type News = { slug: string; title: string; excerpt: string; date: string; tag: string };

export const categories: Category[] = [
  { slug: "tenun-ikat", name: "Tenun Ikat", description: "Kain dan olahan tenun ikat khas Ende Lio." },
  { slug: "kerajinan-tangan", name: "Kerajinan Tangan", description: "Anyaman, ukiran, dan karya tangan perajin lokal." },
  { slug: "kuliner-lokal", name: "Kuliner Lokal", description: "Makanan dan minuman khas Kabupaten Ende." },
  { slug: "fashion-aksesori", name: "Fashion dan Aksesori", description: "Busana, tas, dan perhiasan bernuansa lokal." },
  { slug: "produk-olahan", name: "Produk Olahan", description: "Hasil olahan pertanian dan perikanan setempat." },
  { slug: "produk-kreatif", name: "Produk Kreatif Lainnya", description: "Karya kreatif di luar kategori utama." },
];

export const kecamatanList = [
  "Ende Selatan", "Ende Tengah", "Ende Timur", "Detusoko", "Wolowaru", "Nangapanda", "Maurole", "Kelimutu",
];

export const umkmList: Umkm[] = [
  { slug: "tenun-sarimaya-demo", name: "Tenun Sarimaya (DEMO)", kecamatan: "Wolowaru", desa: "Desa Contoh A", categorySlug: "tenun-ikat", description: "Usaha demo tenun ikat dengan pewarna alami.", whatsapp: null, featured: true },
  { slug: "anyaman-lio-demo", name: "Anyaman Lio Kreatif (DEMO)", kecamatan: "Detusoko", desa: "Desa Contoh B", categorySlug: "kerajinan-tangan", description: "Usaha demo anyaman lontar dan bambu.", whatsapp: null, featured: true },
  { slug: "dapur-kelimutu-demo", name: "Dapur Kelimutu (DEMO)", kecamatan: "Kelimutu", desa: "Desa Contoh C", categorySlug: "kuliner-lokal", description: "Usaha demo kuliner dan oleh-oleh khas.", whatsapp: null, featured: true },
  { slug: "pesisir-ende-demo", name: "Olahan Pesisir Ende (DEMO)", kecamatan: "Ende Selatan", desa: "Kelurahan Contoh D", categorySlug: "produk-olahan", description: "Usaha demo olahan hasil laut.", whatsapp: null, featured: false },
];

const p = (
  slug: string, name: string, price: number, categorySlug: string, umkmSlug: string,
  stock: number, createdAt: string, views: number, featured: boolean, description: string,
): Product => ({ slug, name, price, categorySlug, umkmSlug, stock, createdAt, views, featured, description, images: [] });

export const products: Product[] = [
  p("selendang-tenun-motif-demo", "Selendang Tenun Motif Ende (DEMO)", 450000, "tenun-ikat", "tenun-sarimaya-demo", 12, "2026-10-20", 320, true, "Contoh produk selendang tenun ikat. Deskripsi asli diisi UMKM."),
  p("kain-tenun-pewarna-alami-demo", "Kain Tenun Pewarna Alami (DEMO)", 1250000, "tenun-ikat", "tenun-sarimaya-demo", 4, "2026-10-12", 410, true, "Contoh kain tenun ikat dengan pewarna alami."),
  p("tas-tenun-demo", "Tas Tenun Ikat (DEMO)", 275000, "fashion-aksesori", "tenun-sarimaya-demo", 20, "2026-10-02", 150, true, "Contoh tas berbahan tenun."),
  p("keranjang-lontar-demo", "Keranjang Anyaman Lontar (DEMO)", 95000, "kerajinan-tangan", "anyaman-lio-demo", 30, "2026-09-28", 98, true, "Contoh keranjang anyaman daun lontar."),
  p("tikar-pandan-demo", "Tikar Pandan Halus (DEMO)", 135000, "kerajinan-tangan", "anyaman-lio-demo", 15, "2026-09-15", 76, false, "Contoh tikar anyaman pandan."),
  p("gelang-bambu-demo", "Gelang Bambu Ukir (DEMO)", 45000, "fashion-aksesori", "anyaman-lio-demo", 50, "2026-10-18", 64, false, "Contoh aksesori bambu ukir."),
  p("kopi-bubuk-demo", "Kopi Bubuk Lokal 200 g (DEMO)", 55000, "kuliner-lokal", "dapur-kelimutu-demo", 80, "2026-10-22", 210, true, "Contoh kopi bubuk lokal kemasan 200 gram."),
  p("keripik-pisang-demo", "Keripik Pisang Kelimutu (DEMO)", 28000, "kuliner-lokal", "dapur-kelimutu-demo", 100, "2026-10-10", 133, false, "Contoh keripik pisang."),
  p("ikan-asap-demo", "Ikan Asap Kemasan (DEMO)", 65000, "produk-olahan", "pesisir-ende-demo", 25, "2026-10-05", 88, false, "Contoh olahan ikan asap."),
  p("abon-ikan-demo", "Abon Ikan Tuna (DEMO)", 48000, "produk-olahan", "pesisir-ende-demo", 40, "2026-09-30", 120, false, "Contoh abon ikan."),
  p("kartu-pos-tenun-demo", "Set Kartu Pos Motif Tenun (DEMO)", 35000, "produk-kreatif", "anyaman-lio-demo", 60, "2026-10-24", 41, false, "Contoh suvenir kartu pos bermotif tenun."),
  p("bros-tenun-demo", "Bros Tenun Mini (DEMO)", 30000, "fashion-aksesori", "tenun-sarimaya-demo", 70, "2026-10-25", 35, false, "Contoh bros dari perca tenun."),
];

export const villages: Village[] = [
  { slug: "desa-contoh-a", name: "Desa Contoh A (DEMO)", kecamatan: "Wolowaru", potensi: "Tenun ikat dan pewarna alami" },
  { slug: "desa-contoh-b", name: "Desa Contoh B (DEMO)", kecamatan: "Detusoko", potensi: "Anyaman lontar dan bambu" },
  { slug: "desa-contoh-c", name: "Desa Contoh C (DEMO)", kecamatan: "Kelimutu", potensi: "Kopi dan kuliner oleh-oleh" },
];

export const news: News[] = [
  { slug: "pelatihan-demo", title: "Contoh: Pelatihan Pengemasan Produk UMKM", excerpt: "Berita demo. Isi asli dikelola Dinas Pariwisata melalui dashboard admin.", date: "2026-10-15", tag: "Pelatihan" },
  { slug: "pameran-demo", title: "Contoh: Pameran Produk Kreatif Lokal", excerpt: "Berita demo untuk menguji tampilan daftar berita.", date: "2026-10-08", tag: "Pameran" },
  { slug: "promo-demo", title: "Contoh: Promosi Tenun Ikat Pekan Ini", excerpt: "Berita demo untuk menguji tampilan promosi.", date: "2026-10-01", tag: "Promosi" },
];
