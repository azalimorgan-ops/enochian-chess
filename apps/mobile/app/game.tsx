import { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Element } from "@enochian-chess/data";
import { GameStatus } from "@enochian-chess/engine";
import Board from "@/components/board/Board";
import { useGameStore } from "@/store/game-store";

const ELEMENT_COLORS: Record<string, string> = {
  FIRE: "#DC2626",
  WATER: "#2563EB",
  AIR: "#EAB308",
  EARTH: "#16A34A",
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const BOARD_SIZE = Math.min(SCREEN_WIDTH - 32, 400);

export default function GameScreen() {
  const { element, mode } = useLocalSearchParams<{ element: string; mode: string }>();
  const { gameState, selectedPieceId, legalMoves, isAIThinking, newGame, clickSquare, triggerAIMove, humanElements } =
    useGameStore();

  useEffect(() => {
    const el = (element as Element) || Element.FIRE;
    const m = (mode as "solo" | "pass") || "solo";
    newGame(el, m);
  }, []);

  useEffect(() => {
    if (gameState && gameState.status === GameStatus.IN_PROGRESS && !humanElements.has(gameState.currentTurn)) {
      triggerAIMove();
    }
  }, [gameState?.currentTurn]);

  if (!gameState) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  const statusText =
    gameState.status === GameStatus.TEAM1_WINS
      ? "Team 1 Wins!"
      : gameState.status === GameStatus.TEAM2_WINS
      ? "Team 2 Wins!"
      : gameState.status === GameStatus.STALEMATE
      ? "Stalemate"
      : isAIThinking
      ? "AI is thinking..."
      : `${gameState.currentTurn}'s turn`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Turn indicator */}
      <View style={styles.turnRow}>
        <View style={[styles.turnDot, { backgroundColor: ELEMENT_COLORS[gameState.currentTurn] }]} />
        <Text style={styles.turnText}>{statusText}</Text>
      </View>

      {/* Board */}
      <Board
        gameState={gameState}
        selectedPieceId={selectedPieceId}
        legalMoves={legalMoves}
        onSquarePress={clickSquare}
        size={BOARD_SIZE}
      />

      {/* Check states */}
      {Object.entries(gameState.checkState).map(([el, state]) => {
        if (!state.inCheck && !state.checkmated) return null;
        return (
          <View key={el} style={styles.checkBanner}>
            <Text style={[styles.checkText, { color: ELEMENT_COLORS[el] }]}>
              {el}: {state.checkmated ? "CHECKMATED" : "IN CHECK"}
            </Text>
          </View>
        );
      })}

      {/* Move history */}
      <Text style={styles.sectionTitle}>
        Move {gameState.turnNumber} | {gameState.moveHistory.length} moves played
      </Text>
      <View style={styles.historyContainer}>
        {gameState.moveHistory.slice(-10).map((move, i) => (
          <Text key={i} style={styles.moveText}>
            {move.notation || `${move.pieceId} to (${move.to.row},${move.to.col})`}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F0F0F" },
  content: { padding: 16, alignItems: "center", paddingBottom: 40 },
  loading: { color: "#A3A3A3", fontSize: 16, textAlign: "center", marginTop: 100 },
  turnRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  turnDot: { width: 12, height: 12, borderRadius: 6 },
  turnText: { fontSize: 16, fontWeight: "600", color: "#E5E5E5" },
  checkBanner: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    alignSelf: "stretch",
  },
  checkText: { fontSize: 14, fontWeight: "bold", textAlign: "center" },
  sectionTitle: {
    fontSize: 14,
    color: "#A3A3A3",
    marginTop: 16,
    alignSelf: "flex-start",
  },
  historyContainer: {
    alignSelf: "stretch",
    marginTop: 8,
  },
  moveText: { fontSize: 12, color: "#666", marginBottom: 2 },
});
