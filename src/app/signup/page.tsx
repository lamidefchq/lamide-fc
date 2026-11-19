"use client";
import Link from "next/link";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase";
export default function SignupPage() {
const { error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${window.location.origin}/login`,
    data: {
      full_name: name,
      username,
      favourite_club: club
    }
  }
});
