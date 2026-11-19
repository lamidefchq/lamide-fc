"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

const links = [
  ["News", "/news"],
  ["Banter Room", "/banter"],
  ["Match Centre", "/matches"],
  ["Hot Takes", "/hot-takes"],
  ["Predictions", "/predictions"],
  ["Transfer Room", "/transfers"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const router = useRouter();

  useEffect(() => {
    if (!supabase) return;

    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setLoggedIn(Boolean(data.session));
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(Boolean(session));
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleLogout() {
    if (!supabase) return;

    await supabase.auth.signOut();
    setLoggedIn(false);
    setOpen(false);
    router.replace("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#292721] bg-[#090909]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">

        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#C9A44C] text-xl font-black text-black">
            L
          </span>

          <span>
            <span className="block text-lg font-black tracking-[.12em]">
              LAMIDE FC
            </span>
            <span className="block text-[9px] font-bold tracking-[.25em] text-[#C9A44C]">
              FOOTBALL WITHOUT FILTERS
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-[#c9c5bb] transition hover:text-[#C9A44C]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm text-[#d8d2c5] hover:text-[#C9A44C]"
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-[#d8d2c5] hover:text-[#C9A44C]"
              >
                Log in
              </Link>

              <Link href="/signup" className="btn-gold text-sm">
                Join the community
              </Link>
            </>
          )}
        </div>

        <button
          aria-label="Toggle navigation"
          className="rounded-lg border border-[#38342b] p-2 lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="grid gap-1 border-t border-[#292721] bg-[#101010] p-4 lg:hidden">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm hover:bg-[#222]"
            >
              {label}
            </Link>
          ))}

          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="px-3 py-3 text-left text-sm"
            >
              Log out
            </button>
          ) : (
            <>
              <Link href="/login" className="px-3 py-3 text-sm">
                Log in
              </Link>

              <Link href="/signup" className="btn-gold text-center">
                Join the community
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
