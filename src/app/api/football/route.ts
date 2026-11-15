import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.FOOTBALL_DATA_API_TOKEN;
  if (!token) return NextResponse.json({ mode: "demo", message: "Football API is not configured. Add FOOTBALL_DATA_API_TOKEN on the server.", matches: [] }, { status: 200 });
  const response = await fetch("https://api.football-data.org/v4/competitions/PL/matches?status=SCHEDULED,LIVE,IN_PLAY,PAUSED,FINISHED", {
    headers: { "X-Auth-Token": token },
    next: { revalidate: 60 }
  });
  if (!response.ok) return NextResponse.json({ error: "Football data provider request failed", providerStatus: response.status }, { status: 502 });
  const data = await response.json();
  return NextResponse.json({ mode: "live-provider", matches: data.matches ?? [] });
}
