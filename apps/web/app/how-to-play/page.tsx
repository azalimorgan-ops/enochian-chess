"use client";

import { useState } from "react";
import Link from "next/link";

const SECTIONS = [
  "Overview",
  "The Board",
  "Alliances",
  "Pieces",
  "Turns & Movement",
  "Winning",
  "Beginner Tips",
] as const;

type Section = (typeof SECTIONS)[number];

const PIECE_DETAILS = [
  {
    name: "King",
    icon: "♔",
    godForm: "Osiris / Ptah",
    movement: "One square in any direction (horizontally, vertically, or diagonally)",
    strategy: "Your most important piece. If both enemy Kings are checkmated, your team wins. Protect your King at all costs while threatening your opponents'.",
    similar: "Moves exactly like a King in standard chess.",
  },
  {
    name: "Queen",
    icon: "♕",
    godForm: "Isis / Nephthys",
    movement: "One square diagonally only",
    strategy: "Unlike standard chess, the Queen is very limited — she can only move one square diagonally. Use her for close-range defense and as a supporting piece near your King.",
    similar: "NOT like a standard chess Queen. Much weaker — think of her as a diagonal-only King.",
  },
  {
    name: "Bishop",
    icon: "♗",
    godForm: "Horus / Aroueris",
    movement: "Slides any number of squares diagonally until blocked",
    strategy: "Your long-range diagonal attacker. Bishops control diagonals across the entire board and are powerful for attacking across quadrant boundaries.",
    similar: "Moves exactly like a Bishop in standard chess.",
  },
  {
    name: "Knight",
    icon: "♘",
    godForm: "Typhon / Set",
    movement: "L-shaped jump: two squares in one direction, then one square perpendicular. Can jump over other pieces.",
    strategy: "The only piece that can jump over others. Excellent for surprise attacks and reaching behind enemy lines. Especially valuable in the crowded center of the four-player board.",
    similar: "Moves exactly like a Knight in standard chess.",
  },
  {
    name: "Rook",
    icon: "♖",
    godForm: "Canopic Jar",
    movement: "Slides any number of squares horizontally or vertically until blocked",
    strategy: "Your long-range straight-line attacker. Rooks control rows and columns, making them powerful for controlling the center and attacking across the board.",
    similar: "Moves exactly like a Rook in standard chess.",
  },
  {
    name: "Pawn",
    icon: "♙",
    godForm: "Children of the Elements",
    movement: "Moves one square forward (toward the opposing quadrant). Captures one square diagonally forward. Each element's pawns move in a different direction based on their quadrant.",
    strategy: "Pawns form your front line. Fire pawns move north, Water pawns move east, Air pawns move west, Earth pawns move south — always toward the opposing side of the board.",
    similar: "Like standard chess Pawns but WITHOUT the initial two-square move or en passant.",
    directions: [
      { element: "Fire", direction: "North (upward)", color: "text-red-500" },
      { element: "Water", direction: "East (rightward)", color: "text-blue-500" },
      { element: "Air", direction: "West (leftward)", color: "text-yellow-500" },
      { element: "Earth", direction: "South (downward)", color: "text-green-500" },
    ],
  },
];

