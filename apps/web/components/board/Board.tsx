"use client";

import { BOARD_GRID, QUADRANT_BOUNDS, Element as Elem } from "@enochian-chess/data";
import type { Piece, Position } from "@enochian-chess/engine";
import { PieceIcon } from "./PieceIcon";

const SQUARE_SIZE = 80;
const BOARD_SIZE = SQUARE_SIZE * 8;

interface BoardProps {
  pieces: Piece[];
  selectedPieceId: string | null;
  legalMoves: Position[];
  hintMoves?: Position[];
  currentTurn: Elem;
  onSquareClick: (pos: Position) => void;
  showLabels?: boolean;
}

export function Board({
  pieces,
  selectedPieceId,
  legalMoves,
  hintMoves = [],
  currentTurn,
  onSquareClick,
  showLabels = false,
}: BoardProps) {
  const activePieces = pieces.filter((p) => !p.isCaptured);

  return (
    <svg
      viewBox={`0 0 ${BOARD_SIZE} ${BOARD_SIZE}`}
      className="w-full max-w-[640px] aspect-square"
    >
      {/* Squares */}
      {BOARD_GRID.map((row, r) =>
        row.map((square, c) => {
          if (!square) return null;
          const x = c * SQUARE_SIZE;
          const y = r * SQUARE_SIZE;
          const isLegalTarget = legalMoves.some(
            (m) => m.row === r && m.col === c
          );
          const isHint = hintMoves.some(
            (m) => m.row === r && m.col === c
          );
          const piece = activePieces.find(
            (p) => p.position.row === r && p.position.col === c
          );
          const isSelected = piece?.id === selectedPieceId;

          return (
            <g
              key={square.id}
              onClick={() => onSquareClick({ row: r, col: c })}
              className="cursor-pointer"
            >
              {/* Square background */}
              <rect
                x={x}
                y={y}
                width={SQUARE_SIZE}
                height={SQUARE_SIZE}
                fill={square.kingScaleColour}
                stroke={square.queenScaleColour}
                strokeWidth={1}
                opacity={0.85}
              />

              {/* Selected highlight */}
              {isSelected && (
                <rect
                  x={x + 2}
                  y={y + 2}
                  width={SQUARE_SIZE - 4}
                  height={SQUARE_SIZE - 4}
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth={3}
                  rx={2}
                />
              )}

              {/* Legal move indicator */}
              {isLegalTarget && !piece && (
                <circle
                  cx={x + SQUARE_SIZE / 2}
                  cy={y + SQUARE_SIZE / 2}
                  r={10}
                  fill="rgba(212, 175, 55, 0.5)"
                />
              )}
              {isLegalTarget && piece && (
                <rect
                  x={x + 2}
                  y={y + 2}
                  width={SQUARE_SIZE - 4}
                  height={SQUARE_SIZE - 4}
                  fill="none"
                  stroke="rgba(212, 175, 55, 0.7)"
                  strokeWidth={3}
                  rx={2}
                />
              )}

              {/* Hint indicator (beginner mode) */}
              {isHint && isLegalTarget && (
                <circle
                  cx={x + SQUARE_SIZE / 2}
                  cy={y + SQUARE_SIZE / 2}
                  r={SQUARE_SIZE / 2 - 4}
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.8)"
                  strokeWidth={3}
                  rx={2}
                >
                  <animate
                    attributeName="opacity"
                    values="0.4;1;0.4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Square label */}
              {showLabels && (
                <text
                  x={x + 4}
                  y={y + 12}
                  fontSize={9}
                  fill={square.queenScaleColour}
                  opacity={0.6}
                >
                  {square.enochianLetter}
                </text>
              )}

              {/* Square ID */}
              <text
                x={x + SQUARE_SIZE - 4}
                y={y + SQUARE_SIZE - 4}
                fontSize={8}
                fill="rgba(255,255,255,0.3)"
                textAnchor="end"
              >
                {square.id}
              </text>
            </g>
          );
        })
      )}

      {/* Quadrant dividers */}
      <line
        x1={SQUARE_SIZE * 4}
        y1={0}
        x2={SQUARE_SIZE * 4}
        y2={BOARD_SIZE}
        stroke="#D4AF37"
        strokeWidth={2}
        opacity={0.6}
      />
      <line
        x1={0}
        y1={SQUARE_SIZE * 4}
        x2={BOARD_SIZE}
        y2={SQUARE_SIZE * 4}
        stroke="#D4AF37"
        strokeWidth={2}
        opacity={0.6}
      />

      {/* Quadrant labels */}
      {Object.entries(QUADRANT_BOUNDS).map(([element, bounds]) => {
        const cx =
          ((bounds.colStart + bounds.colEnd + 1) / 2) * SQUARE_SIZE;
        const cy =
          ((bounds.rowStart + bounds.rowEnd + 1) / 2) * SQUARE_SIZE;
        return (
          <text
            key={element}
            x={cx}
            y={cy}
            fontSize={14}
            fill="rgba(255,255,255,0.15)"
            textAnchor="middle"
            dominantBaseline="middle"
            fontWeight="bold"
          >
            {element}
          </text>
        );
      })}

      {/* Pieces */}
      {activePieces.map((piece) => {
        const x = piece.position.col * SQUARE_SIZE;
        const y = piece.position.row * SQUARE_SIZE;
        return (
          <g
            key={piece.id}
            onClick={(e) => {
              e.stopPropagation();
              onSquareClick(piece.position);
            }}
            className="cursor-pointer"
            opacity={piece.isInert ? 0.4 : 1}
          >
            <PieceIcon
              piece={piece}
              x={x}
              y={y}
              size={SQUARE_SIZE}
              isSelected={piece.id === selectedPieceId}
            />
          </g>
        );
      })}

      {/* Board border */}
      <rect
        x={0}
        y={0}
        width={BOARD_SIZE}
        height={BOARD_SIZE}
        fill="none"
        stroke="#D4AF37"
        strokeWidth={3}
      />
    </svg>
  );
}
