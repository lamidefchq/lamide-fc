"use client";
import { useState } from "react";
export function PollCard({ question, options, votes }: { question: string; options: string[]; votes: number[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const total = votes.reduce((a,b) => a+b, 0) + (submitted ? 1 : 0);
  return <div className="panel p-5"><p className="eyebrow">Community poll</p><h3 className="mt-2 font-bold leading-6">{question}</h3><div className="mt-4 space-y-2">{options.map((option, i) => { const count = votes[i] + (submitted && selected === i ? 1 : 0); const pct = Math.round(count / total * 100); return <button key={option} disabled={submitted} onClick={() => setSelected(i)} className={`relative w-full overflow-hidden rounded-lg border px-3 py-3 text-left text-sm ${selected === i ? "border-[#C9A44C]" : "border-[#37332a]"} ${submitted ? "cursor-default" : "hover:border-[#C9A44C]"}`}><span className="relative z-10 flex justify-between"><span>{option}</span>{submitted && <span className="text-[#C9A44C]">{pct}%</span>}</span>{submitted && <span className="absolute inset-y-0 left-0 bg-[#C9A44C]/15" style={{ width: `${pct}%` }}/>}</button>})}</div>{submitted ? <p className="mt-3 text-xs text-[#8f897d]">{total} votes · demo poll</p> : <button disabled={selected === null} onClick={() => setSubmitted(true)} className="btn-gold mt-4 w-full text-sm disabled:cursor-not-allowed disabled:opacity-40">Cast vote</button>}</div>;
}
