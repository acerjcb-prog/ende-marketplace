
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    "https://marketplace-ekonomi-kreatif-ende.vercel.app";

  const pages = [
    "",
    "/produk-umkm",
    "/kategori",
    "/desa-kreatif",
    "/jasa-ekraf",
    "/profil-umkm",
    "/berita",
    "/cara-berbelanja",
    "/tentang-kami",
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: page === "" ? 1 : 0.8,
  }));
}
