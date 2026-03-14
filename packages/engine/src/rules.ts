// Rules engine — check, checkmate, legal moves, game status
// Win condition: checkmate BOTH opposing kings

import { areAllied } from '@enochian-chess/data';
import { Piece, Position, GameState, GameStatus, CheckState, Move, Element } from './types';
import { getPieceAt, getKing, positionsEqual } from './board';
import { generatePseudoLegalMoves } from './moves';

// Apply a move to produce a new game state (without advancing turn)
function applyMoveRaw(state: GameState, move: Move): GameState {
  const newPieces = state.pieces.map(p => {
    if (p.id === move.pieceId) {
      return { ...p, position: { ...move.to } };
    }
    if (move.capturedPieceId && p.id === move.capturedPieceId) {
      return { ...p, isCaptured: true };
    }
    return p;
  });

  return { ...state, pieces: newPieces };
}

// Is a specific king under attack by any enemy piece?
export function isKingInCheck(state: GameState, kingElement: Element): boolean {
  const king = getKing(state.pieces, kingElement);
  if (!king || king.isCaptured) return false;

  // Check if any non-allied, non-inert piece can attack the king's position
  for (const piece of state.pieces) {
    if (piece.isCaptured || piece.isInert) continue;
    if (areAllied(state.concourse, piece.template.element, kingElement)) continue;

    const targets = generatePseudoLegalMoves(piece, state);
    if (targets.some(t => positionsEqual(t, king.position))) {
      return true;
    }
  }
  return false;
}

// Filter pseudo-legal moves to only those that don't leave own king in check
export function getLegalMoves(piece: Piece, state: GameState): Position[] {
  const pseudoLegal = generatePseudoLegalMoves(piece, state);
  const element = piece.template.element;

  return pseudoLegal.filter(target => {
    const capturedPiece = getPieceAt(state.pieces, target);
    const move: Move = {
      pieceId: piece.id,
      from: piece.position,
      to: target,
      capturedPieceId: capturedPiece?.id,
    };

    const newState = applyMoveRaw(state, move);
    // After moving, our king must not be in check
    return !isKingInCheck(newState, element);
  });
}

// Is a king in checkmate? (in check and no legal moves for any piece of that element)
export function isCheckmated(state: GameState, element: Element): boolean {
  if (!isKingInCheck(state, element)) return false;

  // Check if any piece of this element has any legal move
  const elementPieces = state.pieces.filter(
    p => !p.isCaptured && !p.isInert && p.template.element === element,
  );

  for (const piece of elementPieces) {
    const legalMoves = getLegalMoves(piece, state);
    if (legalMoves.length > 0) return false;
  }

  return true;
}

// Is a player stalemated? (not in check but no legal moves)
export function isStalemated(state: GameState, element: Element): boolean {
  if (isKingInCheck(state, element)) return false;

  const elementPieces = state.pieces.filter(
    p => !p.isCaptured && !p.isInert && p.template.element === element,
  );

  for (const piece of elementPieces) {
    const legalMoves = getLegalMoves(piece, state);
    if (legalMoves.length > 0) return false;
  }

  return true;
}

// Compute full check state for all elements
export function computeCheckState(state: GameState): CheckState {
  const elements = [Element.FIRE, Element.WATER, Element.AIR, Element.EARTH] as const;

  const checkState = {} as CheckState;
  for (const element of elements) {
    const king = getKing(state.pieces, element);
    if (!king || king.isCaptured) {
      checkState[element] = { inCheck: false, checkmated: true };
    } else {
      const inCheck = isKingInCheck(state, element);
      const checkmated = inCheck && isCheckmated(state, element);
      checkState[element] = { inCheck, checkmated };
    }
  }
  return checkState;
}

// Determine game status
// Win condition: both opposing kings must be checkmated
export function getGameStatus(state: GameState): GameStatus {
  const { team1, team2 } = state.concourse;
  const cs = state.checkState;

  // Team 1 wins if both team 2 kings are checkmated
  const team2BothMated = cs[team2[0]].checkmated && cs[team2[1]].checkmated;
  if (team2BothMated) return GameStatus.TEAM1_WINS;

  // Team 2 wins if both team 1 kings are checkmated
  const team1BothMated = cs[team1[0]].checkmated && cs[team1[1]].checkmated;
  if (team1BothMated) return GameStatus.TEAM2_WINS;

  // Check for stalemate: if the current player has no legal moves and is not in check
  if (isStalemated(state, state.currentTurn)) {
    return GameStatus.STALEMATE;
  }

  return GameStatus.IN_PROGRESS;
}

// Make inert: when a king is checkmated, all that element's pieces become inert
export function applyInertState(pieces: Piece[], checkState: CheckState): Piece[] {
  return pieces.map(p => {
    if (checkState[p.template.element]?.checkmated && !p.isCaptured) {
      return { ...p, isInert: true };
    }
    return p;
  });
}
