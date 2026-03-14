// Game state management — create, apply moves, advance turns

import { getConcourse } from '@enochian-chess/data';
import { GameState, GameStatus, Move, Position, Element } from './types';
import { createInitialPieces, getPieceAt, positionToId } from './board';
import { getLegalMoves } from './rules';
import { computeCheckState, getGameStatus, applyInertState } from './rules';

export function createNewGame(
  openingElement: Element,
  mode: 'GAME' | 'DIVINATION' = 'GAME',
  query?: string,
): GameState {
  const concourse = getConcourse(openingElement);
  const pieces = createInitialPieces();

  const state: GameState = {
    pieces,
    currentTurn: concourse.turnOrder[0],
    turnOrder: concourse.turnOrder,
    turnNumber: 0,
    concourse,
    moveHistory: [],
    checkState: {
      [Element.FIRE]:  { inCheck: false, checkmated: false },
      [Element.WATER]: { inCheck: false, checkmated: false },
      [Element.AIR]:   { inCheck: false, checkmated: false },
      [Element.EARTH]: { inCheck: false, checkmated: false },
    },
    status: GameStatus.IN_PROGRESS,
    mode,
    query,
  };

  return state;
}

export function applyMove(state: GameState, pieceId: string, to: Position): GameState {
  const piece = state.pieces.find(p => p.id === pieceId);
  if (!piece) throw new Error(`Piece not found: ${pieceId}`);
  if (piece.isCaptured || piece.isInert) throw new Error(`Piece cannot move: ${pieceId}`);
  if (piece.template.element !== state.currentTurn) throw new Error('Not this piece\'s turn');

  // Verify the move is legal
  const legalMoves = getLegalMoves(piece, state);
  const isLegal = legalMoves.some(m => m.row === to.row && m.col === to.col);
  if (!isLegal) throw new Error('Illegal move');

  // Find captured piece if any
  const capturedPiece = getPieceAt(state.pieces, to);
  const move: Move = {
    pieceId,
    from: { ...piece.position },
    to: { ...to },
    capturedPieceId: capturedPiece?.id,
    notation: `${positionToId(piece.position)}-${positionToId(to)}`,
  };

  // Apply the move
  let newPieces = state.pieces.map(p => {
    if (p.id === pieceId) {
      return { ...p, position: { ...to } };
    }
    if (capturedPiece && p.id === capturedPiece.id) {
      return { ...p, isCaptured: true };
    }
    return p;
  });

  // Compute check state
  const tempState = { ...state, pieces: newPieces };
  const checkState = computeCheckState(tempState);

  // Apply inert state for checkmated elements
  newPieces = applyInertState(newPieces, checkState);

  // Advance turn
  const nextTurn = getNextActivePlayer(state.turnOrder, state.currentTurn, checkState);

  const newState: GameState = {
    ...state,
    pieces: newPieces,
    currentTurn: nextTurn,
    turnNumber: state.turnNumber + 1,
    moveHistory: [...state.moveHistory, move],
    checkState,
  };

  // Check game status
  newState.status = getGameStatus(newState);

  return newState;
}

// Get the next player who can actually play (skip inert/checkmated players)
function getNextActivePlayer(
  turnOrder: Element[],
  currentTurn: Element,
  checkState: Record<Element, { inCheck: boolean; checkmated: boolean }>,
): Element {
  const currentIndex = turnOrder.indexOf(currentTurn);
  let attempts = 0;

  while (attempts < 4) {
    const nextIndex = (currentIndex + 1 + attempts) % 4;
    const nextElement = turnOrder[nextIndex];
    if (!checkState[nextElement].checkmated) {
      return nextElement;
    }
    attempts++;
  }

  // All players checkmated (shouldn't happen with proper win detection)
  return currentTurn;
}

export function undoLastMove(state: GameState): GameState {
  if (state.moveHistory.length === 0) return state;

  // Rebuild state by replaying all moves except the last one
  const movesToReplay = state.moveHistory.slice(0, -1);
  let newState = createNewGame(
    state.concourse.openingElement,
    state.mode,
    state.query,
  );

  for (const move of movesToReplay) {
    newState = applyMove(newState, move.pieceId, move.to);
  }

  return newState;
}

// Get all legal moves for the current player
export function getCurrentPlayerMoves(state: GameState): { pieceId: string; moves: Position[] }[] {
  const result: { pieceId: string; moves: Position[] }[] = [];

  for (const piece of state.pieces) {
    if (piece.isCaptured || piece.isInert) continue;
    if (piece.template.element !== state.currentTurn) continue;

    const moves = getLegalMoves(piece, state);
    if (moves.length > 0) {
      result.push({ pieceId: piece.id, moves });
    }
  }

  return result;
}
