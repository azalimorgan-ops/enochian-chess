"use client";

import type { Piece } from "@enochian-chess/engine";
import { Element as Elem } from "@enochian-chess/data";

const ELEMENT_COLORS: Record<Elem, string> = {
  [Elem.FIRE]: "#FF4444",
  [Elem.WATER]: "#5B9BFF",
  [Elem.AIR]: "#FFD700",
  [Elem.EARTH]: "#4ADE80",
};

const ELEMENT_BG: Record<Elem, string> = {
  [Elem.FIRE]: "rgba(80, 10, 10, 0.92)",
  [Elem.WATER]: "rgba(10, 30, 70, 0.92)",
  [Elem.AIR]: "rgba(70, 50, 10, 0.92)",
  [Elem.EARTH]: "rgba(10, 50, 25, 0.92)",
};

interface PieceIconProps {
  piece: Piece;
  x: number;
  y: number;
  size: number;
  isSelected: boolean;
}

export function PieceIcon({ piece, x, y, size, isSelected }: PieceIconProps) {
  const color = ELEMENT_COLORS[piece.template.element];
  const bg = ELEMENT_BG[piece.template.element];
  const cx = x + size / 2;
  const cy = y + size / 2;
  const r = size * 0.36;

  return (
    <g>
      {/* Shadow */}
      <circle cx={cx + 1} cy={cy + 1} r={r} fill="rgba(0,0,0,0.5)" />

      {/* Background circle */}
      <circle cx={cx} cy={cy} r={r} fill={bg} stroke={color} strokeWidth={2} />

      {/* Piece symbol */}
      <text
        x={cx}
        y={cy + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size * 0.42}
        fill={color}
        fontWeight="bold"
      >
        {getPieceSymbol(piece.template.type)}
      </text>

      {/* Element indicator (small letter below) */}
      <text
        x={cx}
        y={cy + r + 9}
        textAnchor="middle"
        fontSize={7}
        fill={color}
        opacity={0.7}
        fontWeight="bold"
      >
        {piece.template.element[0]}
      </text>
    </g>
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
