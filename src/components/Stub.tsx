export default function Stub({ title, note }: { title: string; note: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl text-navy">{title}</h1>
      <p className="mt-3 text-ink/70">{note}</p>
    </section>
  );
}
