import { ImageIcon } from "lucide-react";

/** Menampilkan foto produk; bila belum ada foto, tampil penanda posisi (bukan foto palsu). */
export default function ProductImage({ src, alt, className = "" }: { src?: string; alt: string; className?: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div role="img" aria-label={`Foto ${alt} belum tersedia`} className={`motif-tenun relative flex h-full w-full items-center justify-center ${className}`}>
      <div className="flex items-center gap-2 rounded bg-white/90 px-3 py-1.5 text-xs font-medium text-navy">
        <ImageIcon size={14} aria-hidden /> Foto belum diunggah
      </div>
    </div>
  );
}
