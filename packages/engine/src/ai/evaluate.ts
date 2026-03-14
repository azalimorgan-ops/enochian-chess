// Board evaluation heuristics for the AI
// Evaluates a position from the perspective of a given team

import { areAllied } from '@enochian-chess/data';
import { GameState, Element, GameStatus, PieceType } from '../types';

// Piece values (standard relative values)
const PIECE_VALUES: Record<PieceType, number> = {
  [PieceType.KING]:   0,    // Kings aren't valued in material count
  [PieceType.QUEEN]:  3,    // GD Queen only moves 1 diag, so lower than standard
  [PieceType.BISHOP]: 5,    // Sliding diagonal — powerful
  [PieceType.KNIGHT]: 5,    // L-shape jump — powerful
  [PieceType.ROOK]:   7,    // Sliding straight — very powerful
  [PieceType.PAWN]:   1,    // Basic footsoldier
};

// Center squares are strategically important
const CENTER_BONUS: Record<string, number> = {};
for (let r = 2; r <= 5; r++) {
  for (let c = 2; c <= 5; c++) {
    const key = `${r},${c}`;
    // Inner center gets bigger bonus
    if (r >= 3 && r <= 4 && c >= 3 && c <= 4) {
      CENTER_BONUS[key] = 0.3;
    } else {
      CENTER_BONUS[key] = 0.15;
    }
  }
}

export function evaluateBoard(
  state: GameState,
  forTeam: [Element, Element],
): number {
  // Terminal state evaluation
  if (state.status === GameStatus.TEAM1_WINS) {
    const isTeam1 = state.concourse.team1[0] === forTeam[0] || state.concourse.team1[0] === forTeam[1];
    return isTeam1 ? 10000 : -10000;
  }
  if (state.status === GameStatus.TEAM2_WINS) {
    const isTeam2 = state.concourse.team2[0] === forTeam[0] || state.concourse.team2[0] === forTeam[1];
    return isTeam2 ? 10000 : -10000;
  }
  if (state.status === GameStatus.STALEMATE) return 0;

  let score = 0;

  for (const piece of state.pieces) {
    if (piece.isCaptured) continue;

    const isOurs = forTeam.includes(piece.template.element);
    const multiplier = isOurs ? 1 : -1;
    const value = PIECE_VALUES[piece.template.type];

    // Material value
    score += value * multiplier;

    // Center control bonus
    const posKey = `${piece.position.row},${piece.position.col}`;
    if (CENTER_BONUS[posKey]) {
      score += CENTER_BONUS[posKey] * multiplier;
    }

    // Inert penalty (pieces that can't move are less valuable)
    if (piece.isInert) {
      score -= value * 0.5 * multiplier;
    }
  }

  // Check bonus: having opponent in check is good
  for (const element of [Element.FIRE, Element.WATER, Element.AIR, Element.EARTH] as const) {
    const isOurs = forTeam.includes(element);
    if (state.checkState[element].inCheck) {
      score += isOurs ? -2 : 2;
    }
    if (state.checkState[element].checkmated) {
      score += isOurs ? -50 : 50;
    }
  }

  return score;
}
