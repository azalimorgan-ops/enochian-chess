"use client";

import { useState } from "react";
import { Element } from "@enochian-chess/data";
import { useGameStore, GameMode } from "@/store/game-store";
import { GameController } from "@/components/game/GameController";
import Link from "next/link";

const ELEMENTS = [
  { value: Element.FIRE, label: "Fire", color: "bg-red-600" },
  { value: Element.WATER, label: "Water", color: "bg-blue-600" },
  { value: Element.AIR, label: "Air", color: "bg-yellow-600" },
  { value: Element.EARTH, label: "Earth", color: "bg-green-600" },
];

const MODES: { value: GameMode; label: string; description: string }[] = [
  { value: "solo", label: "Solo vs AI", description: "Play one element against three AI opponents" },
  { value: "pass-and-play", label: "Pass & Play", description: "Four players share one device" },
  { value: "team-2p", label: "2-Player Teams", description: "Each player controls two allied elements" },
];

export default function GamePage() {
  const { gameState, newGame } = useGameStore();
  const [selectedElement, setSelectedElement] = useState<Element>(Element.FIRE);
  const [selectedMode, setSelectedMode] = useState<GameMode>("solo");

  if (gameState) {
    return <GameController />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <Link href="/" className="absolute top-6 left-6 text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors">
        &larr; Back
      </Link>

      <h1 className="text-3xl font-bold text-[var(--color-gold)] mb-8" style={{ fontFamily: "Cinzel, serif" }}>
        New Game
      </h1>

      <div className="max-w-md w-full space-y-8">
        {/* Element Selection */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Opening Element</h2>
          <p className="text-sm text-[var(--color-muted)] mb-4">
            Determines turn order and alliance structure (Concourse of Forces)
          </p>
          <div className="grid grid-cols-2 gap-3">
            {ELEMENTS.map((el) => (
              <button
                key={el.value}
                onClick={() => setSelectedElement(el.value)}
                className={`p-4 rounded-lg border transition-all ${
                  selectedElement === el.value
                    ? "border-[var(--color-gold)] bg-[var(--color-elevated)]"
                    : "border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-muted)]"
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${el.color} mb-2`} />
                <div className="font-medium">{el.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selection */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Game Mode</h2>
          <div className="space-y-3">
            {MODES.map((mode) => (
              <button
                key={mode.value}
                onClick={() => setSelectedMode(mode.value)}
                className={`w-full p-4 rounded-lg border text-left transition-all ${
                  selectedMode === mode.value
                    ? "border-[var(--color-gold)] bg-[var(--color-elevated)]"
                    : "border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-muted)]"
                }`}
              >
                <div className="font-medium">{mode.label}</div>
                <div className="text-sm text-[var(--color-muted)] mt-1">{mode.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => newGame(selectedElement, selectedMode)}
          className="w-full py-4 rounded-lg bg-[var(--color-gold-dark)] hover:bg-[var(--color-gold)] text-black font-bold text-lg transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
