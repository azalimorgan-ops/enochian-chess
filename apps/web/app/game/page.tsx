"use client";

import { useState } from "react";
import { Element } from "@enochian-chess/data";
import { useGameStore, GameMode, Difficulty } from "@/store/game-store";
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

const DIFFICULTIES: { value: Difficulty; label: string; description: string }[] = [
  { value: "beginner", label: "Beginner", description: "Weaker AI with move hints highlighted" },
  { value: "intermediate", label: "Intermediate", description: "Balanced AI, no hints" },
  { value: "advanced", label: "Advanced", description: "Stronger AI that thinks deeper" },
];

export default function GamePage() {
  const { gameState, newGame } = useGameStore();
  const [selectedElement, setSelectedElement] = useState<Element>(Element.FIRE);
  const [selectedMode, setSelectedMode] = useState<GameMode>("solo");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("beginner");

  if (gameState) {
    return <GameController />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="absolute top-6 left-6 flex items-center gap-4">
        <Link href="/" className="text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors">
          &larr; Back
        </Link>
        <Link href="/how-to-play" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors border border-[var(--color-border)] px-3 py-1 rounded-lg hover:border-[var(--color-gold-dark)]">
          How to Play
        </Link>
      </div>

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

        {/* Difficulty Selection (only for modes with AI) */}
        {selectedMode !== "pass-and-play" && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Difficulty</h2>
            <div className="grid grid-cols-3 gap-3">
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff.value}
                  onClick={() => setSelectedDifficulty(diff.value)}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    selectedDifficulty === diff.value
                      ? "border-[var(--color-gold)] bg-[var(--color-elevated)]"
                      : "border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-muted)]"
                  }`}
                >
                  <div className="font-medium text-sm">{diff.label}</div>
                  <div className="text-xs text-[var(--color-muted)] mt-1">{diff.description}</div>
                </button>
              ))}
            </div>
            {selectedDifficulty === "beginner" && (
              <p className="text-xs text-blue-400 mt-2">
                Recommended moves will glow blue when you select a piece
              </p>
            )}
          </div>
        )}

        {/* Start Button */}
        <button
          onClick={() => newGame(selectedElement, selectedMode, selectedDifficulty)}
          className="w-full py-4 rounded-lg bg-[var(--color-gold-dark)] hover:bg-[var(--color-gold)] text-black font-bold text-lg transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
