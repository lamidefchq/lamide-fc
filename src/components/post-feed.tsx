"use client";
import { useState } from "react";
import { MessageCircle, Heart, Share2, Send } from "lucide-react";
import { demoPosts } from "@/lib/demo-data";

export function PostFeed() {
  const [posts, setPosts] = useState(demoPosts);
  const [draft, setDraft] = useState("");
  const [liked, setLiked] = useState<string[]>([]);
  const [comments, setComments] = useState<Record<string, string[]>>({});
  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});
  function publish() {
    if (!draft.trim()) return;
    setPosts([{ id: `local-${Date.now()}`, author: "You (demo)", club: "Community", time: "Just now", category: "Community", body: draft.trim(), likes: 0, comments: 0 }, ...posts]);
    setDraft("");
  }
  function toggleLike(id: string) {
    const already = liked.includes(id);
    setLiked(already ? liked.filter(x => x !== id) : [...liked, id]);
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + (already ? -1 : 1) } : p));
  }
  function addComment(id: string) {
    const value = commentDraft[id]?.trim();
    if (!value) return;
    setComments({ ...comments, [id]: [...(comments[id] || []), value] });
    setCommentDraft({ ...commentDraft, [id]: "" });
  }
  return <div className="space-y-4">
    <div className="panel p-4"><p className="eyebrow">Have your say</p><textarea value={draft} onChange={e => setDraft(e.target.value)} placeholder="What's your football take today?" className="mt-3 min-h-24 w-full resize-y rounded-lg border border-[#39352c] bg-[#0c0c0c] p-3 text-sm outline-none focus:border-[#C9A44C]" /><div className="mt-3 flex items-center justify-between"><span className="text-xs text-[#77736b]">Demo mode · posts are stored in this page session only</span><button onClick={publish} className="btn-gold inline-flex items-center gap-2 text-sm"><Send size={14}/> Publish post</button></div></div>
    {posts.map(post => <article key={post.id} className="panel card-hover p-4"><div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full border border-[#5c4a27] bg-[#211b10] font-bold text-[#C9A44C]">{post.author.slice(0,1).toUpperCase()}</div><div><p className="text-sm font-bold">{post.author}</p><p className="text-xs text-[#817c72]">{post.club} · {post.time}</p></div></div><span className="rounded-full border border-[#4b3e25] px-2 py-1 text-[10px] text-[#C9A44C]">{post.category}</span></div><p className="mt-4 text-sm leading-7 text-[#e4dfd4]">{post.body}</p><div className="mt-4 flex gap-5 border-t border-[#292721] pt-3 text-xs text-[#96928a]"><button onClick={() => toggleLike(post.id)} className={`inline-flex items-center gap-2 hover:text-[#C9A44C] ${liked.includes(post.id) ? "text-[#C9A44C]" : ""}`}><Heart size={15} fill={liked.includes(post.id) ? "currentColor" : "none"}/>{post.likes} likes</button><span className="inline-flex items-center gap-2"><MessageCircle size={15}/>{post.comments + (comments[post.id]?.length || 0)} comments</span><button onClick={() => navigator.clipboard?.writeText(post.body)} className="inline-flex items-center gap-2 hover:text-[#C9A44C]"><Share2 size={15}/>Copy</button></div><div className="mt-3 space-y-2">{(comments[post.id] || []).map((c, i) => <p key={i} className="rounded-lg bg-[#101010] px-3 py-2 text-xs text-[#c9c3b8]">{c}</p>)}<div className="flex gap-2"><input value={commentDraft[post.id] || ""} onChange={e => setCommentDraft({ ...commentDraft, [post.id]: e.target.value })} placeholder="Add to the conversation..." className="min-w-0 flex-1 rounded-lg border border-[#39352c] bg-[#0c0c0c] px-3 py-2 text-xs outline-none focus:border-[#C9A44C]"/><button onClick={() => addComment(post.id)} className="btn-ghost text-xs">Reply</button></div></div></article>)}
  </div>;
}
