import { create } from "zustand";
import { Element } from "@enochian-chess/data";
import {
  createNewGame,
  applyMove,
  getLegalMoves,
  findBestMove,
  GameState,
  GameStatus,
  Position,
} from "@enochian-chess/engine";

interface GameStore {
  gameState: GameState | null;
  selectedPieceId: string | null;
  legalMoves: Position[];
  isAIThinking: boolean;
  humanElements: Set<Element>;
  gameMode: "solo" | "pass" | "online";

  newGame: (openingElement: Element, mode: "solo" | "pass" | "online") => void;
  selectPiece: (pieceId: string) => void;
  clearSelection: () => void;
  clickSquare: (row: number, col: number) => void;
  triggerAIMove: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: null,
  selectedPieceId: null,
  legalMoves: [],
  isAIThinking: false,
  humanElements: new Set([Element.FIRE]),
  gameMode: "solo",

  newGame: (openingElement, mode) => {
    const state = createNewGame(openingElement);
    const humanElements =
      mode === "pass"
        ? new Set([Element.FIRE, Element.WATER, Element.AIR, Element.EARTH])
        : new Set([openingElement]);

    set({
      gameState: state,
      selectedPieceId: null,
      legalMoves: [],
      isAIThinking: false,
      humanElements,
      gameMode: mode,
    });
  },

  selectPiece: (pieceId) => {
    const { gameState } = get();
    if (!gameState) return;

    const piece = gameState.pieces.find((p) => p.id === pieceId);
    if (!piece || piece.isCaptured || piece.isInert) return;
    if (piece.template.element !== gameState.currentTurn) return;

    const moves = getLegalMoves(piece, gameState);
    set({ selectedPieceId: pieceId, legalMoves: moves });
  },

  clearSelection: () => {
    set({ selectedPieceId: null, legalMoves: [] });
  },

  clickSquare: (row, col) => {
    const { gameState, selectedPieceId, legalMoves, humanElements } = get();
    if (!gameState || gameState.status !== GameStatus.IN_PROGRESS) return;
    if (!humanElements.has(gameState.currentTurn)) return;

    // Check if clicking a friendly piece
    const pieceAtSquare = gameState.pieces.find(
      (p) => !p.isCaptured && p.position.row === row && p.position.col === col
    );

    if (pieceAtSquare && pieceAtSquare.template.element === gameState.currentTurn) {
      get().selectPiece(pieceAtSquare.id);
      return;
    }

    // Check if clicking a legal move target
    if (selectedPieceId) {
      const isLegal = legalMoves.some((m) => m.row === row && m.col === col);
      if (isLegal) {
        try {
          const newState = applyMove(gameState, selectedPieceId, { row, col });
          set({ gameState: newState, selectedPieceId: null, legalMoves: [] });

          // Trigger AI if next player is AI
          if (newState.status === GameStatus.IN_PROGRESS && !humanElements.has(newState.currentTurn)) {
            setTimeout(() => get().triggerAIMove(), 300);
          }
        } catch {
          // Invalid move
        }
        return;
      }
    }

    set({ selectedPieceId: null, legalMoves: [] });
  },

  triggerAIMove: () => {
    const { gameState, humanElements } = get();
    if (!gameState || gameState.status !== GameStatus.IN_PROGRESS) return;
    if (humanElements.has(gameState.currentTurn)) return;

    set({ isAIThinking: true });

    setTimeout(() => {
      const { gameState: currentState } = get();
      if (!currentState) return;

      const bestMove = findBestMove(currentState, { maxDepth: 2, timeLimit: 2000 });
      if (bestMove) {
        try {
          const newState = applyMove(currentState, bestMove.pieceId, bestMove.to);
          set({ gameState: newState, isAIThinking: false });

          if (newState.status === GameStatus.IN_PROGRESS && !humanElements.has(newState.currentTurn)) {
            setTimeout(() => get().triggerAIMove(), 300);
          }
        } catch {
          set({ isAIThinking: false });
        }
      } else {
        set({ isAIThinking: false });
      }
    }, 100);
  },
}));
