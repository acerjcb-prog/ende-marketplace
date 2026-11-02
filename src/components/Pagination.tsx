import Link from "next/link";

export default function Pagination({ page, totalPages, params, basePath = "/produk" }: { page: number; totalPages: number; basePath?: string; params: Record<string, string | undefined> }) {
  if (totalPages <= 1) return null;
  const href = (n: number) => {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => { if (v) sp.set(k, v); });
    if (n > 1) sp.set("halaman", String(n));
    const s = sp.toString();
    return s ? `${basePath}?${s}` : basePath;
  };
  return (
    <nav aria-label="Halaman" className="mt-8 flex flex-wrap justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <Link key={n} href={href(n)} aria-current={n === page ? "page" : undefined}
          className={`min-w-10 rounded border px-3 py-2 text-center text-sm ${n === page ? "border-navy bg-navy text-white" : "border-tanah-100 text-navy hover:border-tanah"}`}>{n}</Link>
      ))}
    </nav>
  );
}
