"use client";

import { useState } from "react";
import Link from "next/link";

interface LobbySession {
  id: string;
  host: string;
  mode: string;
  players: number;
  maxPlayers: number;
  status: string;
}

// Mock sessions until Supabase is connected
const MOCK_SESSIONS: LobbySession[] = [
  { id: "1", host: "Soror NSMA", mode: "Team 2v2", players: 2, maxPlayers: 4, status: "waiting" },
  { id: "2", host: "Frater LVX", mode: "Full 4-Player", players: 3, maxPlayers: 4, status: "waiting" },
  { id: "3", host: "Soror AV", mode: "Team 2v2", players: 4, maxPlayers: 4, status: "in_progress" },
];

export default function MultiplayerPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedMode, setSelectedMode] = useState<"team_2p" | "full_4p">("team_2p");

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors">
            &larr; Back
          </Link>
          <h1 className="text-2xl font-bold text-[var(--color-gold)]" style={{ fontFamily: "Cinzel, serif" }}>
            Online Play
          </h1>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="px-4 py-2 bg-[var(--color-gold-dark)] hover:bg-[var(--color-gold)] text-black rounded font-medium transition-colors text-sm"
          >
            Create Game
          </button>
        </div>

        {/* Create Game Panel */}
        {showCreate && (
          <div className="mb-8 p-6 rounded-lg bg-[var(--color-card)] border border-[var(--color-gold-dark)]">
            <h2 className="text-lg font-semibold mb-4">Create New Session</h2>
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setSelectedMode("team_2p")}
                className={`flex-1 p-3 rounded border text-sm transition-all ${
                  selectedMode === "team_2p"
                    ? "border-[var(--color-gold)] bg-[var(--color-elevated)]"
                    : "border-[var(--color-border)]"
                }`}
              >
                <div className="font-medium">Team 2v2</div>
                <div className="text-xs text-[var(--color-muted)]">Each player controls two allied elements</div>
              </button>
              <button
                onClick={() => setSelectedMode("full_4p")}
                className={`flex-1 p-3 rounded border text-sm transition-all ${
                  selectedMode === "full_4p"
                    ? "border-[var(--color-gold)] bg-[var(--color-elevated)]"
                    : "border-[var(--color-border)]"
                }`}
              >
                <div className="font-medium">Full 4-Player</div>
                <div className="text-xs text-[var(--color-muted)]">Four individual players, one per element</div>
              </button>
            </div>
            <button className="w-full py-3 bg-[var(--color-gold-dark)] hover:bg-[var(--color-gold)] text-black rounded font-medium transition-colors">
              Create &amp; Wait for Players
            </button>
            <p className="text-xs text-[var(--color-muted)] mt-2 text-center">
              Requires Supabase connection. Configure .env.local with your project keys.
            </p>
          </div>
        )}

        {/* Quick Match */}
        <div className="mb-8 p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-between">
          <div>
            <div className="font-medium">Quick Match</div>
            <div className="text-sm text-[var(--color-muted)]">Find an opponent automatically via ELO-based matchmaking</div>
          </div>
          <button className="px-4 py-2 bg-[var(--color-elevated)] border border-[var(--color-border)] hover:border-[var(--color-gold-dark)] rounded font-medium transition-colors text-sm">
            Find Match
          </button>
        </div>

        {/* Active Sessions */}
        <h2 className="text-lg font-semibold mb-4">Open Sessions</h2>
        <div className="space-y-3">
          {MOCK_SESSIONS.map((session) => (
            <div
              key={session.id}
              className="p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{session.host}&apos;s Game</div>
                <div className="text-sm text-[var(--color-muted)]">
                  {session.mode} &middot; {session.players}/{session.maxPlayers} players
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded ${
                  session.status === "waiting"
                    ? "bg-green-900 text-green-300"
                    : "bg-yellow-900 text-yellow-300"
                }`}>
                  {session.status === "waiting" ? "Open" : "In Progress"}
                </span>
                {session.status === "waiting" && (
                  <button className="px-3 py-1 bg-[var(--color-gold-dark)] hover:bg-[var(--color-gold)] text-black rounded text-sm font-medium transition-colors">
                    Join
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="mt-8 p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)]">
          <h3 className="font-medium mb-2">How Online Play Works</h3>
          <ul className="text-sm text-[var(--color-muted)] space-y-1">
            <li>&bull; Games use Supabase Realtime for live move synchronization</li>
            <li>&bull; ELO ratings update after each completed game</li>
            <li>&bull; Both individual and team ELO (Fire+Air vs Water+Earth) are tracked</li>
            <li>&bull; AI fills empty seats if a player disconnects</li>
            <li>&bull; Matchmaking pairs players within 200 ELO points</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
