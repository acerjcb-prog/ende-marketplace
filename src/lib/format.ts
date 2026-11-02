export function formatRupiah(value: number | string): string {
  const n = typeof value === "string" ? Number(value) : value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatTanggal(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeZone: "Asia/Makassar",
  }).format(new Date(iso));
}

/**
 * Mengubah nomor HP Indonesia ke format internasional tanpa tanda "+".
 * Contoh: "0812-3456-7890" -> "6281234567890". Mengembalikan null jika tidak valid.
 */
export function normalizeWhatsapp(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let d = raw.replace(/[^\d+]/g, "");
  if (d.startsWith("+")) d = d.slice(1);
  if (d.startsWith("0")) d = "62" + d.slice(1);
  if (d.startsWith("8")) d = "62" + d;
  if (!/^628\d{8,12}$/.test(d)) return null;
  return d;
}

export function buildWhatsappLink(raw: string | null | undefined, productName: string): string | null {
  const num = normalizeWhatsapp(raw);
  if (!num) return null;
  const text = `Halo, saya melihat produk "${productName}" di Marketplace Ekonomi Kreatif Ende dan ingin bertanya.`;
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}
