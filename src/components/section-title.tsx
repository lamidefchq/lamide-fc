export function SectionTitle({ eyebrow, title, detail }: { eyebrow: string; title: string; detail?: string }) {
  return <div className="mb-5"><p className="eyebrow">{eyebrow}</p><h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">{title}</h2>{detail && <p className="mt-2 text-sm text-[#96928a]">{detail}</p>}</div>;
}
