"use client";

import { useState } from "react";
import { Element } from "@enochian-chess/data";
import { generateAutomatedReading, DivinationReading } from "@enochian-chess/engine";
import { Board } from "@/components/board/Board";
import Link from "next/link";

const ELEMENTS = [
  { value: Element.FIRE, label: "Fire", desc: "Will, action, creative power", color: "text-red-500", bg: "border-red-900" },
  { value: Element.WATER, label: "Water", desc: "Emotion, intuition, relationships", color: "text-blue-500", bg: "border-blue-900" },
  { value: Element.AIR, label: "Air", desc: "Thought, communication, intellect", color: "text-yellow-500", bg: "border-yellow-900" },
  { value: Element.EARTH, label: "Earth", desc: "Material, practical, physical", color: "text-green-500", bg: "border-green-900" },
];

export default function DivinationPage() {
  const [query, setQuery] = useState("");
  const [queryElement, setQueryElement] = useState<Element>(Element.WATER);
  const [reading, setReading] = useState<DivinationReading | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedPiece, setExpandedPiece] = useState<string | null>(null);

  const generateReading = async () => {
    if (!query.trim()) return;
    setIsGenerating(true);
    // Let UI update
    await new Promise((r) => setTimeout(r, 50));
    try {
      const result = generateAutomatedReading(query, queryElement);
      setReading(result);
    } catch (e) {
      console.error("Reading generation failed:", e);
    }
    setIsGenerating(false);
  };

  if (reading) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setReading(null)}
              className="text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors"
            >
              &larr; New Reading
            </button>
            <h1 className="text-xl font-bold text-[var(--color-gold)]" style={{ fontFamily: "Cinzel, serif" }}>
              Divination Reading
            </h1>
            <div />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Board showing final state */}
            <div className="flex-1 flex justify-center">
              <Board
                pieces={reading.finalState.pieces}
                selectedPieceId={null}
                legalMoves={[]}
                currentTurn={reading.queryElement}
                onSquareClick={() => {}}
                showLabels
              />
            </div>

            {/* Reading */}
            <div className="lg:w-96 space-y-6">
              <div className="p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)]">
                <div className="text-sm text-[var(--color-muted)] mb-1">Query</div>
                <div className="text-lg italic">&ldquo;{reading.query}&rdquo;</div>
                <div className={`text-sm mt-2 ${ELEMENTS.find(e => e.value === reading.queryElement)?.color}`}>
                  {ELEMENTS.find(e => e.value === reading.queryElement)?.label} Question
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)]">
                <div className="text-sm text-[var(--color-muted)] mb-2">Summary</div>
                <div className="text-sm leading-relaxed whitespace-pre-line">{reading.summary}</div>
              </div>

              <div className="p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)]">
                <div className="text-sm text-[var(--color-muted)] mb-3">Piece Readings ({reading.pieceReadings.length})</div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {reading.pieceReadings.map((pr) => (
                    <button
                      key={pr.piece.id}
                      onClick={() => setExpandedPiece(expandedPiece === pr.piece.id ? null : pr.piece.id)}
                      className="w-full text-left p-3 rounded bg-[var(--color-elevated)] hover:bg-[var(--color-border)] transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">
                          {pr.piece.template.godForm} ({pr.piece.template.element})
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          pr.dignityModifier === "FRIENDLY" ? "bg-green-900 text-green-300" :
                          pr.dignityModifier === "HOSTILE" ? "bg-red-900 text-red-300" :
                          pr.dignityModifier === "MIXED" ? "bg-yellow-900 text-yellow-300" :
                          "bg-gray-800 text-gray-300"
                        }`}>
                          {pr.dignityModifier}
                        </span>
                      </div>
                      {expandedPiece === pr.piece.id && (
                        <div className="mt-2 text-xs text-[var(--color-muted)] leading-relaxed">
                          {pr.combinedMeaning}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {reading.dignityInteractions.length > 0 && (
                <div className="p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)]">
                  <div className="text-sm text-[var(--color-muted)] mb-3">Elemental Interactions</div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {reading.dignityInteractions.slice(0, 10).map((di, i) => (
                      <div key={i} className="text-xs text-[var(--color-muted)] p-2 rounded bg-[var(--color-elevated)]">
                        {di.interpretation}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <Link href="/" className="absolute top-6 left-6 text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors">
        &larr; Back
      </Link>

      <h1 className="text-3xl font-bold text-[var(--color-gold)] mb-2" style={{ fontFamily: "Cinzel, serif" }}>
        Divination
      </h1>
      <p className="text-[var(--color-muted)] mb-8">
        Receive a reading through the Enochian chess system
      </p>

      <div className="max-w-md w-full space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Your Question</label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What guidance do you seek?"
            className="w-full p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] focus:border-[var(--color-gold-dark)] outline-none resize-none h-24"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Nature of the Question</label>
          <div className="grid grid-cols-2 gap-3">
            {ELEMENTS.map((el) => (
              <button
                key={el.value}
                onClick={() => setQueryElement(el.value)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  queryElement === el.value
                    ? `${el.bg} bg-[var(--color-elevated)]`
                    : "border-[var(--color-border)] bg-[var(--color-card)]"
                }`}
              >
                <div className={`font-medium ${el.color}`}>{el.label}</div>
                <div className="text-xs text-[var(--color-muted)]">{el.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generateReading}
          disabled={!query.trim() || isGenerating}
          className="w-full py-4 rounded-lg bg-[var(--color-gold-dark)] hover:bg-[var(--color-gold)] text-black font-bold text-lg transition-colors disabled:opacity-50"
        >
          {isGenerating ? "Generating Reading..." : "Perform Reading"}
        </button>
      </div>
    </div>
  );
}
