"use client";

import { BOARD_GRID, QUADRANT_BOUNDS, Element as Elem, getTriangleColors } from "@enochian-chess/data";
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
      {/* Squares with 4 triangles each */}
      {BOARD_GRID.map((row, r) =>
        row.map((square, c) => {
          if (!square) return null;
          const x = c * SQUARE_SIZE;
          const y = r * SQUARE_SIZE;
          const cx = x + SQUARE_SIZE / 2;
          const cy = y + SQUARE_SIZE / 2;
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

          const tri = getTriangleColors(square.subElement);

          // Triangle vertices: each triangle goes from two corners to center
          const topTri = `${x},${y} ${x + SQUARE_SIZE},${y} ${cx},${cy}`;
          const rightTri = `${x + SQUARE_SIZE},${y} ${x + SQUARE_SIZE},${y + SQUARE_SIZE} ${cx},${cy}`;
          const bottomTri = `${x + SQUARE_SIZE},${y + SQUARE_SIZE} ${x},${y + SQUARE_SIZE} ${cx},${cy}`;
          const leftTri = `${x},${y + SQUARE_SIZE} ${x},${y} ${cx},${cy}`;

          return (
            <g
              key={square.id}
              onClick={() => onSquareClick({ row: r, col: c })}
              className="cursor-pointer"
            >
              {/* Four elemental triangles */}
              <polygon points={topTri} fill={tri.top} stroke="#111" strokeWidth={0.5} />
              <polygon points={rightTri} fill={tri.right} stroke="#111" strokeWidth={0.5} />
              <polygon points={bottomTri} fill={tri.bottom} stroke="#111" strokeWidth={0.5} />
              <polygon points={leftTri} fill={tri.left} stroke="#111" strokeWidth={0.5} />

              {/* Thin diagonal cross lines */}
              <line x1={x} y1={y} x2={x + SQUARE_SIZE} y2={y + SQUARE_SIZE} stroke="#333" strokeWidth={0.5} />
              <line x1={x + SQUARE_SIZE} y1={y} x2={x} y2={y + SQUARE_SIZE} stroke="#333" strokeWidth={0.5} />

              {/* Square border */}
              <rect
                x={x}
                y={y}
                width={SQUARE_SIZE}
                height={SQUARE_SIZE}
                fill="none"
                stroke="#444"
                strokeWidth={1}
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
                  cx={cx}
                  cy={cy}
                  r={10}
                  fill="rgba(212, 175, 55, 0.6)"
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
                  cx={cx}
                  cy={cy}
                  r={SQUARE_SIZE / 2 - 4}
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.8)"
                  strokeWidth={3}
                >
                  <animate
                    attributeName="opacity"
                    values="0.4;1;0.4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Enochian letter */}
              {showLabels && (
                <text
                  x={cx}
                  y={y + 14}
                  fontSize={10}
                  fill="rgba(255,255,255,0.7)"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {square.enochianLetter.toUpperCase()}
                </text>
              )}

              {/* Square ID */}
              <text
                x={x + SQUARE_SIZE - 4}
                y={y + SQUARE_SIZE - 4}
                fontSize={7}
                fill="rgba(255,255,255,0.25)"
                textAnchor="end"
              >
                {square.id}
              </text>
            </g>
          );
        })
      )}

      {/* Quadrant dividers — thick gold lines */}
      <line
        x1={SQUARE_SIZE * 4}
        y1={0}
        x2={SQUARE_SIZE * 4}
        y2={BOARD_SIZE}
        stroke="#D4AF37"
        strokeWidth={3}
      />
      <line
        x1={0}
        y1={SQUARE_SIZE * 4}
        x2={BOARD_SIZE}
        y2={SQUARE_SIZE * 4}
        stroke="#D4AF37"
        strokeWidth={3}
      />

      {/* Quadrant labels */}
      {Object.entries(QUADRANT_BOUNDS).map(([element, bounds]) => {
        const qcx =
          ((bounds.colStart + bounds.colEnd + 1) / 2) * SQUARE_SIZE;
        const qcy =
          ((bounds.rowStart + bounds.rowEnd + 1) / 2) * SQUARE_SIZE;
        return (
          <text
            key={element}
            x={qcx}
            y={qcy}
            fontSize={14}
            fill="rgba(255,255,255,0.12)"
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
        const px = piece.position.col * SQUARE_SIZE;
        const py = piece.position.row * SQUARE_SIZE;
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
              x={px}
              y={py}
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
