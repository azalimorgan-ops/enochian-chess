"use client";

import { useState } from "react";
import { GOD_FORMS, HISTORY_ENTRIES, ALL_PIECE_TEMPLATES, BOARD_GRID, DIGNITY_MATRIX, Element, DignityRelation } from "@enochian-chess/data";
import Link from "next/link";

type Tab = "pieces" | "board" | "dignities" | "history";

const ELEMENT_COLORS: Record<Element, string> = {
  [Element.FIRE]: "text-red-500",
  [Element.WATER]: "text-blue-500",
  [Element.AIR]: "text-yellow-500",
  [Element.EARTH]: "text-green-500",
};

const DIGNITY_COLORS: Record<DignityRelation, string> = {
  [DignityRelation.FRIENDLY]: "bg-green-900 text-green-300",
  [DignityRelation.HOSTILE]: "bg-red-900 text-red-300",
  [DignityRelation.NEUTRAL]: "bg-gray-800 text-gray-300",
  [DignityRelation.MIXED]: "bg-yellow-900 text-yellow-300",
};

export default function EncyclopediaPage() {
  const [tab, setTab] = useState<Tab>("pieces");
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  const tabs: { id: Tab; label: string }[] = [
    { id: "pieces", label: "Pieces" },
    { id: "board", label: "Board" },
    { id: "dignities", label: "Dignities" },
    { id: "history", label: "History" },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors">
            &larr; Back
          </Link>
          <h1 className="text-2xl font-bold text-[var(--color-gold)]" style={{ fontFamily: "Cinzel, serif" }}>
            Encyclopedia
          </h1>
          <div />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-[var(--color-card)] rounded-lg p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-[var(--color-elevated)] text-[var(--color-gold)]"
                  : "text-[var(--color-muted)] hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Pieces Tab */}
        {tab === "pieces" && (
          <div className="space-y-6">
            {Object.entries(GOD_FORMS).map(([key, gf]) => (
              <div key={key} className="p-6 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)]">
                <h2 className="text-xl font-bold text-[var(--color-gold)] mb-1">{gf.name}</h2>
                <div className="text-sm text-[var(--color-muted)] mb-3">Also known as: {gf.alternateName}</div>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium text-[var(--color-gold-light)] mb-1">Mythology</div>
                    <p className="text-[var(--color-muted)] leading-relaxed">{gf.mythology}</p>
                  </div>
                  <div>
                    <div className="font-medium text-[var(--color-gold-light)] mb-1">Golden Dawn Attribution</div>
                    <p className="text-[var(--color-muted)] leading-relaxed">{gf.gdAttribution}</p>
                  </div>
                  <div>
                    <div className="font-medium text-[var(--color-gold-light)] mb-1">Symbolism</div>
                    <p className="text-[var(--color-muted)] leading-relaxed">{gf.symbolism}</p>
                  </div>
                </div>
                {/* Show pieces using this god-form */}
                <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                  <div className="text-xs text-[var(--color-muted)] mb-2">Appears as:</div>
                  <div className="flex flex-wrap gap-2">
                    {ALL_PIECE_TEMPLATES
                      .filter((p) => p.godForm.toLowerCase() === gf.name.toLowerCase() || p.godForm === gf.name)
                      .map((p, i) => (
                        <span key={i} className={`text-xs px-2 py-1 rounded bg-[var(--color-elevated)] ${ELEMENT_COLORS[p.element]}`}>
                          {p.element} {p.type}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Board Tab */}
        {tab === "board" && (
          <div className="space-y-6">
            <p className="text-sm text-[var(--color-muted)]">
              Click any square to see its full attribution — Enochian letter, sub-element, colours, spirit name, and divinatory meaning.
            </p>
            <div className="flex justify-center">
              <div className="inline-grid grid-cols-8 gap-0 border-2 border-[var(--color-gold)]">
                {BOARD_GRID.map((row, r) =>
                  row.map((square, c) => {
                    if (!square) return <div key={`${r}-${c}`} className="w-12 h-12 bg-gray-900" />;
                    const isSelected = selectedSquare === square.id;
                    return (
                      <button
                        key={square.id}
                        onClick={() => setSelectedSquare(isSelected ? null : square.id)}
                        className="w-12 h-12 relative flex items-center justify-center text-xs font-mono transition-transform hover:scale-110"
                        style={{ backgroundColor: square.kingScaleColour, color: square.queenScaleColour }}
                        title={square.id}
                      >
                        {square.enochianLetter}
                        {isSelected && (
                          <div className="absolute inset-0 border-2 border-[var(--color-gold)] z-10" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
            {selectedSquare && (() => {
              const sq = BOARD_GRID.flat().find((s) => s?.id === selectedSquare);
              if (!sq) return null;
              return (
                <div className="p-6 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)]">
                  <h3 className="text-lg font-bold mb-3">
                    Square {sq.id.toUpperCase()}
                    <span className={`ml-2 text-sm ${ELEMENT_COLORS[sq.quadrant]}`}>({sq.quadrant} Quadrant)</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-[var(--color-muted)]">Enochian Letter</div>
                      <div className="font-medium">{sq.enochianLetter}</div>
                    </div>
                    <div>
                      <div className="text-[var(--color-muted)]">Sub-Element</div>
                      <div className="font-medium">{sq.subElement.replace(/_/g, " of ").toLowerCase()}</div>
                    </div>
                    <div>
                      <div className="text-[var(--color-muted)]">King Scale</div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: sq.kingScaleColour }} />
                        <span className="font-mono text-xs">{sq.kingScaleColour}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[var(--color-muted)]">Queen Scale</div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: sq.queenScaleColour }} />
                        <span className="font-mono text-xs">{sq.queenScaleColour}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[var(--color-muted)]">Spirit Name</div>
                      <div className="font-medium">{sq.spiritName}</div>
                    </div>
                    <div>
                      <div className="text-[var(--color-muted)]">Divinatory Meaning</div>
                      <div className="font-medium">{sq.divinatoryMeaning}</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Dignities Tab */}
        {tab === "dignities" && (
          <div className="space-y-6">
            <p className="text-sm text-[var(--color-muted)]">
              The elemental dignity system governs how elements interact. Friendly elements strengthen each other; hostile elements weaken.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="p-3 text-left text-[var(--color-muted)]" />
                    {[Element.FIRE, Element.WATER, Element.AIR, Element.EARTH].map((el) => (
                      <th key={el} className={`p-3 text-center font-medium ${ELEMENT_COLORS[el]}`}>
                        {el}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[Element.FIRE, Element.WATER, Element.AIR, Element.EARTH].map((row) => (
                    <tr key={row}>
                      <td className={`p-3 font-medium ${ELEMENT_COLORS[row]}`}>{row}</td>
                      {[Element.FIRE, Element.WATER, Element.AIR, Element.EARTH].map((col) => (
                        <td key={col} className="p-3 text-center">
                          <span className={`px-2 py-1 rounded text-xs ${DIGNITY_COLORS[DIGNITY_MATRIX[row][col]]}`}>
                            {DIGNITY_MATRIX[row][col]}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-900/30 border border-green-900">
                <div className="font-medium text-green-400 mb-1">Friendly</div>
                <p className="text-sm text-[var(--color-muted)]">
                  Elements that share a quality (heat or cold). Fire+Air share heat. Water+Earth share cold. They strengthen and support each other.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-red-900/30 border border-red-900">
                <div className="font-medium text-red-400 mb-1">Hostile</div>
                <p className="text-sm text-[var(--color-muted)]">
                  Elements that oppose in both qualities. Fire (hot+dry) vs Water (cold+wet). Air (hot+wet) vs Earth (cold+dry). They weaken and conflict.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gray-800/30 border border-gray-800">
                <div className="font-medium text-gray-400 mb-1">Neutral</div>
                <p className="text-sm text-[var(--color-muted)]">
                  Same element meeting itself. No modification — the quality remains unchanged.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-900/30 border border-yellow-900">
                <div className="font-medium text-yellow-400 mb-1">Mixed</div>
                <p className="text-sm text-[var(--color-muted)]">
                  Elements sharing one quality but opposing in another. Fire+Earth share dryness but oppose in heat. A complex, ambiguous interaction.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {tab === "history" && (
          <div className="space-y-6">
            {HISTORY_ENTRIES.map((entry) => (
              <div key={entry.id} className="p-6 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)]">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-bold text-[var(--color-gold)]">{entry.title}</h2>
                  <span className="text-sm text-[var(--color-muted)] shrink-0 ml-4">{entry.period}</span>
                </div>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{entry.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
