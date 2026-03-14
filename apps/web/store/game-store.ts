import { create } from "zustand";
import {
  GameState,
  GameStatus,
  Position,
  Element,
  createNewGame,
  applyMove,
  undoLastMove,
  getCurrentPlayerMoves,
  getLegalMoves,
  findBestMove,
} from "@enochian-chess/engine";

export type GameMode = "solo" | "pass-and-play" | "team-2p" | "online";
export type Difficulty = "beginner" | "intermediate" | "advanced";

interface GameStore {
  // State
  gameState: GameState | null;
  gameMode: GameMode;
  difficulty: Difficulty;
  selectedPieceId: string | null;
  legalMoves: Position[];
  hintMoves: Position[];
  isAIThinking: boolean;
  humanElements: Element[];
  showLabels: boolean;

  // Actions
  newGame: (openingElement: Element, mode: GameMode, difficulty?: Difficulty) => void;
  selectPiece: (pieceId: string) => void;
  clickSquare: (pos: Position) => void;
  undoMove: () => void;
  toggleLabels: () => void;
  triggerAIMove: () => Promise<void>;
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: null,
  gameMode: "solo",
  difficulty: "intermediate",
  selectedPieceId: null,
  legalMoves: [],
  hintMoves: [],
  isAIThinking: false,
  humanElements: [],
  showLabels: false,

  newGame: (openingElement, mode, difficulty = "intermediate") => {
    const state = createNewGame(openingElement, "GAME");
    let humanElements: Element[];

    switch (mode) {
      case "solo":
        humanElements = [openingElement];
        break;
      case "pass-and-play":
        humanElements = [Element.FIRE, Element.WATER, Element.AIR, Element.EARTH];
        break;
      case "team-2p":
        humanElements = state.concourse.team1;
        break;
      default:
        humanElements = [openingElement];
    }

    set({
      gameState: state,
      gameMode: mode,
      difficulty,
      selectedPieceId: null,
      legalMoves: [],
      hintMoves: [],
      isAIThinking: false,
      humanElements,
    });

    // If first player is AI, trigger AI move
    if (!humanElements.includes(state.currentTurn)) {
      setTimeout(() => get().triggerAIMove(), 300);
    }
  },

  selectPiece: (pieceId) => {
    const { gameState, difficulty } = get();
    if (!gameState) return;

    const piece = gameState.pieces.find((p) => p.id === pieceId);
    if (!piece || piece.isCaptured || piece.isInert) return;
    if (piece.template.element !== gameState.currentTurn) return;

    const moves = getLegalMoves(piece, gameState);

    // Generate hints for beginner mode
    let hintMoves: Position[] = [];
    if (difficulty === "beginner") {
      const bestMove = findBestMove(gameState, { maxDepth: 1, timeLimit: 500 });
      if (bestMove && bestMove.pieceId === pieceId) {
        hintMoves = [bestMove.to];
      }
    }

    set({ selectedPieceId: pieceId, legalMoves: moves, hintMoves });
  },

  clickSquare: (pos) => {
    const { gameState, selectedPieceId, legalMoves, humanElements } = get();
    if (!gameState || gameState.status !== GameStatus.IN_PROGRESS) return;
    if (!humanElements.includes(gameState.currentTurn)) return;

    // If a piece is selected and click is a legal move, make the move
    if (selectedPieceId) {
      const isLegal = legalMoves.some(
        (m) => m.row === pos.row && m.col === pos.col
      );

      if (isLegal) {
        try {
          const newState = applyMove(gameState, selectedPieceId, pos);
          set({
            gameState: newState,
            selectedPieceId: null,
            legalMoves: [],
          });

          // Check if next player is AI
          if (
            newState.status === GameStatus.IN_PROGRESS &&
            !humanElements.includes(newState.currentTurn)
          ) {
            setTimeout(() => get().triggerAIMove(), 300);
          }
          return;
        } catch {
          // Invalid move, deselect
        }
      }
    }

    // Try to select a piece at this position
    const piece = gameState.pieces.find(
      (p) =>
        !p.isCaptured &&
        p.position.row === pos.row &&
        p.position.col === pos.col &&
        p.template.element === gameState.currentTurn
    );

    if (piece) {
      get().selectPiece(piece.id);
    } else {
      set({ selectedPieceId: null, legalMoves: [] });
    }
  },

  undoMove: () => {
    const { gameState } = get();
    if (!gameState) return;

    const newState = undoLastMove(gameState);
    set({
      gameState: newState,
      selectedPieceId: null,
      legalMoves: [],
    });
  },

  toggleLabels: () => {
    set((s) => ({ showLabels: !s.showLabels }));
  },

  triggerAIMove: async () => {
    const { gameState, humanElements } = get();
    if (!gameState || gameState.status !== GameStatus.IN_PROGRESS) return;
    if (humanElements.includes(gameState.currentTurn)) return;

    set({ isAIThinking: true });

    // Run AI in a microtask to not block UI
    await new Promise((resolve) => setTimeout(resolve, 100));

    const { difficulty } = get();
    const maxDepth = difficulty === "beginner" ? 1 : difficulty === "intermediate" ? 2 : 3;
    const move = findBestMove(gameState, { maxDepth, timeLimit: 2000 });
    if (!move) {
      set({ isAIThinking: false });
      return;
    }

    try {
      const newState = applyMove(gameState, move.pieceId, move.to);
      set({
        gameState: newState,
        isAIThinking: false,
        selectedPieceId: null,
        legalMoves: [],
      });

      // Chain AI moves if next player is also AI
      if (
        newState.status === GameStatus.IN_PROGRESS &&
        !humanElements.includes(newState.currentTurn)
      ) {
        setTimeout(() => get().triggerAIMove(), 300);
      }
    } catch {
      set({ isAIThinking: false });
    }
  },
}));
