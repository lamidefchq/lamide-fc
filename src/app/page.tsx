import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, MessageCircle, TrendingUp, Trophy, Users } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { PostFeed } from "@/components/post-feed";
import { PollCard } from "@/components/poll-card";
import { demoFixtures, demoPolls } from "@/lib/demo-data";

export default function HomePage() {
  return <div>
    <section className="relative isolate overflow-hidden border-b border-[#2c281f]">
      <div className="absolute inset-0 -z-20 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=85&w=2200&auto=format&fit=crop')] bg-cover bg-center opacity-35"/>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/85 to-black/35"/>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:min-h-[570px] md:grid-cols-[1.15fr_.85fr] md:py-24 lg:px-8">
        <div><p className="eyebrow">The Premier League supporters' platform</p><h1 className="mt-5 max-w-3xl text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-7xl">IT'S MORE THAN <span className="gold-text">JUST</span> FOOTBALL.</h1><p className="mt-6 max-w-xl text-base leading-7 text-[#c9c3b8] md:text-lg">Your home for Premier League football. News, opinions, rivalries and banter. Speak your mind and join the conversation.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/signup" className="btn-gold inline-flex items-center gap-2">Join the community <ArrowUpRight size={16}/></Link><Link href="/banter" className="btn-ghost">Enter the Banter Room</Link></div><div className="mt-10 flex flex-wrap gap-6 text-xs text-[#aaa397]"><span className="inline-flex items-center gap-2"><Users size={15} className="text-[#C9A44C]"/> Supporters first</span><span className="inline-flex items-center gap-2"><MessageCircle size={15} className="text-[#C9A44C]"/> Unfiltered debate</span><span className="inline-flex items-center gap-2"><Trophy size={15} className="text-[#C9A44C]"/> Matchday energy</span></div></div>
        <div className="panel gold-border hidden p-5 md:block"><p className="eyebrow">The LAMIDE FC mindset</p><p className="mt-4 text-3xl font-black leading-tight">Back your club.<br/><span className="gold-text">Respect the game.</span><br/>Bring your opinion.</p><div className="mt-8 border-t border-[#393329] pt-5"><p className="text-xs uppercase tracking-[.18em] text-[#8f887a]">Our promise</p><p className="mt-2 text-sm leading-6 text-[#c9c3b8]">A place for every Premier League fan. Strong opinions welcome. Personal abuse is not.</p></div></div>
      </div>
    </section>

    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.55fr_.8fr]">
        <section><SectionTitle eyebrow="The conversation" title="Inside the Banter Room" detail="The latest takes from the LAMIDE FC community."/><PostFeed/><div className="mt-5"><Link href="/banter" className="btn-ghost inline-flex items-center gap-2 text-sm">View all discussions <ArrowUpRight size={15}/></Link></div></section>
        <aside className="space-y-8">
          <section><SectionTitle eyebrow="Have your say" title="The big question"/><PollCard {...demoPolls[0]}/></section>
          <section><div className="mb-4 flex items-center justify-between"><div><p className="eyebrow">Matchday watch</p><h2 className="mt-2 text-2xl font-black">Upcoming fixtures</h2></div><CalendarDays className="text-[#C9A44C]"/></div><div className="space-y-3">{demoFixtures.map((f,i)=><div key={i} className="panel p-4"><div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#8e887d]"><span>{f.date}</span><span className="text-[#C9A44C]">{f.status}</span></div><div className="mt-3 flex items-center justify-between gap-2 text-sm font-bold"><span>{f.home}</span><span className="rounded-md bg-[#252117] px-3 py-2 text-xs text-[#C9A44C]">{f.time}</span><span className="text-right">{f.away}</span></div></div>)}</div><p className="mt-2 text-[10px] text-[#777168]">Fixture preview · connect a live football data provider for automatic updates.</p><Link href="/matches" className="mt-4 inline-flex items-center gap-2 text-sm text-[#C9A44C]">Open Match Centre <ArrowUpRight size={14}/></Link></section>
          <section className="panel p-5"><p className="eyebrow">Your platform. Your voice.</p><h3 className="mt-2 text-xl font-black">The conversation is better with you in it.</h3><p className="mt-2 text-sm leading-6 text-[#9e988c]">Create your profile, rep your club and join supporters from around the world.</p><Link href="/signup" className="btn-gold mt-5 inline-block w-full text-center text-sm">Become a member</Link></section>
        </aside>
      </div>
      <section className="mt-16"><SectionTitle eyebrow="The LAMIDE FC standard" title="Football without filters. Community without borders."/><div className="grid gap-4 md:grid-cols-3">{[{icon:<TrendingUp/>,title:"Follow the story",body:"Keep up with the biggest Premier League talking points and transfer developments."},{icon:<MessageCircle/>,title:"Debate everything",body:"Share your opinion, challenge a take and enjoy the banter with fellow supporters."},{icon:<Trophy/>,title:"Back your knowledge",body:"Make match predictions, collect points and climb the community leaderboard."}].map(x=><div key={x.title} className="panel card-hover p-5"><div className="text-[#C9A44C]">{x.icon}</div><h3 className="mt-4 font-bold">{x.title}</h3><p className="mt-2 text-sm leading-6 text-[#96928a]">{x.body}</p></div>)}</div></section>
    </div>
  </div>;
}
