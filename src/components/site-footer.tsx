import Link from "next/link";
export function SiteFooter() {
  return <footer className="mt-20 border-t border-[#292721] bg-[#0d0d0d]"><div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 lg:px-8">
    <div><div className="text-xl font-black tracking-[.14em]">LAMIDE <span className="text-[#C9A44C]">FC</span></div><p className="mt-2 text-xs tracking-[.18em] text-[#C9A44C]">FOOTBALL WITHOUT FILTERS.</p><p className="mt-4 max-w-xs text-sm leading-6 text-[#96928a]">A home for Premier League supporters to follow the game, share opinions and enjoy the conversation.</p></div>
    <div><p className="eyebrow">Explore</p><div className="mt-4 grid grid-cols-2 gap-3 text-sm text-[#c7c1b5]"><Link href="/news">Latest news</Link><Link href="/banter">Banter Room</Link><Link href="/matches">Match Centre</Link><Link href="/predictions">Predictions</Link><Link href="/transfers">Transfer Room</Link><Link href="/about">About us</Link></div></div>
    <div><p className="eyebrow">The LAMIDE FC standard</p><p className="mt-4 text-sm leading-6 text-[#96928a]">Respect the people. Debate the football. Keep the banter lively, not abusive.</p><p className="mt-5 text-xs text-[#68645d]">Independent fan community. Not affiliated with the Premier League or its clubs.</p></div>
  </div><div className="border-t border-[#24221e] py-4 text-center text-xs text-[#706c64]">© {new Date().getFullYear()} LAMIDE FC. All rights reserved.</div></footer>;
}
