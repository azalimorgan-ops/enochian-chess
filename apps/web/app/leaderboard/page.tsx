"use client";

import { useState } from "react";
import Link from "next/link";

type Tab = "players" | "practitioners";

// Placeholder data — will be replaced with Supabase queries
const MOCK_PLAYERS = [
  { rank: 1, name: "Soror NSMA", elo: 1847, teamElo: { "Fire+Air": 1920, "Water+Earth": 1780 }, wins: 142, losses: 38, streak: 12 },
  { rank: 2, name: "Frater LVX", elo: 1793, teamElo: { "Fire+Air": 1750, "Water+Earth": 1840 }, wins: 128, losses: 45, streak: 5 },
  { rank: 3, name: "Soror AV", elo: 1721, teamElo: { "Fire+Air": 1800, "Water+Earth": 1650 }, wins: 98, losses: 52, streak: 3 },
  { rank: 4, name: "Frater AO", elo: 1698, teamElo: { "Fire+Air": 1680, "Water+Earth": 1720 }, wins: 87, losses: 61, streak: 7 },
  { rank: 5, name: "Soror TH", elo: 1654, teamElo: { "Fire+Air": 1600, "Water+Earth": 1710 }, wins: 73, losses: 55, streak: 2 },
];

const MOCK_PRACTITIONERS = [
  { rank: 1, name: "Soror NSMA", readings: 487, streak: 156, milestones: 12, encyclopediaPercent: 94 },
  { rank: 2, name: "Frater AO", readings: 342, streak: 89, milestones: 10, encyclopediaPercent: 87 },
  { rank: 3, name: "Soror TH", readings: 298, streak: 42, milestones: 9, encyclopediaPercent: 72 },
  { rank: 4, name: "Frater LVX", readings: 215, streak: 31, milestones: 7, encyclopediaPercent: 65 },
  { rank: 5, name: "Soror AV", readings: 189, streak: 23, milestones: 6, encyclopediaPercent: 58 },
];

export default function LeaderboardPage() {
  const [tab, setTab] = useState<Tab>("players");

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors">
            &larr; Back
          </Link>
          <h1 className="text-2xl font-bold text-[var(--color-gold)]" style={{ fontFamily: "Cinzel, serif" }}>
            World Leaderboard
          </h1>
          <div />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-[var(--color-card)] rounded-lg p-1">
          <button
            onClick={() => setTab("players")}
            className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
              tab === "players"
                ? "bg-[var(--color-elevated)] text-[var(--color-gold)]"
                : "text-[var(--color-muted)] hover:text-white"
            }`}
          >
            Players
          </button>
          <button
            onClick={() => setTab("practitioners")}
            className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
              tab === "practitioners"
                ? "bg-[var(--color-elevated)] text-[var(--color-gold)]"
                : "text-[var(--color-muted)] hover:text-white"
            }`}
          >
            Practitioners
          </button>
        </div>

        {tab === "players" && (
          <div className="space-y-3">
            <p className="text-sm text-[var(--color-muted)] mb-4">
              Competitive rankings based on ELO rating. Both individual and team ELO are tracked — performance varies by elemental pairing.
            </p>
            {MOCK_PLAYERS.map((player) => (
              <div key={player.rank} className="p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] flex items-center gap-4">
                <div className={`text-2xl font-bold w-8 text-center ${
                  player.rank === 1 ? "text-[var(--color-gold)]" :
                  player.rank === 2 ? "text-gray-400" :
                  player.rank === 3 ? "text-amber-700" : "text-[var(--color-muted)]"
                }`}>
                  {player.rank}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{player.name}</div>
                  <div className="text-sm text-[var(--color-muted)]">
                    {player.wins}W / {player.losses}L &middot; {player.streak} game streak
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[var(--color-gold)]">{player.elo}</div>
                  <div className="text-xs text-[var(--color-muted)]">Individual ELO</div>
                </div>
                <div className="hidden md:block text-right pl-4 border-l border-[var(--color-border)]">
                  {Object.entries(player.teamElo).map(([team, elo]) => (
                    <div key={team} className="text-xs text-[var(--color-muted)]">
                      <span className="font-medium">{team}:</span> {elo}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "practitioners" && (
          <div className="space-y-3">
            <p className="text-sm text-[var(--color-muted)] mb-4">
              Esoteric engagement tracking — readings performed, daily streaks, mastery milestones, and encyclopedia completion.
            </p>
            {MOCK_PRACTITIONERS.map((p) => (
              <div key={p.rank} className="p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] flex items-center gap-4">
                <div className={`text-2xl font-bold w-8 text-center ${
                  p.rank === 1 ? "text-[var(--color-gold)]" :
                  p.rank === 2 ? "text-gray-400" :
                  p.rank === 3 ? "text-amber-700" : "text-[var(--color-muted)]"
                }`}>
                  {p.rank}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-[var(--color-muted)]">
                    {p.readings} readings &middot; {p.streak} day streak &middot; {p.milestones} milestones
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[var(--color-earth)]">{p.encyclopediaPercent}%</div>
                  <div className="text-xs text-[var(--color-muted)]">Encyclopedia</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] text-center">
          <p className="text-sm text-[var(--color-muted)]">
            Leaderboard data is synced via Supabase with real-time subscriptions.
            Sign in to track your progress globally.
          </p>
        </div>
      </div>
    </div>
  );
}
