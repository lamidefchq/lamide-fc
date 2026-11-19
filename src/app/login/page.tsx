"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setMessage("Supabase is not configured correctly.");
      return;
    }

    setBusy(true);
    setMessage("");

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (!data.session) {
        setMessage("Login session could not be created.");
        return;
      }

      router.replace("/");
      router.refresh();

    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="panel p-7">
        <p className="eyebrow">Welcome back</p>

        <h1 className="mt-2 text-3xl font-black">
          Log in
        </h1>

        <form
          onSubmit={submit}
          className="mt-6 space-y-4"
        >
          <label className="block text-sm">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-[#39352c] bg-[#0b0b0b] p-3"
            />
          </label>

          <label className="block text-sm">
            Password
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-[#39352c] bg-[#0b0b0b] p-3"
            />
          </label>

          <button
            disabled={busy}
            className="btn-gold w-full"
          >
            {busy ? "Please wait..." : "Log in"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-[#C9A44C]">
            {message}
          </p>
        )}

        <p className="mt-5 text-sm text-[#96928a]">
          New to LAMIDE FC?{" "}
          <Link
            className="text-[#C9A44C]"
            href="/signup"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
