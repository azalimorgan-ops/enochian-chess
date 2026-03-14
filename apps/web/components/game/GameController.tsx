"use client";

import { useGameStore } from "@/store/game-store";
import { Board } from "@/components/board/Board";
import { GameStatus, Element } from "@enochian-chess/engine";
import Link from "next/link";

const ELEMENT_LABELS: Record<Element, { name: string; color: string }> = {
  [Element.FIRE]: { name: "Fire", color: "text-red-500" },
  [Element.WATER]: { name: "Water", color: "text-blue-500" },
  [Element.AIR]: { name: "Air", color: "text-yellow-500" },
  [Element.EARTH]: { name: "Earth", color: "text-green-500" },
};

export function GameController() {
  const {
    gameState,
    selectedPieceId,
    legalMoves,
    isAIThinking,
    showLabels,
    clickSquare,
    undoMove,
    toggleLabels,
    newGame,
  } = useGameStore();

  if (!gameState) return null;

  const currentLabel = ELEMENT_LABELS[gameState.currentTurn];
  const isGameOver = gameState.status !== GameStatus.IN_PROGRESS;

  const capturedPieces = gameState.pieces.filter((p) => p.isCaptured);
  const team1Captured = capturedPieces.filter((p) =>
    gameState.concourse.team1.includes(p.template.element)
  );
  const team2Captured = capturedPieces.filter((p) =>
    gameState.concourse.team2.includes(p.template.element)
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              useGameStore.setState({ gameState: null });
            }}
            className="text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors"
          >
            &larr; Exit Game
          </Link>
          <h1 className="text-xl font-bold text-[var(--color-gold)]" style={{ fontFamily: "Cinzel, serif" }}>
            Enochian Chess
          </h1>
          <div className="flex gap-2">
            <button
              onClick={toggleLabels}
              className="px-3 py-1 text-sm rounded border border-[var(--color-border)] hover:border-[var(--color-gold-dark)] transition-colors"
            >
              {showLabels ? "Hide" : "Show"} Labels
            </button>
            <button
              onClick={undoMove}
              disabled={gameState.moveHistory.length === 0}
              className="px-3 py-1 text-sm rounded border border-[var(--color-border)] hover:border-[var(--color-gold-dark)] transition-colors disabled:opacity-30"
            >
              Undo
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Board */}
          <div className="flex-1 flex justify-center">
            <Board
              pieces={gameState.pieces}
              selectedPieceId={selectedPieceId}
              legalMoves={legalMoves}
              currentTurn={gameState.currentTurn}
              onSquareClick={clickSquare}
              showLabels={showLabels}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:w-72 space-y-6">
            {/* Turn Indicator */}
            <div className="p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)]">
              {isGameOver ? (
                <div className="text-center">
                  <div className="text-lg font-bold mb-2">
                    {gameState.status === GameStatus.TEAM1_WINS
                      ? `${ELEMENT_LABELS[gameState.concourse.team1[0]].name} & ${ELEMENT_LABELS[gameState.concourse.team1[1]].name} Win!`
                      : gameState.status === GameStatus.TEAM2_WINS
                      ? `${ELEMENT_LABELS[gameState.concourse.team2[0]].name} & ${ELEMENT_LABELS[gameState.concourse.team2[1]].name} Win!`
                      : "Stalemate"}
                  </div>
                  <button
                    onClick={() => useGameStore.setState({ gameState: null })}
                    className="px-4 py-2 bg-[var(--color-gold-dark)] hover:bg-[var(--color-gold)] text-black rounded font-medium transition-colors"
                  >
                    New Game
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-sm text-[var(--color-muted)] mb-1">Current Turn</div>
                  <div className={`text-xl font-bold ${currentLabel.color}`}>
                    {currentLabel.name}
                    {isAIThinking && (
                      <span className="text-sm text-[var(--color-muted)] ml-2 animate-pulse">
                        thinking...
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-[var(--color-muted)] mt-2">
                    Turn {gameState.turnNumber + 1}
                  </div>
                </>
              )}
            </div>

            {/* Alliance Info */}
            <div className="p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)]">
              <div className="text-sm text-[var(--color-muted)] mb-2">Concourse of Forces</div>
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <span className={ELEMENT_LABELS[gameState.concourse.team1[0]].color}>
                    {ELEMENT_LABELS[gameState.concourse.team1[0]].name}
                  </span>
                  <span className="text-[var(--color-muted)]">&amp;</span>
                  <span className={ELEMENT_LABELS[gameState.concourse.team1[1]].color}>
                    {ELEMENT_LABELS[gameState.concourse.team1[1]].name}
                  </span>
                </div>
                <div className="text-[var(--color-muted)] text-sm">vs</div>
                <div className="flex gap-2 items-center">
                  <span className={ELEMENT_LABELS[gameState.concourse.team2[0]].color}>
                    {ELEMENT_LABELS[gameState.concourse.team2[0]].name}
                  </span>
                  <span className="text-[var(--color-muted)]">&amp;</span>
                  <span className={ELEMENT_LABELS[gameState.concourse.team2[1]].color}>
                    {ELEMENT_LABELS[gameState.concourse.team2[1]].name}
                  </span>
                </div>
              </div>
            </div>

            {/* Check State */}
            {Object.entries(gameState.checkState).some(([, cs]) => cs.inCheck || cs.checkmated) && (
              <div className="p-4 rounded-lg bg-[var(--color-card)] border border-red-900">
                <div className="text-sm text-[var(--color-muted)] mb-2">Check State</div>
                {(Object.entries(gameState.checkState) as [Element, { inCheck: boolean; checkmated: boolean }][])
                  .filter(([, cs]) => cs.inCheck || cs.checkmated)
                  .map(([element, cs]) => (
                    <div key={element} className={`${ELEMENT_LABELS[element].color} text-sm`}>
                      {ELEMENT_LABELS[element].name}: {cs.checkmated ? "CHECKMATED" : "IN CHECK"}
                    </div>
                  ))}
              </div>
            )}

            {/* Captured Pieces */}
            {capturedPieces.length > 0 && (
              <div className="p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)]">
                <div className="text-sm text-[var(--color-muted)] mb-2">Captured</div>
                {team1Captured.length > 0 && (
                  <div className="mb-2">
                    <div className="text-xs text-[var(--color-muted)]">
                      {ELEMENT_LABELS[gameState.concourse.team1[0]].name}/{ELEMENT_LABELS[gameState.concourse.team1[1]].name}
                    </div>
                    <div className="text-lg">
                      {team1Captured.map((p) => getPieceSymbol(p.template.type)).join(" ")}
                    </div>
                  </div>
                )}
                {team2Captured.length > 0 && (
                  <div>
                    <div className="text-xs text-[var(--color-muted)]">
                      {ELEMENT_LABELS[gameState.concourse.team2[0]].name}/{ELEMENT_LABELS[gameState.concourse.team2[1]].name}
                    </div>
                    <div className="text-lg">
                      {team2Captured.map((p) => getPieceSymbol(p.template.type)).join(" ")}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Move History */}
            {gameState.moveHistory.length > 0 && (
              <div className="p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] max-h-48 overflow-y-auto">
                <div className="text-sm text-[var(--color-muted)] mb-2">Move History</div>
                <div className="space-y-1 text-sm font-mono">
                  {gameState.moveHistory.slice(-20).map((move, i) => (
                    <div key={i} className="text-[var(--color-muted)]">
                      {gameState.moveHistory.length - 20 + i + 1}. {move.notation || `${move.from.row},${move.from.col}-${move.to.row},${move.to.col}`}
                      {move.capturedPieceId && " x"}
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

function getPieceSymbol(type: string): string {
  switch (type) {
    case "KING": return "♔";
    case "QUEEN": return "♕";
    case "BISHOP": return "♗";
    case "KNIGHT": return "♘";
    case "ROOK": return "♖";
    case "PAWN": return "♙";
    default: return "?";
  }
}
