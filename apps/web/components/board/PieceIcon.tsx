"use client";

import type { Piece } from "@enochian-chess/engine";
import { Element as Elem } from "@enochian-chess/data";

const ELEMENT_COLORS: Record<Elem, string> = {
  [Elem.FIRE]: "#DC2626",
  [Elem.WATER]: "#2563EB",
  [Elem.AIR]: "#EAB308",
  [Elem.EARTH]: "#16A34A",
};

const ELEMENT_BG: Record<Elem, string> = {
  [Elem.FIRE]: "#7F1D1D",
  [Elem.WATER]: "#1E3A5F",
  [Elem.AIR]: "#713F12",
  [Elem.EARTH]: "#14532D",
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
  const r = size * 0.38;

  return (
    <g>
      {/* Background circle */}
      <circle cx={cx} cy={cy} r={r} fill={bg} stroke={color} strokeWidth={2} />

      {/* Piece symbol */}
      <text
        x={cx}
        y={cy + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size * 0.48}
        fill={color}
        fontWeight="bold"
      >
        {getPieceSymbol(piece.template.type)}
      </text>

      {/* Element indicator (small letter) */}
      <text
        x={cx}
        y={cy + r + 10}
        textAnchor="middle"
        fontSize={8}
        fill={color}
        opacity={0.8}
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
