import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "LAMIDE FC — Football Without Filters",
  description: "Your home for Premier League football: news, opinions, rivalries and banter.",
  openGraph: { title: "LAMIDE FC", description: "Football Without Filters." }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><main>{children}</main><SiteFooter /></body></html>;
}
