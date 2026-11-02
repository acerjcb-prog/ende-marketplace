import { products, umkmList, categories, type Product } from "./demo-data";

export const PAGE_SIZE = 8;

export type CatalogQuery = {
  q?: string; kategori?: string; kecamatan?: string;
  min?: number; max?: number; urut?: "terbaru" | "termurah" | "termahal"; halaman?: number;
};

export const getUmkm = (slug: string) => umkmList.find((u) => u.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (slug: string) => products.find((x) => x.slug === slug);

export function queryProducts(query: CatalogQuery) {
  const q = query.q?.trim().toLowerCase();
  let list: Product[] = products.filter((pr) => {
    const umkm = getUmkm(pr.umkmSlug);
    if (q && !`${pr.name} ${umkm?.name ?? ""}`.toLowerCase().includes(q)) return false;
    if (query.kategori && pr.categorySlug !== query.kategori) return false;
    if (query.kecamatan && umkm?.kecamatan !== query.kecamatan) return false;
    if (query.min !== undefined && pr.price < query.min) return false;
    if (query.max !== undefined && pr.price > query.max) return false;
    return true;
  });
  const urut = query.urut ?? "terbaru";
  list = [...list].sort((a, b) =>
    urut === "termurah" ? a.price - b.price
    : urut === "termahal" ? b.price - a.price
    : b.createdAt.localeCompare(a.createdAt));
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(Math.max(1, query.halaman ?? 1), totalPages);
  return { items: list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), total, page, totalPages };
}

export const featuredProducts = () => products.filter((x) => x.featured).slice(0, 4);
export const featuredUmkm = () => umkmList.filter((u) => u.featured);
