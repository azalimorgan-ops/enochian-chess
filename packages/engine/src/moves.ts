// Move generation for all piece types
// Handles four-quadrant directional pawns and alliance-aware capture filtering

import { areAllied } from '@enochian-chess/data';
import { Piece, Position, GameState, Element } from './types';
import { getPieceAt, isWithinBounds } from './board';

// Direction vectors for pawn movement
// Each element's pawns move toward the opposing side of the board
const PAWN_DIRECTIONS: Record<Element, Position> = {
  [Element.FIRE]:  { row: -1, col: 0 },  // Fire (south) moves northward (row decreasing)
  [Element.WATER]: { row: 0,  col: 1 },  // Water (west) moves eastward (col increasing)
  [Element.AIR]:   { row: 0,  col: -1 }, // Air (east) moves westward (col decreasing)
  [Element.EARTH]: { row: 1,  col: 0 },  // Earth (north) moves southward (row increasing)
};

// Pawn capture directions (diagonal relative to movement direction)
const PAWN_CAPTURE_DIRS: Record<Element, Position[]> = {
  [Element.FIRE]:  [{ row: -1, col: -1 }, { row: -1, col: 1 }],
  [Element.WATER]: [{ row: -1, col: 1 },  { row: 1, col: 1 }],
  [Element.AIR]:   [{ row: -1, col: -1 }, { row: 1, col: -1 }],
  [Element.EARTH]: [{ row: 1, col: -1 },  { row: 1, col: 1 }],
};

function canCapture(piece: Piece, target: Piece, state: GameState): boolean {
  // Cannot capture allied pieces
  if (areAllied(state.concourse, piece.template.element, target.template.element)) {
    return false;
  }
  // Cannot capture inert pieces? Actually per rules inert pieces block but CAN be captured
  return true;
}

function generateKingMoves(piece: Piece, state: GameState): Position[] {
  const moves: Position[] = [];
  const { row, col } = piece.position;

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const pos = { row: row + dr, col: col + dc };
      if (!isWithinBounds(pos)) continue;

      const occupant = getPieceAt(state.pieces, pos);
      if (!occupant) {
        moves.push(pos);
      } else if (canCapture(piece, occupant, state)) {
        moves.push(pos);
      }
    }
  }
  return moves;
}

function generateQueenMoves(piece: Piece, state: GameState): Position[] {
  // GD Queen: moves ONE square diagonally only (not the modern chess queen)
  const moves: Position[] = [];
  const { row, col } = piece.position;

  for (const [dr, dc] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) {
    const pos = { row: row + dr, col: col + dc };
    if (!isWithinBounds(pos)) continue;

    const occupant = getPieceAt(state.pieces, pos);
    if (!occupant) {
      moves.push(pos);
    } else if (canCapture(piece, occupant, state)) {
      moves.push(pos);
    }
  }
  return moves;
}

function generateBishopMoves(piece: Piece, state: GameState): Position[] {
  // Slides diagonally any number of squares
  return generateSlidingMoves(piece, state, [[-1, -1], [-1, 1], [1, -1], [1, 1]]);
}

function generateRookMoves(piece: Piece, state: GameState): Position[] {
  // Slides straight any number of squares
  return generateSlidingMoves(piece, state, [[-1, 0], [1, 0], [0, -1], [0, 1]]);
}

function generateSlidingMoves(
  piece: Piece, state: GameState, directions: number[][],
): Position[] {
  const moves: Position[] = [];
  const { row, col } = piece.position;

  for (const [dr, dc] of directions) {
    let r = row + dr;
    let c = col + dc;

    while (isWithinBounds({ row: r, col: c })) {
      const occupant = getPieceAt(state.pieces, { row: r, col: c });
      if (!occupant) {
        moves.push({ row: r, col: c });
      } else {
        if (canCapture(piece, occupant, state)) {
          moves.push({ row: r, col: c });
        }
        break; // blocked by this piece either way
      }
      r += dr;
      c += dc;
    }
  }
  return moves;
}

function generateKnightMoves(piece: Piece, state: GameState): Position[] {
  const moves: Position[] = [];
  const { row, col } = piece.position;

  const jumps = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1],
  ];

  for (const [dr, dc] of jumps) {
    const pos = { row: row + dr, col: col + dc };
    if (!isWithinBounds(pos)) continue;

    const occupant = getPieceAt(state.pieces, pos);
    if (!occupant) {
      moves.push(pos);
    } else if (canCapture(piece, occupant, state)) {
      moves.push(pos);
    }
  }
  return moves;
}

function generatePawnMoves(piece: Piece, state: GameState): Position[] {
  const moves: Position[] = [];
  const element = piece.template.element;
  const dir = PAWN_DIRECTIONS[element];
  const { row, col } = piece.position;

  // Forward move (one square, non-capturing)
  const forward = { row: row + dir.row, col: col + dir.col };
  if (isWithinBounds(forward) && !getPieceAt(state.pieces, forward)) {
    moves.push(forward);
  }

  // Diagonal captures
  const captureDirs = PAWN_CAPTURE_DIRS[element];
  for (const cd of captureDirs) {
    const capturePos = { row: row + cd.row, col: col + cd.col };
    if (!isWithinBounds(capturePos)) continue;

    const occupant = getPieceAt(state.pieces, capturePos);
    if (occupant && canCapture(piece, occupant, state)) {
      moves.push(capturePos);
    }
  }

  return moves;
}

// Generate pseudo-legal moves (ignoring check constraints)
export function generatePseudoLegalMoves(piece: Piece, state: GameState): Position[] {
  if (piece.isCaptured || piece.isInert) return [];

  switch (piece.template.type) {
    case 'KING':   return generateKingMoves(piece, state);
    case 'QUEEN':  return generateQueenMoves(piece, state);
    case 'BISHOP': return generateBishopMoves(piece, state);
    case 'KNIGHT': return generateKnightMoves(piece, state);
    case 'ROOK':   return generateRookMoves(piece, state);
    case 'PAWN':   return generatePawnMoves(piece, state);
    default:       return [];
  }
}

// Generate all pseudo-legal moves for an element
export function generateAllMoves(state: GameState, element: Element): { piece: Piece; targets: Position[] }[] {
  return state.pieces
    .filter(p => !p.isCaptured && !p.isInert && p.template.element === element)
    .map(piece => ({
      piece,
      targets: generatePseudoLegalMoves(piece, state),
    }))
    .filter(m => m.targets.length > 0);
}
