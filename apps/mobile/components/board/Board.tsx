import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Rect, Text as SvgText, Circle, Line } from "react-native-svg";
import { BOARD_GRID, getSquareAt } from "@enochian-chess/data";
import type { GameState, Piece, Position } from "@enochian-chess/engine";

const ELEMENT_COLORS: Record<string, string> = {
  FIRE: "#DC2626",
  WATER: "#2563EB",
  AIR: "#EAB308",
  EARTH: "#16A34A",
};

const PIECE_SYMBOLS: Record<string, string> = {
  KING: "\u2654",
  QUEEN: "\u2655",
  BISHOP: "\u2657",
  KNIGHT: "\u2658",
  ROOK: "\u2656",
  PAWN: "\u2659",
};

interface BoardProps {
  gameState: GameState;
  selectedPieceId: string | null;
  legalMoves: Position[];
  onSquarePress: (row: number, col: number) => void;
  size: number;
}

export default function Board({ gameState, selectedPieceId, legalMoves, onSquarePress, size }: BoardProps) {
  const cellSize = size / 8;

  const getPieceAt = (row: number, col: number): Piece | undefined => {
    return gameState.pieces.find(
      (p) => !p.isCaptured && p.position.row === row && p.position.col === col
    );
  };

  const isLegalTarget = (row: number, col: number): boolean => {
    return legalMoves.some((m) => m.row === row && m.col === col);
  };

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {BOARD_GRID.map((gridRow, row) =>
          gridRow.map((squareId, col) => {
            const square = getSquareAt(row, col);
            if (!square) return null;

            const piece = getPieceAt(row, col);
            const isSelected = piece && piece.id === selectedPieceId;
            const isTarget = isLegalTarget(row, col);
            const x = col * cellSize;
            const y = row * cellSize;

            return (
              <React.Fragment key={`${row}-${col}`}>
                <Rect
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  fill={square.kingScaleColour}
                  stroke={isSelected ? "#FFD700" : "#333"}
                  strokeWidth={isSelected ? 2 : 0.5}
                  onPress={() => onSquarePress(row, col)}
                />
                {isTarget && (
                  <Circle
                    cx={x + cellSize / 2}
                    cy={y + cellSize / 2}
                    r={cellSize * 0.15}
                    fill="#D4AF3780"
                    onPress={() => onSquarePress(row, col)}
                  />
                )}
                {piece && (
                  <SvgText
                    x={x + cellSize / 2}
                    y={y + cellSize * 0.7}
                    fontSize={cellSize * 0.6}
                    fill={ELEMENT_COLORS[piece.template.element] || "#FFF"}
                    textAnchor="middle"
                    fontWeight="bold"
                    onPress={() => onSquarePress(row, col)}
                  >
                    {PIECE_SYMBOLS[piece.template.type] || "?"}
                  </SvgText>
                )}
              </React.Fragment>
            );
          })
        )}
        {/* Quadrant dividers */}
        <Line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke="#D4AF37" strokeWidth={2} />
        <Line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke="#D4AF37" strokeWidth={2} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center" },
});