export default function HowToPlayPage() {
  const [activeSection, setActiveSection] = useState<Section>("Overview");

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors">
            &larr; Home
          </Link>
          <Link href="/game" className="px-4 py-2 rounded-lg bg-[var(--color-gold-dark)] hover:bg-[var(--color-gold)] text-black font-semibold transition-colors text-sm">
            Play Now
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-[var(--color-gold)] mb-2" style={{ fontFamily: "Cinzel, serif" }}>
          How to Play
        </h1>
        <p className="text-[var(--color-muted)] mb-8">
          A complete guide to Enochian Chess — the Golden Dawn&apos;s four-player chess variant
        </p>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SECTIONS.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section
                  ? "bg-[var(--color-gold-dark)] text-black"
                  : "bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-muted)] hover:text-white hover:border-[var(--color-muted)]"
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeSection === "Overview" && (
            <div className="space-y-6">
              <SectionCard title="What is Enochian Chess?">
                <p>
                  Enochian Chess is a four-player chess variant created by members of the Hermetic Order of the Golden Dawn
                  in the late 19th century. It combines strategic gameplay with Western esoteric symbolism, serving as both
                  a competitive game and a divination tool.
                </p>
                <p className="mt-3">
                  Four players each control an army representing one of the classical elements: <span className="text-red-500 font-medium">Fire</span>,{" "}
                  <span className="text-blue-500 font-medium">Water</span>, <span className="text-yellow-500 font-medium">Air</span>, and{" "}
                  <span className="text-green-500 font-medium">Earth</span>. Players are grouped into two teams of two based on
                  elemental alliances.
                </p>
              </SectionCard>

              <SectionCard title="Key Differences from Standard Chess">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Four players</strong> — two teams of two, determined by elemental alliances</li>
                  <li><strong>8x8 board divided into four quadrants</strong> — each element occupies one corner</li>
                  <li><strong>The Queen is weak</strong> — she only moves one square diagonally (not like standard chess!)</li>
                  <li><strong>Pawns move in different directions</strong> — each element&apos;s pawns advance toward the opposing quadrant</li>
                  <li><strong>No castling, no en passant, no pawn promotion</strong> — simpler special rules</li>
                  <li><strong>Alliances change</strong> — the opening element determines who is teamed with whom</li>
                  <li><strong>Egyptian god-forms</strong> — each piece is associated with a deity and has divinatory meaning</li>
                </ul>
              </SectionCard>

              <SectionCard title="Quick Start">
                <ol className="list-decimal list-inside space-y-3">
                  <li><strong>Choose your opening element</strong> — this determines alliances and turn order</li>
                  <li><strong>Select a game mode</strong> — Solo vs AI, Pass & Play, or 2-Player Teams</li>
                  <li><strong>Tap a piece to select it</strong> — golden dots show where it can move</li>
                  <li><strong>Tap a golden dot to move</strong> — your allies&apos; pieces will be controlled by AI or another player</li>
                  <li><strong>Checkmate both enemy Kings to win!</strong></li>
                </ol>
              </SectionCard>
            </div>
          )}

          {activeSection === "The Board" && (
            <div className="space-y-6">
              <SectionCard title="Board Layout">
                <p>
                  The board is a standard 8x8 grid divided into four 4x4 quadrants, one for each element.
                  Each square has esoteric attributions (Enochian letters, sub-elements, colours) used in divination,
                  but for gameplay you only need to know the quadrant layout:
                </p>
                <div className="mt-4 grid grid-cols-2 gap-1 max-w-xs">
                  <div className="bg-yellow-900/30 border border-yellow-700/50 p-4 text-center rounded-tl-lg">
                    <span className="text-yellow-500 font-bold">Air</span>
                    <div className="text-xs text-[var(--color-muted)] mt-1">Top-left</div>
                  </div>
                  <div className="bg-blue-900/30 border border-blue-700/50 p-4 text-center rounded-tr-lg">
                    <span className="text-blue-500 font-bold">Water</span>
                    <div className="text-xs text-[var(--color-muted)] mt-1">Top-right</div>
                  </div>
                  <div className="bg-green-900/30 border border-green-700/50 p-4 text-center rounded-bl-lg">
                    <span className="text-green-500 font-bold">Earth</span>
                    <div className="text-xs text-[var(--color-muted)] mt-1">Bottom-left</div>
                  </div>
                  <div className="bg-red-900/30 border border-red-700/50 p-4 text-center rounded-br-lg">
                    <span className="text-red-500 font-bold">Fire</span>
                    <div className="text-xs text-[var(--color-muted)] mt-1">Bottom-right</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[var(--color-muted)]">
                  Each army starts in its own quadrant with pieces arranged in its 4x4 corner section.
                </p>
              </SectionCard>
            </div>
          )}

          {activeSection === "Alliances" && (
            <div className="space-y-6">
              <SectionCard title="The Concourse of Forces">
                <p>
                  Alliances are determined by the <strong>opening element</strong> — the element chosen at the start of the game.
                  This system is called the &quot;Concourse of Forces&quot; and is central to Golden Dawn teaching.
                </p>
                <p className="mt-3">
                  Elements that are <strong>friendly</strong> (complementary) form a team. Elements that are <strong>hostile</strong> (opposing) are enemies.
                </p>
              </SectionCard>

              <SectionCard title="Alliance Pairings">
                <div className="space-y-4">
                  <AllianceRow
                    opening="Fire"
                    openingColor="text-red-500"
                    team1={["Fire", "Air"]}
                    team1Colors={["text-red-500", "text-yellow-500"]}
                    team2={["Water", "Earth"]}
                    team2Colors={["text-blue-500", "text-green-500"]}
                  />
                  <AllianceRow
                    opening="Water"
                    openingColor="text-blue-500"
                    team1={["Water", "Earth"]}
                    team1Colors={["text-blue-500", "text-green-500"]}
                    team2={["Fire", "Air"]}
                    team2Colors={["text-red-500", "text-yellow-500"]}
                  />
                  <AllianceRow
                    opening="Air"
                    openingColor="text-yellow-500"
                    team1={["Air", "Fire"]}
                    team1Colors={["text-yellow-500", "text-red-500"]}
                    team2={["Earth", "Water"]}
                    team2Colors={["text-green-500", "text-blue-500"]}
                  />
                  <AllianceRow
                    opening="Earth"
                    openingColor="text-green-500"
                    team1={["Earth", "Water"]}
                    team1Colors={["text-green-500", "text-blue-500"]}
                    team2={["Fire", "Air"]}
                    team2Colors={["text-red-500", "text-yellow-500"]}
                  />
                </div>
              </SectionCard>

              <SectionCard title="What Alliances Mean">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>You cannot capture your ally&apos;s pieces</strong> — they&apos;re on your team</li>
                  <li><strong>You share a victory condition</strong> — if your team checkmates both enemy Kings, you both win</li>
                  <li><strong>Coordinate with your ally</strong> — in team modes, communicate strategy with your partner</li>
                </ul>
              </SectionCard>
            </div>
          )}

          {activeSection === "Pieces" && (
            <div className="space-y-6">
              <SectionCard title="Piece Guide">
                <p className="mb-4">
                  Each army has 8 pieces: 1 King, 1 Queen, 1 Bishop, 1 Knight, 1 Rook, and 4 Pawns (note: fewer pieces than standard chess).
                  Each piece is associated with an Egyptian god-form.
                </p>
              </SectionCard>

              {PIECE_DETAILS.map((piece) => (
                <SectionCard key={piece.name} title="">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{piece.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[var(--color-gold)] mb-1">{piece.name}</h3>
                      <div className="text-sm text-[var(--color-muted)] mb-3 italic">{piece.godForm}</div>

                      <div className="space-y-3">
                        <div>
                          <div className="text-sm font-semibold text-white mb-1">Movement</div>
                          <p className="text-sm">{piece.movement}</p>
                        </div>

                        {piece.directions && (
                          <div>
                            <div className="text-sm font-semibold text-white mb-1">Pawn Directions by Element</div>
                            <div className="grid grid-cols-2 gap-2">
                              {piece.directions.map((d) => (
                                <div key={d.element} className="text-sm">
                                  <span className={`font-medium ${d.color}`}>{d.element}:</span> {d.direction}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <div className="text-sm font-semibold text-white mb-1">Strategy</div>
                          <p className="text-sm text-[var(--color-muted)]">{piece.strategy}</p>
                        </div>

                        <div className="text-xs px-3 py-2 bg-[var(--color-elevated)] rounded-lg text-[var(--color-muted)]">
                          <strong>vs Standard Chess:</strong> {piece.similar}
                        </div>
                      </div>
                    </div>
                  </div>
                </SectionCard>
              ))}
            </div>
          )}

          {activeSection === "Turns & Movement" && (
            <div className="space-y-6">
              <SectionCard title="Turn Order">
                <p>
                  The opening element goes first, then play proceeds in a specific order based on
                  elemental relationships. The exact turn order depends on which element opens the game.
                </p>
                <p className="mt-3">
                  On your turn, you must move one of your pieces. You cannot pass.
                </p>
              </SectionCard>

              <SectionCard title="How to Move">
                <ol className="list-decimal list-inside space-y-3">
                  <li><strong>Tap/click one of your pieces</strong> — it will highlight and show golden dots on all legal squares</li>
                  <li><strong>Tap/click a golden dot</strong> — your piece moves there</li>
                  <li><strong>Capturing:</strong> if a golden dot is on an enemy piece, moving there captures (removes) that piece</li>
                  <li><strong>Tap your piece again or tap elsewhere</strong> — to deselect and choose a different piece</li>
                </ol>
              </SectionCard>

              <SectionCard title="Capture Rules">
                <ul className="list-disc list-inside space-y-2">
                  <li>You <strong>can</strong> capture enemy pieces by moving onto their square</li>
                  <li>You <strong>cannot</strong> capture your own pieces or your ally&apos;s pieces</li>
                  <li>When a King is checkmated, that player&apos;s remaining pieces become <strong>inert</strong> — they stay on the board as obstacles but cannot move</li>
                </ul>
              </SectionCard>

              <SectionCard title="Check & Checkmate">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Check:</strong> when a King is threatened by an enemy piece, that player must resolve the check on their next turn</li>
                  <li><strong>Resolving check:</strong> move the King to safety, block the attack, or capture the attacking piece</li>
                  <li><strong>Checkmate:</strong> when a King is in check and has no legal way to escape — that King is defeated</li>
                </ul>
              </SectionCard>
            </div>
          )}

          {activeSection === "Winning" && (
            <div className="space-y-6">
              <SectionCard title="Victory Condition">
                <p className="text-lg">
                  <strong>Checkmate both enemy Kings</strong> to win the game.
                </p>
                <p className="mt-3">
                  Since this is a team game, your team needs to checkmate <em>both</em> opponents.
                  Checkmating one enemy King is a major advantage — their pieces become inert (frozen in place as blockers)
                  but the game continues until the second enemy King falls.
                </p>
              </SectionCard>

              <SectionCard title="Inert Pieces">
                <p>
                  When a player is checkmated, their pieces don&apos;t disappear. Instead, they become <strong>inert</strong>:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-3">
                  <li>Inert pieces <strong>cannot move</strong> — their turns are skipped</li>
                  <li>Inert pieces <strong>block movement</strong> — sliding pieces (Bishop, Rook) cannot pass through them</li>
                  <li>Inert pieces <strong>can be captured</strong> — remove them to clear the board</li>
                </ul>
              </SectionCard>
            </div>
          )}

          {activeSection === "Beginner Tips" && (
            <div className="space-y-6">
              <SectionCard title="Getting Started">
                <ul className="list-disc list-inside space-y-3">
                  <li><strong>Use Beginner difficulty</strong> — the AI will be less aggressive and move hints will highlight recommended squares</li>
                  <li><strong>Remember the Queen is weak</strong> — she only moves one diagonal square. Don&apos;t expect her to dominate like in standard chess</li>
                  <li><strong>Watch the turn indicator</strong> — it shows whose turn it is with their element colour</li>
                  <li><strong>Coordinate with your ally</strong> — your alliance partner controls the opposite corner. Work together to create crossfire on enemy Kings</li>
                  <li><strong>Control the center</strong> — the middle of the board is where all four quadrants meet. Pieces here can attack in multiple directions</li>
                  <li><strong>Use your Knight</strong> — it&apos;s the only piece that jumps. In a crowded four-player board, this is extremely valuable</li>
                  <li><strong>Protect your King</strong> — don&apos;t leave it exposed. A coordinated attack from two opponents can checkmate quickly</li>
                </ul>
              </SectionCard>

              <SectionCard title="Common Mistakes">
                <ul className="list-disc list-inside space-y-2">
                  <li>Overvaluing the Queen — she&apos;s not powerful in Enochian Chess</li>
                  <li>Ignoring your ally — this is a team game, coordinate!</li>
                  <li>Forgetting pawn directions — each element&apos;s pawns move a different way</li>
                  <li>Leaving the King in the open — with four players, threats come from all sides</li>
                  <li>Not capturing inert pieces — they block your movement paths</li>
                </ul>
              </SectionCard>

              <div className="p-4 rounded-lg bg-[var(--color-gold-dark)]/20 border border-[var(--color-gold-dark)]">
                <p className="text-[var(--color-gold)] font-semibold mb-2">Beginner Mode</p>
                <p className="text-sm">
                  When starting a new game, select <strong>&quot;Beginner&quot;</strong> difficulty to get move hints.
                  Recommended moves will be highlighted with a blue glow to help you learn the game.
                </p>
                <Link href="/game" className="inline-block mt-3 px-4 py-2 rounded-lg bg-[var(--color-gold-dark)] hover:bg-[var(--color-gold)] text-black font-semibold transition-colors text-sm">
                  Start a Beginner Game
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)]">
      {title && (
        <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
      )}
      <div className="text-[var(--color-foreground)] leading-relaxed">{children}</div>
    </div>
  );
}

function AllianceRow({
  opening,
  openingColor,
  team1,
  team1Colors,
  team2,
  team2Colors,
}: {
  opening: string;
  openingColor: string;
  team1: string[];
  team1Colors: string[];
  team2: string[];
  team2Colors: string[];
}) {
  return (
    <div className="p-3 rounded-lg bg-[var(--color-elevated)] flex items-center gap-4 text-sm">
      <div className="w-24">
        <span className="text-[var(--color-muted)]">Opening:</span>{" "}
        <span className={`font-bold ${openingColor}`}>{opening}</span>
      </div>
      <div className="flex-1 flex items-center gap-2">
        <span className="text-[var(--color-muted)]">Team 1:</span>
        <span className={`font-medium ${team1Colors[0]}`}>{team1[0]}</span>
        <span className="text-[var(--color-muted)]">+</span>
        <span className={`font-medium ${team1Colors[1]}`}>{team1[1]}</span>
      </div>
      <div className="text-[var(--color-muted)]">vs</div>
      <div className="flex-1 flex items-center gap-2">
        <span className="text-[var(--color-muted)]">Team 2:</span>
        <span className={`font-medium ${team2Colors[0]}`}>{team2[0]}</span>
        <span className="text-[var(--color-muted)]">+</span>
        <span className={`font-medium ${team2Colors[1]}`}>{team2[1]}</span>
      </div>
    </div>
  );
}
